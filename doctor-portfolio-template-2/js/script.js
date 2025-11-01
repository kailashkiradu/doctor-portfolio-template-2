document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /**
     * Initialize AOS (Animate on Scroll)
     */
    if (window.AOS) {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    /**
     * Navbar sticky on scroll
     */
    const header = document.getElementById('header');
    if (header) {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        };
        window.addEventListener('load', handleScroll);
        window.addEventListener('scroll', handleScroll);
    }

    /**
     * Mobile navigation toggle
     */
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function (e) {
            // This class matches your CSS
            document.body.classList.toggle('mobile-nav-active');

            // This toggles the icon
            this.classList.toggle('fa-bars');
            this.classList.toggle('fa-times');
        });
    }

    /**
     * Close mobile nav when a link is clicked
     */
    document.querySelectorAll('.navbar a').forEach(navLink => {
        navLink.addEventListener('click', () => {
            if (document.body.classList.contains('mobile-nav-active')) {
                document.body.classList.remove('mobile-nav-active');
                if (mobileNavToggle) {
                    mobileNavToggle.classList.remove('fa-times');
                    mobileNavToggle.classList.add('fa-bars');
                }
            }
        });
    });

    /**
     * Highlight active nav link on scroll
     */
    const navLinks = document.querySelectorAll('.navbar a.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNavLink() {
        let currentSectionId = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Offset for sticky header
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = sectionId;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('load', updateActiveNavLink);
    window.addEventListener('scroll', updateActiveNavLink);

    /**
     * Back to top button
     */
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        const toggleBackToTop = () => {
            if (window.scrollY > 100) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        };
        window.addEventListener('load', toggleBackToTop);
        window.addEventListener('scroll', toggleBackToTop);

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /**
     * Testimonials Carousel (Swiper.js)
     * This is missing from your new file.
     */
    if (typeof Swiper !== 'undefined') {
        new Swiper('.testimonials-slider', {
            speed: 600,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            slidesPerView: 'auto',
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true
            },
            breakpoints: {
                320: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 20 },
                1200: { slidesPerView: 2, spaceBetween: 40 }
            }
        });

        /**
         * Achievements Carousel (Swiper.js)
         * This is also missing from your new file.
         */
        new Swiper('.achievements-slider', {
            speed: 600,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false
            },
            slidesPerView: 'auto',
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true
            },
            breakpoints: {
                320: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 20 },
                1200: { slidesPerView: 3, spaceBetween: 30 }
            }
        });
    }

    /**
     * Animated Counters
     * This logic matches your 'data-target' attribute in index.html
     */
    const counters = document.querySelectorAll('.counter-num');
    const speed = 200; // Lower number = faster

    const startCounter = (counter) => {
        const target = +counter.getAttribute('data-target');

        const updateCount = () => {
            const count = +counter.innerText;
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    };

    if (counters.length > 0 && 'IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    startCounter(counter);
                    observer.unobserve(counter); // Only run once
                }
            });
        }, { threshold: 0.5 }); // Start when 50% of the counter is visible

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    } else {
        // Fallback for older browsers
        counters.forEach(counter => startCounter(counter));
    }

    /**
     * Gallery Lightbox (Updated with Captions)
     * This uses the modal from your index.html and includes captions.
     */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (galleryItems.length > 0 && lightbox) {

        galleryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();

                const img = item.querySelector('.gallery-img');
                const caption = item.querySelector('.gallery-caption');

                if (img) {
                    // Show the lightbox
                    lightbox.style.display = 'block'; // Or 'flex' if you use that
                    lightbox.setAttribute('aria-hidden', 'false');

                    // Set the image source and alt text
                    lightboxImg.src = img.src;
                    lightboxImg.alt = img.alt;

                    // Set the caption text
                    if (caption) {
                        lightboxCaption.innerHTML = caption.innerHTML;
                    } else {
                        lightboxCaption.innerHTML = ''; // Clear if no caption
                    }
                }
            });
        });

        // Function to close the lightbox
        const closeLightbox = () => {
            lightbox.style.display = 'none';
            lightbox.setAttribute('aria-hidden', 'true');
            lightboxImg.src = ''; // Clear image
            lightboxCaption.innerHTML = ''; // Clear caption
        };

        // 1. Close on button click
        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }

        // 2. Close on background click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // 3. Close with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && (lightbox.style.display === 'block' || lightbox.style.display === 'flex')) {
                closeLightbox();
            }
        });
    }

});