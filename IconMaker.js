

/* 

Math for figuring out tint color of background... find out where to put this later.. ok
    New value = current value + ((255 - current value) x tint factor)
    https://maketintsandshades.com/about

*/

let optionsArray = [["png/puppy0.jpg", "png/puppy1.jpg", "png/puppy2.jpg"],
["png/kittens0.jpg", "png/kittens1.jpg"],
["png/bunny0.jpg", "png/bunny1.jpg", "png/bunny2.jpg", "png/bunny3.jpg"]];


let previousIndex = -1;

function changeImg(optionsArrayIndex) {
    deleteImg();
    
    let closetBottom = document.getElementById("closet-bottom");
    
    for (let i = 0; i < optionsArray[optionsArrayIndex].length; i++) {
        let drawerIcons = document.createElement('img');
        drawerIcons.id = "closet-bottom-imgs-" + i;
        drawerIcons.src = optionsArray[optionsArrayIndex][i];
        drawerIcons.classList.add("drawer-icons");
        
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

