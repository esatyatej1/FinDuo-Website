document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Interactive Showcase Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // Add active class to clicked
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');

            // Optional: trigger mini animation for charts/elements inside the active tab
            if(targetId === 'tab-analytics') {
                animateCharts();
            }
        });
    });

    // 3. Chart Animation logic (Analytics tab)
    function animateCharts() {
        const bars = document.querySelectorAll('.chart-mockup .bar');
        bars.forEach(bar => {
            // Temporarily set height to 0
            const originalClass = Array.from(bar.classList).find(c => c.startsWith('h-'));
            if(originalClass) {
                const heightVal = originalClass.split('-')[1] + '%';
                bar.style.height = '0%';
                setTimeout(() => {
                    bar.style.height = heightVal;
                }, 100);
            }
        });
    }

    // 4. Scroll Reveal Animations
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        fadeObserver.observe(el);
    });

    // Run chart animation once if analytics is active by default (it's not, overview is, but just in case)
    const activePane = document.querySelector('.tab-pane.active');
    if(activePane && activePane.id === 'tab-analytics') {
        animateCharts();
    }
});
