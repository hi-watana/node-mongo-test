var main_divs = document.getElementsByTagName('main')[0].getElementsByTagName('div');
var div_save = main_divs[0];

var div_save_form = div_save.getElementsByTagName('form')[0];;

// ignore submit
div_save_form.addEventListener('submit', (event) => {
    event.preventDefault();
}, false);

var div_save_input = div_save_form.getElementsByTagName('input')[0];;

var div_save_select = div_save_form.getElementsByTagName('select')[0];

// Input validation
div_save_input.addEventListener('keyup', (event) => {
    var inputValue = div_save.getElementsByTagName('form')[0].getElementsByTagName('input')[0].value;
    if (trimWhitespaces(inputValue) == '') {
        if (!div_save_button.hasAttribute('disabled'))
            div_save_button.setAttribute('disabled', 'disabled');
    } else {
        if (div_save_button.hasAttribute('disabled'))
        div_save_button.removeAttribute('disabled');
    }
}, false);

// Disable button when some key is being pressed.
div_save_input.addEventListener('keydown', (event) => {
    if (!div_save_button.hasAttribute('disabled'))
        div_save_button.setAttribute('disabled', 'disabled');
}, false);

var div_save_textarea = div_save_form.getElementsByTagName('textarea')[0];;

var div_save_button = div_save_form.getElementsByTagName('button')[0];;

div_save_button.addEventListener('click', function (event) {
    if (!confirm('Save changes and go back?')) return;

    var inputValue = trimWhitespaces(div_save_input.value);
    var textareaValue = div_save_textarea.value;
    var selectValue = div_save_select.value;
    var url = '/item/update';
    var data = JSON.stringify(
        {
            _id: this.id,
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
            window.location.href = '/';
        }
    };
    div_save_input.value = '';
    div_save_textarea.value = '';

});

const DATE_RANGE = 100;

window.onload = () => {
    var url = '/item';
    var id = window.location.search.split('=')[1];
    var request = new XMLHttpRequest();
    request.open('POST', url);
    request.setRequestHeader('Content-Type', 'application/json');
    request.responseType = 'json';

    request.send(JSON.stringify({_id: id}));

    request.onreadystatechange = () => {
        if (request.readyState != 4) {
            // requesting in progress
        } else if (request.status != 200) {
            // request failed
        } else {
            // successfully requested
            var result = request.response;
            div_save_button.id = result._id;
            div_save_input.value = result.title;
            div_save_textarea.value = result.description;
            div_save_select.value = result.deadline;
            var option_top = div_save_select.getElementsByTagName('option')[0];
            option_top.value = result.deadline;
            option_top.textContent = new Date(result.deadline).toDateString();

            var selectFragment = document.createDocumentFragment();
            var today = new Date();
            var today_year = today.getFullYear();
            var today_month = today.getMonth();
            var today_date = today.getDate();
            [...Array(DATE_RANGE).keys()].map(i => createDateOption(new Date(today_year, today_month, today_date + i)))
                .forEach(s => {
                    selectFragment.appendChild(s);
                });

            div_save_select.appendChild(selectFragment);
        }
    };
}

const trimWhitespaces = (s) => {
    return s.replace(/^\s+|\s+$/, '');
}

const createDateOption = (date) => {
    let option = document.createElement('option');
    option.appendChild(document.createTextNode(date.toDateString()));
    option.value = date.toISOString();
    return option;
}

div_save_select.addEventListener('change', function (event) {
    console.log(this.value);
})