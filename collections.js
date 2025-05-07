// Sample watch data with categories
const watches = [
    {
        id: 1,
        name: "Classic Chronograph",
        brand: "Urban Timepieces",
        price: 299.99,
        description: "A timeless chronograph watch with premium leather strap and stainless steel case.",
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "Classic"
    },
    {
        id: 2,
        name: "Modern Minimalist",
        brand: "Urban Timepieces",
        price: 199.99,
        description: "Clean and contemporary design with a minimalist dial and mesh bracelet.",
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "Classic"
    },
    {
        id: 3,
        name: "Sport Diver",
        brand: "Urban Timepieces",
        price: 399.99,
        description: "Professional diving watch with water resistance up to 200m and rotating bezel.",
        image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "Sport"
    },
    {
        id: 4,
        name: "Luxury Automatic",
        brand: "Urban Timepieces",
        price: 599.99,
        description: "Premium automatic movement with exhibition case back and sapphire crystal.",
        image: "https://images.unsplash.com/photo-1539874754764-5a96559165b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "Luxury"
    },
    // Add more watches here...
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
function displayWatches(category = 'All') {
    const watchContainer = document.getElementById('collections-container');
    const filteredWatches = category === 'All' 
        ? watches 
        : watches.filter(watch => watch.category === category);
    
    watchContainer.innerHTML = filteredWatches.map(watch => createWatchCard(watch)).join('');
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
    
    // Add click handlers for category filters
    document.querySelectorAll('.btn-group .btn').forEach(button => {
        button.addEventListener('click', (e) => {
            // Remove active class from all buttons
            document.querySelectorAll('.btn-group .btn').forEach(btn => {
                btn.classList.remove('active');
            });
            // Add active class to clicked button
            e.target.classList.add('active');
            // Filter watches
            displayWatches(e.target.textContent);
        });
    });
}); 