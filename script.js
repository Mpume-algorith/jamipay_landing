
var EMAILJS_PUBLIC_KEY = "BaOFhzuZ_owFBtqyh";
var EMAILJS_SERVICE_ID = "service_bl88ldc";
var EMAILJS_TEMPLATE_ID = "template_6xtj7es";

var CONTACT_EMAIL = "pilot@jamipay.co.za";
if (CONTACT_EMAIL.indexOf("REPLACE") === -1) {
    var t = document.getElementById("contact-text");
    t.href = "mailto:" + CONTACT_EMAIL;
    t.textContent = CONTACT_EMAIL;
}

if (window.emailjs && EMAILJS_PUBLIC_KEY.indexOf("REPLACE") === -1) {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

var waitlistForm = document.getElementById("waitlist-form");
var statusEl = document.getElementById("wl-status");
var submitBtn = document.getElementById("wl-submit");
var emailField = document.getElementById("wl-email");
var bankField = document.getElementById("wl-bank");

// Marks a field as (in)valid so its border can be styled and screen readers are informed.
function setFieldValidity(field, isValid) {
    field.setAttribute("aria-invalid", isValid ? "false" : "true");
    field.classList.toggle("invalid", !isValid);
}

// Clear the invalid styling as soon as the user fixes the field.
emailField.addEventListener("input", function () {
    if (emailField.checkValidity()) setFieldValidity(emailField, true);
});
bankField.addEventListener("change", function () {
    if (bankField.checkValidity()) setFieldValidity(bankField, true);
});

waitlistForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (EMAILJS_PUBLIC_KEY.indexOf("REPLACE") !== -1) {
        statusEl.textContent = "Waitlist form isn't connected yet. Replace the EmailJS placeholders in index.html.";
        statusEl.className = "form-status error";
        return;
    }

    // Required fields: email must be present and well-formed, bank must be selected.
    var emailValid = emailField.checkValidity();
    var bankValid = bankField.checkValidity();
    setFieldValidity(emailField, emailValid);
    setFieldValidity(bankField, bankValid);

    if (!emailValid || !bankValid) {
        waitlistForm.reportValidity();
        statusEl.textContent = "Please enter a valid email address and select your bank before submitting.";
        statusEl.className = "form-status error";
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    statusEl.textContent = "";
    statusEl.className = "form-status";

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, waitlistForm)
        .then(function () {
            waitlistForm.reset();
            statusEl.textContent = "Thanks! You're on the waitlist, we'll be in touch.";
            statusEl.className = "form-status success";
        })
        .catch(function (error) {
            console.error("EmailJS error:", error);
            statusEl.textContent = "Something went wrong. Please try again, or email us directly.";
            statusEl.className = "form-status error";
        })
        .finally(function () {
            submitBtn.disabled = false;
            submitBtn.textContent = "Join the pilot waitlist";
        });
});
