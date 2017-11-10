'use strict'
setInterval(changeSec, 1000);
setInterval(changeMin, 1000);
setInterval(changeHours, 1000);
let clock = document.getElementById('clock');
let tablo = document.createElement('div');

let now = new Date();
tablo.textContent = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
tablo.style.position = 'relative';
tablo.style.fontSize = '20px';
tablo.style.left = clock.getBoundingClientRect().width/2.45 + 'px';
tablo.style.top = clock.getBoundingClientRect().height/2.7 + 'px';
tablo.style.border = '1px solid indigo';
tablo.style.display = 'inline-block';
clock.appendChild(tablo);

function changeSec() {
    let div = document.querySelector('#sec');
    let now = new Date();
    let seconds = now.getSeconds();
    if (seconds !== 59) {
        div.style.transform = 'rotate(' + 6 * seconds + 'deg)';
        div.style.transition = '1s';
        div.style.transitionTimingFunction = 'linear';
    } else {
        div.style.transition = '0s';
        div.style.transform = 'rotate(0deg)';
    }
}
function changeMin() {
    let div = document.querySelector('#min');
    let now = new Date();
    let minutes = now.getMinutes();
    if (minutes !== 59) {
        div.style.transform = 'rotate(' + 6 * minutes + 'deg)';
        div.style.transition = '1s';
        div.style.transitionTimingFunction = 'linear';
    } else {
        div.style.transition = '0s';
        div.style.transform = 'rotate(0deg)';
    }
}
function changeHours() {
    let div = document.querySelector('#hours');
    let now = new Date();
    let hours = now.getHours();
    console.log(hours);
    div.style.transform = 'rotate(' + 15*hours + 'deg)';
    div.style.transition = '0s';
    div.style.transitionTimingFunction = 'linear';

}

for (let i = 0; i < 12; i++) {
    let div = document.createElement('div');
    div.textContent = i;
    div.style.fontFamily = 'sans-serif';
    div.style.fontSize = '20px';
    div.style.color = 'indigo';
    div.style.backgroundColor = 'cadetblue';
    div.style.width = '35px';
    div.style.height = '35px';
    div.style.lineHeight = '35px';
    div.style.textAlign = 'center'
    div.style.verticalAlign = 'middle';
    div.style.borderRadius = '50%';
    div.style.position = 'absolute';

    let centerPoint = document.getElementById('dot');
    let centerX = centerPoint.getBoundingClientRect().left - centerPoint.getBoundingClientRect().width / 2.2;
    let centerY = centerPoint.getBoundingClientRect().top - centerPoint.getBoundingClientRect().height / 2.2;
    let radians = i * 30 * Math.PI / 180;
    let maxCatetX = Math.floor(clock.getBoundingClientRect().width / 2.3);
    let maxCatetY = Math.floor(clock.getBoundingClientRect().height / 2.3);
    div.style.left = centerX + maxCatetX * Math.sin(radians) + 'px';
    div.style.top = centerY - maxCatetY * Math.cos(radians) + 'px';
    clock.appendChild(div);
}