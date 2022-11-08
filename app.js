
/////////// Arrays generales //////////////

let arraySecciones = []
let arraySeccionesNoRepeat = []
let arrayProductos = []



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

    //Capturo el valor del input
    let inputCrearSection = document.getElementById("inputCrearSection").value
    //Capturo solamente el elemento del input para agregarle un estilo 
    let inputCrearSection2 = document.getElementById("inputCrearSection")
    
        if (inputCrearSection.trim() !== "" ) { 

            // btnguardoSection.setAttribute("data-bs-dismiss", "modal")
            arraySecciones.push(inputCrearSection)
            btnguardoSection.removeAttribute("data-bs-dismiss")
            inputCrearSection2.classList.remove("is-invalid")

            creoSeccion();
            asignoSecciones();

            localStorage.setItem("arraySeccionesNoRepeatStorage", JSON.stringify(arraySeccionesNoRepeat))
           
        } else {
           
            alert("No puede estar vacio");
            inputCrearSection2.classList.add("is-invalid")
            
        }
       

    

   

})



// Funcion que crea las secciones
function creoSeccion() {

    let ulLista = document.getElementById("ulSecciones")
    let li = document.createElement("li")
    let nombreSeccion = document.getElementById("nombreSeccion")
    let inputCrearSection2 = document.getElementById("inputCrearSection")

     //Ciclo que me permite eliminar nombres duplicados de las secciones en el arraySecciones
     for(let i = 0; i < arraySecciones.length; i++){
        if(arraySeccionesNoRepeat.includes(arraySecciones[i])){
            inputCrearSection2.classList.add("is-invalid")
        
        } else {
            arraySeccionesNoRepeat.push(arraySecciones[i])
            inputCrearSection2.classList.remove("is-invalid")
            // alert(`El nombre ya existe, por favor, intente con otro nombre ${arraySecciones[i]}`)

            arraySeccionesNoRepeat.forEach(section => {

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
            console.log(arraySeccionesNoRepeat)
        }
    }
   

    

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

    arraySeccionesNoRepeat.forEach(section => {
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

    // generoCard(producto)

    generoCard()
    
}


//Función que muestra los productos cargados

function generoCard() {
  
    let depositoProductos = document.getElementById("divProd")

    depositoProductos.innerHTML = ""

    arrayProductos.forEach((producto) => {    
    let divCard = document.createElement("div")

    divCard.innerHTML = ` <div class="row g-0">
                                <div class="col-md-3 border-img-card centrado">
                                 <img src="https://www.kiddo.com.ar/img/Logo_02.png" class="img-fluid rounded-start max-width " alt="...">
                                </div>
                            <div class="col-md-9">
                                <div class="card-body d-flex flex-column justify-content-start">
                                        <h5 class="card-title">${producto.nombre} </h5>
                                        <p class="card-text">${producto.descripcion}</p>
                                        <h5 class="card-text pt-4">$${producto.precio}</h5>
                                </div>
                            </div>
                       </div> `
               
                    
    divCard.setAttribute("data-categorias", producto.categoria)
    divCard.classList = "contenedor-prod card mb-3 w-75"

    

    depositoProductos.appendChild(divCard)

    })

}




////////////////////////////////////////// Local storage //////////////////////////////////////////// 

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("arraySeccionesNoRepeatStorage")) {

        arraySeccionesNoRepeat = JSON.parse(localStorage.getItem("arraySeccionesNoRepeatStorage"))
        arrayProductos = JSON.parse(localStorage.getItem("arrayProductosStorage"))
    
        //Vuelvo a ejecutar el codigo para que aparezcan las secciones generadas y para que se les pueda asignar
        //las mismas a los productos
        arraySeccionesNoRepeat.forEach((section) => {

            //Variables para la lista de secciones a la izquierda de la pantalla
            let ulLista = document.getElementById("ulSecciones")
            let li = document.createElement("li")
            let nombreSeccion = document.getElementById("nombreSeccion")

            //Variables para seleccionar la seccion al momento de crear el producto
            let select = document.querySelector(".select")
            let option = document.createElement("option")
           
            //
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

      
        arrayProductos.forEach((producto) => {
            let depositoProductos = document.getElementById("divProd")

            let divCard = document.createElement("div")

            divCard.innerHTML = ` <div class="row g-0">
                                        <div class="col-md-3 border-img-card centrado">
                                        <img src="https://www.kiddo.com.ar/img/Logo_02.png" class="img-fluid rounded-start max-width " alt="...">
                                        </div>
                                    <div class="col-md-9">
                                        <div class="card-body d-flex flex-column justify-content-start">
                                                <h5 class="card-title">${producto.nombre} </h5>
                                                <p class="card-text">${producto.descripcion}</p>
                                                <h5 class="card-text pt-4">$${producto.precio}</h5>
                                        </div>
                                    </div>
                            </div> `
                    
                            
            divCard.setAttribute("data-categorias", producto.categoria)
            divCard.classList = "contenedor-prod card mb-3 w-75 active"

            

            depositoProductos.appendChild(divCard)

                })

                filtraContenidoSeccion();

                ///HACER IDEA DE TODOS LOS PRODUCTOS CADA VEZ QUE SE REINICIA LA PAGINA O FIJARSE DE PONER LA PRIMERA SECCION/
                //IF la LI.SECCION ESTA ACTIVE, PONER ACTIVE CUANDO CREO EL PRODUCOT//
               
    }

})

