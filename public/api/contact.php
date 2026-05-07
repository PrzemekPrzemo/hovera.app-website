<?php
/**
 * Hovera contact form mailer with SMTP support.
 *
 * Drop this file at httpdocs/api/contact.php on Plesk.
 *
 * Configure SMTP and recipients in httpdocs/api/.env (sibling file, gitignored)
 * or via Plesk environment variables. See .env.example for the template.
 *
 * Falls back to PHP mail() if SMTP_HOST is not set, which uses the local
 * Postfix/sendmail and does NOT require any extra config — but messages
 * are more likely to be flagged as spam.
 */

declare(strict_types=1);

header('Content-Type: text/html; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method not allowed');
}

// ─────────────────────────── load .env ───────────────────────────
$envFile = __DIR__ . '/.env';
if (is_readable($envFile)) {
    foreach (file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        if (preg_match('/^\s*#/', $line)) continue;
        if (!str_contains($line, '=')) continue;
        [$k, $v] = array_map('trim', explode('=', $line, 2));
        $v = trim($v, "\"' \t");
        if (!getenv($k)) putenv("$k=$v");
    }
}

function envOr(string $key, string $default = ''): string {
    $v = getenv($key);
    return $v !== false && $v !== '' ? $v : $default;
}

// ─────────────────────────── honeypot + validation ───────────────────────────
if (!empty($_POST['_honeypot'] ?? '')) {
    http_response_code(200);
    redirect_to_thanks($_POST['_locale'] ?? 'pl');
}

if (empty($_POST['consent'] ?? '')) {
    http_response_code(400);
    exit(error_message('Brakuje zgody na przetwarzanie danych.', 'Missing consent.'));
}

$locale  = ($_POST['_locale'] ?? 'pl') === 'en' ? 'en' : 'pl';
$name    = trim((string)($_POST['name'] ?? ''));
$email   = trim((string)($_POST['email'] ?? ''));
$stable  = trim((string)($_POST['stable'] ?? ''));
$phone   = trim((string)($_POST['phone'] ?? ''));
$useCase = trim((string)($_POST['useCase'] ?? ''));
$size    = trim((string)($_POST['size'] ?? ''));
$plan    = trim((string)($_POST['plan'] ?? ''));
$source  = trim((string)($_POST['source'] ?? ''));
$message = trim((string)($_POST['message'] ?? ''));

if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    exit(error_message('Sprawdź imię i email.', 'Please check name and email.'));
}

// ─────────────────────────── compose message ───────────────────────────
$to       = envOr('HOVERA_MAIL_TO',   'hello@hovera.app');
$from     = envOr('HOVERA_MAIL_FROM', 'no-reply@hovera.app');
$fromName = envOr('HOVERA_MAIL_FROM_NAME', 'Hovera');

$subject  = ($_POST['_subject'] ?? 'Hovera inquiry');
$subject .= ' · ' . $name . ($stable !== '' ? ' (' . $stable . ')' : '');

$bodyLines = [
    "Imię / Name: $name",
    "Email: $email",
    "Telefon / Phone: $phone",
    "Stajnia / Stable: $stable",
    "Profil / Use case: $useCase",
    "Wielkość / Size: $size",
    "Plan: $plan",
    "Źródło / Source: $source",
    'Język / Language: ' . strtoupper($locale),
    'IP: ' . ($_SERVER['REMOTE_ADDR'] ?? '-'),
    'UA: ' . substr((string)($_SERVER['HTTP_USER_AGENT'] ?? '-'), 0, 200),
    '',
    'Wiadomość / Message:',
    $message ?: '(brak / empty)',
];
$body = implode("\r\n", $bodyLines);

// ─────────────────────────── send: SMTP if configured, else mail() ───────────────────────────
$smtpHost = envOr('SMTP_HOST');
$ok = false;
$errorReason = '';

if ($smtpHost !== '') {
    [$ok, $errorReason] = sendViaSmtp([
        'host'        => $smtpHost,
        'port'        => (int) envOr('SMTP_PORT', '587'),
        'username'    => envOr('SMTP_USERNAME', $from),
        'password'    => envOr('SMTP_PASSWORD'),
        'security'    => envOr('SMTP_SECURITY', 'starttls'), // starttls | ssl | none
        'from'        => $from,
        'fromName'    => $fromName,
        'to'          => $to,
        'replyTo'     => $email,
        'replyToName' => $name,
        'subject'     => $subject,
        'body'        => $body,
    ]);
} else {
    // Fallback to PHP mail() via local Postfix
    $headers = [
        'From: ' . encodeHeader($fromName) . ' <' . $from . '>',
        'Reply-To: ' . encodeHeader($name) . ' <' . $email . '>',
        'Content-Type: text/plain; charset=utf-8',
        'X-Mailer: Hovera-Form/1.1',
    ];
    $ok = @mail($to, encodeSubject($subject), $body, implode("\r\n", $headers));
    if (!$ok) $errorReason = 'PHP mail() failed';
}

