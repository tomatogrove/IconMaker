

/* 

Math for figuring out tint color of background... find out where to put this later.. ok
    New value = current value + ((255 - current value) x tint factor)
    https://maketintsandshades.com/about

*/

let optionsArray = [["images/base0.png"],
["images/shirt0.png", "images/shirt1.png", "images/shirt2.png"],
["images/makeup0.png", "images/makeup1.png"]];

function draw() {
    let canvas = document.getElementById('test');
    if (canvas.getContext) {
        let context = canvas.getContext('2d');
        
        let testImg = [];

        for (let i = 0; i < 3; i++) {
            testImg[i] = document.createElement('img');
            testImg[i].onload = function() {
                context.drawImage(testImg[i], 0, 0);
            }
            testImg[i].id = optionsArray[i][0].split("/")[1].split(".")[0];
            testImg[i].src = optionsArray[i][0];
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
            changeCanvas(drawerIcons.src, drawerIcons.id, optionsArrayIndex, i);
            alert("poggy woggy");
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
    deleteCanvas();

}

function deleteCanvas() {

}

