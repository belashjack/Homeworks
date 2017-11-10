'use strict'
let form = document.forms.form;
let devField = form.elements.devField;
let siteNameField = form.elements.siteNameField;
let URLField = form.elements.URLField;
let releaseField = form.elements.releaseField;
let visitorsField = form.elements.visitorsField;
let emailField = form.elements.emailField;
let catalogSelectField = form.elements.catalogSelectField;
let deploymentRadio = form.elements.deploymentRadio;
let reviewsCheckbox = form.elements.reviewsCheckbox;
let siteDescrTextarea = form.elements.siteDescrTextarea;

let errorsHash = {
    devField: { 'Enter developers name': false, 'Enter short name': false, 'Enter without special symbols': false },
    siteNameField: { 'Enter site name': false, 'Enter short name': false, 'Enter without special symbols': false },
    URLField: { 'Enter URL': false, 'Enter short URL': false },
    releaseField: { 'Enter release date': false, 'Enter date in the past': false },
    visitorsField: { 'Enter number of visitors': false, 'Enter non-negative number': false },
    emailField: { 'Enter e-mail': false, 'Enter short e-mail': false, 'Enter @ sign': false },
    catalogSelectField: { 'Don\'t choose appliances': false },
    deploymentRadio: { 'Choose any type of deployment': false },
    reviewsCheckbox: { 'Allow reviews': false },
    siteDescrTextarea: { 'Enter site description': false }
};

devField.addEventListener('blur', devFieldBlur);
siteNameField.addEventListener('blur', siteNameFieldBlur);
URLField.addEventListener('blur', URLFieldBlur);
releaseField.addEventListener('blur', releaseFieldBlur);
visitorsField.addEventListener('blur', visitorsFieldBlur);
emailField.addEventListener('blur', emailFieldBlur);
catalogSelectField.addEventListener('blur', catalogSelectFieldBlur);
for(let i = 0; i < deploymentRadio.length; i++) {
    deploymentRadio[i].addEventListener('blur', deploymentRadioBlur);
}
reviewsCheckbox.addEventListener('blur', reviewsCheckboxBlur);
siteDescrTextarea.addEventListener('blur', siteDescrTextareaBlur);
form.addEventListener('submit', formSubmit);

