

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB626zM3wDSCb7GBBtTsPdm9h79NaZnu8M",
    authDomain: "weblogin-1e200.firebaseapp.com",
    databaseURL: "https://weblogin-1e200.firebaseio.com",
    projectId: "weblogin-1e200",
    storageBucket: "weblogin-1e200.appspot.com",
    messagingSenderId: "643879386209",
    appId: "1:643879386209:web:eda7528768433fe7d77e20"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Login form integration to firebase

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      document.getElementById("user-field").style.display = "block";
      document.getElementById("login").style.display = "none";

      var user = firebase.auth().currentUser;
      if(user !=null){
        var email_id = user.email;
        document.getElementById('user_para').innerHTML = "Welcome : " + email_id
      }
      
    } else {
      // No user is signed in.
      document.getElementById("user-field").style.display = "none";
      document.getElementById("login").style.display = "block";
    }
  });

  function logIn(){
    var userEmail = document.getElementById('email').value;
    var userPass = document.getElementById('password').value;
    // window.alert(userEmail);
    // console.log(userPass);
    // window.alert('works');
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(userInfo=>{
        console.log(userInfo)
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert("Error : " + errorMessage);
      // ...
    });
  }

  function logOut(){
    firebase.auth().signOut();
  }