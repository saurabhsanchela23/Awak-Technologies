// Listen for the form submission
document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the form from submitting to a server

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-msg');
    const rememberMe = document.getElementById('rememberMe').checked;
    const spinner = document.getElementById('spinner');
    const submitButton = document.getElementById('submitButton');

    // Reset error message and show spinner
    errorMsg.textContent = '';
    errorMsg.style.display = 'none';
    spinner.style.display = 'block';
    submitButton.disabled = true; // Disable button during API call

    // Client-side field validations
    if (username === '') {
        errorMsg.textContent = 'Please enter an email address.';
        showError(errorMsg);
        resetUI();
        return;
    } else if (!validateEmail(username)) {
        errorMsg.textContent = 'Please enter a valid email address.';
        showError(errorMsg);
        resetUI();
        return;
    }

    if (password === '' || password.length < 6) {
        errorMsg.textContent = 'Password must be at least 6 characters long.';
        showError(errorMsg);
        resetUI();
        return;
    }

    // Log only username and rememberMe, but not password
    console.log('Username:', username);
    //console.log('Password:', password); // Hidden to protect sensitive data
    console.log('Remember Me:', rememberMe);

    // API call (simulated using setTimeout)
    try {
        // Simulating API call duration
        setTimeout(async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, rememberMe }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Login successful!');
            } else {
                alert('Login failed. Please try again.');
            }

            resetUI(); // Reset UI elements
        },2000); // Simulating 2-second API delay
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred while logging in. Please try again later.');
        resetUI();
    }
});

// Toggle password visibility
document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordField = document.getElementById('password');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    this.textContent = type === 'password' ? 'Show' : 'Hide';
});

// Reset UI elements after API call
function resetUI() {
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('submitButton').disabled = false;
}

// Email validation function using regex
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}

// Function to display error message
function showError(element) {
    element.style.display = 'block';
    element.classList.add('error-shake');
    setTimeout(() => {
        element.classList.remove('error-shake');
    }, 500);
}
