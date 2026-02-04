const menuToggle = document.getElementById('mobile-menu-toggle');
const mainNav = document.getElementById('main-nav');

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('is-open');
        menuToggle.classList.toggle('is-active');
    });

    // Close menu when a link is clicked (for single-page navigation)
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('is-open');
            menuToggle.classList.remove('is-active');
        });
    });
}

// Back to Top Button Logic
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Service Modal Logic
const modal = document.getElementById('service-modal');
const closeModalSpan = document.querySelector('.close-modal');
const modalTitle = document.getElementById('modal-title');
const modalPrice = document.getElementById('modal-price');
const modalList = document.getElementById('modal-features-list');
const modalBookBtn = document.getElementById('modal-book-btn');
const serviceSelect = document.getElementById('service');

document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('h3').innerText;
        const price = card.querySelector('.price').innerText;
        const features = card.querySelector('ul').innerHTML;

        modalTitle.innerText = title;
        modalPrice.innerText = price;
        modalList.innerHTML = features;
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Disable scroll
    });
});

function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto'; // Enable scroll
}

if (closeModalSpan) {
    closeModalSpan.addEventListener('click', closeModal);
}

window.addEventListener('click', (e) => {
    if (e.target == modal) {
        closeModal();
    }
});

if (modalBookBtn) {
    modalBookBtn.addEventListener('click', () => {
        const serviceName = modalTitle.innerText;
        closeModal();
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        if (serviceSelect) {
            serviceSelect.value = serviceName;
        }
    });
}

// Prevent selecting past dates
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
}

// Handle Form Submission via AJAX
const bookingForm = document.getElementById('booking-form');
const formStatus = document.getElementById('form-status');

if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(bookingForm);
        const serviceName = formData.get('service');
        const submitBtn = bookingForm.querySelector('button[type="submit"]');
        
        submitBtn.disabled = true;
        submitBtn.innerText = 'Sending...';

        try {
            const response = await fetch(bookingForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                bookingForm.reset();
                window.location.href = 'thank-you.html';
            } else {
                formStatus.innerHTML = `<div style="background: #f8d7da; color: #721c24; padding: 1rem; border-radius: 5px; margin-bottom: 1.5rem; text-align: center; border: 1px solid #f5c6cb;">Oops! There was a problem submitting your form. Please try again or call us.</div>`;
                submitBtn.disabled = false;
                submitBtn.innerText = 'Send Request';
            }
        } catch (error) {
            formStatus.innerHTML = `<div style="background: #f8d7da; color: #721c24; padding: 1rem; border-radius: 5px; margin-bottom: 1.5rem; text-align: center; border: 1px solid #f5c6cb;">Oops! There was a problem submitting your form. Please try again or call us.</div>`;
            submitBtn.disabled = false;
            submitBtn.innerText = 'Send Request';
        }
    });
}

// Review Modal Logic
const reviewModal = document.getElementById('review-modal');
const leaveReviewBtn = document.getElementById('leave-review-btn');
const closeReviewSpan = document.querySelector('.close-review-modal');
const reviewForm = document.getElementById('review-form');
const reviewStatus = document.getElementById('review-status');

if (leaveReviewBtn) {
    leaveReviewBtn.addEventListener('click', () => {
        reviewModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
}

if (closeReviewSpan) {
    closeReviewSpan.addEventListener('click', () => {
        reviewModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    });
}

window.addEventListener('click', (e) => {
    if (e.target == reviewModal) {
        reviewModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

if (reviewForm) {
    reviewForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = reviewForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerText = 'Sending...';
        const formData = new FormData(reviewForm);

        try {
            const response = await fetch(reviewForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                reviewForm.reset();
                reviewStatus.innerHTML = '<div style="color: green; margin-top: 1rem;">Thanks for your review!</div>';
                setTimeout(() => { reviewModal.classList.remove('show'); document.body.style.overflow = 'auto'; reviewStatus.innerHTML = ''; submitBtn.disabled = false; submitBtn.innerText = 'Submit Review'; }, 2000);
            } else {
                throw new Error('Failed');
            }
        } catch (error) {
            reviewStatus.innerHTML = '<div style="color: red; margin-top: 1rem;">Error submitting review.</div>';
            submitBtn.disabled = false;
            submitBtn.innerText = 'Submit Review';
        }
    });
}