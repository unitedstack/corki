
(function() {
  if(document.getElementsByClassName('overview-version')[0]) {
    const version = document.getElementsByClassName('overview-version')[0].children[1];
    const versionLen = version.children.length;
    
    version.addEventListener('click', function(e) {
      if (e.target.nodeName === "LI") {
        for (let i = 0; i < versionLen; i++) {
          version.children[i].setAttribute('class', '');
        }
        e.target.setAttribute('class', 'overview-chosen');
      }
    });

  }
}());