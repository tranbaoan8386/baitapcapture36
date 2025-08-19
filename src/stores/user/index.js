import { createSlice } from "@reduxjs/toolkit";
import { keysLocalStorage, localStorageUtil } from "../../util/localStorage";

const initialState = {
  infoUser: localStorageUtil.get(keysLocalStorage.INFO_USER),
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setInfoUserAction: (state, { payload }) => {
      state.infoUser = payload;
    },

    setLogoutAction: (state) => {
      // b1 : xóa thông tin user trong redux
      state.infoUser = null;

      // b2: xóa thông tin user trong localStorage
      localStorageUtil.remove(keysLocalStorage.INFO_USER);
    },
  },
});

export const { setInfoUserAction, setLogoutAction } = userSlice.actions;

export default userSlice.reducer;
