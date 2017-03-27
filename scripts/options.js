var optionsModalContainer = document.querySelector('.options-modal-container');

document.querySelector('.options-modal-close-btn').addEventListener('click', () => {

    optionsModalContainer.style.display = 'none';
});

w3.displayObject("rssSources-list", rssSources);
w3.displayObject("shortcuts-list", shortcuts);