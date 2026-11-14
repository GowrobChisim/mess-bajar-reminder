const https = require('https');

//  (Week 1)
const week1Schedule = {
  6: ["Biplob", "Mahid"],       // sat
  0: ["Gowrob", "Yasin"],       // sun
  1: ["Fahad", "Babu"],         // mon
  2: ["Rashedul", "Ahad"],      // tue
  3: ["Rakib", "Mahbub"],       // wed
  4: ["Sonjoy", "Irak", "Mahbub"], // th
  5: ["Palash", "Ahad"]         // fr
};

// (Week 2)
const week2Schedule = {
  6: ["Biplob", "Mahid"],       
  0: ["Gowrob", "Yasin"],       
  1: ["Fahad", "Babu"],         
  2: ["Rafsan", "Mahid"],       
  3: ["Harun", "Mahbub"],       
  4: ["Nafis", "Mahid"],        
  5: ["Nasir", "Yasin"]         
};

// কোন সপ্তাহ চলছে তা বের করার ফাংশন
function getWeekNumber(date) {
  const start = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - start) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + start.getDay() + 1) / 7);
}

function sendNotification(memberId, dayName, weekName) {
  // আপনার টপিকের নাম (আপনি jony_mess দিলে সেটাই রাখবেন)
  const topic = `Jony_Mess_${memberId}`; 
  
  const data = JSON.stringify({
    topic: topic,
    title: `🛒 আজকের মেস বাজার (${weekName})`,
    message: `হ্যালো ${memberId}! আজ ${dayName}, আপনার মেসের বাজার করার পালা। দ্রুত বাজার করে ফেলুন।`,
    priority: "urgent",
    tags: ["shopping_cart", "bell"]
  });

  const options = {
    hostname: 'ntfy.sh',
    port: 443,
    path: `/`, // <--- ঠিক এই জায়গাটি পরিবর্তন করা হয়েছে (আগে `/${topic}` ছিল)
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data)
    }
  };

  const req = https.request(options, (res) => {
    console.log(`Notification sent to ${memberId}: status ${res.statusCode}`);
  });

  req.on('error', (error) => {
    console.error(`Error sending to ${memberId}:`, error);
  });

  req.write(data);
  req.end();
}

// আজকের দিন এবং সপ্তাহ চেক করা
const today = new Date();
const currentWeekNumber = getWeekNumber(today);
const isFirstWeek = currentWeekNumber % 2 !== 0; 

const dayIndex = today.getDay(); 
const dayNames = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
const todayName = dayNames[dayIndex];
const weekName = isFirstWeek ? "১ম সপ্তাহ" : "২য় সপ্তাহ";

const todayMembers = isFirstWeek ? week1Schedule[dayIndex] : week2Schedule[dayIndex];

console.log(`আজ ${todayName} (${weekName}), বাজারের দায়িত্বে আছেন:`, todayMembers);

// আজকের বাজারকারীদের নোটিফিকেশন পাঠানো
if (todayMembers) {
  todayMembers.forEach(id => {
    if(id) sendNotification(id, todayName, weekName);
  });
}