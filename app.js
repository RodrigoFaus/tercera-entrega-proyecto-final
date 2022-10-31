
/////////// Arrays generales //////////////

const arraySecciones = []
const arrayProductos = []

/////////// Contructor //////////////

class Menu {
    constructor(nombre, descripcion, precio, categoria) {
        this.nombre = nombre
        this.descripcion = descripcion
        this.precio = precio
        this.categoria = categoria
    }

}


/////////// Secciones //////////////


let btnguardoSection = document.getElementById("btnguardoSection")



btnguardoSection.addEventListener("click", () => {
   
    let inputCrearSection = document.getElementById("inputCrearSection").value
    arraySecciones.push(inputCrearSection)
    creoSección();
    asignoSecciones();


})



// Funcion que crea las secciones
function creoSección() {

    let ulLista = document.getElementById("ulSecciones")
    let li = document.createElement("li")
    let nombreSeccion = document.getElementById("nombreSeccion")

    li.classList = "list-group-item w-100 centrado mt-2 mb-2  btn bg-blanco-letrasv rounded fs-5 seleccionado"
    ulLista.classList = "list-group-item"


    arraySecciones.forEach(section => {

        li.textContent = section
        li.classList = "secciones"

        li.setAttribute("data-categorias",section)
        ulLista.appendChild(li)
        

        //Event que cambia de nombre la sección para que el usuario sepa en que seccion esta
        li.addEventListener("click", () => {
            nombreSeccion.textContent = section

        })

    })

    //Limpio el input
    document.getElementById("inputCrearSection").value = ""

}

//Funcion que permite mostrar los productos que corresponda a cada seccion
function filtraContenidoSeccion(){
	const seccionesCreadas = document.querySelectorAll(".secciones")
	const contenedorProductosCreados = document.querySelectorAll(".contenedor-prod")
	let categoriaActiva = null;

	seccionesCreadas.forEach((seccionCreada) => {

		seccionCreada.addEventListener("click", (e) => {

			seccionesCreadas.forEach((elemento) => {
				elemento.classList.remove("active")


			e.currentTarget.classList.toggle("active")
			categoriaActiva = seccionCreada.dataset.categorias;
			
			
			// Se activa el contenedor de productos que corresponde
			contenedorProductosCreados.forEach((contenedor) => {

				if (contenedor.dataset.categorias === categoriaActiva) {
					contenedor.classList.add("active")

				} else {
					contenedor.classList.remove("active")
				}

			})

			})

		})
	
	})
	
}



// Funcion que permite asignar las secciones al momento de crear los productos
function asignoSecciones() {
    let select = document.querySelector(".select")
    let option = document.createElement("option")

    arraySecciones.forEach(section => {
        option.textContent = section
        select.appendChild(option)


    })

}


//Funcion para que cada vez que toco la seccion me muestre asas

console.log(arraySecciones)


/////////// Producto //////////////

//Boton para guardar los datos del producto y crearlo

let btnCreoProducto = document.getElementById("btnCreoProducto")

btnCreoProducto.addEventListener("click", () => {
    creoProductos();
    filtraContenidoSeccion();
   

})


// Funcion que crea el producto
function creoProductos() {
    let inputNombre = document.getElementById("inputNombre").value
    let inputDescripcion = document.getElementById("inputDescripcion").value
    let inputPrecio = document.getElementById("inputPrecio").value
    let asignarOption = document.getElementById("inputGroupSelect01").value
   

    let producto = new Menu(inputNombre, inputDescripcion, inputPrecio, asignarOption)

    arrayProductos.push(producto)
  

        document.getElementById("inputNombre").value = ""
        document.getElementById("inputDescripcion").value = ""
        document.getElementById("inputPrecio").value = ""
        document.getElementById("inputGroupSelect01").value = ""

    
    generoCard(producto);


}

function generoCard (producto) {
	let depositoProductos = document.getElementById("divProd")
	let divCard = document.createElement("div")
	
            divCard.innerHTML =`<div class="row g-0">
                                    <div class="col-md-4">
                                    
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h3 class="card-title">${producto.nombre}</h3>
                                            <p class="card-text">${producto.descripcion}</p>
                                            <h4 class="card-text">$${producto.precio}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
`

	divCard.setAttribute("data-categorias",producto.categoria)
    divCard.setAttribute("style","max-width: 540px;")
	divCard.classList = "contenedor-prod card mb-3"
	

	depositoProductos.appendChild(divCard)


    // nom.textContent = producto.nombre
	// descrip.textContent = producto.descripcion

	// divCard.appendChild(nom)
	// divCard.appendChild(descrip)
    

}


//Función que muestra los productos cargados







