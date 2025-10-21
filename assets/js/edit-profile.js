document.addEventListener('DOMContentLoaded', () => {
    const editProfileForm = document.getElementById('editProfileForm');

    editProfileForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const fullName = editProfileForm.fullName.value;
        const email = editProfileForm.email.value;
        const phone = editProfileForm.phone.value;
        const address = editProfileForm.address.value;
        const company = editProfileForm.company.value;

        alert(`Profile Updated:\nName: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address}\nCompany: ${company}`);
        // Add your form submission logic here, e.g., sending data to a server
    });
});
