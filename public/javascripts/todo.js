var main_divs = document.getElementsByTagName('main')[0].getElementsByTagName('div');
main_divs[0].getElementsByTagName('form')[0].getElementsByTagName('button')[0].addEventListener('click', (event) => {
    var elm = main_divs[0].getElementsByTagName('form')[0].getElementsByTagName('input')[0];
    var inputValue = elm.value;
    if (inputValue === '') {
        alert('You can\'t add an empty item.');
    } else {
        var url = '/'; // リクエスト先URL
        //var data = JSON.stringify({isdone: false, content: inputValue}); // 送信データ ('param=value&...')
        var data = {isdone: false, content: inputValue};
        console.log(data);
        var request = new XMLHttpRequest();
        request.open('POST', url);
        request.setRequestHeader('Content-Type', 'text/json');
        //request.setRequestHeader('Content-Length', data.length);

        request.responseType = 'json';
        request.send(data);
        console.log(data);

        request.onreadystatechange = () => {
            if (request.readyState != 4) {
                // リクエスト中
            } else if (request.status != 200) {
                // 失敗
            } else {
                // 送信成功
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
                inputValue += ' ' + result.content;
                new_td2.appendChild(document.createTextNode(inputValue));
                new_tr.appendChild(new_td2);
                main_divs[1].getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].appendChild(new_tr);
            }
        };

    }
    elm.value = '';

});

main_divs[0].getElementsByTagName('form')[0].addEventListener('submit', (event) => {
    event.preventDefault();
}, false);
