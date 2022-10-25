const arraySecciones = []
const arrayProductos = []


class Menu {
    constructor(nombre,descripcion,precio,categoria) {
        // this.id = id
        this.nombre = nombre
        this.descripcion = descripcion
        this.precio = precio
        this.categoria = categoria
    }

}



let btnguardoSection = document.getElementById("btnguardoSection")

btnguardoSection.addEventListener("click", () => {
    cargoSectionArray();
   
})

// Funcion que carga las secciones en el arra yde secciones

function cargoSectionArray() {
    let inputCrearSection = document.getElementById("inputCrearSection").value
    arraySecciones.push(inputCrearSection)
    creoSección();
    asignoSecciones();
    
}

// Funcion que crea las secciones

function creoSección() {

    let ulLista = document.getElementById("ulSecciones")
    let li = document.createElement("li")
    let nombreSeccion = document.getElementById("nombreSeccion")
   
   
    
    li.classList = "list-group-item w-100 centrado mt-2 mb-2  btn bg-blanco-letrasv rounded fs-5 seleccionado"
    ulLista.classList = "list-group-item"


    arraySecciones.forEach(section => {

        li.textContent = section
        ulLista.appendChild(li)          

        li.addEventListener("click", () => {
            nombreSeccion.textContent = section
            let filtrado = arrayProductos.filter((prod => prod.categoria === section))
            console.log(filtrado) 
         
        })   
        
    })


    document.getElementById("inputCrearSection").value = ""   

}

console.log(arrayProductos)

// Funcion que permite asignar las secciones al momento de crear los productos

function asignoSecciones () {
    let select = document.querySelector(".select")
    let option = document.createElement("option")

    arraySecciones.forEach(section => {
        option.textContent = section
        select.appendChild(option)
    
    })
    
}



//Boton para guardar los datos del producto y crearlo

let btnCreoProducto = document.getElementById("btnCreoProducto")

btnCreoProducto.addEventListener("click", () => {
    creoProductos();

    arraySecciones.forEach(section => { //// ACA LA DUDA !!!!
       
            let filtrado = arrayProductos.filter((prod => prod.categoria === section)) //// ACA LA DUDA !!!!
            console.log(filtrado) 
        
    })
    

})





// Funcion que crea el producto
function creoProductos() {
    let inputNombre = document.getElementById("inputNombre").value
    let inputDescripcion = document.getElementById("inputDescripcion").value
    let inputPrecio = document.getElementById("inputPrecio").value
    let asignarOption = document.getElementById("inputGroupSelect01").value

    let producto = new Menu (inputNombre,inputDescripcion,inputPrecio,asignarOption)

    arrayProductos.push(producto)
    reinicioInputsProducto()



    

    //Funcion para blanquear el contenido de los inputs una vez que el usuario ingreso los datos
    function reinicioInputsProducto() {

         document.getElementById("inputNombre").value = ""
         document.getElementById("inputDescripcion").value = ""
         document.getElementById("inputPrecio").value = ""
         document.getElementById("inputGroupSelect01").value = ""

    }
    

}


//Función que muestra los productos cargados 












// Se entendió perfecto, lo que puedo sugerirte es que cada objeto que crees contenga
//  una propiedad categoria de esta manera ingresaría automáticamente al array y en el
//   caso de solicitar una categoría específica, utilizando filter es posible mostrarla.

// Quedaría algo así: 

// arrayProductos = [
//     {
//         id = 001
//         nombre = "sorrentinos verdura",
//         precio = $1200,
//         categoría = "pasta rellena"
//     }
// ]
// Luego con filter() podrás obtener en un array los objetos que contengan la categoría deseada:

// const categoriaElegida = prompt('qué categoría desea'); // pasta rellena.

// const categoria = arrayProductos.filter(producto => producto.categoria === categoriaElegida);