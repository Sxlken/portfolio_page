document.addEventListener('DOMContentLoaded', () => {
    // Create transition overlay
    const overlay = document.createElement('div');
    overlay.className = 'mode-transition-overlay';
    document.body.appendChild(overlay);
    
    // Theme toggle functionality
    const themeSwitch = document.getElementById('theme-switch');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or use default
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.className = `${savedTheme}-mode`;
    themeSwitch.checked = savedTheme === 'light';
    
    // Create appropriate background based on current theme
    if (savedTheme === 'dark') {
        createCosmosBackground();
    } else {
        createSunnyBackground();
    }
    
    // Handle theme switch with animation
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            // Switching to light mode
            overlay.className = 'mode-transition-overlay to-light active';
            
            setTimeout(() => {
                document.body.classList.add('theme-transition');
                htmlElement.className = 'light-mode';
                localStorage.setItem('theme', 'light');
                createSunnyBackground();
                
                // Fade out overlay and remove transition class
                setTimeout(() => {
                    overlay.className = 'mode-transition-overlay';
                    document.body.classList.remove('theme-transition');
                }, 800);
            }, 400);
            
        } else {
            // Switching to dark mode
            overlay.className = 'mode-transition-overlay to-dark active';
            
            setTimeout(() => {
                document.body.classList.add('theme-transition');
                htmlElement.className = 'dark-mode';
                localStorage.setItem('theme', 'dark');
                createCosmosBackground();
                
                // Fade out overlay and remove transition class
                setTimeout(() => {
                    overlay.className = 'mode-transition-overlay';
                    document.body.classList.remove('theme-transition');
                }, 800);
            }, 400);
        }
    });
    
    // Переключение языка
    const langButtons = document.querySelectorAll('.lang-btn');
    const portfolios = {
        'ru': document.querySelector('.portfolio-ru'),
        'en': document.querySelector('.portfolio-en')
    };
    
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            
            // Обновляем активную кнопку
            langButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Показываем соответствующую версию портфолио с анимацией
            Object.keys(portfolios).forEach(key => {
                if (key === lang) {
                    // Add fade in animation
                    portfolios[key].style.animation = 'none';
                    portfolios[key].offsetHeight; // Trigger reflow
                    portfolios[key].style.animation = 'fadeIn 0.8s ease forwards';
                    portfolios[key].classList.add('active');
                } else {
                    portfolios[key].classList.remove('active');
                }
            });
        });
    });
    
    // Добавляем анимацию "печати" для списка услуг
    const serviceItems = document.querySelectorAll('.services li');
    serviceItems.forEach((item, index) => {
        item.style.opacity = '0';
        setTimeout(() => {
            item.style.transition = 'opacity 0.5s ease';
            item.style.opacity = '1';
        }, 1500 + (index * 200));
    });
    
    // Эффект "интро" при загрузке страницы
    setTimeout(() => {
        // Карточка уже анимируется с помощью CSS
    }, 100);

    // Добавляем анимацию для карточек проектов при прокрутке
    const projectCards = document.querySelectorAll('.project-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered animation
                setTimeout(() => {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }, observerOptions);
    
    projectCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        observer.observe(card);
    });

    // Add hover effect to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseover', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
    });

    // Add subtle animation to profile section
    const profileSection = document.querySelector('.profile-section');
    profileSection.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xPercent = x / rect.width - 0.5;
        const yPercent = y / rect.height - 0.5;
        
        const intensity = 5; // Adjust for more or less movement
        this.style.transform = `perspective(1000px) rotateX(${yPercent * intensity}deg) rotateY(${-xPercent * intensity}deg) translateZ(10px)`;
    });
    
    profileSection.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
    
    // Create periodic shooting stars (only in dark mode)
    if (htmlElement.className === 'dark-mode') {
        setInterval(createShootingStar, 2000);
    }
});

// Create cosmos background with stars, nebulae, and cosmic dust
function createCosmosBackground() {
    const container = document.getElementById('ocean-background');
    
    // Clear existing elements
    container.innerHTML = '';
    
    // Add cosmic dust background
    const cosmicDust = document.createElement('div');
    cosmicDust.className = 'cosmic-dust';
    cosmicDust.style.animation = 'drift 60s linear infinite';
    container.appendChild(cosmicDust);
    
    // Add nebulae
    createNebulae(container);
    
    // Add stars
    createStars(container);
    
    // Add initial shooting stars
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            createShootingStar();
        }, i * 2000);
    }
}

