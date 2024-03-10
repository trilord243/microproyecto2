



import { Outlet } from "react-router-dom";
import SideNavbar from "./SideNavbar";


import { redirect } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
export const UserLayout = () => {



    return (
        <>
            <SideNavbar>


                <Outlet />
            </SideNavbar>

        </>
    )
}





export async function loader() {
    const checkAuth = new Promise((resolve, reject) => {

        const unsubscribe = onAuthStateChanged(
            auth,
            (currentUser) => {
                unsubscribe();
                if (currentUser) {
                    resolve(null);
                } else {
                    resolve(redirect("/login"));
                }
            },
            reject
        );
    });

    return checkAuth.catch((error) => {
        console.error("Error checking auth state", error);
        return redirect("/login");
    });
}








