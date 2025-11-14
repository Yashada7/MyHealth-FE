// Function to get date string in YYYY-MM-DD format
const getDateString = (daysFromToday) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromToday);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Dynamic appointments data - always shows current week + next 6 days
export const appointmentsData = [
  // Day 0 (Today)
  { 
    id: 1, 
    patientName: 'John Doe', 
    age: 35,
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    date: getDateString(0), 
    time: '09:00 AM', 
    reason: 'Regular Checkup',
    status: 'Pending' 
  },
  { 
    id: 2, 
    patientName: 'Emily Rodriguez', 
    age: 42,
    email: 'emily.r@example.com',
    phone: '+1 234 567 8901',
    date: getDateString(0), 
    time: '10:30 AM', 
    reason: 'Diabetes Follow-up',
    status: 'Confirmed' 
  },
  { 
    id: 3, 
    patientName: 'Michael Chen', 
    age: 28,
    email: 'michael.c@example.com',
    phone: '+1 234 567 8902',
    date: getDateString(0), 
    time: '02:00 PM', 
    reason: 'Sports Injury Consultation',
    status: 'Pending' 
  },
  // Day 1 (Tomorrow)
  { 
    id: 4, 
    patientName: 'Sarah Williams', 
    age: 31,
    email: 'sarah.w@example.com',
    phone: '+1 234 567 8903',
    date: getDateString(1), 
    time: '09:30 AM', 
    reason: 'Prescription Renewal',
    status: 'Confirmed' 
  },
  { 
    id: 5, 
    patientName: 'David Brown', 
    age: 55,
    email: 'david.b@example.com',
    phone: '+1 234 567 8904',
    date: getDateString(1), 
    time: '11:00 AM', 
    reason: 'Blood Pressure Check',
    status: 'Pending' 
  },
  { 
    id: 6, 
    patientName: 'Lisa Anderson', 
    age: 38,
    email: 'lisa.a@example.com',
    phone: '+1 234 567 8905',
    date: getDateString(1), 
    time: '01:30 PM', 
    reason: 'Allergy Testing',
    status: 'Confirmed' 
  },
  { 
    id: 7, 
    patientName: 'James Wilson', 
    age: 47,
    email: 'james.w@example.com',
    phone: '+1 234 567 8906',
    date: getDateString(1), 
    time: '03:00 PM', 
    reason: 'Annual Physical Exam',
    status: 'Pending' 
  },
  // Day 2
  { 
    id: 8, 
    patientName: 'Maria Garcia', 
    age: 29,
    email: 'maria.g@example.com',
    phone: '+1 234 567 8907',
    date: getDateString(2), 
    time: '09:00 AM', 
    reason: 'Prenatal Checkup',
    status: 'Confirmed' 
  },
  { 
    id: 9, 
    patientName: 'Robert Taylor', 
    age: 62,
    email: 'robert.t@example.com',
    phone: '+1 234 567 8908',
    date: getDateString(2), 
    time: '10:30 AM', 
    reason: 'Cardiac Follow-up',
    status: 'Confirmed' 
  },
  { 
    id: 10, 
    patientName: 'Jennifer Lee', 
    age: 34,
    email: 'jennifer.l@example.com',
    phone: '+1 234 567 8909',
    date: getDateString(2), 
    time: '02:00 PM', 
    reason: 'Skin Rash Examination',
    status: 'Pending' 
  },
  // Day 3
  { 
    id: 11, 
    patientName: 'Christopher Moore', 
    age: 41,
    email: 'chris.m@example.com',
    phone: '+1 234 567 8910',
    date: getDateString(3), 
    time: '09:30 AM', 
    reason: 'Back Pain Consultation',
    status: 'Pending' 
  },
  { 
    id: 12, 
    patientName: 'Amanda Martinez', 
    age: 26,
    email: 'amanda.m@example.com',
    phone: '+1 234 567 8911',
    date: getDateString(3), 
    time: '11:00 AM', 
    reason: 'Migraine Treatment',
    status: 'Confirmed' 
  },
  { 
    id: 13, 
    patientName: 'Daniel Johnson', 
    age: 53,
    email: 'daniel.j@example.com',
    phone: '+1 234 567 8912',
    date: getDateString(3), 
    time: '01:00 PM', 
    reason: 'Lab Results Review',
    status: 'Confirmed' 
  },
  { 
    id: 14, 
    patientName: 'Patricia White', 
    age: 45,
    email: 'patricia.w@example.com',
    phone: '+1 234 567 8913',
    date: getDateString(3), 
    time: '03:30 PM', 
    reason: 'Thyroid Check',
    status: 'Pending' 
  },
  // Day 4
  { 
    id: 15, 
    patientName: 'Kevin Harris', 
    age: 37,
    email: 'kevin.h@example.com',
    phone: '+1 234 567 8914',
    date: getDateString(4), 
    time: '09:00 AM', 
    reason: 'Vaccination',
    status: 'Confirmed' 
  },
  { 
    id: 16, 
    patientName: 'Michelle Thomas', 
    age: 32,
    email: 'michelle.t@example.com',
    phone: '+1 234 567 8915',
    date: getDateString(4), 
    time: '10:00 AM', 
    reason: 'Anxiety Counseling',
    status: 'Pending' 
  },
  { 
    id: 17, 
    patientName: 'Brian Jackson', 
    age: 49,
    email: 'brian.j@example.com',
    phone: '+1 234 567 8916',
    date: getDateString(4), 
    time: '11:30 AM', 
    reason: 'Cholesterol Check',
    status: 'Confirmed' 
  },
  { 
    id: 18, 
    patientName: 'Rachel Davis', 
    age: 27,
    email: 'rachel.d@example.com',
    phone: '+1 234 567 8917',
    date: getDateString(4), 
    time: '02:30 PM', 
    reason: 'Nutrition Consultation',
    status: 'Pending' 
  },
  // Day 5
  { 
    id: 19, 
    patientName: 'Steven Miller', 
    age: 58,
    email: 'steven.m@example.com',
    phone: '+1 234 567 8918',
    date: getDateString(5), 
    time: '10:00 AM', 
    reason: 'Knee Pain Treatment',
    status: 'Confirmed' 
  },
  { 
    id: 20, 
    patientName: 'Nicole Wilson', 
    age: 33,
    email: 'nicole.w@example.com',
    phone: '+1 234 567 8919',
    date: getDateString(5), 
    time: '11:30 AM', 
    reason: 'Eye Strain Checkup',
    status: 'Pending' 
  },
  // Day 6
  { 
    id: 21, 
    patientName: 'Thomas Anderson', 
    age: 44,
    email: 'thomas.a@example.com',
    phone: '+1 234 567 8920',
    date: getDateString(6), 
    time: '10:00 AM', 
    reason: 'Chronic Cough Evaluation',
    status: 'Confirmed' 
  },
  { 
    id: 22, 
    patientName: 'Jessica Martinez', 
    age: 36,
    email: 'jessica.m@example.com',
    phone: '+1 234 567 8921',
    date: getDateString(6), 
    time: '01:00 PM', 
    reason: 'Post-Surgery Follow-up',
    status: 'Confirmed' 
  }
];
