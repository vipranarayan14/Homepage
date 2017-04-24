// included from ../scripts/progress.js
window.addEventListener('load', () => {
    document.querySelector('.DOMProgress').style.display = 'none';
});

// included from ../user_prefs/shortcuts.js
//Add shortcut URLs here.
var shortcuts = {
    "shortcuts": [
        {
            "shortcutTitle": "Apps",
            "shortcutUrl": "chrome://apps"
        },
        {
            "shortcutTitle": "Exts",
            "shortcutUrl": "chrome://extensions"
        },
        {
            "shortcutTitle": "Drive",
            "shortcutUrl": "https://drive.google.com"
        },
        {
            "shortcutTitle": "Money Matters",
            "shortcutUrl": "https://goo.gl/forms/35KjIT6NKTgQ0lDw2"
        }
    ]
};

// included from ../assets/w3/w3.js
/* W3.JS 1.01 Jan 2017 by w3schools.com */
"use strict";
var w3 = {};
w3.hide = function (sel) {
  w3.hideElements(w3.getElements(sel));
};
w3.hideElements = function (elements) {
  var i, l = elements.length;
  for (i = 0; i < l; i++) {
    w3.hideElement(elements[i]);
  }
};
w3.hideElement = function (element) {
  w3.styleElement(element, "display", "none");
};
w3.show = function (sel, a) {
  var elements = w3.getElements(sel);
  if (a) {w3.hideElements(elements);}
  w3.showElements(elements);
};
w3.showElements = function (elements) {
  var i, l = elements.length;
  for (i = 0; i < l; i++) {
    w3.showElement(elements[i]);
  }
};
w3.showElement = function (element) {
  w3.styleElement(element, "display", "block");
};
w3.addStyle = function (sel, prop, val) {
  w3.styleElements(w3.getElements(sel), prop, val);
};
w3.styleElements = function (elements, prop, val) {
  var i, l = elements.length;
  for (i = 0; i < l; i++) {    
    w3.styleElement(elements[i], prop, val);
  }
};
w3.styleElement = function (element, prop, val) {
  element.style.setProperty(prop, val);
};
w3.toggleShow = function (sel) {
  var i, x = w3.getElements(sel), l = x.length;
  for (i = 0; i < l; i++) {    
    if (x[i].style.display == "none") {
      w3.styleElement(x[i], "display", "block");
    } else {
      w3.styleElement(x[i], "display", "none");
    }
  }
};
w3.addClass = function (sel, name) {
  w3.addClassElements(w3.getElements(sel), name);
};
w3.addClassElements = function (elements, name) {
  var i, l = elements.length;
  for (i = 0; i < l; i++) {
    w3.addClassElement(elements[i], name);
  }
};
w3.addClassElement = function (element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
};
w3.removeClass = function (sel, name) {
  w3.removeClassElements(w3.getElements(sel), name);
};
w3.removeClassElements = function (elements, name) {
  var i, l = elements.length, arr1, arr2, j;
  for (i = 0; i < l; i++) {
    w3.removeClassElement(elements[i], name);
  }
};
w3.removeClassElement = function (element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);     
    }
  }
  element.className = arr1.join(" ");
};
w3.toggleClass = function (sel, c1, c2) {
  w3.toggleClassElements(w3.getElements(sel), c1, c2);
};
w3.toggleClassElements = function (elements, c1, c2) {
  var i, l = elements.length;
  for (i = 0; i < l; i++) {    
    w3.toggleClassElement(elements[i], c1, c2);
  }
};
w3.toggleClassElement = function (element, c1, c2) {
  var t1, t2, t1Arr, t2Arr, j, arr, allPresent;
  t1 = (c1 || "");
  t2 = (c2 || "");
  t1Arr = t1.split(" ");
  t2Arr = t2.split(" ");
  arr = element.className.split(" ");
  if (t2Arr.length == 0) {
    allPresent = true;
    for (j = 0; j < t1Arr.length; j++) {
      if (arr.indexOf(t1Arr[j]) == -1) {allPresent = false;}
    }
    if (allPresent) {
      w3.removeClassElement(element, t1);
    } else {
      w3.addClassElement(element, t1);
    }
  } else {
    allPresent = true;
    for (j = 0; j < t1Arr.length; j++) {
      if (arr.indexOf(t1Arr[j]) == -1) {allPresent = false;}
    }
    if (allPresent) {
      w3.removeClassElement(element, t1);
      w3.addClassElement(element, t2);          
    } else {
      w3.removeClassElement(element, t2);        
      w3.addClassElement(element, t1);
    }
  }
};
w3.getElements = function (id) {
  if (typeof id == "object") {
    return [id];
  } else {
    return document.querySelectorAll(id);
  }
};
w3.filterHTML = function(id, sel, filter) {
  var a, b, c, i, ii, iii, hit;
  a = w3.getElements(id);
  for (i = 0; i < a.length; i++) {
    b = w3.getElements(sel);
    for (ii = 0; ii < b.length; ii++) {
      hit = 0;
      if (b[ii].innerHTML.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
        hit = 1;
      }
      c = b[ii].getElementsByTagName("*");
      for (iii = 0; iii < c.length; iii++) {
        if (c[iii].innerHTML.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
          hit = 1;
        }
      }
      if (hit == 1) {
        b[ii].style.display = "";
      } else {
        b[ii].style.display = "none";
      }
    }
  }
};
w3.sortHTML = function(id, sel, sortvalue) {
  var a, b, i, ii, y, bytt, v1, v2, cc, j;
  a = w3.getElements(id);
  for (i = 0; i < a.length; i++) {
    for (j = 0; j < 2; j++) {
      cc = 0;
      y = 1;
      while (y == 1) {
        y = 0;
        b = a[i].querySelectorAll(sel);
        for (ii = 0; ii < (b.length - 1); ii++) {
          bytt = 0;
          if (sortvalue) {
            v1 = b[ii].querySelector(sortvalue).innerHTML.toLowerCase();
            v2 = b[ii + 1].querySelector(sortvalue).innerHTML.toLowerCase();
          } else {
            v1 = b[ii].innerHTML.toLowerCase();
            v2 = b[ii + 1].innerHTML.toLowerCase();
          }
          if ((j == 0 && (v1 > v2)) || (j == 1 && (v1 < v2))) {
            bytt = 1;
            break;
          }
        }
        if (bytt == 1) {
          b[ii].parentNode.insertBefore(b[ii + 1], b[ii]);
          y = 1;
          cc++;
        }
      }
      if (cc > 0) {break;}
    }
  }
};
w3.slideshow = function (sel, ms, func) {
  var i, ss, x = w3.getElements(sel), l = x.length;
  ss = {};
  ss.current = 1;
  ss.x = x;
  ss.ondisplaychange = func;
  if (!isNaN(ms) || ms == 0) {
    ss.milliseconds = ms;
  } else {
    ss.milliseconds = 1000;
  }
  ss.start = function() {
    ss.display(ss.current)
    if (ss.ondisplaychange) {ss.ondisplaychange();}
    if (ss.milliseconds > 0) {
      window.clearTimeout(ss.timeout);
      ss.timeout = window.setTimeout(ss.next, ss.milliseconds);
    }
  };
  ss.next = function() {
    ss.current += 1;
    if (ss.current > ss.x.length) {ss.current = 1;}
    ss.start();
  };
  ss.previous = function() {
    ss.current -= 1;
    if (ss.current < 1) {ss.current = ss.x.length;}
    ss.start();
  };
  ss.display = function (n) {
    w3.styleElements(ss.x, "display", "none");
    w3.styleElement(ss.x[n - 1], "display", "block");
  }
  ss.start();
  return ss;
};
w3.includeHTML = function() {
  var z, i, elmnt, file, xhttp;
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          elmnt.innerHTML = this.responseText;
          elmnt.removeAttribute("w3-include-html");
          w3.includeHTML();
        }
      }      
      xhttp.open("GET", file, true);
      xhttp.send();
      return;
    }
  }
};
w3.getHttpData = function (file, func) {
  w3.http(file, function () {
    if (this.readyState == 4 && this.status == 200) {
      func(this.responseText);
    }
  });
};
w3.getHttpObject = function (file, func) {
  w3.http(file, function () {
    if (this.readyState == 4 && this.status == 200) {
      func(JSON.parse(this.responseText));
    }
  });
};
w3.displayHttp = function (id, file) {
  w3.http(file, function () {
    if (this.readyState == 4 && this.status == 200) {
      w3.displayObject(id, JSON.parse(this.responseText));
    }
  });
};
w3.http = function (target, readyfunc, xml, method) {
  var httpObj;
  if (!method) {method = "GET"; }
  if (window.XMLHttpRequest) {
    httpObj = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    httpObj = new ActiveXObject("Microsoft.XMLHTTP");
  }
  if (httpObj) {
    if (readyfunc) {httpObj.onreadystatechange = readyfunc;}
    httpObj.open(method, target, true);
    httpObj.send(xml);
  }
};
w3.getElementsByAttribute = function (x, att) {
  var arr = [], arrCount = -1, i, l, y = x.getElementsByTagName("*"), z = att.toUpperCase();
  l = y.length;
  for (i = -1; i < l; i += 1) {
    if (i == -1) {y[i] = x;}
    if (y[i].getAttribute(z) !== null) {arrCount += 1; arr[arrCount] = y[i];}
  }
  return arr;
};  
w3.dataObject = {},
w3.displayObject = function (id, data) {
  var htmlObj, htmlTemplate, html, arr = [], a, l, rowClone, x, j, i, ii, cc, repeat, repeatObj, repeatX = "";
  htmlObj = document.getElementById(id);
  htmlTemplate = init_template(id, htmlObj);
  html = htmlTemplate.cloneNode(true);
  arr = w3.getElementsByAttribute(html, "w3-repeat");
  l = arr.length;
  for (j = (l - 1); j >= 0; j -= 1) {
    cc = arr[j].getAttribute("w3-repeat").split(" ");
    if (cc.length == 1) {
      repeat = cc[0];
    } else {
      repeatX = cc[0];
      repeat = cc[2];
    }
    arr[j].removeAttribute("w3-repeat");
    repeatObj = data[repeat];
    if (repeatObj && typeof repeatObj == "object" && repeatObj.length != "undefined") {
      i = 0;
      for (x in repeatObj) {
        i += 1;
        rowClone = arr[j];
        rowClone = w3_replace_curly(rowClone, "element", repeatX, repeatObj[x]);
        a = rowClone.attributes;
        for (ii = 0; ii < a.length; ii += 1) {
          a[ii].value = w3_replace_curly(a[ii], "attribute", repeatX, repeatObj[x]).value;
        }
        rowClone.setAttribute('display-object-index', x); //Prasanna's attribute for mapping Objects to Elements
        (i === repeatObj.length) ? arr[j].parentNode.replaceChild(rowClone, arr[j]) : arr[j].parentNode.insertBefore(rowClone, arr[j]);
      }
    } else {
      console.log("w3-repeat must be an array. " + repeat + " is not an array.");
      continue;
    }
  }
  html = w3_replace_curly(html, "element");
  htmlObj.parentNode.replaceChild(html, htmlObj);
  function init_template(id, obj) {
    var template;
    template = obj.cloneNode(true);
    if (w3.dataObject.hasOwnProperty(id)) {return w3.dataObject[id];}
    w3.dataObject[id] = template;
    return template;
  }
  function w3_replace_curly(elmnt, typ, repeatX, x) {
    var value, rowClone, pos1, pos2, originalHTML, lookFor, lookForARR = [], i, cc, r;
    rowClone = elmnt.cloneNode(true);
    pos1 = 0;
    while (pos1 > -1) {
      originalHTML = (typ == "attribute") ? rowClone.value : rowClone.innerHTML;
      pos1 = originalHTML.indexOf("{{", pos1);
      if (pos1 === -1) {break;}
      pos2 = originalHTML.indexOf("}}", pos1 + 1);
      lookFor = originalHTML.substring(pos1 + 2, pos2);
      lookForARR = lookFor.split("||");
      value = undefined;
      for (i = 0; i < lookForARR.length; i += 1) {
        lookForARR[i] = lookForARR[i].replace(/^\s+|\s+$/gm, ''); //trim
        if (x) {value = x[lookForARR[i]];}
        if (value == undefined && data) {value = data[lookForARR[i]];}
        if (value == undefined) {
          cc = lookForARR[i].split(".");
          if (cc[0] == repeatX) {value = x[cc[1]]; }
        }
        if (value == undefined) {
          if (lookForARR[i] == repeatX) {value = x;}
        }
        if (value == undefined) {
          if (lookForARR[i].substr(0, 1) == '"') {
            value = lookForARR[i].replace(/"/g, "");
          } else if (lookForARR[i].substr(0,1) == "'") {
            value = lookForARR[i].replace(/'/g, "");
          }
        }
        if (value != undefined) {break;}
      }
      if (value != undefined) {
        r = "{{" + lookFor + "}}";
        if (typ == "attribute") {
          rowClone.value = rowClone.value.replace(r, value);
        } else {
          w3_replace_html(rowClone, r, value);
        }
      }
      pos1 = pos1 + 1;
    }
    return rowClone;
  }
  function w3_replace_html(a, r, result) {
    var b, l, i, a, x, j;
    if (a.hasAttributes()) {
      b = a.attributes;
      l = b.length;
      for (i = 0; i < l; i += 1) {
        if (b[i].value.indexOf(r) > -1) {b[i].value = b[i].value.replace(r, result);}
      }
    }
    x = a.getElementsByTagName("*");
    l = x.length;
    a.innerHTML = a.innerHTML.replace(r, result);
  }
};

// included from ../assets/rsser/rsser.js
const Rss = {

    init: function(options) {

        Rss.checkDependenciesMeet(options)
            .then(Rss.configureOptions)
            .then(Rss.makeFeedContainer)
            .then(Rss.registerEventListeners)
            .then(Rss.load)
            .catch(new Error());
    },

    checkDependenciesMeet: function(options) {

        const feedListContainer = document.querySelector('.rss-channels-container');

        return new Promise((resolve, reject) => {

            if (feedListContainer && typeof w3 == 'object') {
                resolve(options);
            } else {
                reject("Dependencies not met!");
            }
        });
    },

    configureOptions: function(options) {

        return new Promise((resolve, reject) => {
            if (options) {
                Rss.config = Object.assign(Rss.config, options);
            }
            if (Rss.config.rssSources()) {
                resolve();
            } else {

                const msg = "Rsser is not configured yet. Please use Options to add Rss Channels";
                document.querySelector('.rss-channels-container').style.display = 'none';
                Rss.showNotification(msg);
                reject(msg);
            }
        });
    },

    makeFeedContainer: function() {

        return new Promise((resolve, reject) => {

            w3.displayObject("rss-channels-container", Rss.config.rssSources());
            resolve();
        });
    },

    registerEventListeners: function() {

        return new Promise((resolve, reject) => {

            window.addEventListener('online', () => {

                Rss.showNotification("The App is online.");
                Rss.load();
            });

            window.addEventListener('offline', () => {

                Rss.showNotification("The App is offline.");
            });

            const rssReloaders = document.querySelectorAll('.rss-channel-reload-btn');

            for (let i = 0; i < rssReloaders.length; ++i) {

                rssReloaders[i].addEventListener('click', (e) => {
                    //Todo: change this
                    Rss.reload(e.target.parentNode.parentNode.parentNode);
                });
            }

            resolve();
        });
    },

    getFeeds: function(srcUrlTitle, srcUrl, ele) {
        const xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {

            if (this.readyState == 4 && this.status == 200) {

                Rss.showNotification("Got Feeds for " + srcUrlTitle);
                Rss.update(srcUrlTitle, this.responseText, ele);
            }
        }

        xhttp.addEventListener("error", () => {

            const msg = "Feeds fetching failed!";

            Rss.logConsole(msg, "error");
            ele.querySelector('.rss-feed').innerHTML = Rss.formatAsError(msg);
        });

        xhttp.open("GET", srcUrl, true);
        xhttp.send();
    },

    load: function() {

        const eles = document.querySelectorAll(".rss-channel-container");

        for (let i = 0; i < eles.length; i++) {

            const srcUrlIndex = eles[i].getAttribute('display-object-index');
            const srcUrlTitle = Rss.config.rssSources().rssSources[srcUrlIndex].feedTitle;
            const srcUrl = Rss.config.rssSources().rssSources[srcUrlIndex].feedUrl;

            const lsItem = Rss.config.rssSources().rssSources[srcUrlIndex].feedData;

            const UnixTime_Now = Date.now();
            const UnixTime_lastUpateAt = parseInt(localStorage.getItem("lastUpdateAt")) || 0;
            const timeLeft = UnixTime_Now - UnixTime_lastUpateAt;

            var status = "Hi";

            if (lsItem !== null) {

                eles[i].querySelector('.rss-feed').innerHTML = lsItem;
                status = "Loaded feeds from Local Storage.";

            } else {

                Rss.getFeeds(srcUrlTitle, srcUrl, eles[i]);
                status = "Downloading feeds.";
            }

            if ((timeLeft < 0 || timeLeft > 60000) && navigator.onLine) {

                Rss.getFeeds(srcUrlTitle, srcUrl, eles[i]);
                status = "Downloading feeds.";
            }
            else if (!navigator.onLine) {
                const msg = "Failed to download feeds. The App is Offline.";
                Rss.logConsole(msg, "error");
                status = msg;
            }
        }
        Rss.showNotification(status);

    },

    reload: function(ele) {

        if (navigator.onLine) {

            const srcUrlIndex = ele.getAttribute('display-object-index');
            const srcUrlTitle = Rss.config.rssSources().rssSources[srcUrlIndex].feedTitle;
            let rssSourcesCopy = Rss.config.rssSources();

            rssSourcesCopy.rssSources[srcUrlIndex].feedData = null;
            localStorage.setItem('feedSources', JSON.stringify(rssSourcesCopy));
            Rss.showNotification("Reloading feed: " + srcUrlTitle);
            Rss.load();

        } else {

            return Rss.showNotification("Failed to reload feed. The App is Offline.");
        }
    },

    reloadAll: function() {

        const eles = document.querySelectorAll(".rss-channel-container");

        for (var i = 0; i < eles.length; i++) {
            Rss.reload(eles[i]);
        };
    },

    update: function(srcUrl, feed, ele) {

        const rssFeed = Rss.makeHTML(feed);
        const feedSourcesCopy = JSON.parse(localStorage.feedSources);
        const feedIndex = ele.getAttribute('display-object-index')
        feedSourcesCopy.rssSources[feedIndex].feedData = rssFeed;
        localStorage.feedSources = JSON.stringify(feedSourcesCopy);
        localStorage.setItem("lastUpdateAt", Date.now());

        ele.querySelector('.rss-feed').innerHTML = rssFeed;
    },

    makeHTML: function(xml) {

        function parseXMLtoJSON(xmlRaw) {

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlRaw, "text/xml");

            if (xmlDoc.querySelector("parsererror") === null) {

                const x2js = new X2JS();
                const jsonObj = x2js.xml2json(xmlDoc);
                return jsonObj;

            } else {

                Rss.logConsole(xmlDoc);
                return null;
            }
        }

        var feedObj, feedChannel, feedTitle, feedItems, HTMLDoc;

        feedObj = parseXMLtoJSON(xml);

        if (feedObj !== null && feedObj.rss) {

            feedChannel = feedObj.rss.channel;

            feedTitle = '<h3 class="feed-title">' + '<a href="' + feedChannel.link + '">'
                + feedChannel.title
                + '</a>' + '</h3>';

            feedItems = "";

            for (let i in feedChannel.item) {

                feedItems += ('<h4 class="feed-item-title">'
                    + '<a href="' + feedChannel.item[i].link + '">'
                    + feedChannel.item[i].title + '</a></h4>');

                feedItems += '<span class="feed-item-date">' + dater.format(feedChannel.item[i].pubDate) + '</span>';

                feedItems += '<p class="feed-item-desc">' + feedChannel.item[i].description + '</p>';

            }

            HTMLDoc = feedTitle + feedItems;
        } else if (feedObj.RDF) {

            Rss.logConsole("This is RDF");

        }
        else {

            var msg = "The provided URL does not contain a feed!";
            Rss.showNotification(msg);
            HTMLDoc = Rss.formatAsError(msg);
        }

        return HTMLDoc;
    },

    config: {
        isShowNotification: true,
        islogConsole: false,
        rssSources: () => JSON.parse(localStorage.getItem('feedSources'))
    },

    showNotification: function(message) {

        if (Rss.config.isShowNotification) {

            const rssNotifier = document.querySelector('.rss-notifications-container');

            if (rssNotifier) {

                const event = new CustomEvent('RssNotification', { 'detail': message });
                document.dispatchEvent(event);
            } else {

                Rss.logConsole(message, "info");
            }
        }
    },

    logConsole: function(message, type) {

        if (Rss.config.islogConsole) {

            if (!type) {

                console.log(message);
            } else if (type === "error") {

                console.log("%c" + message, "color:red;");
            } else if (type === "info") {

                console.log("%c" + message, "color:blue;");
            }
        }
    },

    formatAsError: function(message) {

        return '<center><p style="font-size:20px; color:red">' + message + '</p></center>';
    }
}

// included from ../assets/rsser/date-formatter.js
var dater = {
    date_options: {
        "weekday": "short", // OR long
        "year": "numeric",
        "month": "short", // OR long
        "day": "numeric",
        "timeZone": "Asia/Kolkata",
        "hour12": true,
        "hour": "2-digit",
        "minute": "2-digit"
    },

    // British English uses day-month-year order and 24-hour time without AM/PM
    lang_option: 'en-GB',

    format: function (date_str) {

        return (new Date(date_str).toLocaleString(dater.lang_option, dater.date_options));
    }

}

// included from ../scripts/home.js
const Home = {

    registerEventListeners: function () {

        window.addEventListener('keydown', e => {
            if (e.ctrlKey && e.keyCode === 83) {
                e.preventDefault();
            }
        });

        document.querySelector('.search-input input[type="search"]').addEventListener('keydown', function (e) {

            if (e.keyCode === 13 && this.value !== "") {

                const serviceCall = 'http://www.google.com/search?q=' + this.value;
                chrome.tabs.update({ url: serviceCall });
            }
        });

        const eles = document.querySelectorAll('.nav-bar .nav-item a');

        for (let i = 0; i < eles.length; ++i) {

            eles[i].addEventListener('click', (e) => {

                chrome.tabs.update({ url: e.target.getAttribute('shortcut-url') });
            });
        }

        document.querySelector(".refresh-btn").addEventListener('click', function () {

            Rss.reloadAll();
        });

        document.querySelector(".options-btn").addEventListener('click', function () {

            document.querySelector('.options-modal-container').style.display = 'block';
        });

        document.addEventListener('RssNotification', (e) => {

            const rssNotificationsContainer = document.querySelector('.rss-notifications-container');

            if (rssNotificationsContainer) {

                const rssNotifier = document.createElement('DIV');

                rssNotifier.innerHTML = document.querySelector('#rss-notification-template').innerHTML;

                const rssNotification = rssNotifier.querySelector('.rss-notification-content');
                const rssNotificationCloseBtn = rssNotifier.querySelector('.rss-notification-close-btn');

                rssNotification.innerHTML = e.detail;
                rssNotificationCloseBtn.addEventListener('click', (e) => {
                    e.target.parentNode.style.display = 'none';
                });

                rssNotificationsContainer.appendChild(rssNotifier);

                setTimeout(() => {
                    rssNotificationsContainer.removeChild(rssNotifier);
                }, 8000);

            }
        });

    },

    initUserName: function (userName) {

        document.querySelector(".user-greeting h1").innerHTML = "Hello, " + userName + "!";
    },

    initNavitems: function () {

        const navBar = document.querySelector(".nav-bar");

        if (navBar && typeof (shortcuts) == 'object') {

            w3.displayObject("nav-bar", shortcuts);

        }
    }
}

// included from ../scripts/options.js
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

// included from ../scripts/index.js
function startHome() {

  const userName = localStorage.getItem('userName');

  if (!userName || userName === "null") {

    const name = prompt("Please Enter your name:", "");

    localStorage.setItem('userName', name);

    startHome();

  } else {

    Home.initUserName(userName);

    Home.initNavitems();

    Home.registerEventListeners();

    Rss.init({ islogConsole: true });
  }
}

startHome();