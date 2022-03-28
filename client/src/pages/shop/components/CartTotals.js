export const CartTotalCode = {
  SHIPPING: 'shipping',
  PAYMENT: 'payment',
  SUBTOTAL: 'subtotal',
  GRAND_TOTAL: 'grand_total',
  DISCOUNT: 'discount',
  TAX: 'tax'
};

/**
 * returns particular total by its code
 * @param {[]} totals
 * @param {string} code
 * @returns {{title:string, value:number}}
 * */
export const getCartTotalByCode = (totals, code) => totals.find(total => total.code === code);

/**
 * returns particular total value by its code
 * @param {[]} totals
 * @param {string} code
 * @returns {number}
 * */
export const getCartTotalValueByCode = (totals, code) => {
  const total = getCartTotalByCode(totals, code);

  return total ? total.value : 0;
};
