import { Request, Response } from 'express';
import {
  cartInstance,
  categoryInstance,
  findUniqueCategory,
  findUniqueProduct,
  likeInstance,
  mailInstance,
  orderInstance,
  productImgInstance,
  productInstance,
} from '../../utils/lib';

export const addCategory = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const newCategory = await categoryInstance.create({
      data: { ...body },
    });

    if (!newCategory) {
      res.status(400).json({ msg: `Category ${body.category} exist!` });
      return;
    }

    res.status(200).json(newCategory);
  } catch (error) {
    res
      .status(400)
      .json({ msg: 'Error in createCategory or Duplicate category' });
  }
};

export const createProducto = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const existCategory = await findUniqueCategory(Number(id));
    if (!existCategory) {
      res.status(400).json({ msg: `Category doensn't exist!` });
      return;
    }

    body.createdById = req.userIdentify as number;
    body.categoryId = Number(id);
    body.category = existCategory?.name as string;
    const newProduct = await productInstance.create({
      data: { ...body },
    });

    res.status(200).json(newProduct);
  } catch (error) {
    res.status(404).json({ msg: 'Error in createProducto Function' });
  }
};

export const updateProducto = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const exist = await findUniqueProduct(Number(id));
    if (!exist) {
      res.status(400).json({ msg: 'The product does not existe' });
      return;
    }

    const updateUser = await productInstance.update({
      where: { id: exist.id },
      data: { ...body },
    });

    res.status(200).json(updateUser);
  } catch (error) {
    res.status(404).json({ msg: 'Error in updateProducto fx' });
  }
};

export const deleteProducto = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const exist = await findUniqueProduct(Number(id));
    if (!exist) {
      res.status(400).json({ msg: 'Product Id does NOT EXIST!' });
      return;
    }

    await productInstance.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json('Product Destroyed');
  } catch (error) {
    res.status(404).json({ msg: 'Error in deleteProducto' });
  }
};

export const disableProducto = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const exist = await findUniqueProduct(Number(id));
    if (!exist) {
      res.status(400).json({ msg: 'Product Id does NOT EXIST!' });
      return;
    }

    const updated = await productInstance.update({
      where: { id: Number(id) },
      data: {
        disabled: true,
      },
    });

    res.status(200).json(updated);
  } catch (error) {
    res.status(404).json({ msg: 'Error in disableProducto' });
  }
};

export const getProductosPerPage = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 5;

    const totalCount = await productInstance.count();
    const totalPages = Math.ceil(totalCount / pageSize);
    const offset = (page - 1) * pageSize;

    const data = await productInstance.findMany({
      take: pageSize,
      skip: offset,
    });

    res.status(200).json({
      data,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ msg: 'Error in getProductos' });
  }
};

export const searchByCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const existCategory = await findUniqueCategory(Number(id));
    if (!existCategory) {
      res.status(400).json({ msg: `Category doensn't exist!` });
      return;
    }

    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 5;

    const totalCount = await productInstance.count({
      where: {
        categoryId: Number(id),
      },
    });
    const totalPages = Math.ceil(totalCount / pageSize);
    const offset = (page - 1) * pageSize;

    const data = await productInstance.findMany({
      take: pageSize,
      skip: offset,
      where: {
        categoryId: Number(id),
      },
    });

    res.status(200).json({
      data,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ msg: 'Error in searchByCategory' });
  }
};

export const getProductDetails = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const data = await findUniqueProduct(Number(id));
    if (!data) {
      res.status(400).json({ msg: 'Product Id does NOT EXIST!' });
      return;
    }

    const imgBelong = await productImgInstance.findMany({
      where: {
        productId: Number(id),
      },
    });
    res.status(200).json({ data, imgBelong });
  } catch (error) {
    res.status(500).json({ msg: 'Error in getProductsDetailed' });
  }
};

export const uploadImages = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const exist = await findUniqueProduct(Number(id));
    if (!exist) {
      res.status(400).json({ msg: 'Product Id does NOT EXIST!' });
      return;
    }

    const url = req.file?.path as string;
    const newImage = await productImgInstance.create({
      data: {
        url,
        productId: Number(id),
      },
    });
    res.status(200).json(newImage);
  } catch (error) {
    res.status(500).json({ msg: 'Error in uploadImages' });
  }
};

export const verifyIfThereLikes = async (
  avaibleCount: number,
  namePro: string,
  idP: number
) => {
  const userPutLikeToProduct = await likeInstance.findFirst({
    where: {
      productId: idP,
    },
    orderBy: {
      id: 'desc',
    },
    include: {
      user: {
        select: {
          firstname: true,
          email: true,
        },
      },
    },
  });

  if (!userPutLikeToProduct) {
    return;
  }

  await mailInstance.create({
    data: {
      recipient: userPutLikeToProduct.user.email,
      sender: process.env.MAILER_USER || 'TINY STORE',
      subject: 'Notify',
      body: `Hi, ${userPutLikeToProduct.user.firstname}. There are only ${avaibleCount} units left of the ${namePro}!!`,
    },
  });
};

export const buyProducts = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const cartItems = await cartInstance.findMany({
      where: {
        userId: Number(id),
      },
      include: {
        product: {
          select: {
            name: true,
            price: true,
            stock: true,
            disabled: true,
          },
        },
      },
    });

    if (!cartItems || cartItems.length === 0) {
      res.status(400).json('Yout cart is EMPTY!');
      return;
    }

    const data = [];
    let total = 0;
    for (const item of cartItems) {
      if (
        item.quantity > item.product.stock &&
        item.product.disabled === false
      ) {
        res
          .status(400)
          .json(
            `There isn't stock for buy ${item.quantity} of ${item.product.name} OR is disabled`
          );
        return;
      }
      data.push({
        userId: Number(id),
        productId: item.productId,
        quantity: item.quantity,
        price: item.quantity * item.product.price,
      });

      total += item.product.price * item.quantity;
    }

    for (const item of cartItems) {
      const upItem = await productInstance.update({
        where: {
          id: item.productId,
        },
        data: {
          stock: { decrement: item.quantity },
        },
      });

      if (upItem.stock <= 3) {
        verifyIfThereLikes(upItem.stock, upItem.name, upItem.id);
      }
    }

    await cartInstance.deleteMany({
      where: {
        userId: Number(id),
      },
    });

    const order = await orderInstance.createMany({
      data: data,
      skipDuplicates: true,
    });

    res.status(200).json({ msg: 'OK', total: `TOTAL: ${total}`, order, data });
  } catch (error) {
    res.status(500).json({ msg: 'Error in buyProducts' });
  }
};
