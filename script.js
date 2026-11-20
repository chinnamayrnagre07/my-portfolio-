
/* ==================================
   1. TYPING ANIMATION
================================== */

const typingElement = document.getElementById("typing");

const words = [
    "Software Developer",
    "Java Developer",
    "Web Developer",
    "Full Stack Developer",
    "AI Based Developer",
    "AI Enthusiast",
    "AI/ML Solutions Developer",
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    const currentWord = words[wordIndex];

    if (deleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typingElement.textContent =
        currentWord.substring(0, charIndex);

    let speed = deleting ? 45 : 90;

    if (!deleting && charIndex === currentWord.length) {
        deleting = true;
        speed = 1400;
    }

    else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();


/* ==================================
   2. SCROLL REVEAL
================================== */

const revealElements =
    document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                observer.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.12
    }
);

revealElements.forEach((element) => {
    observer.observe(element);
});


/* ==================================
   3. MOBILE NAVIGATION
================================== */

const menuToggle =
    document.getElementById("menuToggle");

const navLinks =
    document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("open");

    const icon = menuToggle.querySelector("i");

    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-xmark");

});

document.querySelectorAll(".nav-links a").forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* ==================================
   4. CUSTOM CURSOR
================================== */

const cursor = document.querySelector(".cursor");
const cursorOutline =
    document.querySelector(".cursor-outline");

const desktopPointer =
    window.matchMedia("(hover: hover) and (pointer: fine)");

if (desktopPointer.matches) {

    let mouseX = 0;
    let mouseY = 0;

    let outlineX = 0;
    let outlineY = 0;

    document.addEventListener("mousemove", (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        cursor.style.left = mouseX + "px";
        cursor.style.top = mouseY + "px";

    });

    function animateCursor() {

        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;

        cursorOutline.style.left = outlineX + "px";
        cursorOutline.style.top = outlineY + "px";

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    document.querySelectorAll("a, button").forEach((element) => {

        element.addEventListener("mouseenter", () => {
            cursorOutline.style.width = "55px";
            cursorOutline.style.height = "55px";
        });

        element.addEventListener("mouseleave", () => {
            cursorOutline.style.width = "35px";
            cursorOutline.style.height = "35px";
        });

    });

}


/* ==================================
   5. CURRENT YEAR
================================== */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* ==================================
   6. PROJECT CARD TILT EFFECT
================================== */

const projectCards =
    document.querySelectorAll(".project-card");

if (desktopPointer.matches) {

    projectCards.forEach((card) => {

        card.addEventListener("mousemove", (event) => {

            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (centerY - y) / 20;
            const rotateY = (x - centerX) / 20;

            card.style.transform =
                `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "perspective(1000px) rotateX(0) rotateY(0)";

        });

    });

}
