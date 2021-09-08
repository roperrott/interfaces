// Desarrollar una aplicación web similar al clásico Paint de Windows que provea 
//de la siguiente funcionalidad:
// 1. Barra de herramientas con, al menos, 
//lápiz (que pueda elegir color del lápiz) y goma de borrar, y su funcionalidad.

window.addEventListener('load', ()=>{
        
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    // getBoundingClientRect nos devuelve el left y el top con respecto a la pantalla donde esta el canvas.
    // Para determinar las coordenadas
    let position = canvas.getBoundingClientRect(); 
    let x = 0;
    let y = 0;
    let drawing = false;
    let color = "black";
    let range = 1;
    canvas.height = 600;
    canvas.width = 1200;

    document.getElementById('inputColor').addEventListener('input', (e) => colorDefinition(e));
    document.getElementById('inputRange').addEventListener('input', (e) => rangeDefinition(e));

    function colorDefinition(e){
        console.log(e.currentTarget.value);
        color = e.currentTarget.value;
    };

    function rangeDefinition(e){
        range = e.currentTarget.value;
    }

    // let btnNewCanva = document.getElementById('newCanva');
    // btnNewCanva.addEventListener(()=>{
        
    // });


    let btnDraw = document.getElementById('pencil');
    btnDraw.addEventListener("click", function(e){

        //cuando hace click, el e trae los valores donde hizo click el usuario en la pantalla
        // a la posicion en x e y sobre la pantalla le resto la posicion donde esta mi canvas
        canvas.onmousedown = function(e){
            drawing = true;
            x = e.clientX - position.left;
            y = e.clientY - position.top;
            drawing = true;
        };

        //cuando se mueve
        //e.client - position primero es mi posicion actual 
        //luego en la siguiente linea actualizo mis coordenadas de las que parto
        canvas.onmousemove = function(e){
            if(drawing == true){
                draw(x, y, e.clientX - position.left, e.clientY - position.top);
                x = e.clientX - position.left;
                y = e.clientY - position.top;
            }
        };

        //cuando deja de dibujar
        //if drawing es true dibujo la ultima recta de la linea
        //y luego actualizo los valores
        canvas.onmouseup = function(e) {
            if(drawing == true){
                draw(x, y, e.clientX - position.left, e.clientY - position.top);
                x = 0;
                y = 0;
                drawing = false;
            }
        };

        //funcion que dibuja el trazo ante unas coordenadas iniciales
        // y unas finales
        // moveTo muevo el puntero a esas coordenadas
        //el lineTo dibuja una linea hasta esos valores
        //stroke determina que son lineas, no rellena areas
        //y cerramos la ruta
        function draw(x1, y1, x2, y2){
            if(drawing == true){
                ctx.beginPath();
                ctx.strokeStyle = color;
                ctx.lineWidth = range;
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
                ctx.closePath();
            }else{
                return;
            }
           
        }
    });

    // let btnErase = document.getElementById('eraser');
    // btnErase.addEventListener(()=>{
        
    // });

    // 2. Permitir iniciar con un lienzo en blanco, 
    //o partir de una imagen que será cargada desde disco 
    //(Usar un diálogo para elegir la imagen)

    // 3. Aplicar al menos cuatro filtros a la imagen actual, 
    //por ejemplo: negativo, brillo, binarización y sepia.

    // 4. Aplicar al menos dos de los siguientes filtros a la imagen: 
    //Saturación, Detección de Bordes, Blur.

    // 5. Permitir guardar en disco la imagen, o descartar la imagen y 
    //comenzar con un lienzo vacío.


});