import { Request, Response } from 'express';
import httpStatus from 'http-status';
import {
  cartInstance,
  categoryInstance,
  findUniqueCategory,
  findUniqueOrder,
  findUniqueProduct,
  likeInstance,
  mailInstance,
  orderDetailInstance,
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
      res
        .status(httpStatus.NO_CONTENT)
        .json({ msg: `Category ${body.category} exist!` });
      return;
    }

    res.status(httpStatus.CREATED).json(newCategory);
  } catch (error) {
    res
      .status(httpStatus.SERVICE_UNAVAILABLE)
      .json({ msg: 'Error in createCategory or Duplicate category' });
  }
};

export const createProducto = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const existCategory = await findUniqueCategory(Number(id));
    if (!existCategory) {
      res
        .status(httpStatus.NO_CONTENT)
        .json({ msg: `Category doensn't exist!` });
      return;
    }

    body.createdById = req.userIdentify as number;
    body.categoryId = Number(id);
    body.category = existCategory?.name as string;
    const newProduct = await productInstance.create({
      data: { ...body },
    });

    res.status(httpStatus.CREATED).json(newProduct);
  } catch (error) {
    res
      .status(httpStatus.SERVICE_UNAVAILABLE)
      .json({ msg: 'Error in createProducto Function' });
  }
};

export const updateProducto = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const exist = await findUniqueProduct(Number(id));
    if (!exist) {
      res
        .status(httpStatus.NO_CONTENT)
        .json({ msg: 'The product does not existe' });
      return;
    }

    const updateUser = await productInstance.update({
      where: { id: exist.id },
      data: { ...body },
    });

    res.status(httpStatus.OK).json(updateUser);
  } catch (error) {
    res
      .status(httpStatus.SERVICE_UNAVAILABLE)
      .json({ msg: 'Error in updateProducto fx' });
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

    res.status(httpStatus.OK).json('Product Destroyed');
  } catch (error) {
    res
      .status(httpStatus.SERVICE_UNAVAILABLE)
      .json({ msg: 'Error in deleteProducto' });
  }
};

export const disableProducto = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const exist = await findUniqueProduct(Number(id));
    if (!exist) {
      res
        .status(httpStatus.NOT_FOUND)
        .json({ msg: 'Product Id does NOT EXIST!' });
      return;
    }

    const updated = await productInstance.update({
      where: { id: Number(id) },
      data: {
        disabled: true,
      },
    });

    res.status(httpStatus.OK).json(updated);
  } catch (error) {
    res
      .status(httpStatus.SERVICE_UNAVAILABLE)
      .json({ msg: 'Error in disableProducto' });
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

    res.status(httpStatus.OK).json({
      data,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    res
      .status(httpStatus.SERVICE_UNAVAILABLE)
      .json({ msg: 'Error in getProductos' });
  }
};

export const searchByCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const existCategory = await findUniqueCategory(Number(id));
    if (!existCategory) {
      res
        .status(httpStatus.BAD_REQUEST)
        .json({ msg: `Category doensn't exist!` });
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

    res.status(httpStatus.OK).json({
      data,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    res
      .status(httpStatus.SERVICE_UNAVAILABLE)
      .json({ msg: 'Error in searchByCategory' });
  }
};

export const getProductDetails = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const data = await findUniqueProduct(Number(id));
    if (!data) {
      res
        .status(httpStatus.NOT_FOUND)
        .json({ msg: 'Product Id does NOT EXIST!' });
      return;
    }

    const imgBelong = await productImgInstance.findMany({
      where: {
        productId: Number(id),
      },
    });
    res.status(httpStatus.OK).json({ data, imgBelong });
  } catch (error) {
    res
      .status(httpStatus.SERVICE_UNAVAILABLE)
      .json({ msg: 'Error in getProductsDetailed' });
  }
};

export const uploadImages = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const exist = await findUniqueProduct(Number(id));
    if (!exist) {
      res
        .status(httpStatus.NOT_FOUND)
        .json({ msg: 'Product Id does NOT EXIST!' });
      return;
    }

    const url = req.file?.path as string;
    const newImage = await productImgInstance.create({
      data: {
        url,
        productId: Number(id),
      },
    });
    res.status(httpStatus.CREATED).json(newImage);
  } catch (error) {
    res
      .status(httpStatus.SERVICE_UNAVAILABLE)
      .json({ msg: 'Error in uploadImages' });
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
      res.status(httpStatus.NO_CONTENT).json('Yout cart is EMPTY!');
      return;
    }

    let total = 0;
    for (const item of cartItems) {
      if (
        item.quantity > item.product.stock &&
        item.product.disabled === false
      ) {
        res
          .status(httpStatus.NOT_ACCEPTABLE)
          .json(
            `There isn't stock for buy ${item.quantity} of ${item.product.name} OR is disabled`
          );
        return;
      }

      total += item.product.price * item.quantity;
    }

    const data = {
      userId: Number(id),
      total: total,
    };

    const myOrder = await orderInstance.create({
      data: { ...data },
    });

    const details = [];
    for (const item of cartItems) {
      details.push({
        orderId: Number(myOrder.id),
        productId: Number(item.productId),
        quantity: Number(item.quantity),
      });
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

    const order = await orderDetailInstance.createMany({
      data: details,
      skipDuplicates: true,
    });

    res
      .status(httpStatus.OK)
      .json({ msg: 'OK', total: `TOTAL: ${total}`, order, data, details });
  } catch (error) {
    res
      .status(httpStatus.SERVICE_UNAVAILABLE)
      .json({ msg: 'Error in buyProducts' });
  }
};

export const getAllTheOrders = async (_: Request, res: Response) => {
  try {
    const orders = await orderInstance.findMany({
      include: {
        details: true,
      },
    });

    if (!orders) {
      res.status(httpStatus.NO_CONTENT).json('The are NOT orders yet!');
      return;
    }

    res.status(httpStatus.OK).json(orders);
  } catch (error) {
    res
      .status(httpStatus.SERVICE_UNAVAILABLE)
      .json({ msg: 'Error in getAllOrders' });
  }
};

export const getMyOrder = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const exist = findUniqueOrder(Number(id));
    if (!exist) {
      res
        .status(httpStatus.NO_CONTENT)
        .json('The are NOT orders yet or the id NOT exist!');
      return;
    }
  } catch (error) {
    res
      .status(httpStatus.SERVICE_UNAVAILABLE)
      .json({ msg: 'Error in getMyOrder' });
  }
};
