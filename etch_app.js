
let colour = document.getElementById("colourBtn");
let randomColour = document.getElementById("randomColBtn");
let erase = document.getElementById("eraseBtn");
let clear = document.getElementById("clearGridBtn");

let colouring = 2;
colour.addEventListener("click", function onClick(e){
  colouring = 1;
})
erase.addEventListener("click", function onClick(e){
  colouring = 2;
})
randomColour.addEventListener("click", function onClick(e){
  colouring = 3;
})
let slider = document.getElementById("myRange");

let output1 = document.getElementById("demo1");
let output2 = document.getElementById("demo2");
output1.innerHTML = slider.value;
output2.innerHTML = slider.value;
slider.oninput = function() {
  output1.innerHTML = this.value;
  output2.innerHTML = this.value;
}

function getRandomRgb() {
  let num = Math.round(0xffffff * Math.random());
  let r = num >> 16;
  let g = num >> 8 & 255;
  let b = num & 255;
  return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

let root = document.querySelector(':root');
let rootStyles = getComputedStyle(root);
let columns= rootStyles.getPropertyValue('--columns');
console.log("--columns: "+columns); 

function createStartingGrid(x) {
  root.style.setProperty('--columns', x);
  for (let i=0; i<x**2; i++){
    let cell = document.createElement("div");
    document.getElementById("container").appendChild(cell);
    cell.id = "cell";
    cell.setAttribute("style", "background:white");
    //document.getElementById("container").setAttribute("style", "grid-template-columns: repeat(50,auto);")
    cell.addEventListener("mouseover", function onClick(e){
      if (colouring == 1){
        cell.style.background = "black";
      } else if (colouring == 2){
        cell.style.background = "white";
      } else if(colouring == 3){
        cell.style.background = getRandomRgb();
      }
    });  
    clear.addEventListener("click", function onClick(e){
      cell.style.background = "white";
      colouring = 2;
    })
    slider.addEventListener("mouseup", function(e){
      cell.remove();
      
    })
  } 
  
} 
createStartingGrid(20);

slider.addEventListener("mouseup", function(e){
  console.log("slider val = "+slider.value);
  createStartingGrid(slider.value);
});
