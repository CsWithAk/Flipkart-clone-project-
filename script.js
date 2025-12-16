document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('input');
  const search = document.getElementById('search');
  const clean = document.getElementById('clean');

  if (clean && input) {
    clean.addEventListener('click', () => {
      input.value = '';
    });
  }

  if (input) {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && input.value.trim() !== '') {
        window.location.href = `https://www.flipkart.com/search?q=${input.value}`;
      }
    });
  }

  if (search && input) {
    search.addEventListener('click', () => {
      if (input.value.trim() !== '') {
        window.location.href = `https://www.flipkart.com/search?q=${input.value}`;
      }
    });
  }

  // --- Product groups horizontal pager ---
  const headers = document.querySelectorAll('.productheader');

  headers.forEach(header => {
    const icon = header.querySelector('i[class*="bxs-chevron-right"]');
    let group = header.nextElementSibling;
    if (!group || !group.classList.contains('productgroup')) {
      group = header.parentElement.querySelector('.productgroup');
    }
    if (!group) return;

    let btn;
    if (icon) {
      btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pg-next';
      btn.setAttribute('aria-label', 'Next products');
      btn.innerHTML = icon.outerHTML;
      icon.replaceWith(btn);
    } else {
      btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pg-next';
      btn.setAttribute('aria-label', 'Next products');
      btn.innerHTML = "<i class='bx bxs-chevron-right'></i>";
      header.appendChild(btn);
    }

    btn.addEventListener('click', () => {
      const amount = Math.floor(group.clientWidth * 0.9);
      group.scrollBy({ left: amount, behavior: 'smooth' });

      setTimeout(() => {
        if (group.scrollLeft + group.clientWidth >= group.scrollWidth - 2) {
          group.scrollTo({ left: 0, behavior: 'smooth' });
        }
      }, 450);
    });
  });
  
  // --- Mobile menu (three-dot) population & toggle ---
  const menuBtn = document.querySelector('.menu');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    const populateMenu = () => {
      if (mobileMenu.dataset.populated) return;
      // clone login, cart, seller
      const items = [];
      const login = document.querySelector('.login');
      const cart = document.querySelector('.Cart');
      const seller = document.querySelector('.seller');

      const makeItem = (el, label) => {
        const div = document.createElement('div');
        div.className = 'm-item';
        const icon = el.querySelector('i') ? el.querySelector('i').outerHTML : '';
        const text = el.querySelector('span') ? el.querySelector('span').textContent.trim() : label;
        div.innerHTML = `<a href="#">${icon}<span class="m-text">${text}</span></a>`;
        return div;
      };

      if (login) mobileMenu.appendChild(makeItem(login,'Login'));
      if (cart) mobileMenu.appendChild(makeItem(cart,'Cart'));
      if (seller) mobileMenu.appendChild(makeItem(seller,'Become a seller'));

      mobileMenu.dataset.populated = '1';
    };

    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      populateMenu();
      mobileMenu.classList.toggle('open');
      mobileMenu.setAttribute('aria-hidden', mobileMenu.classList.contains('open') ? 'false' : 'true');
    });

    // close when clicking outside
    document.addEventListener('click', (ev) => {
      if (!mobileMenu.contains(ev.target) && !menuBtn.contains(ev.target)) {
        mobileMenu.classList.remove('open');
        mobileMenu.setAttribute('aria-hidden','true');
      }
    });

    // close on Escape
    document.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape') {
        mobileMenu.classList.remove('open');
        mobileMenu.setAttribute('aria-hidden','true');
      }
    });
  }

});
