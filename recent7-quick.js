
function recent7(records, today) {
  const end = new Date(today + 'T00:00:00Z');
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - 6);

  let minutes = 0;
  let count = 0;

  records.forEach(record => {
    const date = new Date(record.log_date + 'T00:00:00Z');

    if (
      date >= start &&
      date <= end &&
      Number.isFinite(record.minutes) &&
      record.minutes >= 0
    ) {
      minutes += record.minutes;
      count++;
    }
  });

  return { minutes, count };
}
