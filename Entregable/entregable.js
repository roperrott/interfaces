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
    let colorPencil = "black";
    let range = 1;
    let rangeColor = 1;
    let rangeEraser = 1;
    canvas.height = 600;
    canvas.width = 1200;

    let btnColor = document.getElementById('inputColor');
    btnColor.addEventListener('input', (e) => colorDefinition(e));

    let btnRange = document.getElementById('inputRangeColor');
    btnRange.addEventListener('input', (e) => rangeDefinitionColor(e));

    let btnRangeEraser =  document.getElementById('inputRangeEraser');
    btnRangeEraser.addEventListener('input', (e) => rangeDefinitionEraser(e));

    function colorDefinition(e){
        colorPencil = e.currentTarget.value;
        color = colorPencil;
    };

    function rangeDefinitionColor(e){
        rangeColor = e.currentTarget.value;
        range = rangeColor;
    };

    function rangeDefinitionEraser(e){
        rangeEraser = e.currentTarget.value;
        range = rangeEraser;
    };

    let btnDraw = document.getElementById('pencil');
    btnDraw.addEventListener("click", (e) => selectPencil(e));

    //selecciona el lapiz y setea color y rango
    function selectPencil(e){
        color = colorPencil;
        range = rangeColor;
        drawOnCanvas(e);
    };


    //Borra, selecciona el color blanco y el rango seleccionado
    let btnErase = document.getElementById('eraser');
    btnErase.addEventListener('click', (e)=> {
        color = "white";
        range = rangeEraser;
        drawOnCanvas(e);
    });

    function drawOnCanvas(e){
  
        //cuando hace click, el e trae los valores donde hizo click el usuario en la pantalla
        // a la posicion en x e y sobre la pantalla le resto la posicion donde esta mi canvas
        canvas.onmousedown = function(e){
            console.log(e);
            x = e.x - position.left;
            y = e.y - position.top;
            drawing = true;
            draw(x, y, x, y); 
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
                ctx.lineCap = "round";
                ctx.lineJoin = "round";
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
    };

    // 2. Permitir iniciar con un lienzo en blanco, 
    //o partir de una imagen que será cargada desde disco 
    //(Usar un diálogo para elegir la imagen)

    //Limpia el lienzo
    document.getElementById('clear').addEventListener('click', (e)=> clearCanvas());

    function clearCanvas(){
        ctx.fillStyle = "white";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    let modalContainer = document.getElementById('modal-container');
    let uploadImage = document.getElementById('upload-image');

    let btnNewImage = document.getElementById('newImage');
    btnNewImage.addEventListener('click', () => {
        console.log("in");
        modalContainer.classList.add('show');
    });

    uploadImage.addEventListener('click', ()=>{
        modalContainer.classList.remove('show');
    });

    //cargar en canvas
   
    let reader = new FileReader();
    let myImage = new Image();
    let data;

    let uploadNewImage = e => {
        reader.onload = () => {
            myImage.onload = () => {
               // canvas.width = myImage.width; OPCIONAL
               // canvas.height = myImage.height; OPCIONAL
                ctx.drawImage(myImage, 0, 0);
                data = ctx.getImageData(0, 0, canvas.width, canvas.height);
            };
            myImage.src = reader.result
        };
        reader.readAsDataURL(e.target.files[0])
    };

    let imageLoader = document.getElementById('newImageInput');
    imageLoader.addEventListener('change', uploadNewImage);
    
    // Guardado de la imagen en disco
  
    function downloadImage() {
        let imagePath = canvas.toDataURL();
        // Creamos un elemento del tipo anchor 
        let link = document.createElement('a');
        link.href = imagePath;
        link.download = 'image.png';
        // Simulamos click del usuario en el link
        link.click();
    }

    let imageDownloader = document.getElementById('downloader');
    imageDownloader.addEventListener('click', downloadImage);

    // Quitar filtros NO ESTA FUNCIONANDO DEL TODO BIEN

    function removeFilter() {
        ctx.putImageData(data, 0, 0);
    }

    let filterRemover = document.getElementById('remove-filter');
    filterRemover.addEventListener('click', removeFilter);

    // Filtro Sepia
    // Algoritmo tomado de: https://www.techrepublic.com/blog/how-do-i/how-do-i-convert-images-to-grayscale-and-sepia-tone-using-c/
    function applySepia() {
        var imageData = ctx.getImageData(0,0,canvas.width, canvas.height);
        var data = imageData.data;

        for(var i = 0; i<data.length; i += 4) {
            data[i] = (data[i] * 0.393) + (data[i+1] * 0.769) + (data[i+2] * 0.189); // R
            data[i+1] = (data[i] * 0.349) + (data[i+1] * 0.686) + (data[i+2] * 0.168); // G
            data[i+2] = (data[i] * 0.272) + (data[i+1] * 0.534) + (data[i+2] * 0.131); // B
        }
        ctx.putImageData(imageData, 0, 0);
    }

    let sepiaFilterApplier = document.getElementById('sepia-filter');
    sepiaFilterApplier.addEventListener('click', applySepia);

    // Filtro negativo

    function applyNegative() {
        var imageData = ctx.getImageData(0,0,canvas.width, canvas.height);
        var data = imageData.data;

        for (var i = 0; i<data.length; i += 4) {
            // El filtro negativo se produce al restar del máximo valor posible (255) el valor del pixel.
            data[i] = 255 - data[i]; // R
            data[i+1] = 255 - data[i+1]; // G
            data[i+2] = 255 - data[i+2]; // B
        }
        ctx.putImageData(imageData, 0, 0);
    }

    let negativeFilterApplier = document.getElementById('negative-filter');
    negativeFilterApplier.addEventListener('click', applyNegative);



    // 3. Aplicar al menos cuatro filtros a la imagen actual, 
    //por ejemplo: negativo, brillo, binarización y sepia.

    // 4. Aplicar al menos dos de los siguientes filtros a la imagen: 
    //Saturación, Detección de Bordes, Blur.

    // 5. Permitir guardar en disco la imagen, o descartar la imagen y 
    //comenzar con un lienzo vacío. 
});