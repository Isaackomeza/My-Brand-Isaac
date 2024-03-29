// const db = firebase.firestore();
const blogUI = document.querySelector('.post-container');

// document.getElementById('comment-form').addEventListener('submit', submitComment);

// Getting blog UI from firebase

const getBlogUI = (data) => {
    let ui = '';
    data.forEach(item => {
        const blog = item.data();
        console.log(blog);
        let blogUIFormat = `
    <div class="published-blog">
      <div class="post-title">
          <i class="fas fa-2x fa-edit"></i>
          <h1>${blog.title}</h1>
      </div><hr>
      <div class="published">
              <span>Published: ${blog.date}</span>
              <span>Author: <small>${blog.author}</small></span>
          </div><br>
      <p >
        <p id="full-blog">${blog.description}</p>
        <a href="blog.html">See Other Posts<i class="icon fas fa-angle-double-right"></i></a>
      </p>
                <div class="awesome">
                    <div><i class="icon fas fa-2x fa-thumbs-up"></i><span>22</span></div>
                    <div><i class="icon fas fa-2x fa-share-alt"></i><span>15</span></div>
                    <div><i class="icon far fa-2x fa-comment-dots"></i><span>28</span></div>
                </div><br>
            
        <div class="message">
          <form id="comment-form">
            <label for="comment-message">Leave Your Comment:</label>
            <input type="text" placeholder="Your Name" id="comment-name">
            <input type="email" placeholder="Email" id="comment-email">
            <textarea name="comment" id="comment-message" cols="30" rows="10" placeholder="Write your comment here"></textarea>
            <div class="comment-alert">Your comment is sent</div>
            <button type="submit" id="comment-btn" onclick="submitComment(); return false;">Send</button>
          </form>           
        </div>
      </div>   
      
    </div>
      `
        ui += blogUIFormat
    })
    blogUI.innerHTML = ui
}



db.collection("Blogs").orderBy("date").get().then(info => {
    getBlogUI(info.docs)
});

// Integrating comment form with firebase

function submitComment() {


    // Get values
    var commentName = getInputVal('comment-name');
    var commentEmail = getInputVal('comment-email');
    var commentMessage = getInputVal('comment-message');

    // save message
    saveComment(commentName, commentEmail, commentMessage);
    // show alert
    document.querySelector('.comment-alert').style.display = 'block';

    // Hide alert after 3 seconds
    setTimeout(function() {
        document.querySelector('.comment-alert').style.display = 'none';
    }, 3000);

    // Clear Form
    document.getElementById('comment-form').reset();
}

// Function to get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}

function saveComment(a, b, c) {
    db.collection('Comments').doc().set({
        name: a,
        email: b,
        comment: c,
    }).then(function() {
        console.log('Comment is saved');
    }).catch(function(err) {
        console.log('Comment is not saved');
    })

}