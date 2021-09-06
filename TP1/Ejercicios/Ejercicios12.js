//Ejercicio1
let matrix = [];
let maxNum = 0;
let maxPar = 0;
let minImpar = 0;
let average = [];
let parcial = 0;

//planteo de la matriz
for (let i=0; i<10; i++){
    matrix[i]=[];
    for(let j=0; j<10; j++){
        matrix[i][j] = Math.floor(Math.random()*1000);
        //punto a
        //Escribir una función que retorne el valor máximo de toda la matriz 
        if(maxNum < matrix[i][j]){
            maxNum = matrix[i][j];
        }
        //punto b
        //Escribir una función que retorne el valor máximo contenido en 
        //las filas pares y el valor mínimo en las filas impares 
        if(j % 2 == 0 && maxPar < matrix[i][j]){
            maxPar = matrix[i][j];
        }
        if(j % 2 != 0 && minImpar > matrix[i][j]){
            maxImpar = matrix[i][j];
        }
    }
}
//punto c
//Calcular el valor promedio de cada fila y guardarlos en un arreglo. 
for(let j= 0; j<10; j++){
    let column = 0;
    for(let i=0; i<10; i++){
        parcial += matrix[i][j];
        column++;
    }
    average.push(parcial /  column);
}
console.log(matrix);
console.log(maxNum);
console.log(maxPar);
console.log(minImpar);

for(let i=0; i < average.length; i++){
    console.log(average[i]);
}

//Ejercicio 2
//Pintar una región rectangular de un color utilizando el Contexto de HTML5. 
//coordenada x arriba a la izquierda del rect
//coordenada y arriba a la izquierda del rect
//ancho
//alto
let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

//piramide
ctx.fillStyle = "#7ECC49"
ctx.fillRect(225, 00, 150, 100);

ctx.fillStyle = "#FF9933"
ctx.fillRect(75, 100, 150, 100);

ctx.fillStyle = "#AF38EB"
ctx.fillRect(225, 100, 150, 100);

ctx.fillStyle = "#FF9933"
ctx.fillRect(375, 100, 150, 100);

ctx.fillStyle = "#DB4035"
ctx.fillRect(00, 200, 150, 100);

ctx.fillStyle = "#158FAD"
ctx.fillRect(150, 200, 150, 100);

ctx.fillStyle = "#E05194"
ctx.fillRect(300, 200, 150, 100);

ctx.fillStyle = "#6ACCBC"
ctx.fillRect(450, 200, 150, 100);





