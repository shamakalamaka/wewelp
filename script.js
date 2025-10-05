// DOM Elements
const progressChart = document.getElementById('progressChart');
const achievementChart = document.getElementById('achievementChart');

// Initialize charts when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    initializeAnimations();
    initializeInteractions();
    createParticleEffect();
});

// Chart initialization
function initializeCharts() {
    // Progress Chart
    if (progressChart) {
        const ctx = progressChart.getContext('2d');
        
        // Create gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, 150);
        gradient.addColorStop(0, 'rgba(255, 107, 157, 0.8)');
        gradient.addColorStop(0.5, 'rgba(78, 205, 196, 0.6)');
        gradient.addColorStop(1, 'rgba(139, 92, 246, 0.4)');
        
        // Draw chart
        ctx.fillStyle = gradient;
        ctx.strokeStyle = '#ff6b9d';
        ctx.lineWidth = 2;
        
        // Sample data points
        const points = [
            {x: 20, y: 120},
            {x: 60, y: 80},
            {x: 100, y: 100},
            {x: 140, y: 60},
            {x: 180, y: 90},
            {x: 220, y: 40},
            {x: 260, y: 70}
        ];
        
        // Draw line
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
        
        // Fill area under curve
        ctx.lineTo(points[points.length - 1].x, 150);
        ctx.lineTo(points[0].x, 150);
        ctx.closePath();
        ctx.fill();
        
        // Draw points
        points.forEach(point => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
            ctx.fillStyle = '#ff6b9d';
            ctx.fill();
        });
    }
    
    // Achievement Chart
    if (achievementChart) {
        const ctx = achievementChart.getContext('2d');
        
        // Create gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, 100);
        gradient.addColorStop(0, 'rgba(78, 205, 196, 0.8)');
        gradient.addColorStop(1, 'rgba(68, 160, 141, 0.4)');
        
        // Draw chart
        ctx.fillStyle = gradient;
        ctx.strokeStyle = '#4ecdc4';
        ctx.lineWidth = 2;
        
        // Sample data points
        const points = [
            {x: 10, y: 80},
            {x: 40, y: 60},
            {x: 70, y: 70},
            {x: 100, y: 40},
            {x: 130, y: 50},
            {x: 160, y: 30},
            {x: 190, y: 45}
        ];
        
        // Draw line
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
        
        // Fill area under curve
        ctx.lineTo(points[points.length - 1].x, 100);
        ctx.lineTo(points[0].x, 100);
        ctx.closePath();
        ctx.fill();
    }
}

// Animation initialization
function initializeAnimations() {
    // Animate stat circles
    const statCircles = document.querySelectorAll('.stat-circle');
    statCircles.forEach((circle, index) => {
        setTimeout(() => {
            circle.style.animation = 'pulse 2s ease-in-out infinite';
        }, index * 200);
    });
    
    // Animate progress bars
    const progressBars = document.querySelectorAll('.progress-fill, .achievement-fill');
    progressBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        }, index * 300);
    });
    
    // Animate achievement items
    const achievementItems = document.querySelectorAll('.achievement-item');
    achievementItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.transform = 'translateY(-3px)';
            setTimeout(() => {
                item.style.transform = 'translateY(0)';
            }, 200);
        }, index * 100);
    });
}

// Interactive elements
function initializeInteractions() {
    // Titan card interactions
    const titanCards = document.querySelectorAll('.titan-card');
    titanCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 15px 40px rgba(255, 107, 157, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(255, 107, 157, 0.3)';
        });
        
        card.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'translateY(-5px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px) scale(1.02)';
            }, 150);
        });
    });
    
    // Goal item interactions
    const goalItems = document.querySelectorAll('.goal-item input[type="checkbox"]');
    goalItems.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.nextElementSibling;
            if (this.checked) {
                label.style.textDecoration = 'line-through';
                label.style.opacity = '0.6';
                // Add completion animation
                this.parentElement.style.background = 'rgba(78, 205, 196, 0.2)';
                setTimeout(() => {
                    this.parentElement.style.background = 'rgba(255, 255, 255, 0.05)';
                }, 1000);
            } else {
                label.style.textDecoration = 'none';
                label.style.opacity = '1';
                this.parentElement.style.background = 'rgba(255, 255, 255, 0.05)';
            }
        });
    });
    
    // Navigation link interactions
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
            
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 107, 157, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.marginLeft = '-10px';
            ripple.style.marginTop = '-10px';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Header button interactions
    const headerButtons = document.querySelectorAll('.header-actions button');
    headerButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1.1)';
            }, 100);
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
    
    // Game item interactions
    const gameItems = document.querySelectorAll('.game-item');
    gameItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.boxShadow = '0 5px 20px rgba(255, 107, 157, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Achievement entry interactions
    const achievementEntries = document.querySelectorAll('.achievement-entry');
    achievementEntries.forEach(entry => {
        entry.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255, 255, 255, 0.15)';
            this.style.transform = 'translateX(5px)';
        });
        
        entry.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255, 255, 255, 0.05)';
            this.style.transform = 'translateX(0)';
        });
    });
}

// Particle effect
function createParticleEffect() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    document.body.appendChild(particleContainer);
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position and properties
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        // Random color
        const colors = ['#ff6b9d', '#4ecdc4', '#8b5cf6', '#fbbf24'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        particleContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 8000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 2000);
}

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        color: #ff6b9d !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Loading screen
window.addEventListener('load', function() {
    // Hide loading screen if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
    
    // Animate elements on load
    const animatedElements = document.querySelectorAll('.character-section, .goals-section, .achievements-section');
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Responsive navigation toggle
function toggleMobileNav() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('mobile-active');
}

// Add mobile nav styles
const mobileStyle = document.createElement('style');
mobileStyle.textContent = `
    @media (max-width: 992px) {
        .nav {
            position: fixed;
            top: 80px;
            left: -100%;
            width: 250px;
            height: calc(100vh - 80px);
            background: rgba(15, 15, 25, 0.95);
            backdrop-filter: blur(10px);
            flex-direction: column;
            padding: 20px;
            transition: left 0.3s ease;
            z-index: 1000;
        }
        
        .nav.mobile-active {
            left: 0;
        }
        
        .mobile-nav-toggle {
            display: block;
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
        }
    }
    
    @media (min-width: 993px) {
        .mobile-nav-toggle {
            display: none;
        }
    }
`;
document.head.appendChild(mobileStyle);

// Add mobile nav toggle button
const headerActions = document.querySelector('.header-actions');
const mobileToggle = document.createElement('button');
mobileToggle.className = 'mobile-nav-toggle';
mobileToggle.innerHTML = '☰';
mobileToggle.onclick = toggleMobileNav;
headerActions.insertBefore(mobileToggle, headerActions.firstChild);

// Performance optimization: Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.stat-item, .goal-item, .achievement-item, .game-item').forEach(el => {
    observer.observe(el);
});

// Add animation styles
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    .stat-item, .goal-item, .achievement-item, .game-item {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(animationStyle);
