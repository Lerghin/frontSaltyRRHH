import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { LS } from "../../Utils/LS.js";


export const login= createAction('login', (credentials)=>{
const reducerData={
    user: credentials.userData,
    token: credentials.token,
    status:"online"
}
LS.set('token', credentials.token)
return {
    payload:reducerData
}
})

export const signup= createAction('signup', (credentials)=>{

    const reducerData={
        user: credentials.userData,
        token: credentials.token,
        status:"online"
    }
  return{
    payload:reducerData
  }
})

export const authenticate= createAsyncThunk('authenticate', async()=>{
const token=LS.getText('token')
console.log(token)
const {data}=await server.get('/auth/token', {
headers:{
    Authorization: "Bearer"+token
}

})

const reducerData={
    user: data.userData,
    status: "online"
}
 return reducerData
})

export const logout= createAction('logout');
export const logoutUser=()=>{

    return (dispatch)=>{
        LS.rm('token');
        dispatch(logout())
    };
};

