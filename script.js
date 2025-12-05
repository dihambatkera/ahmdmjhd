/**
 * Portfolio Website JavaScript
 * Handles interactive elements, animations, and form submissions
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * Initialize the application
 */
function initializeApp() {
    initializeStarfield();
    initializeMobileNavigation();
    initializeCatInteraction();
    initializeScrollAnimations();
    initializeTypewriterEffect();
    initializeSmoothScrolling();
    initializeContactForm();
    initializeServicesInteractions();
}

/**
 * Initialize animated starfield background
 */
function initializeStarfield() {
    const starfield = document.querySelector('.starfield');
    if (!starfield) return;

    // Create additional dynamic stars
    function createDynamicStars() {
        const numStars = 20;
        for (let i = 0; i < numStars; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            star.style.animationDuration = (Math.random() * 2 + 2) + 's';
            
            // Random star sizes
            const size = Math.random() * 2 + 1;
            star.style.width = size + 'px';
            star.style.height = size + 'px';
            
            starfield.appendChild(star);
        }
    }

    // Create shooting stars occasionally
    function createShootingStar() {
        const shootingStar = document.createElement('div');
        shootingStar.style.position = 'absolute';
        shootingStar.style.width = '2px';
        shootingStar.style.height = '2px';
        shootingStar.style.background = 'var(--color-gold-light)';
        shootingStar.style.borderRadius = '50%';
        shootingStar.style.boxShadow = '0 0 10px var(--color-gold)';
        shootingStar.style.left = Math.random() * 100 + '%';
        shootingStar.style.top = Math.random() * 50 + '%';
        shootingStar.style.animation = 'shootingStar 2s linear forwards';
        
        starfield.appendChild(shootingStar);
        
        setTimeout(() => {
            if (shootingStar.parentNode) {
                shootingStar.parentNode.removeChild(shootingStar);
            }
        }, 2000);
    }

    // Add shooting star animation to CSS dynamically
    if (!document.querySelector('#shooting-star-styles')) {
        const style = document.createElement('style');
        style.id = 'shooting-star-styles';
        style.textContent = `
            @keyframes shootingStar {
                0% { 
                    transform: translate(0, 0) scale(1);
                    opacity: 1;
                }
                100% { 
                    transform: translate(200px, 200px) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize
    createDynamicStars();
    
    // Create shooting stars every 3-8 seconds
    setInterval(createShootingStar, Math.random() * 5000 + 3000);
}

/**
 * Initialize mobile navigation
 */
function initializeMobileNavigation() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const navLinks = document.getElementById('navLinks');
    
    if (!mobileMenuToggle || !mobileMenuClose || !navLinks) {
        console.warn('Mobile navigation elements not found');
        return;
    }

    // Only initialize mobile menu functionality on mobile devices
    function isMobile() {
        return window.innerWidth <= 768;
    }

    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (!isMobile()) return;
        
        console.log('Opening mobile menu');
        navLinks.classList.add('mobile-open');
        setTimeout(() => {
            navLinks.classList.add('show');
        }, 10);
        document.body.style.overflow = 'hidden';
    });

    // Close mobile menu
    function closeMobileMenu() {
        console.log('Closing mobile menu');
        navLinks.classList.remove('show');
        setTimeout(() => {
            navLinks.classList.remove('mobile-open');
        }, 300);
        document.body.style.overflow = '';
    }

    mobileMenuClose.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        closeMobileMenu();
    });

    // Close menu when clicking on nav links
    navLinks.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' && isMobile()) {
            closeMobileMenu();
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (isMobile() && navLinks.classList.contains('show') && 
            !navLinks.contains(e.target) && 
            !mobileMenuToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('show') && isMobile()) {
            closeMobileMenu();
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (!isMobile() && navLinks.classList.contains('show')) {
            closeMobileMenu();
        }
    });
}

/**
 * Initialize cat interaction with funny dialogs
 */
function initializeCatInteraction() {
    const catImage = document.getElementById('catImage');
    const speechBubble = document.getElementById('speechBubble');
    
    console.log('Cat interaction initializing...');
    console.log('Cat image element:', catImage);
    console.log('Speech bubble element:', speechBubble);
    
    if (!catImage || !speechBubble) {
        console.warn('Cat elements not found');
        return;
    }

    const message = 'dont mind me.. im just an emotional support spinning cat.';
    let typingInterval = null;
    let isTyping = false;

    // Function to hide the message
    function hideMessage() {
        if (typingInterval) {
            clearInterval(typingInterval);
            typingInterval = null;
        }
        isTyping = false;
        speechBubble.classList.remove('show');
        speechBubble.textContent = '';
    }

    // Function to show the message with typing animation
    function showMessage() {
        console.log('Showing cat message');
        
        // If already typing, don't start again
        if (isTyping) return;
        
        try {
            isTyping = true;
            catImage.classList.add('playing');
            
            // Clear the bubble first
            speechBubble.textContent = '';
            speechBubble.classList.remove('show');
            
            // Small delay before starting to type
            setTimeout(() => {
                speechBubble.classList.add('show');
                
                // Type the message character by character
                let i = 0;
                typingInterval = setInterval(() => {
                    if (i < message.length) {
                        speechBubble.textContent += message.charAt(i);
                        i++;
                    } else {
                        clearInterval(typingInterval);
                        typingInterval = null;
                        isTyping = false;
                    }
                }, 50); // 50ms delay between characters for smooth typing
                
                setTimeout(() => {
                    catImage.classList.remove('playing');
                }, 800);
            }, 100);
        } catch (error) {
            console.error('Error in cat interaction:', error);
            isTyping = false;
        }
    }

    // Cat click handler
    catImage.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent triggering document click
        console.log('Cat clicked!');
        showMessage();
    });
    
    // Speech bubble click handler
    speechBubble.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent triggering document click
        console.log('Speech bubble clicked - closing');
        hideMessage();
    });

    // Close dialog when clicking anywhere on the page
    document.addEventListener('click', function(e) {
        // Only hide if the bubble is showing and click is not on cat or bubble
        if (speechBubble.classList.contains('show')) {
            hideMessage();
        }
    });

    // Add keyboard support for accessibility
    catImage.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            catImage.click();
        }
    });
}

/**
 * Initialize scroll animations using Intersection Observer
 */
function initializeScrollAnimations() {
    if (!('IntersectionObserver' in window)) {
        // Fallback for older browsers
        document.querySelectorAll('.card, .blog-card, .experience-item').forEach(el => {
            el.classList.add('visible');
        });
        return;
    }

    const observerOptions = { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.card, .blog-card, .experience-item').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Initialize typewriter effect - Ultra smooth 60fps animation
 */
function initializeTypewriterEffect() {
    const typewriter = document.querySelector('.typewriter');
    if (!typewriter) return;

    // Get the full text content
    const fullText = typewriter.textContent.trim();
    
    // Clear the content initially
    typewriter.textContent = '';
    typewriter.classList.add('typing');

    // Animation settings - smooth continuous flow
    const charDelay = 180; // Milliseconds between each character (slow and smooth)
    const initialDelay = 1000; // 1 second initial delay
    
    let currentIndex = 0;
    let startTime = null;
    let lastCharTime = 0;
    let rafId = null;

    function animate(timestamp) {
        // Initialize timing
        if (!startTime) {
            startTime = timestamp;
            lastCharTime = timestamp;
        }

        const elapsed = timestamp - startTime;
        
        // Wait for initial delay
        if (elapsed < initialDelay) {
            rafId = requestAnimationFrame(animate);
            return;
        }

        // Calculate time since typing started
        const typingTime = elapsed - initialDelay;
        
        // Calculate target index with smooth interpolation
        const targetIndex = Math.min(
            Math.floor(typingTime / charDelay),
            fullText.length
        );

        // Update only when needed (frame-perfect)
        if (targetIndex > currentIndex) {
            currentIndex = targetIndex;
            typewriter.textContent = fullText.substring(0, currentIndex);
        }

        // Continue animation
        if (currentIndex < fullText.length) {
            rafId = requestAnimationFrame(animate);
        } else {
            // Complete
            typewriter.textContent = fullText;
            typewriter.classList.remove('typing');
            typewriter.classList.add('complete');
            typewriter.style.borderRight = 'none';
        }
    }

    // Start animation after fonts load
    function startAnimation() {
        startTime = null;
        currentIndex = 0;
        lastCharTime = 0;
        rafId = requestAnimationFrame(animate);
    }

    // Wait for fonts
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
            setTimeout(startAnimation, 50);
        });
    } else {
        setTimeout(startAnimation, 200);
    }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                // Calculate scroll position (no header, so minimal offset)
                const offset = 20; // Small offset from top
                const targetPosition = target.offsetTop - offset;
                
                // Use smooth scrolling with fallback for older browsers
                if ('scrollBehavior' in document.documentElement.style) {
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                } else {
                    // Fallback for older browsers
                    const startPosition = window.pageYOffset;
                    const distance = targetPosition - startPosition;
                    const duration = 800;
                    let start = null;
                    
                    function animation(currentTime) {
                        if (start === null) start = currentTime;
                        const timeElapsed = currentTime - start;
                        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
                        window.scrollTo(0, run);
                        if (timeElapsed < duration) requestAnimationFrame(animation);
                    }
                    
                    function easeInOutQuad(t, b, c, d) {
                        t /= d / 2;
                        if (t < 1) return c / 2 * t * t + b;
                        t--;
                        return -c / 2 * (t * (t - 2) - 1) + b;
                    }
                    
                    requestAnimationFrame(animation);
                }
            }
        });
    });
}

/**
 * Initialize contact form handling
 */
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        try {
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            this.reset();
            
            // In a real application, you would send the data to a server here
            // sendFormData(formData);
            
        } catch (error) {
            console.error('Error submitting form:', error);
            showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
        }
    });
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if email is valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show notification message
 * @param {string} message - Message to display
 * @param {string} type - Type of notification ('success' or 'error')
 */
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
    `;
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.background = 'linear-gradient(90deg, #D4AF37, #F4C430)';
        notification.style.color = '#000000';
    } else {
        notification.style.background = 'linear-gradient(90deg, #e74c3c, #c0392b)';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

/**
 * Utility function to debounce function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Handle window resize events
 */
window.addEventListener('resize', debounce(function() {
    // Recalculate any size-dependent elements if needed
    console.log('Window resized');
}, 250));

/**
 * Initialize services interactions
 */
function initializeServicesInteractions() {
    // Service cards are now read-only with no interactions
    // All styling is handled by CSS hover states
    console.log('Services loaded - read-only mode');
}

/**
 * Handle scroll events for performance optimizations
 */
let ticking = false;
window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(function() {
            // Any scroll-based calculations can go here
            ticking = false;
        });
        ticking = true;
    }
});

// Export functions for potential external use
window.PortfolioApp = {
    showNotification,
    isValidEmail,
    debounce
};
