
            
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, onSnapshot , where , deleteDoc ,deleteField ,doc  } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

 const firebaseConfig = {
 apiKey: "AIzaSyBlm84e_TWmrF71V3jdFVzk8r3cSaYvygw",
 authDomain: "login-tasarim.firebaseapp.com",
 projectId: "login-tasarim",
 storageBucket: "login-tasarim.appspot.com",
 messagingSenderId: "997145491587",
 appId: "1:997145491587:web:5ed171cc1ffd847d2843b6"
 };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const collectionRef = collection(db, "bagisciler");

const tbody = document.getElementById("tbody1");


function createDeleteButton(docId) {
const deleteButton = document.createElement("button");
deleteButton.classList.add("btn", "btn-danger", "btn-sm");
deleteButton.textContent = "Bagışçıyı Sil";
deleteButton.addEventListener("click", () => deleteData(docId));
return deleteButton;
}

async function deleteData(docId) {
try {
await deleteDoc(doc(db, "bagisciler", docId));
alert("Bagışçı başaryla silindi   !");
} catch (error) {
alert(" Hata: "+error);
}
}


function renderData(snapshot) {
tbody.innerHTML = "";
snapshot.forEach(doc => {
const data = doc.data();
const row = document.createElement("tr");

const nameCell = document.createElement("td");
nameCell.textContent = data.AD;
row.appendChild(nameCell);

// الخلايا الأخرى...

const deleteCell = document.createElement("td");
deleteCell.appendChild(createDeleteButton(doc.id));
row.appendChild(deleteCell);

tbody.appendChild(row);
});
}
// استرجاع المعلومات وعرضها في الجدول
onSnapshot(collectionRef, (querySnapshot) => {
 tbody.innerHTML = ""; // مسح الصفوف الحالية

 querySnapshot.forEach((doc) => {
     const data = doc.data();

     // إنشاء صف جديد في الجدول
     const row = document.createElement("tr");

     // إنشاء خلايا الجدول وتعيين قيمها
     const nameCell = document.createElement("td");
     nameCell.textContent = data.ad;
     row.appendChild(nameCell);

     const fatherNameCell = document.createElement("td");
     fatherNameCell.textContent = data.babaadi;
     row.appendChild(fatherNameCell);

     const motherNameCell = document.createElement("td");
     motherNameCell.textContent = data.anneadi;
     row.appendChild(motherNameCell);

     const birthDateCell = document.createElement("td");
     birthDateCell.textContent = data.dogumTarihi;
     row.appendChild(birthDateCell);

     const phoneCell = document.createElement("td");
     phoneCell.textContent = data.numara;
     row.appendChild(phoneCell);

     const genderCell = document.createElement("td");
     genderCell.textContent = data.cinsiyet;
     row.appendChild(genderCell);

     const emailCell = document.createElement("td");
     emailCell.textContent = data.email;
     row.appendChild(emailCell);

     const bloodGroupCell = document.createElement("td");
     bloodGroupCell.textContent = data.kan;
     row.appendChild(bloodGroupCell);
      
     const deleteCell = document.createElement("td");
 const deleteButton = createDeleteButton(doc.id);
 deleteCell.appendChild(deleteButton);
 row.appendChild(deleteCell);




     // إضافة الصف إلى جسم الجدول
     tbody.appendChild(row);
 });
}); 