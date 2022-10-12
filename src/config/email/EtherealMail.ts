import nodemailer from 'nodemailer';
import HandlebarsMailTemplate from './HandlebarsMailTemplate';
import { IParseMailTemplate } from './interfaces';

interface IEmailContact {
    name: string;
    email: string;
}

interface ISendMail {
    to: IEmailContact;
    from?: IEmailContact;
    templateData: IParseMailTemplate;
    subject: string;
}

export default class EtherealMail {
    static async sendMail({ to, from, templateData, subject }: ISendMail): Promise<void> {
        const account = await nodemailer.createTestAccount();

        const emailTemplate = new HandlebarsMailTemplate();

        const transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass,
            },
        });

        const message = await transporter.sendMail({
            from: {
                name: from?.name || 'Equipe API Vendas',
                address: from?.email || 'equipe@apivendas.com',
            },
            to: {
                name: to.name,
                address: to.email,
            },
            subject,
            html: await emailTemplate.parse(templateData),
        });

        console.log('Message sent: %s', message.messageId);

        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}
