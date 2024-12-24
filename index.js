const express = require('express');
let cors = require('cors');

const app = express();
app.use(cors());
const port = 3010;

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

//funcction  Add an Item to the Cart
function addItems(productId, name, price, quantity, cart) {
  cart.push({
    productId: productId,
    name: name,
    price: price,
    quantity: quantity,
  });
  return cart;
}

//Endpoint 1: Add an Item to the Cart
app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);
  let result = addItems(productId, name, price, quantity, cart);
  res.json(result);
});

//function to Edit Quantity of an Item in the Cart
function updateQuantity(cart, productId, quantity) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId == productId) {
      cart[i].quantity = quantity;
    }
  }
  return cart;
}

//Endpoint 2: Edit Quantity of an Item in the Cart
app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let result = updateQuantity(cart, productId, quantity);
  res.json({ result });
});

//function to Delete an Item from the Cart
function deleteItem(cart, productId) {
  return cart.productId != productId;
}

//Endpoint 3: Delete an Item from the Cart
app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  let result = cart.filter((cart) => deleteItem(cart, productId));
  res.json(result);
});

//Endpoint 4: Read Items in the Cart
app.get('/cart', (req, res) => {
  res.json({ cart });
});

//fuction to  Calculate Total Quantity of Items in the Cart
function calculateTotalQuantity(cart) {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].quantity;
  }
  return total;
}

//Endpoint 5: Calculate Total Quantity of Items in the Cart
app.get('/cart/total-quantity', (req, res) => {
  let result = calculateTotalQuantity(cart);
  res.json({ totalQuantity: result });
});

//fuction to Calculate Total Price of Items in the Cart
function calculateTotalPrice(cart) {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price * cart[i].quantity;
  }
  return total;
}

//Endpoint 6: Calculate Total Price of Items in the Cart
app.get('/cart/total-price', (req, res) => {
  let result = calculateTotalPrice(cart);
  res.json({ totalPrice: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
