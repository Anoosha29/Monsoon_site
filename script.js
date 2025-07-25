
document.addEventListener('DOMContentLoaded', function () {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });

    // Scroll indicator click
    document.querySelector('.scroll-indicator').addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
            top: document.querySelector('#about').offsetTop - 70,
            behavior: 'smooth'
        });
    });

    // Animate elements when they come into view
    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.feature-item, .gallery-item, .weather-card, .tip-card');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animated elements
    document.querySelectorAll('.feature-item, .gallery-item, .weather-card, .tip-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    // Run once on load
    animateOnScroll();

    // Then run on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Simulate weather data changes
    const weatherIcon = document.querySelector('.weather-icon i');
    const temperature = document.querySelector('.temperature');
    const weatherDetails = document.querySelectorAll('.weather-info .details p');
    const weatherFooter = document.querySelector('.weather-footer p');

    // Weather states
    const weatherStates = [
        {
            icon: 'cloud-rain',
            temp: '22°C',
            humidity: '90%',
            rainfall: '15mm',
            wind: '12 km/h',
            forecast: 'Heavy showers expected throughout the day with possible thunderstorms in the evening'
        },
        {
            icon: 'bolt',
            temp: '21°C',
            humidity: '88%',
            rainfall: '25mm',
            wind: '18 km/h',
            forecast: 'Thunderstorms likely with intense rainfall, stay indoors if possible'
        },
        {
            icon: 'cloud-sun',
            temp: '25°C',
            humidity: '80%',
            rainfall: '5mm',
            wind: '10 km/h',
            forecast: 'Light showers with occasional sunny breaks, perfect for outdoor activities'
        },
        {
            icon: 'cloud',
            temp: '23°C',
            humidity: '85%',
            rainfall: '8mm',
            wind: '14 km/h',
            forecast: 'Overcast with moderate rainfall expected, carry an umbrella when going out'
        }
    ];

    // Change weather every 10 seconds for demo purposes
    function updateWeather() {
        const randomWeather = weatherStates[Math.floor(Math.random() * weatherStates.length)];

        weatherIcon.classList.remove('fa-cloud-rain', 'fa-bolt', 'fa-cloud-sun', 'fa-cloud');
        weatherIcon.classList.add(`fa-${randomWeather.icon}`);

        temperature.textContent = randomWeather.temp;
        weatherDetails[0].innerHTML = `<i class="fas fa-tint"></i> Humidity: ${randomWeather.humidity}`;
        weatherDetails[1].innerHTML = `<i class="fas fa-cloud-showers-heavy"></i> Rainfall: ${randomWeather.rainfall}`;
        weatherDetails[2].innerHTML = `<i class="fas fa-wind"></i> Wind: ${randomWeather.wind}`;
        weatherFooter.textContent = `Forecast: ${randomWeather.forecast}`;
    }

    // Initial update
    updateWeather();

    // Periodic updates
    setInterval(updateWeather, 10000);
});