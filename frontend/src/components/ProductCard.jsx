function ProductCard({product,addCart}){

return(

<div className="border p-4 rounded shadow">

<img
src={product.image}
className="h-40 w-full object-cover"
/>

<h2 className="text-lg font-bold mt-2">
{product.name}
</h2>

<p>₹{product.price}</p>

<button
onClick={()=>addCart(product.id)}
className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
>

Add to Cart

</button>

</div>

)

}

export default ProductCard