document.querySelector('.burger').addEventListener('click', () => {
  document.querySelector('.menu').classList.toggle('hidden');
});

document.querySelectorAll('.menu-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.target;
    const target = document.getElementById(targetId);

    // Collapse all other submenus at this level
    document.querySelectorAll('.sub-menu, .sub-sub-menu').forEach(menu => {
      if (menu.id !== targetId) {
        menu.classList.add('hidden');
      }
    });

    // Toggle the clicked submenu
    target.classList.toggle('hidden');
  });
});