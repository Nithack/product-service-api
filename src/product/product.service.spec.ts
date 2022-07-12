import { Test, TestingModule } from '@nestjs/testing';
import { UtilTest } from '../../test/util';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  const utilMock = new UtilTest();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Novo Produto', () => {
    it('deve retornar um novo produto', () => {
      expect(service.create(utilMock.productMock[0])).toEqual(
        utilMock.productMockResult[0],
      );
    });
  });
  describe('findAll', () => {
    it('deve retornar todos os produtos', () => {
      expect(service.findAll()).toEqual([utilMock.productMockResult[0]]);
    });
  });
  describe('findOne', () => {
    it('deve retornar um produto', () => {
      expect(service.findOne(1)).toEqual(utilMock.productMockResult[0]);
    });
    it('deve retornar um null', () => {
      expect(service.findOne(2)).toEqual(undefined);
    });
  });
});
