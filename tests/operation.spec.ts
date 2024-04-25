import { test, expect } from '@playwright/test';
import { Calculate } from '../api/calculate';

test.describe('Calculate spec', () => {
    test('should be able divide 2 number', async ({}) => {
        const response = await (await Calculate.calculate(200, 2, 'divide')).json();

        expect(response.result).toEqual(100);
    });
    test('should be able to add numbers', async ({}) => {
        const response = await (await Calculate.calculate(200, 2, 'add')).json();

        expect(response.result).toEqual(202);
    });
    test('should be able to multiply', async ({}) => {
        const response = await (await Calculate.calculate(200, 2, 'multiply')).json();

        expect(response.result).toEqual(400);
    });
    test('should be able to subtract', async ({}) => {
        const response = await (await Calculate.calculate(200, 2, 'subtract')).json();

        expect(response.result).toEqual(198);
    });
});
