import { createAsyncThunk } from "@reduxjs/toolkit"
import API from "../../services/api-service";
import { IEmployee } from "../../definitions/interfaces/employee-interface";

export const addEmployee = createAsyncThunk(
    'employee/addEmployee',
    async (employee: IEmployee) => {
        console.log("in thunk ", employee);
        const { data } = await API.post(`/employees`, employee);
        return data;
    },
)