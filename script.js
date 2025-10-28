document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Scroll reveal animation
    const scrollReveal = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1000,
        delay: 200,
        reset: true
    });

    scrollReveal.reveal('[data-scroll]', {
        interval: 200
    });

    // Cursor glow effect
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-glow');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Add hover effects for interactive elements
    document.querySelectorAll('.glow-button, .glass-button, .skill-card, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-glow-active');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-glow-active');
        });
    });
});

// Initialize EmailJS
emailjs.init("q9DapHPnzLzBlPLEc"); // Replace after signing up

// Form submission handler
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            await emailjs.sendForm(
                'service_nokvkgr',    // From EmailJS dashboard
                'template_hwan697',   // From EmailJS dashboard
                contactForm
            );
            
            formStatus.textContent = 'Message sent successfully!';
            formStatus.className = 'mt-4 text-center text-green-500';
            contactForm.reset();
            
        } catch (error) {
            formStatus.textContent = 'Failed to send message. Please try again.';
            formStatus.className = 'mt-4 text-center text-red-500';
            console.error('EmailJS error:', error);
        }
        
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        formStatus.classList.remove('hidden');
        
        setTimeout(() => {
            formStatus.classList.add('hidden');
        }, 5000);
    });
}