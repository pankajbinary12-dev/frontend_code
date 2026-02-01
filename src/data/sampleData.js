// Sample data for the dashboard
// Aap yahan se easily data change kar sakte hain

export const todayBirthdays = [
  { name: 'SAIBA CHERJI', class: 'II - C', avatar: 'SC' },
  { name: 'KRISHN AGRAWAL', class: 'II - C', avatar: 'KA' },
  { name: 'ARPAN AGARWAL', class: 'II - C', avatar: 'AA' },
]

export const staffBirthdays = [
  // Add staff birthdays here
  // { name: 'Teacher Name', department: 'Mathematics', avatar: 'TN' },
]

export const leaveRequests = [
  { id: 1, type: 'Leave Request', count: 3, status: 'pending' },
]

export const absentStaff = [
  // Add absent staff here
  // { name: 'Staff Name', department: 'Science', reason: 'Sick Leave' },
]

export const absentStudents = [
  // Add absent students here
  // { name: 'Student Name', class: 'X-A', reason: 'Medical' },
]

export const attendanceClasses = [
  'NURSERY-C', 'NURSERY-B', 'NURSERY-A', 
  'KG-II', 'KG-I', 'KG-C',
  'I-H', 'I-A', 'I-C', 'I-I',
  'II-H', 'III-A', 'IV-H', 'IV-A', 'IV-C',
  'V-A', 'V-C', 'VI-H', 'VII-A', 'VIII-C',
  'IX-A', 'IX-B', 'X-A', 'X-B',
  'XI-A', 'XI-B', 'XII-A', 'XII-B'
]

export const hwClasses = [
  'XII-A', 'XII-B', 'XII-C',
  'XI-COMM-I', 'XI-COMM-C',
  'XII-HUMANITIES-A',
  'XII-COMM-I', 'XII-COMM-C',
  'X-A', 'X-B', 'IX-A', 'IX-B'
]

export const messages = [
  {
    id: 1,
    title: 'TESTING',
    class: 'NURSERY',
    date: new Date().toLocaleDateString(),
    content: 'Sample message content'
  },
  {
    id: 2,
    title: 'Parent Meeting',
    class: 'ALL',
    date: new Date().toLocaleDateString(),
    content: 'Parent-teacher meeting scheduled'
  }
]

export const notices = [
  {
    id: 1,
    title: 'TESTING',
    class: 'NURSERY',
    date: new Date().toLocaleDateString(),
    content: 'Sample notice content'
  },
  {
    id: 2,
    title: 'Holiday Notice',
    class: 'ALL',
    date: new Date().toLocaleDateString(),
    content: 'School will remain closed tomorrow'
  }
]

export const schoolInfo = {
  name: 'School Name',
  code: 'SCH001',
  address: 'School Address Here',
  phone: '+91 1234567890',
  email: 'info@school.com'
}

// Statistics data
export const stats = {
  totalStudents: 1250,
  totalStaff: 85,
  totalClasses: 45,
  presentToday: 1180,
  absentToday: 70,
  attendancePercentage: 94.4
}
