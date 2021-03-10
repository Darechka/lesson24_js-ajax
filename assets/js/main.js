let movieList = null;
let inputSearch = null;

let triggerMode = false;

const createStyle = () => {
    const headStyle = document.createElement('style');
    headStyle.innerHTML =
    `* {box-sizing: border-box;}
    body {margin: 0; font-family: Arial, serif;}
    .container {
        padding: 20px;
        min-width: 1280px;
        margin: 0 auto;
    }
    .movies {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 20px;
    }
    .movie {
        display: flex;
        align-content: center;
        justify-content: center;
    }
    .movie__image {width: 100%; object-fit: cover;}
    .search {margin-bottom: 30px;}
    .search__label-input {display: block; margin-bottom: 7px;}
    .search__input {
        display: block;
        width: 400px;
        padding: 10px 15px;
        border-radius: 4px;
        border: 1px solid lightgray;
        margin-bottom: 10px;
    }
    .search__label-checkbox {
        font-size: 12px;
        display: block;
        margin-top: -18px;
        margin-left: 25px;
    }`
    document.head.appendChild(headStyle);
};

const createHeader = (container) => {
    const header = document.createElement('h1');

    header.innerText = 'Приложение для поиска фильмов';
    container.appendChild(header);

};

const setAttributes = (el, attr) => {
for(let key in attr) el.setAttribute(key, attr[key]);
};

const triggerModeHandler = () => triggerMode = !triggerMode;




const createSearchBox = (container) => {
    const searchBox = document.createElement('div');
    const input = document.createElement('input');
    const labelForInput = document.createElement('label');
    const checkBox = document.createElement('input');
    const labelForCheckBox = document.createElement('label');

    searchBox.setAttribute('class', 'search');

    setAttributes(input, {
        class: 'search__input',
        id: 'search',
        type: 'text',
        placeholder: 'Начните вводить текст...'
    });

    setAttributes(labelForInput, {
        class: 'search__label-input',
        for: 'search'
    });

    labelForInput.innerText = 'Поиск фильмов';

    setAttributes(checkBox, {
        class: 'search__checkbox',
        id: 'checkbox',
        type: 'checkbox',
    });

    checkBox.addEventListener('click', triggerModeHandler);

    setAttributes(labelForCheckBox, {
        class: 'search__label-checkbox',
        for: 'checkbox'
    });

    labelForCheckBox.innerText = 'Добавлять фильмы к существующему списку';

    searchBox.append(labelForInput, input, checkBox, labelForCheckBox);
    container.append(searchBox);

};

const createMarkup = () => {
    const container = document.createElement('div');
    const movies = document.createElement('div');

    createHeader(container);
    createSearchBox(container);

    container.classList.add('container');
    movies.classList.add('movies');
    container.appendChild(movies);
    document.querySelector('body').prepend(container);

    inputSearch = document.querySelector('#search');
    movieList = document.querySelector('.movies');
 };

const addMovieToList = (movie) => {
    const item = document.createElement('div');
    const img = document.createElement('img');

    img.classList.add('movie__image');
    img.src = /^(http|https):\/\//i.test(movie.Poster) ? movie.Poster : 'img/no-image.png';
    item.classList.add('movie');

    item.appendChild(img);
    movieList.appendChild(item);
};

const clearMoviesMurkup = () => movieList && (movieList.innerHTML = '');

const delay = (() => {
    let timer = 0;

    return (cb, ms) => {
        clearTimeout(timer);
        timer = setInterval(cb, ms);
    };
})();

createStyle();
createMarkup();