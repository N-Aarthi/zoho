

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ZohoService } from './zoho/zoho.service';
// import { QuickBooksService } from './quickbooks/quickbooks.service';
// import { customerfieldMapping } from './fieldMapping';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   const zohoService = app.get(ZohoService);
//   const quickBooksService = app.get(QuickBooksService);

//   try {
//     // Fetch customers created today from Zoho CRM
//     const customers = await zohoService.getTodayCustomers();

//     if (!customers || customers.length === 0) {
//       console.log('No customers created today in Zoho CRM.');
//       return;
//     }

//     for (const customer of customers) {
//       console.log('Customer data from Zoho CRM:', customer);

//       // Map the customer fields
//       const mappedCustomer = mapCustomerData(customer, customerfieldMapping);

//       console.log('Mapped Customer Data:', mappedCustomer);

//       // Create the customer in QuickBooks
//       const createdCustomer = await quickBooksService.createCustomer(mappedCustomer);
//       console.log(`Customer ${createdCustomer.GivenName} ${createdCustomer.FamilyName} created in QuickBooks.`);
//     }
//   } catch (error) {
//     console.error('Error occurred while processing:', error);
//   } finally {
//     await app.close();
//   }
// }

// bootstrap();

// function mapCustomerData(customer: any, mapping: any) {
//   const mappedCustomer: any = {};

//   for (const [key, value] of Object.entries(mapping)) {
//     if (typeof value === 'string') {
//       // Map string fields directly
//       mappedCustomer[key] = customer[value] || 'Unknown';
//     } else if (typeof value === 'object') {
//       // Map nested fields (e.g., PrimaryEmailAddr, BillAddr)
//       mappedCustomer[key] = {};
//       for (const [nestedKey, nestedValue] of Object.entries(value)) {
//         mappedCustomer[key][nestedKey] = customer[nestedValue] || '';
//       }
//     }
//   }

//   return mappedCustomer;
// }



// //src/mapping.ts
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ZohoService } from './zoho/zoho.service';
// import { QuickBooksService } from './quickbooks/quickbooks.service';
// import { customerfieldMapping } from './fieldMapping'; // Assuming dynamic field mapping is in this file

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   const zohoService = app.get(ZohoService);
//   const quickBooksService = app.get(QuickBooksService);

//   try {
//     // Fetch the latest customer created today from Zoho CRM
//     const customer = await zohoService.getLatestCustomer();

//     if (!customer) {
//       console.log('No new customers created today in Zoho CRM.');
//       return;
//     }

//     console.log('Customer data from Zoho CRM:', customer);

//     // Map the customer fields dynamically
//     const mappedCustomer = mapCustomerData(customer, customerfieldMapping);

//     console.log('Mapped Customer Data for QuickBooks:', mappedCustomer);

//     // Create the customer in QuickBooks
//     const createdCustomer = await quickBooksService.createCustomer(mappedCustomer);
//     console.log(`Customer ${createdCustomer.GivenName} ${createdCustomer.FamilyName} created in QuickBooks.`);
//   } catch (error) {
//     console.error('Error occurred while processing:', error);
//   } finally {
//     await app.close();
//   }
// }

// bootstrap();

// // Function to map customer fields dynamically based on field mapping configuration
// function mapCustomerData(customer: any, mapping: any) {
//   const mappedCustomer: any = {};

//   for (const [qbKey, zohoKey] of Object.entries(mapping)) {
//     if (typeof zohoKey === 'string') {
//       // Map simple fields
//       mappedCustomer[qbKey] = customer[zohoKey] || 'Unknown';
//     } else if (typeof zohoKey === 'object') {
//       // Handle nested fields (e.g., PrimaryEmailAddr, BillAddr)
//       mappedCustomer[qbKey] = {};
//       for (const [nestedKey, nestedZohoKey] of Object.entries(zohoKey)) {
//         mappedCustomer[qbKey][nestedKey] = customer[nestedZohoKey] || '';
//       }
//     }
//   }

//   return mappedCustomer;
// }



// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ZohoService } from './zoho/zoho.service';
// import { QuickBooksService } from './quickbooks/quickbooks.service';
// import { customerfieldMapping, invoicefieldMapping } from './fieldMapping';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   const zohoService = app.get(ZohoService);
//   const quickBooksService = app.get(QuickBooksService);

