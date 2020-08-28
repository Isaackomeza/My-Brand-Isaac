// const db = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

// Show input error message
function showError(input, message) {
  const formDiv = input.parentElement;
  formDiv.className = 'form-div error';
  const small = formDiv.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formDiv = input.parentElement;
  formDiv.className = 'form-div success';
}
  // Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function(input) {
    if (input.value === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}
    // Get fieldname
    function getFieldName(input) {
      return input.id.charAt(0).toUpperCase() + input.id.slice(1);
      
    }
      // Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}
  // Check input length
  function checkLength(input, min, max) {
    if (input.value.length < min) {
      showError(input,`${getFieldName(input)} must be at least ${min} characters`);
    } else if (input.value.length > max) {
      showError( input,`${getFieldName(input)} must be less than ${max} characters`);
    } else {
      showSuccess(input);
    }
  }

// Login form integration to firebase

// firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//       // User is signed in.
//       document.getElementById("user-field").style.display = "block";
//       document.getElementById("login").style.display = "none";

//       var user = firebase.auth().currentUser;
//       if(user !=null){
//         var email_id = user.email;
//         document.getElementById('user_para').innerHTML = "Welcome : " + email_id
//       }
      
//     } else {
//       // No user is signed in.
//       document.getElementById("user-field").style.display = "none";
//       document.getElementById("login").style.display = "block";
//     }
//   });

  function logIn(){
    var userEmail = document.getElementById('email').value;
    var userPass = document.getElementById('password').value;
    // window.alert(userEmail);
    // console.log(userPass);
    // window.alert('works');
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(userInfo=>{
        console.log(userInfo)
        db.collection("users").where("email", "==", userEmail)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            if (doc.data().role == 'admin'){
              window.location.href='admin.html';
            }else{
              window.location.href='post1.html';
            }
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert("Error : " + errorMessage);
      // ...
    });
    // Login form validation 
    checkRequired([email, password]);
    checkEmail(email);
    checkLength(password, 6, 15);
  }

  function googleLogIn(){
    firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log(user);
      // ...
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log(error);
      // ...
    });
  }

  // function logOut(){
  //   firebase.auth().signOut();
  // }

 