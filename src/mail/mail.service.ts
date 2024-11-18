import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendMailDto } from '../dto/send-mail.dto';
import mjml2html from 'mjml';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(sendMailDto: SendMailDto): Promise<void> {
    const { to, subject, text, name } = sendMailDto;
    const html = this.renderMJML('welcome', { name });

    await this.mailerService.sendMail({
      to: to,
      subject: subject,
      html: html
    });
  }

  private renderMJML(templateName: string, variables: Record<string, any>): string {
    // Leggi il file MJML
    const templatePath = path.join(__dirname, 'templates', `${templateName}.mjml`);
    const mjmlContent = fs.readFileSync(templatePath, 'utf-8');

    // Sostituisci le variabili dinamiche
    const filledTemplate = Object.keys(variables).reduce((content, key) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      return content.replace(regex, variables[key]);
    }, mjmlContent);

    // Converti MJML in HTML
    const { html } = mjml2html(filledTemplate, { validationLevel: 'strict' });
    return html;
  }

}
