

var cart = cart
const logoutButton = document.getElementById("logout")
const finishPurchase = document.getElementById("finish")
async function addItem(index){

    let data = await  fetch('/api/products')
    let productos = await data.json()
    console.log(productos.docs[index])
    let cargar = await fetch(`/api/carts/${cart}/product/${productos.docs[index]._id}`,{method:"POST"})
}


async function changeRol(index){

    let data = await fetch('/api/users')
    let users = await data.json()
    let role = document.getElementById(`role${index}`).value

    users[index].rol = role;
    let id = users[index]._id;

    let body = JSON.stringify({index:index, user:users[index]})
    console.log(body)
    fetch('/api/users',{
        method:'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body:body
        

    }).then(response => console.log(response))
    .catch(error => console.log(error))
    
}


logoutButton.addEventListener('click',e =>{
    
    fetch('/api/sessions/logout',{
        method:"GET",
        headers:{
           'Content-Type': 'application/json'
        }
    }).then(result =>{
        
        if(result.status === 200) window.location.replace('/users/login')})
})

finishPurchase.addEventListener('click',e=>{
    window.location.replace(`/api/carts/${cart}/purchase`)

})