import * as fs from "fs/promises";
const CUSTOMERS_FILE = "./customers/customers.json";

// return all customer from file
export async function getAll() {
  try {
    let customersTxt = await fs.readFile(CUSTOMERS_FILE);
    let customers = JSON.parse(customersTxt);
    return customers;
  } catch (err) {
    if (err.code === "ENOENT") {
      // file does not exits
      await save([]); // create a new file with ampty array
      return []; // return empty array
    } // // cannot handle this exception, so rethrow
    else throw err;
  }
}

// save array of customers to file
async function save(customers = []) {
  let customersTxt = JSON.stringify(customers);
  await fs.writeFile(CUSTOMERS_FILE, customersTxt);
}

// test function for customer ID
function findCustomerById(customerArray, Id) {
  return customerArray.findIndex(
    (currCustomer) => currCustomer.customerId === Id
  );
}
function findCustomerByUsername(customerArray, username) {
  return customerArray.findIndex(
    (currCustomer) => currCustomer.userName === username
  );
}

// get gustomer by ID
export async function getByID(customerId) {
  let customerArray = await getAll();
  let index = findCustomerById(customerArray, customerId);
  if (index === -1)
    throw new Error(`Customer with ID:${customerId} doesn't exist`);
  else return customerArray[index];
}

export async function login(username, password) {
  let customerArray = await getAll();
  let index = findCustomerByUsername(customerArray, username);
  if (index === -1)
    throw new Error(`Customer with ID:${username} doesn't exist`);
  if (customerArray[index].password !== password) {
    throw new Error("username and password don't match");
  }
  return customerArray[index];
}

// create a new customer
export async function add(newCustomer) {
  let customerArray = await getAll();
  if (findCustomerById(customerArray, newCustomer.customerId) !== -1)
    throw new Error(
      `Customer with Id:${newCustomer.customerId} already exists`
    );
  customerArray.push(newCustomer);
  await save(customerArray);
}

// update existing customer
export async function update(customerId, customer) {
  let customerArray = await getAll();
  let index = findCustomerById(customerArray, customerId); // findIndex
  if (index === -1)
    throw new Error(`Customer with ID:${customerId} doesn't exist`);
  else {
    customerArray[index] = customer;
    await save(customerArray);
  }
}

// delete existing customer
export async function remove(customerId) {
  let customerArray = await getAll();
  let index = findCustomerById(customerArray, customerId); // findIndex
  if (index === -1)
    throw new Error(`Customer with ID:${customerId} doesn't exist`);
  else {
    customerArray.splice(index, 1); // remove customer from array
    await save(customerArray);
  }
}
