
import { ActionFunctionArgs, Form, Link, redirect, useActionData } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import { addProduct } from '../services/ProductsService'
import ProductForm from '../components/ProductForm'
/**
 * Actions en React Router se usan para procesar la enmtrada de datos en los formularios
 * 
 * Se debeimportar un componente llamado <Form></Form> , crear una funcion y en el router 
 * decirle que funcion debe ejecutarse en la action
 * siempre se debe retornar algo en las funciones de action
 * 
 */


export async function action({request}: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData())

  let error = ''
  if(Object.values(data).includes('')){
    error= 'Todos los campos son obligatorios'
  }

  if(error.length){
    return error
  }

  await addProduct(data)
  return redirect('/ ')
}

function NewProducts() {

  const error = useActionData() as string
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Registrar Productos</h2>

        <Link to='/' className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500">
          Volver a Productos
        </Link>
      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form className="mt-10" method='POST'>
      
         <ProductForm/>
          <input
            type="submit"
            className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
            value="Registrar Producto"
          />
      </Form>

    </>
  )
}

export default NewProducts