function devFieldBlur() {
    let hashField = errorsHash.devField;
    let hashErrorTitle1 = Object.keys(hashField)[0];
    let hashErrorTitle2 = Object.keys(hashField)[1];
    let hashErrorTitle3 = Object.keys(hashField)[2];

    isEmptyString(devField, hashField, hashErrorTitle1);
    isLongString(devField, 50, hashField, hashErrorTitle2);
    hasSpecialSymbols(devField, hashField, hashErrorTitle3)
}
function siteNameFieldBlur() {
    let hashField = errorsHash.siteNameField;
    let hashErrorTitle1 = Object.keys(hashField)[0];
    let hashErrorTitle2 = Object.keys(hashField)[1];
    let hashErrorTitle3 = Object.keys(hashField)[2];

    isEmptyString(siteNameField, hashField, hashErrorTitle1);
    isLongString(siteNameField, 20, hashField, hashErrorTitle2);
    hasSpecialSymbols(siteNameField, hashField, hashErrorTitle3)
}
function URLFieldBlur() {
    let hashField = errorsHash.URLField;
    let hashErrorTitle1 = Object.keys(hashField)[0];
    let hashErrorTitle2 = Object.keys(hashField)[1];

    isEmptyString(URLField, hashField, hashErrorTitle1);
    isLongString(URLField, 30, hashField, hashErrorTitle2);
}
function releaseFieldBlur() {
    let hashField = errorsHash.releaseField;
    let hashErrorTitle1 = Object.keys(hashField)[0];
    let hashErrorTitle2 = Object.keys(hashField)[1];

    isEmptyString(releaseField, hashField, hashErrorTitle1);
    isPastDate(releaseField, hashField, hashErrorTitle2);
}
function visitorsFieldBlur() {
    let hashField = errorsHash.visitorsField;
    let hashErrorTitle1 = Object.keys(hashField)[0];
    let hashErrorTitle2 = Object.keys(hashField)[1];

    isEmptyString(visitorsField, hashField, hashErrorTitle1);
    isNegativeNumber(visitorsField, hashField, hashErrorTitle2);
}
function emailFieldBlur() {
    let hashField = errorsHash.emailField;
    let hashErrorTitle1 = Object.keys(hashField)[0];
    let hashErrorTitle2 = Object.keys(hashField)[1];
    let hashErrorTitle3 = Object.keys(hashField)[2];

    isEmptyString(emailField, hashField, hashErrorTitle1);
    isLongString(emailField, 30, hashField, hashErrorTitle2);
    hasDogSign(emailField, hashField, hashErrorTitle3);
}
function catalogSelectFieldBlur() {
    let hashField = errorsHash.catalogSelectField;
    let hashErrorTitle1 = Object.keys(hashField)[0];
    let badOption = catalogSelectField.childNodes[5];

    isBadOptionChosen(badOption, hashField, hashErrorTitle1);
}
function deploymentRadioBlur() {
    let hashField = errorsHash.deploymentRadio;
    let hashErrorTitle1 = Object.keys(hashField)[0];

    deploymentRadioIsChosen(hashField, hashErrorTitle1);
}
function reviewsCheckboxBlur() {
    let hashField = errorsHash.reviewsCheckbox;
    let hashErrorTitle1 = Object.keys(hashField)[0];

    isChecked(reviewsCheckbox, hashField, hashErrorTitle1);
}
function siteDescrTextareaBlur() {
    let hashField = errorsHash.siteDescrTextarea;
    let hashErrorTitle1 = Object.keys(hashField)[0];

    isEmptyString(siteDescrTextarea, hashField, hashErrorTitle1);
}

function formSubmit() {
    event.preventDefault();
    devFieldBlur();
    siteNameFieldBlur();
    URLFieldBlur();
    releaseFieldBlur();
    visitorsFieldBlur();
    emailFieldBlur();
    catalogSelectFieldBlur();
    deploymentRadioIsChosen(errorsHash.deploymentRadio, Object.keys(errorsHash.deploymentRadio)[0]);
    reviewsCheckboxBlur();
    siteDescrTextareaBlur();
    let counter = 0;
    // outer - метка
    outer: for (var key in errorsHash) {
        for (var key2 in errorsHash[key]) {
            if (errorsHash[key][key2] === true) {
                counter++;
                console.log(form.elements[key] + ' ' + key);
                try {
                    form.elements[key].focus();
                } catch (error) {
                    form.elements[key][0].focus();
                }
                break outer;
            }
        }
    }
    if (counter === 0) {
        form.submit();
    }
}

