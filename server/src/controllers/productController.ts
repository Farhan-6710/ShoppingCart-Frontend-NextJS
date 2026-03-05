import { Request, Response } from 'express';
import { prisma } from '../config/db';

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

    // Formatting BigInt for JSON safely (Prisma returns BigInt for product id)
    const formattedProducts = products.map((product) => ({
      ...product,
      id: Number(product.id), // Ensure it can be serialized by express res.json
    }));

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
