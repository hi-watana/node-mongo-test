var main_divs = document.getElementsByTagName('main')[0].getElementsByTagName('div');
var div_add = main_divs[0];
var div_table = main_divs[1].getElementsByTagName('table')[0].getElementsByTagName('tbody')[0];

var div_add_form = div_add.getElementsByTagName('form')[0];

// ignore submit
div_add_form.addEventListener('submit', (event) => {
    event.preventDefault();
}, false);

var div_add_input = div_add_form.getElementsByTagName('input')[0];

// Input validation
div_add_input.addEventListener('keyup', (event) => {
    var inputValue = div_add.getElementsByTagName('form')[0].getElementsByTagName('input')[0].value;
    if (trimWhitespaces(inputValue) == '') {
        if (!div_add_button.hasAttribute('disabled'))
            div_add_button.setAttribute('disabled', 'disabled');
    } else {
        if (div_add_button.hasAttribute('disabled'))
        div_add_button.removeAttribute('disabled');
    }
}, false);

// Disable button when some key is being pressed.
div_add_input.addEventListener('keydown', (event) => {
    if (!div_add_button.hasAttribute('disabled'))
        div_add_button.setAttribute('disabled', 'disabled');
}, false);

var div_add_textarea = div_add_form.getElementsByTagName('textarea')[0];
var div_add_button = div_add_form.getElementsByTagName('button')[0];

div_add_button.addEventListener('click', (event) => {
    var inputValue = trimWhitespaces(div_add_input.value);
    var textareaValue = div_add_textarea.value;
    var selectValue = div_add_select.value;
    var url = '/save';
    var data = JSON.stringify(
        {
            isdone: false,
            title: inputValue,
            description: textareaValue,
            deadline: selectValue
        });
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
            addTableItem(todo, div_table);
            console.log(todo.deadline);
        }
    };
    div_add_input.value = '';
    div_add_textarea.value = '';
});

var div_add_select = div_add_form.getElementsByTagName('select')[0];

div_add_select.addEventListener('change', function (event) {
    console.log(this.value);
})

const addTableItem = (todo, parentNode) => {
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

    new_td2.appendChild(document.createTextNode(todo.title));
    new_td2.classList.add('td-break');
    new_td2.classList.add('tr-pointer');
    new_td2.id = todo._id;

    new_td2.addEventListener('click', function (event) {
        window.location.href = '/item?id=' + this.id;
    });

    new_tr.appendChild(new_td2);

    parentNode.appendChild(new_tr);

}

const trimWhitespaces = (s) => {
    return s.replace(/^\s+|\s+$/, '');
}

const DATE_RANGE = 100;

window.onload = () => {
    var url = '/todos';
    var request = new XMLHttpRequest();
    request.open('POST', url);
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
            var tableFragment = document.createDocumentFragment();
            for (var todo of result.todos) {
                addTableItem(todo, tableFragment);
            }
            div_table.appendChild(tableFragment);

            var selectFragment = document.createDocumentFragment();
            var today = new Date();
            var today_year = today.getFullYear();
            var today_month = today.getMonth();
            var today_date = today.getDate();
            [...Array(DATE_RANGE).keys()].map(i => createDateOption(new Date(today_year, today_month, today_date + i)))
                .forEach(s => {
                    selectFragment.appendChild(s);
                });

            div_add_select.appendChild(selectFragment);
        }
    };
}

const createDateOption = (date) => {
    let option = document.createElement('option');
    option.appendChild(document.createTextNode(date.toDateString()));
    option.value = date.toISOString();
    return option;
}