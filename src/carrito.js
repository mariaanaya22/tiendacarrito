
// esta funcion ayuda a que se muestre el carrito con el "block"
function mostrarCarro(){
    let carrito = document.getElementById('contenedor-carro');
    carrito.style.display="block";
}
// esta funcion ayuda a que no sea visible el carrito con el"none"
function ocultarCarro(){
    let carrito = document.getElementById('contenedor-carro');
    carrito.style.display="none"
}

// esta funcion nos ayuda a ccontar y incrementa el valor en 1 y colocamos el parseint para convertir eltexto a un numerico si no hace el proceso  se convierte en un numero 0 

function sumarcontador(){
    let contador  = document.getElementById('contador');

    let conta = parseInt(contador.textContent) || 0;
    let contar = conta + 1;

    contador.textContent= contar;
}
//  esta funcion coje a todos los bottones los cuales su clase sea increment y les agrega un click que va a hacer a llamar la funcion sumarcontador lo cual hace que cuando se unda ira incrementando 
let buttons = document.querySelectorAll('.increment');
buttons.forEach(button => {
    button.addEventListener('click', sumarcontador);
})




let carritoitems = []; //arreglo a array vacio que se metaran los articulos
let total = 0; //contador vacio
// ayuda a agregar el articulo mediante un boton 
function agregararticulo(event){
    let boton = event.target;
    let tarjetaid = boton.id.replace('boton', 'tarjeta');
    let tarjeta = document.getElementById(tarjetaid);

    //clonar la tarjeta parrar agregar al carro 
    let tarjetaclonada = tarjeta.cloneNode(true);

    carritoitems.push(tarjetaid);

    //AGREGAR CLASE A LA TARJETA CLONADA
    tarjetaclonada.classList.add('tarjetac')

    //crear boton para eliminar
    let botoneliminar = document.createElement('button');
    botoneliminar.textContent='Eliminar Articulo';
    botoneliminar.classList.add('eliminarboton');
    tarjetaclonada.appendChild(botoneliminar);


//obtener precio del articulo
    let precioelement = tarjeta.querySelector('.precio');
    let precio = parseInt(precioelement.textContent.replace('$', ''), 10);


    //sumar precio total

    total+= precio;
  

    // actualizar el valor del div total 
    let totalprecio = document.getElementById('total');
    totalprecio.textContent = `total: $${total}`;

    //agregar tarjeta clonada al carrito

    let carrito = document.getElementById('total');
    carritoitems.push(tarjetaclonada);
    carrito.append(tarjetaclonada);

    //agregar una clase al carrito 
    carrito.classList.add('carrito-actualizada');

    //añadir evento de eliminacion al boton 
    botoneliminar.addEventListener('click', function() {
        eliminarArticulo(tarjetaid);
    });

  
    function eliminarArticulo(tarjetaid) {
        // Encontrar la tarjeta clonada en el carrito por su id y eliminarla
        let tarjetaclonada = document.querySelector(`.tarjetac#${tarjetaid}`);
        tarjetaclonada.parentNode.removeChild(tarjetaclonada);
    
        // Remover el id del artículo del carritoitems
        carritoitems = carritoitems.filter(id => id !== tarjetaid);
    
        // Obtener el precio del artículo y restarlo del total
        let tarjetaOriginal = document.getElementById(tarjetaid);
        let precioElement = tarjetaOriginal.querySelector('.precio');
        let precio = parseInt(precioElement.textContent.replace('$', ''), 10);
        total -= precio;


 //actualizar el precio del div
 let totalprecio = document.getElementById('total');
 totalprecio.textContent = `total: $${total}`;

    }
}

// Función para actualizar el contador de artículos en el carrito
 let contadorElement = document.getElementById('contador');
    contadorElement.textContent = carritoitems.length.toString();


// Agregar evento click a todos los botones de agregar al carrito
document.querySelectorAll('.increment').forEach(boton => {
    boton.addEventListener('click', agregararticulo);
});

