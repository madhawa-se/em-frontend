'use client'

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./page.scss"
import EmployeeCard from "@components//employee-card/EmployeeCard";
import TableView from "@components//layout-views/table-view";
import ViewSwitch from "@components//view-switch/viewSwitch";
import { IEmployee } from "../../../definitions/interfaces/employee-interface";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { deleteEmployee } from "../../../store/thunk/deleteEmployee";
import { fetchEmployees } from "../../../store/thunk/fetchEmployee";
import Link from "next/link";
import NavBar from "@components//nav/nav-bar";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Spinner from "@components//spinner/spinner";
// import { useDispatch } from "react-redux";

export default function Home() {

  const dispatch = useAppDispatch();
  const router = useRouter()
  const { data: employees, error, isLoading } = useAppSelector((state) => state.employees);
  const viewMode = useAppSelector(state => state.settings.viewMode);


  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const onEdit = useCallback((employee: IEmployee) => {
    router.push(`/employee/edit/${employee.id}`);
  }, [router]);

  const deleteUser = async (employee: IEmployee) => {
    const MySwal = withReactContent(Swal)

    MySwal.fire({
      title: "<strong>Confirmation</strong>",
      icon: "warning",
      html: "Do you want to delete this employee ?",
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteEmployee(employee));
      }
    })

  }

  return (
    <>
      <header>
        <NavBar></NavBar>
        <div className="container mx-auto">


          <div className="tool-bar my-6">

            <div className="flex justify-end space-x-4">
              <button className="text-white px-4 py-2 rounded btn-ovel"><Link href="/employee/add">Add Employee</Link></button>
              <ViewSwitch></ViewSwitch>
            </div>


            <div>
              <Spinner show={isLoading}></Spinner>
            </div>
          </div>
        </div>
      </header>

      <main className="">
        <div className="container mx-auto">
          {viewMode === "table" && <TableView employees={employees} onEdit={onEdit} onDelete={deleteUser}></TableView>}
          {viewMode === "grid" &&
            <div className="container mx-auto">
              <div className="grid-col-wrap flex flex-row flex-wrap">
                {employees.map((employee: IEmployee) => <EmployeeCard key={employee.id} employee={employee} onDelete={deleteUser} onEdit={onEdit}></EmployeeCard>)}
              </div>
            </div>
          }
        </div>
      </main>

    </>
  );
}
