'use strict'
let string = prompt('Enter your string: ');
// Using array.filter
console.log(`You have ${getVowelsWithFilter(string)} vowels (using array.filter).`);
// Using array.reduce
console.log(`You have ${getVowelsWithReduce(string)} vowels (using array.reduce).`);

function getVowelsWithFilter(string) {
    const vowels = ['а', 'о', 'у', 'э', 'ы', 'я', 'ё', 'ю', 'е', 'и', 'А', 'О', 'У', 'Э', 'Ы', 'Я', 'Ё', 'Ю', 'Е', 'И'];
    let arrWithString = string.split('');
    let arrWithOnlyVowels = arrWithString.filter(getVowels2);
    function getVowels2(value) {
        for (let i = 0; i < vowels.length; i++) {
            if (value === vowels[i]) {
                return true;
            }
        }
        return false;
    }
    return arrWithOnlyVowels.length;
}

function getVowelsWithReduce(string) {
    const vowels = ['а', 'о', 'у', 'э', 'ы', 'я', 'ё', 'ю', 'е', 'и', 'А', 'О', 'У', 'Э', 'Ы', 'Я', 'Ё', 'Ю', 'Е', 'И'];
    let arrWithString = string.split('');
    let arrWithOnlyVowels = arrWithString.reduce(getVowels3, '');
    function getVowels3(previousValue, currentItem) {
        if (vowels.indexOf(currentItem) !== -1) {
            return previousValue + currentItem;
        } else {
            return previousValue + '';
        }
    }
    return arrWithOnlyVowels.length;
}