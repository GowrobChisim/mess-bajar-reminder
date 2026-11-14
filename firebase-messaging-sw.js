// // self.addEventListener('install', () => self.skipWaiting());
// // self.addEventListener('activate', () => self.clients.claim());



//     import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
//     import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

//     const firebaseConfig = {
//       apiKey: "AIzaSyColoFQzH6zr-cQRS3xMUjEpwJiP_qoz4g",
//       authDomain: "bajar-reminder.firebaseapp.com",
//       projectId: "bajar-reminder",
//       storageBucket: "bajar-reminder.firebasestorage.app",
//       messagingSenderId: "685073061470",
//       appId: "1:685073061470:web:1c328b9799109e3cbec6cf",
//       measurementId: "G-2K785S5NRB"
//     };

//     const app = initializeApp(firebaseConfig);
//     const auth = getAuth(app);

//     // মেসের ১৬ জন সদস্যের তালিকা ও বারের তথ্য
//     const membersData = [
//       { id: "Biplob", bnName: "গৌরব", days: ["শনিবার"] },
//       { id: "Irak", bnName: "ইরাক", days: ["শনিবার", "বৃহস্পতিবার"] },
//       { id: "Gowrob", bnName: "গৌরব", days: ["রবিবার"] },
//       { id: "Yasin", bnName: "ইয়াসিন", days: ["রবিবার", "বৃহস্পতিবার"] },
//       { id: "Fahad", bnName: "ফাহাদ", days: ["সোমবার"] },
//       { id: "Mahid", bnName: "মাহিদ", days: ["সোমবার", "শুক্রবার"] },
//       { id: "Rakib", bnName: "রাকিব ভাই", days: ["মঙ্গলবার"] },
//       { id: "Rashed", bnName: "রাশেদ ভাই", days: ["মঙ্গলবার"] },
//       { id: "Ahad", bnName: "আহাদ", days: ["মঙ্গলবার", "শুক্রবার"] },
//       { id: "Palash", bnName: "পলাশ ভাই", days: ["বুধবার"] },
//       { id: "Sonjoy", bnName: "সঞ্জয় ভাই", days: ["বুধবার"] },
//       { id: "Mahbub", bnName: "মাহবুব", days: ["বুধবার"] },
//       { id: "Harun", bnName: "হারুন ভাই", days: ["বৃহস্পতিবার"] },
//       { id: "Rafsan", bnName: "রাফসান", days: ["বৃহস্পতিবার"] },
//       { id: "Nasir", bnName: "নাসির ভাই", days: ["শুক্রবার"] },
//       { id: "Nafis", bnName: "নাফিস ভাই", days: ["শুক্রবার"] }
//     ];

//     // বার অনুযায়ী বাজারের রুটিন (JavaScript getDay(): 0=রবিবার, 6=শনিবার)
//     const weeklySchedule = [
//       { dayIndex: 6, dayBn: "শনিবার", memberIds: ["Biplob", "Irak"] },
//       { dayIndex: 0, dayBn: "রবিবার", memberIds: ["Gowrob", "Yasin"] },
//       { dayIndex: 1, dayBn: "সোমবার", memberIds: ["Fahad", "Mahid"] },
//       { dayIndex: 2, dayBn: "মঙ্গলবার", memberIds: ["Rakib", "Rashed", "Ahad"] },
//       { dayIndex: 3, dayBn: "বুধবার", memberIds: ["Palash", "Sonjoy", "Mahbub"] },
//       { dayIndex: 4, dayBn: "বৃহস্পতিবার", memberIds: ["Harun", "Rafsan", "Yasin", "Irak"] },
//       { dayIndex: 5, dayBn: "শুক্রবার", memberIds: ["Nasir", "Nafis", "Mahid", "Ahad"] }
//     ];

//     const memberSelect = document.getElementById('memberSelect');
//     const weeklyRoutineList = document.getElementById('weeklyRoutineList');
//     const allMembersList = document.getElementById('allMembersList');
//     const status = document.getElementById('status');

//     // ড্রপডাউনে ১৬ জনের নাম বসানো
//     membersData.forEach(m => {
//       const opt = document.createElement('option');
//       opt.value = m.id;
//       opt.innerText = `${m.bnName} (${m.days.join(' ও ')})`;
//       memberSelect.appendChild(opt);
//     });

