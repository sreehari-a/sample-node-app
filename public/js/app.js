console.log('Client side JS file loaded')


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
messageOne.textContent = '';
messageTwo.textContent = '';

weatherForm.addEventListener('submit',(event) => {
    event.preventDefault();
    const address = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch(`/weather?address=${address}`).then(response => {
        response.json().then(data => {
            if(data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.data;
            }
        })
    })
})