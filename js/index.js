let postTitle = '';
const posts = [];

const newPostTitleInputNode = document.getElementById('newPostTitleInput');
const newPostTextNode = document.getElementById('newPostText');
const newPostBtnNode = document.getElementById('newPostBtn');
const postsNode = document.getElementById('posts');

const getPostFromUser = () => {
    const time = new Date().toLocaleString();
    const title = newPostTitleInputNode.value;
    const text = newPostTextNode.value;
    return {
        time,
        title,
        text
    }
}

const renderPosts = () => {
    if (postsNode.innerText == 'Empty') postsNode.innerText = '';

    let postsHTML = '';
    const posts = getPosts();

    posts.forEach(post => {
        postsHTML = `
            <div class='post'>
                <p class='post__date'>${post.time}</p>
                <h3 class='post__title'>${post.title}</h3>
                <p class='post__text'>${post.text}</p>
            </div>
        ` + postsHTML;
    });

    postsNode.innerHTML = postsHTML;
}

const addPost = ({time, title, text}) => {
    posts.push({time, title, text});
}

const getPosts = () => {
    return posts;
}

const newPostHandler = () => {
    const postFromUser = getPostFromUser();

    addPost(postFromUser);

    renderPosts();
    console.log(posts)
}

newPostBtnNode.addEventListener('click', newPostHandler);
