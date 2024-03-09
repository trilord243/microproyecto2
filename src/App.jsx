import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { AppLayout } from "./features/layout/AppLayout"
import { ErrorPage } from "./features/ui/ErrorPage"
import LoginPage, { action as loginAction } from "./features/login-register/LoginPage"
import RegisterPage, { action as registerAction } from "./features/login-register/RegisterPage"
import { LoginRegiterLayout, loader as LoginRegisterLoader } from "./features/layout/LoginRegiterLayout"
import { UserLayout, loader as userLoader } from "./features/layout/UserLayout"
import Card from "./features/ui/Card"




function App() {

  const router = createBrowserRouter(

    [





      {
        element: <AppLayout />,
        errorElement: <ErrorPage />,
        children: [

          {
            element: <LoginRegiterLayout />,
            loader: LoginRegisterLoader,
            errorElement: <ErrorPage />,
            children: [
              {
                path: "/login",
                element: <LoginPage />,
                action: loginAction
              },
              {
                path: "/register",
                element: <RegisterPage />,
                action: registerAction,

              }
            ]
          },


          {
            element: <UserLayout />,
            loader: userLoader,
            children: [

              {
                path: "/",
                element: <Card />
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
