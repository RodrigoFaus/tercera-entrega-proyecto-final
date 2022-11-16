
/////////// Arrays generales //////////////

let arraySecciones = []
let arraySeccionesNoRepeat = []
let arrayProductos = []



/////////// Constructor //////////////

class Menu {
    constructor(nombre, descripcion, precio, categoria, img) {
        this.nombre = nombre
        this.descripcion = descripcion
        this.precio = parseFloat(precio) 
        this.categoria = categoria
        this.img = img
    }

}


/////////// Secciones //////////////


let btnguardoSection = document.getElementById("btnguardoSection")

//Boton que crea las secciones
btnguardoSection.addEventListener("click", () => {

    //Capturo el valor del input
    let inputCrearSection = document.getElementById("inputCrearSection").value
    //Capturo solamente el elemento del input para agregarle un estilo 
    let inputCrearSection2 = document.getElementById("inputCrearSection")

    //Validación para no permitir crear secciones vacias
    if (inputCrearSection.trim() !== "") {

        arraySecciones.push(inputCrearSection)
        btnguardoSection.removeAttribute("data-bs-dismiss")
        inputCrearSection2.classList.remove("is-invalid")

        creoSeccion();

      //Guardo la sección en el local storage
      localStorage.setItem("arraySeccionesNoRepeatStorage", JSON.stringify(arraySeccionesNoRepeat))

    } else {

        Swal.fire("El campo puede estar vacio")
       

    }
})



