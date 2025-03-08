import { Category } from '../../features/Products/enums/category.enum';
import { Product } from '../../features/Products/models/product.model';
import { PricePipe } from './price.pipe';

describe('PricePipe', () => {
  let pipe: PricePipe;

  beforeEach(() => {
    pipe = new PricePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should calculate price TTC for a product without tax', () => {
    const mockProduct: Product = {
      id: 1,
      productName: 'Test Product',
      price: 100,
      quantity: 5,
      stock: 10,
      isImported: false,
      category: Category.Food,
    };
    const result = pipe.transform(mockProduct);
    expect(result).toEqual(100); // Prix TTC = 100 + 10% de tax
  });

  it('should calculate price TTC for an imported product', () => {
    const mockProduct: Product = {
      id: 1,
      productName: 'Test Product',
      price: 100,
      quantity: 5,
      stock: 10,
      isImported: true,
      category: Category.Electric,
    };
    const result = pipe.transform(mockProduct);
    expect(result).toEqual(125); // Prix TTC = 100 + 20% + 5%
  });

  it('should calculate price TTC for an imported book', () => {
    const product: Product = {
      id: 1,
      productName: 'Test Product',
      price: 100,
      quantity: 5,
      stock: 10,
      isImported: true,
      category: Category.Books, // Tax de 10% + tax supplémentaire de 5%
    };
    const result = pipe.transform(product);
    expect(result).toEqual(115); // Prix TTC = 100 + 10% + 5%
  });

  it('should calculate price TTC for a medicine', () => {
    const product: Product = {
      id: 1,
      productName: 'Test Product',
      price: 100,
      quantity: 5,
      stock: 10,
      isImported: false,
      category: Category.Medecine,
    };
    const result = pipe.transform(product);
    expect(result).toEqual(100);
  });
});
