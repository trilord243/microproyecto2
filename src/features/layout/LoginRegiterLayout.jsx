import { onAuthStateChanged } from 'firebase/auth';
import { Outlet } from 'react-router-dom'
import { auth } from '../../firebase/firebase';

import { redirect } from 'react-router-dom';
export const LoginRegiterLayout = () => {
    return (
        <>
            <Outlet />



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
