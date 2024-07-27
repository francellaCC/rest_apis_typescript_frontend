import { ActionFunctionArgs, Form, redirect, useFetcher, useNavigate } from "react-router-dom"
import { formatCurrency } from "../helpers"
import { Product } from "../types"
import { deletProduct } from "../services/ProductsService"

type ProductDetailsType = {
    product: Product
}

export async function action({params}: ActionFunctionArgs) {

  if(params.id !== undefined){
    await deletProduct(+params.id)
  }
    return redirect('/')
}
function ProductDetails({product} : ProductDetailsType) {
  const fetcher = useFetcher()
  const navigate = useNavigate()
  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">
        {product.name}
      </td>
      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800">

        <fetcher.Form method="POST">
           <button type="submit" className={`${product.availability ? 'text-black' : 'text-red-600'}  rounded-lg p-2 
           uppercase font-bold w-full boder border-black-100 hover:cursor-pointer`} value={product.id} name="id">
           {product.availability ? 'Disponible' : 'No dispinible'}
           </button>
        </fetcher.Form>
        
      </td>
      <td className="p-3 text-lg text-gray-800 ">
        <div className="flex gap-2 items-center">
          {/* <Link to={`productos/${product.id}/editar`} className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase
           font-bold text-xs text-center">Editar</Link> */}
           
           <button 
           onClick={()=>navigate(`productos/${product.id}/editar`)}
           className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase
           font-bold text-xs text-center">Editar</button>
           <Form className="w-full" method="POST" action={`productos/${product.id}/eliminar`} onSubmit={(e)=>{
              if(!confirm('Eliminar?')){
                e.preventDefault()
              }
           }}>
              <input type="submit" value="Eliminar"  className="bg-red-600 text-white rounded-lg w-full p-2 uppercase
           font-bold text-xs text-center cursor-pointer" />
           </Form>
        </div>
      </td>
    </tr> 
  )
}

export default ProductDetails