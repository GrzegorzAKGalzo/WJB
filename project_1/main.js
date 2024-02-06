document.querySelectorAll(' ul > li ').forEach(item => {
    const indicator = document.getElementById("indicator");
    item.addEventListener('mouseover', function() {
      const childUl = this.querySelector('ul');
      
      if (childUl) {
        document.querySelectorAll(' ul > li > ul ').forEach(item => {
            if(item.classList.contains("submenu")){
                item.style.display = "none";
            }
        });
        childUl.style.display = 'flex'; 
         indicator.style.display = "block";
         indicator.style.top = item.getBoundingClientRect().top + 50 + "px"; 
         indicator.style.left = item.getBoundingClientRect().left + 30 + "px"; 
      }
    
    });
  });
document.querySelectorAll('li > ul').forEach(item => {
    item.addEventListener('mouseout', function() {
        if(item.classList.contains("submenu"))
        {
            item.style.display = 'none'; 
            indicator.style.display = "none";
        }
       

    });
  });
  

