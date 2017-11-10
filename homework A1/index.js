'use strict'

let name, familyName, lastName, age, isMan;
do {
    name = prompt('Enter name:', '');
} while (name === '');
do {
    familyName = prompt('Enter family name:');
} while (familyName === '');
do {
    lastName = prompt('Enter last name:');
} while (lastName === '');
do {
    age = prompt('Enter age:');
    console.log(parseInt(age) + ' ' + typeof parseInt(age) + ' ' + isNaN(parseInt(age)));
} while ((age < 0 || age > 120) || isNaN(parseInt(age)));
isMan = confirm('Are you man?');
let ageInDays = age => Math.floor(age*365 + age/4);
function genderDeterm(...rest) {
    if (rest[0]) {
        return 'man';
    } else {
        return 'woman';
    }
}
let isOnPension = age => {
    if (genderDeterm(isMan) === 'man') {
        if (age >= 63) {
            return 'yes';
        } else {
            return 'no';
        }
    } else {
        if (age >= 58) {
            return 'yes';
        } else {
            return 'no';
        }
    }
}
alert(`Your Fullname: ${lastName} ${name} ${familyName}` + '\n' + `Your age (in years): ${age}` + '\n' + `Your age (in days): ${ageInDays(age)}` + '\n' + `In 5 years you'll be: ${age+5}` + '\n' + `Your gender: ${genderDeterm(isMan)}` + '\n' + `You are on pension: ${isOnPension(age)}`);