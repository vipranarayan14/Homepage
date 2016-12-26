var linkA = document.querySelector("#linkApps");
var linkE = document.querySelector("#linkExts");


document.querySelector("#searchInput").addEventListener('keydown', function (e) {
  if (e.keyCode === 13 && this.value !== "") {
    searchGoogle(this.value);
  }
});

linkA.addEventListener('click', function () {
  chrome.tabs.update({ url: "chrome://apps" });
});

linkE.addEventListener('click', function () {
  chrome.tabs.update({ url: "chrome://extensions" });
});

function searchGoogle(searchQuery) {
  var serviceCall = 'http://www.google.com/search?q=' + searchQuery;
  chrome.tabs.update({ url: serviceCall });
}

Rss.init();

console.log("Hello!!");

