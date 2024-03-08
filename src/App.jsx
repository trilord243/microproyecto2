import { RouterProvider, createBrowserRouter } from "react-router-dom"




function App() {

  const router = createBrowserRouter(

    [

      { path: "/", element: <h1 className="text-red-400 text-3xl">Hola</h1> },


    ]
  )

  return (
    <>
      <RouterProvider router={router} />

    </>
  )
}

export default App
