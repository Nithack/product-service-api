import { Test, TestingModule } from '@nestjs/testing';
import { connect, Connection, Model } from 'mongoose';
import { UtilTest } from '../../test/util';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product, ProductSchema } from './schemas/produc.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('ProductController', () => {
  let controller: ProductController;
  const utilMock = new UtilTest();
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let productModel: Model<Product>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    console.log(uri);
    mongoConnection = (await connect(uri)).connection;
    productModel = mongoConnection.model(Product.name, ProductSchema);
  }, 10000);
  afterEach(async () => {
    productModel.deleteMany({});
  });
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        ProductService,
        { provide: getModelToken(Product.name), useValue: productModel },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('deve retornar um novo produto', async () => {
      const newProduct = utilMock.productMock[0];
      const productResult = await controller.create(newProduct);
      expect(productResult).toHaveProperty('name', newProduct.name);
      expect(productResult).toHaveProperty('price', newProduct.price);
    });
  });

  describe('findAll', () => {
    it('deve retornar todos os produtos', async () => {
      const newProduct = utilMock.productMock[0];
      await controller.create(newProduct);
      const productsResult = await controller.findAll();
      expect(productsResult[0]).toHaveProperty('name', newProduct.name);
      expect(productsResult[0]).toHaveProperty('price', newProduct.price);
    });
  });
  describe('findOne', () => {
    it('deve retornar um produto', async () => {
      const newProduct = utilMock.productMock[0];
      await controller.create(newProduct);
      expect(await controller.findOne('1')).toHaveProperty(
        'name',
        newProduct.name,
      );
    });
    it('deve retornar um null', async () => {
      expect(await controller.findOne('2')).toEqual(null);
    });
  });
});
