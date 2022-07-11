//Валидация нескольких полей и форм//

function showInputError(formElement, inputElement, errorMessage, classSet) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(classSet.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(classSet.errorClass);
};


function hideInputError(formElement, inputElement, classSet) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(classSet.inputErrorClass);
    errorElement.classList.remove(classSet.errorClass);
    errorElement.textContent = '';
};


//Взаимодействие с другими элементами DOM//

function checkInputValidity(formElement, inputElement, classSet) {
    if (!inputElement.validity.valid) {

        showInputError(formElement, inputElement, inputElement.validationMessage, classSet);
    } else {

        hideInputError(formElement, inputElement, classSet);
    }
};

// Недостающие функции. Вызываем функцию toggleButtonState перед тем как её объявять//

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid
    })
}


function toggleButtonState(inputList, buttonElement, classSet) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(classSet.inactiveButtonClass)
        buttonElement.setAttribute('disabled')
    } else {
        buttonElement.classList.remove(classSet.inactiveButtonClass)
        buttonElement.removeAttribute('disabled')
    }
}




function setEventListeners(formElement, classSet) {
    const inputList = Array.from(formElement.querySelectorAll(classSet.inputSelector));
    const buttonElement = formElement.querySelector(classSet.submitButtonSelector)

    toggleButtonState(inputList, buttonElement, classSet);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, classSet);
            toggleButtonState(inputList, buttonElement, classSet);
        });
    });
};


function enableValidation(classSet) {
    const formList = Array.from(document.querySelectorAll(classSet.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement, classSet);
    });
};


//Вкючить проверку//

enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__error_visible'
})