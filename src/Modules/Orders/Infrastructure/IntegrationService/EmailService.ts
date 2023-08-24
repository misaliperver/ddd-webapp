import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { DatabaseConfig } from '../Configurations/DatabaseConfig';
import { Order, OrderView } from '@Modules/Orders/Domain/Orders/Order';



@Injectable()
export class EmailService {
    private transporter: any;

    constructor() {
        this.transporter = createTransport({
            service: 'gmail',
            secure: true,
            auth: {
              user: DatabaseConfig.EMAIL_NAME,
              pass: DatabaseConfig.EMAIL_PASSWORD,
            }
        });
    }

    static generateMail(order_id: string, price: number, to: string) {
        var mailOptions = {
            from: DatabaseConfig.EMAIL_NAME,
            to,
            subject: `${order_id} Numaralı Sipariş`,
            text: `Sipariş kaydınız alındı. Kargolama için hazırlanıyor. Toplam tutar: ${price}`
        };
        return mailOptions;
    }

    async sendEmail(to: string, order: OrderView): Promise<boolean> {
        const order_id = (order as Order).Id.Id;
        const price = (order as Order).TotalProductValue.Value + (order as Order).TotalShippingValue.Value;


        const mailOptions = EmailService.generateMail(order_id, price, to);

        const result = await this.transporter.sendMail(mailOptions);
        
        return !!result.messageId;
    }
}