document.querySelector('.burger').addEventListener('click', () => {
  document.querySelector('.menu').classList.toggle('hidden');
});

document.querySelectorAll('.menu-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.target;
    const target = document.getElementById(targetId);

    // Collapse all other submenus at the same level
    document.querySelectorAll('ul').forEach(menu => {
      if (menu.id !== targetId && menu.classList.contains('sub-menu')) {
        menu.classList.add('hidden');
      }
    });

    target.classList.toggle('hidden');
  });
});