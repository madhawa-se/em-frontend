import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import "./employee-form.scss"
import { PhoneNumber } from 'libphonenumber-js';
import { Gender, IEmployee } from '../../definitions/interfaces/employee-interface';
import { validatePhone } from '../../utils/validation';

interface IFormProps {
  onSubmitCallback: (data: IEmployee) => void;
  edit: boolean,
  employee?: IEmployee
}

const EmployeeForm = ({ onSubmitCallback, edit = false, employee }: IFormProps) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<IEmployee>({ ...((edit && employee) && { defaultValues: employee }) });
  const onSubmit: SubmitHandler<IEmployee> = (data) => {
    onSubmitCallback(data);
  };

  const validations = {
    name: { required: true, pattern: /^[A-Za-z]+$/, minLength: 6, maxLength: 10 },
    email: { required: true, pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ },
    phoneNumber: { validate: validatePhone },
    gender:{ required: 'Gender is required' }
  }

  return (

    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">


      <div className="px-2">
        <div className="flex flex-row field-row">
          <div className="field-label">
            <label htmlFor="firstName" className="input-label">First Name</label>
          </div>
          <div className={`field-value ${errors.firstName && 'field-value-error'}`}>
            <input type="text" id="firstName" className="input-field" {...register('firstName', validations.name)} />
          </div>
        </div>
      </div>
      <div className="px-2">
        <div className="flex flex-row field-row">
          <div className="field-label">
            <label htmlFor="lastName" className="input-label">Last Name</label>
          </div>
          <div className={`field-value ${errors.lastName && 'field-value-error'}`}>
            <input type="text" id="lastName" className="input-field" {...register('lastName', validations.name)} />
          </div>
        </div>
      </div>
      <div className="px-2">
        <div className="flex flex-row field-row">
          <div className="field-label">
            <label htmlFor="email" className="input-label">Email</label>
          </div>
          <div className={`field-value ${errors.email && 'field-value-error'}`}>
            <input type="email" id="email" className="input-field" {...register('email', validations.email)} />
          </div>
        </div>
      </div>
      <div className="px-2">
        <div className="flex flex-row field-row">
          <div className="field-label">
            <label htmlFor="phoneNumber" className="input-label">Phone Number</label>
          </div>
          <div className={`field-value ${errors.phoneNumber && 'field-value-error'}`}>
            <input type="tel" id="phoneNumber" className="input-field" {...register('phoneNumber', validations.phoneNumber)} />
          </div>
        </div>
      </div>
      <div className="px-2">
        <div className="flex flex-row field-row">
          <div className="field-label">
            <label htmlFor="gender" className="input-label">Gender</label>
          </div>
          <div className={`field-value ${errors.gender && 'field-value-error'}`}>
            <select id="gender" className="input-field" {...register('gender', validations.gender)}>
              <option value="">Select Gender</option>
              <option value={Gender.Male}>M</option>
              <option value={Gender.Female}>F</option>
            </select>
          </div>
        </div>
      </div>
      <div className="px-2">
        <div className="flex flex-row field-row">
          <div className="field-label"></div>
          <div className="field-value">
            <button type="submit">{edit ? "Save" : "Add"}</button>
          </div>
        </div>
      </div>
    </form>

  );
}

export default EmployeeForm;