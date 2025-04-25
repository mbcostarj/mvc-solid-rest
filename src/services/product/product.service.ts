export type SellOutputDto = {
  id: string;
  balance: number;
}

export type BuyOutputDto = {
  id: string;
  balance: number;
}

export type CreateOutputDto = {
  id: string;
  balance: number;
}

export type ListOutputDto = {
  products: {
    id: string;
    name: string;
    price: number
    balance: number;
  }[]
}

export interface ProductService {
  sell(id: string, ammount: number): Promise<SellOutputDto>;
  buy(id: string, ammount: number): Promise<BuyOutputDto>;
  list(): Promise<ListOutputDto>;
  create(name: string, price: number): Promise<CreateOutputDto>
}