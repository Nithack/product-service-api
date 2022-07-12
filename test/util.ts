export class UtilTest {
  productMockResult = [
    {
      id: 1,
      name: 'Batata',
      price: 2.5,
    },
    {
      id: 2,
      name: 'Milho',
      price: 0.57,
    },
    {
      id: 3,
      name: 'Novo Produto',
      price: 11.55,
    },
    {
      id: 4,
      name: 'Novo Produto',
      price: 5.86,
    },
  ];

  productMock = [
    {
      name: 'Batata',
      price: 2.5,
    },
    {
      name: 'Milho',
      price: 0.57,
    },
    {
      name: 'Novo Produto',
      price: 11.55,
    },
    {
      name: 'Novo Produto',
      price: 5.86,
    },
  ];
  getProductById(id: number) {
    const productResult = this.productMockResult.find(
      (product) => product.id === id,
    );
    return productResult;
  }
}
