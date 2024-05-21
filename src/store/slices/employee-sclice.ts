import { createSlice } from "@reduxjs/toolkit";
import { IEmployee } from "../../definitions/interfaces/employee-interface";
import { addEmployee } from "../thunk/addEmployee";
import { deleteEmployee } from "../thunk/deleteEmployee";
import { fetchEmployees } from "../thunk/fetchEmployee";

interface IState {
    data: IEmployee[];
    isLoading: boolean;
    error: string | null;
}

const initialState: IState = {
    data: [],
    isLoading: false,
    error: null
}

export const employeesSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchEmployees.fulfilled, (state, action) => {
            state.data = action.payload;
            state.isLoading = false;
            state.error = null;
        })
        builder.addCase(fetchEmployees.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        })
        builder.addCase(fetchEmployees.rejected, (state, action) => {
            // state.error = action.error;
            state.isLoading = false;
        })


        builder.addCase(addEmployee.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data.push(action.payload);
            state.error = null;
        })
        builder.addCase(addEmployee.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        })
        builder.addCase(addEmployee.rejected, (state, action) => {
            state.isLoading = false;
            // state.error = null;
        })


        builder.addCase(deleteEmployee.fulfilled, (state, action) => {
            state.data = state.data.filter(employee => employee.id !== action.payload.id)
        })
    }
});