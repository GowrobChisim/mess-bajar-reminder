const https = require('https');

const weeklySchedule = {
  6: ["Gowrob", "Irak"],          // শনিবার
  0: ["Biplob", "Yasin"],         // রবিবার
  1: ["Fahad", "Mahid"],          // সোমবার
  2: ["Rakib", "Rashed", "Ahad"], // মঙ্গলবার
  3: ["Palash", "Sonjoy", "Mahbub"], // বুধবার
  4: ["Harun", "Rafsan", "Yasin", "Irak"], // বৃহস্পতিবার
  5: ["Nasir", "Nafis", "Mahid", "Ahad"]   // শুক্রবার
};

function sendNotification(memberId, dayName) {
  const topic = `sherpur_mess_${memberId}`;
  const data = JSON.stringify({
    topic: topic,
    title: "🛒 আজকের মেস বাজার রিমাইন্ডার",
    message: `হ্যালো! আজ (${dayName}) আপনার মেসের বাজার করার পালা। দ্রুত বাজার করে ফেলুন।`,
    priority: "high",
    tags: ["shopping_cart", "bell"]
  });

  const options = {
    hostname: 'ntfy.sh',
    port: 443,
    path: `/${topic}`,
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

const today = new Date();
const dayIndex = today.getDay(); 
const dayNames = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
const todayName = dayNames[dayIndex];

const todayMembers = weeklySchedule[dayIndex] || [];
console.log(`আজ ${todayName}, বাজারের দায়িত্বে আছেন:`, todayMembers);

todayMembers.forEach(id => {
  sendNotification(id, todayName);
});
