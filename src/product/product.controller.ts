import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { Category, Product } from './schemas/product.schema';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getAllProducts(@Query() query: any): Promise<Product[]> {
    return this.productService.findAllProducts(query);
  }

  @Get('/categories')
  async getCategories(): Promise<typeof Category> {
    return Category;
  }

  @Post()
  async createProduct(@Body() product): Promise<Product> {
    return this.productService.create(product);
  }
}
