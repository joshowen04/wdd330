// const tictacbox = document.querySelector('.square');

// tictacbox.addEventListener('click', doSomething);
document.querySelector('#player1').style.display = 'block';



// function doSomething(event){
//     console.log(event.target);
// }


const tictacbox = document.querySelector('#gameWrapper');

tictacbox.addEventListener('click', doSomething)

let player1 = true;
function doSomething(event){
    let id = event.target.getAttribute('id');
    if(player1 == true) {

        console.log(id);
        document.querySelector(`#${id} .x`).style.display = 'block';

        console.log('We made it here');
        player1 = false;
        document.querySelector('#player1').style.display = 'none';
        document.querySelector('#player2').style.display = 'block';
    }
    else {
        console.log('player2')

        document.querySelector(`#${id} .o`).style.display = 'block';
        player1 = true;
        document.querySelector('#player1').style.display = 'block';
        document.querySelector('#player2').style.display = 'none'
    }
}

document.querySelector('#reset').addEventListener('click', resetButton);

function resetButton() {
    console.log('we made it')
    let test = document.querySelector('.x');

    document.querySelectorAll('.x').forEach(item => {
        item.style.display = 'none';
    })
    document.querySelectorAll('.o').forEach(item => {
        item.style.display = 'none';
    })
    document.querySelector('#player1').style.display = 'block';
    document.querySelector('#player2').style.display = 'none'
    
}