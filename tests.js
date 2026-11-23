
addCase({
  name: '規則 1：最近七天包含今天及往前六天',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-17', minutes: 20 },
    { log_date: '2026-11-23', minutes: 30 }
  ],
  expect: { minutes: 50, count: 2 }
});

addCase({
  name: '規則 2：今天的紀錄要計算',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 45 }
  ],
  expect: { minutes: 45, count: 1 }
});

addCase({
  name: '規則 3：七天以前及未來的紀錄不計算',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-16', minutes: 30 },
    { log_date: '2026-11-24', minutes: 40 }
  ],
  expect: { minutes: 0, count: 0 }
});

addCase({
  name: '規則 4：分鐘數為 null 或未填寫不計算',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: null },
    { log_date: '2026-11-23' }
  ],
  expect: { minutes: 0, count: 0 }
});

addCase({
  name: '規則 5：只計算 0 到 120 分鐘的紀錄',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 0 },
    { log_date: '2026-11-23', minutes: 120 },
    { log_date: '2026-11-23', minutes: -1 },
    { log_date: '2026-11-23', minutes: 121 }
  ],
  expect: { minutes: 120, count: 2 }
});

addCase({
  name: '規則 6：加總有效紀錄的分鐘數與筆數',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-20', minutes: 30 },
    { log_date: '2026-11-21', minutes: 60 },
    { log_date: '2026-11-23', minutes: 45 }
  ],
  expect: { minutes: 135, count: 3 }
});

addCase({
  name: '規則 7：錯誤日期格式或無效日期不計算',
  today: '2026-11-23',
  records: [
    { log_date: '2026-13-45', minutes: 30 },
    { log_date: 'not-a-date', minutes: 40 },
    { log_date: '2026-02-30', minutes: 50 }
  ],
  expect: { minutes: 0, count: 0 }
});

addCase({
  name: '規則 8：同一天多筆有效紀錄只計算一天',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-20', minutes: 30 },
    { log_date: '2026-11-20', minutes: 60 },
    { log_date: '2026-11-23', minutes: 45 },
    { log_date: '2026-11-21', minutes: 150 }
  ],
  expect: { minutes: 135, count: 3, days: 2 }
});
