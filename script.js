// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Add current year to footer
    const footerYear = document.querySelector('.current-year');
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }
    
    // Highlight current page in navigation
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage || 
            (currentPage === '/' && link.getAttribute('href') === '/')) {
            link.style.textDecoration = 'underline';
            link.style.color = '#0066cc';
        }
    });
    
    // Add simple animation for page load
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.style.opacity = '0';
        mainContent.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            mainContent.style.opacity = '1';
        }, 100);
    }
});