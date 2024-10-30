(() => {
  const postForm = document.getElementById("postForm");
  const postContent = document.getElementById("postContent");
  const postsContainer = document.getElementById("postsContainer");

  const getPosts = () => {
    return JSON.parse(localStorage.getItem("posts")) || [];
  };

  const renderPost = () => {
    const posts = getPosts();
    posts.sort((a, b) => b.timestamp - a.timestamp);

    if (!posts.length) {
      postsContainer.innerHTML = "";
      postsContainer.insertAdjacentHTML(
        "afterbegin",
        "<li class='post'>No messages</li>"
      );
    } else {
      const markup = posts
        .map(
          (post) => `<li class="post">
            <div class="post__wrap">
                <img
                  class="post__img"
                  src="./images/user_female.webp"
                  alt="user image"
                  width="100"
                />
                <p class="post__text">${post.content}</p>
              </div>
              <p class="post__date">${new Date(
                post.timestamp
              ).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}</p>
              <button class="post__button" data-postid="${post.id}">x</button>
            </li>`
        )
        .join("");

      postsContainer.innerHTML = "";
      postsContainer.insertAdjacentHTML("afterbegin", markup);
    }
  };

  renderPost();

  const addPost = (post) => {
    const posts = getPosts();
    posts.push(post);
    localStorage.setItem("posts", JSON.stringify(posts));
    renderPost();
  };

  const deletePost = (id) => {
    const posts = getPosts().filter((post) => post.id !== Number(id));
    localStorage.setItem("posts", JSON.stringify(posts));
    renderPost();
  };

  postsContainer.addEventListener("click", (evt) => {
    if (evt.target.nodeName !== "BUTTON") {
      return;
    }

    deletePost(evt.target.dataset.postid);
  });

  postForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = postContent.value.trim();

    if (!content) return Notiflix.Notify.failure("The message cannot be empty");

    const post = {
      id: Date.now(),
      content: content,
      timestamp: Date.now(),
    };

    addPost(post);
    postContent.value = "";
  });
})();
