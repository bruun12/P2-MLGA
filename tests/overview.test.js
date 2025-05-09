import { dotProduct, cosineSimilarity } from '../public/js/overview.js';

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
  });

  describe('Cosine Similarity Testing', () => {
    test('cosineSimilarity1', () => {
      expect(cosineSimilarity(vecA, vecB)).toBeCloseTo(0.0346); //Tim ret gerne til forventede værdier
    }) 

    test('cosineSimilarity2', () => {
      expect(cosineSimilarity(vecC, vecD)).toBeCloseTo(0.974); //Tim ret gerne til forventede værdier
    }) 
  });
});









