const db = firebase.firestore();
document.getElementById('admin-form').addEventListener('submit', submitBlog);
const messagesUI= document.querySelector('.admin-messages');


function submitBlog(e){
  e.preventDefault();
  
    // Get values
    var author = getInputVal('author');
    var title = getInputVal('blog-title');
    var description = getInputVal('blog-description');
    
    // save message
    saveBlog(author, title, description);
    // show alert
    document.querySelector('.blog-alert').style.display = 'block';
    
    // Hide alert after 3 seconds
    setTimeout(function(){
      document.querySelector('.blog-alert').style.display = 'none';
    }, 3000);

    // Clear Form
    document.getElementById('admin-form').reset();
}

// Function to get form values
function getInputVal(id){
return document.getElementById(id).value;
}

// save Blog to firebase
function saveBlog(author, title, description){
db.collection('Blogs').doc().set({
  author: author,
  title: title,
  description: description,
}).then(function (){
  console.log('Blog is now saved');
}).catch(function(err){
  console.log('Sorry! Blog is not saved');
})

}

// getting messages

const getUI=(data)=>{
    let ui= "<h2>Messages</h2>"
    data.forEach(item=>{
        const message= item.data()
        console.log(message)
        const messageUIFormat=`
            <div class="user-comment">
                <div >
                    <div>
                        <h3>${message.name}</h3>
                    </div>
                </div>
                <textarea name="" id="" cols="30" rows="10">${message.message}</textarea>
            </div>
       
            `
            ui+=messageUIFormat
    })
    messagesUI.innerHTML= ui
    
}

db.collection("contact").get().then(data=>{
    getUI(data.docs)
})



 function display(){
  document.getElementById('admin-form-container').style.display="block";
   console.log('works');
 }