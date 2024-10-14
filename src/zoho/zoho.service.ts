


// // src/zoho/zoho.service.ts

// import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
// import axios from 'axios';
// import * as moment from 'moment'; 
// import { OAuthService } from '../auth/oauth.service';

// @Injectable()
// export class ZohoService {
//     private readonly zohoTokenUrl = 'https://accounts.zoho.in/oauth/v2/token';
//     private readonly zohoApiUrl = 'https://www.zohoapis.in/crm/v2';

//     constructor(private readonly oauthService: OAuthService) {}

//     // Generate Zoho Authorization URL
//     async getAuthorizationUrl(): Promise<string> {
//         const oauthDetails = await this.oauthService.getOAuthDetails('zoho');
//         if (!oauthDetails) {
//             throw new NotFoundException('Zoho OAuth details not found in the database');
//         }

//         return `https://accounts.zoho.in/oauth/v2/auth?scope=ZohoCRM.modules.ALL,ZohoCRM.modules.contacts.ALL,ZohoCRM.modules.products.ALL,ZohoBooks.invoices.ALL&client_id=${oauthDetails.clientId}&response_type=code&redirect_uri=${encodeURIComponent(oauthDetails.redirectUri)}&access_type=offline`;
//     }

//     // Exchange authorization code for access and refresh tokens
//     async getAccessToken(authCode: string): Promise<any> {
//         const oauthDetails = await this.oauthService.getOAuthDetails('zoho');
//         if (!oauthDetails) {
//             throw new NotFoundException('Zoho OAuth details not found in the database');
//         }

//         const params = {
//             grant_type: 'authorization_code',
//             client_id: oauthDetails.clientId,
//             client_secret: oauthDetails.clientSecret,
//             redirect_uri: oauthDetails.redirectUri,
//             code: authCode,
//         };

//         try {
//             const response = await axios.post(this.zohoTokenUrl, null, { params });

//             // Save the tokens to MongoDB
//             await this.oauthService.saveTokens('zoho', {
//                 accessToken: response.data.access_token,
//                 refreshToken: response.data.refresh_token,
//                 expiresIn: response.data.expires_in,
//             });

//             return response.data;
//         } catch (error) {
//             throw new InternalServerErrorException('Failed to get access token from Zoho');
//         }
//     }

//     // Refresh access token using the refresh token
//     async refreshAccessToken(): Promise<any> {
//         const oauthDetails = await this.oauthService.getOAuthDetails('zoho');
//         if (!oauthDetails || !oauthDetails.refreshToken) {
//             throw new NotFoundException('No refresh token available for Zoho');
//         }

//         const params = {
//             grant_type: 'refresh_token',
//             refresh_token: oauthDetails.refreshToken,
//             client_id: oauthDetails.clientId,
//             client_secret: oauthDetails.clientSecret,
//         };

//         try {
//             const response = await axios.post(this.zohoTokenUrl, null, { params });

//             // Save the new tokens to MongoDB
//             await this.oauthService.saveTokens('zoho', {
//                 accessToken: response.data.access_token,
//                 refreshToken: response.data.refresh_token || oauthDetails.refreshToken, // Keep the old one if no new refresh token
//                 expiresIn: response.data.expires_in,
//             });

//             return response.data;
//         } catch (error) {
//             throw new InternalServerErrorException('Failed to refresh access token for Zoho');
//         }
//     }


//     // Fetch customers created today
//     async getTodayCustomers(): Promise<any[]> {
//         const oauthDetails = await this.oauthService.getOAuthDetails('zoho');
//         if (!oauthDetails || !oauthDetails.accessToken) {
//             throw new NotFoundException('No access token available for Zoho CRM');
//         }

//         // Get today's date formatted for Zoho CRM API (ISO format)
//         const today = moment().format('YYYY-MM-DD');

//         // Zoho API criteria to filter customers created today
//         const criteria = `(Created_Time:between:${today}T00:00:00+00:00 and ${today}T23:59:59+00:00)`;

//         try {
//             const response = await axios.get(`${this.zohoApiUrl}/Contacts?criteria=${encodeURIComponent(criteria)}`, {
//                 headers: {
//                     Authorization: `Zoho-oauthtoken ${oauthDetails.accessToken}`,
//                 },
//             });

//             const customers = response.data.data; // Adjust based on your API response structure

