// Sample watch data
const watches = [
    {
        id: 1,
        name: "Datejust41",
        brand: "Rolex",
        description: "Iconic automatic movement with date display, fluted bezel, sapphire crystal, and Jubilee bracelet for timeless elegance.",
        image: "images/watches/rolex/rolex-5.jpg"
    },
    {
        id: 2,
        name: "Rolex Submariner",
        brand: "Urban Timepieces",
        description: "Robust automatic movement with unidirectional rotating bezel, date display with Cyclops lens, and scratch-resistant sapphire crystal.",
        image: "images/watches/rolex/rolex-4.jpg"
    },
    {
        id: 3,
        name: "Philippe Chronograph",
        brand: "Urban Timepieces",
        description: "Professional diving watch with water resistance up to 200m and rotating bezel.",
        image: "images/watches/patek/5170j.jpg"
    },
    {
        id: 4,
        name: "RM029",
        brand: "Richard Mille",
        description: "Luxury automatic movement with skeletonized dial, exhibition case back, and scratch-resistant sapphire crystal.",
        image: "images/watches/richard_mille/rm029.jpg"
    },
    {
        id: 5,
        name: "RM030",
        brand: "Richard Mille",
        description: "Inspired by classic pilot watches with large numerals and leather strap.",
        image: "images/watches/richard_mille/rm030.jpg"
    },
    {
        id: 6,
        name: "Daytona",
        brand: "Rolex",
        description: "Combines traditional watch design with smart features and activity tracking.",
        image: "images/watches/rolex/rolex-1.jpg"
    },
];

// Function to create watch cards
function createWatchCard(watch) {
    return `
        <div class="col-md-6 col-lg-4 mb-4">
            <div class="card watch-card">
                <img src="${watch.image}" class="card-img-top" alt="${watch.name}">
                <div class="card-body">
                    <h5 class="card-title">${watch.name}</h5>
                    <p class="card-text">${watch.description}</p>
                    <button class="btn btn-outline-dark w-100" onclick="showWatchDetails(${watch.id})">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Function to display watch collection
function displayWatches() {
    const watchContainer = document.getElementById('watch-container');
    watchContainer.innerHTML = watches.map(watch => createWatchCard(watch)).join('');
}

// Function to show watch details
function showWatchDetails(watchId) {
    const watch = watches.find(w => w.id === watchId);
    if (watch) {
        alert(`
            ${watch.name}
            Brand: ${watch.brand}
            Description: ${watch.description}
        `);
    }
}

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