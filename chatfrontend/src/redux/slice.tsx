/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
});
export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;

// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { getUserList } from '../../services/userService';
// import { RootState } from '../../store';
// import { IUser } from '../component/interface';

// export interface IUsersList {
//   isLoadingUsers: boolean;
//   userList?: IUser[];
// }
// const initialState: IUsersList = { isLoadingUsers: false };
// export const userListSlice = createSlice({
//   name: 'userList',
//   initialState,
//   reducers: {
//     start: (state) => {
//       return {
//         ...state,
//         isLoadingUsers: true,
//       };
//     },
//     success: (state, action: PayloadAction<any>) => {
//       return {
//         ...state,
//         ...action.payload,
//         isLoadingUsers: false,
//       };
//     },
//     error: (state, action: PayloadAction<string>) => {
//       return {
//         ...state,
//         isLoadingUsers: false,
//       };
//     },
//   },
// });
// export const fetchUsers = () => async (dispatch: any) => {
//   dispatch(start());
//   try {
//     const userLists = await getUserList();
//     dispatch(success({userList : userLists}));
//   } catch (err) {
//     dispatch(error(err));
//   }
// };
// export const { start, success, error } = userListSlice.actions;
// export const selectUserLists = (state: RootState) => state.userList;
// export const usersListReducer = userListSlice.reducer;
