 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
 import { getFirestore, doc, getDoc, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField  } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
 
 // Your web app's Firebase configuration
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
 const db = getFirestore();
 
 
 let ad = document.getElementById("Name");
 let babaadi = document.getElementById("fatherName");
 let anneadi = document.getElementById("motherName");
 let dogumTarihi = document.getElementById("Date");
 let numara = document.getElementById("PhoneNumber");
 let cinsiyet = document.getElementById("Gender");
 let email = document.getElementById("Email");
 let kan = document.getElementById("Blood");
 
 let insbtn = document.getElementById("insbtn");
 let selbtn = document.getElementById("selbtn");
 let delbtn = document.getElementById("delbtn");



 async function AddDocument_CustomID() {
  // التحقق من ملء جميع الحقول
  if (
    ad.value === "" ||
    babaadi.value === "" ||
    anneadi.value === "" ||
    dogumTarihi.value === "" ||
    numara.value === "" ||
    cinsiyet.value === "" ||
    email.value === "" ||
    kan.value === ""
  ) {
    alert("Tüm belgileri eklemeli !");
    return;
  }

  var ref = doc(db, "bagisciler", numara.value);
  const docRef = await setDoc(ref, {
    ad: ad.value,
    babaadi: babaadi.value,
    anneadi: anneadi.value,
    dogumTarihi: dogumTarihi.value,
    numara: numara.value,
    cinsiyet: cinsiyet.value,
    email: email.value,
    kan: kan.value
  })
  .then(() => {
    alert("Bagışçı başarıyla eklendi");
    document.getElementById("infoForm").reset();
  })
  .catch((error) => {
    alert("Bir hata oluştu " + error);
});
}
 
 async function GetADocument() {
   var ref = doc(db, "bagisciler", numara.value);
   const docsnap = await getDoc(ref);
 
   if (docsnap.exists()) {
     ad.value = docsnap.data().ad;
     babaadi.value = docsnap.data().babaadi;
     anneadi.value = docsnap.data().anneadi;
     dogumTarihi.value = docsnap.data().dogumTarihi;
     cinsiyet.value = docsnap.data().cinsiyet;
     email.value = docsnap.data().email;
     kan.value = docsnap.data().kan;
     
   } 
   
   else {
     alert("Veri bulunamadı");
   }
 }
 
 async function DeleteDocument() {
   var ref = doc(db, "bagisciler", numara.value);
   const docsnap = await getDoc(ref);
 
   if (!docsnap.exists()) {
     alert("Bagışçı bilgisi bulunamadı");
   }
 
   await deleteDoc(ref)
     .then(() => {
       alert("Bagışçı silindi");
       document.getElementById("infoForm").reset();
     })
     .catch((error) => {
       alert("error: " + error);
     });
 }
 
 async function EditDocument() {
 var ref = doc(db, "bagisciler", numara.value);
 const docsnap = await getDoc(ref);
 
 if (!docsnap.exists()) {
 alert("Bagışçı bilgisi bulunamadı");
 }
 
 await updateDoc(ref, {
 ad: ad.value,
 babaadi: babaadi.value,
 anneadi: anneadi.value,
 dogumTarihi: dogumTarihi.value,
 cinsiyet: cinsiyet.value,
 email: email.value,
 kan: kan.value
 })
 .then(() => {
 alert("Bagışçı bilgileri güncellendi");
 document.getElementById("infoForm").reset();
 })
 .catch((error) => {
 alert("Hata oluştu: " + error);
 });
 }
 
 insbtn.addEventListener("click",function () {
   AddDocument_CustomID();
 });
 
 selbtn.addEventListener("click", function () {
   GetADocument();
 });
 
 delbtn.addEventListener("click", function () {
   DeleteDocument();
 });
 
 let editbtn = document.getElementById("editbtn");
 
 editbtn.addEventListener("click", function () {
 EditDocument();
 });
   