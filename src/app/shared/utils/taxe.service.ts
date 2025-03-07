import { Category } from '../../features/Products/enums/category.enum';
import { Product } from '../../features/Products/models/product.model';

const TAX_RATE_FOOD_MEDICINE = 0;
const TAX_RATE_BOOKS = 10;
const TAX_RATE_DEFAULT = 20;
const ADDITIONAL_TAX_IMPORTED = 5;

export function calculateTax(product: Product): number {
  let taxRate = 0;

  switch (product.category) {
    case Category.Food:
    case Category.Medecine:
      taxRate = TAX_RATE_FOOD_MEDICINE;
      break;
    case Category.Books:
      taxRate = TAX_RATE_BOOKS;
      break;
    default:
      taxRate = TAX_RATE_DEFAULT;
  }

  const additionalTax = product.isImported ? ADDITIONAL_TAX_IMPORTED : 0;

  return (
    calculateRoundedTax(product.price, taxRate) +
    calculateRoundedTax(product.price, additionalTax)
  );
}

export function calculateRoundedTax(price: number, taxRate: number): number {
  const taxAmount = (price * taxRate) / 100;
  return Math.ceil(taxAmount * 20) / 20;
}
