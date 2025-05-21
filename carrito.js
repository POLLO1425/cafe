document.addEventListener('DOMContentLoaded', function() {
    const carrito = [];
    const carritoFlotante = document.getElementById('carrito-flotante');
    const carritoIcono = document.getElementById('carrito-icono');
    const carritoCerrar = document.getElementById('carrito-cerrar');
    const carritoItems = document.getElementById('carrito-items');
    const carritoTotal = document.getElementById('carrito-total');
    const carritoContador = document.getElementById('carrito-contador');
    const enviarPedidoBtn = document.getElementById('enviar-pedido');

    // Mostrar/ocultar carrito
    carritoIcono.addEventListener('click', () => {
        carritoFlotante.classList.add('mostrar');
    });

    carritoCerrar.addEventListener('click', () => {
        carritoFlotante.classList.remove('mostrar');
    });

    // Agregar productos al carrito
    document.querySelectorAll('.form-carrito').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const producto = this.querySelector('input[name="producto"]').value;
            const precio = parseInt(this.querySelector('input[name="precio"]').value);
            const cantidad = parseInt(this.querySelector('input[name="cantidad"]').value);
            
            // Verificar si el producto ya está en el carrito
            const itemExistente = carrito.find(item => item.producto === producto);
            
            if (itemExistente) {
                itemExistente.cantidad += cantidad;
            } else {
                carrito.push({
                    producto,
                    precio,
                    cantidad
                });
            }
            
            actualizarCarrito();
            mostrarNotificacion(`${cantidad} ${producto} agregado(s) al carrito`);
        });
    });

    // Actualizar el carrito
    function actualizarCarrito() {
        carritoItems.innerHTML = '';
        let total = 0;
        let totalItems = 0;
        
        carrito.forEach(item => {
            const subtotal = item.precio * item.cantidad;
            total += subtotal;
            totalItems += item.cantidad;
            
            const itemElement = document.createElement('div');
            itemElement.className = 'carrito-item';
            itemElement.innerHTML = `
                <div>
                    <h4>${item.producto}</h4>
                    <p>${item.cantidad} x $${item.precio.toLocaleString()}</p>
                </div>
                <div>
                    $${subtotal.toLocaleString()}
                </div>
            `;
            
            carritoItems.appendChild(itemElement);
        });
        
        carritoTotal.textContent = total.toLocaleString();
        carritoContador.textContent = totalItems;
    }

    // Enviar pedido
    enviarPedidoBtn.addEventListener('click', () => {
        if (carrito.length === 0) {
            alert('Tu carrito está vacío');
            return;
        }
        
        let mensaje = 'Pedido:\n\n';
        let total = 0;
        
        carrito.forEach(item => {
            const subtotal = item.precio * item.cantidad;
            mensaje += `${item.cantidad} x ${item.producto} - $${subtotal.toLocaleString()}\n`;
            total += subtotal;
        });
        
        mensaje += `\nTotal: $${total.toLocaleString()}`;
        
        alert(mensaje);
        // Aquí podrías agregar código para enviar el pedido a un servidor
    });

    // Mostrar notificación
    function mostrarNotificacion(mensaje) {
        const notificacion = document.createElement('div');
        notificacion.className = 'notificacion';
        notificacion.textContent = mensaje;
        document.body.appendChild(notificacion);
        
        setTimeout(() => {
            notificacion.classList.add('mostrar');
        }, 10);
        
        setTimeout(() => {
            notificacion.classList.remove('mostrar');
            setTimeout(() => {
                document.body.removeChild(notificacion);
            }, 300);
        }, 3000);
    }
});