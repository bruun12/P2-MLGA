import { setCookie, getCookie } from '../public/js/basketfill.js'

describe('Setting cookies', () => {
    //let int1, int2, double1, double2, string1, stinrg2;
    setCookie('int1', 2, 1);
    setCookie('int2', 5, 1);
    setCookie('double1', 2.6, 1);
    setCookie('double2', 9.66, 1);
    setCookie('string1', 'abe', 1);
    setCookie('string2', 'Norsk TA', 1)

    describe('Get cookie test', () => {
        test('getCookie1', () => {
            expect(getCookie('int1')).toMatch(/2/);
        })

        test('getCookie2', () => {
            expect(getCookie('int2')).toMatch(/5/);
        })

        test('getCookie3', () => {
            expect(getCookie('double1')).toMatch(/2.6/);
        })

        test('getCookie4', () => {
            expect(getCookie('double2')).toMatch(/9.66/);
        })

        test('getCookie5', () => {
            expect(getCookie('string1')).toMatch(/abe/);
        })

        test('getCookie6', () => {
            expect(getCookie('string2')).toMatch(/Norsk TA/);
        })
    })
})