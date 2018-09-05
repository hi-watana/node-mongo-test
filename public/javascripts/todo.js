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
            console.log(result.todos);
            for (var todo of result.todos) {
                console.log(todo);
                addTableItem(todo, request);
            }
        }
    };
}

var main_divs = document.getElementsByTagName('main')[0].getElementsByTagName('div');
main_divs[0].getElementsByTagName('form')[0].getElementsByTagName('button')[0].addEventListener('click', (event) => {
    var elm = main_divs[0].getElementsByTagName('form')[0].getElementsByTagName('input')[0];
    var inputValue = elm.value;
    if (inputValue === '') {
        alert('You can\'t add an empty item.');
    } else {
        let url = '/todos';
        var data = JSON.stringify({isdone: false, content: inputValue}); // 送信データ ('param=value&...')
        console.log(data);
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
                console.log(todo.content);
                addTableItem(todo, request);
            }
        };
    }
    elm.value = '';

});

main_divs[0].getElementsByTagName('form')[0].addEventListener('submit', (event) => {
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
    new_div.appendChild(new_label);
    new_td1.appendChild(new_div);
    new_tr.appendChild(new_td1);
    var new_td2 = document.createElement('td');

    var result = request.response;
    new_td2.appendChild(document.createTextNode(todo.content));
    new_tr.appendChild(new_td2);
    main_divs[1].getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].appendChild(new_tr);

}