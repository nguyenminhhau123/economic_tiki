import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  email: "",
  password: "",
  phone: "",
  address: "",
  avatar: "",
  access_token: "",
  id: "",
  isAdmin: false,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {
        _id = "",
        name = "",
        email = "",
        phone = "",
        address = "",
        avatar = "",
        isAdmin,
        access_token = "",
      } = action.payload;

      state.name = name || email;
      state.id = _id;
      state.email = email;
      state.phone = phone;
      state.address = address;
      state.avatar = avatar;
      state.access_token = access_token;
      state.isAdmin = isAdmin;
    },
    ResetUser: (state) => {
      state.id = "";
      state.name = "";
      state.email = "";
      state.phone = "";
      state.address = "";
      state.access_token = "";
      state.avatar = "";
      state.isAdmin = false;
    },
  },
});

export const { updateUser, ResetUser } = userSlice.actions;

export default userSlice.reducer;
