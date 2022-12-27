import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserInfoCurrent } from '../api/login';
export interface UserState {
  loading: boolean;
  userInfo: User;
  permissionList: Permission[];
}
const initialState: UserState = {
  loading: true,
  userInfo: { id: 0, username: '', email: '' },
  permissionList: [] as Permission[],
};
export const userState = createSlice({
  name: 'userState',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      getCurrentUserInfo.fulfilled,
      (
        state,
        action: PayloadAction<{
          user: User;
          permissionList: Permission[];
        }>,
      ) => {
        state.loading = false;
        state.userInfo = action.payload.user;
        state.permissionList = action.payload.permissionList;
      },
    );
  },
});
export const getCurrentUserInfo = createAsyncThunk<{
  user: User;
  permissionList: Permission[];
}>('getCurrentUserInfo', async () => {
  const current = await getUserInfoCurrent();
  return {
    ...current.data,
  };
});
export default userState.reducer;
