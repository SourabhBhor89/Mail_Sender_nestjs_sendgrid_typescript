
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { EmailService } from './email/email.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly emailService: EmailService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('send-test-email')
async sendEmail(
  @Body() sendEmailDTO: { recipient: string; body: string },
): Promise<string> {
  try {
    await this.emailService.sendTestEmail(
      sendEmailDTO.recipient,
      sendEmailDTO.body,
    );
    return 'Email sent successfully';
  } catch (error) {
    return 'Failed to send email';
  }
}
}