let postTitle = '';
const posts = [];

const newPostTitleInputNode = document.getElementById('newPostTitleInput');
const newPostTextNode = document.getElementById('newPostText');
const newPostBtnNode = document.getElementById('newPostBtn');
const postsNode = document.getElementById('posts');



const getPostFromUser = () => {
    const title = newPostTitleInputNode.value;
    const text = newPostTextNode.value;
    return {
        title,
        text
    }
}

const renderPosts = () => {
    if (postsNode.innerText == 'Empty') postsNode.innerText = '';

    let postsHTML = '';

    const posts = getPosts()
    posts.forEach(post => {
        postsHTML += `
            <div>
                <p>${post.title}</p>
                <p>${post.text}</p>
            </div>
        `;
    });

    postsNode.innerHTML = postsHTML;
}

const addPost = ({title, text}) => {
    posts.push({title, text});
}

const getPosts = () => {
    return posts;
}

newPostBtnNode.addEventListener('click', function() {
    const postFromUser = getPostFromUser();
    addPost(postFromUser);

    renderPosts();

    console.log(posts)
})