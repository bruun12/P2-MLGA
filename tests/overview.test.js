import { dotProduct, cosineSimilarity, categoryDisplay } from '../public/js/overview.js';

// Mock fetch
//global.fetch = jest.fn();

describe('math in overview', () => {
  const vecA = [5, 2, 10];
  const vecB = [9, 5, -5];
  const vecC = [1, 2, 3];
  const vecD = [4, 5, 6];

  describe('Dot Product Testing', () => {
    test('dotProduct1', () => {
      expect(dotProduct(vecA, vecB)).toBe(5);
    });

    test('dotProduct2', () => {
      expect(dotProduct(vecC, vecD)).toBe(32);
    });

    test('dotProduct3', () => {
      expect(dotProduct(vecC, vecB)).toBe(4);
    });

    test('dotProduct4', () => {
      expect(dotProduct(vecA, vecD)).toBe(90);
    });

  });

  // Calculations double checked using https://www.omnicalculator.com/math/cosine-similarity
  describe('Cosine Similarity Testing', () => {
    test('cosineSimilarity1', () => {
      expect(cosineSimilarity(vecA, vecB)).toBeCloseTo(0.0384); 
    }) 

    test('cosineSimilarity2', () => {
      expect(cosineSimilarity(vecC, vecD)).toBeCloseTo(0.974); 
    }) 

    test('cosineSimilarity3', () => {
      expect(cosineSimilarity(vecC, vecB)).toBeCloseTo(0.0934); 
    }) 

    test('cosineSimilarity4', () => {
      expect(cosineSimilarity(vecA, vecD)).toBeCloseTo(0.903);
    }) 
  });
});









