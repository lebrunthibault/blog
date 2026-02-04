import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Swup from 'swup';
import SwupHeadPlugin from '@swup/head-plugin';
import SwupPreloadPlugin from '@swup/preload-plugin';

gsap.registerPlugin(ScrollTrigger);

// State
let lenis = null;
let rafId = null;

// Initialize smooth scroll with inertia (only on home & list pages)
function initLenis() {
  if (document.body.dataset.smoothScroll !== 'true') return;

  lenis = new Lenis({
    duration: 0.65,
    easing: (t) => 1 - Math.pow(1 - t, 2.5),
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.2,
  });

  function raf(time) {
    lenis.raf(time);
    ScrollTrigger.update();
    rafId = requestAnimationFrame(raf);
  }
  rafId = requestAnimationFrame(raf);

  // Expose for debugging
  window.lenis = lenis;

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        lenis.scrollTo(target, { duration: 1.2 });
      }
    });
  });
}

// Mobile menu handling
function initMobileMenu() {
  const menuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('menu-icon-open');
  const iconClose = document.getElementById('menu-icon-close');

  if (menuButton && mobileMenu && iconOpen && iconClose) {
    menuButton.addEventListener('click', function() {
      const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', !isExpanded);
      menuButton.setAttribute('aria-label', isExpanded ? 'Ouvrir le menu de navigation' : 'Fermer le menu de navigation');

      // Toggle menu overlay
      mobileMenu.classList.toggle('is-open');

      // Toggle icons
      iconOpen.classList.toggle('hidden');
      iconClose.classList.toggle('hidden');

      // Prevent body scroll when menu is open
      document.body.style.overflow = isExpanded ? '' : 'hidden';
    });
  }
}

