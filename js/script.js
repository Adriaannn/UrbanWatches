// Sample watch data
const watches = [
    {
        id: 1,
        name: "Classic Chronograph",
        brand: "Urban Timepieces",
        description: "A timeless chronograph watch with premium leather strap and stainless steel case.",
        image: "images/watches/rolex/rolex-5.jpg"
    },
    {
        id: 2,
        name: "Modern Minimalist",
        brand: "Urban Timepieces",
        description: "Clean and contemporary design with a minimalist dial and mesh bracelet.",
        image: "images/watches/rolex/rolex-4.jpg"
    },
    {
        id: 3,
        name: "Sport Diver",
        brand: "Urban Timepieces",
        description: "Professional diving watch with water resistance up to 200m and rotating bezel.",
        image: "images/watches/patek/5170j.jpg"
    },
    {
        id: 4,
        name: "Luxury Automatic",
        brand: "Urban Timepieces",
        description: "Premium automatic movement with exhibition case back and sapphire crystal.",
        image: "images/watches/richard_mille/rm029.jpg"
    },
    {
        id: 5,
        name: "Vintage Pilot",
        brand: "Urban Timepieces",
        description: "Inspired by classic pilot watches with large numerals and leather strap.",
        image: "images/watches/richard_mille/rm030.jpg"
    },
    {
        id: 6,
        name: "Smart Hybrid",
        brand: "Urban Timepieces",
        description: "Combines traditional watch design with smart features and activity tracking.",
        image: "images/watches/rolex/rolex-1.jpg"
    },
    {
        id: 7,
        name: "Datejust 41",
        brand: "Rolex",
        description: "Stunning skeleton design revealing the intricate mechanical movement.",
        image: "images/watches/rolex/rolex-6.jpg"
    },
    {
        id: 8,
        name: "Field Watch",
        brand: "Urban Timepieces",
        description: "Rugged and reliable field watch with NATO strap and luminous hands.",
        image: "images/watches/patek/5396r.jpg"
    },
    {
        id: 9,
        name: "Moonphase",
        brand: "Urban Timepieces",
        description: "Elegant moonphase complication with mother of pearl dial.",
        image: "images/watches/patek/5524g.jpg"
    },
    {
        id: 10,
        name: "GMT Master",
        brand: "Urban Timepieces",
        description: "Dual time zone watch with rotating bezel and 24-hour hand.",
        image: "images/watches/patek/5212a.jpg"
    },
    {
        id: 11,
        name: "Racing Chronograph",
        brand: "Urban Timepieces",
        description: "High-performance chronograph with tachymeter scale and racing-inspired design.",
        image: "images/watches/rolex/rolex-3.jpg"
    },
    {
        id: 12,
        name: "Dress Watch",
        brand: "Urban Timepieces",
        description: "Elegant dress watch with slim profile and crocodile leather strap.",
        image: "images/watches/richard_mille/rm035.jpg"
    }
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
}); 