//             // Check if customers were fetched
//             if (!customers || customers.length === 0) {
//                 console.log('No customers were created today in Zoho CRM.');
//                 return []; // Return an empty array if no customers are found
//             }

//             console.log(`Fetched ${customers.length} customers created today in Zoho CRM.`); // Log the count of fetched customers

//             // Map necessary fields for QuickBooks
//             return customers.map((customer: any) => ({
//                 firstname: customer.First_Name, // Adjust these according to your Zoho CRM response
//                 lastname: customer.Last_Name,
//                 email: customer.Email,
//                 billing_street: customer.Mailing_Street, // Assuming you want this for billing
//                 billing_city: customer.Mailing_City,
//                 billing_state: customer.Mailing_State,
//                 billing_zip: customer.Mailing_Zip, // Assuming you want this for billing zip
//                 billing_country: customer.Mailing_Country // Assuming you want this for billing country
//             }));

//         } catch (error) {
//             console.error('Error fetching customers from Zoho CRM:', error.response?.data || error.message);
//             throw new InternalServerErrorException('Failed to fetch customers from Zoho CRM');
//         }
//     }
// }





// src/zoho/zoho.service.ts
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import * as moment from 'moment';
import { OAuthService } from '../auth/oauth.service';
import { customerfieldMapping } from '../fieldMapping'; // Import the field mapping


@Injectable()
export class ZohoService {
    private readonly zohoTokenUrl = 'https://accounts.zoho.in/oauth/v2/token';
    private readonly zohoApiUrl = 'https://www.zohoapis.in/crm/v2';

    constructor(private readonly oauthService: OAuthService) {}


    // Generate Zoho Authorization URL
    async getAuthorizationUrl(): Promise<string> {
        const oauthDetails = await this.oauthService.getOAuthDetails('zoho');
        if (!oauthDetails) {
            throw new NotFoundException('Zoho OAuth details not found in the database');
        }

        return `https://accounts.zoho.in/oauth/v2/auth?scope=ZohoCRM.modules.ALL,ZohoCRM.modules.contacts.ALL,ZohoCRM.modules.products.ALL,ZohoBooks.invoices.ALL&client_id=${oauthDetails.clientId}&response_type=code&redirect_uri=${encodeURIComponent(oauthDetails.redirectUri)}&access_type=offline`;
    }

    // Exchange authorization code for access and refresh tokens
    async getAccessToken(authCode: string): Promise<any> {
        const oauthDetails = await this.oauthService.getOAuthDetails('zoho');
        if (!oauthDetails) {
            throw new NotFoundException('Zoho OAuth details not found in the database');
        }

        const params = {
            grant_type: 'authorization_code',
            client_id: oauthDetails.clientId,
            client_secret: oauthDetails.clientSecret,
            redirect_uri: oauthDetails.redirectUri,
            code: authCode,
        };

        try {
            const response = await axios.post(this.zohoTokenUrl, null, { params });

            // Save the tokens to MongoDB
            await this.oauthService.saveTokens('zoho', {
                accessToken: response.data.access_token,
                refreshToken: response.data.refresh_token,
                expiresIn: response.data.expires_in,
            });

            return response.data;
        } catch (error) {
            throw new InternalServerErrorException('Failed to get access token from Zoho');
        }
    }


    // Refresh access token using the refresh token
    async refreshAccessToken(): Promise<any> {
        const oauthDetails = await this.oauthService.getOAuthDetails('zoho');
        if (!oauthDetails || !oauthDetails.refreshToken) {
            throw new NotFoundException('No refresh token available for Zoho');
        }

        const params = {
            grant_type: 'refresh_token',
            refresh_token: oauthDetails.refreshToken,
            client_id: oauthDetails.clientId,
            client_secret: oauthDetails.clientSecret,
        };

        try {
            const response = await axios.post(this.zohoTokenUrl, null, { params });

            // Save the new tokens to MongoDB
            await this.oauthService.saveTokens('zoho', {
                accessToken: response.data.access_token,
                refreshToken: response.data.refresh_token || oauthDetails.refreshToken,
                expiresIn: response.data.expires_in,
            });

            return response.data;
        } catch (error) {
            throw new InternalServerErrorException('Failed to refresh access token for Zoho');
        }
    }


