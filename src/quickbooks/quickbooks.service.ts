


// // src/quickbooks/quickbooks.service.ts

// import { Injectable } from '@nestjs/common';
// import axios from 'axios';
// import { OAuthService } from '../auth/oauth.service';
// import { customerfieldMapping } from '../fieldMapping'; // Adjust import to match your structure

// @Injectable()
// export class QuickBooksService {
//     private readonly quickBooksTokenUrl = 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer';
//     private readonly quickBooksApiUrl = 'https://sandbox-quickbooks.api.intuit.com/v3/company'; // Use the correct base URL for your QuickBooks account
//     private readonly companyId = '9341453076607129'; // Your QuickBooks company ID

//     constructor(private readonly oauthService: OAuthService) {}

//     async getAuthorizationUrl(): Promise<string> {
//         const oauthDetails = await this.oauthService.getOAuthDetails('quickbooks');
//         if (!oauthDetails) {
//             throw new Error('QuickBooks OAuth details not found in the database');
//         }

//         return `https://appcenter.intuit.com/connect/oauth2?client_id=${oauthDetails.clientId}&response_type=code&scope=com.intuit.quickbooks.accounting&redirect_uri=${oauthDetails.redirectUri}&state=yourState&grant_type=authorization_code`;
//     }

//     async getAccessToken(authCode: string): Promise<any> {
//         const oauthDetails = await this.oauthService.getOAuthDetails('quickbooks');
//         const params = new URLSearchParams();
//         params.append('grant_type', 'authorization_code');
//         params.append('client_id', oauthDetails.clientId);
//         params.append('client_secret', oauthDetails.clientSecret);
//         params.append('redirect_uri', oauthDetails.redirectUri);
//         params.append('code', authCode);

//         const response = await axios.post(this.quickBooksTokenUrl, params, {
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//             },
//         });

//         await this.oauthService.saveTokens('quickbooks', {
//             accessToken: response.data.access_token,
//             refreshToken: response.data.refresh_token,
//             expiresIn: response.data.expires_in,
//         });

//         return response.data;
//     }

//     // Method to refresh the access token if needed
//     async refreshAccessToken(): Promise<void> {
//         const oauthDetails = await this.oauthService.getOAuthDetails('quickbooks');
//         if (!oauthDetails || !oauthDetails.refreshToken) {
//             throw new Error('No refresh token available for QuickBooks');
//         }

//         const params = new URLSearchParams();
//         params.append('grant_type', 'refresh_token');
//         params.append('refresh_token', oauthDetails.refreshToken);
//         params.append('client_id', oauthDetails.clientId);
//         params.append('client_secret', oauthDetails.clientSecret);

//         const response = await axios.post(this.quickBooksTokenUrl, params, {
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//             },
//         });

//         // Save the new tokens
//         await this.oauthService.saveTokens('quickbooks', {
//             accessToken: response.data.access_token,
//             refreshToken: response.data.refresh_token || oauthDetails.refreshToken,
//             expiresIn: response.data.expires_in,
//         });
//     }

//      // Function to create a customer in QuickBooks
//      async createCustomer(mappedCustomer: any): Promise<any> {
//         try {
//             // Fetch access token from OAuth service
//             const oauthDetails = await this.oauthService.getOAuthDetails('quickbooks');
//             if (!oauthDetails || !oauthDetails.accessToken) {
//                 await this.refreshAccessToken(); // Refresh the token if none found
//                 oauthDetails.accessToken = (await this.oauthService.getOAuthDetails('quickbooks')).accessToken;
//             }

//             const apiUrl = `${this.quickBooksApiUrl}/${this.companyId}/customer`;

//             const headers = {
//                 Authorization: `Bearer ${oauthDetails.accessToken}`,
//                 'Content-Type': 'application/json',
//             };

//             // Print the API URL, headers, and data
//             console.log('API URL:', apiUrl);
//             console.log('Headers:', JSON.stringify(headers, null, 2));
//             console.log('Data being sent to QuickBooks:', JSON.stringify(mappedCustomer, null, 2));


//             const response = await axios.post(apiUrl, mappedCustomer, { headers });
//             console.log('QuickBooks API Response:', response.data);

//             return response.data;
//         } catch (error) {
//             console.error('Error creating customer in QuickBooks:', error.response ? error.response.data : error.message);
//             throw error;
//         }
//     }


// }





// src/quickbooks/quickbooks.service.ts

import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { OAuthService } from '../auth/oauth.service';
import { customerfieldMapping } from '../fieldMapping'; // Adjust import to match your structure

@Injectable()
export class QuickBooksService {
    private readonly quickBooksTokenUrl = 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer';
    private readonly quickBooksApiUrl = 'https://sandbox-quickbooks.api.intuit.com/v3/company'; // Use the correct base URL for your QuickBooks account
    private readonly companyId= '9341453076607129';
    constructor(private readonly oauthService: OAuthService) {}

    // Get the authorization URL for QuickBooks
    async getAuthorizationUrl(): Promise<string> {
        const oauthDetails = await this.oauthService.getOAuthDetails('quickbooks');
        if (!oauthDetails) {
            throw new NotFoundException('QuickBooks OAuth details not found in the database');
        }

        return `https://appcenter.intuit.com/connect/oauth2?client_id=${oauthDetails.clientId}&response_type=code&scope=com.intuit.quickbooks.accounting&redirect_uri=${oauthDetails.redirectUri}&state=yourState&grant_type=authorization_code`;
    }

