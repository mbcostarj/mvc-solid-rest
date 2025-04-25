import { Request, Response } from "express";
import { ProductRepositoryPrisma } from "../../../repositories/product/prisma/product.repository.prisma";
import { ProductRepository } from "../../../repositories/product/product.repository";
import { ProductServiceImplementation } from "../../../services/product/implementation/product.service.implementation";
import { prisma } from "../../../utilities/prisma.util";
import { BADFLAGS } from "dns";

export class ProductController {

  private constructor(){}

  public static build(){
    return new ProductController();
  }

  public async create(request: Request, response: Response){
    const {name, price} = request.body;

    const _Repository = ProductRepositoryPrisma.build(prisma);
    const _Service = ProductServiceImplementation.build(_Repository);
  
    const output = await _Service.create(name, price);

    const data = {
      id: output.id,
      name,
      price,
      balance: output.balance
    }

    response.status(201).json(data).send();

  }

  public async list(request: Request, response: Response) {

    const _Repository = ProductRepositoryPrisma.build(prisma);
    const _Service = ProductServiceImplementation.build(_Repository);

    const output = await _Service.list();

    const data = {
      products: output.products
    }

    response.status(200).json(data).send();

  }

  public async buy(request: Request, response: Response) {

    const { id } = request.params;
    const { amount } = request.body;

    const _Repository = ProductRepositoryPrisma.build(prisma);
    const _Service = ProductServiceImplementation.build(_Repository);

    const output = await _Service.buy(id, amount);

    const data = {
      id: output.id,
      balance: output.balance
    }

    response.status(200).json(data).send();

  }

  public async sell(request: Request, response: Response) {

    const { id } = request.params;
    const { amount } = request.body;

    const _Repository = ProductRepositoryPrisma.build(prisma);
    const _Service = ProductServiceImplementation.build(_Repository);

    const output = await _Service.sell(id, amount);

    const data = {
      id: output.id,
      balance: output.balance
    }

    response.status(200).json(data).send();

  }

}