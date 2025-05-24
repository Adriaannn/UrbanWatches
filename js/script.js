// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired.');
    // displayWatches() removed for debugging
    
    // Smooth scrolling for navigation links
    try {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
        console.log('Smooth scrolling setup complete.');
    } catch (e) {
        console.error('Error setting up smooth scrolling:', e);
    }

    let navbar, megaDropdownToggle, megaDropdownBar;
    let isMegaDropdownOpen = false;
    try {
        navbar = document.querySelector('.navbar');
        megaDropdownToggle = document.getElementById('collectionsMegaDropdown');
        megaDropdownBar = document.getElementById('megaDropdownBar');
        console.log('Navbar, megaDropdownToggle, megaDropdownBar:', navbar, megaDropdownToggle, megaDropdownBar);
    } catch (e) {
        console.error('Error selecting navbar elements:', e);
    }

    // Function to handle click outside
    function handleClickOutside(event) {
        if (!navbar.contains(event.target)) {
            navbar.classList.remove('active');
            megaDropdownBar.style.display = 'none';
            isMegaDropdownOpen = false;
            updateNavbar();
        }
    }

    // Add click event to mega dropdown toggle
    if (megaDropdownToggle && megaDropdownBar && navbar) {
        megaDropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            navbar.classList.add('active');
            megaDropdownBar.style.display = 'block';
            isMegaDropdownOpen = true;
            updateNavbar();
        });

        // Add click event listener to document
        document.addEventListener('click', handleClickOutside);

        // Prevent dropdown from closing when clicking inside it
        megaDropdownBar.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // Navbar visibility logic
    const customNavbar = document.querySelector('.custom-navbar');
    const heroSection = document.querySelector('.hero-section');
    if (!customNavbar) {
        console.log('customNavbar not found!');
    } else {
        console.log('customNavbar found:', customNavbar);
    }
    if (!heroSection) {
        console.log('heroSection not found!');
    } else {
        console.log('heroSection found:', heroSection);
    }
    let lastScrollY = window.scrollY;
    let mouseNearTop = false;

    function isInHero() {
        if (!heroSection) return false;
        const rect = heroSection.getBoundingClientRect();
        return rect.bottom > 0;
    }

    function updateNavbar() {
        if (!customNavbar) {
            console.log('updateNavbar: customNavbar is null');
            return;
        }
        if (isMegaDropdownOpen) {
            customNavbar.classList.add('navbar-visible');
            customNavbar.classList.remove('navbar-hidden');
            customNavbar.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            console.log('Navbar should be visible (mega dropdown open)');
            return;
        }
        if (isInHero()) {
            // Always show navbar in hero section
            customNavbar.classList.add('navbar-visible');
            customNavbar.classList.remove('navbar-hidden');
            customNavbar.style.backgroundColor = 'transparent';
            console.log('Navbar should be visible (in hero section)');
        } else {
            // Outside hero section - show on hover or scroll up
            if (mouseNearTop || window.scrollY < lastScrollY) {
                customNavbar.classList.add('navbar-visible');
                customNavbar.classList.remove('navbar-hidden');
                customNavbar.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
                console.log('Navbar should be visible (hover/scroll up)');
            } else {
                customNavbar.classList.remove('navbar-visible');
                customNavbar.classList.add('navbar-hidden');
                console.log('Navbar should be hidden (scrolling down)');
            }
        }
        lastScrollY = window.scrollY;
    }

    // Track mouse position near top of page
    document.addEventListener('mousemove', function(e) {
        mouseNearTop = e.clientY < 60;
        updateNavbar();
    });

    // Update on scroll
    window.addEventListener('scroll', updateNavbar);

    // Set initial state
    if (customNavbar) customNavbar.classList.add('navbar-visible');
    updateNavbar();

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
}); 