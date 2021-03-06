import { Component, OnInit } from '@angular/core';

import { of } from 'rxjs';
import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';

@Component({
    templateUrl: './paypal.component.html'
})
export class PaypalComponent implements OnInit {
    public payPalConfig?: PayPalConfig;

    ngOnInit(): void {
        this.initConfig();
    }

    private initConfig(): void {
        this.payPalConfig = new PayPalConfig(PayPalIntegrationType.ClientSideREST, PayPalEnvironment.Sandbox, {
            commit: true,
            client: {
                sandbox: 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R'
            },
            button: {
                label: 'paypal',
                layout: 'vertical'
            },
            onAuthorize: (data, actions) => {
                console.log('Authorize');
                return of(undefined);
            },
            onPaymentComplete: (data, actions) => {
                console.log('OnPaymentComplete');
            },
            onCancel: (data, actions) => {
                console.log('OnCancel');
            },
            onError: err => {
                console.log('OnError');
            },
            onClick: () => {
                console.log('onClick');
            },
            validate: actions => {
                console.log(actions);
            },
            experience: {
                noShipping: true,
                brandName: 'Angular PayPal'
            },
            transactions: [
                {
                    amount: {
                        total: 30.11,
                        currency: 'USD',
                        details: {
                            subtotal: 30.0,
                            tax: 0.07,
                            shipping: 0.03,
                            handling_fee: 1.0,
                            shipping_discount: -1.0,
                            insurance: 0.01
                        }
                    },
                    custom: 'Custom value',
                    item_list: {
                        items: [
                            {
                                name: 'hat',
                                description: 'Brown hat.',
                                quantity: 5,
                                price: 3,
                                tax: 0.01,
                                sku: '1',
                                currency: 'USD'
                            },
                            {
                                name: 'handbag',
                                description: 'Black handbag.',
                                quantity: 1,
                                price: 15,
                                tax: 0.02,
                                sku: 'product34',
                                currency: 'USD'
                            }
                        ],
                        shipping_address: {
                            recipient_name: 'Brian Robinson',
                            line1: '4th Floor',
                            line2: 'Unit #34',
                            city: 'San Jose',
                            country_code: 'US',
                            postal_code: '95131',
                            phone: '011862212345678',
                            state: 'CA'
                        }
                    }
                }
            ],
            note_to_payer: 'Contact us if you have troubles processing payment'
        });
    }
}
