import { createSlice,nanoid } from '@reduxjs/toolkit';

const initialState = {
  users:[],
  getFollower:null,
  getFollowing:null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const newUser = {
        id: nanoid(),
        ...action.payload
      };
      state.users.push(newUser);
    },
    clearUser: (state) => {
      state.users = [];
      state.getFollower=null;
    },
    setFollowers: (state, action) => {
      state.getFollower = action.payload; // payload is just a number
    },
    setFollowing:(state,action)=>{
      state.getFollowing = action.payload;
    }
  },
});

export const { addUser, clearUser ,setFollowers,setFollowing} = userSlice.actions;
export default userSlice.reducer;
