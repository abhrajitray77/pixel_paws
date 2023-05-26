import { Client, Account, ID} from "appwrite";


export const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject(`${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`);                // Your project ID

export const account = new Account(client);

/* // Go to OAuth provider login page
account.createOAuth2Session('discord');
 */

