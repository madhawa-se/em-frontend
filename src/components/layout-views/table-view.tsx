import Image from 'next/image';
import React from 'react';
import "./table-view.scss";
import EditIcon from '../../../public/icons/user-edit-solid.svg'
import TrashIcon from '../../../public/icons/trash-can-solid.svg'
import { IEmployee, Gender } from '../../definitions/interfaces/employee-interface';

interface TableViewProps {
  employees: Array<IEmployee>;
  onEdit: (employee: IEmployee) => void;
  onDelete: (employee: IEmployee) => void;
}

const TableView: React.FC<TableViewProps> = ({ employees, onEdit, onDelete }) => {

  return (
    <div className="table-view">
      <table className="table-fixed mx-auto">
        <thead>
          <tr>
            <th>Image</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Actions</th>

          </tr>
        </thead>
        <tbody data-testid="table-data">
          {
            employees.map((employee) => {
              const { id, firstName, lastName, phoneNumber, gender, email, photo } = employee;
              let genderText;
              if (gender === Gender.Male) {
                genderText = "Male";
              } else if (gender === Gender.Female) {
                genderText = "Female";
              }

              return (
                <tr key={id}>
                  <td>
                    <Image
                      src={photo}
                      width={50}
                      height={50}
                      alt="profile"
                    />
                  </td>
                  <td>{firstName}</td>
                  <td>{lastName}</td>
                  <td>{email}</td>
                  <td>{phoneNumber}</td>
                  <td>{genderText}</td>
                  <td>
                    <div className="op flex flex-row justify-center items-center ml-4">

                      {/* <button className="btn-sq-edit" onClick={() => onEdit(employee)}>
                        <EditIcon className="img-icon" height={20} width={20}></EditIcon>
                      </button>

                      <button className="btn-sq-trash" onClick={() => onDelete(employee)}>
                        <TrashIcon className="img-icon" height={20} width={20}></TrashIcon>
                      </button> */}

                    </div>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
};

export default TableView;

