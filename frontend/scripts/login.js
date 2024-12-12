// DOM elements
const signinForm = document.getElementById('signinForm');
const signupForm = document.getElementById('signupForm');
const signupContainer = document.getElementById('signupContainer');
const showSignup = document.getElementById('showSignup');
const showSignin = document.getElementById('showSignin');

// Toggle forms
showSignup.addEventListener('click', () => {
    signinForm.parentElement.style.display = 'none';
    signupContainer.style.display = 'block';
});

showSignin.addEventListener('click', () => {
    signupContainer.style.display = 'none';
    signinForm.parentElement.style.display = 'block';
});

// Sign-up logic
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value.trim();
    const confirmPassword = document.getElementById('signupConfirmPassword').value.trim();
    const firstName = document.getElementById('signupFirstName') ? document.getElementById('signupFirstName').value.trim() : '';
    const lastName = document.getElementById('signupLastName') ? document.getElementById('signupLastName').value.trim() : '';

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    try {
        const response = await fetch('http://localhost:3021/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, firstName, lastName }),
        });

        if (!response.ok) {
            // When not ok, attempt to read text for better error message
            const errorText = await response.text();
            console.error('Sign-up failed:', errorText);
            alert(errorText || 'Sign-up failed.');
            return;
        }

        const data = await response.json();
        alert('Sign-up successful! Please log in.');
        signupContainer.style.display = 'none';
        signinForm.parentElement.style.display = 'block';

    } catch (error) {
        console.error('Error during sign-up:', error);
        alert('An error occurred during sign-up. Please try again.');
    }
});

// Sign-in logic
signinForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('signinEmail').value.trim();
    const password = document.getElementById('signinPassword').value.trim();

    try {
        const response = await fetch('http://localhost:3021/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Login failed:', errorText);
            alert(errorText || 'Login failed.');
            return;
        }

        const data = await response.json();
        alert('Login successful!');
        sessionStorage.setItem('userToken', data.token); // Store JWT
        window.location.href = './homepage.html'; // Redirect to homepage

    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred during login. Please try again.');
    }
});
