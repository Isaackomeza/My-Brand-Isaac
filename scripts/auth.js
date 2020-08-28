const admin= document.querySelector('.admin')
const logBtn= document.querySelector('.logbtn')
const logoBtn= document.querySelector('#logoutBtn')

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCcbbFjvGFwyBlqurW7X4dfyXtCo-Uf-zc",
  authDomain: "capstonecontact-ad4e9.firebaseapp.com",
  databaseURL: "https://capstonecontact-ad4e9.firebaseio.com",
  projectId: "capstonecontact-ad4e9",
  storageBucket: "capstonecontact-ad4e9.appspot.com",
  messagingSenderId: "424829186497",
  appId: "1:424829186497:web:dc40bf5e52738e709bbf40"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth= firebase.auth()
const db=firebase.firestore()


  auth.onAuthStateChanged(user=>{
    if(user){
        db.collection('users').doc(user.uid).get().then(info=>{
          console.log(info.data().role)
          if(info.data().role == 'admin'){
            admin.style.display='inline-block'
            logoBtn.style.display="inline-block"
            logBtn.style.display= 'none'
          }else{
            admin.style.display= 'none' 
            logoBtn.style.display="inline-block" 
            logBtn.style.display= 'none'         
            
          }
        })
        }else{
          logoBtn.style.display="none"
          admin.style.display= 'none' 
          logBtn.style.display= 'inline-block'
        }
      })

  logoBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    auth.signOut().then(()=>{
        window.location="../pages/login.html"
        console.log("Signed Out successfully")
    })
  })
    