if (!$ok) {
    http_response_code(500);
    error_log('Hovera contact form failed for ' . $email . ': ' . $errorReason);
    exit(error_message(
        'Wystąpił błąd. Napisz bezpośrednio na ' . $to . '.',
        'Something went wrong. Please email ' . $to . ' directly.'
    ));
}

http_response_code(200);
redirect_to_thanks($locale);

// ════════════════════════════════════════════════════════════════════════
//                                HELPERS
// ════════════════════════════════════════════════════════════════════════

function encodeHeader(string $value): string {
    return '=?UTF-8?B?' . base64_encode($value) . '?=';
}

function encodeSubject(string $subject): string {
    return encodeHeader($subject);
}

function redirect_to_thanks(string $locale): void {
    $base = $locale === 'en' ? '/en' : '';
    header('Location: ' . $base . '/dziekujemy', true, 303);
    exit;
}

function error_message(string $pl, string $en): string {
    $locale = ($_POST['_locale'] ?? 'pl') === 'en' ? 'en' : 'pl';
    return $locale === 'en' ? $en : $pl;
}

/**
 * Minimal SMTP client. Supports plain, SSL and STARTTLS. Returns [bool ok, string error].
 */
function sendViaSmtp(array $cfg): array {
    $host = $cfg['host'];
    $port = $cfg['port'];
    $security = strtolower($cfg['security']);
    $timeout = 15;

    $socketHost = $security === 'ssl' ? "tls://$host" : $host;
    $errno = 0;
    $errstr = '';
    $stream = @stream_socket_client(
        "$socketHost:$port",
        $errno, $errstr, $timeout,
        STREAM_CLIENT_CONNECT
    );
    if (!$stream) return [false, "Connect failed: $errstr ($errno)"];
    stream_set_timeout($stream, $timeout);

    $read = function () use ($stream): string {
        $data = '';
        while (!feof($stream)) {
            $line = fgets($stream, 1024);
            if ($line === false) break;
            $data .= $line;
            if (isset($line[3]) && $line[3] === ' ') break; // last line of multi-line response
        }
        return $data;
    };

    $cmd = function (string $line) use ($stream, $read): string {
        fwrite($stream, $line . "\r\n");
        return $read();
    };

    $resp = $read();
    if (!str_starts_with($resp, '220')) return [false, "Banner: $resp"];

    $hostName = $_SERVER['SERVER_NAME'] ?? 'localhost';
    $resp = $cmd("EHLO $hostName");
    if (!str_starts_with($resp, '250')) return [false, "EHLO: $resp"];

    if ($security === 'starttls') {
        $resp = $cmd('STARTTLS');
        if (!str_starts_with($resp, '220')) return [false, "STARTTLS: $resp"];
        if (!@stream_socket_enable_crypto($stream, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
            return [false, 'TLS upgrade failed'];
        }
        $resp = $cmd("EHLO $hostName"); // re-EHLO over TLS
        if (!str_starts_with($resp, '250')) return [false, "EHLO post-TLS: $resp"];
    }

    if ($cfg['username'] !== '' && $cfg['password'] !== '') {
        $resp = $cmd('AUTH LOGIN');
        if (!str_starts_with($resp, '334')) return [false, "AUTH LOGIN: $resp"];
        $resp = $cmd(base64_encode($cfg['username']));
        if (!str_starts_with($resp, '334')) return [false, "AUTH user: $resp"];
        $resp = $cmd(base64_encode($cfg['password']));
        if (!str_starts_with($resp, '235')) return [false, "AUTH pass: $resp"];
    }

    $resp = $cmd("MAIL FROM:<{$cfg['from']}>");
    if (!str_starts_with($resp, '250')) return [false, "MAIL FROM: $resp"];

    $resp = $cmd("RCPT TO:<{$cfg['to']}>");
    if (!str_starts_with($resp, '250') && !str_starts_with($resp, '251')) return [false, "RCPT TO: $resp"];

    $resp = $cmd('DATA');
    if (!str_starts_with($resp, '354')) return [false, "DATA: $resp"];

    $headers = [
        'From: ' . encodeHeader($cfg['fromName']) . ' <' . $cfg['from'] . '>',
        'To: ' . $cfg['to'],
        'Reply-To: ' . encodeHeader($cfg['replyToName']) . ' <' . $cfg['replyTo'] . '>',
        'Subject: ' . encodeSubject($cfg['subject']),
        'Date: ' . date('r'),
        'Message-ID: <' . bin2hex(random_bytes(16)) . '@' . $hostName . '>',
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=utf-8',
        'Content-Transfer-Encoding: 8bit',
        'X-Mailer: Hovera-Form/1.1',
    ];
    $message = implode("\r\n", $headers) . "\r\n\r\n" . $cfg['body'];
    // Dot-stuff lines starting with a single dot (RFC 5321 §4.5.2)
    $message = preg_replace('/^\./m', '..', $message);

    fwrite($stream, $message . "\r\n.\r\n");
    $resp = $read();
    if (!str_starts_with($resp, '250')) return [false, "Message rejected: $resp"];

    fwrite($stream, "QUIT\r\n");
    fclose($stream);

    return [true, ''];
}
