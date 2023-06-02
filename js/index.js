const ERROR_EMPTY_TITLE = 'Empty title name!';
const ERROR_EMPTY_TEXTAREA = 'Empty textarea!';
const ERROR_LARGE_TITLE = 'The title is more than 100 characters';
const ERROR_LARGE_TEXTAREA = 'The text is more than 200 characters';
const ERROR_CLASSNAME = 'error';
const ERROR_CLASSNAME_COLOR = 'red-color';
const EMPTY_POSTLIST_MESSAGE = 'Empty';
const TITLE_VALIDATION_LIMIT = 100;
const TEXTAREA_VALIDATION_LIMIT = 200;

const posts = [];

const newPostNode = document.getElementById('newPost')
const newPostTitleInputNode = document.getElementById('newPostTitleInput');
const newPostTextNode = document.getElementById('newPostText');
const newPostBtnNode = document.getElementById('newPostBtn');
const postsNode = document.getElementById('posts');

const errorMessage = document.createElement('p');
errorMessage.className = ERROR_CLASSNAME_COLOR;

const getPostFromUser = () => {
    const time = new Date().toLocaleString().slice(0, -3);
    const title = newPostTitleInputNode.value;
    const text = newPostTextNode.value;

    if (newPostTitleInputNode.value.length === 0) {
        errorMessage.innerText = ERROR_EMPTY_TITLE;
        newPostTitleInputNode.classList.add(ERROR_CLASSNAME);
        newPostNode.appendChild(errorMessage);
        return;
    } else if (newPostTitleInputNode.value.length > TITLE_VALIDATION_LIMIT) {
        errorMessage.innerText = ERROR_LARGE_TITLE;
        newPostTitleInputNode.classList.add(ERROR_CLASSNAME);
        newPostNode.appendChild(errorMessage);
        return;
    } else if (newPostTextNode.value.length === 0) {
        newPostTitleInputNode.classList.remove(ERROR_CLASSNAME);
        newPostTextNode.classList.add(ERROR_CLASSNAME);
        errorMessage.innerText = ERROR_EMPTY_TEXTAREA;
        newPostNode.appendChild(errorMessage);
        return;
    } else if (newPostTextNode.value.length > TEXTAREA_VALIDATION_LIMIT) {
        errorMessage.innerText = ERROR_LARGE_TEXTAREA;
        newPostTextNode.classList.add(ERROR_CLASSNAME);
        newPostNode.appendChild(errorMessage);
        return;
    }
    newPostTextNode.classList.remove(ERROR_CLASSNAME);
    newPostTitleInputNode.classList.remove(ERROR_CLASSNAME);
    errorMessage.innerText = '';

    return {
        time,
        title,
        text
    }
}


const renderPosts = () => {
    if (postsNode.innerText == EMPTY_POSTLIST_MESSAGE) postsNode.innerText = '';

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

const clearOldData = () => {
    newPostTitleInputNode.value = '';
    newPostTextNode.value = '';
}

const newPostHandler = () => {
    const postFromUser = getPostFromUser();
    addPost(postFromUser);
    renderPosts();
    clearOldData();

}

newPostBtnNode.addEventListener('click', newPostHandler);

