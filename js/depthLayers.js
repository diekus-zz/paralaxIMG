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
    ctx.fillStyle = 'cornflowerblue';
    ctx.fillRect(10,10,100,100);
    createImage();
}

function createImage(){
    var i = new Image();
    i.src = 'i/dduck.gif';
    i.addEventListener('load', function(event){
        ctx.drawImage(i, 0,0);
        imageDataTest();
    });    
}

function imageDataTest(){
    cd = ctx.getImageData(10, 10, 800, 800);
    console.log(cd);
    for(i = 0; i < cd.data.length; i++){
        if((i+1)%4==0) //alpha value
            continue;
        cd.data[i] = (cd.data[i]+100)%255;
    }
    //put the data back in
    ctx.putImageData(cd, 10,10);
}

//determines how bright is a color
function brightness(r, g, b){
    return Math.sqrt(.241*r*r + .691*g*g + .068*b*b);
}