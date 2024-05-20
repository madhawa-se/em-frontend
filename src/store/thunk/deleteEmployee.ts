import { createAsyncThunk } from "@reduxjs/toolkit"
import API from "../../services/api-service";
import { IEmployee } from "../../definitions/interfaces/employee-interface";

export const deleteEmployee = createAsyncThunk(
    'employee/deleteByIdStatus',
    async (employee: IEmployee) => {
        console.log("in thunk ",employee);
        const {data}  =await API.delete(`/employees/${employee.id}`);
        return employee;
    },
)