window.onload = () => {
    let url = '/todos';
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'json';
    request.send(null);

    request.onreadystatechange = () => {
        if (request.readyState != 4) {
            // requesting in progress
        } else if (request.status != 200) {
            // request failed
        } else {
            // successfully requested
            var result = request.response;
            for (var todo of result.todos) {
                addTableItem(todo, request);
            }
        }
    };
}

var main_divs = document.getElementsByTagName('main')[0].getElementsByTagName('div');
var div_add = main_divs[0];
var div_add_button = div_add.getElementsByTagName('form')[0].getElementsByTagName('button')[0];

div_add_button.addEventListener('click', (event) => {
    var elm = div_add.getElementsByTagName('form')[0].getElementsByTagName('input')[0];
    var inputValue = trimWhitespaces(elm.value);
    var url = '/todos';
    var data = JSON.stringify({ isdone: false, content: inputValue });
    var request = new XMLHttpRequest();
    request.open('POST', url);
    request.setRequestHeader('Content-Type', 'application/json');

    request.responseType = 'json';
    request.send(data);

    request.onreadystatechange = () => {
        if (request.readyState != 4) {
            // requesting in progress
        } else if (request.status != 200) {
            // request failed
        } else {
            // successfully requested
            var todo = request.response;
            addTableItem(todo, request);
        }
    };
    elm.value = '';

});

var div_add_textarea = div_add.getElementsByTagName('form')[0];

div_add_textarea.addEventListener('keyup', (event) => {
    var inputValue = div_add.getElementsByTagName('form')[0].getElementsByTagName('input')[0].value;
    if (trimWhitespaces(inputValue) == '') {
        if (!div_add_button.hasAttribute('disabled'))
            div_add_button.setAttribute('disabled', 'disabled');
    } else {
        if (div_add_button.hasAttribute('disabled'))
        div_add_button.removeAttribute('disabled');
    }
}, false);

div_add_textarea.addEventListener('submit', (event) => {
    event.preventDefault();
}, false);

const addTableItem = (todo, request) => {
    var new_tr = document.createElement('tr');
    var new_td1 = document.createElement('td');
    var new_div = document.createElement('div');
    new_div.classList.add('checkbox');
    var new_label = document.createElement('input');
    new_label.setAttribute('type', 'checkbox');
    new_label.setAttribute('value', '');
    new_label.checked = todo.isdone;
    new_label.id = todo._id;
    new_label.addEventListener('change', function (event) {
        let url = '/check';
        var request = new XMLHttpRequest();
        request.open('POST', url);
        request.setRequestHeader('Content-Type', 'application/json');
        request.responseType = 'json';
        request.send(JSON.stringify({_id: this.id, isdone: this.checked}));

        request.onreadystatechange = () => {
            if (request.readyState != 4) {
                // requesting in progress
            } else if (request.status != 200) {
                // request failed
            } else {
                // successfully requested
            }
        };
    })
    new_div.appendChild(new_label);
    new_td1.appendChild(new_div);
    new_tr.appendChild(new_td1);
    var new_td2 = document.createElement('td');

    var result = request.response;
    new_td2.appendChild(document.createTextNode(todo.content));
    new_tr.appendChild(new_td2);
    main_divs[1].getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].appendChild(new_tr);

}

const trimWhitespaces = (s) => {
    return s.replace(/^\s+|\s+$/, '');
}