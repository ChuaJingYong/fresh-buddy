// Get modal elements
const modal = document.getElementById('itemModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const backBtn = document.querySelector('.back-btn');
const form = document.getElementById('addItemForm');
const quantityInput = document.getElementById('quantity');
const quantityUp = document.querySelector('.quantity-up');
const quantityDown = document.querySelector('.quantity-down');

// Open modal function
function openModal() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
}

// Close modal function
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Event listeners for opening and closing the modal
openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
backBtn.addEventListener('click', closeModal);

// Close modal when clicking outside the modal content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Quantity controls
quantityUp.addEventListener('click', () => {
    quantityInput.value = parseInt(quantityInput.value) + 1;
});

quantityDown.addEventListener('click', () => {
    if (parseInt(quantityInput.value) > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
    }
});

// Form submission
form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const quantity = document.getElementById('quantity').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const category = document.getElementById('category').value;
    const notes = document.getElementById('notes').value;
    
    // Here you would typically send this data to a server or store it locally
    console.log('Item added:', { name, quantity, expiryDate, category, notes });
    
    // Close the modal after submission
    closeModal();
    
    // Optional: Reset form
    form.reset();
});