// //src/fieldMapping.ts

// export const customerfieldMapping = {
//     GivenName: 'First_Name',    
//     FamilyName: 'Last_Name',    
//     PrimaryEmailAddr: { 
//       Address: 'Email'         
//     },
//     BillAddr: {
//       Line1: 'Mailing_Street',  
//       City: 'Mailing_City',     
//       CountrySubDivisionCode: 'Mailing_State', 
//       PostalCode: 'Mailing_Zip',
//       Country: 'Mailing_Country' 
//     }
//   };
      

// src/fieldMapping.ts

export const customerfieldMapping = {
  GivenName: 'Last_Name',
  FamilyName: 'First_Name',
  PrimaryEmailAddr: {
    Address: 'Secondary_Email'
  },
  BillAddr: {
    Line1: 'Mailing_Street',
    City: 'Mailing_City',
    CountrySubDivisionCode: 'Mailing_State',
    PostalCode: 'Mailing_Zip',
    Country: 'Mailing_Country'
  }
};



export const productfieldMapping = {
  TrackQtyOnHand: true, 
  Name: 'Product_Name', 
  QtyOnHand: 'Qty_in_Stock', 
  IncomeAccountRef: {
    name: 'Sales of Product Income', 
    value: '69' 
  },
  AssetAccountRef: {
    name: 'Inventory Asset', 
    value: '71' 
  },
  InvStartDate: 'Created_Time', 
  Type: 'Inventory', 
  ExpenseAccountRef: {
    name: 'Cost of Sales', 
    value: '70' 
  },
};



export const invoicefieldMapping = {
  Line: [
    {
      DetailType: 'SalesItemLineDetail', // Static value
      Amount: 'Grand_Total', // Total amount mapping
      SalesItemLineDetail: { // Nested mapping for product line details
        ItemRef: { 
          value: '', // Placeholder for product ID (dynamic in mapping.ts)
          //name: '' // Placeholder for product name
        },
        UnitPrice: 'Unit_Price', // Unit price mapping
        Qty: 'Quantity', // Quantity mapping
        ItemAccountRef: {
          value: '3', // Placeholder for account reference
          name: 'Services'
        },
        TaxCodeRef: {
          value: '9' // Tax code reference (static)
        }
      }
    }
  ],
  CustomerRef: { 
    value: '' // Placeholder for customer ID (dynamic in mapping.ts)
  }
};