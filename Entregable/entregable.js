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
    
    let originalImage = null

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
                originalImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
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

    let uploadNewImage = e => {
        reader.onload = () => {
            myImage.onload = () => {
                canvas.width = myImage.width;
                canvas.height = myImage.height; 
                ctx.drawImage(myImage, 0, 0);
                originalImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
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

    // Quitar filtros

    function removeFilter() {
        ctx.putImageData(originalImage, 0, 0);
    }

    let filterRemover = document.getElementById('remove-filter');
    filterRemover.addEventListener('click', removeFilter);

    // Filtro Sepia
    // Algoritmo tomado de: https://www.techrepublic.com/blog/how-do-i/how-do-i-convert-images-to-grayscale-and-sepia-tone-using-c/
    function applySepia() {
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
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
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
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


    // Filtro Blur

    function getRed(imageData, x, y) {
       index = (x + y * imageData.width) * 4;
       return imageData.data[index]; 
    }

    function getGreen(imageData, x, y) {
        index = (x + y * imageData.width) * 4;
        return imageData.data[index+1] 
    }

    function getBlue(imageData, x, y) {
        index = (x + y * imageData.width) * 4;
        return imageData.data[index+2]; 
    }

    function applyBlur() {

        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      
        for (var x = 0; x<imageData.width; x++) {
            for (var y = 0; y<imageData.height; y++) {

                // Tomo los 9 pixeles de la matriz (el actual más ocho), de cada uno tomo su color y lo transformo en el promedio de todos los pixeles de la matriz
                let r = (getRed(imageData, x, y) + getRed(imageData, x-1, y+1) + getRed(imageData, x, y+1) + getRed(imageData, x+1, y+1) + getRed(imageData, x+1, y) + getRed(imageData, x+1, y-1) + getRed(imageData, x, y-1) + getRed(imageData, x-1, y-1) + getRed(imageData, x-1, y)) / 9;
                let g = (getGreen(imageData, x, y) + getGreen(imageData, x-1, y+1) + getGreen(imageData, x, y+1) + getGreen(imageData, x+1, y+1) + getGreen(imageData, x+1, y) + getGreen(imageData, x+1, y-1) + getGreen(imageData, x, y-1) + getGreen(imageData, x-1, y-1) + getGreen(imageData, x-1, y)) / 9;
                let b = (getBlue(imageData, x, y) + getBlue(imageData, x-1, y+1) + getBlue(imageData, x, y+1) + getBlue(imageData, x+1, y+1) + getBlue(imageData, x+1, y) + getBlue(imageData, x+1, y-1) + getBlue(imageData, x, y-1) + getBlue(imageData, x-1, y-1) + getBlue(imageData, x-1, y)) / 9;

                // RGB en cada pixel = al promedio obtenido anteriormente
                imageData.data[(x + y * imageData.width) * 4] = r
                imageData.data[((x + y * imageData.width) * 4) +1] = g
                imageData.data[((x + y * imageData.width) * 4) +2] = b
            }
            
        };
        ctx.putImageData(imageData, 0, 0);
    }

    let blurFilterApplier = document.getElementById('blur-filter');
    blurFilterApplier.addEventListener('click', applyBlur);

    // Filtro Binarización
    // Información tomada de https://craftofcoding.wordpress.com/2017/02/13/image-binarization-1-introduction/
    // Se tomará Threshold = 126 

    function applyBinarization() {
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;

        for (var i = 0; i<data.length; i += 4) {
            // Calculo valor del pixel promediando RGB
            // Si el valor supera el umbral es blanco sino, negro.
            let value = (data[i] + data[i+1] + data[i+2]) / 3 > 126 ? 255 : 0;

            // Mismo valor para todo el pixel
            data[i] = value; // R
            data[i+1] = value; // G
            data[i+2] = value; // B
        };
        ctx.putImageData(imageData, 0, 0);
    };

    let binarizationFilterApplier = document.getElementById('binary-filter');
    binarizationFilterApplier.addEventListener('click', applyBinarization);

    // Fórmulas obtenidas desde https://stackoverflow.com/a/17243070/15109471
    // Conversión RGB a HSB

    function RGBtoHSV(r, g, b) {
        if (arguments.length === 1) {
            g = r.g, b = r.b, r = r.r;
        }
        var max = Math.max(r, g, b), min = Math.min(r, g, b),
            d = max - min,
            h,
            s = (max === 0 ? 0 : d / max),
            v = max / 255;
    
        switch (max) {
            case min: h = 0; break;
            case r: h = (g - b) + d * (g < b ? 6: 0); h /= 6 * d; break;
            case g: h = (b - r) + d * 2; h /= 6 * d; break;
            case b: h = (r - g) + d * 4; h /= 6 * d; break;
        }
    
        return {
            h: h,
            s: s,
            v: v
        };
    };

    // Conversión HSB a RGB

    function HSVtoRGB(h, s, v) {
        var r, g, b, i, f, p, q, t;
        if (arguments.length === 1) {
            s = h.s, v = h.v, h = h.h;
        };
        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0: r = v, g = t, b = p; break;
            case 1: r = q, g = v, b = p; break;
            case 2: r = p, g = v, b = t; break;
            case 3: r = p, g = q, b = v; break;
            case 4: r = t, g = p, b = v; break;
            case 5: r = v, g = p, b = q; break;
        };
        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
        };
    };

    // Filtro brillo
    function applyBrightness(value) {
        // Remuevo filtro para que no sea acumulativo
        removeFilter();

        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;
        for (var i = 0; i<data.length; i += 4) {
            let r = data[i];
            let g = data [i+1];
            let b = data [i+2];

            // Hago la conversión
            let hsv = RGBtoHSV(r, g, b);
            // Altero el valor de brillo de todo el pixel de acuerdo al valor del range input
            let newV = hsv.v += value*10;
            // Reconvierto a RGB
            let newRgb = HSVtoRGB(hsv.h, hsv.s, newV);
            // Asigno nuevos valores a todo el pixel
            data[i] = newRgb.r;
            data[i+1] = newRgb.g;
            data[i+2] = newRgb.b;
        };
        ctx.putImageData(imageData, 0, 0);
    };

    let brightnessRange = document.getElementById('inputRangeBright');
    brightnessRange.addEventListener('input', (e) => applyBrightness(e.target.value));

    // 3. Aplicar al menos cuatro filtros a la imagen actual, 
    //por ejemplo: negativo, brillo, binarización y sepia.

    // 4. Aplicar al menos dos de los siguientes filtros a la imagen: 
    //Saturación, Detección de Bordes, Blur.

    // 5. Permitir guardar en disco la imagen, o descartar la imagen y 
    //comenzar con un lienzo vacío. 
});