//     // একক মেম্বারকে নোটিফিকেশন পাঠানোর ফাংশন
//     window.sendAlertToMember = async (memberId, bnName) => {
//       const topic = `sherpur_mess_${memberId}`;
//       status.innerText = `⏳ ${bnName}-এর ফোনে নোটিফিকেশন পাঠানো হচ্ছে...`;
//       try {
//         await fetch(`https://ntfy.sh/${topic}`, {
//           method: 'POST',
//           body: `হ্যালো ${bnName}, আজ আপনার মেসের বাজার করার পালা! দ্রুত বাজার করে ফেলুন। 🛒`,
//           headers: {
//             'Title': 'Mess Bajar Reminder',
//             'Priority': 'high',
//             'Tags': 'shopping_cart,bell'
//           }
//         });
//         status.innerText = `✅ ${bnName}-এর ফোনে নোটিফিকেশন চলে গেছে!`;
//       } catch (err) {
//         status.innerText = "❌ নোটিফিকেশন পাঠাতে সমস্যা হয়েছে!";
//       }
//     };

//     // নির্দিষ্ট বারের সবাইকে একসাথে নোটিফিকেশন পাঠানোর ফাংশন
//     window.sendAlertToGroup = async (memberIds, dayBn) => {
//       status.innerText = `⏳ ${dayBn}-এর বাজারকারীদের ফোনে নোটিফিকেশন পাঠানো হচ্ছে...`;
//       try {
//         for (const id of memberIds) {
//           const member = membersData.find(m => m.id === id);
//           if (member) {
//             await fetch(`https://ntfy.sh/sherpur_mess_${member.id}`, {
//               method: 'POST',
//               body: `হ্যালো ${member.bnName}, আজ (${dayBn}) আপনার মেসের বাজার করার পালা! 🛒`,
//               headers: {
//                 'Title': 'Mess Bajar Reminder',
//                 'Priority': 'high',
//                 'Tags': 'shopping_cart,bell'
//               }
//             });
//           }
//         }
//         status.innerText = `✅ ${dayBn}-এর সকল বাজারকারীর ফোনে নোটিফিকেশন চলে গেছে!`;
//       } catch (err) {
//         status.innerText = "❌ নোটিফিকেশন পাঠাতে সমস্যা হয়েছে!";
//       }
//     };

//     // ড্যাশবোর্ডে সাপ্তাহিক রুটিন ও ১৬ জন মেম্বারের লিস্ট দেখানো
//     function renderDashboardList() {
//       const todayIndex = new Date().getDay(); // 0 (রবি) থেকে 6 (শনি)
//       const todaySchedule = weeklySchedule.find(d => d.dayIndex === todayIndex);

//       const todayMemberNames = todaySchedule.memberIds.map(id => {
//         return membersData.find(m => m.id === id)?.bnName;
//       }).join(', ');

//       document.getElementById('todayDayText').innerText = todaySchedule.dayBn;
//       document.getElementById('todayBajarMembers').innerText = todayMemberNames;

//       document.getElementById('notifyTodayBtn').onclick = () => {
//         window.sendAlertToGroup(todaySchedule.memberIds, todaySchedule.dayBn);
//       };

//       // ১. সাপ্তাহিক রুটিন রেন্ডার করা
//       weeklyRoutineList.innerHTML = "";
//       weeklySchedule.forEach(item => {
//         const isToday = item.dayIndex === todayIndex;
//         const names = item.memberIds.map(id => membersData.find(m => m.id === id)?.bnName).join(', ');
//         const idsString = JSON.stringify(item.memberIds).replace(/"/g, "'");

//         const div = document.createElement('div');
//         div.className = `p-3 rounded-lg flex justify-between items-center border ${isToday ? 'bg-green-900/40 border-green-500' : 'bg-gray-700/60 border-gray-600'}`;
//         div.innerHTML = `
//           <div>
//             <p class="font-bold text-sm ${isToday ? 'text-green-400' : 'text-white'}">
//               ${item.dayBn} ${isToday ? '⭐ (আজ)' : ''}
//             </p>
//             <p class="text-xs text-gray-300 mt-0.5">${names}</p>
//           </div>
//           <button onclick="sendAlertToGroup(${idsString}, '${item.dayBn}')" class="bg-green-600 hover:bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded transition shrink-0">
//             🔔 সবাইকে পাঠান
//           </button>
//         `;
//         weeklyRoutineList.appendChild(div);
//       });

