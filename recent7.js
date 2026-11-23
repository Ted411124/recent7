
function recent7(records, today) {
  const end = new Date(today + 'T00:00:00Z');

  if (
    !Number.isFinite(end.getTime()) ||
    end.toISOString().slice(0, 10) !== today
  ) {
    return { minutes: 0, count: 0, days: 0 };
  }

  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - 6);

  let minutes = 0;
  let count = 0;
  const activeDays = new Set();

  records.forEach(record => {
    if (
      !record ||
      typeof record.log_date !== 'string' ||
      !/^\d{4}-\d{2}-\d{2}$/.test(record.log_date)
    ) {
      return;
    }

    const date = new Date(record.log_date + 'T00:00:00Z');

    if (
      !Number.isFinite(date.getTime()) ||
      date.toISOString().slice(0, 10) !== record.log_date
    ) {
      return;
    }

    const validMinutes =
      Number.isFinite(record.minutes) &&
      record.minutes >= 0 &&
      record.minutes <= 120;

    if (
      date >= start &&
      date <= end &&
      validMinutes
    ) {
      minutes += record.minutes;
      count++;
      activeDays.add(record.log_date);
    }
  });

  return {
    minutes,
    count,
    days: activeDays.size
  };
}
