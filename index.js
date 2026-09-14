// ===============================
// NIMRA COLLECTION - MAIN JS
// ===============================

const myPhoneNumber = "923495534491";

let cart = [];

// ===============================
// WELCOME SCREEN
// ===============================

const enterStoreBtn = document.getElementById("enter-store-btn");
const welcomeScreen = document.getElementById("welcome-screen");

if (welcomeScreen) {
    document.body.classList.add("welcome-active");
}

if (enterStoreBtn && welcomeScreen) {
    enterStoreBtn.addEventListener("click", () => {
        welcomeScreen.classList.add("hide");
        document.body.classList.remove("welcome-active");

        setTimeout(() => {
            welcomeScreen.style.display = "none";
        }, 800);
    });
}


// ===============================
// CART SYSTEM
// ===============================

const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

addToCartButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const name = button.getAttribute("data-name") || "Product";
        const price = parseInt(button.getAttribute("data-price")) || 0;

        cart.push({
            name: name,
            price: price
        });

        updateCartUI();

        // Button animation
        button.classList.add("added");

        const originalText = button.innerText;
        button.innerText = "✓ Added";

        setTimeout(() => {
            button.classList.remove("added");
            button.innerText = originalText;
        }, 1200);

    });

});


// ===============================
// UPDATE CART COUNT
// ===============================

function updateCartUI() {

    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.innerText = cart.length;
    }

}


// ===============================
// CART MODAL
// ===============================

const cartBtn = document.getElementById("cart-btn");
const modal = document.getElementById("checkout-modal");
const closeModal = document.getElementById("close-modal");

if (cartBtn && modal) {

    cartBtn.addEventListener("click", () => {

        if (cart.length === 0) {
            alert("Aapka cart khali hai!");
            return;
        }

        renderCart();

        modal.style.display = "flex";

        setTimeout(() => {
            modal.classList.add("active");
        }, 10);

    });

}


// ===============================
// SHOW CART ITEMS
// ===============================

function renderCart() {

    const cartList = document.getElementById("cart-items-list");
    const cartTotal = document.getElementById("cart-total");

    if (!cartList || !cartTotal) return;

    cartList.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price;

        const itemBox = document.createElement("div");

        itemBox.style.cssText = `
            display:flex;
            justify-content:space-between;
            align-items:center;
            gap:15px;
            padding:12px 0;
            border-bottom:1px solid rgba(255,255,255,.12);
        `;

        const itemName = document.createElement("span");
        itemName.innerText = item.name;

        const itemPrice = document.createElement("span");
        itemPrice.innerText = `PKR ${item.price}`;

        itemPrice.style.fontWeight = "700";

        itemBox.appendChild(itemName);
        itemBox.appendChild(itemPrice);

        cartList.appendChild(itemBox);

    });

    cartTotal.innerText = total;

}


// ===============================
// CLOSE MODAL
// ===============================

function closeCheckoutModal() {

    if (!modal) return;

    modal.classList.remove("active");

    setTimeout(() => {
        modal.style.display = "none";
    }, 300);

}


if (closeModal && modal) {

    closeModal.addEventListener("click", () => {
        closeCheckoutModal();
    });

}


// ===============================
// CLICK OUTSIDE MODAL
// ===============================

if (modal) {

    modal.addEventListener("click", (e) => {

        if (e.target === modal) {
            closeCheckoutModal();
        }

    });

}


// ===============================
// ESC KEY
// ===============================

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape" && modal) {
        closeCheckoutModal();
    }

});


// ===============================
// WHATSAPP ORDER
// ===============================

const orderForm = document.getElementById("order-form");

if (orderForm) {

    orderForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const nameInput = document.getElementById("name");
        const phoneInput = document.getElementById("phone");
        const addressInput = document.getElementById("address");

        const name = nameInput ? nameInput.value.trim() : "";
        const phone = phoneInput ? phoneInput.value.trim() : "";
        const address = addressInput ? addressInput.value.trim() : "";

        if (!name || !phone || !address) {
            alert("Please tamam details fill karein.");
            return;
        }

        let total = 0;

        let itemsText = cart.map((item) => {

            total += item.price;

            return `• ${item.name} - PKR ${item.price}`;

        }).join("\n");

        const message =
`*NAYA ORDER - NIMRA COLLECTION*

*Customer Name:* ${name}

*Phone:* ${phone}

*Address:* ${address}

*ORDER ITEMS:*
${itemsText}

*TOTAL BILL:* PKR ${total}

Thank you for shopping with Nimra Collection.`;

        const whatsappURL =
            `https://wa.me/${myPhoneNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappURL, "_blank");

    });

}


// ===============================
// SCROLL REVEAL ANIMATION
// ===============================

const revealElements = document.querySelectorAll(
    ".category-link, .story-section, .brand-strip, .hero-content"
);

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("reveal-visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal-hidden");
        observer.observe(element);
    });

}


// ===============================
// HEADER SCROLL EFFECT
// ===============================

const header = document.querySelector(".sticky-header");

window.addEventListener(
    "scroll",
    () => {

        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    },
    { passive: true }
);


// ===============================
// DESKTOP HERO PARALLAX
// ===============================

const heroImage = document.querySelector(".hero-background-image");

if (heroImage && window.matchMedia("(pointer:fine)").matches) {

    document.addEventListener("mousemove", (e) => {

        const x = (e.clientX / window.innerWidth - 0.5) * 10;
        const y = (e.clientY / window.innerHeight - 0.5) * 10;

        heroImage.style.transform =
            `translate(${x}px, ${y}px) scale(1.03)`;

    });

}


// ===============================
// CATEGORY MOUSE GLOW
// ===============================

const categoryCards = document.querySelectorAll(".category-link");

if (window.matchMedia("(pointer:fine)").matches) {

    categoryCards.forEach((card) => {

        card.addEventListener("mousemove", (e) => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);

        });

    });

}


// ===============================
// SMOOTH ANCHOR SCROLL
// ===============================

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (e) => {

        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (target) {

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


// ===============================
// INITIAL CART
// ===============================

updateCartUI();

console.log("Nimra Collection website loaded successfully ✨");