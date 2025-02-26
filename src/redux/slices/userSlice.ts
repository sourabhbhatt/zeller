import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userType: string;
  searchQuery: string;
}

const initialState: UserState = {
  userType: '',
  searchQuery: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserType: (state, action: PayloadAction<string>) => {
      state.userType = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setUserType, setSearchQuery } = userSlice.actions;
export default userSlice.reducer;