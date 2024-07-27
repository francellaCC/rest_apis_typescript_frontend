import { createBrowserRouter } from 'react-router-dom'
import Layouts from './layouts/Layouts'
import Products, {loader as productsLoader, action as updateAvailability} from './views/Products'
import NewProducts, {action as newProductAction} from './views/NewProducts'
import EditProducts, {loader as editProductLoader , action as editProductAction} from './views/EditProducts'
import { action as deleteProductAction} from './components/ProductDetails'



export const router = createBrowserRouter([
  {
    path:'/',
    element: <Layouts/>,
    children:[
      {
        index:true,
        element:<Products/>,
        loader: productsLoader,
        action: updateAvailability
      },{
        path: 'productos/nuevo',
        element: <NewProducts/>,
        action: newProductAction
      },
      {
        path:'productos/:id/editar', //ROA Pattern - Resource-oriented design
        element:<EditProducts/>,
        loader:editProductLoader,
        action: editProductAction
      },{
         path:'productos/:id/eliminar',
         action: deleteProductAction,
      },
      {

      }
    ]
  }
])