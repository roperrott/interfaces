
//Ejercicio 7
//Cargar una Imagen desde disco o URL 
//a. Dibujar la imagen dentro del canvas 
//b. Implementar una función que aplique el filtro de escala de grises y muestre el resultado en el canvas. 
//HACER

window.onload = function() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var img = document.getElementById("scream");
    ctx.drawImage(img, 10, 10);
};