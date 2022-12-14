// const { response } = require("express")

console.log('JS file working')

// fetch('http://puzzle.mead.io/puzzle').then((response) =>{
//     response.json().then((data) =>{
//         console.log(data)
//     })
// })



const weatherForm = document.querySelector('form')

const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageSec = document.querySelector('#message-2')

// messageOne.textContent = 'From JS'
weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'loading...'
    messageSec.textContent = ''
    fetch('https://weather-app-six-ebon.vercel.app/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                // console.log(data.error)
                messageOne.textContent = data.error
            }else{
                // console.log(data.location)
                // console.log(data.forecast)
                messageOne.textContent = data.location
                messageSec.textContent = data.forecast
            }
        })
    })
    // console.log(location)
})

