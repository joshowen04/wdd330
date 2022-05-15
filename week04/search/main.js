// const form = document.forms[0];

// const form = document.getElementsByTagname('form')[0];

//const form = document.forms.search;

const form = document.forms['search'];

//const [input,button] = form.elements;

//const input = form.searchInput;
const input = form['searchInput']
input.value = 'Search Here';

const searchButton = form['searchButton'];

//form.reset() 


input.addEventListener('focus', function(){
    if (input.value==='Search Here') {
        input.value = '' 
    }
}, false);

input.addEventListener('blur', function(){
    if(input.value === '') {
        input.value = 'Search Here';
    } }, false);

    
form.addEventListener ('submit', search, false);

function search(event) {
    alert(`You Searched for: ${input.value}`);
    event.preventDefault();
}