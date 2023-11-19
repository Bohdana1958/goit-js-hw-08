// Отримати елемент форми
const form = document.querySelector('.feedback-form');

// Отримати елементи полів email і message
const emailInput = form.elements.email;
const messageInput = form.elements.message;
// Створити функцію, яка зберігає дані форми у локальне сховище
const saveFormData = () => {
    // Створити об'єкт з полями email і message
    const formData = {
        email: emailInput.value,
        message: messageInput.value,
    };

    // Перетворити об'єкт у рядок JSON
    const jsonString = JSON.stringify(formData);

    // Зберегти рядок у локальне сховище за ключем "feedback-form-state"
    localStorage.setItem('feedback-form-state', jsonString);
};

// Додати обробник події input на форму
form.addEventListener('input', saveFormData);
// Створити функцію, яка заповнює поля форми з локального сховища
const populateFormFields = () => {
    // Отримати рядок з локального сховища за ключем "feedback-form-state"
    const jsonString = localStorage.getItem('feedback-form-state');

    // Якщо рядок не пустий, перетворити його у об'єкт
    if (jsonString) {
        const formData = JSON.parse(jsonString);

        // Заповнити поля форми з об'єкта
        emailInput.value = formData.email;
        messageInput.value = formData.message;
    }
};

// Додати обробник події DOMContentLoaded на document
document.addEventListener('DOMContentLoaded', populateFormFields);
// Створити функцію, яка обробляє подію сабміту форми
const handleSubmit = event => {
    // Запобігти стандартній поведінці браузера
    event.preventDefault();

    // Отримати рядок з локального сховища за ключем "feedback-form-state"
    const jsonString = localStorage.getItem('feedback-form-state');

    // Якщо рядок не пустий, перетворити його у об'єкт
    if (jsonString) {
        const formData = JSON.parse(jsonString);

        // Вивести об'єкт у консоль
        console.log(formData);


        localStorage.removeItem('feedback-form-state');


        form.reset();
    }
};


form.addEventListener('submit', handleSubmit);

import throttle from 'lodash.throttle';


const savedFormData = () => {

    const formData = {
        email: emailInput.value,
        message: messageInput.value,
    };

    const jsonString = JSON.stringify(formData);


    localStorage.setItem('feedback-form-state', jsonString);
};


const throttledSaveFormData = throttle(savedFormData, 500);


form.addEventListener('input', throttledSaveFormData);
