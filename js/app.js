
let imagenCarrito = document.querySelector('#numeroCarrito');
const carrito = document.querySelector('#carrito');
const contenedorCarrito =document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos')
let articulosCarrito= [];
let agregarAlcarrito=[];

//////////////////////////////////////////////////////////////////////////////////

function cargarEventListeners(){
    listaCursos.addEventListener('click', agregarCurso);


    carrito.addEventListener('click',eliminarCurso);

    vaciarCarritoBtn.addEventListener('click', ( )=> {
    articulosCarrito = [];
    limpiarHTML()
});

}
    cargarEventListeners()
//////////////////////////////////////////////////////////////////////////////////



function agregarCurso(e){
    e.preventDefault();
    if( e.target.classList.contains('agregar-carrito')){

            const cursoSeleccionado = e.target.parentElement.parentElement;

            leerDatosCurso(cursoSeleccionado)
    }

}
//////////////////////////////////////////////////////////////////////////////////

function eliminarCurso(e){

    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
    
        carritoHTML()

    }
}
//////////////////////////////////////////////////////////////////////////////////

function leerDatosCurso(curso){
   

    const infoCurso = {

        imagen:  curso.querySelector('img').src,
        nombre:  curso.querySelector('h4').textContent,
        precio:  curso.querySelector('.precio span ').textContent,
        id:      curso.querySelector('a ').getAttribute('data-id'),
        Cantidad: 1 
    
    }

        // REVISAR SI EL ARTICULO YA EXISTE 

        const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
        if(existe){

            const cursos = articulosCarrito.map(curso =>{
                
                if(curso.id === infoCurso.id){
                    curso.Cantidad++;
                    return curso;
                }else{
                    return curso;
                }
            })
                articulosCarrito = [...cursos]
        }
        else{
            articulosCarrito.push(infoCurso);
        }
       

       

      
        carritoHTML();
}



//////////////////////////////////////////////////////////////////////////////////


function carritoHTML(){


limpiarHTML()

    articulosCarrito.forEach(curso =>{
    const row = document.createElement('tr');
    row.innerHTML = `

 
    <td>
    <img src="${curso.imagen}" width ="150">
    
    </td>

    
    <td style="color: #33C3F0;">

    ${curso.nombre}

    </td>

    <td>
     ${curso.precio}

    </td>

    <td>
    ${curso.Cantidad}
    </td>


    <td>
        <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
    </td>

    `;
        contenedorCarrito.appendChild(row);

    });




}

function limpiarHTML(){

while(contenedorCarrito.firstChild){
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
}

}


function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
        
        // Actualizar la cantidad de productos en el carrito
        const cantidadCarrito = contenedorCarrito.querySelectorAll('tr').length;
        console.log('La cantidad en el carrito:', cantidadCarrito);
        
        // Mostrar la cantidad en el elemento imagenCarrito
        imagenCarrito.textContent = cantidadCarrito;
    }
}
