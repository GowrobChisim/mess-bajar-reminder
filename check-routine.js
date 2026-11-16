const https = require('https');

// ১ম সপ্তাহের রুটিন (Week 1)
const week1Schedule = {
  6: ["Biplob", "Mahid"],       // শনিবার
  0: ["Gowrob", "Yasin"],       // রবিবার
  1: ["Fahad", "Irak"],         // সোমবার
  2: ["Rashedul", "Ahad"],      // মঙ্গলবার
  3: ["Rakib", "Mahbub"],       // বুধবার
  4: ["Sonjoy", "Irak", "Mahbub"], // বৃহস্পতিবার
  5: ["Palash", "Ahad"]         // শুক্রবার
};

// ২য় সপ্তাহের রুটিন (Week 2)
const week2Schedule = {
  6: ["Biplob", "Mahid"],       // শনিবার
  0: ["Gowrob", "Yasin"],       // রবিবার
  1: ["Fahad", "Irak"],         // সোমবার
  2: ["Rafsan", "Mahid"],       // মঙ্গলবার
  3: ["Harun", "Mahbub"],       // বুধবার
  4: ["Nafis", "Mahid"],        // বৃহস্পতিবার
  5: ["Nasir", "Yasin"]         // শুক্রবার
};

// একটি নির্দিষ্ট তারিখ থেকে ১ম বা ২য় সপ্তাহ বের করার ফাংশন
function getIsFirstWeek(currentDate) {
  // ১৪ নভেম্বর ২০২৬ (শনিবার) কে ১ম সপ্তাহের শুরুর দিন হিসেবে ফিক্স করা হলো (এখানে মাস 0 থেকে শুরু হয়, তাই 10 = নভেম্বর)
  const anchorDate = Date.UTC(2026, 10, 14); 
  const current = Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  
  // ওই নির্দিষ্ট তারিখ থেকে আজ পর্যন্ত কত দিন পার হয়েছে
  const diffInDays = Math.floor((current - anchorDate) / (1000 * 60 * 60 * 24));
  
  // কত সপ্তাহ পার হয়েছে
  const weeksPassed = Math.floor(diffInDays / 7);
  
  // জোড় সপ্তাহ (0, 2, 4...) হলে ১ম সপ্তাহ, বিজোড় (1, 3, 5...) হলে ২য় সপ্তাহ
  return (weeksPassed % 2 === 0);
}

function sendNotification(memberId, dayName, weekName) {
  const topic = `Jony_Mess_${memberId}`; 
  
  const data = JSON.stringify({
    topic: topic,
    title: `🛒 আজকের মেস বাজার (${weekName})`,
    message: `হ্যালো ${memberId}! আজ ${dayName}, আপনার মেসের বাজার করার পালা। দ্রুত বাজার করে ফেলুন।`,
    priority: 5,
    tags: ["shopping_cart", "bell"]
  });

  const options = {
    hostname: 'ntfy.sh',
    port: 443,
    path: `/`,
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
const isFirstWeek = getIsFirstWeek(today); 

const dayIndex = today.getDay(); 
const dayNames = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
const todayName = dayNames[dayIndex];
const weekName = isFirstWeek ? "১ম সপ্তাহ" : "২য় সপ্তাহ";

const todayMembers = isFirstWeek ? week1Schedule[dayIndex] : week2Schedule[dayIndex];

console.log(`আজ ${todayName} (${weekName}), বাজারের দায়িত্বে আছেন:`, todayMembers);

// আজকের বাজারকারীদের নোটিফিকেশন পাঠানো
if (todayMembers) {
  todayMembers.forEach(id => {
    if(id) sendNotification(id, todayName, weekName);
  });
}