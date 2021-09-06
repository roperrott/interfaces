//Ejercicio 3
//Pintar una región rectangular de un color utilizando la estructura de ImageData. 

let canvas = document.getElementById("canvas");
let ctx2 = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;

let r = 255;
let g = 50;
let b = 0;
let a = 1; // 
let imageData = ctx2.createImageData(width, height); 
//nos devuelve un objeto ImageData, que representa un arreglo vacio

drawRect(imageData, r, g, b, a);
//para que un valor sea gris todos los valores deben ser iguales
//dibujar rectangulo

let x = 0;
let y = 0;

ctx2.putImageData(imageData, x, y, r, g, b, a) * 4;
function drawRect(imageData, r, g, b, a){
    //recorre todo el canvas, x --> ancho
    for(let x = 0; x < width; x++){
        for(let y = 0; y < height; y++){
            // el color vaya cambiando de acuerdo a cada iteracion en proporcion de nuestra altura
            setPixel(imageData, x, y, r, g, b, a);
        }
    }
}

function setPixel(imageData, x, y, r, g, b, a){
    let index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
}
