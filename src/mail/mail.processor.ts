import { Processor, Process } from '@nestjs/bull';
import { Inject, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { MailService } from './mail.service';

@Processor('mailQueue')
export class MailProcessor {

  @Inject()
  private mailService: MailService;

  @Process('sendMailJob')
  handleSendMail(job: Job) {
    this.mailService.sendMail(job.data);
    Logger.log(`Mail sent to ${job.data.to}`);
  }
}
