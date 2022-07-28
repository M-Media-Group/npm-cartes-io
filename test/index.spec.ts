import cartes from '../src';

describe('index', () => {
  describe('cartes', () => {
    it('should return a string containing the message', () => {
      const result = cartes.maps().get();
      expect(result).toContain('uuid');
    });
  });
});
