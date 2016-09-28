function sticky() {
  if (document.body.scrollTop > 650 || document.documentElement.scrollTop > 650) {
      document.getElementById("nav").className = "fixed";
  } else {
      document.getElementById("nav").className = "";
  }
}

window.onscroll = function() { sticky() };
