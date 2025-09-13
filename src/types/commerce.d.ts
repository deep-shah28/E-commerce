declare module '@chec/commerce.js' {
  export default class Commerce {
    constructor(publicKey: string, debug?: boolean);
    products: {
      list(): Promise<any>;
    };
    categories: {
      list(): Promise<any>;
    };
    cart: {
      retrieve(): Promise<any>;
      add(productId: string, quantity: number): Promise<any>;
      update(itemId: string, data: any): Promise<any>;
      remove(itemId: string): Promise<any>;
      empty(): Promise<any>;
    };
  }
}
