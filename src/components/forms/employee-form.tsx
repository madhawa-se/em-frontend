import React, { useEffect } from 'react';
import { useForm, SubmitHandler, FieldErrors, FieldError } from 'react-hook-form';
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
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<IEmployee>({ ...((edit && employee) && { defaultValues: employee }) });
  const onSubmit: SubmitHandler<IEmployee> = (data) => {
    onSubmitCallback(data);
    if (!edit) {
      reset();
    }
  };

  const validations = {
    firstName: {
      required: { value: true, message: "First name is required" },
      pattern: { value: /^[A-Za-z]+$/, message: "First name can only contain letters" },
      minLength: { value: 6, message: "First Name must be at least 6 characters long" },
      maxLength: { value: 10, message: "First Name must be at most 10 characters long" }
    },
    lastName: {
      required: { value: true, message: "Last name is required" },
      pattern: { value: /^[A-Za-z]+$/, message: "Last name can only contain letters" },
      minLength: { value: 6, message: "Last Name must be at least 6 characters long" },
      maxLength: { value: 10, message: "Last Name must be at most 10 characters long" }
    },
    email: {
      required: { value: true, message: "Email is required" },
      pattern: { value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: "Email must be a valid email address" }
    },
    phoneNumber: {
      validate: validatePhone
    },
    gender: {
      required: { value: true, message: "Gender is required" }
    }
  }

  const errorView = (error: FieldError) => {
    if (!error) return null;

    return (
      <div className="field-error-msg">
        <p>{error.message}</p>
      </div>
    );
  };

  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-2">
        <div className="flex flex-col">
          <div className="flex flex-row field-row">
            <div className="field-label">
              <label htmlFor="firstName" className="input-label">First Name</label>
            </div>
            <div className={`field-value ${errors.firstName && 'field-value-error'}`}>
              <input type="text" id="firstName" className="input-field" {...register('firstName', validations.firstName)} />
            </div>
          </div>
          {errors.firstName && errorView(errors.firstName)}
        </div>
      </div>

      <div className="px-2">
        <div className="flex flex-col">
          <div className="flex flex-row field-row">
            <div className="field-label">
              <label htmlFor="lastName" className="input-label">Last Name</label>
            </div>
            <div className={`field-value ${errors.lastName && 'field-value-error'}`}>
              <input type="text" id="lastName" className="input-field" {...register('lastName', validations.lastName)} />
            </div>
          </div>
          {errors.lastName && errorView(errors.lastName)}
        </div>
      </div>

      <div className="px-2">
        <div className="flex flex-col">
          <div className="flex flex-row field-row">
            <div className="field-label">
              <label htmlFor="email" className="input-label">Email</label>
            </div>
            <div className={`field-value ${errors.email && 'field-value-error'}`}>
              <input type="email" id="email" className="input-field" {...register('email', validations.email)} />
            </div>
          </div>
          {errors.email && errorView(errors.email)}
        </div>
      </div>

      <div className="px-2">
        <div className="flex flex-col">
          <div className="flex flex-row field-row">
            <div className="field-label">
              <label htmlFor="phoneNumber" className="input-label">Phone Number</label>
            </div>
            <div className={`field-value ${errors.phoneNumber && 'field-value-error'}`}>
              <input type="tel" id="phoneNumber" className="input-field" {...register('phoneNumber', validations.phoneNumber)} />
            </div>
          </div>
          {errors.phoneNumber && errorView(errors.phoneNumber)}
        </div>
      </div>

      <div className="px-2">
        <div className="flex flex-col">
          <div className="flex flex-row field-row">
            <div className="field-label">
              <label htmlFor="gender" className="input-label">Gender</label>
            </div>
            <div className={`field-value ${errors.gender && 'field-value-error'}`}>
              <select id="gender" className="input-field" {...register('gender', validations.gender)}>
                <option value="">Select Gender</option>
                <option value={Gender.Male}>Male</option>
                <option value={Gender.Female}>Female</option>
              </select>
            </div>
          </div>
          {errors.gender && errorView(errors.gender)}
        </div>
      </div>

      <div className="px-2">
        <div className="flex flex-col">
          <div className="flex flex-row field-row">
            <div className="field-label"></div>
            <div className="field-value">
              <button className="btn-outline" type="submit">{(edit) ? "SAVE" : "ADD"}</button>
            </div>
          </div>
        </div>
      </div>
    </form>

  );
}

export default EmployeeForm;