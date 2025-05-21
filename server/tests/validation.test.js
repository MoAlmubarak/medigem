// server/tests/validation.test.js
// Note: You'd need to install testing libraries like Jest to run this

const { validateDrugName } = require('../middleware/validators');

describe('Input Validation', () => {
  let req, res, next;
  
  beforeEach(() => {
    req = {
      params: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });
  
  test('should pass validation for valid drug name', async () => {
    req.params.drugName = 'Ibuprofen';
    
    // Call all middleware functions in the array
    for (const middleware of validateDrugName) {
      await middleware(req, res, next);
    }
    
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });
  
  test('should fail validation for empty drug name', async () => {
    req.params.drugName = '';
    
    // Call all middleware functions in the array
    for (const middleware of validateDrugName) {
      await middleware(req, res, next);
      if (res.status.mock.calls.length > 0) break; // Stop if validation fails
    }
    
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      status: 'fail',
      message: 'Invalid input data'
    }));
  });
  
  // Additional test cases...
});