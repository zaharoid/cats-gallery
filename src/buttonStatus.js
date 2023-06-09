function toggleLoad(loader) {
  loader.classList.toggle('is-hidden');
}

function toggleError(err) {
  err.classList.toggle('is-hidden');
}

function toggleSelect(select) {
  select.classList.toggle('is-hidden');
}

export { toggleLoad, toggleError, toggleSelect };
