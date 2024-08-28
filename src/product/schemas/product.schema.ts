import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Category {
  BEAUTY = 'beauty',
  FRAGRANCES = 'fragrances',
  FURNITURE = 'furniture',
  ELECTRONICS = 'electronics',
}

@Schema({
  timestamps: true,
})
export class Product {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  discountPercentages: number;

  @Prop()
  stock: number;

  @Prop()
  brand: string;

  @Prop()
  thumbnail: string;

  @Prop()
  category: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
