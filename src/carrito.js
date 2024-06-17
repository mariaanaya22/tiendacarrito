// Función para mostrar el carrito
function mostrarCarro(){
    let carrito = document.getElementById('contenedor-carro');
    carrito.style.display = "block";
}

// Función para ocultar el carrito
function ocultarCarro(){
    let carrito = document.getElementById('contenedor-carro');
    carrito.style.display = "none";
}

// Función para incrementar el contador
function sumarcontador(){
    let contador = document.getElementById('contador');
    let conta = parseInt(contador.textContent) || 0;
    let contar = conta + 1;
    contador.textContent = contar;
}

// Agregar evento de click a los botones de incrementar
let buttons = document.querySelectorAll('.increment');
buttons.forEach(button => {
    button.addEventListener('click', sumarcontador);
});

let carritoitems = []; // Arreglo para los artículos del carrito
let total = 0; // Contador para el total del precio

// Función para agregar artículo al carrito
function agregararticulo(event){
    let boton = event.target;
    let tarjetaid = boton.id.replace('boton', 'tarjeta');
    let tarjeta = document.getElementById(tarjetaid);

    // Clonar la tarjeta para agregar al carrito
    let tarjetaclonada = tarjeta.cloneNode(true);
    tarjetaclonada.id = `carrito-${tarjetaid}`; // Asignar un id único

    // Crear botón para eliminar
    let botoneliminar = document.createElement('button');
    botoneliminar.textContent = 'Eliminar Artículo';
    botoneliminar.classList.add('eliminarboton');
    tarjetaclonada.appendChild(botoneliminar);

    // darle clase a la tarjeta clonada 
    tarjetaclonada.classList.add('tarjetac');

    // Obtener precio del artículo
    let precioelement = tarjeta.querySelector('.precio');
    let precio = parseInt(precioelement.textContent.replace('$', ''), 10);

    // Sumar precio total
    total += precio;

    // Actualizar el valor del div total
    let totalprecio = document.getElementById('total');
    totalprecio.textContent = `Total: $${total}`;

    // Agregar tarjeta clonada al carrito
    let carrito = document.getElementById('contenedor-carro');
    carrito.appendChild(tarjetaclonada);

    // Agregar el id del artículo al arreglo carritoitems
    carritoitems.push(tarjetaid);

    // Añadir evento de eliminación al botón
    botoneliminar.addEventListener('click', function() {
        eliminarArticulo(tarjetaclonada.id, precio);
    });

    // Actualizar el contador de artículos en el carrito
    let contadorElement = document.getElementById('contador');
    contadorElement.textContent = carritoitems.length.toString();
}

// Función para eliminar artículo del carrito
function eliminarArticulo(tarjetaid, precio) {
    let tarjetaclonada = document.getElementById(tarjetaid);
    tarjetaclonada.parentNode.removeChild(tarjetaclonada);

    // Remover el id del artículo del carritoitems
    let originalId = tarjetaid.replace('carrito-', '');
    carritoitems = carritoitems.filter(id => id !== originalId);

    // Restar el precio del total
    total -= precio;

    // Actualizar el precio del div total
    let totalprecio = document.getElementById('total');
    totalprecio.textContent = `Total: $${total}`;

    // Actualizar el contador de artículos en el carrito
    let contadorElement = document.getElementById('contador');
    contadorElement.textContent = carritoitems.length.toString();
}

// Agregar evento click a todos los botones de agregar al carrito
document.querySelectorAll('.increment').forEach(boton => {
    boton.addEventListener('click', agregararticulo);
});



