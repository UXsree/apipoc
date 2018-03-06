const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
res.status(200).json({
    message: 'Handling GET request of /products',
  });
});

router.post('/',(req,res,next)=>{
  //capturing the product details using body parser starts here.
  const product = {
    name: req.body.name,
    price: req.body.price
  };
   //capturing the product details using body parser ends here.
    res.status(201).json({
    message: 'Handling POST request of /products',
    createdProduct: product //passing the captured body parser product to response json.
  });
});

router.get('/:productId', (req,res,next)=>{
  const id = req.params.productId;
  if(id === 'special'){
      res.status(200).json({
        message: 'You discovered the special ID',
        id: id
      });
  }else {
    res.status(200).json({
      message: 'You passed an ID'
    });
  }
});

router.patch('/:productId', (req,res,next)=>{
  res.status(200).json({
    message: 'Updated product!'
  });
});

router.delete('/:productId', (req,res,next)=>{
  res.status(200).json({
    message: 'Deleted product!'
  });
});
module.exports = router;
