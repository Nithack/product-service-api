import { Test, TestingModule } from '@nestjs/testing';
import { UtilTest } from '../../test/util';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

describe('ProductController', () => {
  let controller: ProductController;
  const utilMock = new UtilTest();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('deve retornar um novo produto', () => {
      const newProduct = utilMock.productMock[0];
      expect(controller.create(newProduct)).toEqual(
        utilMock.productMockResult[0],
      );
    });
  });

  describe('findAll', () => {
    it('deve retornar todos os produtos', () => {
      expect(controller.findAll()).toEqual([utilMock.productMockResult[0]]);
    });
  });
  describe('findOne', () => {
    it('deve retornar um produto', () => {
      expect(controller.findOne('1')).toEqual(utilMock.productMockResult[0]);
    });
    it('deve retornar um null', () => {
      expect(controller.findOne('2')).toEqual(undefined);
    });
  });
});
