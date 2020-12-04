console.log('client side js loded!')
fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })

})

fetch(' http://localhost:3000/weather?address=benguluru').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
        }
        else{
            console.log(data.location)
            console.log(data.forecast)
        }
    })
  
})

const weatherForm = document.querySelector('form')
const search= document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
//messageOne.textContent='from java Script'

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
   //console.log(location)
   if(location.length === 0){
       console.log('please enter address')
   }else
   {
       messageOne.textContent ='Loading...'
       messageTwo.textContent =''
       
   fetch(' http://localhost:3000/weather?address='+encodeURIComponent(location)).then((response)=>{
       response.json().then((data)=>{
           if(data.error){
            //console.log(data.error)
            messageOne.textContent =data.error
            }
        else{
            messageOne.textContent =data.location
            messageTwo.textContent=data.forecast
            //console.log(data.location)
            //console.log(data.forecast)
            }
        })
    })
}
   
})


