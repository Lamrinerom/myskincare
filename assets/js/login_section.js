document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = loginForm.email.value;
            const password = loginForm.password.value;
            alert(`Login with Email: ${email} and Password: ${password}`);
            // Add your login logic here
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = registerForm.name.value;
            const email = registerForm.email.value;
            const password = registerForm.password.value;
            const confirmPassword = registerForm.confirmPassword.value;

            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            alert(`Register with Name: ${name}, Email: ${email}, Password: ${password}`);
            // Add your registration logic here
        });
    }

    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = forgotPasswordForm.email.value;
            alert(`Password reset link sent to: ${email}`);
            // Add your forgot password logic here
        });
    }
});
