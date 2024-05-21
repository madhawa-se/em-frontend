import { createSlice } from "@reduxjs/toolkit";

interface ISettingsState {
    viewMode: "grid" | "table"
}

const initialSettingsState: ISettingsState = {
    viewMode: "grid",
}

export const settingsSlice = createSlice({
    name: "settings",
    initialState: initialSettingsState,
    reducers: {
        setMode: (state, action) => {
            state.viewMode = action.payload
        }
    }
});