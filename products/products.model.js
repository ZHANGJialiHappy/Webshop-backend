import * as fs from "fs/promises";
const PRODUCTS_FILE = "./products/products.json";

// return all product from file
export async function getAll() {
  try {
    let productsTxt = await fs.readFile(PRODUCTS_FILE);
    let products = JSON.parse(productsTxt);
    return products;
  } catch (err) {
    if (err.code === "ENOENT") {
      // file does not exits
      await save([]); // create a new file with ampty array
      return []; // return empty array
    } // // cannot handle this exception, so rethrow
    else throw err;
  }
}

// save array of products to file
async function save(products = []) {
  let productsTxt = JSON.stringify(products);
  await fs.writeFile(PRODUCTS_FILE, productsTxt);
}

// test function for product ID
function findProduct(productArray, Id) {
  return productArray.findIndex((currProduct) => currProduct.productId === Id);
}

// get product by ID
export async function getByID(productId) {
  let productArray = await getAll();
  let index = findProduct(productArray, productId);
  if (index === -1)
    throw new Error(`Product with ID:${productId} doesn't exist`);
  else return productArray[index];
}

// create a new product
export async function add(newProduct) {
  let productArray = await getAll();
  if (findProduct(productArray, newProduct.productId) !== -1)
    throw new Error(`Product with Id:${newProduct.productId} already exists`);
  productArray.push(newProduct);
  await save(productArray);
}

// update existing product
export async function update(productId, product) {
  let productArray = await getAll();
  let index = findProduct(productArray, productId); // findIndex
  if (index === -1)
    throw new Error(`Product with ID:${productId} doesn't exist`);
  else {
    productArray[index] = product;
    await save(productArray);
  }
}

// delete existing product
export async function remove(productId) {
  let productArray = await getAll();
  let index = findProduct(productArray, productId); // findIndex
  if (index === -1)
    throw new Error(`Product with ID:${productId} doesn't exist`);
  else {
    productArray.splice(index, 1); // remove product from array
    await save(productArray);
  }
}
