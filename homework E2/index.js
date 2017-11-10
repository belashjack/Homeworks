'use strict'
let div = document.getElementById('container');
let imgArray = div.getElementsByTagName('img');
console.log(imgArray);
console.log(div.style.zIndex);

for(let i = 0; i < imgArray.length; i++) {
    imgArray[i].addEventListener('mousedown', mouseDownOnImg);
}

function mouseDownOnImg() {
    console.log(event);
    event.target.style.zIndex = '3';
    
    let shiftX = event.pageX - event.target.getBoundingClientRect().left;
    let shiftY = event.pageY - event.target.getBoundingClientRect().top;
    function move() {
        event.preventDefault();
        event.target.style.cursor = 'move';
        event.target.style.left = event.pageX - shiftX + 'px';
        event.target.style.top = event.pageY - shiftY + 'px';
    }
    event.target.parentElement.addEventListener('mousemove', mouseMoveOverDiv);
    event.target.addEventListener('mouseup', mouseUpOnImg);
    function mouseMoveOverDiv() {
        move();
    }
    function mouseUpOnImg() {
        event.target.parentElement.removeEventListener('mousemove', mouseMoveOverDiv)
        event.target.style.zIndex = '2';
    }
}