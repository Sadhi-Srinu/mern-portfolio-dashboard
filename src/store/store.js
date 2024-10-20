import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import forgotResetPasswordReducer from "./slices/forgotResetPasswordSlice";
import messageReducer from "./slices/messagesSlice";
import timelineReducer from "./slices/timelineSlice";
import projectReducer from "./slices/projectSlice";
import skillReducer from "./slices/skillSlice";
import softwareApplicationReducer from "./slices/softwareApplicationSlice";

export const store = configureStore({
    reducer:{
        user: userReducer,
        forgotPassword: forgotResetPasswordReducer,
        messages: messageReducer,
        timeline: timelineReducer,
        skill:skillReducer,
        softwareApplications: softwareApplicationReducer,
        project: projectReducer,

    },
});