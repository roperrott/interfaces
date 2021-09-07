//Ejercicio 4
//Especificar la función para pintar un cuadrado utilizando un gradiente de la siguiente forma: 

let canvas = document.getElementById("canvas");
let ctx2 = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;

let r = 0;
let g = 0;
let b = 0;
let a = 255; // 

let imageData = ctx2.createImageData(width, height); 

let x = 0;
let y = 0;


drawRect(imageData, a);

ctx2.putImageData(imageData, x, y) * 4;

//para que un valor sea gris todos los valores deben ser iguales
//dibujar rectangulo
function drawRect(imageData, a){
    //recorre todo el canvas, la matrix, x --> ancho y--> height
    for(let x = 0; x < width; x++){
        for(let y = 0; y < height; y++){
           let gradient = (y * 255) / height; 
            // el color vaya cambiando de acuerdo a cada iteracion en proporcion de nuestra altura
            setPixel(imageData, x, y, gradient, gradient, gradient, a);
        }
    }
}

//siempre igual
function setPixel(imageData, x, y, r, g, b, a){
    let index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
}


//Ejercicio 6
//Pintar un rectángulo en pantalla, utilizando tres o cuatro colores en un gradiente. 
//Los tres colores deben ser armonías tonales. Puede ser en el eje X o Y.

//Ejercicio 7
//Cargar una Imagen desde disco o URL 
//a. Dibujar la imagen dentro del canvas 
//b. Implementar una función que aplique el filtro de escala de grises y muestre el resultado en el canvas. 
