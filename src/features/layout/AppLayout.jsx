
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { getUser } from '../../api/gerUser';
import { auth, db } from "../../firebase/firebase";
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from "react-redux";
import { resetUserState, updateUser, uppDateId } from '../user/userSlice';
export const AppLayout = () => {
    const dispatch = useDispatch();
    useEffect(() => {

        onAuthStateChanged(auth, (currentUser) => {


            if (currentUser) {


                getUser(db, currentUser.uid).then((user) => {

                    dispatch(uppDateId(currentUser.uid))

                    dispatch(updateUser(user))
                });

            } else {
                dispatch(resetUserState())
            }
        });


    }, [dispatch]);

    return (
        <>

            <Outlet />



        </>
    )
}
