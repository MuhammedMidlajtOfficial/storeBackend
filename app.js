const express = require("express");
const app = express();

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

mongoose.connect(
  "mongodb+srv://sinanmarayi:database@cluster0.cnjdoba.mongodb.net/Authentication?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
mongoose.connection.on("connected", () => {
  console.log("connected to database");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ response: "Hello World" });
});

// middleware
app.use("/user", require("./routes/user"));

const ProductDetails = require("./models/productDetails");
const ShopProduct = require("./models/shopProductDetails");

// add new product details godown
app.post("/addNewProduct", async (req, res) => {
  const product = req.body;

  const data = {
    name: product.name,
    price: product.price,
    quantity: product.quantity,
    recievedQuantity: product.recievedQuantity,
    purchasedDate: product.purchasedDate,
    recievedDate: product.recievedDate,
    stockBalance: product.stockBalance,
    additionalNumber: product.additionalNumber,
    personName: product.personName,
  };
  const productObj = new ProductDetails(data);
  try {
    const response = await productObj.save();
    res.json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.json({ response: "Error occured while adding product details" });
  }
});

// get all product details godown
app.get("/getAllProducts", async (req, res) => {
  try {
    const response = await ProductDetails.find();
    res.json({
      success: true,
      data: response,
    });
  } catch (error) {
    res.json({ response: "Error occured while fetching product details" });
  }
});

// edit the product by id godown
app.post("/editProduct", async (req, res) => {
  const id = req.body.id;
  const product = req.body.product;

  const data = {
    name: product.name,
    price: product.price,
    quantity: product.quantity,
    recievedQuantity: product.recievedQuantity,
    purchasedDate: product.purchasedDate,
    recievedDate: product.recievedDate,
    stockBalance: product.stockBalance,
    additionalNumber: product.additionalNumber,
    personName: product.personName,
  };
  try {
    let doc = await ProductDetails.findOneAndUpdate({ _id: id }, data);
    res.json({ response: "Product details updated successfully", data: doc });
  } catch (error) {
    res.json({ response: "Error occured while updating product details" });
  }
});

// delete the product by id godown
app.post("/deleteProduct", async (req, res) => {
  const id = req.body.id;
  try {
    let doc = await ProductDetails.findOneAndDelete({ _id: id });
    res.json({ response: "Product details deleted successfully", data: doc });
  } catch (error) {
    res.json({ response: "Error occured while deleting product details" });
  }
});

// add new product details shop
app.post("/addNewShopProduct", async (req, res) => {
  const product = req.body;
  const data = {
    name: product.name,
    price: product.price,
    shopIntake: product.shopIntake,
    stockBalance: product.stockBalance,
    monthlySales: product.monthlySales,
    shopName: product.shopName,
    personName: product.personName,
  };
  const productObj = new ShopProduct(data);
  try {
    const response = await productObj.save();
    res.json({
      response: "shop Product details added successfully",
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.json({ response: "Error occured while adding product details" });
  }
});

// get all product details shop
app.get("/getAllShopProducts", async (req, res) => {
  try {
    const response = await ShopProduct.find();
    res.json({
      response: "shop Product details fetched successfully",
      data: response,
    });
  } catch (error) {
    res.json({ response: "Error occured while fetching product details" });
  }
});

// get products by shop name
app.post("/getShopProducts", async (req, res) => {
    const shopName = req.body.shopName;
    console.log(shopName)
    try {
       const data = await ShopProduct.find({shopName: shopName})
         res.json({
              success: true,
                data: data,
            });
    } catch (error) {
        res.json({ success: false, message: "Error occured while fetching products" });
    }
});

// edit the product by id shop
app.post("/editShopProduct", async (req, res) => {
  const id = req.body.id;
  const product = req.body.product;
  const data = {
    name: product.name,
    price: product.price,
    shopIntake: product.shopIntake,
    stockBalance: product.stockBalance,
    monthlySales: product.monthlySales,
    shopName: product.shopName,
    personName: product.personName,
  };

  try {
    let doc = await ShopProduct.findOneAndUpdate({ _id: id }, data);
    res.json({
      success: true,
      data: doc,
    });
  } catch (error) {
    res.json({ success: false, message: "Error occured while updating product" });
  }
});

// delete the product by id shop
app.post("/deleteShopProduct", async (req, res) => {
    const id = req.body.id;
    try {
        let doc = await ShopProduct.findOneAndDelete({ _id: id });
        res.json({ response: "Product details deleted successfully", data: doc });
      } catch (error) {
        res.json({ response: "Error occured while deleting product details" });
      }
});


app.listen(3000, () => {
  console.log("Server started at port 3000");
});
