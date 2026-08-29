
const Transaction = require("../models/Transaction");
const ExcelJS = require("exceljs");
const PDFDocument = require("pdfkit");

// =======================
// Excel Report
// =======================
exports.downloadExcelReport = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({
      transactionDate: -1,
    });

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Bank Report");

    sheet.columns = [
      { header: "Date", key: "date", width: 20 },
      { header: "Bank", key: "bank", width: 20 },
      { header: "Type", key: "type", width: 20 },
      { header: "Amount", key: "amount", width: 15 },
      { header: "Remarks", key: "remarks", width: 30 },
    ];

    transactions.forEach((t) => {
      sheet.addRow({
        date: new Date(t.transactionDate).toLocaleString(),
        bank: t.bankName,
        type: t.type,
        amount: t.amount,
        remarks: t.remarks,
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="Bank_Report.xlsx"'
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// PDF Report
// =======================
exports.downloadPDFReport = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({
      transactionDate: -1,
    });

    const doc = new PDFDocument({ margin: 40 });

    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="Bank_Report.pdf"'
    );

    doc.pipe(res);

    doc.fontSize(20).text("Bank Operations Analytics", {
      align: "center",
    });

    doc.moveDown();

    doc.fontSize(12);

    transactions.forEach((t) => {
      doc.text(
        `${new Date(t.transactionDate).toLocaleDateString()} | ${t.bankName} | ${t.type} | ₹${t.amount}`
      );

      if (t.remarks) {
        doc.text(`Remarks: ${t.remarks}`);
      }

      doc.moveDown(0.5);
    });

    doc.end();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};