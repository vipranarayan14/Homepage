var linkA = document.querySelector("#linkApps");
var linkE = document.querySelector("#linkExts");

var rssReloaders = document.querySelectorAll('.rssReloader'), i;

for (i = 0; i < rssReloaders.length; ++i) {
  rssReloaders[i].addEventListener('click', function (e) {
    Rss.reload(e.target.getAttribute("source"));
  });
}

var rssR = document.querySelector("#rssShow");

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


//Rss.load();

console.log("Hello!!");

