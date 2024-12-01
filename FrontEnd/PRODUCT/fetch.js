// Select the product section where cards will be appended
const productSection = document.querySelector('.product-section .row');

// Function to fetch product data from the API
const getData = async () => {
    try {
        const response = await fetch("http://localhost:7979/api/v1/product/");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Failed to fetch product data:", error);
    }
};

// Function to create a product card
const createCard = (product) => {
    const col = document.createElement('div');
    const card = document.createElement('div');
    const img = document.createElement('img');
    const cardBody = document.createElement('div');
    const cardTitle = document.createElement('p');
    const cardText = document.createElement('p');
    const button = document.createElement('button');

    // Set classes and attributes
    col.classList.add('col');
    card.classList.add('card', 'product-card');
    img.classList.add('card-img-top');
    cardBody.classList.add('card-body');
    cardTitle.classList.add('card-title');
    cardText.classList.add('card-text');
    button.classList.add('btn', 'btn-outline-danger');
    button.setAttribute('type', 'button');
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#buyNowModal');
    button.setAttribute('data-flavor', product.name);

    // Set content
    img.src = product.image || 'assets/default.jpg'; // Provide a default image fallback
    img.alt = product.name;
    cardTitle.textContent = product.name;
    cardText.textContent = `${product.price}.00`; // Corrected interpolation
    button.textContent = "Buy Now";

    // Append elements to create card structure
    cardBody.append(cardTitle, cardText, button);
    card.append(img, cardBody);
    col.append(card);

    return col;
};

// Fetch data and populate the product section
getData().then((products) => {
    if (products && products.length > 0) {
        products.forEach((product) => {
            productSection.append(createCard(product));
        });
    } else {
        console.warn("No products found!");
    }
}).catch((err) => {
    console.error("Error loading products:", err);
});
