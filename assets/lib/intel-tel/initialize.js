$(document).ready(function () {
    const input = document.querySelector("input[name=telephone]");
    const submitButton = document.querySelector("input[type=submit]"); // Target the submit button

    // Perform the rest of the code only if the input exists
    if (input) {
        // Create error and valid message elements dynamically
        const errorMsg = document.createElement("span");
        errorMsg.id = "error-msg";
        errorMsg.classList.add("hide");
        errorMsg.style.color = "#a94442";

        const validMsg = document.createElement("span");
        validMsg.id = "valid-msg";
        validMsg.classList.add("hide");
        validMsg.style.color = "green";

        // Append the messages right after the input field
        input.parentNode.insertBefore(errorMsg, input.nextSibling);
        input.parentNode.insertBefore(validMsg, errorMsg.nextSibling);

        // Check page direction to load appropriate translations
        const isRTL = document.documentElement.getAttribute('dir') === 'rtl';

        // Define error messages based on direction
        const errorMap = isRTL 
            ? ["رمز الدولة غير صحيح!", "رقم الجوال غير صحيح!"] // Arabic
            : ["Invalid country code!", "Invalid phone number!"]; // English

        // Initialize the intlTelInput plugin
        const iti = window.intlTelInput(input, {
            countryOrder: ["sa", "ps", "kw", "eg", "qa"],
            excludeCountries: ["il"],
            initialCountry: "sa",
            countrySearch: false,
            utilsScript: "../", // Fix the utilsScript path
        });

        // Function to reset error/success messages
        const reset = () => {
            input.classList.remove("error");
            errorMsg.innerHTML = "";
            validMsg.innerHTML = "";
            errorMsg.classList.add("hide");
            validMsg.classList.add("hide");
        };

        // Function to show an error message
        const showError = (msg) => {
            input.classList.add("error");
            errorMsg.innerHTML = msg;
            errorMsg.classList.remove("hide");
        };

        // Function to validate the phone number
        const validatePhoneNumber = () => {
            reset(); // Reset any existing messages

            if (!input.value.trim()) {
                showError(isRTL ? "يرجي إدخال رقم الجوال" : "Please enter the phone number"); // Translate the "Required" message
                return false; // Stop if required
            } else if (iti.isValidNumber()) {
                // Set the valid number inside the input field
                input.value = iti.getNumber(); // Display valid number in the input field
                validMsg.innerHTML = ""; // Clear the valid message
                validMsg.classList.add("hide"); // Hide the valid message
                return true; // Valid number
            } else {
                const errorCode = iti.getValidationError();
                const msg = errorMap[errorCode] || (isRTL ? "رقم الجوال غير صحيح!" : "Invalid Phone number!"); // Show appropriate error
                showError(msg);
                return false; // Invalid number
            }
        };

        // Handle submit button click event
        if (submitButton) {
            submitButton.addEventListener("click", function (event) {
                if (!validatePhoneNumber()) {
                    event.preventDefault(); // Prevent form submission if phone number is invalid
                } else {
                    // If the phone number is valid, append the country code
                    input.value = iti.getNumber(); // This will include the country code
                }
            });
        }

        // Optional: Trigger validation when the user leaves the input field (on focusout)
        input.addEventListener("focusout", validatePhoneNumber);

        // Optionally, you can also validate while typing (on keyup)
        input.addEventListener("keyup", reset);
    }
});
