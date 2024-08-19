document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const dobInput = document.getElementById('dob');

    fullNameInput.addEventListener('blur', validateFullName);
    emailInput.addEventListener('blur', validateEmail);
    passwordInput.addEventListener('blur', validatePassword);
    confirmPasswordInput.addEventListener('blur', validateConfirmPassword);
    dobInput.addEventListener('blur', validateDob);

    form.addEventListener('submit', handleSubmit);

    function validateFullName() {
        const fullName = fullNameInput.value.trim();
        const isValid = /^[A-Za-z\s]{3,}$/.test(fullName);
        return toggleValidation(fullNameInput, isValid, 'Please enter a valid name with at least 3 alphabetic characters.');
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        return toggleValidation(emailInput, isValid, 'Please enter a valid email address.');
    }

    function validatePassword() {
        const password = passwordInput.value.trim();
        const isValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
        return toggleValidation(passwordInput, isValid, 'Password must be at least 8 characters long and contain both letters and numbers.');
    }

    function validateConfirmPassword() {
        const isValid = confirmPasswordInput.value.trim() === passwordInput.value.trim();
        return toggleValidation(confirmPasswordInput, isValid, 'Passwords do not match.');
    }

    function validateDob() {
        const dob = new Date(dobInput.value);
        const age = new Date().getFullYear() - dob.getFullYear();
        const isValid = age >= 18;
        return toggleValidation(dobInput, isValid, 'You must be at least 18 years old.');
    }

    function toggleValidation(input, isValid, errorMessage) {
        const errorSpan = input.nextElementSibling;
        if (isValid) {
            input.classList.add('border-green-500');
            input.classList.remove('border-red-500');
            errorSpan.textContent = '';
            return true;
        } else {
            input.classList.add('border-red-500');
            input.classList.remove('border-green-500');
            errorSpan.textContent = errorMessage;
            return false;
        }
    }

    function handleSubmit(event) {
        event.preventDefault();

        const isFullNameValid = validateFullName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isDobValid = validateDob();

        if (isFullNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isDobValid) {
            alert('Registration successful!');
        } else {
            alert('Please correct the errors in the form.');
        }
    }
});
