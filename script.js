// Sample watch data
const watches = [
    {
        id: 1,
        name: "Classic Chronograph",
        brand: "Urban Timepieces",
        price: 299.99,
        description: "A timeless chronograph watch with premium leather strap and stainless steel case.",
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        name: "Modern Minimalist",
        brand: "Urban Timepieces",
        price: 199.99,
        description: "Clean and contemporary design with a minimalist dial and mesh bracelet.",
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        name: "Sport Diver",
        brand: "Urban Timepieces",
        price: 399.99,
        description: "Professional diving watch with water resistance up to 200m and rotating bezel.",
        image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        name: "Luxury Automatic",
        brand: "Urban Timepieces",
        price: 599.99,
        description: "Premium automatic movement with exhibition case back and sapphire crystal.",
        image: "https://images.unsplash.com/photo-1539874754764-5a96559165b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 5,
        name: "Vintage Pilot",
        brand: "Urban Timepieces",
        price: 349.99,
        description: "Inspired by classic pilot watches with large numerals and leather strap.",
        image: "https://images.unsplash.com/photo-1548169874-53e85f753f1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 6,
        name: "Smart Hybrid",
        brand: "Urban Timepieces",
        price: 249.99,
        description: "Combines traditional watch design with smart features and activity tracking.",
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 7,
        name: "Skeleton Automatic",
        brand: "Urban Timepieces",
        price: 499.99,
        description: "Stunning skeleton design revealing the intricate mechanical movement.",
        image: "https://images.unsplash.com/photo-1526045478516-99145907023c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 8,
        name: "Field Watch",
        brand: "Urban Timepieces",
        price: 179.99,
        description: "Rugged and reliable field watch with NATO strap and luminous hands.",
        image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 9,
        name: "Moonphase",
        brand: "Urban Timepieces",
        price: 449.99,
        description: "Elegant moonphase complication with mother of pearl dial.",
        image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 10,
        name: "GMT Master",
        brand: "Urban Timepieces",
        price: 529.99,
        description: "Dual time zone watch with rotating bezel and 24-hour hand.",
        image: "https://images.unsplash.com/photo-1539874754764-5a96559165b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 11,
        name: "Racing Chronograph",
        brand: "Urban Timepieces",
        price: 379.99,
        description: "High-performance chronograph with tachymeter scale and racing-inspired design.",
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 12,
        name: "Dress Watch",
        brand: "Urban Timepieces",
        price: 279.99,
        description: "Elegant dress watch with slim profile and crocodile leather strap.",
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
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
                    <p class="price">$${watch.price}</p>
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
            Price: $${watch.price}
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