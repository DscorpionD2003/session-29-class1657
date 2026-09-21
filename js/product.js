"use strict";

const productsGrid = document.querySelector("#products-grid");
const productsStatus = document.querySelector("#products-status");

async function getProducts() {
    try {
        const res = await fetch("https://fakestoreapi.com/products");

        if (!res.ok) throw new Error("Products not found");

        const products = await res.json();
        productsStatus.style.display = "none";

        productsGrid.innerHTML = products.map((product) => `
            <article class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>

                <div class="product-content">
                    <span class="product-category">${product.category}</span>
                    <h2 class="product-title">${product.title}</h2>
                    <p class="product-description">${product.description}</p>

                    <div class="product-footer">
                        <span class="product-price">$${product.price}</span>
                        <span class="product-rating">
                            <i class="bx bxs-star"></i>
                            ${product.rating.rate} (${product.rating.count})
                        </span>
                    </div>
                </div>
            </article>
        `).join("");
    } catch (error) {
        productsStatus.textContent = "Could not load products";
        productsStatus.classList.add("error");
    }
}

getProducts();
