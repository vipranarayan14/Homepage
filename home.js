var linkA = document.querySelector("#linkApps");
var linkE = document.querySelector("#linkExts");

var rssR = document.querySelector("#rssShow");

document.querySelector("#searchInput").addEventListener('keydown', function(e){
  if(e.keyCode === 13 && this.value !== "") {
    searchGoogle(this.value);
  }
});

linkA.addEventListener('click', function(){
chrome.tabs.update({url: "chrome://apps"});
});

linkE.addEventListener('click', function(){
chrome.tabs.update({url: "chrome://extensions"});
});

function searchGoogle(searchQuery) {
  var serviceCall = 'http://www.google.com/search?q=' + searchQuery;
  chrome.tabs.update({url: serviceCall});
}

(function initRss() {
  var eles = document.querySelectorAll(".rssShow");
  for (var i=0; i < eles.length; i++) {
    var urlSrc = eles[i].getAttribute("source");
    getRss(urlSrc, eles[i]);
  }
})();

function getRss(url, ele) {
  var feed;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    loadRss(this.responseText, ele);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}


function loadRss(resp, ele) {
  //ele.innerHTML = resp;
}

console.log("Hello!!");

