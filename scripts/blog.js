 // Get blog ui summary
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
              <td><img src="https://img.icons8.com/cotton/50/000000/edit--v2.png"/></td>
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