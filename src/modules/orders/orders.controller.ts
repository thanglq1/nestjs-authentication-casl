import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';
import { ListOrderRequestDto } from './dto/order.request.dto';
import { CheckPermission } from 'src/decorators/check.permission.decorator';
import { FeaturesType, PermissionsType } from 'src/shared/enums';
import { CaslAbilityFactory } from '../authz/casl-ability.factory';
import { CurrentUser } from 'src/decorators/current.user.decorator';
import { CustomForbiddenException } from 'src/exceptions/forbidden.exception';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Post()
  // @UseGuards(AuthzGuard)
  // @CheckPermission([PermissionsType.CREATE, FeaturesType.ORDER])
  async create(@Body() createOrderDto: CreateOrderDto, @CurrentUser() user) {
    const ability = await this.caslAbilityFactory.createForUser(user.sub);
    if (ability.can(PermissionsType.CREATE, FeaturesType.ORDER)) {
      return this.ordersService.createOrder(createOrderDto);
    }
    throw new CustomForbiddenException();
  }

  @Get()
  getOrders(@Query() orderRequestDto: ListOrderRequestDto) {
    return this.ordersService.getOrders(orderRequestDto);
  }

  @Get(':id')
  getOrder(@Param('id') orderId: string) {
    return this.ordersService.getOrder(orderId);
  }

  @Put(':id')
  update(@Param('id') orderId: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.updateOrder(orderId, updateOrderDto);
  }

  @Delete(':id')
  deleteOrder(@Param('id') orderId: string) {
    return this.ordersService.deleteOrder(orderId);
  }
}
