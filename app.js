
/////////// Arrays generales //////////////

let arraySecciones = []
let arraySeccionesNoRepeat = []
let arrayProductos = []



/////////// Constructor //////////////

class Menu {
    constructor(nombre, descripcion, precio, categoria, img) {
        this.nombre = nombre
        this.descripcion = descripcion
        this.precio = precio
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
    let pError = document.querySelector(".p-error")
    let select = document.querySelector(".select")
    let option = document.createElement("option")

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

//Boton para guardar los datos del producto y crearlo
let btnCreoProducto = document.getElementById("btnCreoProducto")

let btnAñadirProductos = document.getElementById("btnAñadirProductos")
btnAñadirProductos.addEventListener("click", () => {
    const inputNombre = document.getElementById("inputNombre")
    const inputDescripcion = document.getElementById("inputDescripcion")
    const inputPrecio = document.getElementById("inputPrecio") 
    const asignarOption = document.getElementById("inputGroupSelect01")
    const ingresoImg = document.getElementById("ingresoImg")

    const validarInputs = (mensaje, e) => {
        const input = e.target;
        const inputValor = e.target.value;

        if(inputValor.trim().length === 0) {
            input.classList.add("is-invalid")
            input.nextElementSibling.textContent = mensaje
            input.nextElementSibling.classList.add("invalid-feedback")
        } else {
            input.classList.remove("is-invalid")

            btnCreoProducto.addEventListener("click", () => {
                creoProductos();
                filtraContenidoSeccion();        
            })
           
        }   
        
    }

    inputNombre.addEventListener("blur",(e) => validarInputs("Por favor, completa este campo", e))
    inputDescripcion.addEventListener("blur",(e) => validarInputs("Por favor, completa este campo", e))
    inputPrecio.addEventListener("blur",(e) => validarInputs("Por favor, completa este campo", e))
    asignarOption.addEventListener("blur",(e) => validarInputs("Por favor, elige una sección", e))

})


// Funcion que crea el producto
function creoProductos() {

    //Capturo el valor de los inputs que aparecen cuando toco el boton de "Agregar Producto"
    let inputNombre = document.getElementById("inputNombre").value
    let inputDescripcion = document.getElementById("inputDescripcion").value
    let inputPrecio = document.getElementById("inputPrecio").value
    let asignarOption = document.getElementById("inputGroupSelect01").value
    let ingresoImg = document.getElementById("ingresoImg").value

    //Una vez capturado ese valor, genero un nuevo item/producto a traves de mi clase 
    let producto = new Menu(inputNombre, inputDescripcion, inputPrecio, asignarOption, ingresoImg)
    //Lo pusheo a mi array y lo seteo en el localStorage
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
    
            //Hago un filtro del array de los productos para que coincida el nombre del producto con el dataset del boton
            arrayProductos = arrayProductos.filter((prod) => prod.nombre !== btn.dataset.nombre)
            //Seteo el array filtrado para poder modificar el localstorage
            localStorage.setItem("arrayProductosStorage", JSON.stringify(arrayProductos))
            //Si el evento cumple el IF va a ejecutar la funcion borre() y va a eliminar el la card que coincida con el id 
            if (event.srcElement.nodeName == "BUTTON") {
                borre(e.path[3].id)
            }
    
        })   
    })
}


//////////////////////////////////////// Local storage //////////////////////////////////////////// 

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("arraySeccionesNoRepeatStorage")) {

        //Llamo a los array que no estan en el localStorage
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

    }


})

