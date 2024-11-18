import { Controller, Get, Logger, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { SendMailDto } from './dto/send-mail.dto';
import { MailService } from './mail/mail.service';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Controller()
export class AppController {
  constructor(
    @InjectQueue('mailQueue') 
    private readonly mailQueue: Queue,
    private readonly appService: AppService,
    private readonly mailService: MailService
  ) {}

  @MessagePattern('emailService.ping')
  handlePing() {
    return { status: 'ok' };
  }

  @EventPattern('send-mail')
  async sendMail(sendMailDto: SendMailDto) {
    await this.mailQueue.add('sendMailJob', sendMailDto);
  }

}
