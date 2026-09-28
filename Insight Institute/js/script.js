let navbar = document.getElementById("nav-bar");
let show_links = document.getElementById("show");
let show = () => {
    navbar.style.right = "0";
    show_links.style.visibility = "hidden";
}
let hide = () =>{
    navbar.style.right = "-250px";
    show_links.style.visibility = "visible";
}

const counters = document.querySelectorAll(".counter");

const startCounter = (counter) => {
    const target = +counter.dataset.target;
    let current = 0;

    const increment = target / 100;

    const updateCounter = () => {
        current += increment;

        if (current < target) {
            counter.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    };

    updateCounter();
};


// Start counting when the statistics section enters the screen
const statsSection = document.querySelector(".about_stats");

const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {

        counters.forEach(counter => {
            startCounter(counter);
        });

        observer.unobserve(statsSection);
    }
}, {
    threshold: 0.3
});

observer.observe(statsSection);


const testimonialTrack = document.querySelector(".testimonial_track");
const testimonialCards = document.querySelectorAll(".testimonial_card");
const testimonialDots = document.querySelectorAll(".testimonial_dots span");

let currentTestimonial = 0;
const totalTestimonials = testimonialCards.length;

// Clone the first card
const firstCardClone = testimonialCards[0].cloneNode(true);
testimonialTrack.appendChild(firstCardClone);

function showTestimonial(index, animate = true) {

    testimonialTrack.style.transition =
        animate ? "transform 0.7s ease-in-out" : "none";

    testimonialTrack.style.transform =
        `translateX(-${index * 100}%)`;

    // Update dots
    const dotIndex = index % totalTestimonials;

    testimonialDots.forEach((dot, i) => {
        dot.classList.toggle("active", i === dotIndex);
    });
}

function nextTestimonial() {

    currentTestimonial++;

    showTestimonial(currentTestimonial);

    // When we reach the cloned first card
    if (currentTestimonial === totalTestimonials) {

        setTimeout(() => {

            currentTestimonial = 0;

            showTestimonial(currentTestimonial, false);

        }, 700);
    }
}

// Allow users to click the dots
testimonialDots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        currentTestimonial = index;

        showTestimonial(currentTestimonial);

    });

});

setInterval(nextTestimonial, 5000);