// const db = firebase.firestore();
document.getElementById('admin-form').addEventListener('submit', submitBlog);
const messagesUI= document.querySelector('.admin-messages');
const blogUI = document.querySelector('#table');

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
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
console.log(dateTime)
// save Blog to firebase
function saveBlog(author, title, description){

db.collection('Blogs').doc().set({
  author: author,
  title: title,
  description: description,
  date: dateTime
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
   const ele=document.getElementById('admin-form-container')
  ele.style.display=ele.style.display==="block"?"none":"block";
   console.log(' works are here her her hereh ehere works');
 }

 // Get blog ui in table
 const getBlogUI = (data)=>{
  let ui= `
  <caption><b>Lists of Blogs</b></caption><br/>
  <tr>
      <th>Blog Title</th>
      <th>Date of Publication</th>
      <th>Edit Blog</th>
      <th>Delete Blog</th>
  </tr>
  `;
  data.forEach(item=>{
    const blog =item.data();
    //console.log(item.id)
    console.log(blog);
    let blogUIFormat =`
 
        <tr>
            <td>${blog.title}</td>
            <td>${blog.date}</td>
            <td><img onclick="editBlog(${item.id})" src="https://img.icons8.com/cotton/50/000000/edit--v2.png"/></td>
            <td><img onclick="deleteBlog(${item.id})" id="${item.id}" src="https://img.icons8.com/color/48/000000/delete-forever.png"/></td>
        </tr>
    `
    ui+=blogUIFormat
  })
  blogUI.innerHTML = ui
}



db.collection("Blogs").get().then(info=>{
  getBlogUI(info.docs)
});

// deleting a Blog

function deleteBlog(e){
  let id=e.getAttribute('id')
  db.collection('Blogs').doc(id).delete().then(()=>{
    alert('Blog deleted');
  }).then(()=>{
    db.collection("Blogs").get().then(info=>{
      getBlogUI(info.docs)
    });
  })
}

const updateAuthor= document.querySelector('#update-author')
const updateTitle= document.querySelector('#update-blog-title')
const updateBlogDesc= document.querySelector('#update-blog-description')
const updateForm= document.querySelector('.admin-update-form')
const update= document.querySelector('.update')


const updateBlog =(data)=>{
  let blog= data.data()
  let id= data.id
  update.style.display="block"
  updateAuthor.value= blog.author
  updateTitle.value= blog.title
  updateBlogDesc.value= blog.description
  updateForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    db.collection("Blogs").doc(id).update({
      author: updateAuthor.value,
      title: updateTitle.value,
      description: updateBlogDesc.value
    }).then(()=>{
      alert('Blog updated successfully')
    }).then(()=>{
      updateForm.reset()
      db.collection("Blogs").get().then(info=>{
        getBlogUI(info.docs)
      });
    })
    
  })
}

function editBlog(e){
  let id= e.getAttribute('id')
  console.log(id)
  db.collection("Blogs").doc(id).get().then(items=>{
    updateBlog(items)
  })
}


