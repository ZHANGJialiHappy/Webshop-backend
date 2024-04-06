import * as productModel from "./products.model.js";

export async function getAllProducts(req, res) {
  try {
    let allProducts = await productModel.getAll();
    res.json(allProducts);
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}

export async function getRecommedProducts(req, res) {
  try {
    let allProducts = await productModel.getAll();
    let recommendProducts = allProducts.filter(
      (product) => product.new === true && product.discount === true
    );
    res.json(recommendProducts);
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}

// export async function postProduct(req, res) {
//   try {
//     let newProduct = req.body;
//     await productModel.add(newProduct);
//     res.end();
//   } catch (error) {
//     // res.statusMessage=
//     res.status(400).send(error.message);
//   }
// }

export async function getProduct(req, res) {
  try {
    let id = parseInt(req.params.id);
    let product = await productModel.getByID(id);
    res.json(product);
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}

// export async function putProduct(req, res) {
//   try {
//     let id = parseInt(req.params.id);
//     let product = req.body;
//     await productModel.update(id, product);
//     res.end();
//   } catch (error) {
//     // res.statusMessage=
//     res.status(400).send(error.message);
//   }
// }

// export async function deleteProduct(req, res) {
//   try {
//     let id = parseInt(req.params.id);
//     await productModel.remove(id);
//     res.end();
//   } catch (error) {
//     // res.statusMessage=
//     res.status(400).send(error.message);
//   }
// }
