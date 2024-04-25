import { test, expect } from '@playwright/test';
import { Calculate } from '../api/calculate';

test.describe('Calculate spec', () => {
    const parameter = [
        [200, 2, 'divide', 100],
        [200, 2, 'add', 202],
        [200, 2, 'multiply', 400],
        [200, 2, 'subtract', 198]
    ];

    for (const testCase of parameter) {
        test(`should be able ${testCase[2]} `, async ({}) => {
            const response = await (await Calculate.calculate(testCase[0], testCase[1], testCase[2])).json();
            expect(response.result).toEqual(testCase[3]);
            console.log(testCase);
        });
    }

    // const parameters = [
    //     { num1: 200, num2: 2, operation: 'divide', expectedResult: 100 },
    //     { num1: 200, num2: 2, operation: 'add', expectedResult: 202 },
    //     { num1: 200, num2: 2, operation: 'multiply', expectedResult: 400 },
    //     { num1: 200, num2: 2, operation: 'subtract', expectedResult: 198 }
    // ];
    // for (const parameter of parameters) {
    //     const { num1, num2, operation, expectedResult } = parameter;
    //     test(`should be able ${operation}`, async ({}) => {
    //         const response = await (await Calculate.calculate(num1, num2, operation)).json();
    //         expect(response.result).toEqual(expectedResult);
    //     });
    // }

    // test('should be able divide 2 number', async ({}) => {
    //     const response = await (await Calculate.calculate(200, 2, 'divide')).json();

    //     expect(response.result).toEqual(100);
    // });
    // test('should be able to add numbers', async ({}) => {
    //     const response = await (await Calculate.calculate(200, 2, 'add')).json();

    //     expect(response.result).toEqual(202);
    // });
    // test('should be able to multiply', async ({}) => {
    //     const response = await (await Calculate.calculate(200, 2, 'multiply')).json();

    //     expect(response.result).toEqual(400);
    // });
    // test('should be able to subtract', async ({}) => {
    //     const response = await (await Calculate.calculate(200, 2, 'subtract')).json();

    //     expect(response.result).toEqual(198);
    // });
});
