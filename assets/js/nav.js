// assets/js/nav.js

const burger = document.querySelector('.burger');
const dropdown = document.getElementById('global-menu');

burger.addEventListener('click', () => {
  const open = dropdown.classList.contains('visible');

  if (open) {
    dropdown.classList.remove('visible');
    dropdown.classList.add('hidden');
    burger.setAttribute('aria-expanded', 'false');

    // Collapse all submenus when closing
    dropdown.querySelectorAll('.sub-menu, .sub-sub-menu').forEach(ul => ul.classList.add('hidden'));
    dropdown.querySelectorAll('.menu-toggle').forEach(btn => btn.setAttribute('aria-expanded','false'));
  } else {
    dropdown.classList.remove('hidden');
    dropdown.classList.add('visible');
    burger.setAttribute('aria-expanded', 'true');

    // ✅ Collapse all submenus when opening
    dropdown.querySelectorAll('.sub-menu, .sub-sub-menu').forEach(ul => ul.classList.add('hidden'));
    dropdown.querySelectorAll('.menu-toggle').forEach(btn => btn.setAttribute('aria-expanded','false'));
  }
});



// Delegate clicks within dropdown
dropdown.addEventListener('click', (e) => {
  const btn = e.target.closest('.menu-toggle');
  if (!btn) return;

  const targetId = btn.dataset.target;
  const targetUl = document.getElementById(targetId);
  if (!targetUl) return;

  const isOpen = !targetUl.classList.contains('hidden');

  // Close sibling submenus at the same level
  const parentUl = btn.closest('ul'); // current level container
  parentUl.querySelectorAll(':scope > .group > ul').forEach(ul => {
    if (ul.id !== targetId) {
      ul.classList.add('hidden');
      const sbBtn = parentUl.querySelector(`[data-target="${ul.id}"]`);
      sbBtn?.setAttribute('aria-expanded','false');
      // collapse nested children within siblings
      ul.querySelectorAll('ul').forEach(nested => nested.classList.add('hidden'));
      ul.querySelectorAll('.menu-toggle').forEach(nbtn => nbtn.setAttribute('aria-expanded','false'));
    }
  });

  // Toggle current
  if (isOpen) {
    targetUl.classList.add('hidden');
    btn.setAttribute('aria-expanded', 'false');
    targetUl.querySelectorAll('ul').forEach(nested => nested.classList.add('hidden'));
    targetUl.querySelectorAll('.menu-toggle').forEach(nbtn => nbtn.setAttribute('aria-expanded','false'));
  } else {
    targetUl.classList.remove('hidden');
    btn.setAttribute('aria-expanded', 'true');
  }
});
