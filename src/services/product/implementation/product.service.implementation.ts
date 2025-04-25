import { Product } from "../../../entities/product";
import { ProductRepository } from "../../../repositories/product/product.repository";
import { BuyOutputDto, CreateOutputDto, ListOutputDto, ProductService, SellOutputDto } from "../product.service";

export class ProductServiceImplementation implements ProductService {
  
  private constructor(readonly repository: ProductRepository){}

  public static build(repository: ProductRepository){
    return new ProductServiceImplementation(repository);
  }

  public async sell(id: string, ammount: number): Promise<SellOutputDto> {

    const _Product = await this.repository.find(id);
    
    if(!_Product){
      throw new Error("O produto "+ id + " não foi encontrado.");
    }

    _Product.sell(ammount);

    await this.repository.update(_Product);

    const output: SellOutputDto = {
      id: _Product.id,
      balance: _Product.quantity
    }

    return output;
  }
  
  public async buy(id: string, ammount: number): Promise<BuyOutputDto> {
    const _Product = await this.repository.find(id);
    
    if(!_Product){
      throw new Error("O produto "+ id + " não foi encontrado.");
    }

    _Product.buy(ammount);

    await this.repository.update(_Product);

    const output: BuyOutputDto = {
      id: _Product.id,
      balance: _Product.quantity
    }

    return output;
  }
  
  public async list(): Promise<ListOutputDto> {
    const _Product = await this.repository.list();

    const products = _Product.map((p)=>{
      return {
        id: p.id,
        name: p.name,
        price: p.price,
        balance: p.quantity
      }
    });

    const output: ListOutputDto = {
      products
    };

    return output;
  }

  public async create(name: string, price: number): Promise<CreateOutputDto>{ 

    const _Product = Product.create(name, price);

    await this.repository.save(_Product);

    const output: CreateOutputDto = {
      id: _Product.id,
      balance: _Product.quantity
    }

    return output;

  }
  
}