//   try {
//     // Fetch the latest customer created today from Zoho CRM
//     const customer = await zohoService.getLatestCustomer();
//     if (customer) {
//       console.log('Customer data from Zoho CRM:', customer);
//       const mappedCustomer = mapCustomerData(customer, customerfieldMapping);
//       console.log('Mapped Customer Data for QuickBooks:', mappedCustomer);
//       await quickBooksService.createCustomer(mappedCustomer);
//       console.log(`Customer ${mappedCustomer.GivenName} ${mappedCustomer.FamilyName} created in QuickBooks.`);
//     }

//     // Fetch the latest invoice created today from Zoho CRM
//     const invoice = await zohoService.getLatestInvoice();
//     if (invoice) {
//       console.log('Invoice data from Zoho CRM:', invoice);
//       const mappedInvoice = await mapInvoiceData(invoice, invoicefieldMapping);
//       console.log('Mapped Invoice Data for QuickBooks:', mappedInvoice);
//       await quickBooksService.createInvoice(mappedInvoice);
//       console.log(`Invoice created in QuickBooks.`);
//     }
//   } catch (error) {
//     console.error('Error occurred while processing:', error);
//   } finally {
//     await app.close();
//   }
// }

// bootstrap();

// function mapCustomerData(customer: any, mapping: any) {
//   const mappedCustomer: any = {};
//   for (const [qbKey, zohoKey] of Object.entries(mapping)) {
//     if (typeof zohoKey === 'string') {
//       mappedCustomer[qbKey] = customer[zohoKey] || 'Unknown';
//     } else if (typeof zohoKey === 'object') {
//       mappedCustomer[qbKey] = {};
//       for (const [nestedKey, nestedZohoKey] of Object.entries(zohoKey)) {
//         mappedCustomer[qbKey][nestedKey] = customer[nestedZohoKey] || '';
//       }
//     }
//   }
//   return mappedCustomer;
// }

// async function mapInvoiceData(invoice: any, mapping: any) {
//     const mappedInvoice: any = {};
  
//     // Map top-level fields
//     for (const [qbKey, zohoKey] of Object.entries(mapping)) {
//       if (typeof zohoKey === 'string') {
//         mappedInvoice[qbKey] = invoice[zohoKey] || null;
//       } else if (typeof zohoKey === 'object') {
//         mappedInvoice[qbKey] = {};
//         for (const [lineKey, lineZohoKey] of Object.entries(zohoKey)) {
//           if (typeof lineZohoKey === 'string') {
//             const keys = lineZohoKey.split('.'); 
//             mappedInvoice[qbKey][lineKey] = keys.reduce((obj, key) => (obj && obj[key] !== undefined) ? obj[key] : null, invoice) || 0;
//           } else {
//             console.warn(`Expected lineZohoKey to be a string, but got ${typeof lineZohoKey}`);
//             mappedInvoice[qbKey][lineKey] = null; 
//           }
//         }
//       }
//     }
  
//     // Handle line items separately
//     if (invoice.Product_Details && mapping.Line && mapping.Line.lineMapping) {
//       mappedInvoice.Line = invoice.Product_Details.map((productDetail) => {
//         const lineItem: any = {};
//         for (const [lineKey, lineZohoKey] of Object.entries(mapping.Line.lineMapping)) {
//           if (typeof lineZohoKey === 'string') {
//             const keys = lineZohoKey.split('.'); 
//             lineItem[lineKey] = keys.reduce((obj, key) => (obj && obj[key] !== undefined) ? obj[key] : null, productDetail) || 0;
//           } else {
//             console.warn(`Expected lineZohoKey to be a string, but got ${typeof lineZohoKey}`);
//             lineItem[lineKey] = null; 
//           }
//         }
//         return lineItem;
//       });
//     }
  
//     return mappedInvoice;
//   }
  


// // src/mapping.ts
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ZohoService } from './zoho/zoho.service';
// import { QuickBooksService } from './quickbooks/quickbooks.service';
// import { customerfieldMapping, invoicefieldMapping, productfieldMapping } from './fieldMapping';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   const zohoService = app.get(ZohoService);
//   const quickBooksService = app.get(QuickBooksService);

//   try {
//     // Fetch the latest customer created today from Zoho CRM
//     const customer = await zohoService.getLatestCustomer();
//     if (customer) {
//       console.log('Customer data from Zoho CRM:', customer);
//       const mappedCustomer = mapCustomerData(customer, customerfieldMapping);
//       console.log('Mapped Customer Data for QuickBooks:', mappedCustomer);
//       await quickBooksService.createCustomer(mappedCustomer);
//       console.log(`Customer ${mappedCustomer.GivenName} ${mappedCustomer.FamilyName} created in QuickBooks.`);
//     }

