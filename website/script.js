document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const pageIndicator = document.getElementById('pageIndicator');
    const dots = document.querySelectorAll('.dot');
    
    // Variables
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Initialize
    function initSlides() {
        slides[0].classList.add('active');
        updateIndicators();
    }
    
    // Update navigation indicators
    function updateIndicators() {
        pageIndicator.textContent = `Page ${currentSlide + 1} of ${totalSlides}`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // Update buttons
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === totalSlides - 1;
    }
    
    // Go to specific slide
    function goToSlide(index) {
        if (index < 0 || index >= totalSlides) return;
        
        // Remove classes from all slides
        slides.forEach(slide => {
            slide.classList.remove('active', 'prev');
        });
        
        // Set the active slide
        slides[index].classList.add('active');
        
        // Set the previous slide (for animation)
        if (index > 0) {
            slides[index - 1].classList.add('prev');
        }
        
        // Update current slide
        currentSlide = index;
        
        // Update indicators
        updateIndicators();
    }
    
    // Event Listeners
    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            goToSlide(currentSlide - 1);
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentSlide < totalSlides - 1) {
            goToSlide(currentSlide + 1);
        }
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            // Right arrow or Space
            if (currentSlide < totalSlides - 1) {
                goToSlide(currentSlide + 1);
            }
        } else if (e.key === 'ArrowLeft') {
            // Left arrow
            if (currentSlide > 0) {
                goToSlide(currentSlide - 1);
            }
        }
    });
    
    // Mouse wheel navigation
    let wheelThrottle = false;
    document.addEventListener('wheel', (e) => {
        if (wheelThrottle) return;
        
        wheelThrottle = true;
        setTimeout(() => {
            wheelThrottle = false;
        }, 1000); // Throttle time in ms
        
        if (e.deltaY > 0) {
            // Scroll down - go to next slide
            if (currentSlide < totalSlides - 1) {
                goToSlide(currentSlide + 1);
            }
        } else {
            // Scroll up - go to previous slide
            if (currentSlide > 0) {
                goToSlide(currentSlide - 1);
            }
        }
    }, { passive: true });
    
    // Touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance to be considered a swipe
        
        if (touchEndX + swipeThreshold < touchStartX) {
            // Swipe left - go to next slide
            if (currentSlide < totalSlides - 1) {
                goToSlide(currentSlide + 1);
            }
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - go to previous slide
            if (currentSlide > 0) {
                goToSlide(currentSlide - 1);
            }
        }
    }
    
    // Initialize slides
    initSlides();
});