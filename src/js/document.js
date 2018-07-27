
(function() {
  if(document.getElementsByClassName('overview-nav')[0]) {
    const nav = document.getElementsByClassName('overview-nav')[0];
    const title = document.getElementsByClassName('overview-title');
    const children = nav.children;
    const navLen = children.length;
    const titleLen = title.length;

    nav.addEventListener('click', function(e) {
      if (e.target.nodeName === "A") {
        cleanNavStyle();
        e.target.parentNode.setAttribute('class', 'overview-current');
      }
    });
  
  
    window.addEventListener("scroll", function() {
      for(let i = 0; i < titleLen; i++) {
        if (title[i].getBoundingClientRect().top > 0 && title[i].getBoundingClientRect().top < 100) {
          cleanNavStyle();
          children[i].setAttribute('class', 'overview-current');
        }
      }
    });
  
    function cleanNavStyle() {
      for (let i = 0; i < navLen; i++) {
        children[i].setAttribute('class', '');
      }
    }
  }
}());