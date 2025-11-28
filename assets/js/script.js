// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all functions
  initPreloader();
  initNavbar();
  initThemeToggle();
  initTypingAnimation();
  initScrollProgress();
  initScrollAnimations();
  initProjectFilter();
  initProjectCarousels();
  initLightbox();
  initSkillTabs();
  initCounterAnimation();
  initBackToTop();
  initContactForm();
  initParticles();
});

/* ===== Skill Tabs ===== */
function initSkillTabs() {
  const tabs = document.querySelectorAll(".skill-tab");
  const panels = document.querySelectorAll(".skill-panel");

  if (tabs.length === 0) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetPanel = tab.getAttribute("data-tab");

      // Remove active class from all tabs
      tabs.forEach((t) => t.classList.remove("active"));

      // Remove active class from all panels
      panels.forEach((p) => p.classList.remove("active"));

      // Add active class to clicked tab
      tab.classList.add("active");

      // Add active class to corresponding panel
      const panel = document.getElementById(targetPanel);
      if (panel) {
        panel.classList.add("active");
      }
    });
  });
}

/* ===== Preloader ===== */
function initPreloader() {
  const preloader = document.getElementById("preloader");

  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("hidden");
    }, 500);
  });
}

/* ===== Navbar ===== */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile menu toggle
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close menu on link click
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Active link on scroll
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute("id");
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach((link) => link.classList.remove("active"));
          navLink.classList.add("active");
        }
      }
    });
  });
}

/* ===== Theme Toggle ===== */
function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  const icon = themeToggle.querySelector("i");

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateIcon(savedTheme);
  }

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateIcon(newTheme);
  });

  function updateIcon(theme) {
    icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
  }
}

/* ===== Typing Animation ===== */
function initTypingAnimation() {
  const typedText = document.getElementById("typed-text");
  const words = ["Backend Developer"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typedText.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      typedText.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500; // Pause before next word
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* ===== Scroll Progress ===== */
function initScrollProgress() {
  const progressBar = document.getElementById("scroll-progress");

  window.addEventListener("scroll", () => {
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = `${scrolled}%`;
  });
}

/* ===== Scroll Animations ===== */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll("[data-aos]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("aos-animate");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  animatedElements.forEach((el) => observer.observe(el));
}

/* ===== Project Filter ===== */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update active button
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const categories = card.getAttribute("data-category");

        if (filter === "all" || categories.includes(filter)) {
          card.classList.remove("hidden");
          card.style.animation = "fadeIn 0.5s ease forwards";
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
}

/* ===== Project Carousels ===== */
function initProjectCarousels() {
  const carousels = document.querySelectorAll(".project-carousel");

  carousels.forEach((carousel) => {
    const container = carousel.querySelector(".carousel-container");
    const slides = carousel.querySelector(".carousel-slides");
    const images = slides.querySelectorAll("img");
    const prevBtn = carousel.querySelector(".carousel-btn.prev");
    const nextBtn = carousel.querySelector(".carousel-btn.next");
    const dotsContainer = carousel.querySelector(".carousel-dots");

    let currentIndex = 0;
    let autoSlideInterval;
    const totalSlides = images.length;

    // Create dots
    images.forEach((_, index) => {
      const dot = document.createElement("span");
      dot.className = `carousel-dot ${index === 0 ? "active" : ""}`;
      dot.addEventListener("click", () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll(".carousel-dot");

    // Go to specific slide
    function goToSlide(index) {
      currentIndex = index;
      if (currentIndex >= totalSlides) currentIndex = 0;
      if (currentIndex < 0) currentIndex = totalSlides - 1;

      slides.style.transform = `translateX(-${currentIndex * 100}%)`;

      // Update dots
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
      });
    }

    // Next slide
    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    // Previous slide
    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    // Auto slide
    function startAutoSlide() {
      autoSlideInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoSlide() {
      clearInterval(autoSlideInterval);
    }

    // Event listeners
    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      prevSlide();
      stopAutoSlide();
      startAutoSlide();
    });

    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      nextSlide();
      stopAutoSlide();
      startAutoSlide();
    });

    // Pause on hover
    carousel.addEventListener("mouseenter", stopAutoSlide);
    carousel.addEventListener("mouseleave", startAutoSlide);

    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    slides.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoSlide();
      },
      { passive: true }
    );

    slides.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoSlide();
      },
      { passive: true }
    );

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    }

    // Keyboard navigation when carousel is focused
    carousel.setAttribute("tabindex", "0");
    carousel.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
      }
    });

    // Start auto slide
    startAutoSlide();
  });
}