    async getLatestCustomer(): Promise<any> {
        // Fetch OAuth details for Zoho CRM
        const oauthDetails = await this.oauthService.getOAuthDetails('zoho');
        if (!oauthDetails || !oauthDetails.accessToken) {
          throw new NotFoundException('No access token available for Zoho CRM');
        }
    
        // Get today's date in the required format
        const today = moment().format('YYYY-MM-DD');
    
        // Set the criteria to filter customers created today, sorted by `Created_Time` in descending order
        const criteria = `(Created_Time:between:${today}T00:00:00+00:00 and ${today}T23:59:59+00:00)`;
        const sortBy = 'sort_by=Created_Time&sort_order=desc&per_page=1'; // Sorting to get only the most recently created customer
    
        try {
          // Make a request to Zoho CRM to fetch the latest customer created today
          const response = await axios.get(
            `${this.zohoApiUrl}/Contacts?criteria=${encodeURIComponent(criteria)}&${sortBy}`,
            {
              headers: {
                Authorization: `Zoho-oauthtoken ${oauthDetails.accessToken}`,
              },
            }
          );
    
          const customers = response.data.data;
    
          if (!customers || customers.length === 0) {
            console.log('No customers were created today in Zoho CRM.');
            return null; // No customers created today
          }
    
          console.log('Fetched the latest customer created today in Zoho CRM:', customers[0]);
          return customers[0]; // Return only the latest customer
        } catch (error) {
          console.error('Error fetching customers from Zoho CRM:', error.response?.data || error.message);
          throw new InternalServerErrorException('Failed to fetch customers from Zoho CRM');
        }
      }


      async getLatestProduct(): Promise<any> {
        // Fetch OAuth details for Zoho CRM
        const oauthDetails = await this.oauthService.getOAuthDetails('zoho');
        if (!oauthDetails || !oauthDetails.accessToken) {
            throw new NotFoundException('No access token available for Zoho CRM');
        }
    
        const today = moment().format('YYYY-MM-DD');
        const criteria = `(Created_Time:between:${today}T00:00:00+00:00 and ${today}T23:59:59+00:00)`;
        const sortBy = 'sort_by=Created_Time&sort_order=desc&per_page=1';
    
        try {
            const response = await axios.get(
                `${this.zohoApiUrl}/Products?criteria=${encodeURIComponent(criteria)}&${sortBy}`,
                {
                    headers: {
                        Authorization: `Zoho-oauthtoken ${oauthDetails.accessToken}`,
                    },
                }
            );
    
            const products = response.data.data;
    
            if (!products || products.length === 0) {
                console.log('No products were created today in Zoho CRM.');
                return null; // No products created today
            }
    
            console.log('Fetched the latest product created today in Zoho CRM:', products[0]);
            return products[0]; // Return only the latest product
        } catch (error) {
            console.error('Error fetching products from Zoho CRM:', error.response?.data || error.message);
            throw new InternalServerErrorException('Failed to fetch products from Zoho CRM');
        }
    }
    


      async getLatestInvoice(): Promise<any> {
        // Fetch OAuth details for Zoho CRM
        const oauthDetails = await this.oauthService.getOAuthDetails('zoho');
        if (!oauthDetails || !oauthDetails.accessToken) {
          throw new NotFoundException('No access token available for Zoho CRM');
        }
    
        const today = moment().format('YYYY-MM-DD');
        const criteria = `(Invoice_Date:between:${today}T00:00:00+00:00 and ${today}T23:59:59+00:00)`;
        const sortBy = 'sort_by=Invoice_Date&sort_order=desc&per_page=1';
    
        try {
          const response = await axios.get(
            `${this.zohoApiUrl}/Invoices?criteria=${encodeURIComponent(criteria)}&${sortBy}`,
            {
              headers: {
                Authorization: `Zoho-oauthtoken ${oauthDetails.accessToken}`,
              },
            }
          );
    
          const invoices = response.data.data;
    
          if (!invoices || invoices.length === 0) {
            console.log('No invoices were created today in Zoho CRM.');
            return null; // No invoices created today
          }
    
          console.log('Fetched the latest invoice created today in Zoho CRM:', invoices[0]);
          return invoices[0]; // Return only the latest invoice
        } catch (error) {
          console.error('Error fetching invoices from Zoho CRM:', error.response?.data || error.message);
          throw new InternalServerErrorException('Failed to fetch invoices from Zoho CRM');
        }
    }
    


}
