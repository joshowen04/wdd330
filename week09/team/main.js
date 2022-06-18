

function playSound(e){
    let audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    let key = document.querySelector(`.key[data-key="${e.keyCode}"]`)
    let numPressed = Number.parseInt(key.dataset.pressed);
    if(numPressed == 10) {
        key.setAttribute("data-pressed", "0");
        console.log(key.dataset.pressed);
        key.style.transform = `translateY(0px)`;
    }
    else {
        numPressed++;
        key.setAttribute("data-pressed", `${numPressed}`);
        console.log(key.dataset.pressed);
        let pixels = numPressed * 10; 
        key.style.transform = `translateY(${pixels}px)`;
    }
    
    if (!audio) { return };
    audio.currentTime = 0;
    audio.play();
    key.classList.add("playing");
}

function removeTransition(e) {
    if(e.propertyName !== 'transform') return;
    //this = e.target
    this.classList.remove("playing");
}

addEventListener('keydown',playSound);
const keys = document.querySelectorAll('.key')
keys.forEach(key => key.addEventListener('transitionend', removeTransition));


//key.style.transform = "translateY(10px)";