//     // Fetch the latest product created today from Zoho CRM
//     const product = await zohoService.getLatestProduct(); // Ensure this method exists
//     if (product) {
//       console.log('Product data from Zoho CRM:', product);
//       const mappedProduct = mapProductData(product, productfieldMapping);
//       console.log('Mapped Product Data for QuickBooks:', mappedProduct);
//       await quickBooksService.createProduct(mappedProduct); // Ensure this method exists
//       console.log(`Product ${mappedProduct.Name} created in QuickBooks.`);
//     }

//     // Fetch the latest invoice created today from Zoho CRM
//     const invoice = await zohoService.getLatestInvoice();
//     if (invoice) {
//       console.log('Invoice data from Zoho CRM:', invoice);
//       const mappedInvoice = await mapInvoiceData(invoice, invoicefieldMapping);
//       console.log('Mapped Invoice Data for QuickBooks:', mappedInvoice);
//       await quickBooksService.createInvoice(mappedInvoice);
//       console.log(`Invoice created in QuickBooks.`);
//     }
//   } catch (error) {
//     console.error('Error occurred while processing:', error);
//   } finally {
//     await app.close();
//   }
// }

// function mapCustomerData(customer: any, mapping: any) {
//   const mappedCustomer: any = {};
//   for (const [qbKey, zohoKey] of Object.entries(mapping)) {
//     if (typeof zohoKey === 'string') {
//       mappedCustomer[qbKey] = customer[zohoKey] || 'Unknown';
//     } else if (typeof zohoKey === 'object') {
//       mappedCustomer[qbKey] = {};
//       for (const [nestedKey, nestedZohoKey] of Object.entries(zohoKey)) {
//         mappedCustomer[qbKey][nestedKey] = customer[nestedZohoKey] || '';
//       }
//     }
//   }
//   return mappedCustomer;
// }


// function mapProductData(product: any, mapping: any) {
//   const mappedProduct: any = {};
//   for (const [qbKey, zohoKey] of Object.entries(mapping)) {
//     if (typeof zohoKey === 'string') {
//       mappedProduct[qbKey] = product[zohoKey] || null; 
//     } else if (typeof zohoKey === 'object') {
//       mappedProduct[qbKey] = zohoKey; 
//     }
//   }
//   return mappedProduct;
// }

// function mapInvoiceData(invoice: any, mapping: any) {
//   const mappedInvoice: any = {};

//   for (const [qbKey, zohoKey] of Object.entries(mapping)) {
//     if (Array.isArray(zohoKey)) {
//       // Handle array of line items separately
//       mappedInvoice[qbKey] = zohoKey.map((lineItemMapping) => {
//         const mappedLineItem: any = {};
        
//         // Set the DetailType to the static value
//         mappedLineItem.DetailType = lineItemMapping.DetailType;

//         // Map dynamic fields from the invoice
//         mappedLineItem.Amount = invoice.Grand_Total || 0; 

//         // Map SalesItemLineDetail with static and dynamic fields
//         mappedLineItem.SalesItemLineDetail = {
//           ItemRef: {
//             value: '1', 
//             name: 'Services' 
//           },
//           UnitPrice: invoice.Product_Details?.[0]?.list_price || 0, 
//           Qty: invoice.Product_Details?.[0]?.quantity || 1, 
//           ItemAccountRef: {
//             value: '3', 
//             name: 'Services' 
//           },
//           TaxCodeRef: {
//             value: '9' 
//           }
//         };

//         return mappedLineItem;
//       });
//     } else {
//       if (typeof zohoKey === 'string') {
//         mappedInvoice[qbKey] = invoice[zohoKey] || null; 
//       } else if (typeof zohoKey === 'object') {
       
//         mappedInvoice[qbKey] = zohoKey; 
//       }
//     }
//   }

//   return mappedInvoice;
// }



// bootstrap();


// // src/mapping.ts
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ZohoService } from './zoho/zoho.service';
// import { QuickBooksService } from './quickbooks/quickbooks.service';
// import { customerfieldMapping, invoicefieldMapping, productfieldMapping } from './fieldMapping';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   const zohoService = app.get(ZohoService);
//   const quickBooksService = app.get(QuickBooksService);

