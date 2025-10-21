document.addEventListener('DOMContentLoaded', () => {
    const personalInfoForm = document.getElementById('personalInfoForm');
    const changePasswordForm = document.getElementById('changePasswordForm');

    personalInfoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const fullName = personalInfoForm.fullName.value;
        const email = personalInfoForm.email.value;
        const phone = personalInfoForm.phone.value;
        alert(`Updated Information:\nName: ${fullName}\nEmail: ${email}\nPhone: ${phone}`);
        // Add your update logic here
    });

    changePasswordForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const currentPassword = changePasswordForm.currentPassword.value;
        const newPassword = changePasswordForm.newPassword.value;
        const confirmNewPassword = changePasswordForm.confirmNewPassword.value;

        if (newPassword !== confirmNewPassword) {
            alert('New passwords do not match');
            return;
        }

        alert('Password changed successfully');
        // Add your password change logic here
    });
});
