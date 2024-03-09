import { doc, getDoc } from "firebase/firestore";

export const getUser = async (db, uuid) => {
  try {
    const userRef = doc(db, "users", uuid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      console.log("No se encontró el documento para el UUID:", uuid);
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el documento del usuario:", error);
    return null;
  }
};
