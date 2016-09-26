var cnv, ctx, cd;

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    initCanvas();
});


function initCanvas(){
    cnv = document.getElementById('mycanvas');
    ctx = cnv.getContext('2d');
    cnv.setAttribute('width', window.innerWidth);
    cnv.setAttribute('height', window.innerHeight);

    drawCanvas();
}

function drawCanvas(){
    // ctx.fillStyle = 'cornflowerblue';
    // ctx.fillRect(10,10,100,100);
    createImage();
}

function createImage(){
    var imgdepthmap = new Image();
    i.src = 'i/depthmaptest.png';
    i.addEventListener('load', function(event){
        ctx.drawImage(i, 0,0);
        imageDataTest();
    }); 

    var imgpicture = new Image();
    i.src = 'i/.png';
    i.addEventListener('load', function(event){
        ctx.drawImage(i, 0,0);
        imageDataTest();
    });
}

function imageDataTest(){
    cd = ctx.getImageData(0, 0, cnv.width, cnv.height);
    console.log(cd);
    for(i = 0; i < cd.data.length; i++){
        if((i+1)%4==0) //alpha value
            continue;
        //cd.data[i] = (cd.data[i]+100)%255; //changes color
    }
    //put the data back in
    //ctx.putImageData(cd, 10,10);
    var nl = createNewLayer(cd, 100, 255);
    ctx.putImageData(nl,0,0);
}

//determines how bright is a color
function brightness(r, g, b){
    return Math.sqrt(.241*r*r + .691*g*g + .068*b*b);
}

function between(x, a, b){
    return a<=x && x<=b;
}

//creates a new layer of ImageData based on a brightness interval that allows  
function createNewLayer(imageData, depthData, near, far){
    var newLayerData = new ImageData(depthData.width, depthData.height);
    //create a new canvas to paint the matching parts of the image

    for(i = 0; i < depthData.data.length; i = i+4){
        if(between(brightness(depthData.data[i], depthData.data[i+1], depthData.data[i+2]), near, far)){
            newLayerData.data[i] = imageData.data[i];
            newLayerData.data[i+1] = imageData.data[i+1];
            newLayerData.data[i+2] = imageData.data[i+2];
            newLayerData.data[i+3] = imageData.data[i+3];
        }
    }
    return newLayerData;
}
