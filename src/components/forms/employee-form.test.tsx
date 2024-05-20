import { render, screen, waitFor, within } from '@testing-library/react';
import EmployeeForm from './employee-form';
import user from '@testing-library/user-event';


describe('EmployeeForm', () => {
    const onSubmit = jest.fn();

    beforeEach(() => {
        onSubmit.mockClear();
        render(<EmployeeForm onSubmitCallback={onSubmit} edit={false}></EmployeeForm>);
    });

    it('onSubmit is called when all fields pass validation', async () => {
        await user.type(getFirstNameInput(), 'Luluddd');
        await user.type(getLastNameInput(), 'Reinger');
        await user.type(getEmailInput(), 'Melany_Rau70@gmail.com');
        await user.type(getPhoneNumberInput(), '+94771277687');
        await selectGender("F");
        await clickSubmitButton();


        await waitFor(() => {
            expect(onSubmit).toHaveBeenCalledWith({
                "firstName": "Luluddd",
                "lastName": "Reinger",
                "email": "Melany_Rau70@gmail.com",
                "phoneNumber": "+94771277687",
                "gender": "F",
            });
        });
        expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    it('should not submit when first name is invalid (less than 6 characters)', async () => {
        await user.type(getFirstNameInput(), 'Lulu');
        await user.type(getLastNameInput(), 'Reinger');
        await user.type(getEmailInput(), 'Melany_Rau70@gmail.com');
        await user.type(getPhoneNumberInput(), '+94771277687');
        await selectGender("F");
        await clickSubmitButton();

        expect(onSubmit).not.toHaveBeenCalled();
    });

    it('should not submit when first name is invalid (More than 10 characters)', async () => {
        await user.type(getFirstNameInput(), 'Lululululul');//11 chars
        await user.type(getLastNameInput(), 'Reinger');
        await user.type(getEmailInput(), 'Melany_Rau70@gmail.com');
        await user.type(getPhoneNumberInput(), '+94771277687');
        await selectGender("F");
        await clickSubmitButton();
        
        expect(onSubmit).not.toHaveBeenCalled();
    });

    it('should not submit when Last name is invalid (less than 6 characters)', async () => {
        await user.type(getFirstNameInput(), 'Lululu');
        await user.type(getLastNameInput(), 'Reing');
        await user.type(getEmailInput(), 'Melany_Rau70@gmail.com');
        await user.type(getPhoneNumberInput(), '+94771277687');
        await selectGender("F");
        await clickSubmitButton();

        expect(onSubmit).not.toHaveBeenCalled();
    });

    it('should not submit when Last name is invalid (More than 10 characters)', async () => {
        await user.type(getFirstNameInput(), 'Lululu');
        await user.type(getLastNameInput(), 'Reingerrei');
        await user.type(getEmailInput(), 'Melany_Rau70@gmail.com');
        await user.type(getPhoneNumberInput(), '+94771277687');
        await selectGender("F");
        await clickSubmitButton();
        
        expect(onSubmit).not.toHaveBeenCalled();
    });

});




const getFirstNameInput = () => screen.getByRole("textbox", { name: /first name/i });
const getLastNameInput = () => screen.getByRole('textbox', { name: /Last Name/i });
const getEmailInput = () => screen.getByRole('textbox', { name: /Email/i });
const getPhoneNumberInput = () => screen.getByRole('textbox', { name: /Phone Number/i });

const getGenderSelect = () => screen.getByRole('combobox', { name: /gender/i });
const getSubmitButton = () => screen.getByRole('button');

const selectGender = (gender: string) => {
    user.selectOptions(getGenderSelect(), within(getGenderSelect()).getByRole('option', { name: gender }));
};

const clickSubmitButton = async () => {
    await user.click(getSubmitButton());
}