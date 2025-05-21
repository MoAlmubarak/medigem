const fdaService = require('../services/fdaService');

exports.getDrugSideEffects = async (req, res) => {
  try {
    const { drugName } = req.params;
    
    if (!drugName) {
      return res.status(400).json({ error: 'Drug name is required' });
    }
    
    const sideEffects = await fdaService.fetchDrugSideEffects(drugName);
    
    return res.json(sideEffects);
  } catch (error) {
    console.error('Error fetching drug side effects:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch drug information',
      message: error.message 
    });
  }
};