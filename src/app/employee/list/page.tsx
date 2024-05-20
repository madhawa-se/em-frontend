'use client'

import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
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

// import { useDispatch } from "react-redux";

export default function Home() {

  const dispatch = useAppDispatch();
  const router = useRouter()
  const { data: employees, error, isLoading } = useAppSelector((state) => state.employees);
  const viewMode = useAppSelector(state => state.settings.viewMode);


  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  async function handleFormSubmition(data: IEmployee) {
    console.log("data ", data);

  }

  const onEdit = useCallback((employee: IEmployee) => {
    router.push(`/employee/edit/${employee.id}`);
  }, [router]);

  const onDelete = useCallback(async (employee: IEmployee) => {
    console.log("Wow so easy!", employee);
    // toast("Wow so easy!");
    try {
      const user = await dispatch(deleteEmployee(employee));
      toast('success');
    } catch (err) {
      toast('error');
    }
  }, [dispatch]);

  return (

    <>
      <header>
        <div className="title-bar">
          <h1 className="title">Employee Manager</h1>
        </div>
        <div className="container mx-auto">


          <div className="tool-bar my-6">

            <div className="flex justify-end space-x-4">
              <button className="text-white px-4 py-2 rounded btn-add">ADD EMPLOYEE</button>
              <ViewSwitch></ViewSwitch>
            </div>
          </div>
        </div>
      </header>

      <main className="">

        <div className="container mx-auto">
          {isLoading && <div>Loading data</div>}

          {viewMode === "table" && <TableView employees={employees} onEdit={onEdit} onDelete={onDelete}></TableView>}
          {viewMode === "grid" &&
            <div className="container mx-auto">
              <div className="grid-col-wrap flex flex-row flex-wrap">
                {employees.map((employee: IEmployee) => <EmployeeCard key={employee.id} employee={employee} onDelete={onDelete} onEdit={onEdit}></EmployeeCard>)}
              </div>
            </div>
          }
        </div>
      </main>
    </>
  );
}
