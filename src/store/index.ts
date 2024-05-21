
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { employeesSlice } from "./slices/employee-sclice";
import { settingsSlice } from "./slices/settings-slice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            employees: employeesSlice.reducer,
            settings: settingsSlice.reducer
        }
    });
};

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
