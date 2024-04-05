import { request } from '@playwright/test';
import { API_URL } from '../test.data';
import { faker } from '@faker-js/faker';

export class Contact {
    static async createContact(contact, failOnStatusCode = true) {
        const context = await request.newContext();

        return await context.post(`${API_URL}/v3/contacts`, {
            data: contact,
            failOnStatusCode: failOnStatusCode
        });
    }

    static async createContactByEmail(email, failOnStatusCode = true) {
        const contact = {
            firstName: `Jonas ${faker.string.uuid()}@lokalus.lt`,
            lastName: `Jonaitis ${faker.string.uuid()}@lokalus.lt`,
            identifiers: [
                {
                    type: 'email',
                    channels: {
                        email: {
                            status: 'subscribed'
                        }
                    },
                    id: email
                }
            ]
        };
        return await this.createContact(contact, failOnStatusCode);
    }

    static async getContacts(email, limit, failOnStatusCode = true) {
        let queryParams = `limit=${limit}`;

        if (email) {
            queryParams = `${queryParams}&email=${email}`;
        }

        const context = await request.newContext();
        return await context.get(`${API_URL}/v3/contacts?${queryParams}`, { failOnStatusCode: failOnStatusCode });
    }

    static async getContact(contactID, failOnStatusCode = true) {
        const context = await request.newContext();
        return await context.get(`${API_URL}/v3/contacts/${contactID}`, { failOnStatusCode: failOnStatusCode });
    }

    static async updateContact(contactID, contact, failOnStatusCode = true) {
        const context = await request.newContext();

        return await context.patch(`${API_URL}/v3/contacts/${contactID}`, {
            data: contact,
            failOnStatusCode: failOnStatusCode
        });
    }
}
