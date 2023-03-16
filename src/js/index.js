import '../css/style.scss'

// This function create new element for the counter app.
function counterBuilder(tag, clas, text) {
    element = document.createElement(tag);
    element.setAttribute('class', clas);
    element.textContent = text
    return element;
}
//Create counter element and add to Body
const counterContainer = counterBuilder('div', 'counter-container', '')
document.body.appendChild(counterContainer);

const counterValue = counterBuilder('h1', 'num', '0');
counterContainer.appendChild(counterValue);

const buttonContainer = counterBuilder('div', 'btn', '');
counterContainer.appendChild(buttonContainer);

const buttonPlus = counterBuilder('button', 'decrease', '-')
buttonContainer.appendChild(buttonPlus);

const buttonReset = counterBuilder('button', 'reset', 'Reset')
buttonContainer.appendChild(buttonReset);

const buttonMinus = counterBuilder('button', 'increase', '+')
buttonContainer.appendChild(buttonMinus);


let currentValue = 0; //initialize count
let counterDisplay = document.querySelector('.num');

//Add event listener on buttoncontainer and decrease,increase or reset the counter.
buttonContainer.addEventListener("click", function(e){
    if (e.target.className == 'decrease'){
        currentValue --
        counterDisplay.innerText = currentValue
    } else if (e.target.className == 'increase'){
        currentValue ++
        counterDisplay.innerText = currentValue
    } else if (e.target.className == 'reset') {
        currentValue = 0
        counterDisplay.innerText = currentValue
    }
})
