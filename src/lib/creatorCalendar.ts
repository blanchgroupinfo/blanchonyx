// Creator's Calendar Calculation Engine
// Anchor: March 17, 2013 (Gregorian) = Day 1, Month 1, Restoration Year 1
// 364-day year, 12 months, 7-day week
// Month lengths: 30, 30, 31, 30, 30, 31, 30, 30, 31, 30, 30, 31

const ANCHOR_DATE = new Date(2013, 2, 17); // March 17, 2013
const DAYS_PER_YEAR = 364;
const MONTH_LENGTHS = [30, 30, 31, 30, 30, 31, 30, 30, 31, 30, 30, 31];

const DAY_NAMES = [
  { short: "Day 1", full: "Yawam Achad", hebrew: "YAWAM ACHAD" },
  { short: "Day 2", full: "Yawam Shanay", hebrew: "YAWAM SHANAY" },
  { short: "Day 3", full: "Yawam Shalayashaya", hebrew: "YAWAM SHALAYASHAYA" },
  { short: "Day 4", full: "Yawam Rabayaiy", hebrew: "YAWAM RABAYAIY" },
  { short: "Day 5", full: "Yawam Hamayashaya", hebrew: "YAWAM HAMAYASHAYA" },
  { short: "Day 6", full: "Yawam Shashaya", hebrew: "YAWAM SHASHAYA" },
  { short: "Day 7", full: "Shabbat", hebrew: "SHABBAT" },
];

// Feast days by month and day
const FEAST_DAYS = {
  "1-1": { name: "New Month", type: "new_month" },
  "1-14": { name: "Passover", type: "feast", detail: "Hag Pasah" },
  "1-15": { name: "Feast of Unleavened Bread", type: "feast", detail: "Hag Matazah" },
  "1-16": { name: "Feast of Wave Sheaf", type: "feast", detail: "First Fruits" },
  "1-21": { name: "Feast Unleavened Bread Ends", type: "feast" },
  "2-1": { name: "New Month", type: "new_month" },
  "2-14": { name: "Second Passover", type: "feast", detail: "Pesach Sheni" },
  "3-1": { name: "New Month", type: "new_month" },
  "3-3": { name: "Feast of Pentecost", type: "feast", detail: "Hag Bakawar" },
  "4-1": { name: "New Month", type: "new_month" },
  "4-17": { name: "Fast", type: "fast" },
  "5-1": { name: "New Month", type: "new_month" },
  "5-17": { name: "Fast", type: "fast" },
  "6-1": { name: "New Month", type: "new_month" },
  "7-1": { name: "Feast of Trumpets", type: "feast", detail: "Hag Tarawah - No Work" },
  "7-9": { name: "No Work at Even", type: "preparation" },
  "7-10": { name: "Day of Atonement", type: "fast", detail: "Yawam Kapar - Fast, No Work" },
  "7-15": { name: "Feast of Tabernacle Begins", type: "feast", detail: "Sukkot" },
  "7-22": { name: "Feast of Tabernacle", type: "feast" },
  "7-24": { name: "Fast, No Work", type: "fast" },
  "7-25": { name: "Fast, No Work", type: "fast" },
  "8-1": { name: "New Month", type: "new_month" },
  "9-1": { name: "New Month", type: "new_month" },
  "9-25": { name: "Feast of Dedication", type: "feast", detail: "Feast of Lights - 8 Days" },
  "9-28": { name: "Fast", type: "fast" },
  "10-1": { name: "New Month", type: "new_month" },
  "10-8": { name: "Feast of Dedication Ends", type: "feast" },
  "10-17": { name: "Fast", type: "fast" },
  "11-1": { name: "New Month", type: "new_month" },
  "12-1": { name: "New Month", type: "new_month" },
  "12-13": { name: "Day of Nicanor", type: "memorial" },
  "12-14": { name: "Feast of Purim", type: "feast" },
  "12-15": { name: "Feast of Purim", type: "feast" },
};

function getDaysBetween(date1, date2) {
  const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  return Math.floor((d2 - d1) / (1000 * 60 * 60 * 24));
}

export function gregorianToCreator(gregorianDate) {
  const gDate = new Date(gregorianDate.getFullYear(), gregorianDate.getMonth(), gregorianDate.getDate());
  const totalDays = getDaysBetween(ANCHOR_DATE, gDate);
  
  if (totalDays < 0) {
    return null; // Before the anchor date
  }

  const year = Math.floor(totalDays / DAYS_PER_YEAR) + 1;
  let remainingDays = totalDays % DAYS_PER_YEAR;
  
  let month = 0;
  let dayOfMonth = 0;
  
  for (let i = 0; i < 12; i++) {
    if (remainingDays < MONTH_LENGTHS[i]) {
      month = i + 1;
      dayOfMonth = remainingDays + 1;
      break;
    }
    remainingDays -= MONTH_LENGTHS[i];
  }

  const dayOfWeek = totalDays % 7; // 0 = Day 1 (Yawam Achad)
  const dayOfYear = totalDays % DAYS_PER_YEAR + 1;

  return {
    year,
    month,
    dayOfMonth,
    dayOfWeek,
    dayOfYear,
    dayName: DAY_NAMES[dayOfWeek],
    gregorianDate: gDate,
    feast: FEAST_DAYS[`${month}-${dayOfMonth}`] || null,
    isShabbat: dayOfWeek === 6,
  };
}

export function creatorToGregorian(year, month, dayOfMonth) {
  let totalDays = (year - 1) * DAYS_PER_YEAR;
  for (let i = 0; i < month - 1; i++) {
    totalDays += MONTH_LENGTHS[i];
  }
  totalDays += dayOfMonth - 1;
  
  const result = new Date(ANCHOR_DATE);
  result.setDate(result.getDate() + totalDays);
  return result;
}

export function getMonthDays(year, month) {
  const days = [];
  const monthLength = MONTH_LENGTHS[month - 1];
  
  for (let day = 1; day <= monthLength; day++) {
    const gregDate = creatorToGregorian(year, month, day);
    const info = gregorianToCreator(gregDate);
    days.push(info);
  }
  return days;
}

export function getYearStartGregorian(year) {
  return creatorToGregorian(year, 1, 1);
}

export function getCurrentCreatorDate() {
  return gregorianToCreator(new Date());
}

export function getCreatorYearForGregorian(gregDate) {
  const info = gregorianToCreator(gregDate);
  return info ? info.year : null;
}

export { DAY_NAMES, MONTH_LENGTHS, FEAST_DAYS, DAYS_PER_YEAR };