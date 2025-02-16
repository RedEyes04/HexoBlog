var posts=["2024/10/20/3414119f9e2f/","2024/10/20/dc0df2ca5edc/","2024/10/19/5bc1b447c5a0/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };