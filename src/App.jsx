import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { AppLayout } from "./features/layout/AppLayout"
import { ErrorPage } from "./features/ui/ErrorPage"
import LoginPage, { action as loginAction } from "./features/login-register/LoginPage"
import RegisterPage, { action as registerAction, loader as registerLoader } from "./features/login-register/RegisterPage"
import { LoginRegiterLayout, loader as LoginRegisterLoader } from "./features/layout/LoginRegiterLayout"
import { UserLayout, loader as userLoader } from "./features/layout/UserLayout"

import { UserHomePage, loader as homeLoader } from "./features/user/UserHomePage"
import AgrupacionPage, { loader as agrupacionLoader } from "./features/user/AgrupacionPage"

import Profile, { action as profileAction } from "./features/user/Profile"

import { GameCard } from "./features/ui/GameCard"
import { loader as gameCardLoader } from "./features/ui/GameCard"




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
                loader: registerLoader

              }
            ]
          },


          {
            element: <UserLayout />,
            loader: userLoader,
            children: [

              {
                path: "/",
                element: <UserHomePage />,
                loader: homeLoader
              },
              {
                path: "/agrupacion/:id",
                element: <AgrupacionPage />,
                loader: agrupacionLoader
              },
              {
                path: "/profile",
                element: <Profile />,
                action: profileAction
              }
              , {
                path: "/games",
                element: <GameCard/>,  
                loader: gameCardLoader
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
