const blogUI = document.querySelector('.articles');

// Get blog ui summary
const getBlogUI = (data) => {
    let ui = "";
    data.forEach(item => {
        const blog = item.data()
        const description = blog.description.slice(233, 475)
            //console.log(item.id)
        console.log(blog);
        let blogUIFormat = `
   
    <div data-aos="fade-right" data-aos-duration="1500">
    <a href="post1.html"><h2>${blog.title}</h2></a>
      <p id="summary">${description}<a href="post1.html">Read More<i class="fas fa-angle-double-right"></i></a> </p>
      <section>
          <span>Comments : 2</span>
          <span>Published: ${blog.date}</span>
          <span>Author: ${blog.author}</span>
      </section>
    </div>
      `
        ui += blogUIFormat
    })
    blogUI.innerHTML = ui
}



db.collection("Blogs").get().then(info => {
    getBlogUI(info.docs)
});