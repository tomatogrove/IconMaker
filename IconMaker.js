

/* 

Math for figuring out tint color of background... find out where to put this later.. ok
    New value = current value + ((255 - current value) x tint factor)
    https://maketintsandshades.com/about

*/
/*
two arrays
*/
let layerCounter = [-1,-1,-1,-1,-1,-1];
let optionsArray = [["images/base0.png"],
["images/shirt0.png", "images/shirt1.png", "images/shirt2.png"],
["images/makeup0.png", "images/makeup1.png"],
["images/glasses0.png","images/glasses1.png"]];

function draw() {
    let enterDiv = document.getElementById('icon-workstation');

    let testImg = [];

    for(let i = 0; i < 3; i++){
        let canvas = document.createElement('canvas');
    
        if (canvas.getContext) {
            let context = canvas.getContext('2d');

            testImg[i] = document.createElement('img');
                testImg[i].onload = function() {
                    context.drawImage(testImg[i], 0, 0);
                }
                canvas.id = "canvas-layer" + i;
                canvas.classList.add("canvas-layers");
                testImg[i].src = optionsArray[i][0];
                testImg[i].style.zIndex = i;

                console.log(canvas.id + " is created");

                layerCounter[i] = 0;
                enterDiv.append(canvas);
        }
    }
}


let previousIndex = -1;

function changeImg(optionsArrayIndex) {
    deleteImg();
    
    let closetBottom = document.getElementById("closet-bottom");
    
    for (let i = 0; i < optionsArray[optionsArrayIndex].length; i++) {
        let drawerIcons = document.createElement('img');
        drawerIcons.id = "closet-bottom-imgs-" + i;
        drawerIcons.src = optionsArray[optionsArrayIndex][i];
        drawerIcons.classList.add("drawer-icons");
        drawerIcons.onclick = function() {
            let array = changeCanvas(drawerIcons.src, drawerIcons.id, optionsArrayIndex, i);
            let canvasLayer = array[1];
            let context = array[0];

            context.drawImage(canvasLayer, 0, 0);
        }
        
        closetBottom.appendChild(drawerIcons);  
    }

    previousIndex = optionsArrayIndex;
}

function deleteImg() {
    if (previousIndex >= 0) {
        for (let i = 0; i < optionsArray[previousIndex].length; i++) {
            let removeImg = document.getElementById("closet-bottom-imgs-" + i);
            removeImg.remove();
        }
    }
    
}

function changeCanvas(imgSrc, imgId, outerIndex, innerIndex) {
    deleteCanvas(outerIndex, innerIndex);

    let enterDiv = document.getElementById('icon-workstation');
    let canvas = document.createElement('canvas');
    enterDiv.appendChild(canvas);

    if (canvas.getContext) {
        let context = canvas.getContext('2d');

        let canvasLayer = document.createElement('img');

        canvas.id = "canvas-layer" + outerIndex;
        canvasLayer.src = imgSrc;
        canvas.classList.add("canvas-layers");
        canvasLayer.style.zIndex = outerIndex;

        console.log(canvasLayer.id + " is created");

        layerCounter[outerIndex] = innerIndex;

        return [context, canvasLayer];
    }

}

function deleteCanvas(outerIndex, innerIndex) {
    console.log(layerCounter[outerIndex],"innerIndex = " + innerIndex, "outerIndex = " + outerIndex);
    if (layerCounter[outerIndex] >= 0) {
        let removeCanvas = document.getElementById("canvas-layer" + outerIndex);
        console.log("the id that is being removed is " + "canvas-layer" + outerIndex, removeCanvas);
        let removeCanvasContext = removeCanvas.getContext('2d');
        
        removeCanvas.remove();
    }
}

