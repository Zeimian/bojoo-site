// ============================================
// Bojoo Online — Enhanced JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  // Header scroll effect
  initHeaderScroll();
  
  // Mobile navigation
  initMobileNav();
  
  // Card animations
  initCardAnimations();
  
  // Smooth scrolling
  initSmoothScroll();
  
  // Bar chart animations for BI demo
  initBarChartAnimations();
});

// Header scroll effect
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  }, { passive: true });
}

// Mobile navigation toggle
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav-links');
  
  if (!toggle || !nav) return;
  
  toggle.addEventListener('click', function() {
    toggle.classList.toggle('active');
    nav.classList.toggle('active');
  });
  
  // Close menu when clicking a link
  const navLinks = nav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      toggle.classList.remove('active');
      nav.classList.remove('active');
    });
  });
}

// Card entrance animations
function initCardAnimations() {
  const cards = document.querySelectorAll('.hub-card, .kpi-card, .chart-box');
  if (!cards.length) return;
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  cards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 80}ms`;
    observer.observe(card);
  });
}

// Smooth scrolling
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Bar chart animations
function initBarChartAnimations() {
  const bars = document.querySelectorAll('.bar');
  if (!bars.length) return;
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const height = bar.style.height;
        bar.style.height = '0';
        
        setTimeout(() => {
          bar.style.height = height;
        }, 100);
        
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });
  
  bars.forEach(bar => observer.observe(bar));
}

// Add hover effect sound (optional enhancement)
function initHoverEffects() {
  const interactiveElements = document.querySelectorAll('.hub-card, .hub-link, .btn');
  
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      // Could add subtle sound effect here if desired
      this.style.transform = 'scale(1.02)';
    });
    
    element.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });
}

// Utility: Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Utility: Throttle function
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
