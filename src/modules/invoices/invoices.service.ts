import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto, UpdateInvoiceDto } from './dto/invoice.dto';
import { ListInvoiceRequestDto } from './dto/invoice.request.dto';
import { InvoiceRepository } from './invoices.repository';

@Injectable()
export class InvoicesService {
  constructor(private readonly invoiceRepository: InvoiceRepository) {}

  async createInvoice(createInvoiceDto: CreateInvoiceDto) {
    return await this.invoiceRepository.create(createInvoiceDto);
  }

  async getInvoices(requestInvoiceDto: ListInvoiceRequestDto) {
    return await this.invoiceRepository.find(requestInvoiceDto);
  }

  async getInvoice(invoiceId: string) {
    return await this.invoiceRepository.findById(invoiceId);
  }

  async updateInvoice(invoiceId: string, updateInvoiceDto: UpdateInvoiceDto) {
    return await this.invoiceRepository.findByIdAndUpdate(
      invoiceId,
      updateInvoiceDto,
      { new: true },
    );
  }

  async deleteInvoice(invoiceId: string) {
    return await this.invoiceRepository.findByIdAndDelete(invoiceId);
  }
}
