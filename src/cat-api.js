const API_KEY =
  'live_UhhoS1uiBjvjGTrb6tHz3mFJ2eB9TsO9XzNGNMHttLO6dSroRWgKO4Z2U4F6sVo6';

function fetchBreeds() {
  const url = `https://api.thecatapi.com/v1/breeds?api_key=${API_KEY}`;
  return fetch(url).then(response => response.json());
}

function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=${API_KEY}`;
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => data)
    .catch(err => err);
}

export { fetchBreeds, fetchCatByBreed, API_KEY };
