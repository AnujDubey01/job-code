import Navbar from './components/Utils/Navbar'
import './App.css'
import { createBrowserRouter, RouterProvider, } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/ui/Home'
import { Toaster } from 'sonner'

const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },{
    path:"/login",
    element:<Login/>
  },{
    path:"/signup",
    element:<Signup/>
  }
  // },{
  //   path:"/home",
  //   element:<Home/>
  // },{
  //   path:"/",
  //   element:<Home/>
  // },{
  //   path:"/home",
  //   element:<Home/>
  // }
])
function App() {

  return (
    <>
    <RouterProvider router = {appRouter}/>
    <Toaster/>
    </>
  )
}

export default App
