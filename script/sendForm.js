const server = 'https://jsonplaceholder.typicode.com/posts';

const sendData = (data, callBack, errorCallBack) => {
    for (let key in data) {
        if (data[key] == '') {
            errorCallBack('Все поля обязательны для заполнения');
            throw new Error(request.statusText);
        }
    }

    const request = new XMLHttpRequest();
    request.open('POST', server);

    request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) return;
        if (request.status === 200 || request.status === 201) {
            const response = JSON.parse(request.responseText);
            callBack(response.id);
        } else {
            errorCallBack(request.responseText);
            throw new Error(request.statusText);
        }
    });

    request.send(data);
};

const formElems = document.querySelectorAll('.form');

const formHandler = (form) => {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = {};

        for (const {
                name,
                value
            } of form.elements) {
            if (name) {
                data[name] = value;
            }
        }

        const responseElem = form.querySelector('.response');


        sendData(JSON.stringify(data),
            (id) => {
                responseElem.textContent = 'Ваша заявка была успешно отправлена.';
                responseElem.classList.add('response_success');
            },
            (error) => {
                responseElem.textContent = 'Ошибка: ' + error;
                responseElem.classList.add('response_error');
            });
        form.reset();
    })
}

formElems.forEach(formHandler);