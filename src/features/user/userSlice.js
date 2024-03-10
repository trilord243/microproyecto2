import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  id: "",
  nombre: "",
  userName: "",
  apellido: "",
  email: "",
  foto: "",
  videojuego_favorito: "",
  cover: "",
  membresia: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {
        nombre,
        userName,
        apellido,
        email,
        foto,
        videojuego_favorito,
        cover,
        miembroClub,
      } = action.payload;

      state.nombre = nombre;
      state.userName = userName;
      state.apellido = apellido;
      state.email = email;
      state.foto = foto;
      state.videojuego_favorito = videojuego_favorito;
      state.cover = cover;
      state.membresia = miembroClub;
    },
    uppDateId: (state, action) => {
      state.id = action.payload;
    },

    updateName: (state, action) => {
      state.nombre = action.payload;
    },
    updateUserName: (state, action) => {
      state.userName = action.payload;
    },
    updateApellido: (state, action) => {
      state.apellido = action.payload;
    },
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
    updateFoto: (state, action) => {
      state.foto = action.payload;
    },
    updateVideojuegoFavorito: (state, action) => {
      state.videojuego_favorito = action.payload;
    },
    updateCover: (state, action) => {
      state.cover = action.payload;
    },
    updateMembresia: (state, action) => {
      state.membresia = action.payload;
    },
    resetUserState: () => {
      return initialState;
    },
  },
});

export const getUserName = (state) => state.user.userName;
export const getNombre = (state) => state.user.nombre;
export const getUser = (state) => state.user;
export const getUserId = (state) => state.user.id;
export const getUserApellido = (state) => state.user.apellido;
export const getUserEmail = (state) => state.user.email;
export const getUserFoto = (state) => state.user.foto;
export const getUserVideojuegoFavorito = (state) =>
  state.user.videojuego_favorito;
export const getUserCover = (state) => state.user.cover;

export const {
  updateUser,
  updateName,
  updateUserName,
  updateApellido,
  updateEmail,
  updateFoto,
  updateVideojuegoFavorito,
  updateCover,
  resetUserState,
  uppDateId,
  updateMembresia,
} = userSlice.actions;

export default userSlice.reducer;
