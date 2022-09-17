import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto, UpdateInvoiceDto } from './dto/invoice.dto';
import { ListInvoiceRequestDto } from './dto/invoice.request.dto';
import { FeaturesType, PermissionsType } from 'src/shared/enums';
import { CurrentUser } from 'src/decorators/current.user.decorator';
import { CaslAbilityFactory } from '../authz/casl-ability.factory';
import { CustomForbiddenException } from 'src/exceptions/forbidden.exception';
import { CheckPermission } from 'src/decorators/check.permission.decorator';
import { AuthzGuard } from '../authz/guards/authz.guard';

// 2 ways to authorization
// 1. Use decorator CheckPermission and AuthzGuard
// 2. Use caslAbilityFactory
@Controller('invoices')
export class InvoicesController {
  constructor(
    private readonly invoicesService: InvoicesService, // private readonly caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Post()
  @UseGuards(AuthzGuard)
  @CheckPermission([PermissionsType.CREATE, FeaturesType.INVOICE])
  async createInvoice(
    @Body() createInvoiceDto: CreateInvoiceDto,
    @CurrentUser() user,
  ) {
    return this.invoicesService.createInvoice(createInvoiceDto);

    // const ability = await this.caslAbilityFactory.createForUser(user.sub);
    // if (ability.can(PermissionsType.CREATE, FeaturesType.INVOICE)) {
    //   return this.invoicesService.createInvoice(createInvoiceDto);
    // }
    // throw new CustomForbiddenException();
  }

  @Get()
  getInvoices(@Query() requestInvoiceDto: ListInvoiceRequestDto) {
    return this.invoicesService.getInvoices(requestInvoiceDto);
  }

  @Get(':id')
  getInvoice(@Param('id') invoiceId: string) {
    return this.invoicesService.getInvoice(invoiceId);
  }

  @Put(':id')
  updateInvoice(
    @Param('id') invoiceId: string,
    @Body() updateInvoiceDto: UpdateInvoiceDto,
  ) {
    return this.invoicesService.updateInvoice(invoiceId, updateInvoiceDto);
  }

  @Delete(':id')
  deleteInvoice(@Param('id') invoiceId: string) {
    return this.invoicesService.deleteInvoice(invoiceId);
  }
}
