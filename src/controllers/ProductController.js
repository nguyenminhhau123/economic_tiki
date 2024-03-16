import * as ProductService from "../services/ProductService.js";

export const createProduct = async (req, res) => {
  try {
    const data = await req.body;

    const { name, image, type, price, countInStock, rating, description } =
      data;

    if (
      !name ||
      !image ||
      !type ||
      !price ||
      !countInStock ||
      !rating ||
      !description
    ) {
      return res.status(200).json({
        status: "ERR",
        errMessage: "the input is required",
      });
    } else {
      const response = await ProductService.createProduct(data);
      res.status(200).json(response);
    }
  } catch (err) {
    return res.status(404).json({
      errMessage: err,
    });
  }
};
export const updateProduct = async (req, res) => {
  const idProduct = req.params.id;
  const data = req.body;
  try {
    const response = await ProductService.updateProduct(idProduct, data);
    res.status(200).json(response);
  } catch (err) {
    return res.status(404).json({
      errMessage: err,
    });
  }
};
export const deleteProduct = async (req, res) => {
  const idProduct = req.params.id;
  try {
    const response = await ProductService.deleteProduct(idProduct);
    res.status(200).json(response);
  } catch (err) {
    return res.status(404).json({
      errMessage: err,
    });
  }
};
export const getAllProduct = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;

    const response = await ProductService.getAllProduct(
      Number(limit || 30),
      Number(page || 0),
      sort,
      filter
    );
    res.status(200).json(response);
  } catch (err) {
    return res.status(404).json({
      errMessage: err,
    });
  }
};

export const getDetailsProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await ProductService.getDetailsProduct(id);
    res.status(200).json(response);
  } catch (err) {
    return res.status(404).json({
      errMessage: err,
    });
  }
};
