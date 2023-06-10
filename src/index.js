import SlimSelect from 'slim-select';
import * as catApi from './cat-api';
import * as buttonStatus from './buttonStatus';
import Notiflix from 'notiflix';

const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  info: document.querySelector('.cat-info'),
};

refs.select.addEventListener('change', onOptionClick);

renderSelect();

function renderSelect() {
  catApi
    .fetchBreeds()
    .then(data => {
      renderOptions(data);
    })
    .catch(err => console.log(err));
}

function onOptionClick() {
  refs.info.innerHTML = '';

  buttonStatus.toggleLoad(refs.loader);
  catApi
    .fetchCatByBreed(refs.select.value)
    .then(([cat]) => {
      renderInfo(cat);
      renderImg(cat);

      buttonStatus.toggleLoad(refs.loader);
    })
    .catch(() => {
      buttonStatus.toggleLoad(refs.loader);

      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}

function renderInfo(cat) {
  refs.info.innerHTML = cat.breeds
    .map(({ name, description, temperament }) => {
      return `<div class="info"><h1>${name}</h1><p1 class="description">${description}</p1>
      <p1 class="temperament"><strong>Temperament:</strong> ${temperament}</p1></div>`;
    })
    .join('');
}

function renderImg({ url }) {
  refs.info.insertAdjacentHTML(
    'afterbegin',
    `<img src="${url}" width=300 alt="Cat"></img>`
  );
}

function renderOptions(option) {
  option.map(({ id, name }) => {
    refs.select.insertAdjacentHTML(
      'afterbegin',
      `<option value="${id}">${name}</option>`
    );
  });
  new SlimSelect({
    select: document.querySelector('.breed-select'),
  });
}
