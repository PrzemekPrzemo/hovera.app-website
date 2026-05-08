/**
 * Schedule helper — generates ISO timestamps spaced across days-of-week
 * at a fixed hour (UTC). Default: Mon/Wed/Fri at 09:00 UTC.
 */

/**
 * @param {Object} opts
 * @param {string|Date} opts.start - earliest possible day (ISO date or Date)
 * @param {number} opts.count - how many slots to generate
 * @param {number[]} [opts.daysOfWeek=[1,3,5]] - 0=Sun..6=Sat (default Mon/Wed/Fri)
 * @param {number} [opts.hour=9] - hour UTC
 * @param {number} [opts.minute=0]
 * @returns {string[]} ISO timestamps
 */
export function generateSchedule({ start, count, daysOfWeek = [1, 3, 5], hour = 9, minute = 0 }) {
  const out = [];
  const d = (typeof start === 'string') ? new Date(start) : new Date(start);
  // normalize to start-of-day UTC
  d.setUTCHours(0, 0, 0, 0);

  let safety = 0;
  while (out.length < count && safety++ < 5000) {
    if (daysOfWeek.includes(d.getUTCDay())) {
      const slot = new Date(d);
      slot.setUTCHours(hour, minute, 0, 0);
      out.push(slot.toISOString());
    }
    d.setUTCDate(d.getUTCDate() + 1);
  }
  return out;
}
