import { request } from '@playwright/test';
import { APP_URL, sleep } from '../test.data';

export class Segments {
    static async create(segment, failOnStatusCode = true) {
        const context = await request.newContext();

        return await context.post(`${APP_URL}/REST/segments/v2/segments`, {
            data: segment,

            failOnStatusCode: failOnStatusCode
        });
    }

    static async delete(segmentID: string, failOnStatusCode = true) {
        const context = await request.newContext();
        return await context.delete(`${APP_URL}/REST/segments/v1/segments/${segmentID}`, {
            failOnStatusCode: failOnStatusCode
        });
    }

    static async tryToDeleteSegment(segmentID: string) {
        const status = (await this.delete(segmentID, false)).status();
        if (status !== 204) {
            for (let i = 0; i < 20; i++) {
                await sleep(500);
                const status = (await this.delete(segmentID, false)).status();
                if (status === 204) {
                    return status;
                }
            }
        }
        return status;
    }
}
