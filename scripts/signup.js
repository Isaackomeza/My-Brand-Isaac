const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

const signUpBtn = document.querySelector('#signupbtn');

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
  // Check passwords match
function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
      showError(input2, 'Please enter the similar password');
    }
  }

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      window.location.href = '../pages/blog.html';
    } else {
      console.log('User not sign in');
    }
  });

signUpBtn.addEventListener('click', e=>{
    e.preventDefault();
    // Integrating with firebase
    const userEmail = document.getElementById('email').value;
    const userPass = document.getElementById('password').value;
    const promise = firebase.auth().createUserWithEmailAndPassword(userEmail, userPass);
    promise.then(user=> console.log(user))
    promise.catch(e=> console.log(e.message));
    // checking for validation
    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
    
  });
