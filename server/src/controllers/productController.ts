import { Request, Response } from 'express';
import { prisma } from '../config/db';

const formatProduct = (product: { id: bigint; [key: string]: unknown }) => ({
  ...product,
  id: Number(product.id),
});

/**
 * @desc    Fetch all products
 * @route   GET /api/products
 * @access  Public
 */
export const getProducts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        id: 'asc',
      },
    });

    // Format BigInt for JSON safely (Prisma returns BigInt for product id)
    const formattedProducts = products.map(formatProduct);

    res.status(200).json({
      success: true,
      data: formattedProducts,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch products',
    });
  }
};

/**
 * @desc    Fetch single product by name (case-insensitive)
 * @route   GET /api/products/:itemName
 * @access  Public
 */
export const getProductByName = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const rawName = req.params.itemName;
    const itemName = Array.isArray(rawName) ? rawName.join(' ') : rawName;
    const decodedName = decodeURIComponent(itemName);

    const product = await prisma.product.findFirst({
      where: {
        name: {
          equals: decodedName,
          mode: 'insensitive',
        },
      },
    });

    if (!product) {
      res.status(404).json({
        success: false,
        error: 'Product not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: formatProduct(product),
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch product',
    });
  }
};

/**
 * @desc    Fetch all product names
 * @route   GET /api/products/names
 * @access  Public
 */
export const getProductNames = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const names = await prisma.product.findMany({
      select: {
        name: true,
      },
      orderBy: {
        id: 'asc',
      },
    });

    res.status(200).json({
      success: true,
      data: names,
    });
  } catch (error) {
    console.error('Error fetching product names:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch product names',
    });
  }
};
