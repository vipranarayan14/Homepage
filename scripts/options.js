const optionsModalContainer = document.querySelector('.options-modal-container');
const rssSourcesTitleInput = document.querySelector('.rssSources-title-input');

document.querySelector('.options-modal-close-btn').addEventListener('click', () => {

    optionsModalContainer.style.display = 'none';
});

rssSourcesTitleInput.addEventListener('keyup', function (e) {
    (e.keyCode === 13) ? localStorage.setItem("feedSources",JSON.stringify(JSON.parse(this.value))) : "";
});

// rssSourcesTitleInput.value = JSON.stringify(Rss.config.rssSources());
// w3.displayObject("rssSources-list", rssSources);
// w3.displayObject("shortcuts-list", shortcuts);