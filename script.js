const products = [
    {
        id: 1,
        name: "CraxsRAT",
        image: "fotos/1.png",
        category: "hacking",
        price: "25.00$",
        type: "original",
        creator: "evlf_dev",
        version: "7.6",
        keywords: ["craxsrat", "rat", "hacking", "control"]
    },
    {
        id: 2,
        name: "WIFI Breaker v3",
        image: "fotos/2.png",
        category: "hacking",
        price: "Gratis",
        type: "cracked",
        creator: "Anon_User",
        version: "3.0.0",
        keywords: ["hacking", "wifi", "network", "free"]
    },
    {
        id: 3,
        name: "Social Media Scraper",
        image: "fotos/3.png",
        category: "osint",
        price: "15.00$",
        type: "original",
        creator: "DataMiner",
        version: "1.2.0",
        keywords: ["osint", "social", "scraping", "instagram", "facebook"]
    },
    {
        id: 4,
        name: "SQLi Exploit Kit",
        image: "fotos/4.png",
        category: "hacking",
        price: "50.00$",
        type: "original",
        creator: "DarkMatrix",
        version: "5.0.2",
        keywords: ["hacking", "sql", "injection", "database"]
    }
];

const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');

function displayProducts(filteredProducts) {
    productGrid.innerHTML = '';

    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.onclick = () => window.location.href = `htmls/${product.id}.html`;

        card.innerHTML = `
            <div class="card-inner">
                <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <span class="product-tag">${product.category}</span>
                    <p style="margin-top: 10px; font-weight: bold; color: #fff;">${product.price}</p>
                </div>
            </div>
        `;

        productGrid.appendChild(card);
    });
}

function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;

    const filtered = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
            product.keywords.some(k => k.toLowerCase().includes(searchTerm));

        let matchesFilter = true;
        if (activeFilter === 'free') {
            matchesFilter = product.price.toLowerCase() === 'gratis';
        } else if (activeFilter === 'paid') {
            matchesFilter = product.price.toLowerCase() !== 'gratis';
        } else if (activeFilter !== 'all') {
            matchesFilter = product.category === activeFilter;
        }

        return matchesSearch && matchesFilter;
    });

    displayProducts(filtered);
}

searchInput.addEventListener('input', filterProducts);

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterProducts();
    });
});

// Initial display
displayProducts(products);

// Multi-layer security
document.addEventListener('contextmenu', e => e.preventDefault());

document.addEventListener('keydown', e => {
    // Disable F12
    if (e.keyCode === 123) {
        e.preventDefault();
        return false;
    }
    // Disable Ctrl+Shift+I, J, C and Ctrl+U
    if (e.ctrlKey && (e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67) || e.keyCode === 85)) {
        e.preventDefault();
        return false;
    }
});


