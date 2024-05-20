"use client"


import EmployeeForm from "@components//forms/employee-form";
import { toast } from "react-toastify";
import { IEmployee } from "../../../definitions/interfaces/employee-interface";
import { useAppDispatch } from "../../../hooks/hooks";
import { addEmployee } from "../../../store/thunk/addEmployee";

const AddEmployeePage = () => {
  const dispatch = useAppDispatch();

  async function handleFormSubmition(employee: IEmployee): Promise<void> {
    try {
      const employeeRes = await dispatch(addEmployee(employee));
      toast('success')
    } catch (err) {
      toast('error')
    }
  }

  return (<div>
    <EmployeeForm onSubmitCallback={handleFormSubmition} edit={false} employee={undefined}></EmployeeForm>
  </div>
  )
}
export default AddEmployeePage;