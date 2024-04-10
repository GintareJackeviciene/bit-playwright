import { test, expect } from '@playwright/test';
import { Segments } from '../app-api/segments';
import { Contact } from '../api/contact';
import { Contacts } from '../app-api/contacts';
import { getRandomString } from '../test.data';
import { ContactsDelete } from '../app-api/contactsDelete';

const email = `${getRandomString(20, 'qwertyuiopasdfghjklzxcvbnm')}@lokalus.lt`;

const segment = {
    name: `segment by email = ${email}`,
    filters: {
        type: 'group',
        group: {
            junction: 'or',
            members: [
                {
                    type: 'group',
                    group: {
                        junction: 'and',
                        members: [
                            {
                                type: 'group',
                                group: {
                                    junction: 'and',
                                    members: [
                                        {
                                            type: 'rule',
                                            rule: {
                                                resourceType: 'contacts',
                                                filter: {
                                                    filterType: 'junction',
                                                    junction: 'and',
                                                    filters: [
                                                        {
                                                            filterType: 'filter',
                                                            filterValue: {
                                                                operator: 'eq',
                                                                valueType: 'string_list',
                                                                value: {
                                                                    operator: 'any',
                                                                    values: [email]
                                                                },
                                                                property: 'email'
                                                            }
                                                        }
                                                    ]
                                                }
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }
            ]
        }
    }
};

let segmentID: string;
let contactID: string;

test.describe('Segment APP spec', () => {
    test.afterAll(async ({}) => {
        if (segmentID !== undefined) {
            await Segments.tryToDeleteSegment(segmentID);
        }
        if (contactID !== undefined) {
            await ContactsDelete.createBatchDelete([contactID]);
        }
    });
});

test('should be able to segment by contact id', async ({}) => {
    const contact = await Contact.createContactByEmail(email);
    contactID = (await contact.json()).contactID;

    const segmentResponse = await Segments.create(segment);
    segmentID = (await segmentResponse.json()).data.segmentID;

    await expect
        .poll(
            async () => {
                const response = await Contacts.get(segmentID, email);
                return JSON.stringify(await response.json());
            },
            {
                timeout: 25000
            }
        )
        .toContain(email);
});
