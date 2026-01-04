// Menu toggle and outside click handling
document.addEventListener('DOMContentLoaded', function(){
  const menuBtn = document.getElementById('menuBtn');
  const dropdown = document.getElementById('menuDropdown');

  function closeMenu(){
    dropdown.classList.remove('open');
    dropdown.setAttribute('aria-hidden','true');
  }

  function openMenu(){
    dropdown.classList.add('open');
    dropdown.setAttribute('aria-hidden','false');
  }

  menuBtn.addEventListener('click', function(e){
    e.stopPropagation();
    if(dropdown.classList.contains('open')) closeMenu(); else openMenu();
  });

  document.addEventListener('click', function(e){
    if(!dropdown.contains(e.target) && e.target !== menuBtn) closeMenu();
  });

  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeMenu();
  });
});
