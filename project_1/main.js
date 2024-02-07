document.querySelectorAll('ul > li').forEach(item => {
  const indicator = document.getElementById("indicator");
  const hideAllSubmenus = () => { 
    document.querySelectorAll('.submenu').forEach(menu => {
      menu.style.display = "none";
      indicator.style.display = "none";
    });
  };

  item.addEventListener('mouseover', function() {
    const childUl = this.querySelector('ul');

    hideAllSubmenus();

    if (childUl) {
      childUl.style.display = 'flex';
      indicator.style.display = "block";
      item.dataset.active = "true";
      indicator.style.top = item.getBoundingClientRect().top + 50 + "px";
      indicator.style.left = item.getBoundingClientRect().left + 30 + "px";
    }
  });
});

document.querySelectorAll('li > ul').forEach(submenu => {
  submenu.addEventListener('mouseout', function(e) {
    if (e.relatedTarget.tagName.toLowerCase() !== 'ul') {
      this.style.display = 'none';
      indicator.style.display = "none";
      this.dataset.active = "false";
    }
  });
});
