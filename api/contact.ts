import { request } from '@playwright/test';
import { API_URL } from '../test.data';
import { faker } from '@faker-js/faker';

export class Contact {
   static async createContact(contact ){
    const context = await request.newContext();

   return await context.post(`${API_URL}/v3/contacts`, {
        data: contact,
      });   
    }

    static async createContactByEmail(email){
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
      return await this.createContact(contact);     
        }

    static async getContacts(email, limit ){
        let queryParams = `limit=${limit}`;

        if (email) {
            queryParams = `${queryParams}&email=${email}`;
        }

        const context = await request.newContext();
        return await context.get(`${API_URL}/v3/contacts?${queryParams}`, {});
               
            }

     static async getContact(contactID){
        const context = await request.newContext();
      return await context.get(`${API_URL}/v3/contacts/${contactID}`, {});
                       
     }

     static async updateContact(contactID, contact ){
        const context = await request.newContext();
    
       return await context.patch(`${API_URL}/v3/contacts/${contactID}`, {
            data: contact,
          });   
        }
}
