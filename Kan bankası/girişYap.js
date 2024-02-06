
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getDatabase,set,ref,child } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";
import { getAuth , signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";



 
const firebaseConfig = {
  apiKey: "AIzaSyBlm84e_TWmrF71V3jdFVzk8r3cSaYvygw",
  authDomain: "login-tasarim.firebaseapp.com",
  projectId: "login-tasarim",
  storageBucket: "login-tasarim.appspot.com",
  messagingSenderId: "997145491587",
  appId: "1:997145491587:web:5ed171cc1ffd847d2843b6"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);
const dbref= ref(db);


let EmailInp = document.getElementById("email");
let PassInp = document.getElementById("password");
let mainform = document.getElementById("mainform");


let LogIn = evt =>{
    evt.preventDefault();

    signInWithEmailAndPassword(auth , EmailInp.value , PassInp.value )
    .then((Credentials)=>{

       window.location.replace('anasayfa.html');
    })

    .catch((error)=>{
        alert("Email or Password is incorrect");
        console.log(error.code);
        console.log(error.message);
    })





}
mainform.addEventListener('submit' ,LogIn );






       