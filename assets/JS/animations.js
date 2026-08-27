(function () {
  'use strict';

  const initAnimations = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* أرقام متحركة للإحصائيات */
    const animateNumbers = () => {
      const numbers = document.querySelectorAll('.stat-number, .stats-number');

      numbers.forEach((number) => {
        const target = parseFloat(number.getAttribute('data-target'));
        if (isNaN(target)) return;

        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateNumber = () => {
          current += step;

          if (current < target) {
            if (target % 1 !== 0) {
              number.textContent = current.toFixed(1);
            } else {
              number.textContent = Math.floor(current).toLocaleString('en-US');
            }

            requestAnimationFrame(updateNumber);
          } else {
            if (target % 1 !== 0) {
              number.textContent = target.toFixed(1);
            } else {
              number.textContent = target.toLocaleString('en-US');
            }
          }
        };

        updateNumber();
      });
    };

    const statsSection = document.querySelector('.stats-section');

    if (statsSection && !reduceMotion) {
      const statsObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateNumbers();
              statsObserver.disconnect();
            }
          });
        },
        { threshold: 0.3 }
      );

      statsObserver.observe(statsSection);
    } else {
      animateNumbers();
    }

    /* تأثير hover ثلاثي الأبعاد */
    if (!reduceMotion) {
      const hoverCards = document.querySelectorAll(
        '.feature-card, .level-card, .course-card, .smart-path-card, .notification-card'
      );

      hoverCards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          card.style.transform = `perspective(1000px) rotateX(${(y - centerY) / 20}deg) rotateY(${(centerX - x) / 20}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
          card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
      });
    }

    /* ظهور العناصر عند التمرير */
    const observeElements = () => {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
              entry.target.style.animation = `fadeInUp 0.6s ease-out ${Math.min(index * 0.1, 0.6)}s both`;
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );

      document
        .querySelectorAll('.feature-card, .level-card, .course-card, .smart-path-card, .notification-card, .gallery-item, .info-card, .stats-card')
        .forEach((el) => observer.observe(el));
    };

    window.addEventListener('load', observeElements);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
  } else {
    initAnimations();
  }
})();