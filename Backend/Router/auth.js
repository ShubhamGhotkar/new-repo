const express = require("express");
const router = express.Router();
require("../DB/connection");

const Product = require("../Model/producrSchema");

router.get("/api", (req, res) => {
  // const {page = 1, limit = 2} = req.query;
  // For Pagination

  
  if (req.query.id) {
    const id = req.query.id;
    Product.findById(id)
      .then((data) => {
        if (data) {
          res.status(404).send({ message: `not found Product With id ${id}` });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: `error occure while Product with id ${id}` });
      });
  } else {
    Product.find()
      .then((user) => res.send(user))
      .catch((err) =>
        res
          .status(500)
          .send({ message: err.message || "Error occur in Find Method" })
      );
  }
});

router.get('/paginatedProduct',async (req,res)=>{
  const AllProduct = await Product.find()
  const page =parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startInd = (page-1)*limit
  const lastInd = (page)*limit

  const results = {}
  results.allProduct = AllProduct.length
  results.pageCount = Math.ceil(AllProduct.length/limit)

  if(lastInd<AllProduct.length){
    results.next ={
      page:page+1
    }
  }
  if(startInd>0){
    results.prev ={
      page:page-1
    }
  }

  results.result = AllProduct.slice(startInd,lastInd)
  res.json(results)

})

router.post("/add", async (req, res) => {
  const { name, value, category, catId } = req.body;

  if (!name || !value) {
    return res.status(422).json({ error: `Input Field Required` });
  }

  try {
    const product = new Product({ name, value, category, catId });

    await product.save();
    res.status(201).json({ message: `Product Added SucessFully` });
  } catch (err) {
    res.status(400).json({ message: `Failed To Add Product` });
    console.log(err);
  }
});

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  Product.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(400)
          .send(`cannot Delete Product with ${id} Product Not Found`);
      } else {
        res.send({ message: "Product was deleted Sucessfully" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({
          message:
            err.message || `Error Occur while Deleting the Product ${id}`,
        });
    });
});

router.put("/update/:id", (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to Update Cannot Be Empty" });
  }

  const id = req.params.id;

  Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res
          .status(400)
          .send(`cannot Update Product with ${id}. Product Not Found`);
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error Occur while Updating the Product" });
    });
});

module.exports = router;
