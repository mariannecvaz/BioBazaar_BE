const WooCommerce = require('../Database/dbconfig.js')

//Get dos Produtos - vai buscar todos os produtos existentes na base de dados
const getAllProducts = (req,res) => {
    WooCommerce.get("products")
    .then((response) => {
     res.status(200).json(response.data)
    })
    .catch((error) => {
    
      res.status(404).json(error.response.data)
    });
}

//Get dos Produtos por ID - vai buscar à base de dados o produto correspondente ao ID pretendido
const getProductById = (req,res) => {
    WooCommerce.get("products/" + req.params.id)
    .then((response) => {
     res.status(200).json(response.data)
    })
    .catch((error) => {
    
      res.status(404).json(error.response.data)
    });
}


//Get dos Produtos por Categoria - vai buscar à base de dados o produto correspondente a Categoria pretendido
const getProductByCategory = (req,res) => {
  WooCommerce.get("products/" + req.params.type)
  .then((response) => {
   res.status(200).json(response.data)
  })
  .catch((error) => {
  
    res.status(404).json(error.response.data)
  });
}




exports.getAllProducts = getAllProducts;
exports.getProductById = getProductById;
exports.getProductByCategory = getProductByCategory;