/* ===== Image Lightbox ===== */
function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");
  const lightboxPrev = document.getElementById("lightbox-prev");
  const lightboxNext = document.getElementById("lightbox-next");
  const lightboxCounter = document.getElementById("lightbox-counter");

  let currentImages = [];
  let currentImageIndex = 0;

  // Get all expand buttons
  const expandBtns = document.querySelectorAll(".expand-btn");

  expandBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      // Get the carousel this button belongs to
      const carousel = btn.closest(".project-carousel");
      const images = carousel.querySelectorAll(".carousel-slides img");

      // Get current slide index from carousel
      const slides = carousel.querySelector(".carousel-slides");
      const transform = slides.style.transform;
      const match = transform.match(/translateX\(-(\d+)%\)/);
      currentImageIndex = match ? parseInt(match[1]) / 100 : 0;

      // Store all image sources
      currentImages = Array.from(images).map((img) => img.src);

      // Show lightbox with current image
      showImage(currentImageIndex);
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  function showImage(index) {
    if (index < 0) index = currentImages.length - 1;
    if (index >= currentImages.length) index = 0;
    currentImageIndex = index;

    lightboxImg.src = currentImages[index];
    lightboxCounter.textContent = `${index + 1} / ${currentImages.length}`;
  }

  // Navigation
  lightboxPrev.addEventListener("click", () => {
    showImage(currentImageIndex - 1);
  });

  lightboxNext.addEventListener("click", () => {
    showImage(currentImageIndex + 1);
  });

  // Close lightbox
  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;

    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowLeft") {
      showImage(currentImageIndex - 1);
    } else if (e.key === "ArrowRight") {
      showImage(currentImageIndex + 1);
    }
  });
}

/* ===== Counter Animation ===== */
function initCounterAnimation() {
  const counters = document.querySelectorAll(".stat-number");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute("data-count"));
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;

          const updateCounter = () => {
            current += step;
            if (current < target) {
              counter.textContent = Math.floor(current);
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target;
            }
          };

          updateCounter();
          observer.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

/* ===== Back to Top ===== */
function initBackToTop() {
  const backToTop = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });

  backToTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/* ===== Contact Form ===== */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector(".btn-submit");
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        formStatus.className = "form-status success";
        formStatus.textContent =
          "Thank you! Your message has been sent successfully.";
        form.reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      formStatus.className = "form-status error";
      formStatus.textContent = "Oops! Something went wrong. Please try again.";
    }

    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;

    setTimeout(() => {
      formStatus.style.display = "none";
    }, 5000);
  });
}

/* ===== Particles Effect (Optimized) ===== */
function initParticles() {
  const container = document.getElementById("particles");
  if (!container) return;

  // Reduce particle count for better performance
  const particleCount = 20; // Reduced from 50

  // Use document fragment for batch DOM insertion
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    // Random properties
    const size = Math.random() * 4 + 2;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = Math.random() * 15 + 15; // Slower animation for less CPU
    const opacity = Math.random() * 0.3 + 0.1;

    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: var(--primary);
      border-radius: 50%;
      left: ${posX}%;
      top: ${posY}%;
      opacity: ${opacity};
      animation: particleFloat ${duration}s ease-in-out ${delay}s infinite;
      will-change: transform;
    `;

    fragment.appendChild(particle);
  }

  container.appendChild(fragment);

  // Add particle animation keyframes
  const style = document.createElement("style");
  style.textContent = `
    @keyframes particleFloat {
      0%, 100% {
        transform: translate(0, 0);
      }
      25% {
        transform: translate(20px, -30px);
      }
      50% {
        transform: translate(-10px, 20px);
      }
      75% {
        transform: translate(30px, 10px);
      }
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
}

/* ===== Smooth Scroll ===== */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

/* ===== Update Current Year ===== */
document.getElementById("current-year").textContent = new Date().getFullYear();

/* ===== Enhanced Lazy Load Images ===== */
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;

            // Load the image
            if (img.dataset.src) {
              img.src = img.dataset.src;
            }

            // Add loaded class for fade-in effect
            img.classList.add("loaded");

            observer.unobserve(img);
          }
        });
      },
      {
        rootMargin: "100px 0px", // Start loading 100px before visible
        threshold: 0.01,
      }
    );

    lazyImages.forEach((img) => {
      // Add placeholder styling
      img.style.opacity = "0";
      img.style.transition = "opacity 0.3s ease";

      // When image loads, fade it in
      img.addEventListener("load", () => {
        img.style.opacity = "1";
      });

      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    lazyImages.forEach((img) => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
    });
  }
}

// Initialize lazy loading
initLazyLoading();
