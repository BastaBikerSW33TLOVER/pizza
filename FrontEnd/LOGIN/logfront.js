// login.js
const form = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
        errorMessage.textContent = 'Both fields are required.';
        return;
    }

    const loginData = { email, password };

    try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData),
        });

        const result = await response.json();
        
        if (response.ok) {
            // Redirect to another page if login is successful
            window.location.href = '/product.html';  // Redirect to a success page
        } else {
            errorMessage.textContent = result.message || 'Login failed';
        }
    } catch (error) {
        console.error('Error during login:', error);
        errorMessage.textContent = 'An error occurred. Please try again.';
    }
});
