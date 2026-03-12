import { useState } from "react"

function SearchBar({products,setFiltered}){

const [search,setSearch] = useState("")

const handleSearch=(value)=>{

setSearch(value)

const filtered = products.filter(p =>
p.name.toLowerCase().includes(value.toLowerCase())
)

setFiltered(filtered)

}

return(

<div className="flex justify-center my-6">

<input
type="text"
placeholder="Search products..."
value={search}
onChange={(e)=>handleSearch(e.target.value)}
className="border p-2 w-96 rounded"
/>

</div>

)

}

export default SearchBar