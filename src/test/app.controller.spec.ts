import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { MailService } from '../mail/mail.service';
import { getQueueToken } from '@nestjs/bull';
import { Queue } from 'bull';
import { SendMailDto } from '../dto/send-mail.dto';

describe('AppController', () => {
  let appController: AppController;

  const mockMailQueue = {
    add: jest.fn(),
  };

  const mockAppService = {
    // Eventuale mock dei metodi dell'AppService (se necessario)
  };

  const mockMailService = {
    // Eventuale mock dei metodi di MailService (se necessario)
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        { provide: getQueueToken('mailQueue'), useValue: mockMailQueue },
        { provide: AppService, useValue: mockAppService },
        { provide: MailService, useValue: mockMailService },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  it('should return status ok on handlePing', () => {
    const result = appController.handlePing();
    expect(result).toEqual({ status: 'ok' });
  });

  it('should add sendMailJob to the mail queue', async () => {
    const sendMailDto: SendMailDto = {
      name: 'Test Name',
      html: null,
      to: 'test@example.com',
      subject: 'Test Subject',
      text: 'Test Message',
    };

    await appController.sendMail(sendMailDto);

    expect(mockMailQueue.add).toHaveBeenCalledWith('sendMailJob', sendMailDto);
  });
});
