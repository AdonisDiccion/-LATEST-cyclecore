import Product from "../models/product.js";
import slugify from "slugify";
import cloudinary from "cloudinary";
import braintree from "braintree";
import dotenv from "dotenv";
import Order from "../models/order.js";
import paypal from "paypal-rest-sdk";

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

paypal.configure({
  mode: "sandbox", // Set to 'live' for production
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_SECRET,
});

export const create = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stocks,
      shipping,
      category,
      subcategory,
      brand,
      sold,
    } = req.fields;
    const { photo } = req.files;

    // Validation
    switch (true) {
      case !name.trim():
        res.json({ error: "Name is required" });
      case !description.trim():
        res.json({ error: "Description is required" });
      case !price.trim():
        res.json({ error: "Price is required" });
      case !category.trim():
        res.json({ error: "Category is required" });
      case !subcategory.trim():
        res.json({ error: "SubCategory is required" });
      case !brand.trim():
        res.json({ error: "Brand is required" });
      case !stocks.trim():
        res.json({ error: "stocks is required" });
      case !shipping.trim():
        res.json({ error: "Shipping is required" });
      case photo && photo.size > 10000000:
        res.json({ error: "Image should be less than 10mb" });
    }

    // if (!req.files.photo || !req.files.photo.url) {
    //     return res.status(400).json({ error: "Photo is required" });
    // }

    // Upload image to Cloudinary
    let photoUrl, photoPublicId;
    if (photo) {
      const uploadedPhoto = await cloudinary.uploader.upload(photo.path);
      photoUrl = uploadedPhoto.secure_url;
      photoPublicId = uploadedPhoto.public_id;
    }

    // Create new product
    const product = new Product({
      name,
      description,
      price,
      stocks,
      shipping,
      category,
      subcategory,
      brand,
      sold,
      photo: { url: photoUrl, public_id: photoPublicId },
      slug: slugify(name),
    });

    // Save product to database
    await product.save();
    res.json(product);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

// implement photo
export const list = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .populate("subcategory")
      .populate("brand")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

export const read = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .select("photo")
      .populate("category")
      .populate("subcategory")
      .populate("brand")
      .populate("name")
      .populate("description")
      .populate("stocks")
      .populate("shipping")
      .populate("price")
      .populate("sold");

    res.json(product);
  } catch (err) {
    console.log(err);
  }
};

export const photo = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).select(
      "photo"
    );
    if (product.photo && product.photo.url) {
      return res.redirect(product.photo.url);
    }
    return res.sendStatus(404);
  } catch (err) {
    console.log(err);
    return res.sendStatus(404);
  }
};

export const remove = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);

    // Delete photo from Cloudinary if it exists
    if (product.photo && product.photo.public_id) {
      await cloudinary.uploader.destroy(product.photo.public_id);
    }

    // Delete product from database
    await product.remove();

    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Could not delete product" });
  }
};

export const update = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stocks,
      shipping,
      category,
      subcategory,
      brand,
    } = req.fields;
    const { photo } = req.files;

    // Validation
    switch (true) {
      case !name.trim():
        return res.json({ error: "Name is required" });
      case !description.trim():
        return res.json({ error: "Description is required" });
      case !price.trim():
        return res.json({ error: "Price is required" });
      case !category.trim():
        return res.json({ error: "Category is required" });
      case !subcategory.trim():
        return res.json({ error: "SubCategory is required" });
      case !brand.trim():
        return res.json({ error: "Brand is required" });
      case !stocks.trim():
        return res.json({ error: "Name is required" });
      case !shipping.trim():
        return res.json({ error: "Name is required" });
      case photo && photo.size > 1000000:
        return res.json({ error: "Image should be less than 1mb" });
    }

    // Upload image to Cloudinary
    let photoUrl, photoPublicId;
    if (photo) {
      const uploadedPhoto = await cloudinary.uploader.upload(photo.path);
      photoUrl = uploadedPhoto.secure_url;
      photoPublicId = uploadedPhoto.public_id;
    }

    // Update product
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      {
        ...req.fields,
        photo: { url: photoUrl, public_id: photoPublicId },
        slug: slugify(name),
      },
      { new: true }
    );

    res.json(product);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const filteredProducts = async (req, res) => {
  try {
    const { checked, radio } = req.body;

    let args = {};
    if (checked.length > 0) {
      args["$or"] = [
        { category: checked },
        { subcategory: checked },
        { brand: checked },
      ];
    }
    if (radio.length > 0) args.price = { $gte: radio[0], $lte: radio[1] };

    const products = await Product.find(args);
    console.log("products found in filtered query =>", products.length);
    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

export const productsCount = async (req, res) => {
  try {
    const total = await Product.find({}).estimatedDocumentCount();
    res.json(total);
  } catch (err) {
    console.log(err);
  }
};

export const listProducts = async (req, res) => {
  try {
    const perPage = 5;
    const page = req.params.page ? req.params.page : 1;

    const products = await Product.find({})
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

export const productSearch = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await Product.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    });
    res.json(results);
  } catch (err) {
    console.log(err);
  }
};

