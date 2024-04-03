import { test, expect } from '@playwright/test';
import { USER } from '../test.data';
import { faker } from '@faker-js/faker';
import { Contact } from '../api/contact';


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
          id: `${faker.string.uuid()}@lokalus.lt`
      }
  ]
};
test.describe('Contacts APi spec', () => {

 test('should be able to create contact', async ({}) => {
  const response = await Contact.createContactByEmail(contact.identifiers[0].id)
expect(response.status()).toEqual(200);
expect((await response.json()).email).toEqual(contact.identifiers[0].id);
});

test('should not be able to create contact with invalid email',  async ({})  => {
  const response = await Contact.createContactByEmail("fghgfhfghfghfg.com");
  expect(response.status()).toEqual(400);
  });

  test('should be able to get contact list of 10 contact',  async ({})  => {
    const response = await Contact.getContacts(undefined, 10);
    expect(response.status()).toEqual(200);
    expect((await response.json()).contacts).toHaveLength(10);
    });

    test('should  be able to get contact by id',  async ({})  => {
      const response = await Contact.getContact('660d03d7028675e6f091be93');
      expect(response.status()).toEqual(200);
      expect((await response.json()).contactID).toEqual('660d03d7028675e6f091be93');
      });  
      
      test('should  be able to get contact by email',  async ({})  => {
        const response = await Contact.getContacts('fcf319b0-64ef-4ac1-bc88-707664d43543@lokalus.lt', 10);
        expect(response.status()).toEqual(200);
        expect((await response.json()).contacts[0].email).toEqual('fcf319b0-64ef-4ac1-bc88-707664d43543@lokalus.lt');
        });

        test('should  be able to update contact ',  async ({})  => {
          const contact = {
          contactID: '660d06fa2ca7772e37c8b3de',
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
                    id: `ddddddddddd@dsfsdf.com`
                }
            ]
          };

          const response = await Contact.updateContact(contact.contactID, contact);
          expect(response.status()).toEqual(200);
          expect((await response.json()).firstName).toEqual(contact.firstName);
          });     
        
});



