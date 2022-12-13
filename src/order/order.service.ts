import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  selectingInformation = {
    id: true,
    userId: true,
    user: {
      select: {
        name: true,
        email: true,
      },
    },
    products: {
      select: {
        quantity: true,
        product: {
          select: {
            name: true,
          },
        },
      },
    },
    createdAt: true,
  };

  create(createOrderDto: CreateOrderDto) {
    const data: Prisma.OrderCreateInput = {
      user: {
        connect: {
          id: createOrderDto.userId,
        },
      },
      orderProducts: {
        createMany: {
          data: createOrderDto.products.map((element) => ({
            productId: element.productId,
            quantity: element.quantity,
          })),
        },
      },
    };

    return this.prisma.order.create({
      data,
      select: this.selectingInformation,
    });
  }

  findAll() {
    return this.prisma.order.findMany({ select: this.selectingInformation });
  }

  findOne(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      select: this.selectingInformation,
    });
  }
}