//   let createdCustomerId: string | null = null;
//   let createdCustomerName: string | null = null;
//   let createdProductId: string | null = null;
//   let createdProductName: string | null = null;

//   try {
//     // Fetch the latest customer created today from Zoho CRM
//     const customer = await zohoService.getLatestCustomer();
//     if (customer) {
//       console.log('Customer data from Zoho CRM:', customer);
//       const mappedCustomer = mapCustomerData(customer, customerfieldMapping);
//       console.log('Mapped Customer Data for QuickBooks:', mappedCustomer);
      
//       // Create customer in QuickBooks
//       const createdCustomer = await quickBooksService.createCustomer(mappedCustomer);
//       createdCustomerId = createdCustomer.Id; // Store the created customer ID
//       createdCustomerName = createdCustomer.GivenName + ' ' + createdCustomer.FamilyName; // Store the created customer name
      
//       // Log the created customer information
//       console.log(`Customer ${createdCustomerName} created in QuickBooks with ID: ${createdCustomerId}.`);
//     }

//     // Fetch the latest product created today from Zoho CRM
//     const product = await zohoService.getLatestProduct(); // Ensure this method exists
//     if (product) {
//       console.log('Product data from Zoho CRM:', product);
//       const mappedProduct = mapProductData(product, productfieldMapping);
//       console.log('Mapped Product Data for QuickBooks:', mappedProduct);
      
//       // Create product in QuickBooks
//       const createdProduct = await quickBooksService.createProduct(mappedProduct); // Ensure this method exists
//       createdProductId = createdProduct.Id; // Store the created product ID
//       createdProductName = createdProduct.Name; // Store the created product name
      
//       // Log the created product information
//       console.log(`Product ${createdProductName} created in QuickBooks with ID: ${createdProductId}.`);
//     }

//     // Fetch the latest invoice created today from Zoho CRM
//     const invoice = await zohoService.getLatestInvoice();
//     if (invoice && createdCustomerId && createdProductId) {
//       console.log('Invoice data from Zoho CRM:', invoice);
//       const mappedInvoice = await mapInvoiceData(invoice, invoicefieldMapping, createdCustomerId, createdCustomerName, createdProductId, createdProductName);
//       console.log('Mapped Invoice Data for QuickBooks:', mappedInvoice);
//       const createdInvoice = await quickBooksService.createInvoice(mappedInvoice);
//       console.log(`Invoice created in QuickBooks with ID: ${createdInvoice.Id}.`);
//     }
//   } catch (error) {
//     console.error('Error occurred while processing:', error);
//   } finally {
//     await app.close();
//   }
// }

// function mapCustomerData(customer: any, mapping: any) {
//   const mappedCustomer: any = {};
//   for (const [qbKey, zohoKey] of Object.entries(mapping)) {
//     if (typeof zohoKey === 'string') {
//       mappedCustomer[qbKey] = customer[zohoKey] || 'Unknown';
//     } else if (typeof zohoKey === 'object') {
//       mappedCustomer[qbKey] = {};
//       for (const [nestedKey, nestedZohoKey] of Object.entries(zohoKey)) {
//         mappedCustomer[qbKey][nestedKey] = customer[nestedZohoKey] || '';
//       }
//     }
//   }
//   return mappedCustomer;
// }

// function mapProductData(product: any, mapping: any) {
//   const mappedProduct: any = {};
//   for (const [qbKey, zohoKey] of Object.entries(mapping)) {
//     if (typeof zohoKey === 'string') {
//       mappedProduct[qbKey] = product[zohoKey] || null; 
//     } else if (typeof zohoKey === 'object') {
//       mappedProduct[qbKey] = zohoKey; 
//     }
//   }
//   return mappedProduct;
// }

// function mapInvoiceData(invoice: any, mapping: any, customerId: string, customerName: string, productId: string, productName: string) {
//   const mappedInvoice: any = {};

//   for (const [qbKey, zohoKey] of Object.entries(mapping)) {
//     if (Array.isArray(zohoKey)) {
//       // Handle array of line items separately
//       mappedInvoice[qbKey] = zohoKey.map((lineItemMapping) => {
//         const mappedLineItem: any = {};
        
//         // Set the DetailType to the static value
//         mappedLineItem.DetailType = lineItemMapping.DetailType;

//         // Map dynamic fields from the invoice
//         mappedLineItem.Amount = invoice.Grand_Total || 0; 

