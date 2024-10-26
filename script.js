// Fonctionnalité du menu hamburger pour mobile
document.addEventListener('DOMContentLoaded', function () {
    const nav = document.querySelector('nav ul');
    const toggleMenu = document.createElement('div');
    toggleMenu.className = 'menu-toggle';
    toggleMenu.innerHTML = `<i class="fas fa-bars"></i>`;
    document.querySelector('header .container').appendChild(toggleMenu);

    // Toggle navigation menu on click for mobile
    toggleMenu.addEventListener('click', () => {
        nav.classList.toggle('open');
        toggleMenu.classList.toggle('open');
    });

    // Scroll smoothly to sections of the site
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1); // Get the ID without '#'
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
            
            // Close menu after navigating (useful for mobile view)
            nav.classList.remove('open');
            toggleMenu.classList.remove('open');
        });
    });

    // Animation de pop-up pour les témoignages
    const testimonials = document.querySelectorAll('.testimonial');
    testimonials.forEach(testimonial => {
        testimonial.addEventListener('click', () => {
            testimonial.classList.toggle('active');
        });
    });

    // Validation du formulaire de contact et notification d'envoi (EmailJS)
    document.getElementById('contactForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const form = this;

        // Create an object with the form data
        const formData = {
            user_name: form.user_name.value,
            user_email: form.user_email.value,
            message: form.message.value,
        };

        emailjs.send("service_j3i336t", "template_x6vxllb", formData)
            .then(() => {
                showNotification(); // Display success message
                form.reset(); // Reset form fields
            })
            .catch((error) => {
                alert("Échec de l'envoi du message. Veuillez réessayer.");
                console.error('EmailJS error:', error);
            });
    });

    // Notification de succès lors de l'envoi du formulaire
    const successNotification = document.createElement('div');
    successNotification.className = 'success-notification';
    successNotification.textContent = "Merci ! Votre message a été envoyé.";
    document.body.appendChild(successNotification);

    // Function to show notification temporarily
    function showNotification() {
        successNotification.classList.add('visible');
        setTimeout(() => successNotification.classList.remove('visible'), 3000);
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const images = [
        'dj-service.jpg',
        'electronics-sale.jpg',
        'equipment-rental.jpg',
        // Add more image paths as needed
    ];
    
    let currentIndex = 0;
    const heroSection = document.querySelector('.hero');
    const imageElements = document.querySelectorAll('.hero .image');

    function changeBackgroundImage() {
        const currentImage = imageElements[currentIndex];
        currentIndex = (currentIndex + 1) % images.length; // Loop back to the first image
        const nextImage = imageElements[currentIndex];

        // Set next image to active and current to inactive
        currentImage.classList.remove('active');
        currentImage.classList.add('inactive');
        nextImage.classList.remove('inactive');
        nextImage.classList.add('active');

        // Set the next image's background
        nextImage.style.backgroundImage = `url(${images[currentIndex]})`;
    }

    setInterval(changeBackgroundImage, 3000); // Change image every 3 seconds
});