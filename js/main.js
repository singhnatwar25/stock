// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower
    
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            const inc = target / speed;

            // Check if target is reached
            if (count < target) {
                // Add inc to count and output in counter
                counter.innerText = Math.ceil(count + inc);
                // Call function every ms
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCount();
    });
}

// Run animation when section is visible
const section = document.querySelector(".stats-section");
let started = false;

function checkIfInView() {
    if (!started && isInViewport(section)) {
        animateCounters();
        started = true;
        window.removeEventListener('scroll', checkIfInView);
    }
}

function isInViewport(element) {
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add scroll event listener
if (section) {
    window.addEventListener('scroll', checkIfInView);
    // Initial check in case the section is already in view
    checkIfInView();
}

// Initialize tooltips
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

// Initialize popovers
const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
});

// Show/Hide back to top button on scroll
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('active');
    } else {
        backToTopButton.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80; // Height of fixed navbar
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
                bsCollapse.hide();
            }
        }
    });
});

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formValues = Object.fromEntries(formData.entries());
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', formValues);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        this.reset();
    });
}

// Newsletter subscription
const newsletterForm = document.querySelector('.newsletter-section form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (email) {
            // Here you would typically send the email to your server
            console.log('Newsletter subscription:', email);
            
            // Show success message
            alert('Thank you for subscribing to our newsletter!');
            
            // Reset form
            emailInput.value = '';
        }
    });
}

// Add animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll, .card, .feature-box');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animated');
            
            // Animate counters in stats section if exists
            if (element.classList.contains('counter')) {
                animateCounter(element);
            }
        }
    });
}

// Animate counter function
function animateCounter(counterElement) {
    if (counterElement.classList.contains('animated')) return;
    
    const target = +counterElement.getAttribute('data-count');
    const count = +counterElement.innerText;
    const increment = target / 50; // Adjust speed of counting
    
    if (count < target) {
        counterElement.innerText = Math.ceil(count + increment);
        setTimeout(() => animateCounter(counterElement), 30);
    } else {
        counterElement.innerText = target;
    }
}

// Initialize event listeners for tabs if they exist
function initTabEvents() {
    const tabTriggers = document.querySelectorAll('[data-bs-toggle="tab"]');
    
    tabTriggers.forEach(trigger => {
        trigger.addEventListener('shown.bs.tab', function (e) {
            // Update URL hash
            const target = e.target.getAttribute('href');
            if (history.pushState) {
                history.pushState(null, null, target);
            } else {
                window.location.hash = target;
            }
            
            // Trigger any animations for the newly shown tab content
            const tabContent = document.querySelector(target);
            if (tabContent) {
                const elementsToAnimate = tabContent.querySelectorAll('.animate-on-scroll');
                elementsToAnimate.forEach(el => {
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(20px)';
                    
                    // Trigger reflow
                    void el.offsetWidth;
                    
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                });
            }
        });
    });
}

// Handle form submissions
function handleFormSubmissions() {
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', formValues);
            
            // Show success message
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
            
            // Simulate API call
            setTimeout(() => {
                // Show success message
                const alertDiv = document.createElement('div');
                alertDiv.className = 'alert alert-success mt-3';
                alertDiv.role = 'alert';
                alertDiv.innerHTML = 'Thank you for your message! We will get back to you soon.';
                
                // Insert after the form
                this.parentNode.insertBefore(alertDiv, this.nextSibling);
                
                // Reset form
                this.reset();
                
                // Reset button
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
                
                // Scroll to the success message
                alertDiv.scrollIntoView({ behavior: 'smooth' });
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    alertDiv.remove();
                }, 5000);
            }, 1500);
        });
    }
    
    // Newsletter subscription form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            // Here you would typically send the email to your newsletter service
            console.log('Newsletter subscription:', email);
            
            // Show success message
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Subscribing...';
            
            // Simulate API call
            setTimeout(() => {
                // Show success message
                const alertDiv = document.createElement('div');
                alertDiv.className = 'alert alert-success mt-3';
                alertDiv.role = 'alert';
                alertDiv.innerHTML = 'Thank you for subscribing to our newsletter!';
                
                // Insert after the form
                this.parentNode.insertBefore(alertDiv, this.nextSibling);
                
                // Reset form
                this.reset();
                
                // Reset button
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    alertDiv.remove();
                }, 5000);
            }, 1000);
        });
    }
}

// Set initial styles for animation and initialize components
document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    initTabEvents();
    handleFormSubmissions();
    
    // Animate elements on page load
    const animateElements = document.querySelectorAll('.card, .feature-box, .animate-on-scroll');
    
    animateElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        
        // Trigger reflow
        void element.offsetWidth;
        
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    });

    // Initialize AOS (Animate On Scroll) if needed
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }
    
    // Add animation for counters in stats section
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        window.addEventListener('scroll', () => {
            counters.forEach(counter => {
                const counterPosition = counter.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (counterPosition < screenPosition && !counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    animateCounter(counter);
                }
            });
        });
    }
    
    // Add animation on scroll
    });
    
    // Initial check for elements in viewport
    setTimeout(animateOnScroll, 300);
    
    // Add scroll event listener for animations
    window.addEventListener('scroll', animateOnScroll);
    
    // Add active class to nav links on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

