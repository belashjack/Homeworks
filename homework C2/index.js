'use strict'
class HashStorage {
    constructor() {
        this.hash = {};
    }
    addValue(key, value) {
        this.hash[key] = value;
    }
    getValue(key) {
        if (key in this.hash) {
            return this.hash[key];
        } else {
            return undefined;
        }
    }
    deleteValue(key) {
        if (key in this.hash) {
            delete this.hash[key];
            return true;
        } else {
            return false;
        }
    }
    getKeys() {
        let arr = [];
        for (var key in this.hash) {
            arr.push(key);
        }
        return arr;
    }
}

let drinkStorage = new HashStorage();

function enterInfo() {
    let name = prompt('Enter the name of the drink to add info:');
    let isAlcoholic = confirm('Is this drink alcoholic');
    let recipe = prompt('Enter the recipe');
    let drinkInfoHash = {'alcoholic drink': isAlcoholic, 'recipe': recipe};
    drinkStorage.addValue(name, drinkInfoHash);
}

function getInfo() {
    let name = prompt('Enter the name of the drink to get info:');
    let value = drinkStorage.getValue(name);
    if (value !== undefined) {
        console.log(`Drink: ${name}`+'\n'+`alcoholic drink: ${isAlcoholic(value['alcoholic drink'])}`+'\n'+`recipe: ${value['recipe']}`);
    } else {
        console.log(`No '${name}' drink.`);
    }
    function isAlcoholic(alc) {
        if (alc) {
            return 'yes';
        } else {
            return 'no';
        }
    }
}

function deleteDrink() {
    let name = prompt('Enter the name of the drink to delete:');
    let isDeleted = drinkStorage.deleteValue(name);
    if (isDeleted) {
        console.log(`'${name}' drink is deleted.`);
    } else {
        console.log(`No '${name}' drink. '${name}' drink isn't deleted.`);
    }
}

function listDrinks() {
    for(let i = 0; i < drinkStorage.getKeys().length; i++) {
        console.log(drinkStorage.getKeys()[i]);
    }
    console.log('\n');
}