const products = require('../models/products')
const category = require('../models/category');

//Get dos Produtos - vai buscar todos os produtos existentes na base de dados
const getAllProducts = (req, res) => {
  products.find(function (err, result) {
    if (err) {
      res.status(400).send(err);
    } else {

      res.status(200).json(result)
    }

  })
}

//Get dos Produtos por ID - vai buscar à base de dados o produto correspondente ao ID pretendido
const getProductById = (req, res) => {
  products.find({id_product: req.params.id}, function (err, result) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(result[0])
    }
  })
}


//Get dos Produtos por Categoria - vai buscar à base de dados o produto correspondente a Categoria pretendido
const getProductBySubCategory = (req, res) => {
  products.find({subCategory: req.params.subCategory}, function (err, result) {
    console.log(req.params.subCategory)
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(result)
    }
  })
}


const getAllCategories = (req, res) => {
    category.find(function (err, result) {
        if (err) {
            res.status(400).send(err);
        }
        else{
           res.status(200).json(result)
        }

    })
}

const getSubCategoryByCategory = (req, res) => {
    category.find({name: req.params.name}, function (err, result) {
        if (err) {
            res.status(400).send(err);
        }
        else{
           res.status(200).json(result[0].subCategories)
        }
    })
}


exports.getAllProducts = getAllProducts;
exports.getProductById = getProductById;
exports.getProductBySubCategory = getProductBySubCategory;
exports.getAllCategories = getAllCategories;
exports.getSubCategoryByCategory = getSubCategoryByCategory;