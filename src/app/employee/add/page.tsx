"use client"


import EmployeeForm from "@components//forms/employee-form";
import { toast } from "react-toastify";
import { IEmployee } from "../../../definitions/interfaces/employee-interface";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { addEmployee } from "../../../store/thunk/addEmployee";
import NavBar from "@components//nav/nav-bar";
import Link from "next/link";
import Spinner from "@components//spinner/spinner";

const AddEmployeePage = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.employees.isLoading);


  async function handleFormSubmition(employee: IEmployee): Promise<void> {
  
    try {
      await dispatch(addEmployee(employee));
      toast('Employee added');
    } catch (err) {;
      toast('error');
    }
  }

  return (<div>
    <NavBar></NavBar>
    <div className="container mx-auto">
      <div className="flex justify-end space-x-4 my-6">
        <button className="text-white px-4 py-2 rounded btn-ovel"><Link href="/employee/list">LIST VIEW</Link></button>
      </div>

      <div>
        <Spinner show={isLoading}></Spinner>
      </div>
      <EmployeeForm onSubmitCallback={handleFormSubmition} edit={false} employee={undefined}></EmployeeForm>
    </div>
  </div>
  )
}
export default AddEmployeePage;