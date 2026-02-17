// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-in-out'
});

// ===== Navigation =====
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

// Scroll effect for navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
}

// Close menu when clicking a link
navItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Active link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        } else {
            const inactiveLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            if (inactiveLink) {
                inactiveLink.classList.remove('active');
            }
        }
    });
});

// ===== Counter Animation =====
const counters = document.querySelectorAll('.counter');
let animated = false;

function animateCounters() {
    if (animated) return;
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
    
    animated = true;
}

// Trigger counter animation when in view
const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
}

// ===== Portfolio Data =====
const portfolioData = [
    {
        category: 'modeling',
        image: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        title: 'Fashion Editorial',
        description: 'Vogue Magazine Feature'
    },
    {
        category: 'events',
        image: 'https://images.unsplash.com/photo-1472653431158-6364773b2a56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        title: 'Corporate Event',
        description: 'Brand Ambassador'
    },
    {
        category: 'professional',
        image: 'https://images.unsplash.com/photo-1551836026-d5c2c5af78e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        title: 'Client Relations',
        description: 'Corporate Reception'
    },
    {
        category: 'modeling',
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        title: 'Product Launch',
        description: 'Luxury Brand Campaign'
    },
    {
        category: 'events',
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        title: 'Fashion Week',
        description: 'Runway Show'
    },
    {
        category: 'professional',
        image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        title: 'Business Meeting',
        description: 'Executive Reception'
    }
];

// ===== Testimonials Data =====
const testimonialsData = [
    {
        name: 'Sarah Johnson',
        position: 'Creative Director',
        image: 'https://images.unsplash.com/photo-1494790108777-466d3eb243bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        text: 'Irene brings elegance and professionalism to every project. She has an amazing ability to connect with people and make them feel valued.'
    },
    {
        name: 'Michael Omondi',
        position: 'CEO, Prestige Solutions',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        text: 'Working with Irene has been wonderful. Her customer service skills are exceptional and she represents our brand with grace.'
    },
    {
        name: 'Grace Wanjiku',
        position: 'Event Manager',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        text: 'Irene\'s attention to detail and professional demeanor made our corporate event a huge success. Highly recommended!'
    }
];

// Load Portfolio Items
const portfolioGrid = document.getElementById('portfolio-grid');
if (portfolioGrid) {
    portfolioGrid.innerHTML = portfolioData.map(item => `
        <div class="portfolio-item" data-category="${item.category}">
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="portfolio-overlay">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        </div>
    `).join('');
}

// Load Testimonials
const testimonialsGrid = document.getElementById('testimonials-grid');
if (testimonialsGrid) {
    testimonialsGrid.innerHTML = testimonialsData.map(testimonial => `
        <div class="testimonial-card">
            <div class="testimonial-content">
                <i class="fas fa-quote-left" aria-hidden="true"></i>
                <p>${testimonial.text}</p>
            </div>
            <div class="testimonial-author">
                <div class="author-image">
                    <img src="${testimonial.image}" alt="${testimonial.name}" loading="lazy">
                </div>
                <div class="author-info">
                    <h4>${testimonial.name}</h4>
                    <p>${testimonial.position}</p>
                </div>
            </div>
        </div>
    `).join('');
}

// ===== Portfolio Filter =====
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter items
            const filterValue = button.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validate form
        let isValid = true;
        const inputs = this.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#ff4444';
                isValid = false;
                
                input.addEventListener('input', () => {
                    input.style.borderColor = '';
                }, { once: true });
            }
        });
        
        if (isValid) {
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// ===== Skill Bars Animation =====
const skillBars = document.querySelectorAll('.level');
if (skillBars.length > 0) {
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.style.width;
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => skillObserver.observe(bar));
}

// ===== Parallax Effect =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const aboutImage = document.querySelector('.about-image');
    
    if (aboutImage) {
        aboutImage.style.transform = `translateY(${scrolled * 0.05}px)`;
    }
});

// ===== Current Year in Footer =====
const footerYear = document.querySelector('.footer-bottom p:first-child');
if (footerYear) {
    footerYear.innerHTML = `&copy; ${new Date().getFullYear()} Irene Chege. All rights reserved.`;
}