import throttle from "lodash.throttle";

const form = document.querySelector(".feedback-form");


const STORAGE_KEY = "feedback-form-state";

const formData = {};


form.addEventListener('input', throttle(onTextareaInput, 500));
form.addEventListener('submit', onFormSubmit);

populateTextarea();


function onTextareaInput(e) {
    formData[e.target.name] = e.target.value;
    const dataString = JSON.stringify(formData);
    localStorage.setItem(STORAGE_KEY, dataString);
    
}

function onFormSubmit(e) {
    e.preventDefault();

    formData.email = form.email.value;
    formData.message = form.message.value;

    if (formData.email === '' || formData.message === '') {
        return;
    }

    e.target.reset();
    localStorage.removeItem(STORAGE_KEY);
    console.log(formData);
}

function populateTextarea() {
    const savedMessage = localStorage.getItem(STORAGE_KEY);

    if (savedMessage) {
        const storageKey = JSON.parse(savedMessage);

        form.email.value = storageKey.email;
        form.message.value = storageKey.message;
    }
}