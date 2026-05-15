document.addEventListener('DOMContentLoaded', () => {
    // Loader
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.visibility = 'hidden';
        }, 800);
    }, 1500);

    // Navbar Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Reveal Animations
    const revealElements = document.querySelectorAll('[data-reveal]');
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight * 0.85) {
                el.classList.add('revealed');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Stats Counter
    const stats = document.querySelectorAll('.counter');
    let started = false;

    const startCounter = () => {
        stats.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const count = +stat.innerText;
            const speed = 200;
            const inc = target / speed;

            if (count < target) {
                stat.innerText = Math.ceil(count + inc);
                setTimeout(startCounter, 1);
            } else {
                stat.innerText = target + (stat.getAttribute('data-suffix') || '');
            }
        });
    };

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        window.addEventListener('scroll', () => {
            const sectionTop = statsSection.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight && !started) {
                startCounter();
                started = true;
            }
        });
    }

    // BMI Calculator
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const bmiScore = document.getElementById('bmi-score');
    const bmiStatus = document.getElementById('bmi-status');

    const calculateBMI = () => {
        const weight = weightInput.value;
        const height = heightInput.value / 100; // convert to meters

        if (weight > 0 && height > 0) {
            const bmi = (weight / (height * height)).toFixed(1);
            bmiScore.innerText = bmi;

            if (bmi < 18.5) {
                bmiStatus.innerText = 'Underweight';
                bmiStatus.style.color = '#ffcc00';
            } else if (bmi >= 18.5 && bmi <= 24.9) {
                bmiStatus.innerText = 'Healthy Weight';
                bmiStatus.style.color = '#00ff88';
            } else if (bmi >= 25 && bmi <= 29.9) {
                bmiStatus.innerText = 'Overweight';
                bmiStatus.style.color = '#ff8800';
            } else {
                bmiStatus.innerText = 'Obese';
                bmiStatus.style.color = '#ff3d3d';
            }
        }
    };

    if (weightInput && heightInput) {
        weightInput.addEventListener('input', calculateBMI);
        heightInput.addEventListener('input', calculateBMI);
    }

    // Mobile Menu (Simple implementation)
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    // Typing Effect
    const typingSpan = document.getElementById('typing');
    if (typingSpan) {
        const words = ['Limits', 'Potential', 'Goals', 'Fear', 'Average'];
        let wordIdx = 0;
        let charIdx = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIdx];
            if (isDeleting) {
                typingSpan.textContent = currentWord.substring(0, charIdx - 1);
                charIdx--;
            } else {
                typingSpan.textContent = currentWord.substring(0, charIdx + 1);
                charIdx++;
            }

            let typeSpeed = isDeleting ? 50 : 150;

            if (!isDeleting && charIdx === currentWord.length) {
                isDeleting = true;
                typeSpeed = 1500; // Pause at end
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                wordIdx = (wordIdx + 1) % words.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }
        type();
    }
});
