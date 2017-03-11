var linkA = document.querySelector("#linkApps");
var linkE = document.querySelector("#linkExts");

function updateOnlineStatus()
{
    Rss.showNotification("The App is online");
}

function updateOfflineStatus()
{
    Rss.showNotification("The App is offline");
}

window.addEventListener('online',  updateOnlineStatus);
window.addEventListener('offline', updateOfflineStatus);

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

document.addEventListener('RssNotification', function (e) {

  document.querySelector(".rss-alert > p").innerHTML = e.detail;
});

Rss.init();

console.log("Hello!!");

