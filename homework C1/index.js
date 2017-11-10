'use strict'
let rainbow = ['red', 'orange', 'yellow', 'green', 'lightblue', 'blue', 'purple'];

function getRandom(start, end) {
    return Math.floor(Math.random()*(end - start + 1))+start;
}

function giveNColors(amount) {
    let used = {};
    for(let i=0; i < amount; i++) {
        let random = getRandom(1, 7);
        // console.log();
        if(!(rainbow[random-1] in used)) {
            console.log(rainbow[random-1]);
            used[rainbow[random-1]] = true;
        }
        else {
            continue;
        }
    }
}
giveNColors(3);