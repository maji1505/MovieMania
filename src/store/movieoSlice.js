
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  branerData:[],
  imageURL:""
}

export const movieoSlice= createSlice({
    name:'movieo',
    initialState,
    reducers:{
               setBranerData:(state,action)=>{
                state.branerData=action.payload;
               },
               setImageURL:(state,action)=>{
                state.imageURL=action.payload;
               }
    }
})

export const {setBranerData,setImageURL}=movieoSlice.actions;

export default movieoSlice.reducer;