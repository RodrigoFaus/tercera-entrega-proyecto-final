/////////// Local storage //////////////



/////////// Arrays generales //////////////

let arraySecciones = []
let arrayProductos = []
let arrayCards = []






/////////// Constructor //////////////

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
    localStorage.setItem("arraySeccionesStorage", JSON.stringify(arraySecciones))
    creoSeccion();
    asignoSecciones();



})



// Funcion que crea las secciones
function creoSeccion() {

    let ulLista = document.getElementById("ulSecciones")
    let li = document.createElement("li")
    let nombreSeccion = document.getElementById("nombreSeccion")



    arraySecciones.forEach(section => {

        li.textContent = section
        li.classList = "secciones btn w-75 centrado p-1 mb-2 mt-2 bg-blanco-letrasv  fs-5  border-color30"
        ulLista.classList = "m-0 p-0  centrado flex-column mt-1"

        li.setAttribute("data-categorias", section)
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
function filtraContenidoSeccion() {
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

    localStorage.setItem("arrayProductosStorage", JSON.stringify(arrayProductos))


    document.getElementById("inputNombre").value = ""
    document.getElementById("inputDescripcion").value = ""
    document.getElementById("inputPrecio").value = ""
    document.getElementById("inputGroupSelect01").value = ""

    generoCard(producto)
    

}



//Función que muestra los productos cargados

function generoCard(producto) {
    let depositoProductos = document.getElementById("divProd")
    let divCard = document.createElement("div")

    divCard.innerHTML = `<div class="row g-0">
                                    <div class="col-md-4">
                                    <img src="https://www.bogotraveltours.com/wp-content/uploads/2016/11/icono-comidas.png" class="img-fluid rounded-start cont_secciones" alt="...">
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

    divCard.setAttribute("data-categorias", producto.categoria)
    divCard.setAttribute("style", "max-width: 540px;")
    divCard.classList = "contenedor-prod card mb-3"


    depositoProductos.appendChild(divCard)
    arrayCards.push(divCard)
    console.log(arrayCards)

    localStorage.setItem("arrayCardsStorage", JSON.stringify(arrayCards))

}

//////////////////////////////////////////// Local storage //////////////////////////////////////////// 

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("arraySeccionesStorage")) {

        arraySecciones = JSON.parse(localStorage.getItem("arraySeccionesStorage"))
    
        //Vuelvo a ejecutar el codigo para que aparezcan las secciones generadas y para que se les pueda asignar
        //las mismas a los productos
        arraySecciones.forEach((section) => {

            //Variables para la lista de secciones a la izquierda de la pantalla
            let ulLista = document.getElementById("ulSecciones")
            let li = document.createElement("li")
            let nombreSeccion = document.getElementById("nombreSeccion")
            //Variables para seleccionar la seccion al momento de crear el producto
            let select = document.querySelector(".select")
            let option = document.createElement("option")

            li.textContent = section
            li.classList = "secciones btn w-75 centrado p-1 mb-2 mt-2 bg-blanco-letrasv  fs-5  border-color30"
            ulLista.classList = "m-0 p-0  centrado flex-column mt-1"

            li.setAttribute("data-categorias", section)
            ulLista.appendChild(li)

            option.textContent = section
            select.appendChild(option)



            //Event que cambia de nombre la sección para que el usuario sepa en que seccion esta
            li.addEventListener("click", () => {
                nombreSeccion.textContent = section

            })


        })
               
    }


})







