import { isValidNumberForRegion } from 'libphonenumber-js'

function isValidLkNumber(phoneNumber: string): boolean {
    //validate lk numbers
    return isValidNumberForRegion(phoneNumber, 'LK');
}

export function validatePhone(phoneNumber: string) {

    if (isValidLkNumber(phoneNumber)) {
        return true;
    }
    return "Invalid LK phone number";

}