const socket = io.connect();

function renderMessage(data) {
    if(data.length !== 0){

        const html = data.map(elem => {
            return(`
            <div>
            <strong style="color: #3352FF">${elem.author}</strong>
            <em style="color: #BA842C">[${elem.timestamp}]</em>:
            <em style="color: #64B02D">${elem.text}</em> 
            </div>
            `)
        }).join(" ");
        document.getElementById('messages').innerHTML = html;
    } else {
        document.getElementById('messages').innerHTML = '<strong>No hay mensajes</strong>';
    }
}

socket.on('messages', function(data) { renderMessage(data); });

function addMessage(e) {
    const mensaje = {
        author: document.getElementById('author').value,
        text: document.getElementById('text').value
    };
    socket.emit('new-message', mensaje);
    return false;
}

function renderProduct(data) {
    if(data.length !== 0){

        const html = data.map(elem => {
            return(`
            <td>${elem.title}</td>
            <td>${elem.price}</td>
            <td><img src="${elem.image}" alt=""></td>
            `)
        }).join(" ");
        document.getElementById('products').innerHTML = html;

    } else {
        document.getElementById('products').innerHTML = '<strong>No hay productos</strong>';
    }
}

socket.on('products', function(data) { renderProduct(data); });

function addProduct(e) {
    const product = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        image: document.getElementById('image').value
    };
    socket.emit('new-product', product);
    return false;
}
