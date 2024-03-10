import { doc, getDoc } from "firebase/firestore";

export const getClub = async (db, id) => {
  try {
    const clubRef = doc(db, "clubes", id);
    const clubSnap = await getDoc(clubRef);

    if (clubSnap.exists()) {
      let clubData = clubSnap.data();

      if (clubData.videojuegos && clubData.videojuegos.length > 0) {
        const videojuegosPromises = clubData.videojuegos.map((videojuegoId) =>
          getVideojuego(db, videojuegoId)
        );
        const videojuegosData = await Promise.all(videojuegosPromises);

        clubData.videojuegosDetalles = videojuegosData.filter(
          (videojuego) => videojuego !== null
        );
      }

      return clubData;
    } else {
      console.error("No se encontró el club con ID:", id);
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el documento del club:", error);
    return null;
  }
};

async function getVideojuego(db, videojuegoId) {
  const videojuegoRef = doc(db, "videojuegos", videojuegoId);
  const videojuegoSnap = await getDoc(videojuegoRef);

  if (videojuegoSnap.exists()) {
    return videojuegoSnap.data();
  } else {
    console.error("No se encontró el videojuego con ID:", videojuegoId);
    return null;
  }
}

<<<<<<< HEAD

=======
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const fetchAgrupaciones = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "clubes"));
    const agrupacionesList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return agrupacionesList;
  } catch (error) {
    console.error("Error al obtener las agrupaciones: ", error);
    throw new Error("Error al obtener las agrupaciones");
  }
};
>>>>>>> 27b1d146094aec967ac8323a060fb092f11d619b
