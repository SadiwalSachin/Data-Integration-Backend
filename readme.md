# EzyMetrics Backend - Data Integrations and Reporting

## Project Overview
A backend service focusing on data integration and reporting. It simulates integration with CRM and marketing platforms to fetch lead and campaign data, processes the data using an ETL pipeline, and generates reports in PDF or CSV format. Additionally, the project supports sending basic email alerts based on predefined conditions.

## Features
- **API Integration**: Fetches lead and campaign data from dummy CRM and marketing platforms.
- **ETL Process**: Transforms raw lead data into meaningful metrics using MongoDB’s aggregation pipeline.
- **Reporting**: Generates detailed reports in PDF format.
- **Alerts**: Basic email notifications triggered by specific conditions.
  
## Technologies Used
- **Node.js** (Express)
- **MongoDB** (Mongoose)
- **Express** for server creation
- **Mongoose** ORM for mongoDB
- **Axios** for data fetching
- **PDFKit** for generating PDF reports
- **Nodemailer** for sending email notifications
- **Aggregation Pipeline** in MongoDB for data transformation

## Project Structure
The project is structured as follows:


### Models
1. **Campaign Model (`campaign.model.js`)**: Stores campaign details like name, budget, start and end dates more fields can be added further based on data which will came from crm.
2. **Lead Model (`lead.model.js`)**: Stores lead information like name, email, phone number, and associated campaigns more fields can be added further based on data which will came from crm.
3. **Transformed Data Model (`transformedData.model.js`)**: Stores the transformed lead data after the ETL process.

### Controllers
1. **`dataFetch.controller.js`**:
   - `getAllLeadData`: Fetches lead data from a dummy CRM, stores it in MongoDB, and sends a response.
   - `getAllCampaignData`: Fetches campaign data from a dummy marketing platform, stores it in MongoDB, and sends a response.
   - `getAllTransformedData`: This handles the ETL process where raw lead data is aggregated and transformed using MongoDB’s aggregation pipeline.

2. **`report.controller.js`**:
   - `generatePdfReport` : Handles the generation of reports in PDF format using data from the transformed data model.
   - `checkCampaignConditions` : Functionaltiy of sending email on meeting of certain condition on campaign data
      - `checkLeadConditions` : Functionaltiy of sending email on meeting of certain condition on lead data

### ETL Process in `getAllTransformedData`
The ETL (Extract, Transform, Load) process in this project involves using MongoDB’s aggregation pipeline to join, transform, and filter lead data based on associated campaigns.

The pipeline includes:
- **$lookup**: Joins the `leads` and `campaigns` collections based on a matching field (e.g., `leadId`).
- **$unwind**: Flattens the results of the join if multiple campaigns are linked to a lead.
- **$project**: Transforms the data, creating a `fullName` field by concatenating first and last names, and includes other relevant fields like `email`, `phoneNo`, `company`, and `leadStatus`.
- **$match**: Filters out any leads that are not associated with a campaign.

This transformed data is then stored in the `TransformedData` collection for further processing or reporting.

### Utility Folder
The `utility` folder contains reusable logic:
1. **`asyncHandler.js`**: A wrapper function that handles asynchronous operations and catches errors.
2. **`createPdf.js`**: Contains logic for generating a PDF report using the PDFKit package.
3. **`email.js`**: Contains the logic for sending email using nodemailer package

### PDF Generation
The `createPdf.js` file defines the logic for generating PDF reports. The `createPdf` function takes transformed data and outputs a structured PDF with details like lead ID, full name, email, phone number, company, lead status, and associated campaign ID.

### Installation

1. Clone the repository:
```bash
git clone https://github.com/SadiwalSachin/Data-Integration-Backend.git
