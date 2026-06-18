import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/home/Home'
import { Toaster } from 'sonner'
import Jobs from './components/jobs/Jobs'
import Browse from './components/browse/Browse'

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
  },{
    path:"/jobs",
    element:<Jobs/>
  },{
    path:"/browse",
    element:<Browse/>
   }
  //  ,{
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
