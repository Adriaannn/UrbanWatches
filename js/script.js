

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayWatches();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const navbar = document.querySelector('.navbar');
    const megaDropdownToggle = document.getElementById('collectionsMegaDropdown');
    const megaDropdownBar = document.getElementById('megaDropdownBar');

    // Function to handle click outside
    function handleClickOutside(event) {
        if (!navbar.contains(event.target)) {
            navbar.classList.remove('active');
            megaDropdownBar.style.display = 'none';
        }
    }

    // Add click event to mega dropdown toggle
    megaDropdownToggle.addEventListener('click', function(e) {
        e.preventDefault();
        navbar.classList.add('active');
        megaDropdownBar.style.display = 'block';
    });

    // Add click event listener to document
    document.addEventListener('click', handleClickOutside);

    // Prevent dropdown from closing when clicking inside it
    megaDropdownBar.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Hide navbar on scroll down, show on scroll up (index.html only)
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '/index.html') {
        let lastScrollTop = 0;
        const navbar = document.querySelector('.navbar');
        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop && scrollTop > 80) {
                // Scrolling down
                navbar.classList.add('navbar-hide');
            } else {
                // Scrolling up
                navbar.classList.remove('navbar-hide');
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }

    // Show solid navbar only when not over hero section (index.html only)
    if ((window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '/index.html') && document.querySelector('.hero-section')) {
        const navbar = document.querySelector('.navbar');
        const heroSection = document.querySelector('.hero-section');
        function checkHeroInView() {
            const heroRect = heroSection.getBoundingClientRect();
            if (heroRect.bottom <= 80) {
                navbar.classList.add('navbar-solid');
            } else {
                navbar.classList.remove('navbar-solid');
            }
        }
        window.addEventListener('scroll', checkHeroInView);
        window.addEventListener('DOMContentLoaded', checkHeroInView);
    }

    (function() {
        const navbar = document.querySelector('.custom-navbar');
        const heroSection = document.getElementById('home');
        let lastScrollY = window.scrollY;
        let ticking = false;
        let mouseNearTop = false;

        function isInHero() {
            const rect = heroSection.getBoundingClientRect();
            return rect.bottom > 80; // 80px from top, adjust as needed
        }

        function updateNavbar() {
            // Show/hide the main bar (background) only on hover near top
            if (mouseNearTop) {
                navbar.classList.add('navbar-bar-visible');
            } else {
                navbar.classList.remove('navbar-bar-visible');
            }

            if (isInHero()) {
                navbar.classList.remove('navbar-hidden');
                navbar.classList.add('hero-navbar');
                // console.log('IN HERO: always show navbar');
            } else {
                navbar.classList.remove('hero-navbar');
                // Only hide if not hovering near top AND scrolling down
                if (!mouseNearTop && window.scrollY > lastScrollY) {
                    navbar.classList.add('navbar-hidden');
                    // console.log('NOT IN HERO: scrolling down and not hovering, hide navbar');
                } else {
                    navbar.classList.remove('navbar-hidden');
                    // console.log('NOT IN HERO: scrolling up or hovering, show navbar');
                }
            }
            lastScrollY = window.scrollY;
            ticking = false;
        }

        document.addEventListener('mousemove', function(e) {
            mouseNearTop = e.clientY < 60;
            updateNavbar();
        });

        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        });

        // Initial state
        updateNavbar();
    })();
}); 