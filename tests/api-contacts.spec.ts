import { test, expect } from '@playwright/test';
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
  const response = await Contact.createContactByEmail('fghgfhfghfghfg.com', false);
  expect(response.status()).toEqual(400);
  });

test('should be able to get contact list of 10 contact',  async ({})  => {
  const response = await Contact.getContacts(undefined, 10);
  expect(response.status()).toEqual(200);
  expect((await response.json()).contacts).toHaveLength(10);
    });

  test('should  be able to get contact by id',  async ({})  => {
    let contactID: string;
    await test.step('get contact id', async()=>{
      const response = await Contact.getContacts(undefined,1);
      contactID = (await response.json()).contacts[0].contactID;
    })
    await test.step('get contact by id', async()=>{
      const response = await Contact.getContact(contactID);
    expect(response.status()).toEqual(200);
    expect((await response.json()).contactID).toEqual(contactID);
    })
    
    });  
      
  test('should  be able to get contact by email',  async ({})  => {
    let contactEmail: string;
    await test.step('get contact email', async()=>{
      const response = await Contact.getContacts(undefined,1);
      contactEmail = (await response.json()).contacts[0].email;
    
    })
    await test.step('get contact by email', async()=>{
     const response = await Contact.getContacts(contactEmail, 10);
    expect(response.status()).toEqual(200);
    expect((await response.json()).contacts[0].email).toEqual(contactEmail);
     
    })
   });

    test('should  be able to update contact',  async ({})  => {
      const contact = {
      contactID: '',
       firstName: `Jonas ${faker.string.uuid()}`,
          lastName: `Jonaitis ${faker.string.uuid()}`,
          identifiers: [
               {
                type: 'email',
                  channels: {
                    email: {
                        status: 'subscribed'
                        }
                },
                id: `${faker.string.uuid()}@dsfsdf.com`
              }
            ]
          };
      await test.step('create contact', async() => {
        const response =await Contact.createContactByEmail(contact.identifiers[0].id);
        contact.contactID = (await response.json()).contactID;
      })
      
      await test.step('update contact', async() => {
      const response = await Contact.updateContact(contact.contactID, contact);
      expect(response.status()).toEqual(200);
      expect((await response.json()).firstName).toEqual(contact.firstName);
      });     
    });   
});



