import { createAsyncThunk } from "@reduxjs/toolkit"
import API from "../../services/api-service";

export const fetchEmployees = createAsyncThunk(
    'employee/fetchByIdStatus',
    async () => {
        const {data} = await API.get("/employees/");
        return data;
    },
)