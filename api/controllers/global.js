const SearchTree = require('../helpers/SearchTree');

exports.get_by_prefix = (req, res, next) => {
  try {
    const prefixVal = (req.params.prefix) ? req.params.prefix : null;
    const data = SearchTree.SearchTree(prefixVal);
    if (data.length > 0 && data) {
      res.status(200).json(data);
    } else {
      res.status(400).json({ message: 'No match found - Check your input.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error
    });
  }
};

exports.create_name = (req, res, next) => {
  try {
    let name = req.body.name;
    let time = req.body.times;
    if (!name || !time) {
      res.status(400).json({ message: 'Error - Check your input.' });
    }
    const data = SearchTree.AddIntree(name);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(400).json({ message: 'The name not exist / The system will increase the popularity.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error
    });
  }
};

