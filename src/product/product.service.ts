import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

const products = [];

@Injectable()
export class ProductService {
  create(createProductDto: CreateProductDto) {
    const newProduct = Object.assign(createProductDto, {
      id: products.length + 1,
    });
    products.push(newProduct);
    return newProduct;
  }

  findAll() {
    return products;
  }

  findOne(id: number) {
    const productResult = products.find((product) => product.id === id);
    return productResult;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const productResult = products.find((product) => product.id === id);
    if (productResult) {
      const updatedProduct = Object.assign(productResult, updateProductDto);
      return updatedProduct;
    }
    return null;
  }

  remove(id: number) {
    const productResult = products.find((product) => product.id === id);
    if (productResult) {
      products.splice(products.indexOf(productResult), 1);
      return productResult;
    }
    return null;
  }
}
