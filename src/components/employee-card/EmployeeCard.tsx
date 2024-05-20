import Image from 'next/image';
import React from 'react';
import "./EmployeeCard.scss"
import EditIcon from '../../../public/icons/user-edit-solid.svg'
import TrashIcon from '../../../public/icons/trash-can-solid.svg'
import { IEmployee, Gender } from '../../definitions/interfaces/employee-interface';

interface EmployeeCardProps {
  employee: IEmployee;
  onEdit: (employee: IEmployee) => void;
  onDelete: (employee: IEmployee) => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onEdit, onDelete }) => {

  const { firstName, lastName, phoneNumber, gender, email, photo } = employee;

  let genderText;
  if (gender === Gender.Male) {
    genderText = "Male";
  } else if (gender === Gender.Female) {
    genderText = "Female";
  }


  return (
    <article className="card-wrapper flex flex-col">
      <div className="card-head">
        <Image
          priority
          src={photo}
          width={200}
          height={200}
          style={{ width: '100%', height: 'auto' }}
          alt="profile"
        />
      </div>
      <div className="card-body flex flex-row">
        <div className="details flex-1">
          <div className="details-item"> {`${firstName} ${lastName}`}</div>
          <div className="details-item">{email}</div>
          <div className="details-item">{phoneNumber}</div>
          <div className="details-item">{genderText}</div>
        </div>
        <div className="op flex flex-row justify-center items-center ml-4">

          <button className="img-icon-btn btn-trash" onClick={() => onDelete(employee)}>
            <TrashIcon className="img-icon" height={12} width={12}></TrashIcon>
          </button>

          <button className="img-icon-btn btn-edit" onClick={() => onEdit(employee)}>
            <EditIcon className="img-icon" height={20} width={20}></EditIcon>
          </button>

        </div>
      </div>
    </article>
  );
};

export default EmployeeCard;

