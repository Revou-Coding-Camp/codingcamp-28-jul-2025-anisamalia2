document.addEventListener('DOMContentLoaded', function() {
    // Initialize active link on page load
    setActiveLink();
    
    // Add smooth scrolling to all links
    addSmoothScrolling();
    
    // Handle form submission
    setupContactForm();
    
    // Set up scroll event listener for navbar effect
    window.addEventListener('scroll', function() {
        setActiveLink();
        updateNavbar();
    });
    
    // Show/hide contact form
    const showFormBtn = document.getElementById('showFormBtn');
    const formContainer = document.getElementById('formContainer');
    
    if (showFormBtn && formContainer) {
        showFormBtn.addEventListener('click', function() {
            if (formContainer.style.display === 'none') {
                formContainer.style.display = 'block';
                formContainer.scrollIntoView({ behavior: 'smooth' });
            } else {
                formContainer.style.display = 'none';
            }
        });
    }

    // Buy Now buttons (or any other buttons) that should show the form
    const showFormBtns = document.querySelectorAll('.show-form-btn');

    showFormBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            if (formContainer.style.display === 'none') {
                formContainer.style.display = 'block';
            }
            formContainer.scrollIntoView({ behavior: 'smooth' });
        });
    });
});

function updateNavbar() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

function setActiveLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPosition = window.pageYOffset + 100;

    // Default to home if at top of page
    if (scrollPosition < 100) {
        navLinks.forEach(link => link.classList.remove('active'));
        document.querySelector('.nav-link[href="#home"]').classList.add('active');
        return;
    }
    
    // Check which section is in view
    let currentSection = null;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Active link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

function addSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formResult = document.getElementById('formResult');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                occasion: document.getElementById('occasion').value,
                deliveryDate: document.getElementById('delivery-date').value,
                payment: document.querySelector('input[name="payment"]:checked')?.value,
                message: document.getElementById('message').value,
                timestamp: new Date().toLocaleString()
            };
            
            // Basic validation
            if (!formData.name || !formData.phone) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Display submitted data
            formResult.innerHTML = `
                <h3>Thank you for your order inquiry!</h3>
                <p>We'll contact you shortly to confirm your order details.</p>
                <div class="submitted-data">
                    <p><strong>Order Summary:</strong></p>
                    <p><strong>Name:</strong> ${formData.name}</p>
                    <p><strong>Phone:</strong> ${formData.phone}</p>
                    ${formData.email ? `<p><strong>Email:</strong> ${formData.email}</p>` : ''}
                    <p><strong>Occasion:</strong> ${formData.occasion}</p>
                    ${formData.deliveryDate ? `<p><strong>Delivery Date:</strong> ${formData.deliveryDate}</p>` : ''}
                    <p><strong>Payment Method:</strong> ${formData.payment}</p>
                    ${formData.message ? `<p><strong>Special Instructions:</strong> ${formData.message}</p>` : ''}
                    <p><strong>Time Submitted:</strong> ${formData.timestamp}</p>
                </div>
            `;
            
            formResult.style.display = 'block';
            this.reset();
            formResult.scrollIntoView({ behavior: 'smooth' });
        });
    }
}