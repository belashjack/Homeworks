'use strict'
let string = prompt('Enter your string: ');
console.log(`You have ${getVowels(string)} vowels.`);
function getVowels(string) {
    const vowels = ['а', 'о', 'у', 'э', 'ы', 'я', 'ё', 'ю' ,'е' ,'и', 'А', 'О', 'У', 'Э', 'Ы', 'Я', 'Ё', 'Ю', 'Е', 'И'];
    let counter = 0;
    vowels.forEach(function(element) {
        for (let position = 0; string.indexOf(element, position) !== -1;) {
            counter++;
            position = string.indexOf(element, position)+1;
        }
    }, this);
    return counter;
}