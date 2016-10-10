var cnv, ctx;
var imgdepthmap, imgpicture;
var cddepth, cdimage;
var near, far;

//init function after page is loaded
document.addEventListener("DOMContentLoaded", function(event) {
    initCanvas();
});

//initializes the canvas and the drawing element
function initCanvas(){
    cnv = document.getElementById('mycanvas');
    ctx = cnv.getContext('2d');
    cnv.setAttribute('width', window.innerWidth);
    cnv.setAttribute('height', window.innerHeight);
}

//loads and creates in memory the needed images 
function createImages(myimage, mydepthmap){
    imgdepthmap = new Image();
    imgdepthmap.src = mydepthmap;
    imgdepthmap.addEventListener('load', function(event){
        console.log('depth map loaded ...');
        ctx.drawImage(imgdepthmap, 0,0);
        cddepth = ctx.getImageData(0, 0, cnv.width, cnv.height);
    }); 

    imgpicture = new Image();
    imgpicture.src = myimage;
    imgpicture.addEventListener('load', function(event){
        console.log('image loaded ...');
        ctx.drawImage(imgpicture, 0,0);
        cdimage = ctx.getImageData(0, 0, cnv.width, cnv.height);
        createNewLayer();
    });
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

//determines how bright is a color
function brightness(r, g, b){
    return Math.sqrt(.241*r*r + .691*g*g + .068*b*b);
}

//determines if a x value is between or equal to a or b
function between(x, a, b){
    return a<=x && x<=b;
}

function runExample(near, far){
    createImages('i/dog.png', 'i/dogdepthmap.png', createNewLayer);
    ctx.clearRect(0,0,cnv.width,cnv.height);
}