export const relatedProducts = async (req, res) => {
  try {
    const { productId, categoryId } = req.params;
    const related = await Product.find({
      category: categoryId,
      _id: { $ne: productId },
    })
      .select("-photo")
      .populate("category")
      .limit(4);
    res.json(related);
  } catch (err) {
    console.log(err);
  }
};

export const getToken = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

// export const processPayment = async () => {
//   try {
//     let nonceFromTheClient = req.body.paymentMethodNonce;
//     let newTransaction = gateway.transaction.sale(
//       {
//         amount: "10.00",
//         paymentMethodNonce: nonceFromTheClient,
//         options: {
//           submitForSettlement: true,
//         }
//       },
//       function (error, result) {
//         if (result) {
//           res.send(result);
//         } else {
//           res.status(500).send(err);
//         }
//       }
//     );
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const processPayment = async (req, res) => {
//   try {
//     console.log(req.body);
//     const { nonce } = req.body;

//     let newTransaction = gateway.transaction.sale(
//       {
//         amount: (10.0).toLocaleString("en-PH", {
//           style: "currency",
//           currency: "PHP",
//         }),
//         paymentMethodNonce: nonce,
//         options: {
//           submitForSettlement: true,
//         },
//       },
//       function (error, result) {
//         if (result) {
//           res.send(result);
//         } else {
//           res.status(500).send(error);
//         }
//       }
//     );
//   } catch (err) {
//     console.log(err);
//   }
// };

export const processPayment = async (req, res) => {
  try {
    console.log(req.body);
    const { nonce, cart } = req.body;

    let totalPrice = 0;
    let totalQuantity = 0;
    cart.forEach((item) => {
      totalPrice += item.price * item.quantity;
      totalQuantity += item.quantity;
    });

    let newTransaction = gateway.transaction.sale(
      {
        amount: totalPrice,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          // res.send(result);
          const order = new Order({
            products: cart,
            payment: result,
            buyer: req.user._id,
            totalQuantity: totalQuantity, // new field to store total quantity
            totalPrice: totalPrice // new field to store total price
          }).save();
          //decrement Quantity
          decrementStocks(cart);
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const decrementStocks = async (cart) => {
  try {
    //mongodb query
    const bulkOps = cart.map((item) => {
      return {
        updateOne: {
          filter: { _id: item._id },
          update: { $inc: { stocks: -0, sold: +1 } },
        },
      };
    });

    const updated = await Product.bulkWrite(bulkOps, {});

  } catch (err) {
    console.log(err);
  }
};

// export const paypalPayment = async (req, res) => {
//   try {
//     const { cart, nonce } = req.body;
//     let total = 0;

//     // Calculate the total price of the cart
//     cart.map((i) => {
//       total += i.price;
//     });

//     // Create a PayPal payment request
//     const paymentRequest = {
//       intent: "sale",
//       payer: {
//         payment_method: "paypal",
//       },
//       transactions: [
//         {
//           amount: {
//             total,
//             currency: "PHP", // Set to the currency you want to use
//           },
//           description: "Payment for your order", // Optional
//           item_list: {
//             items: cart.map((i) => {
//               return {
//                 name: i.title,
//                 sku: i._id,
//                 price: i.price,
//                 currency: "USD", // Set to the currency you want to use
//                 stocks: 1,
//               };
//             }),
//           },
//         },
//       ],
//       redirect_urls: {
//         return_url: "http://localhost:3000/success",
//         cancel_url: "http://localhost:3000/cancel",
//       },
//     };

//     // Make the PayPal API call to create the payment
//     paypal.payment.create(paymentRequest, function (error, payment) {
//       if (error) {
//         console.error(error);
//         return res.status(500).send({ error: "Unable to process payment" });
//       } else {
//         // Redirect the user to PayPal for payment authorization
//         for (let i = 0; i < payment.links.length; i++) {
//           if (payment.links[i].rel === "approval_url") {
//             return res.status(200).json({ redirectUrl: payment.links[i].href });
//           }
//         }
//       }
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: "Unable to process payment" });
//   }
// };

// export const processPayment = async (req, res) => {
//   try {
//     console.log(req.body);
//     const { nonce } = req.body;

//     let newTransaction = gateway.transaction.sale(
//       {
//         amount: "10.00",
//         paymentMethodNonce: nonce,
//         options: {
//           submitForSettlement: true,
//         },
//         currencyIsoCode: "PHP",
//       },
//       function (error, result) {
//         if (result) {
//           res.send(result);
//         } else {
//           res.status(500).send(error);
//         }
//       }
//     );
//   } catch (err) {
//     console.log(err);
//   }
// };
