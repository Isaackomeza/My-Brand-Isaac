const db = firebase.firestore();
const blogUI = document.querySelector('.post-container');

// Getting blog from firebase

const getBlogUI = (data)=>{
    let ui= '';
    data.forEach(item=>{
      const blog =item.data();
      console.log(blog);
      let blogUIFormat =`
      <div class="published-blog">
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
</div>   
  <div>
      <div class="latest-comment">
          <div class="argment">
              <div>
                  <h3>Peter</h3>
              </div>
              <div class="feeling">
                  <i class="icon fas fa-thumbs-up"></i><span>0</span>
                  <i class=" icon fas fa-thumbs-down"></i><span>0</span>
                  <i class="icon fas fa-reply"></i><span>0</span> 
              </div>
          </div>
          <textarea name="" id="" cols="30" rows="10">This is a wonderful topic I liked it. Vel turpis nunc eget lorem. Congue quisque egestas diam in arcu cursus euismod quis viverra.</textarea>
      </div>
      <div class="latest-comment">
          <div class="argment">
              <div>
                  <h3>Confiance</h3>
              </div>
              <div class="feeling">
                  <i class="icon fas fa-thumbs-up"></i><span>0</span>
                  <i class="icon fas fa-thumbs-down"></i><span>0</span>
                  <i class="icon fas fa-reply"></i><span>0</span>
              </div>
          </div>

          <textarea name="" id="" cols="30" rows="10">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In nibh mauris cursus mattis molestie a iaculis at erat. Amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus.</textarea>
      </div>
  </div>
      `
      ui+=blogUIFormat
    })
    blogUI.innerHTML = ui
  }



  db.collection("Blogs").get().then(info=>{
    getBlogUI(info.docs)
})