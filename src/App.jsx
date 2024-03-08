import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { AppLayout } from "./features/layout/AppLayout"
import { ErrorPage } from "./features/ui/ErrorPage"
import LoginPage from "./features/login-register/LoginPage"
import RegisterPage, { action as registerAction, loader as registerLoader } from "./features/login-register/RegisterPage"
import { LoginRegiterLayout } from "./features/layout/LoginRegiterLayout"
import { UserLayout } from "./features/layout/UserLayout"




function App() {

  const router = createBrowserRouter(

    [





      {
        element: <AppLayout />,
        errorElement: <ErrorPage />,
        children: [

          {
            element: <LoginRegiterLayout />,
            errorElement: <ErrorPage />,
            children: [
              {
                path: "/login",
                element: <LoginPage />
              },
              {
                path: "/register",
                element: <RegisterPage />,
                action: registerAction,
                loader: registerLoader
              }
            ]
          },


          {
            element: <UserLayout />,
            children: [

              {
                path: "/",
                element: <div>Home</div>
              },
              {
                path: "/about",
                element: <div>About</div>
              },
              {
                path: "/contact",
                element: <div>Contact</div>
              }
            ]


          }
        ]

      }



    ]
  )

  return (
    <>
      <RouterProvider router={router} />

    </>
  )
}

export default App