//         // Map SalesItemLineDetail with static and dynamic fields
//         mappedLineItem.SalesItemLineDetail = {
//           ItemRef: {
//             value: productId,  // Use the product ID stored earlier
//             name: productName // Use the product name stored earlier
//           },
//           UnitPrice: invoice.Product_Details?.[0]?.list_price || 0, 
//           Qty: invoice.Product_Details?.[0]?.quantity || 1, 
//           ItemAccountRef: {
//             value: '3', 
//             name: 'Services' 
//           },
//           TaxCodeRef: {
//             value: '9' 
//           }
//         };

//         return mappedLineItem;
//       });
//     } else {
//       if (typeof zohoKey === 'string') {
//         mappedInvoice[qbKey] = invoice[zohoKey] || null; 
//       } else if (typeof zohoKey === 'object') {
//         mappedInvoice[qbKey] = zohoKey; 
//       }
//     }
//   }

//   // Set the customer reference using the createdCustomerId
//   mappedInvoice.CustomerRef = {
//     value: customerId, // Use the customer ID stored earlier
//     name: customerName // Use the customer name stored earlier
//   };

//   return mappedInvoice;
// }

// bootstrap();



// // src/mapping.ts
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ZohoService } from './zoho/zoho.service';
// import { QuickBooksService } from './quickbooks/quickbooks.service';
// import { customerfieldMapping, invoicefieldMapping, productfieldMapping } from './fieldMapping';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   const zohoService = app.get(ZohoService);
//   const quickBooksService = app.get(QuickBooksService);

//   let createdCustomerId: string | null = null;
//   let createdProductId: string | null = null;

//   try {
//     // Fetch the latest customer created today from Zoho CRM
//     const customer = await zohoService.getLatestCustomer();
//     if (customer) {
//       console.log('Customer data from Zoho CRM:', customer);
//       const mappedCustomer: any = {};
      
//       // Mapping customer data directly
//       for (const [qbKey, zohoKey] of Object.entries(customerfieldMapping)) {
//         if (typeof zohoKey === 'string') {
//           mappedCustomer[qbKey] = customer[zohoKey] || 'Unknown';
//         } else if (typeof zohoKey === 'object') {
//           mappedCustomer[qbKey] = {};
//           for (const [nestedKey, nestedZohoKey] of Object.entries(zohoKey)) {
//             mappedCustomer[qbKey][nestedKey] = customer[nestedZohoKey] || '';
//           }
//         }
//       }

//       // Create customer in QuickBooks
//       const createdCustomer = await quickBooksService.createCustomer(mappedCustomer);
//       console.log('QuickBooks Response for Customer Creation:', createdCustomer); // Print QB response
//       if (createdCustomer && createdCustomer.Customer) {
//         createdCustomerId = createdCustomer.Customer.Id; // Store customer ID from response
//         console.log(`Customer created in QuickBooks with ID: ${createdCustomerId}.`);
//       } else {
//         console.error('Failed to create customer in QuickBooks.');
//       }
//     } else {
//       console.error('No customer data fetched from Zoho CRM.');
//     }

//     // Fetch the latest product created today from Zoho CRM
//     const product = await zohoService.getLatestProduct();
//     if (product) {
//       console.log('Product data from Zoho CRM:', product);
//       const mappedProduct: any = {};
      
//       // Mapping product data directly
//       for (const [qbKey, zohoKey] of Object.entries(productfieldMapping)) {
//         if (typeof zohoKey === 'string') {
//           mappedProduct[qbKey] = product[zohoKey] || null; 
//         } else if (typeof zohoKey === 'object') {
//           mappedProduct[qbKey] = zohoKey; 
//         }
//       }

//       // Create product in QuickBooks
//       const createdProduct = await quickBooksService.createProduct(mappedProduct);
//       console.log('QuickBooks Response for Product Creation:', createdProduct); // Print QB response
//       if (createdProduct && createdProduct.Item) {
//         createdProductId = createdProduct.Item.Id; // Store product ID from response
//         console.log(`Product created in QuickBooks with ID: ${createdProductId}.`);
//       } else {
//         console.error('Failed to create product in QuickBooks.');
//       }
//     } else {
//       console.error('No product data fetched from Zoho CRM.');
//     }

