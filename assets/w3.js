var w3 = w3 || {}; //functions that control w3-ui
var cc = cc || {}; // Custom Commands

w3 = {

  toggleView: function(dropNav) {

    var cls = [" w3-hide", " w3-show"];

    var ele = cc.qs(dropNav);
    if (ele.className.indexOf(cls[1]) == -1) {

      ele.className = ele.className.replace(cls[0], cls[1]);
    } else {

      ele.className = ele.className.replace(cls[1], cls[0]);
    }
  },

  toggleSideNav: function(sideNav, mainBody) {

    var ele = cc.qs(sideNav);

    if (ele.style.display === 'none') {

      cc.qs(mainBody).style.marginLeft = "25%";
      cc.qs(sideNav).style.width = "25%";
      cc.qs(sideNav).style.display = "block";
    } else {

      cc.qs(mainBody).style.marginLeft = "0%";
      cc.qs(sideNav).style.display = "none";
    }
  },

  openTab: function(tabId, evt, className) {

    var cls = " " + className;

    var i, x, tablinks;
    x = cc.qsa(".tab-window");

    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }

    tablinks = cc.qsa(".tab-link");

    for (i = 0; i < x.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(cls, "");
    }

    cc.qs("#" + tabId).style.display = "block";
    evt.currentTarget.className += cls;
  }

}

cc = {
  qs: function(ele) {

    if (document.querySelector(ele)) {

      return document.querySelector(ele);
    } else {

      throw new Error("ElementNode not found");
      return;
    }
  },

  qsa: function(eles) {

    if (document.querySelectorAll(eles)) {

      return document.querySelectorAll(eles);
    } else {

      throw new Error("ElementNode not found");
      return;
    }
  }
}
