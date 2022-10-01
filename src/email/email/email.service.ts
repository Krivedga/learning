import { Injectable } from '@nestjs/common';
import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class EmailService {

    constructor() {
        // Don't forget this one.
        // The apiKey is required to authenticate our
        // request to SendGrid API.
        SendGrid.setApiKey("send-grid-key");
      }
      async send(mail: SendGrid.MailDataRequired) {
        const transport = await SendGrid.send(mail);
        // avoid this on production. use log instead :)
        console.log(`E-Mail sent to ${mail.to}`);
        return transport;
      }
    //   const mail = {
    //     to: email,
    //     subject: 'Hello from sendgrid',
    //     from: '...', // Fill it with your validated email on SendGrid account
    //     text: 'Hello',
    //     html: '<h1>Hello</h1>',
    //   };
}
