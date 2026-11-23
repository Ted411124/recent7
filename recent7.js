
function recent7(records, today) {
  const isValidDate = (date) => {
    if (typeof date !== 'string') return false;

    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
    if (!match) return false;

    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);

    const parsed = new Date(Date.UTC(year, month - 1, day));

    return (
      parsed.getUTCFullYear() === year &&
      parsed.getUTCMonth() === month - 1 &&
      parsed.getUTCDate() === day
    );
  };

  if (!isValidDate(today)) {
    return { minutes: 0, count: 0 };
  }

  const end = new Date(today + 'T00:00:00Z');
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - 6);

  let minutes = 0;
  let count = 0;

  records.forEach(record => {
    if (!record || !isValidDate(record.log_date)) {
      return;
    }

    if (
      typeof record.minutes !== 'number' ||
      !Number.isFinite(record.minutes) ||
      record.minutes < 0 ||
      record.minutes > 120
    ) {
      return;
    }

    const date = new Date(record.log_date + 'T00:00:00Z');

    if (date >= start && date <= end) {
      minutes += record.minutes;
      count++;
    }
  });

  return { minutes, count };
}
