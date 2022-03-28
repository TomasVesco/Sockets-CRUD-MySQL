const socket = io.connect();

function renderMessage(data) {
    const html = data.map(elem => {
        if(elem.id !== 0){
            return(`
            <div>
                <strong style="color: #3352FF">${elem.author}</strong>
                <em style="color: #BA842C">[${elem.date}]</em>:
                <em style="color: #64B02D">${elem.text}</em> 
            </div>`)
        } else {
            return(`
            <div>
                <strong>No hay mensajes</strong>
            </div>
            `)
        }
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

socket.on('messages', function(data) { renderMessage(data); });

function addMessage(e) {
    const mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };
    socket.emit('new-message', mensaje);
    return false;
}

function renderProduct(data) {
    if(data[0].id === 0){
        document.getElementById('no-product').innerHTML = '<p>No hay productos</p>';
    } else {
        const html = data.map(elem => {
            return(`
            <td>${elem.title}</td>
            <td>${elem.price}</td>
            <td><img src="${elem.image}" alt=""></td>
            `)
        }).join(" ");
        document.getElementById('products').innerHTML = html;
    }
}

socket.on('products', function(data) {renderProduct(data); });

function addProduct(e) {
    const product = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        image: document.getElementById('image').value
    }
    socket.emit('new-product', product);
    return false;
}