// Funcion que crea las secciones
function creoSeccion() {

    let ulLista = document.getElementById("ulSecciones")
    let li = document.createElement("li")
    let nombreSeccion = document.getElementById("nombreSeccion")
    let inputCrearSection2 = document.getElementById("inputCrearSection")
    let pError = document.querySelector(".p-error")
    let select = document.querySelector(".select")
    let option = document.createElement("option")
    let optionSelected = document.getElementById("optionSelected")

    //Ciclo que me permite eliminar nombres duplicados de las secciones en el arraySecciones
    for (let i = 0; i < arraySecciones.length; i++) {
        if (arraySeccionesNoRepeat.includes(arraySecciones[i])) {
            inputCrearSection2.classList.add("is-invalid")
            pError.classList.remove("d-none")

        } else {
            arraySeccionesNoRepeat.push(arraySecciones[i])
            inputCrearSection2.classList.remove("is-invalid")
            pError.classList.add("d-none")

            arraySeccionesNoRepeat.forEach(section => {

                //Permite que al seleccionar una seccion, le cambie el nombre al elmento h4
                li.textContent = section
                li.classList = "secciones btn w-75 centrado p-1 mb-2 mt-2 bg-blanco-letrasv  fs-5  border-color30"
                ulLista.classList = "m-0 p-0  centrado flex-column mt-1"

                //Asigno los dataset a las secciones para que se correspondan con los productos
                li.setAttribute("data-categorias", section)
                ulLista.appendChild(li)


                //Event que cambia de nombre la sección para que el usuario sepa en que seccion esta
                li.addEventListener("click", () => {
                    nombreSeccion.textContent = section
                    optionSelected.textContent = section
                    

                })

                // Me permite asignar las secciones en el modal que se despliega, al momento de crear los productos
                option.textContent = section
                select.appendChild(option)



            })
            // console.log(arraySeccionesNoRepeat)
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


/////////// Producto //////////////

let btnCreoProducto = document.getElementById("btnCreoProducto")
            btnCreoProducto.addEventListener("click", () => {
                creoProductos();
                filtraContenidoSeccion();        
            })

//Boton para guardar los datos del producto y crearlo
// let btnCreoProducto = document.getElementById("btnCreoProducto")

// let btnAñadirProductos = document.getElementById("btnAñadirProductos")
// btnAñadirProductos.addEventListener("click", () => {
//     const inputNombre = document.getElementById("inputNombre")
//     const inputDescripcion = document.getElementById("inputDescripcion")
//     const inputPrecio = document.getElementById("inputPrecio") 
//     const asignarOption = document.getElementById("inputGroupSelect01")
//     const ingresoImg = document.getElementById("ingresoImg")

//     const validarInputs = (mensaje, e) => {
//         const input = e.target;
//         const inputValor = e.target.value;

//         if(inputValor.trim().length === 0) {
//             input.classList.add("is-invalid")
//             input.nextElementSibling.textContent = mensaje
//             input.nextElementSibling.classList.add("invalid-feedback")
//         } else {

//             input.classList.remove("is-invalid")
//             //Agrega un evento a al boton de crear producto y ejecuta la función de crear productos
//             btnCreoProducto.addEventListener("click", () => {
//                 creoProductos();
//                 filtraContenidoSeccion();        
//             })
           
//         }      
//     }

//     inputNombre.addEventListener("blur",(e) => validarInputs("Por favor, completa este campo", e))
//     inputDescripcion.addEventListener("blur",(e) => validarInputs("Por favor, completa este campo", e))
//     inputPrecio.addEventListener("blur",(e) => validarInputs("Por favor, completa este campo", e))
//     asignarOption.addEventListener("blur",(e) => validarInputs("Por favor, elige una sección", e))

// })



// Funcion que crea el producto
function creoProductos() {

    //Capturo el valor de los inputs que aparecen cuando toco el boton de "Agregar Producto"
    let inputNombre = document.getElementById("inputNombre")
    let inputDescripcion = document.getElementById("inputDescripcion")
    let inputPrecio = document.getElementById("inputPrecio")
    let asignarOption = document.getElementById("inputGroupSelect01")
    let ingresoImg = document.getElementById("ingresoImg")

    let inputNombreValue = inputNombre.value
    let inputDescripcionValue = inputDescripcion.value
    let inputPrecioValue = inputPrecio.value
    let asignarOptionValue = asignarOption.value

    if (inputNombreValue.trim().length === 0) {
        inputNombre.classList.add("is-invalid")
        inputNombre.nextElementSibling.textContent = "Por favor, completa este campo"
        inputNombre.nextElementSibling.classList.add("invalid-feedback")

        inputNombre.addEventListener("click", () => {
            inputNombre.classList.remove("is-invalid")
            inputNombre.nextElementSibling.textContent = ""
        })

    }
    if (inputDescripcionValue.trim().length === 0) {
        inputDescripcion.classList.add("is-invalid")
        inputDescripcion.nextElementSibling.textContent = "Por favor, completa este campo"
        inputDescripcion.nextElementSibling.classList.add("invalid-feedback")
        inputDescripcion.addEventListener("click", () => {
            inputDescripcion.classList.remove("is-invalid")
            inputDescripcion.nextElementSibling.textContent = ""
        })
    }
    if (inputPrecioValue.trim().length === 0) {
        inputPrecio.classList.add("is-invalid")
        inputPrecio.nextElementSibling.textContent = "Este campo se encuentra vacío o contiene un número negativo"
        inputPrecio.nextElementSibling.classList.add("invalid-feedback")
        
        inputPrecio.addEventListener("click", () => {
            inputPrecio.classList.remove("is-invalid")
        inputPrecio.nextElementSibling.textContent = ""
        })

    } 

    if (asignarOptionValue.trim().length === 0) {
       
        asignarOption.classList.add("is-invalid")
        asignarOption.nextElementSibling.textContent = "Por favor, completa este campo"
        asignarOption.nextElementSibling.classList.add("invalid-feedback")
        asignarOption.addEventListener("click", () => {
            asignarOption.classList.remove("is-invalid")
            asignarOption.nextElementSibling.textContent = ""
        })

        
        
    }
    else {
    
        inputNombre.classList.remove("is-invalid")
        inputNombre.nextElementSibling.textContent = ""
        inputDescripcion.classList.remove("is-invalid")
        inputDescripcion.nextElementSibling.textContent = ""
        inputPrecio.classList.remove("is-invalid")
        inputPrecio.nextElementSibling.textContent = ""
        asignarOption.classList.remove("is-invalid")
        asignarOption.nextElementSibling.textContent = ""
        

        //Remuevo las clases agregadas en los if

        //Una vez capturado ese valor, genero un nuevo item/producto a traves de mi clase 
        //Lo pusheo a mi array y lo seteo en el localStorage
  

        let producto = new Menu(inputNombreValue, inputDescripcionValue, inputPrecioValue, asignarOptionValue, ingresoImg)

        arrayProductos.push(producto)
        localStorage.setItem("arrayProductosStorage", JSON.stringify(arrayProductos))
    
        //Limpio los inputs para que esten vacíos luego de agregar un producto
        document.getElementById("inputNombre").value = ""
        document.getElementById("inputDescripcion").value = ""
        document.getElementById("inputPrecio").value = ""
        document.getElementById("inputGroupSelect01").value = ""
        document.getElementById("ingresoImg").value = ""
    
        //Llamo a la función que genera una card por cada producto creado
        generoCard()
        //Llamo a la función que me permite borrar los productos individualmente
        borrarProductos()  

    }

    
}

//Función que genera las cards de los productos
function generoCard() {

    //Capturo elemento del html para depositar las cards
    let depositoProductos = document.getElementById("divProd")

      //Genero un contador de ID para cada asignarle a cada card creada
    let idCounter = 0;

    //Limpio el container que va a tener los productos asi no se acumulan
    depositoProductos.innerHTML = ""

    //Por cada producto genero una card
    arrayProductos.forEach((producto) => {
      
        //Cardo donde se van a generar los productos
        let divCard = document.createElement("div")

        divCard.innerHTML = `   <div class="row g-0">
                                    <div class="col-md-3 border-img-card centrado">
                                        <img src="https://www.kiddo.com.ar/img/Logo_02.png" class="img-fluid rounded-start max-width " alt="...">
                                    </div>
                                    <div class="col-md-7">
                                        <div class="card-body d-flex flex-column justify-content-start">
                                        <h5 class="card-title">${producto.nombre} </h5>
                                        <p class="card-text">${producto.descripcion}</p>
                                            <h5 class="card-text pt-4">$${producto.precio}</h5>
                                        </div>
                                    </div>
                                    <div class="col-md-2 centrado">
                                        <button class="borroProducto"type="button" data-nombre="${producto.nombre}">Borrar</button>
                                    </div>
                                </div> `


        // Seteo los atributos de data, clase y le agrego un id
        divCard.setAttribute("data-categorias", producto.categoria)
        divCard.setAttribute("id", idCounter)
        idCounter++;

        divCard.classList = "contenedor-prod card mb-3 w-75 "

        //Deposito las cards generadas en el elemento capturado del html
        depositoProductos.appendChild(divCard)
    
    })
}


//Función para borrarindividualmente los productos creados
function borrarProductos() {
    
    let borroProducto = document.querySelectorAll(".borroProducto")

    //Creo una función flecha y paso por parametro el id  los hijos a ser borrados del DOM
    borre = (id) => {
        //Llamo a los respectivos contenedores en la que se va a ejectuar el metodo removrChild
        let depositoProductos = document.getElementById("divProd")
        let card = document.getElementById(id)
    
        depositoProductos.removeChild(card)
    
    }
    
    //Le asigno un evento a cada boton para que al presionarlo pueda borrar los productos del DOM
    borroProducto.forEach((btn) => {
        btn.addEventListener("click", (e) => {
    
            //Utilizo una alerta para que el usuario no borro el producto por error al presionar el boton
            Swal.fire({
                title: '¿Esta seguro que quiere borrar este producto?',
                text: "",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Borrar'
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire(
                    '¡Borrado!',
                    'Borraste este producto.',
                    )
                    //Hago un filtro del array de los productos para que coincida el nombre del producto con el dataset del boton
                    arrayProductos = arrayProductos.filter((prod) => prod.nombre !== btn.dataset.nombre)
                    //Seteo el array filtrado para poder modificar el localstorage
                    localStorage.setItem("arrayProductosStorage", JSON.stringify(arrayProductos))
                    //Si el evento cumple el IF va a ejecutar la funcion borre() y va a eliminar el la card que coincida con el id 
                    if (event.srcElement.nodeName == "BUTTON") {
                        borre(e.path[3].id)
                    }
                }
              })

           
    
        })   
    })
}


//////////////////////////////////////// Local storage //////////////////////////////////////////// 

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("arraySeccionesNoRepeatStorage")) {


        let nombreSeccion = document.getElementById("nombreSeccion")
        nombreSeccion.textContent = "Todos los productos"
       

        //Llamo a los array que no estan en el localStorage
        arraySeccionesNoRepeat = JSON.parse(localStorage.getItem("arraySeccionesNoRepeatStorage"))
       
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
                optionSelected.textContent = section

            })
        })

        filtraContenidoSeccion();
    
    }

    if(localStorage.getItem("arrayProductosStorage")){
        arrayProductos = JSON.parse(localStorage.getItem("arrayProductosStorage"))

        let idCounter = 0;
        arrayProductos.forEach((producto) => {

            let depositoProductos = document.getElementById("divProd")
            let divCard = document.createElement("div")


            divCard.innerHTML = ` <div class="row g-0">
                                        <div class="col-md-3 border-img-card centrado">
                                            <img src="https://www.kiddo.com.ar/img/Logo_02.png" class="img-fluid rounded-start max-width " alt="...">
                                        </div>
                                        <div class="col-md-7">
                                            <div class="card-body d-flex flex-column justify-content-start">
                                            <h5 class="card-title">${producto.nombre} </h5>
                                            <p class="card-text">${producto.descripcion}</p>
                                                <h5 class="card-text pt-4">$${producto.precio}</h5>
                                            </div>
                                        </div>
                                        <div class="col-md-2 centrado">
                                        <button class="borroProducto" type="button" data-nombre="${producto.nombre}">Borrar</button>
                                        </div>
                                    </div> `


            divCard.setAttribute("data-categorias", producto.categoria)
            divCard.setAttribute("id", idCounter)
            idCounter++;
            divCard.classList = "contenedor-prod card mb-3 w-75 active  borrado-js"

            depositoProductos.appendChild(divCard)  
        })

        //Llamo a estas funciones para que puedan ser usadas en el localStorage tambien
        filtraContenidoSeccion();
        borrarProductos()
        
        
        ///HACER IDEA DE TODOS LOS PRODUCTOS CADA VEZ QUE SE REINICIA LA PAGINA O FIJARSE DE PONER LA PRIMERA SECCION/
        //AÑADE TUS NOMBRE.SECCION (idea)

    }

})

