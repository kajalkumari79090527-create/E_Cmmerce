import axios from "axios"
import {useEffect,useState} from "react"

function Cart(){

const [cart,setCart]=useState([])

const user=JSON.parse(localStorage.getItem("user"))

useEffect(()=>{

axios.get(`http://localhost:5000/api/cart/${user.id}`)
.then(res=>setCart(res.data))

},[])

return(

<div className="p-10">

<h1 className="text-2xl mb-5">Cart</h1>

{cart.map(item=>(

<div key={item.id} className="flex justify-between border p-4 mb-2">

<h2>{item.name}</h2>

<p>₹{item.price}</p>

</div>

))}

</div>

)

}

export default Cart