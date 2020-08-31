
document.getElementById('contactForm').addEventListener('submit', submitForm);

function submitForm(e){
  e.preventDefault();
  
    // Get values
    var name = getInputVal('name');
    var email = getInputVal('email');
    var number = getInputVal('number');
    var message = getInputVal('message');
    
    // save message
    saveMessage(name, email, number, message);
    // show alert
    document.querySelector('.alert').style.display = 'block';
    
    // Hide alert after 3 seconds
    setTimeout(function(){
      document.querySelector('.alert').style.display = 'none';
    }, 3000);

    // Clear Form
    document.getElementById('contactForm').reset();
}

// Function to get form values
function getInputVal(id){
return document.getElementById(id).value;
}

// save message to firebase
function saveMessage(name, email, number, message){
db.collection('contact').doc().set({
  name: name,
  email: email,
  number: number,
  message: message
}).then(function (){
  console.log('Message saved');
}).catch(function(err){
  console.log('Message Not saved');
})

}