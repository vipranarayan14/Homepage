function startHome() {

  const userName = localStorage.getItem('userName');

  if (!userName || userName === "null") {

    const name = prompt("Please Enter your name:", "");

    localStorage.setItem('userName', name);

    startHome();

  } else {

    document.getElementById("userGreeting").innerHTML = "Hello, " + userName + "!";

    Home.initNavitems();

    Home.registerEventListeners();

    Rss.init({ notify: true, logConsole: false });
  }
}

startHome();