document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const dobInput = document.getElementById('dob');
    const submitBtn = document.getElementById('submitBtn');

    const namePattern = /^[A-Za-z\s]{3,}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    function validateInput(input, pattern, errorMessageId, successMessage) {
        if (pattern.test(input.value)) {
            input.classList.add('border-green-500');
            input.classList.remove('border-red-500');
            document.getElementById(errorMessageId).textContent = successMessage || '';
        } else {
            input.classList.add('border-red-500');
            input.classList.remove('border-green-500');
            document.getElementById(errorMessageId).textContent = `Invalid ${input.name}`;
        }
    }

    function validatePasswordMatch() {
        if (passwordInput.value === confirmPasswordInput.value) {
            confirmPasswordInput.classList.add('border-green-500');
            confirmPasswordInput.classList.remove('border-red-500');
            document.getElementById('confirmPasswordError').textContent = '';
        } else {
            confirmPasswordInput.classList.add('border-red-500');
            confirmPasswordInput.classList.remove('border-green-500');
            document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
        }
    }

    function calculateAge(dob) {
        const birthDate = new Date(dob.value);
        const ageDifMs = Date.now() - birthDate.getTime();
        const ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    function validateAge() {
        const age = calculateAge(dobInput);
        if (age >= 18) {
            dobInput.classList.add('border-green-500');
            dobInput.classList.remove('border-red-500');
            document.getElementById('dobError').textContent = '';
        } else {
            dobInput.classList.add('border-red-500');
            dobInput.classList.remove('border-green-500');
            document.getElementById('dobError').textContent = 'You must be at least 18 years old';
        }
    }

    fullNameInput.addEventListener('input', function () {
        validateInput(fullNameInput, namePattern, 'fullNameError', '✓');
    });

    emailInput.addEventListener('input', function () {
        validateInput(emailInput, emailPattern, 'emailError', '✓');
    });

    passwordInput.addEventListener('input', function () {
        validateInput(passwordInput, passwordPattern, 'passwordError', '✓');
    });

    confirmPasswordInput.addEventListener('input', validatePasswordMatch);

    dobInput.addEventListener('input', validateAge);

    form.addEventListener('submit', function (event) {
        validateInput(fullNameInput, namePattern, 'fullNameError');
        validateInput(emailInput, emailPattern, 'emailError');
        validateInput(passwordInput, passwordPattern, 'passwordError');
        validatePasswordMatch();
        validateAge();

        if (
            !fullNameInput.classList.contains('border-green-500') ||
            !emailInput.classList.contains('border-green-500') ||
            !passwordInput.classList.contains('border-green-500') ||
            !confirmPasswordInput.classList.contains('border-green-500') ||
            !dobInput.classList.contains('border-green-500')
        ) {
            event.preventDefault();
        }
    });
});