//     // Fetch the latest invoice created today from Zoho CRM
//     const invoice = await zohoService.getLatestInvoice();
//     if (invoice && createdCustomerId && createdProductId) {
//       console.log('Invoice data from Zoho CRM:', invoice);
//       const mappedInvoice: any = {};
      
//       // Mapping invoice data directly
//       for (const [qbKey, zohoKey] of Object.entries(invoicefieldMapping)) {
//         if (typeof zohoKey === 'string') {
//           mappedInvoice[qbKey] = invoice[zohoKey] || null;
//         } else if (typeof zohoKey === 'object') {
//           mappedInvoice[qbKey] = {};
//           for (const [nestedKey, nestedZohoKey] of Object.entries(zohoKey)) {
//             mappedInvoice[qbKey][nestedKey] = invoice[nestedZohoKey] || '';
//           }
//         }
//       }

//       // Use the created customer and product IDs for the invoice
//       mappedInvoice.CustomerRef = {
//         Value: createdCustomerId, // Use the stored customer ID
//       };
//       mappedInvoice.Line = [
//         {
//           Amount: invoice.Amount || 0,
//           DetailType: 'SalesItemLineDetail',
//           SalesItemLineDetail: {
//             ItemRef: {
//               Value: createdProductId, // Use the stored product ID
//             },
//             // Additional fields can be mapped as necessary
//           },
//         },
//       ];

//       // Create the invoice in QuickBooks
//       const createdInvoice = await quickBooksService.createInvoice(mappedInvoice);
//       if (createdInvoice) {
//         console.log(`Invoice created in QuickBooks with ID: ${createdInvoice.Id}.`);
//       } else {
//         console.error('Failed to create invoice in QuickBooks.');
//       }
//     } else {
//       console.error('No invoice data fetched from Zoho CRM or missing customer/product IDs.');
//     }
//   } catch (error) {
//     console.error('Error occurred while processing:', error);
//   } finally {
//     await app.close();
//   }
// }

// bootstrap();