// Close mobile menu
function closeMobileMenu() {
  const menuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('menu-icon-open');
  const iconClose = document.getElementById('menu-icon-close');

  if (mobileMenu && mobileMenu.classList.contains('is-open')) {
    mobileMenu.classList.remove('is-open');
    if (menuButton) {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Ouvrir le menu de navigation');
    }
    if (iconOpen) iconOpen.classList.remove('hidden');
    if (iconClose) iconClose.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

// Hero title animation
function initHeroAnimation() {
  const heroTitle = document.querySelector('.hero-title');
  if (!heroTitle) return;

  // DEBUG FLAG: set to true to test only neon effect
  const NEON_ONLY = false;

  const aiFirst = document.querySelector('.hero-ai-first');
  const modern = document.querySelector('.hero-modern');
  const modernLine = document.querySelector('.hero-modern-line');
  const modernLetters = document.querySelector('.hero-modern-letters');
  const webDevLine = document.querySelector('.hero-webdev-line');
  const webDevLetters = document.querySelector('.hero-webdev-letters');
  const aiWords = document.querySelectorAll('.hero-ai-word');

  if (!modernLetters || !webDevLetters || !aiFirst) return;

  // Wrap each letter in spans
  modernLetters.innerHTML = modernLetters.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='hero-letter inline-block' style='opacity:0'>$&</span>");
  webDevLetters.innerHTML = webDevLetters.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='hero-letter inline-block' style='opacity:0'>$&</span>");
  const modernChars = modernLetters.querySelectorAll('.hero-letter');
  const webDevChars = webDevLetters.querySelectorAll('.hero-letter');

  // Get dimensions
  const modernWidth = modernLetters.getBoundingClientRect().width + 10;
  const webDevWidth = webDevLetters.getBoundingClientRect().width + 10;
  const aiFirstWidth = aiFirst.getBoundingClientRect().width;

  // Timeline
  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

  // Separate AI and First words
  const aiWord = aiWords[0];
  const firstWord = aiWords[1];

  if (NEON_ONLY) {
    // Skip all animations, show everything, test only neon
    gsap.set(modernChars, { opacity: 1 });
    gsap.set(webDevChars, { opacity: 1 });
    gsap.set(aiWords, { opacity: 1, scale: 1 });
  } else {
    // Initial state - Modern starts at left (shifted by AI First width)
    gsap.set(aiFirst, { width: 0, overflow: 'hidden' });
    gsap.set(modernLine, { scaleY: 0, opacity: 0 });
    gsap.set(webDevLine, { scaleY: 0, opacity: 0 });
    gsap.set(aiWord, { opacity: 0, scale: 14 });
    gsap.set(firstWord, { opacity: 0 });

    tl
        .to({}, { duration: 0.5 })
      // Step 1: Typewriter on "Modern"
      .to(modernLine, { scaleY: 1, opacity: 1, duration: 0.2, ease: 'expo.out' })
      .to(modernLine, { x: modernWidth, duration: 0.6, ease: 'expo.out', delay: 0.05 })
      .to(modernChars, { opacity: 1, duration: 0.2, ease: 'expo.out', stagger: 0.05 }, '-=0.55')
      .to(modernLine, { opacity: 0, duration: 0 })

      // Step 2: Typewriter on "Web Development"
      .to(webDevLine, { scaleY: 1, opacity: 1, duration: 0, ease: 'expo.out' })
      .to(webDevLine, { x: webDevWidth, duration: 1.1, ease: 'expo.out', delay: 0.05 })
      .to(webDevChars, { opacity: 1, duration: 0.25, ease: 'expo.out', stagger: 0.045 }, '-=1.0')
      .to(webDevLine, { opacity: 0, duration: 0 })

      // Step 3: AI First appears
      .set(aiFirst, { overflow: 'visible' })
      .to(aiFirst, {
        width: aiFirstWidth + 10,
        duration: 0,
        ease: 'power2.out'
      })
      // AI: scale from big + fade in
      .to(aiWord, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'circ.out'
      }, '<')
        .to({}, { duration: 0.2 })

      // First: just fade in (after AI)
      .to(firstWord, {
        opacity: 1,
        duration: 0.9,
        ease: 'power2.out'
      }, '-=0.2');
  }

  // Neon effect on AI First - subtle blue glow
  tl.fromTo(aiWords,
    { textShadow: '0 0 2px rgba(93,126,168,0.9), 0 0 6px rgba(93,126,168,0.6), 0 0 12px rgba(93,126,168,0.4), 0 0 20px rgba(93,126,168,0.2)' },
    {
      textShadow: '0 0 2px rgba(65,90,119,0.9), 0 0 6px rgba(65,90,119,0.6), 0 0 12px rgba(65,90,119,0.4), 0 0 20px rgba(65,90,119,0.2)',
      duration: 1.5,
      ease: 'power1.inOut',
      yoyo: true,
    }
  )
  .to(aiWords, {
    textShadow: '0 0 2px rgba(65,90,119,0), 0 0 6px rgba(65,90,119,0), 0 0 12px rgba(65,90,119,0), 0 0 20px rgba(65,90,119,0)',
    duration: 2,
    ease: 'power2.out'
  });
}

// Profile image animations
function initProfileAnimation() {
  const profileBase = document.querySelector('.hero-profile-base');
  const profileAi = document.querySelector('.hero-profile-ai');

  if (!profileBase || !profileAi) return;

  // First: fade in base image (1.5s)
  gsap.to(profileBase, {
    opacity: 1,
    duration: 1.5,
    ease: 'sine.out'
  });
  // Then: fade in AI background image (3s, starts after 1s)
  gsap.to(profileAi, {
    opacity: 1,
    duration: 3,
    delay: 1,
    ease: 'power2.Out'
  });
}

// Scroll reveal animations for home sections
function initScrollReveal() {
  const scrollRevealSections = document.querySelectorAll('.scroll-reveal');

  if (scrollRevealSections.length === 0) return;

  scrollRevealSections.forEach((section) => {
    gsap.fromTo(section,
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}

// Update active menu item based on current URL
function updateActiveMenuItem() {
  const currentPath = window.location.pathname;
  const menuLinks = document.querySelectorAll('.menu-item-link');

  menuLinks.forEach(link => {
    const href = link.getAttribute('href');
    const isActive = currentPath === href || (href !== '/' && currentPath.startsWith(href));

    link.classList.toggle('menu-item-active', isActive);
  });
}

// Cleanup before page transition
function cleanup() {
  // Kill all GSAP animations and ScrollTriggers
  ScrollTrigger.getAll().forEach(st => st.kill());
  gsap.killTweensOf('*');

  // Destroy Lenis
  if (lenis) {
    lenis.destroy();
    lenis = null;
    window.lenis = null;
  }

  // Cancel animation frame
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }

  // Close mobile menu
  closeMobileMenu();
}

// Initialize all page components
function initPage() {
  initLenis();
  initMobileMenu();
  initHeroAnimation();
  initProfileAnimation();
  initScrollReveal();
  updateActiveMenuItem();
}

// Initialize Swup
const swup = new Swup({
  containers: ['#swup'],
  linkSelector: 'a[data-swup-link]',
  plugins: [
    new SwupHeadPlugin(),
    new SwupPreloadPlugin()
  ]
});

// Hook: before content replacement (cleanup)
swup.hooks.before('content:replace', () => {
  cleanup();
});

// Hook: after content replacement (reinitialize)
swup.hooks.on('content:replace', () => {
  initPage();
});

// Initial page load
document.addEventListener('DOMContentLoaded', initPage);
