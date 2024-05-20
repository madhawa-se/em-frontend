"use client"


import EmployeeForm from "@components//forms/employee-form";
import { notFound, useParams, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { IEmployee } from "../../../../definitions/interfaces/employee-interface";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { updateEmployee } from "../../../../store/thunk/updateEmployee";

export default function EditEmployeePage() {
  const dispatch = useAppDispatch();
  const { employeeId } = useParams();

  const employee = useAppSelector(state => state.employees.data?.find((employee: { id: string }) => employee.id === employeeId));
  if (!employee) {
    return notFound()
  }

  async function handleFormSubmition(employee: IEmployee): Promise<void> {
    try {
      const employeeRes = await dispatch(updateEmployee(employee));
      toast('success')
    } catch (err) {
      toast('error')
    }
  }

  return (<div>
    <p>Post: {employeeId}</p>
    <EmployeeForm onSubmitCallback={handleFormSubmition} edit employee={employee}></EmployeeForm>
  </div>
  )
}