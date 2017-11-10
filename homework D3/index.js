'use strict'
function show1() {
    let formDef1 =
        [
            { label: 'Название сайта:', kind: 'longtext', name: 'sitename' },
            { label: 'URL сайта:', kind: 'longtext', name: 'siteurl' },
            { label: 'Посетителей в сутки:', kind: 'number', name: 'visitors' },
            { label: 'E-mail для связи:', kind: 'shorttext', name: 'email' },
            {
                label: 'Рубрика каталога:', kind: 'combo', name: 'division',
                variants: [{ text: 'здоровье', value: 1 }, { text: 'домашний уют', value: 2 }, { text: 'бытовая техника', value: 3 }]
            },
            {
                label: 'Размещение:', kind: 'radio', name: 'payment',
                variants: [{ text: 'бесплатное', value: 1 }, { text: 'платное', value: 2 }, { text: 'VIP', value: 3 }]
            },
            { label: 'Разрешить отзывы:', kind: 'check', name: 'votes' },
            { label: 'Описание сайта:', kind: 'memo', name: 'description' },
            { label: 'Опубликовать:', kind: 'submit' }
        ];
    let form = document.forms.form;
    showForm(formDef1, form);
}

function show2() {
    let formDef2 =
    [
      {label:'Фамилия:',kind:'longtext',name:'lastname'},
      {label:'Имя:',kind:'longtext',name:'firstname'},
      {label:'Отчество:',kind:'longtext',name:'secondname'},
      {label:'Возраст:',kind:'number',name:'age'},
      {label:'Зарегистрироваться:',kind:'submit'},
    ];
    let form = document.forms.form2;
    showForm(formDef2, form);
}

function showForm(obj, form) {
    // let form = document.forms.form;

    for (let i = 0; i < obj.length; i++) {
        let element = obj[i].label;
        let label = document.createTextNode(element + ' ');
        form.appendChild(label);

        let input;
        if (obj[i].kind === 'longtext') {
            input = document.createElement('input');
            input.type = 'text';
            input.name = obj[i].name;
            form.appendChild(input);
        } else if (obj[i].kind === 'combo') {
            input = document.createElement('select');
            input.name = obj[i].name;
            for (let j = 0; j < obj[i].variants.length; j++) {
                let option = document.createElement('option');
                option.value = obj[i].variants[j].value;
                option.text = obj[i].variants[j].text;
                input.appendChild(option);
            }
            form.appendChild(input);
        } else if (obj[i].kind === 'number') {
            input = document.createElement('input');
            input.type = 'number';
            input.name = obj[i].name;
            form.appendChild(input);
        } else if (obj[i].kind === 'shorttext') {
            input = document.createElement('input');
            input.type = 'email';
            input.name = obj[i].name;
            form.appendChild(input);
        } else if (obj[i].kind === 'radio') {
            for (let j = 0; j < obj[i].variants.length; j++) {
                let label2 = document.createElement('label');
                label2.innerHTML = '<span>' + obj[i].variants[j].text + ' </span>';
                form.appendChild(label2);
                input = document.createElement('input');
                input.type = 'radio';
                let span = form.getElementsByTagName('span')[j];
                label2.insertBefore(input, label2.children[j]);
            }
        }
        else if (obj[i].kind === 'check') {
            input = document.createElement('input');
            input.type = 'checkbox';
            input.name = obj[i].name;
            input.checked = true;
            form.appendChild(input);
        } else if (obj[i].kind === 'memo') {
            input = document.createElement('textarea');
            input.name = obj[i].name;
            form.appendChild(input);
        } else if (obj[i].kind === 'submit') {
            input = document.createElement('input');
            input.type = 'submit';
            input.name = obj[i].name;
            input.value = 'Publish';
            form.replaceChild(input, label);
        }

        let br = document.createElement('br');

        form.appendChild(br);
    }
}


