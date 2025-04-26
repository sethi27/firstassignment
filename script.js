// Main JavaScript file for interactive elements
console.log("Main script loaded successfully!");

// DOM Elements
const themeToggle = document.querySelector('.theme-toggle');
const header = document.querySelector('header');
const scrollTopBtn = document.getElementById('scroll-top-btn');
const contactForm = document.getElementById('contact-form');
const resetBtn = document.getElementById('reset-btn');
const toggleBtn = document.getElementById('toggle-btn');

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.documentElement.setAttribute('data-theme', 
        document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light'
    );
    
    // Update icon
    const icon = themeToggle.querySelector('i');
    if (document.documentElement.getAttribute('data-theme') === 'light') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

// Scroll Effects
window.addEventListener('scroll', () => {
    // Header effect
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Scroll to top button
    if (window.scrollY > 500) {
        scrollTopBtn.parentElement.classList.add('visible');
    } else {
        scrollTopBtn.parentElement.classList.remove('visible');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll to top button
scrollTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form Validation
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Simple validation
        let isValid = true;
        let errorMessage = '';
        
        if (name === '') {
            isValid = false;
            errorMessage += 'Please enter your name.\n';
        }
        
        if (email === '') {
            isValid = false;
            errorMessage += 'Please enter your email.\n';
        } else if (!isValidEmail(email)) {
            isValid = false;
            errorMessage += 'Please enter a valid email address.\n';
        }
        
        if (message === '') {
            isValid = false;
            errorMessage += 'Please enter your message.\n';
        }
        
        if (isValid) {
            // In a real application, you would send the form data to a server
            alert('Thank you for your message! This is a demo form.');
            contactForm.reset();
        } else {
            alert(errorMessage);
        }
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Skill hover effect
document.querySelectorAll('.skill').forEach(skill => {
    skill.addEventListener('mouseenter', () => {
        const skillName = skill.getAttribute('data-skill');
        console.log(`Hovering over ${skillName} skill`);
    });
});

// Animation controls for P5.js
let isPaused = false;

if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        console.log('Resetting animation');
        // This will be handled in animation.js
        if (typeof resetAnimation === 'function') {
            resetAnimation();
        }
    });
}

if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        isPaused = !isPaused;
        console.log(`Animation ${isPaused ? 'paused' : 'resumed'}`);
        
        // Update button text
        const icon = toggleBtn.querySelector('i');
        if (isPaused) {
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
            toggleBtn.innerHTML = '<i class="fas fa-play"></i> Play';
        } else {
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
            toggleBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
        }
        
        // This will be handled in animation.js
        if (typeof toggleAnimation === 'function') {
            toggleAnimation(isPaused);
        }
    });
}

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');
    
    // Add animation classes to elements
    const animateElements = document.querySelectorAll('.project-card, .skill, .content-section');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s forwards`;
    });
});

// Log a welcome message
console.log('Welcome to the Creative Coding Portfolio!');

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Handle form submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Form submitted!');
    // Add your form handling logic here
}); 