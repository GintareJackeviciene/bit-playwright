interface User {
    userName: string | undefined;
    password: string | undefined;
}

interface Api {
    url: string | undefined;
    key: string | undefined;
}
export const USER: User = {
    userName: process.env.NAME,
    password: process.env.PASSWORD
};
export const API: Api = {
    url: process.env.API_URL,
    key: process.env.API_KEY
};

export const URL: string | undefined = process.env.URL;

export const API_URL: string | undefined = process.env.API_URL;

export const API_KEY: string | undefined = process.env.API_KEY;

export function getRandomString(length: number, characters: string) {
    let result = '';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}
