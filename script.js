document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Preloader Fadeout
  // ==========================================
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 600);
    }, 800); // Small delay to enjoy the premium loading visual
  });

  // Fallback in case window load takes too long
  setTimeout(() => {
    if (preloader.style.opacity !== '0') {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 600);
    }
  }, 3000);

  // ==========================================
  // 2. Mobile Menu Toggle
  // ==========================================
  const mobileMenuIcon = document.getElementById('mobileMenuIcon');
  const navLinks = document.getElementById('navLinks');
  const navLinksList = document.querySelectorAll('.nav-link');

  mobileMenuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const isOpened = navLinks.classList.contains('active');
    mobileMenuIcon.innerHTML = isOpened ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
  });

  // Close menu when a link is clicked (mobile view)
  navLinksList.forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuIcon.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  });

  // ==========================================
  // 3. Sticky Header
  // ==========================================
  const header = document.querySelector('.navbar');
  const adjustHeader = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', adjustHeader);
  adjustHeader(); // run once on start

  // ==========================================
  // 4. Scroll Reveal (Intersection Observer)
  // ==========================================
  const revealElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Reveal only once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // ==========================================
  // 5. Scroll Spy Navigation Highlight
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  const scrollSpy = () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      
      if (scrollPos >= top && scrollPos < top + height) {
        navLinksList.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', scrollSpy);
  scrollSpy(); // run once on start

  // ==========================================
  // 6. Count-up Stats Animation
  // ==========================================
  const counterElements = document.querySelectorAll('.counter');
  
  const countUp = (element) => {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const duration = 2000; // 2 seconds
    const stepTime = Math.max(Math.floor(duration / target), 15);
    let current = 0;
    
    // For larger numbers, step by larger increments
    const increment = target > 100 ? Math.ceil(target / (duration / stepTime)) : 1;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = current;
      }
    }, stepTime);
  };

  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        observer.unobserve(entry.target); // Trigger count up only once
      }
    });
  }, {
    threshold: 0.5
  });

  counterElements.forEach(el => {
    statsObserver.observe(el);
  });

  // ==========================================
  // 7. Interactive 3D Card Tilt Effect
  // ==========================================
  const tiltCards = document.querySelectorAll('[data-tilt]');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x coordinate within client
      const y = e.clientY - rect.top;  // y coordinate within client
      
      const width = rect.width;
      const height = rect.height;
      
      const xPercent = (x / width) - 0.5; // -0.5 to 0.5
      const yPercent = (y / height) - 0.5;
      
      // Calculate rotation angles (max 10 degrees)
      const rotateX = (-yPercent * 12).toFixed(2);
      const rotateY = (xPercent * 12).toFixed(2);
      
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
      
      // Set custom CSS variables for shine effects
      card.style.setProperty('--shine-x', `${x}px`);
      card.style.setProperty('--shine-y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // ==========================================
  // 8. Contact Form submission & Toast Notification
  // ==========================================
  const contactForm = document.getElementById('bossContactForm');
  const toastMsg = document.getElementById('toastMsg');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Form fields
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const company = document.getElementById('company').value;
      const phone = document.getElementById('phone').value;
      const message = document.getElementById('message').value;

      // Log/Submit logic mock
      console.log('Form Inquiry Submitted:', { name, email, company, phone, message });

      // Trigger Toast notification
      toastMsg.classList.add('show');

      // Clear Form Fields
      contactForm.reset();

      // Hide toast after 4 seconds
      setTimeout(() => {
        toastMsg.classList.remove('show');
      }, 4000);
    });
  }

  // ==========================================
  // 9. Interactive Radial Map Connections
  // ==========================================
  const mapWrapper = document.querySelector('.radial-map-wrapper');
  const mapNodes = document.querySelectorAll('.map-node');
  
  if (mapWrapper && mapNodes.length > 0) {
    const svgNS = 'http://www.w3.org/2000/svg';
    const cx = 340;
    const cy = 340;

    const updateMapConnections = () => {
      // Clear old SVG connections if they exist
      const existingSvg = mapWrapper.querySelector('.map-connections');
      if (existingSvg) {
        existingSvg.remove();
      }

      // Do not draw lines or create elements on mobile/tablet layout (where nodes are stacked/grid)
      if (window.innerWidth <= 1024) {
        return;
      }

      const svg = document.createElementNS(svgNS, 'svg');
      svg.setAttribute('class', 'map-connections');
      svg.setAttribute('viewBox', '0 0 680 680');

      // Query active radius from first node style/computed style
      const firstNode = mapNodes[0];
      const computedRadiusStr = window.getComputedStyle(firstNode).getPropertyValue('--radius') || '280px';
      const radius = parseFloat(computedRadiusStr);

      mapNodes.forEach((node) => {
        const angleStr = node.style.getPropertyValue('--angle') || '0deg';
        const angle = parseFloat(angleStr) * (Math.PI / 180);

        // Calculate connection target points
        const tx = cx + radius * Math.cos(angle);
        const ty = cy + radius * Math.sin(angle);

        // Background line
        const bgLine = document.createElementNS(svgNS, 'line');
        bgLine.setAttribute('x1', cx);
        bgLine.setAttribute('y1', cy);
        bgLine.setAttribute('x2', tx);
        bgLine.setAttribute('y2', ty);
        bgLine.setAttribute('class', 'connection-path-bg');
        svg.appendChild(bgLine);

        // Pulsing glow line
        const glowLine = document.createElementNS(svgNS, 'line');
        glowLine.setAttribute('x1', cx);
        glowLine.setAttribute('y1', cy);
        glowLine.setAttribute('x2', tx);
        glowLine.setAttribute('y2', ty);
        glowLine.setAttribute('class', 'connection-path-glow');

        // Tracing style properties
        glowLine.style.strokeDasharray = radius;
        glowLine.style.strokeDashoffset = radius;
        glowLine.style.transition = 'stroke-dashoffset 0.4s ease-out, opacity 0.3s ease';

        svg.appendChild(glowLine);

        // Save reference to dynamically trace it on hover
        node.glowLine = glowLine;
        node.activeRadius = radius;
      });

      mapWrapper.insertBefore(svg, mapWrapper.firstChild);
    };

    // Hover event listeners for line tracing
    mapNodes.forEach((node) => {
      node.addEventListener('mouseenter', () => {
        if (node.glowLine) {
          node.glowLine.style.strokeDashoffset = '0';
          node.glowLine.style.opacity = '1';
        }
      });

      node.addEventListener('mouseleave', () => {
        if (node.glowLine) {
          node.glowLine.style.strokeDashoffset = node.activeRadius;
          node.glowLine.style.opacity = '0';
        }
      });
    });

    // Run once at load
    updateMapConnections();

    // Re-render lines on resize to maintain alignment
    window.addEventListener('resize', updateMapConnections);
  }

  // ==========================================
  // 10. Lightbox Modal for Original Infographic
  // ==========================================
  const lightbox = document.getElementById('imageLightbox');
  const viewOriginalBtn = document.getElementById('viewOriginalBtn');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (lightbox && viewOriginalBtn && lightboxClose) {
    viewOriginalBtn.addEventListener('click', () => {
      lightbox.classList.add('show');
      document.body.style.overflow = 'hidden'; // Stop body scrolling
    });

    const closeLightbox = () => {
      lightbox.classList.remove('show');
      document.body.style.overflow = ''; // Re-enable scrolling
    };

    lightboxClose.addEventListener('click', closeLightbox);

    // Close when clicking empty dark background area of modal
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Close when Esc key is pressed
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('show')) {
        closeLightbox();
      }
    });
  }
});
