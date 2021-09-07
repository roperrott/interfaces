//Ejercicio 6
//Pintar un rectángulo en pantalla, utilizando tres o cuatro colores en un gradiente. 
//Los tres colores deben ser armonías tonales. Puede ser en el eje X o Y.

let canvas = document.querySelector("#canvas1");
let ctx2 = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;

for(let index = 0; index < 20; index++){
    ctx2.fillStyle = randomRGBA();
    ctx2.beginPath();
    ctx2.arc(Math.round(Math.random() * width), Math.round(Math.random() * height), Math.round(Math.random() * 20), 0, 2 * Math.PI);
    ctx2.fill();
    ctx2.closePath();
}

for(let index = 0; index < 20; index++){
    ctx2.fillStyle = randomRGBA();
    ctx2.fillRect(Math.random() * width, Math.round(Math.random() * height), Math.round(Math.random() * 50), Math.round(Math.random() * 50));
}


function randomRGBA(){
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    let a = 255;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}