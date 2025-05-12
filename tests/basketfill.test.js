import { setCookie, getCookie } from '../public/js/basketfill.js'

describe('Setting cookies', () => {
    let int1, int2, double1, double2, string1, stinrg2;
    setCookie(int1, 2, 7);
    setCookie(int2, 5, 3);
    setCookie(double1, 2.6, 9);
    setCookie(double2, 9.66, 1);
    setCookie(string1, 'abe', 2);
    setCookie(string2, 'Norsk TA', 4)

    describe('Get cookie test', () => {
        test('getCookie1', () => {
            expect(getCookie(int1)).toBe(2);
        })

        test('getCookie2', () => {
            expect(getCookie(int2)).toBe(5);
        })

        test('getCookie3', () => {
            expect(getCookie(double1)).toBeCloseTo(2.6);
        })

        test('getCookie4', () => {
            expect(getCookie(double2)).toBeCloseTo(9.66);
        })

        test('getCookie5', () => {
            expect(getCookie(string1)).toMatch(/abe/);
        })

        test('getCookie6', () => {
            expect(getCookie(string1)).toMatch(/Norsk TA/);
        })
    })
})