// Create sunny background with sun and clouds
function createSunnyBackground() {
    const container = document.getElementById('ocean-background');
    
    // Clear existing elements
    container.innerHTML = '';
    
    // Add sun
    const sun = document.createElement('div');
    sun.className = 'sun';
    sun.style.left = '75%';
    sun.style.top = '15%';
    container.appendChild(sun);
    
    // Add sun rays
    for (let i = 0; i < 12; i++) {
        const ray = document.createElement('div');
        ray.className = 'sun-ray';
        ray.style.position = 'absolute';
        ray.style.width = '2px';
        ray.style.height = '40px';
        ray.style.background = 'rgba(255, 235, 59, 0.7)';
        ray.style.transformOrigin = 'bottom center';
        ray.style.left = '50%';
        ray.style.top = '0';
        ray.style.transform = `translateX(-50%) rotate(${i * 30}deg) translateY(-40px)`;
        ray.style.animation = `pulse-ray 3s infinite alternate ${i * 0.25}s`;
        sun.appendChild(ray);
    }
    
    // Add clouds
    const cloudCount = 6;
    for (let i = 0; i < cloudCount; i++) {
        createCloud(container, i, cloudCount);
    }
    
    // Add CSS for sun rays animation
    if (!document.getElementById('sun-ray-style')) {
        const style = document.createElement('style');
        style.id = 'sun-ray-style';
        style.textContent = `
            @keyframes pulse-ray {
                0%, 100% {
                    height: 40px;
                    opacity: 0.7;
                }
                50% {
                    height: 50px;
                    opacity: 0.9;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Create a cloud with multiple circles
function createCloud(container, index, totalClouds) {
    const cloud = document.createElement('div');
    cloud.className = 'cloud';
    
    // Position cloud at different heights
    const yPosition = 20 + (index * 60 / totalClouds); // Distribute clouds vertically
    cloud.style.top = `${yPosition}%`;
    
    // Set cloud size
    const size = Math.random() * 100 + 100;
    cloud.style.width = `${size}px`;
    cloud.style.height = `${size * 0.6}px`;
    
    // Set animation delay based on index
    const delay = index * (30 / totalClouds);
    cloud.style.animationDelay = `-${delay}s`;
    
    // Set animation duration (larger clouds move slower)
    const duration = 30 + (size / 10);
    cloud.style.animationDuration = `${duration}s`;
    
    // Create cloud puffs
    for (let i = 0; i < 5; i++) {
        const puff = document.createElement('div');
        puff.style.position = 'absolute';
        puff.style.backgroundColor = 'white';
        puff.style.borderRadius = '50%';
        
        // Random size for each puff
        const puffSize = size * (0.5 + Math.random() * 0.5);
        puff.style.width = `${puffSize}px`;
        puff.style.height = `${puffSize}px`;
        
        // Random position within the cloud
        const xPos = (i / 4) * 100;
        const yPos = Math.random() * 20;
        puff.style.left = `${xPos}%`;
        puff.style.top = `${yPos}%`;
        
        cloud.appendChild(puff);
    }
    
    container.appendChild(cloud);
}

// Create stars with different sizes and twinkle animations
function createStars(container) {
    // Small stars (many)
    for (let i = 0; i < 200; i++) {
        createStar(container, 'small');
    }
    
    // Medium stars
    for (let i = 0; i < 100; i++) {
        createStar(container, 'medium');
    }
    
    // Large stars (few)
    for (let i = 0; i < 50; i++) {
        createStar(container, 'large');
    }
}

// Create individual star with random position and animation
function createStar(container, size) {
    const star = document.createElement('div');
    star.className = `star ${size}`;
    
    // Random position
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    star.style.left = `${x}%`;
    star.style.top = `${y}%`;
    
    // Random twinkle animation
    star.style.animationDelay = `${Math.random() * 5}s`;
    star.style.animationDuration = `${Math.random() * 3 + 2}s`;
    
    container.appendChild(star);
}

// Create colorful nebulae
function createNebulae(container) {
    const colors = [
        'rgba(100, 255, 218, 0.2)',  // Cyan (your theme color)
        'rgba(111, 66, 193, 0.15)',  // Purple
        'rgba(255, 100, 100, 0.1)',  // Red
        'rgba(70, 130, 180, 0.15)'   // Steel blue
    ];
    
    for (let i = 0; i < 4; i++) {
        const nebula = document.createElement('div');
        nebula.className = 'nebula';
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        nebula.style.left = `${x}%`;
        nebula.style.top = `${y}%`;
        
        // Random size
        const size = Math.random() * 300 + 200;
        nebula.style.width = `${size}px`;
        nebula.style.height = `${size}px`;
        
        // Random color
        nebula.style.backgroundImage = `radial-gradient(circle, ${colors[i]} 0%, transparent 70%)`;
        
        // Random animation
        nebula.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(nebula);
    }
}

// Create shooting star
function createShootingStar() {
    const container = document.getElementById('ocean-background');
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';
    
    // Random position
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    shootingStar.style.left = `${startX}%`;
    shootingStar.style.top = `${startY}%`;
    
    // Random angle
    const angle = Math.random() * 60 + 30; // 30-90 degrees
    shootingStar.style.transform = `rotate(${angle}deg)`;
    
    // Random animation duration
    const duration = Math.random() * 2 + 1; // 1-3 seconds
    shootingStar.style.animationDuration = `${duration}s`;
    
    container.appendChild(shootingStar);
    
    // Remove shooting star after animation completes
    setTimeout(() => {
        shootingStar.remove();
    }, duration * 1000);
}

// Add parallax effect for stars
document.addEventListener('mousemove', function(e) {
    const stars = document.querySelectorAll('.star');
    const nebulae = document.querySelectorAll('.nebula');
    
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    // Parallax effect for stars (subtle)
    stars.forEach((star) => {
        if (star.classList.contains('small')) {
            const factor = 5;
            const moveX = (x - 0.5) * factor;
            const moveY = (y - 0.5) * factor;
            star.style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else if (star.classList.contains('medium')) {
            const factor = 10;
            const moveX = (x - 0.5) * factor;
            const moveY = (y - 0.5) * factor;
            star.style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else if (star.classList.contains('large')) {
            const factor = 15;
            const moveX = (x - 0.5) * factor;
            const moveY = (y - 0.5) * factor;
            star.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
    
    // Parallax effect for nebulae (more pronounced)
    nebulae.forEach((nebula, index) => {
        const factor = 20 + (index * 5);
        const moveX = (x - 0.5) * factor;
        const moveY = (y - 0.5) * factor;
        nebula.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
}); 