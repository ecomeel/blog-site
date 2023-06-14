const STORAGE_LABEL_POSTS = 'posts';
const ERROR_EMPTY_TITLE = 'Empty title name!';
const ERROR_EMPTY_TEXTAREA = 'Empty textarea!';
const ERROR_LARGE_TITLE = 'The title is more than 100 characters';
const ERROR_LARGE_TEXTAREA = 'The text is more than 200 characters';
const ERROR_CLASSNAME = 'error';
const ERROR_CLASSNAME_COLOR = 'red-color';
const EMPTY_POSTLIST_MESSAGE = 'Empty';
const TITLE_VALIDATION_LIMIT = 100;
const TEXTAREA_VALIDATION_LIMIT = 200;

const newPostNode = document.getElementById('newPost')
const newPostTitleInputNode = document.getElementById('newPostTitleInput');
const newPostTextNode = document.getElementById('newPostText');
const newPostBtnNode = document.getElementById('newPostBtn');
const postsNode = document.getElementById('posts');

const errorMessage = document.createElement('p');
errorMessage.className = ERROR_CLASSNAME_COLOR;

let posts = [];

const initPosts = () => {
    if (Array.isArray(getPostsFromStorage())) {
        posts = getPostsFromStorage();
    }
    renderPosts();
}

const savePostsToStorage = () => {
    const postsString = JSON.stringify(getPosts());
    localStorage.setItem(STORAGE_LABEL_POSTS, postsString);
}

const getPostsFromStorage = () => {
    const postsFromStorageString = localStorage.getItem(STORAGE_LABEL_POSTS);
    const postsFromStorage = JSON.parse(postsFromStorageString);
    return postsFromStorage;
}

const isNumLessTen = (num) => {
    return num < 10;
}

const setLeadingZero = (nums) => {
    for (let i=0; i<nums.length; i++){
        if (isNumLessTen(nums[i])) {
            nums[i] = `0${nums[i]}`;
        }
    }

    return nums;
}

const getTime = () => {
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();

    const correctedTime = setLeadingZero([hours, minutes, day, month]);
    const fullTime = `${correctedTime[0]}:${correctedTime[1]} ${correctedTime[2]}.${correctedTime[3]}.${year}`;
    return fullTime;
}

const getPostFromUser = () => {
    const time = getTime();
    const title = newPostTitleInputNode.value;
    const text = newPostTextNode.value;
    return {
        time,
        title,
        text
    }
}

const isFieldEmpty = (text) => {
    return (text) ? false : true;
}

const clearOldError = () => {
    newPostTextNode.classList.remove(ERROR_CLASSNAME);
    newPostTitleInputNode.classList.remove(ERROR_CLASSNAME);
    errorMessage.innerText = '';
}

const isPostCorrect = (title, text) => {
    clearOldError();
    if (isFieldEmpty(title)) {
        errorMessage.innerText = ERROR_EMPTY_TITLE;
        newPostTitleInputNode.classList.add(ERROR_CLASSNAME);
        newPostNode.appendChild(errorMessage);
        return false
    }
    if (title.length > TITLE_VALIDATION_LIMIT) {
        errorMessage.innerText = ERROR_LARGE_TITLE;
        newPostTitleInputNode.classList.add(ERROR_CLASSNAME);
        newPostNode.appendChild(errorMessage);
        return false
    }
    if (isFieldEmpty(text)) {
        errorMessage.innerText = ERROR_EMPTY_TEXTAREA;
        newPostTitleInputNode.classList.remove(ERROR_CLASSNAME);
        newPostTextNode.classList.add(ERROR_CLASSNAME);
        newPostNode.appendChild(errorMessage);
        return false
    }
    if (text.length > TEXTAREA_VALIDATION_LIMIT) {
        errorMessage.innerText = ERROR_LARGE_TEXTAREA;
        newPostTextNode.classList.add(ERROR_CLASSNAME);
        newPostNode.appendChild(errorMessage);
        return false
    }
    return true;
}

function renderPosts () {
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

    if (!isPostCorrect(postFromUser.title, postFromUser.text)) {
        return
    }

    addPost(postFromUser);
    savePostsToStorage();

    renderPosts();
    clearOldData();

}

initPosts();

newPostBtnNode.addEventListener('click', newPostHandler);

