import Product from "../models/ProductModel.js";
import dotenv from "dotenv";
dotenv.config();

export const createProduct = async (newProduct) => {
  const {
    selled,
    discount,
    name,
    image,
    type,
    price,
    countInStock,
    rating,
    description,
  } = newProduct;
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        name: name,
      });
      if (checkProduct !== null) {
        resolve({
          status: "Err",
          errMessage: "the product is already!",
        });
      } else {
        const createProduct = await Product.create({
          selled,
          discount,
          name,
          image,
          type,
          price,
          countInStock,
          rating,
          description,
        });

        if (createProduct) {
          resolve({
            status: "ok",
            massage: "create successful",
            data: createProduct,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
export const updateProduct = async (id, updateProduct) => {
  const { name, image, type, price, countInStock, rating, description } =
    updateProduct;
  console.log("id update ", updateProduct);

  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });
      if (checkProduct === null) {
        reject({
          status: "ERR",
          errMessage: "product is not defined!",
        });
      }
      if (checkProduct) {
        const createProduct = await Product.findByIdAndUpdate(
          id,
          updateProduct,
          {
            new: true,
          }
        );
        resolve({
          status: "ok",
          massage: "update is successful",
          data: createProduct,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
export const deleteProduct = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });
      if (checkProduct === null) {
        reject({
          status: "ERR",
          errMessage: "product is not defined!",
        });
      } else {
        await Product.findByIdAndDelete(id);
        resolve({
          status: "ok",
          massage: "delete is successful",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const deleteManyProduct = async (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Product.deleteMany({ _id: ids });
      resolve({
        status: "ok",
        massage: "delete is successful",
      });
    } catch (error) {
      reject(error);
    }
  });
};
export const getAllProduct = async (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    const totalProduct = await Product.countDocuments();
    try {
      if (filter) {
        console.log("sort", filter);
        const label = filter[0];
        console.log("label", label);
        const productFilter = await Product.find({
          [label]: { $regex: filter[1] },
        })
          .limit(limit)
          .skip(limit * page);

        resolve({
          status: "Ok",
          massage: "Get product filter successful!",
          productFilter: productFilter,
          total: totalProduct,
          pageCurrent: page + 1,
          totalPage: Math.ceil(totalProduct / limit),
        });
      }
      if (sort) {
        console.log("sort", sort);
        const objectSort = {};
        objectSort[sort[1]] = sort[0];
        console.log("objectSort", objectSort);
        const productAllSort = await Product.find()
          .limit(limit)
          .skip(limit * page)
          .sort(objectSort);
        resolve({
          status: "Ok",
          massage: "Get product sort successful!",
          productAllSort: productAllSort,
          total: totalProduct,
          pageCurrent: page + 1,
          totalPage: Math.ceil(totalProduct / limit),
        });
      }

      const productAll = await Product.find()
        .limit(limit)
        .skip(limit * page);
      resolve({
        status: "Ok",
        massage: "Get product successful!",
        productAll: productAll,
        total: totalProduct,
        pageCurrent: page + 1,
        totalPage: Math.ceil(totalProduct / limit),
      });
    } catch (error) {
      reject({
        massage: error,
      });
    }
  });
};
export const getDetailsProduct = async (id) => {
  console.log("id", id);

  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });
      if (checkProduct === null) {
        resolve({
          status: "ERR",
          errMessage: "product is not defined!",
        });
      }

      if (checkProduct) {
        const createProduct = await Product.findById(id);
        resolve({
          status: "ok",
          massage: "detail product is successful",
          data: createProduct,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
