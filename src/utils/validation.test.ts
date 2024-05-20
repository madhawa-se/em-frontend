// phoneValidator.test.ts

import { validatePhone } from "./validation";

const errorMessage = "Invalid LK phone number";

describe('validatePhone', () => {
  test('Return error for invalid phone number', () => {
    const invalidNumber = '123';
    expect(validatePhone(invalidNumber)).toBe(errorMessage);
  });

  test('Return error for valid diffrent country number(UK number)', () => {
    const ukNumber = '+441234567890';
    expect(validatePhone(ukNumber)).toBe(errorMessage);
  });

  test('Returns valid for sri Lankan number without country code', () => {
    const slNumberWithoutCode = '0771234567'; 
    expect(validatePhone(slNumberWithoutCode)).toBe(true);
  });

  test('Returns valid for international formatted Sri Lankan number', () => {
    const intlFormattedSlNumber = '+94771234567';
    expect(validatePhone(intlFormattedSlNumber)).toBe(true);
  });
});
