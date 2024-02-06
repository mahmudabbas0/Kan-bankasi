import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, onSnapshot, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// تكوين Firebase
const firebaseConfig = {
 apiKey: "AIzaSyBlm84e_TWmrF71V3jdFVzk8r3cSaYvygw",
 authDomain: "login-tasarim.firebaseapp.com",
 projectId: "login-tasarim",
 storageBucket: "login-tasarim.appspot.com",
 messagingSenderId: "997145491587",
 appId: "1:997145491587:web:5ed171cc1ffd847d2843b6"
 };

// تهيئة التطبيق
const app = initializeApp(firebaseConfig);

// الحصول على مرجع لقاعدة البيانات Firestore
const db = getFirestore(app);
const collectionRef = collection(db, "bagisciler");

// استعلام Firestore لاسترجاع البيانات وعرضها في الجدول
onSnapshot(collectionRef, (querySnapshot) => {
  const bloodCountsTable = document.getElementById("bloodCountsTable");
  bloodCountsTable.innerHTML = "";

  // حساب عدد المتبرعين من كل فصيلة دم
  const bloodCounts = {};
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const bloodGroup = data.kan;
    if (bloodCounts.hasOwnProperty(bloodGroup)) {
        bloodCounts[bloodGroup]++;
      } else {
        // إذا لم تكن فصيلة الدم موجودة، قم بإنشاء عداد جديد وضعه على واحد
        bloodCounts[bloodGroup] = 1;
      }
    });
  
   // عرض عدد المتبرعين لكل فصيلة دم في الجدول
  for (const bloodGroup in bloodCounts) {
    const count = bloodCounts[bloodGroup];

    const row = document.createElement("tr");

    const bloodGroupCell = document.createElement("td");
    bloodGroupCell.textContent = bloodGroup;
    row.appendChild(bloodGroupCell);

    const countCell = document.createElement("td");
    countCell.textContent = count;
    row.appendChild(countCell);

    bloodCountsTable.appendChild(row);
  }
  });
   
