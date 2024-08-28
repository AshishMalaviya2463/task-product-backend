import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import mongoose from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private ProductModel: mongoose.Model<Product>,
  ) {}

  async findAllProducts(query: any): Promise<Product[]> {
    const filter: any = {};
    let sort: any = {};

    if (query.search) {
      filter.title = { $regex: query.search, $options: 'i' };
    }

    if (query.category) {
      filter.category = { $in: query.category.split(',') };
    }

    if (query.minPrice || query.maxPrice) {
      filter.price = {};
      if (query.minPrice) filter.price.$gte = Number(query.minPrice);
      if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
    }

    if (query.sort) {
      if (query.sort === 'lth') {
        sort.price = 1;
      } else if (query.sort === 'htl') {
        sort.price = -1;
      }
    }

    const products = await this.ProductModel.find(filter).sort(sort).exec();

    return products;
  }

  async create(product: Product): Promise<Product> {
    const res = await this.ProductModel.create(product);
    return res;
  }
}
