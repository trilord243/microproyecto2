import { collection, getDocs, doc, getDoc } from "firebase/firestore";

export const getAllVideojuegos = async (db) => {
  try {
    const videojuegosRef = collection(db, "videojuegos");

    const querySnapshot = await getDocs(videojuegosRef);

    const videojuegos = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return videojuegos;
  } catch (error) {
    console.error("Error al obtener los videojuegos:", error);
    return [];
  }
};

export async function getVideojuegoBanner(db, videojuegoId) {
  try {
    const videojuegoRef = doc(db, "videojuegos", videojuegoId);
    const videojuegoSnap = await getDoc(videojuegoRef);

    if (videojuegoSnap.exists()) {
      const videojuegoData = videojuegoSnap.data();

      const banner = videojuegoData.banner;

      if (banner) {
        return banner;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}
