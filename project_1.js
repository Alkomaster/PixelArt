let div = document.querySelectorAll(".color");
let width = window.screen.width;
let height = document.body.clientHeight;
let barheight = document.getElementById("upBar").offsetHeight;
let gridWidth = document.getElementById("sliderWidth");
let gridWidthSpan = document.getElementById("sliderWidthSpan");
let gridHeight = document.getElementById("sliderHeight");
let gridHeightSpan = document.getElementById("sliderHeightSpan");
let eraseButton = document.getElementById("Erase");
let paintButton = document.getElementById("Paint");
let colorChoice = document.getElementById("colorInput");
let clearGridButton = document.getElementById("ClearGrid");
let createGridButton = document.getElementById("CreateGrid");

let color = "red"
let erase = false
let draw = false
let canerase = false
let candraw = true

let events = {
    mouse : {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup"
    },
    touch : {
        down: "touchstart",
        mobe: "touchmove",
        up: "touchend",
    }
}

let deviceType = "";

const isTouchDevice = () => {
    try {
        document.createEvent("TouchEvent"); //?
        deviceType = "touch";
        return true;
    } catch (e) {
        deviceType = "mouse";
        return false;
    }
};
 

gridWidth.max = width/52;
gridHeight.max = (window.innerHeight-barheight)/52;


gridWidth.addEventListener("input", () => {
    gridWidthSpan.innerHTML = gridWidth.value.toString().padStart(2, '0');
})

gridHeight.addEventListener("input", () => {
    gridHeightSpan.innerHTML = gridHeight.value.toString().padStart(2, '0');
})

eraseButton.addEventListener("click", () => {
    canerase = true;
    candraw = false;
})

paintButton.addEventListener("click", () => {
    canerase = false;
    candraw = true;
})

clearGridButton.addEventListener("click", () =>{
    for (let i = 0; i < div.length; i++){
        div[i].remove()
    }
}
)

createGridButton.addEventListener("click", () =>{
    div = []
    document.getElementById("fleeex").innerHTML = ``;
    for (let i = 0; i < (gridWidth.value * gridHeight.value); i++){
        document.getElementById("fleeex").innerHTML += `<div class="color"></div>`;
    }
    document.getElementById("fleeex").style.setProperty('grid-template-columns', 'repeat(' + gridWidth.value + ', 52px)'); //!
    div = document.querySelectorAll(".color");
    addlisteners();
})










function addlisteners(){
    for (let i = 0; i < div.length; i++){
        div[i].addEventListener("mousedown", ()=>{
            console.log(1)
            if (!erase && candraw){
                draw = true;
                color = colorChoice.value
            }
            else if (!draw && canerase){
                erase = true;
            }
        });

        div[i].addEventListener("mousemove", () =>{
            if (draw){
                div[i].style.background = color;
            }
            if (erase){
                div[i].style.background = "white";
            }
        });

        div[i].addEventListener("mouseup", ()=>{
            draw = false;
            erase = false;
        });
        
        div[i].addEventListener("touchstart", () =>{

            if (candraw){
                color = colorChoice.value
                div[i].style.background = color;
            }
            if (canerase){
                div[i].style.background = "white";
            }
        });
    }
}

addlisteners()