function isEmptyString(currentField, hashField, hashErrorTitle) {
    if (currentField.value === '' && !hashField[hashErrorTitle]) {
        addError(currentField, hashField, hashErrorTitle);
    } else if (currentField.value !== '' && hashField[hashErrorTitle]) {
        removeError(currentField, hashField, hashErrorTitle);
    }
}
function isLongString(currentField, length, hashField, hashErrorTitle) {
    if (currentField.value.length > length && !hashField[hashErrorTitle]) {
        addError(currentField, hashField, hashErrorTitle);
    } else if (currentField.value.length <= length && hashField[hashErrorTitle]) {
        removeError(currentField, hashField, hashErrorTitle);
    }
}
function hasSpecialSymbols(currentField, hashField, hashErrorTitle) {
    if (currentField.value.indexOf('?') !== -1 && !hashField[hashErrorTitle]) {
        addError(currentField, hashField, hashErrorTitle);
    } else if (currentField.value.indexOf('?') === -1 && hashField[hashErrorTitle]) {
        removeError(currentField, hashField, hashErrorTitle);
    }
}
function isPastDate(currentField, hashField, hashErrorTitle) {
    let currentDate = getCurrentDate();
    if (currentField.value > currentDate && !hashField[hashErrorTitle]) {
        addError(currentField, hashField, hashErrorTitle);
    } else if (currentField.value <= currentDate && hashField[hashErrorTitle]) {
        removeError(currentField, hashField, hashErrorTitle);
    }
}
function isNegativeNumber(currentField, hashField, hashErrorTitle) {
    if (parseInt(currentField.value) < 0 && !hashField[hashErrorTitle]) {
        addError(currentField, hashField, hashErrorTitle);
    } else if (parseInt(currentField.value) >= 0 && hashField[hashErrorTitle]) {
        removeError(currentField, hashField, hashErrorTitle);
    }
}
function hasDogSign(emailField, hashField, hashErrorTitle) {
    if (emailField.value.indexOf('@') === -1 && !hashField[hashErrorTitle]) {
        addError(emailField, hashField, hashErrorTitle);
    } else if (emailField.value.indexOf('@') !== -1 && hashField[hashErrorTitle]) {
        removeError(emailField, hashField, hashErrorTitle);
    }
}
function isChecked(currentCheckbox, hashField, hashErrorTitle) {
    if (!currentCheckbox.checked && !hashField[hashErrorTitle]) {
        addError(currentCheckbox, hashField, hashErrorTitle);
    } else if (currentCheckbox.checked && hashField[hashErrorTitle]) {
        removeError(currentCheckbox, hashField, hashErrorTitle);
    }
}
function isBadOptionChosen(badOption, hashField, hashErrorTitle) {
    if (badOption.selected === true && !hashField[hashErrorTitle]) {
        addError(badOption.parentNode, hashField, hashErrorTitle);
    } else if (badOption.selected !== true && hashField[hashErrorTitle]) {
        removeError(badOption.parentNode, hashField, hashErrorTitle);
    }
}
function deploymentRadioIsChosen(hashField, hashErrorTitle) {
    if (deploymentRadio.value === '' && !hashField[hashErrorTitle]) {
        addError(deploymentRadio[0].parentNode, hashField, hashErrorTitle);
    } else if (deploymentRadio.value !== '' && hashField[hashErrorTitle]) {
        removeError(deploymentRadio[0].parentNode, hashField, hashErrorTitle);
    }
}

function getCurrentDate() {
    let date = new Date();
    if ((date.getMonth() + 1) < 10 && date.getDate() < 10) {
        return `${String(date.getYear() + 1900)}-0${String(date.getMonth() + 1)}-0${String(date.getDate())}`;
    } else if ((date.getMonth() + 1) >= 10 && date.getDate() < 10) {
        return `${String(date.getYear() + 1900)}-${String(date.getMonth() + 1)}-0${String(date.getDate())}`;
    } else if (date.getMonth() < 10 && date.getDate() >= 10) {
        return `${String(date.getYear() + 1900)}-0${String(date.getMonth() + 1)}-${String(date.getDate())}`;
    } else {
        return `${String(date.getYear() + 1900)}-${String(date.getMonth() + 1)}-${String(date.getDate())}`;
    }
}

function addError(currentElem, hashField, hashErrorTitle) {
    let error = document.createElement('p');
    error.textContent = ' ' + hashErrorTitle + '.';
    error.style.display = 'inline';
    error.style.fontSize = '10px';
    error.style.color = 'red';
    error.style.whiteSpace = 'nowrap';
    currentElem.parentNode.appendChild(error);
    hashField[hashErrorTitle] = true;
}
function removeError(currentElem, hashField, hashErrorTitle) {
    let arrayWithP = form.getElementsByTagName('p');
    let pToDelete;
    for (let i = 0; i < arrayWithP.length; i++) {
        if (arrayWithP[i].textContent === ' ' + hashErrorTitle + '.') {
            pToDelete = arrayWithP[i];
        }
    }
    // pToDelete.parentNode.removeChild(pToDelete);
    currentElem.parentNode.removeChild(pToDelete);
    hashField[hashErrorTitle] = false;
}