    // Exchange authorization code for access and refresh tokens
    async getAccessToken(authCode: string): Promise<any> {
        const oauthDetails = await this.oauthService.getOAuthDetails('quickbooks');
        const params = new URLSearchParams();
        params.append('grant_type', 'authorization_code');
        params.append('client_id', oauthDetails.clientId);
        params.append('client_secret', oauthDetails.clientSecret);
        params.append('redirect_uri', oauthDetails.redirectUri);
        params.append('code', authCode);

        const response = await axios.post(this.quickBooksTokenUrl, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        await this.oauthService.saveTokens('quickbooks', {
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
            expiresIn: response.data.expires_in,
        });

        return response.data;
    }

    // Method to refresh the access token if needed
    async refreshAccessToken(): Promise<void> {
        const oauthDetails = await this.oauthService.getOAuthDetails('quickbooks');
        if (!oauthDetails || !oauthDetails.refreshToken) {
            throw new NotFoundException('No refresh token available for QuickBooks');
        }

        const params = new URLSearchParams();
        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', oauthDetails.refreshToken);
        params.append('client_id', oauthDetails.clientId);
        params.append('client_secret', oauthDetails.clientSecret);

        const response = await axios.post(this.quickBooksTokenUrl, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        // Save the new tokens
        await this.oauthService.saveTokens('quickbooks', {
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token || oauthDetails.refreshToken,
            expiresIn: response.data.expires_in,
        });
    }

    async createCustomer(customerData: any): Promise<any> {
        const oauthDetails = await this.oauthService.getOAuthDetails('quickbooks');
        if (!oauthDetails || !oauthDetails.accessToken) {
          throw new InternalServerErrorException('No access token or company ID available for QuickBooks');
        }
    
        try {
          const response = await axios.post(
            `${this.quickBooksApiUrl}/${this.companyId}/customer`,
            customerData,
            {
              headers: {
                Authorization: `Bearer ${oauthDetails.accessToken}`,
                'Content-Type': 'application/json',
              },
            }
          );
    
          return response.data;
        } catch (error) {
          console.error('Error creating customer in QuickBooks:', error.response?.data || error.message);
          throw new InternalServerErrorException('Failed to create customer in QuickBooks');
        }
      }


      async createProduct(productData: any): Promise<any> {
        const oauthDetails = await this.oauthService.getOAuthDetails('quickbooks');
        if (!oauthDetails || !oauthDetails.accessToken) {
            throw new InternalServerErrorException('No access token or company ID available for QuickBooks');
        }

        try {
            const response = await axios.post(
                `${this.quickBooksApiUrl}/${this.companyId}/item`,
                productData,
                {
                    headers: {
                        Authorization: `Bearer ${oauthDetails.accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            return response.data;
        } catch (error) {
            console.error('Error creating product in QuickBooks:', error.response?.data || error.message);
            throw new InternalServerErrorException('Failed to create product in QuickBooks');
        }
    }


     // Fetch all customers from QuickBooks
     async getCustomers(): Promise<any[]> {
      const oauthDetails = await this.oauthService.getOAuthDetails('quickbooks');
      if (!oauthDetails || !oauthDetails.accessToken) {
          throw new InternalServerErrorException('No access token available for QuickBooks');
      }

      try {
          const response = await axios.get(`${this.quickBooksApiUrl}/${this.companyId}/customer`, {
              headers: {
                  Authorization: `Bearer ${oauthDetails.accessToken}`,
                  'Accept': 'application/json',
              },
          });
          return response.data.QueryResponse.Customer || []; // Return customer list or empty array
      } catch (error) {
          console.error('Error fetching customers from QuickBooks:', error.response?.data || error.message);
          throw new InternalServerErrorException('Failed to fetch customers from QuickBooks');
      }
  }

  // Fetch all items from QuickBooks
  async getItems(): Promise<any[]> {
      const oauthDetails = await this.oauthService.getOAuthDetails('quickbooks');
      if (!oauthDetails || !oauthDetails.accessToken) {
          throw new InternalServerErrorException('No access token available for QuickBooks');
      }

      try {
          const response = await axios.get(`${this.quickBooksApiUrl}/${this.companyId}/item`, {
              headers: {
                  Authorization: `Bearer ${oauthDetails.accessToken}`,
                  'Accept': 'application/json',
              },
          });
          return response.data.QueryResponse.Item || []; // Return item list or empty array
      } catch (error) {
          console.error('Error fetching items from QuickBooks:', error.response?.data || error.message);
          throw new InternalServerErrorException('Failed to fetch items from QuickBooks');
      }
  }


      async createInvoice(invoiceData: any): Promise<any> {
        const oauthDetails = await this.oauthService.getOAuthDetails('quickbooks');
        if (!oauthDetails || !oauthDetails.accessToken) {
          throw new InternalServerErrorException('No access token or company ID available for QuickBooks');
        }
    
        try {
          const response = await axios.post(
            `${this.quickBooksApiUrl}/${this.companyId}/invoice`,
            invoiceData,
            {
              headers: {
                Authorization: `Bearer ${oauthDetails.accessToken}`,
                'Content-Type': 'application/json',
              },
            }
          );
    
          return response.data;
        } catch (error) {
          console.error('Error creating invoice in QuickBooks:', error.response?.data || error.message);
          throw new InternalServerErrorException('Failed to create invoice in QuickBooks');
        }
    }
    
}
    



