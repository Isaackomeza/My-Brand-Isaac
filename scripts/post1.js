const db = firebase.firestore();
const blogUI = document.querySelector('.published-blog');

// Getting blog from firebase

const getBlogUI = (data)=>{
    let ui= '';
    data.forEach(item=>{
      const blog =item.data();
      console.log(blog);
      let blogUIFormat =`
        <div class="post-title">
        <i class="fas fa-2x fa-edit"></i>
        <h1>${blog.title}</h1>
        </div><hr>
        <div class="published">
            <span>Published: 11:23AM 21<sup>st</sup> July, 2020</span>
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
            <div>
                <label for="message">Leave Your Comment:</label>
                <input type="text" placeholder="Your Name">
                <input type="email" placeholder="Email">
                <textarea name="comment" id="message" cols="30" rows="10" placeholder="Write your comment here"></textarea>
                <button>Send</button>
            </div>           
            <div><img id="message-image" src="../assets/images/comment.svg" alt="Write"></div>
        </div>
      `
      ui+=blogUIFormat
    })
    blogUI.innerHTML = ui
  }



  db.collection("Blogs").get().then(info=>{
    getBlogUI(info.docs)
})