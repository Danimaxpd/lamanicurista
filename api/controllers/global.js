const SearchTree = require('../helpers/SearchTree');

exports.get_by_prefix = (req, res, next) => {
  try {
    const data = SearchTree.SearchTree(req.params.prefix);
    if(data) {
      res.status(200).json(data);
    } else {
      res.status(400).json({});
    }
  } catch (error) {
    console.error(err);
    res.status(500).json({
        error: err
    });
  }
};

exports.create_name = (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path
  });
  product
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created product successfully",
        createdProduct: {
          name: result.name,
          price: result.price,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:3000/products/" + result._id
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

