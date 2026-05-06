<?php
/**
 * Hovera contact form mailer.
 *
 * Drop this file at httpdocs/api/contact.php on Plesk.
 * Plesk's PHP-FPM serves it directly; the static site never sees this path.
 *
 * Configure recipient and from in /api/.env (sibling file, gitignored) or via
 * Plesk environment variables. See README for setup instructions.
 */

declare(strict_types=1);

header('Content-Type: text/html; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method not allowed');
}

// Honeypot — bots tend to fill all fields
if (!empty($_POST['_honeypot'] ?? '')) {
    http_response_code(200);
    exit(redirect_or_message($_POST['_locale'] ?? 'pl', true));
}

// Required consent
if (empty($_POST['consent'] ?? '')) {
    http_response_code(400);
    exit(error_message('Brakuje zgody na przetwarzanie danych.', 'Missing consent.'));
}

$locale = ($_POST['_locale'] ?? 'pl') === 'en' ? 'en' : 'pl';
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

// Recipient — set HOVERA_MAIL_TO env var on Plesk, or edit fallback below.
$to = getenv('HOVERA_MAIL_TO') ?: 'hello@hovera.app';
$from = getenv('HOVERA_MAIL_FROM') ?: 'no-reply@hovera.app';

$subject = ($_POST['_subject'] ?? 'Hovera inquiry');
$subject .= ' · ' . $name . ($stable !== '' ? ' (' . $stable . ')' : '');

$lines = [
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
$body = implode("\n", $lines);

$headers = [];
$headers[] = 'From: Hovera <' . $from . '>';
$headers[] = 'Reply-To: ' . $name . ' <' . $email . '>';
$headers[] = 'Content-Type: text/plain; charset=utf-8';
$headers[] = 'X-Mailer: Hovera-Form/1.0';

$ok = @mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, implode("\r\n", $headers));

if (!$ok) {
    http_response_code(500);
    error_log('Hovera contact mail() failed for ' . $email);
    exit(error_message('Wystąpił błąd. Napisz bezpośrednio na hello@hovera.app.', 'Something went wrong. Please email hello@hovera.app.'));
}

http_response_code(200);
echo redirect_or_message($locale, false);

/* ------ helpers ------ */
function redirect_or_message(string $locale, bool $silent): string {
    $base = $locale === 'en' ? '/en' : '';
    // Always send the user to a thank-you page so the URL is shareable.
    header('Location: ' . $base . '/dziekujemy', true, 303);
    return '';
}
function error_message(string $pl, string $en): string {
    $locale = ($_POST['_locale'] ?? 'pl') === 'en' ? 'en' : 'pl';
    return $locale === 'en' ? $en : $pl;
}
