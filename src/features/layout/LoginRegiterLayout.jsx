
import { Outlet } from 'react-router-dom'
import { auth } from '../../firebase/firebase';

import { redirect } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
export const LoginRegiterLayout = () => {
    return (
        <>
            <Outlet />



        </>
    )
}


export async function loader() {
    const checkAuth = new Promise((resolve, reject) => {
        console.log("first")
        const unsubscribe = onAuthStateChanged(
            auth,
            (currentUser) => {
                unsubscribe();
                if (currentUser) {
                    resolve(redirect("/"));
                } else {
                    resolve(null);
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
