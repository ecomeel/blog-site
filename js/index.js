let postTitle = '';
const posts = [];

const newPostTitleInputNode = document.getElementById('newPostTitleInput');
const newPostTextNode = document.getElementById('newPostText');
const newPostBtnNode = document.getElementById('newPostBtn');
const postsNode = document.getElementById('posts');

const getDate = () => {
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    let day = new Date().getDate();
    let month = new Date().getMonth();
    const year = new Date().getFullYear();

    if (day < 10) day = `0${day}`;
    if (month < 10) month = `0${month}`;
    
    return {day, month, year, hours, minutes}
}

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
    const nowDate = getDate();

    const posts = getPosts()
    posts.forEach(post => {
        postsHTML += `
            <div class='post'>
                <p class='post__date'>${nowDate.day}.${nowDate.month}.${nowDate.year} ${nowDate.hours}:${nowDate.minutes}</p>
                <h3 class='post__title'>${post.title}</h3>
                <p class='post__text'>${post.text}</p>
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

const newPostHandler = () => {
    const postFromUser = getPostFromUser();
    addPost(postFromUser);

    renderPosts();
    getDate();
    console.log(posts)
}

newPostBtnNode.addEventListener('click', newPostHandler);