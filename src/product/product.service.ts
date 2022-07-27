import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { Product } from './schemas/produc.schema';

const products = [];

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const newProduct = new this.productModel(createProductDto);
    if (newProduct.validateSync()) {
      throw new Error('Product validation failed');
    }
    return newProduct.save();
  }

  findAll() {
    return this.productModel.find({});
  }

  findOne(id: number) {
    return this.productModel.findOne({ id: id });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const productResult = products.find((product) => product.id === id);
    if (productResult) {
      const updatedProduct = Object.assign(productResult, updateProductDto);
      products[id - 1] = updatedProduct;
      return updatedProduct;
    }
    return null;
  }

  // remove(id: number) {
  //   const productResult = products.find((product) => product.id === id);
  //   if (productResult) {
  //     products[id - 1].splice(products.indexOf(productResult), 1);
  //     return productResult;
  //   }
  //   return null;
  // }
}
