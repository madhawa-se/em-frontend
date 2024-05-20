import { createAsyncThunk } from "@reduxjs/toolkit"
import API from "../../services/api-service";
import { IEmployee } from "../../definitions/interfaces/employee-interface";

export const updateEmployee = createAsyncThunk(
    'employee/updateEmployee',
    async (employee: IEmployee) => {
        console.log("in thunk ", employee);
        const { data } = await API.put(`/employees/${employee.id}`, employee);
        return data;
    },
)