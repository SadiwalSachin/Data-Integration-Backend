import PDFDocument from 'pdfkit';

const createPdf = (data, res) => {
    const doc = new PDFDocument();

    // Set the headers for the response so the browser knows it's a downloadable file
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');

    // Pipe the PDF into the response stream instead of a file
    doc.pipe(res);

    // Add a title to the document
    doc.fontSize(20).text('Transformed Data Report', { align: 'center' });
    doc.moveDown(1);

    // Table Headers
    doc.fontSize(12).text('Lead ID', { continued: true, width: 100 });
    doc.text('Full Name', { continued: true, width: 100 });
    doc.text('Email', { continued: true, width: 150 });
    doc.text('Phone No', { continued: true, width: 100 });
    doc.text('Company', { continued: true, width: 100 });
    doc.text('Lead Status', { continued: true, width: 100 });
    doc.text('Campaign ID', { width: 100 });
    doc.moveDown();

    // Iterate over the transformed data and add each lead's data to the PDF
    data.forEach(lead => {
        doc.text(lead.leadId.toString(), { continued: true, width: 100 });
        doc.text(lead.fullName, { continued: true, width: 100 });
        doc.text(lead.email, { continued: true, width: 150 });
        doc.text(lead.phoneNo, { continued: true, width: 100 });
        doc.text(lead.company, { continued: true, width: 100 });
        doc.text(lead.leadStatus, { continued: true, width: 100 });
        doc.text(lead.campaignId ? lead.campaignId.toString() : 'N/A', { width: 100 });
        doc.moveDown(0.5); // Add some spacing between rows
    });

    // Finalize the PDF and end the stream
    doc.end();
}

export { createPdf };
