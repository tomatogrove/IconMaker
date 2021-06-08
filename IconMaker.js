

/* 

Math for figuring out tint color of background... find out where to put this later.. ok
    New value = current value + ((255 - current value) x tint factor)
    https://maketintsandshades.com/about

*/
/*
Two arrays that keep track of the images and order.
layerCounter - the indices within it represent each outer array within optionsArray. The numbers 
within each index represent which image is chosen.
    ex: [0,2,1,0,...] would mean that base0, shirt2, makeup1, and glasses0 are all selected.
optionsArray - a two dimensional array that organizes each image path.
*/
let layerCounter = [-1,-1,-1,-1,-1,-1];
let optionsArray = [["images/base0.png"],
["images/shirt0.png", "images/shirt1.png", "images/shirt2.png"],
["images/makeup0.png", "images/makeup1.png"],
["images/glasses0.png","images/glasses1.png"]];

/* 
A function that is run when the page loads. It draws the first layers of the icon.
*/
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
                canvas.style.zIndex = i;

                testImg[i].src = optionsArray[i][0];

                layerCounter[i] = 0;
                enterDiv.append(canvas);
        }
    }
}

/*
previousIndex - counter that works similary to layerCounter except with only one variable.

changeImg - function that changes the tabslider icon selected when clicked on. It displays 
the images associated with the outer index of optionsArray.
*/
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

/*
deleteImg - deletes the images displayed in the bottom half of the "closet"
*/
function deleteImg() {
    if (previousIndex >= 0) {
        for (let i = 0; i < optionsArray[previousIndex].length; i++) {
            let removeImg = document.getElementById("closet-bottom-imgs-" + i);
            removeImg.remove();
        }
    }
    
}

/*
changeCanvas - a function that is activated on clicking one of the images in the 
bottom half of the closet. It creates a new canvas element and produces an image
that is identical to the one clicked on.
*/
function changeCanvas(imgSrc, imgId, outerIndex, innerIndex) {
    deleteCanvas(outerIndex, innerIndex);

    let enterDiv = document.getElementById('icon-workstation');
    let canvas = document.createElement('canvas');
    enterDiv.appendChild(canvas);

    if (canvas.getContext) {
        let context = canvas.getContext('2d');

        let canvasLayer = document.createElement('img');
        canvasLayer.src = imgSrc;

        canvas.id = "canvas-layer" + outerIndex;
        canvas.classList.add("canvas-layers");
        canvas.style.zIndex = outerIndex;

        layerCounter[outerIndex] = innerIndex;

        return [context, canvasLayer];
    }

}

/*
deleteCanvas - a function that runs within changeCanvas. It deletes any canvas elements that may
share an id.
*/ 
function deleteCanvas(outerIndex, innerIndex) {
    console.log(layerCounter[outerIndex],"innerIndex = " + innerIndex, "outerIndex = " + outerIndex);
    if (layerCounter[outerIndex] >= 0) {
        let removeCanvas = document.getElementById("canvas-layer" + outerIndex);
        removeCanvas.remove();
    }
}

/*
downloadImage - a function that consolodates and downloads the icon created.
*/
function downloadImage() {
    let canvas = document.createElement('canvas');
    let saveButton = document.getElementById("save-button");
    let anchor = document.getElementById("anchor");

    for (let i = 0; i < layerCounter.length; i++) {
        if (layerCounter[i] >= 0) {
            let context = canvas.getContext('2d');

            let canvasLayer = document.createElement('img');
            canvasLayer.src = optionsArray[i][layerCounter[i]];
            
            saveButton.click = function() {
                context.drawImage(canvasLayer, 0, 0);
                console.log("image layer " + optionsArray[i][layerCounter[i]] + " added");
            }
        }
    }

    let imgToDataURL = canvas.toDataURL();
    anchor.href = imgToDataURL;
    anchor.download = "your-icon.png";
}

