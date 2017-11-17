'use strict'
window.onhashchange = goToURLFromLocationHash;
goToURLFromLocationHash();


function goToURLFromLocationHash() {
    if (location.hash === '#articles') {
        createArticlesListPage();
    } else if (location.hash === '') {
        createMainPage();
        return;
    } else {
        createArticlePage();
    }


}

function createArticlesListPage() {
    document.getElementsByTagName('body')[0].innerHTML = '<h2>Contents</h2>';
    $.ajax('https://api.myjson.com/bins/17hgrn', {dataType: 'json', success: articlesListDataLoaded, error: errorHandler});
}
function createMainPage() {
    document.getElementsByTagName('body')[0].innerHTML = '<h2>Single Page Application</h2><a href="#articles" id="articles_link">Full list of articles</a>';
}
function createArticlePage() {
    document.getElementsByTagName('body')[0].innerHTML = '';
    $.ajax('https://api.myjson.com/bins/17hgrn', {dataType: 'json', success: articleDataLoaded, error: errorHandler});
}


function articlesListDataLoaded(data) {
    let array = [];
    for (const key in data) {
        array.push(data[key]);
    }
    array.sort();
    for(let i = 0; i < array.length; i++) {
        appendArticle(array, i);
    }
}
function appendArticle(data, i) {
    if (document.getElementById("'" + data[i][0] + "'")===null) {
        let divForLinks = document.createElement('div');
        divForLinks.style.textAlign = 'center';
        document.getElementsByTagName('body')[0].appendChild(divForLinks);
        let br = document.createElement('br');
        let br2 = document.createElement('br');
        document.getElementsByTagName('body')[0].lastChild.appendChild(br);
        let h3 = document.createElement('h3');
        h3.id = "'" + data[i][0] + "'";
        h3.style.margin = '0px';
        h3.textContent = data[i][0].toUpperCase();
        document.getElementsByTagName('body')[0].lastChild.insertBefore(h3, br);
        let articleName = document.createElement('a');
        articleName.href = '#' + data[i];
        articleName.textContent = data[i];
        document.getElementsByTagName('body')[0].lastChild.insertBefore(articleName, br);
        document.getElementsByTagName('body')[0].lastChild.appendChild(br2);
    }
    else {
        let articleName = document.createElement('a');
        articleName.href = '#' + data[i];
        articleName.textContent = data[i];
        document.getElementsByTagName('body')[0].lastChild.insertBefore(articleName, document.getElementsByTagName('body')[0].lastChild.lastChild);
        let br = document.createElement('br');
        document.getElementsByTagName('body')[0].lastChild.appendChild(br);
    }    
}
function errorHandler() {
    console.log(arguments);
}

function articleDataLoaded(data) {
    let counter = 0;
    for (const key in data) {
        if (location.hash === '#' + data[key]) {
            counter++;
            break;
        }
    }
    if (counter > 0) {
        createArticlesList();
        createContent(location.hash);
    } else {
        document.getElementsByTagName('body')[0].innerHTML = '<h1>Error 404</h1>';
    }

    function createArticlesList() {
        let array = [];
        for (const key in data) {
            array.push(data[key]);
        }
        array.sort();
        let divForLinks = document.createElement('div');
        // divForLinks.style.backgroundColor = 'beige';
        divForLinks.style.width = '25%';
        divForLinks.style.textAlign = 'center';
        divForLinks.style.cssFloat = 'left';
        divForLinks.style.minWidth = '80px';
        document.getElementsByTagName('body')[0].appendChild(divForLinks);
        for(let i = 0; i < array.length; i++) {
            let articleName = document.createElement('a');
            articleName.href = '#' + array[i];
            articleName.textContent = array[i];
            articleName.style.display = 'block';
            articleName.style.margin = '5px';
            document.getElementsByTagName('body')[0].lastChild.appendChild(articleName);
        }
    }
    function createContent(articleName) {
        $.ajax({url: 'https://raw.githubusercontent.com/belashjack/Homeworks/master/homework%20K3/' + articleName.substr(1) + '.html', dataType: 'html', success: function(data) {
            console.log('success');
            console.log(data);
            let content = document.createElement('div');
            content.style.width = '73%';
            content.style.minWidth = '250px';
            content.style.cssFloat = 'right';
            content.innerHTML = data;
            document.getElementsByTagName('body')[0].appendChild(content);
        }, error: function() {
            console.log('error');
        }})
    }
}