// src/mapping.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZohoService } from './zoho/zoho.service';
import { QuickBooksService } from './quickbooks/quickbooks.service';
import { customerfieldMapping, invoicefieldMapping, productfieldMapping } from './fieldMapping';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const zohoService = app.get(ZohoService);
  const quickBooksService = app.get(QuickBooksService);

  let createdCustomerId: string | null = null;
  let createdProductId: string | null = null;

  try {
    // Customer creation logic remains unchanged
    const customer = await zohoService.getLatestCustomer();
    if (customer) {
      console.log('Customer data from Zoho CRM:', customer);
      const mappedCustomer: any = {};
      for (const [qbKey, zohoKey] of Object.entries(customerfieldMapping)) {
        if (typeof zohoKey === 'string') {
          mappedCustomer[qbKey] = customer[zohoKey] || 'Unknown';
        } else if (typeof zohoKey === 'object') {
          mappedCustomer[qbKey] = {};
          for (const [nestedKey, nestedZohoKey] of Object.entries(zohoKey)) {
            mappedCustomer[qbKey][nestedKey] = customer[nestedZohoKey] || '';
          }
        }
      }
      const createdCustomer = await quickBooksService.createCustomer(mappedCustomer);
      if (createdCustomer?.Customer) {
        createdCustomerId = createdCustomer.Customer.Id;
        console.log(`Customer created in QuickBooks with ID: ${createdCustomerId}.`);
      } else {
        console.error('Failed to create customer in QuickBooks.');
      }
    }

    // Product creation logic remains unchanged
    const product = await zohoService.getLatestProduct();
    if (product) {
      console.log('Product data from Zoho CRM:', product);
      const mappedProduct: any = {};
      for (const [qbKey, zohoKey] of Object.entries(productfieldMapping)) {
        if (typeof zohoKey === 'string') {
          mappedProduct[qbKey] = product[zohoKey] || null;
        } else if (typeof zohoKey === 'object') {
          mappedProduct[qbKey] = zohoKey;
        }
      }
      const createdProduct = await quickBooksService.createProduct(mappedProduct);
      if (createdProduct?.Item) {
        createdProductId = createdProduct.Item.Id;
        console.log(`Product created in QuickBooks with ID: ${createdProductId}.`);
      } else {
        console.error('Failed to create product in QuickBooks.');
      }
    }

//     // Invoice creation logic with mapped IDs and logging
//     const invoice = await zohoService.getLatestInvoice();
//     if (invoice && createdCustomerId && createdProductId) {
//       console.log('Invoice data from Zoho CRM:', invoice);
//       const mappedInvoice: any = {};

//       // Map invoice data dynamically
//       for (const [qbKey, zohoKey] of Object.entries(invoicefieldMapping)) {
//         if (typeof zohoKey === 'string') {
//           mappedInvoice[qbKey] = invoice[zohoKey] || null;
//         } else if (typeof zohoKey === 'object') {
//           mappedInvoice[qbKey] = {};
//           for (const [nestedKey, nestedZohoKey] of Object.entries(zohoKey)) {
//             mappedInvoice[qbKey][nestedKey] = invoice[nestedZohoKey] || '';
//           }
//         }
//       }

//       // Add static and dynamic data for the invoice
//       mappedInvoice.CustomerRef = { value: createdCustomerId };
//       mappedInvoice.Line = [
//         {
//           Amount: invoice.Amount || 0,
//           DetailType: 'SalesItemLineDetail',
//           SalesItemLineDetail: {
//             ItemRef: { value: createdProductId, name: invoice.ProductName || 'Unknown' },
//             UnitPrice: invoice.UnitPrice || 0,
//             Qty: invoice.Quantity || 1,
//             ItemAccountRef: { value: '3', name: 'Services' },
//             TaxCodeRef: { value: '9' },
//           },
//         },
//       ];

//       // Log the mapped invoice for verification
//       console.log('Mapped Invoice Data:', JSON.stringify(mappedInvoice, null, 2));

//       // Create the invoice in QuickBooks
//       const createdInvoice = await quickBooksService.createInvoice(mappedInvoice);
//       if (createdInvoice?.Id) {
//         console.log(`Invoice created in QuickBooks with ID: ${createdInvoice.Id}.`);
//       } else {
//         console.error('Failed to create invoice in QuickBooks.');
//       }
//     } else {
//       console.error('No invoice data fetched or missing customer/product IDs.');
//     }
//   } catch (error) {
//     console.error('Error occurred while processing:', error.response?.data || error);
//   } finally {
//     await app.close();
//   }
// }



const invoice = await zohoService.getLatestInvoice();
  if (invoice && createdCustomerId && createdProductId) {
    console.log('Invoice data from Zoho CRM:', invoice);
    const mappedInvoice: any = {};

    // Map invoice data dynamically
    for (const [qbKey, zohoKey] of Object.entries(invoicefieldMapping)) {
      if (typeof zohoKey === 'string') {
        mappedInvoice[qbKey] = invoice[zohoKey] || null;
      } else if (typeof zohoKey === 'object') {
        mappedInvoice[qbKey] = {};
        for (const [nestedKey, nestedZohoKey] of Object.entries(zohoKey)) {
          mappedInvoice[qbKey][nestedKey] = invoice[nestedZohoKey] || '';
        }
      }
    }

    // Add static and dynamic data for the invoice
    mappedInvoice.CustomerRef = { value: createdCustomerId };

    // Extract Product_Details for line items mapping
    const productDetails = invoice.Product_Details || [];
    mappedInvoice.Line = productDetails.map(item => ({
      Amount: item.total || item.net_total || 0, // Use total or net_total
      DetailType: 'SalesItemLineDetail',
      SalesItemLineDetail: {
        ItemRef: {
          value: createdProductId, // Assuming createdProductId is the mapped product ID
          name: item.product?.name || 'Unknown' // Use product name from Zoho
        },
        UnitPrice: item.unit_price || 0, // Use unit price from Zoho
        Qty: item.quantity || 1, // Use quantity from Zoho
        ItemAccountRef: { value: '3', name: 'Services' }, // Static account reference
        TaxCodeRef: { value: '9' } // Static tax code
      }
    }));

    // Log the mapped invoice for verification
    console.log('Mapped Invoice Data:', JSON.stringify(mappedInvoice, null, 2));

    // Create the invoice in QuickBooks
    const createdInvoice = await quickBooksService.createInvoice(mappedInvoice);
    if (createdInvoice?.Id) {
      console.log(`Invoice created in QuickBooks with ID: ${createdInvoice.Id}.`);
    } else {
      console.log(`Invoice created in QuickBooks with ID: ${createdInvoice.Id}.`);
    }
  } else {
    console.error('No invoice data fetched or missing customer/product IDs.');
  }
} catch (error) {
  console.error('Error occurred while processing:', error.response?.data || error);
} finally {
  await app.close();
}
}

bootstrap();
