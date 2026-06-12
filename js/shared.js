// =============================================
//  MY DREAM PHOTOGRAPHY — shared.js
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ====== STICKY NAV ======
  const nav = document.querySelector('.nav');
  if (nav) {
    const handleScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // ====== HAMBURGER MENU ======
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.nav__mobile');
  const overlay    = document.querySelector('.nav__overlay');

  function openMenu() {
    hamburger?.classList.add('open');
    mobileMenu?.classList.add('open');
    overlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger?.classList.remove('open');
    mobileMenu?.classList.remove('open');
    overlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', () => {
    hamburger.classList.contains('open') ? closeMenu() : openMenu();
  });

  overlay?.addEventListener('click', closeMenu);

  document.querySelectorAll('.nav__mobile a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });

  // ====== ACTIVE NAV LINK ======
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a, .nav__mobile a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (href === 'index.html' && currentPage === '')) {
      link.classList.add('active');
    }
  });

  // ====== SCROLL REVEAL ======
  const observerOpts = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOpts);

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger').forEach(el => {
    revealObserver.observe(el);
  });

  // ====== GALLERY FILTERS ======
  const filters = document.querySelectorAll('.gallery-filter');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filters.length && galleryItems.length) {
    filters.forEach(btn => {
      btn.addEventListener('click', () => {
        filters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const cat = btn.dataset.filter;

        galleryItems.forEach((item, i) => {
          const match = cat === 'all' || item.dataset.category === cat;
          item.style.transition = `opacity 0.4s ease ${i * 0.03}s, transform 0.4s ease ${i * 0.03}s`;
          if (match) {
            item.style.display = '';
            requestAnimationFrame(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            });
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.92)';
            setTimeout(() => {
              if (item.style.opacity === '0') item.style.display = 'none';
            }, 400);
          }
        });
      });
    });
  }

  // ====== LIGHTBOX ======
  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    const lightboxClose = lightbox.querySelector('.lightbox__close');
    const lightboxContent = lightbox.querySelector('.lightbox__content');

    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };

    lightboxClose?.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
    });
  }

  // ====== SMOOTH SCROLL FOR ANCHOR LINKS ======
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
