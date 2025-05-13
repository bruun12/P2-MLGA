import { renderTextElem, renderImgElem, renderInputElem, renderBtn, formatDates, clampQty } from '../public/js/dom-utils.js'

describe('Date formatting data', () => {
    const event1 = [
        {
            address_id: 124,
            date: "2015-06-13T22:00:00.000Z",
            description: "Maecenas leo odio, condimentum id, luctus nec, malesuada et, lorem.",
            id: 2,
            img: "http://dummyimage.com/144x100.png/cc0000/ffffff",
            member_id: 21,
            store_id: 48,
            title: "solution"
        }
    ];

    const event2 = [
        {
            address_id: 128,
            date: "2024-03-12T06:56:00.000Z",
            description: "Maecenas leo odio, condimentum id, luctus nec, malesuada et, lorem.",
            id: 2,
            img: "http://dummyimage.com/144x100.png/cc0000/ffffff",
            member_id: 26,
            store_id: 478,
            title: "bruh"
        }
    ];

    const event3 = [
        {
            address_id: 12,
            date: "2022-12-24T12:00:00.000Z",
            description: "Maecenas leo odio, condimentum id, luctus nec, malesuada et, lorem.",
            id: 2,
            img: "http://dummyimage.com/144x100.png/cc0000/ffffff",
            member_id: 221,
            store_id: 448,
            title: "peter"
        }
    ];

    describe('Testing formatting function', () => {        
        test('formatDates1', () => {
            const result = formatDates(event1, 'date', 'localDate'); // Store returned data in result
            expect(result[0]).toHaveProperty('localDate'); // Check if first item in result contains newly created localDate
            expect(result[0].localDate).toBe('13/06/15 - 22:00') // Check if it converted the UTC date to expeceted output
        });

        test('formatDates2', () => {
            const result = formatDates(event2, 'date', 'localDate'); // Store returned data in result
            expect(result[0]).toHaveProperty('localDate'); // Check if first item in result contains newly created localDate
            expect(result[0].localDate).toBe('12/03/24 - 06:56') // Check if it converted the UTC date to expeceted output
        });

        test('formatDates3', () => {
            const result = formatDates(event3, 'date', 'localDate'); // Store returned data in result
            expect(result[0]).toHaveProperty('localDate'); // Check if first item in result contains newly created localDate
            expect(result[0].localDate).toBe('24/12/22 - 12:00') // Check if it converted the UTC date to expeceted output
        });
    })
});

describe('Testing clampQty', () => {
    let minVal = 0;
    let maxVal = 10;
    test('to be maxVal', () => {
        let inputVal = 15;
        expect(clampQty(inputVal, minVal, maxVal)).toBe(maxVal);
    });

    test('to be minVal', () => {
        let inputVal = 1;
        expect(clampQty(inputVal, minVal, maxVal)).toBe(minVal);
    });

    test('to be inputVal', () => {
        let inputVal = 7;
        expect(clampQty(inputVal, minVal, maxVal)).toBe(inputVal);
    });

});