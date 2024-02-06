document.querySelectorAll('li').forEach(item => {
    item.addEventListener('mouseover', function() {
      const childUl = this.querySelector('ul');
      if (childUl) {
        childUl.style.display = 'flex'; 
      }
    });
  });
document.querySelectorAll('li > ul').forEach(item => {
    item.addEventListener('mouseout', function() {
        item.style.display = 'none'; 
    });
  });
  