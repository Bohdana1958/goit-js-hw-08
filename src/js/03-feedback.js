import throttle from "lodash.throttle";
const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;

const formFields = () => {
    const jsonString = localStorage.getItem('feedback-form-state');
    if (jsonString) {
        const formData = JSON.parse(jsonString);
        emailInput.value = formData.email;
        messageInput.value = formData.message;
    }
};
document.addEventListener('DOMContentLoaded', formFields);

const handleSubmit = event => {
    event.preventDefault();
    const jsnStr = localStorage.getItem('feedback-form-state');
    if (jsnStr) {
        const formData = JSON.parse(jsnStr);
        console.log(formData);
        localStorage.removeItem('feedback-form-state');
        form.reset();
    }
};
form.addEventListener('submit', handleSubmit);

const savedFormData = () => {
    const formData = {
        email: emailInput.value,
        message: messageInput.value,
    };
    const jsonStringThrottle = JSON.stringify(formData);
    localStorage.setItem('feedback-form-state', jsonStringThrottle);
};

const throttledSaveFormData = throttle(savedFormData, 50000);
form.addEventListener('input', throttledSaveFormData);