//       // ২. ১৬ জন সদস্যের আলাদা তালিকা রেন্ডার করা
//       allMembersList.innerHTML = "";
//       membersData.forEach(m => {
//         const isToday = todaySchedule.memberIds.includes(m.id);
//         const div = document.createElement('div');
//         div.className = `p-2.5 rounded-lg flex justify-between items-center border ${isToday ? 'bg-green-900/20 border-green-500/50' : 'bg-gray-700/40 border-gray-600'}`;
//         div.innerHTML = `
//           <div>
//             <p class="font-bold text-sm ${isToday ? 'text-green-400' : 'text-white'}">${m.bnName}</p>
//             <p class="text-xs text-gray-400">বার: ${m.days.join(', ')} | কোড: <span class="text-gray-300 font-mono">sherpur_mess_${m.id}</span></p>
//           </div>
//           <button onclick="sendAlertToMember('${m.id}', '${m.bnName}')" class="bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded transition shrink-0">
//             🔔 Notify
//           </button>
//         `;
//         allMembersList.appendChild(div);
//       });
//     }

//     // Login / Sign Up লজিক
//     let isSignUp = false;
//     const authSection = document.getElementById('authSection');
//     const dashboardSection = document.getElementById('dashboardSection');
//     const nameField = document.getElementById('nameField');
//     const authBtn = document.getElementById('authBtn');
//     const toggleBtn = document.getElementById('toggleBtn');
//     const toggleText = document.getElementById('toggleText');
//     const subTitle = document.getElementById('subTitle');

//     toggleBtn.addEventListener('click', () => {
//       isSignUp = !isSignUp;
//       status.innerText = "";
//       if (isSignUp) {
//         nameField.classList.remove('hidden');
//         authBtn.innerText = "রেজিস্ট্রেশন করুন (Sign Up)";
//         toggleText.innerText = "আগেই অ্যাকাউন্ট আছে?";
//         toggleBtn.innerText = "লগইন করুন (Login)";
//       } else {
//         nameField.classList.add('hidden');
//         authBtn.innerText = "লগইন করুন (Login)";
//         toggleText.innerText = "নতুন মেম্বার?";
//         toggleBtn.innerText = "নতুন অ্যাকাউন্ট খুলুন (Sign Up)";
//       }
//     });

//     authBtn.addEventListener('click', async () => {
//       const email = document.getElementById('email').value.trim();
//       const password = document.getElementById('password').value;
//       const memberName = memberSelect.value;

//       if (!email || !password) {
//         status.innerText = "⚠️ ইমেইল এবং পাসওয়ার্ড দিন!";
//         return;
//       }

//       try {
//         status.innerText = "⏳ অপেক্ষা করুন...";
//         if (isSignUp) {
//           if (!memberName) {
//             status.innerText = "⚠️ তালিকা থেকে আপনার নাম সিলেক্ট করুন!";
//             return;
//           }
//           const userCred = await createUserWithEmailAndPassword(auth, email, password);
//           await updateProfile(userCred.user, { displayName: memberName });
//           status.innerText = "✅ অ্যাকাউন্ট তৈরি সফল হয়েছে!";
//         } else {
//           await signInWithEmailAndPassword(auth, email, password);
//           status.innerText = "";
//         }
//       } catch (err) {
//         status.innerText = "❌ সমস্যা: " + err.message;
//       }
//     });

//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         const memberId = user.displayName || "Gowrob";
//         const memberObj = membersData.find(m => m.id === memberId) || membersData[0];
//         authSection.classList.add('hidden');
//         dashboardSection.classList.remove('hidden');
//         subTitle.innerText = "মেস বাজার ড্যাশবোর্ড";
//         document.getElementById('userNameDisplay').innerText = `${memberObj.bnName} (${memberObj.days.join(', ')})`;
//         document.getElementById('userEmailDisplay').innerText = user.email;
//         document.getElementById('topicCode').innerText = `sherpur_mess_${memberObj.id}`;
//         renderDashboardList();
//       } else {
//         authSection.classList.remove('hidden');
//         dashboardSection.classList.add('hidden');
//       }
//     });

//     document.getElementById('logoutBtn').addEventListener('click', () => {
//       signOut(auth);
//       status.innerText = "";
//     });
  