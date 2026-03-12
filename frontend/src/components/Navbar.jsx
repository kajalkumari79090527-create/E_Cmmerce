// import {Link} from "react-router-dom"

// function Navbar(){

// return(

// <div className="bg-black text-white p-4 flex gap-4">

// <Link to="/">Home</Link>
// <Link to="/login">Login</Link>

// <Link to="/signup">Signup</Link>
// <Link to="/cart">Cart</Link>



// </div>

// )

// }

// export default Navbar

import {Link} from "react-router-dom"

function Navbar(){

const user = JSON.parse(localStorage.getItem("user"))

return(

<div className="bg-black text-white flex justify-between p-4">

<h1 className="text-xl font-bold">Ecommerce</h1>

<div className="space-x-4">

<Link to="/">Home</Link>
<Link to="/cart">Cart</Link>
<Link to="/orders">Orders</Link>

{user && (
<Link to="/admin">Dashboard</Link>
)}

<Link to="/login">Login</Link>

</div>

</div>

)

}

export default Navbar