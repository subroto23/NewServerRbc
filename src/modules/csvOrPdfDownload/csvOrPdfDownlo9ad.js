const {
  earnsCollection,
  spendCollection,
} = require("../../Dbconfig/DatabaseConfig");
const PDFDocument = require("pdfkit");
const moment = require("moment");
const path = require("path");

//Get all Earn Values
const getAllEarnPdfGenerator = async (req, res) => {
  try {
    const result = await earnsCollection.find().toArray();
    const spendResult = await spendCollection.find().toArray();
    const earnings = result.reverse();
    const spending = spendResult.reverse();

    const PDFDocument = require("pdfkit");
    const path = require("path");

    const doc = new PDFDocument({
      margin: 50,
      size: "A4",
      bufferPages: true,
    });

    // const fontPath = path.join(__dirname, "../../../fonts/banglafront.ttf");
        const fontPath = path.join(
      __dirname,
      "../../../fonts/NotoSansBengali-VariableFont_wdth,wght.ttf"
    );
    doc.registerFont("Bangla", fontPath);
    const getDateRange = (data) => {
      const dates = data.map((e) => new Date(e.earnDate));
      const min = new Date(Math.min(...dates)).toLocaleDateString();
      const max = new Date(Math.max(...dates)).toLocaleDateString();
      return { min, max };
    };

    const { min, max } = getDateRange(earnings);
    const categoryTotals = {};

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=earnings.pdf");

    doc.pipe(res);

    const pageWidth = 550;
    const tableStartX = 50;
    let y = 50;

    const drawHeader = () => {
      doc
        .font("Bangla")
        .fontSize(16)
        .text("রূপসী বাংলা ক্লাব", { align: "center" });
      doc
        .font("Bangla")
        .fontSize(12)
        .text("কাদিরদী, বোয়ালমারী, ফরিদপুর", { align: "center" });
      doc
        .font("Bangla")
        .text("স্থাপিতঃ ২০১৫ ইং", { align: "center" })
        .moveDown()
        .moveDown();
    };

    const drawTableHeader = () => {
      const range = doc.bufferedPageRange();
      const pageHeight = doc.page.height;
      const text = "ক্লাব এবং গ্রামের হিসাব";
      const fontSize = 24;

      doc.font("Bangla").fontSize(fontSize);
      const textHeight = doc.heightOfString(text);
      const verticalCenter = (pageHeight - textHeight) / 2;

      y = verticalCenter;

      doc.text(text, 0, verticalCenter, {
        align: "center",
        width: doc.page.width,
      });
      y += 50;
      doc.fontSize(8).text(`হিসাব বিবরণ সীমা: ${min} থেকে ${max}`, 0, y, {
        align: "center",
        width: doc.page.width,
      });
    };

    const drawTableRows = () => {
      doc.font("Bangla").fontSize(10);

      for (const entry of earnings) {
        if (!categoryTotals[entry.catagory]) {
          categoryTotals[entry.catagory] = 0;
        }
        categoryTotals[entry.catagory] += entry.earnValue;
      }
    };

    const drawTypeBasedEarningsPages = () => {
      const types = {
        cada: "মাসিক চাঁদা থেকে আয়ঃ",
        dhak: "ঢাকের দক্ষিণা থেকে আয়ঃ",
        extraPujaMoney: "অতিরিক্ত অর্থ (বিভিন্ন পূজার) থেকে আয়ঃ",
        jomi: "জমি লিজ বাবদ আয়ঃ",
        others: "অন্যান্যভাবে আয়ঃ",
      };

      for (const [type, title] of Object.entries(types)) {
        const entries = earnings.filter((e) => e.type === type);
        if (!entries.length) continue;

        doc.addPage();
        y = 50;
        doc.font("Bangla").fontSize(14).text(title, { align: "center" });
        y += 30;

        doc.fontSize(10).text("তারিখ", tableStartX, y);
        doc.text("প্রেরকের নাম", tableStartX + 80, y);
        doc.text("বিবরণ", tableStartX + 200, y);
        doc.text("পরিমাণ", tableStartX + 400, y);
        doc
          .moveTo(tableStartX, y + 15)
          .lineTo(pageWidth, y + 15)
          .stroke();
        y += 20;

        for (const e of entries) {
          const detailsHeight = doc.heightOfString(e.earnDetails, {
            width: 140,
          });
          const rowHeight = Math.max(20, detailsHeight + 10);

          if (y + rowHeight > 750) {
            doc.addPage();
            y = 50;
          }

          doc.rect(tableStartX, y, 500, rowHeight).stroke();
          doc.text(e.earnDate, tableStartX + 5, y + 5);
          doc.text(e.senderName, tableStartX + 80, y + 5);
          doc.text(e.earnDetails, tableStartX + 200, y + 5, { width: 180 });
          doc.text(e.earnValue.toString(), tableStartX + 400, y + 5);
          y += rowHeight;
        }

        const total = entries.reduce((sum, e) => sum + e.earnValue, 0);
        y += 20;
        doc.font("Bangla").fontSize(12).text(`মোট আয়ঃ ${total} টাকা`, 50, y);
      }
    };

    const specificEarnValue = () => {
      const types = {
        cada: "মাসিক চাঁদা থেকে আয়ঃ",
        dhak: "ঢাকের দক্ষিণা থেকে আয়ঃ",
        extraPujaMoney: "অতিরিক্ত অর্থ (বিভিন্ন পূজার) থেকে আয়ঃ",
        jomi: "জমি লিজ বাবদ আয়ঃ",
        others: "অন্যান্যভাবে আয়ঃ",
      };
      for (const [type, title] of Object.entries(types)) {
        const entries = earnings.filter((e) => e.type === type);
        if (!entries.length) continue;

        const total = entries.reduce((sum, e) => sum + e.earnValue, 0);
        y += 20;
        doc.font("Bangla").fontSize(12).text(`${title} ${total} টাকা`, 50, y);
      }
    };

    //আয়ের স্পিফিক বিবারণ
    const drawFooter = () => {
      const range = doc.bufferedPageRange();
      const totalEarn = earnings.reduce((sum, e) => sum + e.earnValue, 0);

      for (let i = range.start; i < range.start + range.count; i++) {
        doc.switchToPage(i);
        doc
          .font("Bangla")
          .fontSize(8)
          .text(`হিসাব বিবরণ সীমা: ${min} - ${max}`, 50, 780, {
            align: "center",
            width: 500,
          });
      }

      doc.switchToPage(range.start + range.count - 1);
      y += 30;
      doc.font("Bangla").fontSize(12).text(`মোট আয়ঃ ${totalEarn} টাকা`, 50, y, {
        align: "center",
        width: 500,
      });
      y += 20;

      Object.entries(categoryTotals).forEach(([cat, value]) => {
        const label =
          cat === "rbc"
            ? "ক্লাবের আয়ঃ"
            : cat === "village"
            ? "গ্রামের আয়ঃ"
            : `${cat} আয়ঃ`;
        doc.text(`${label} ${value} টাকা`, 50, y, {
          align: "center",
          width: 500,
        });
        y += 15;
      });
    };

    // Summary and type-wise expense pages
    const totalEarn = earnings.reduce((sum, e) => sum + e.earnValue, 0);
    const totalSpend = spending.reduce((sum, s) => sum + s.spendValue, 0);
    const totalBank = spending
      .filter((s) => s.type === "bank")
      .reduce((sum, s) => sum + s.spendValue, 0);

    const typeTotals = {};
    for (const s of spending) {
      if (!typeTotals[s.type]) typeTotals[s.type] = 0;
      typeTotals[s.type] += s.spendValue;
    }

    const managerBalance = totalEarn - totalSpend - totalBank;

    const drawSummary = () => {
      doc.addPage();
      y = 50;
      doc.font("Bangla").fontSize(14).text("সারসংক্ষেপ", { align: "center" });
      y += 30;
      doc.font("Bangla").fontSize(12).fillColor("black");

      const clubIncome = categoryTotals["rbc"] || 0;
      const villageIncome = categoryTotals["village"] || 0;
      const clubExpense = spending
        .filter((s) => s.catagory === "rbc")
        .reduce((sum, s) => sum + s.spendValue, 0);
      const villageExpense = spending
        .filter((s) => s.catagory === "village")
        .reduce((sum, s) => sum + s.spendValue, 0);

      const currentClubBalance = clubIncome - clubExpense;
      const currentVillageBalance = villageIncome - villageExpense;

      doc.text(`মোট আয়ঃ ${totalEarn} টাকা`, 50, y);
      y += 20;
      doc.text(`মোট ব্যয়ঃ ${totalSpend - totalBank} টাকা`, 50, y);
      y += 20;
      doc.text(`ব্যাংকে জমাঃ ${totalBank} টাকা`, 50, y);
      y += 20;
      y += 30;
      doc.text(`মোট গ্রামের আয়ঃ ${villageIncome} টাকা`, 50, y);
      y += 20;
      doc.text(`মোট গ্রামের ব্যয়ঃ ${villageExpense} টাকা`, 50, y);
      y += 20;
      doc.text(`বর্তমান গ্রামে আছে: ${currentVillageBalance} টাকা`, 50, y);

      y += 20;
      y += 30;
      doc.text(`মোট ক্লাবের আয়ঃ ${clubIncome} টাকা`, 50, y);
      y += 20;
      doc.text(`মোট ক্লাবের ব্যয়ঃ ${clubExpense} টাকা`, 50, y);
      y += 20;
      doc.text(`বর্তমান ক্লাবে আছে: ${currentClubBalance} টাকা`, 50, y);
      y += 20;
      y += 30;
      doc
        .font("Bangla")
        .fontSize(12)
        .fillColor("black")
        .font("Bangla")
        .fontSize(12)
        .fillColor("black")
        .text(`ম্যানেজারের কাছে জমাঃ ${totalEarn - totalSpend} টাকা`, 50, y, {
          continued: false,
          underline: false,
          oblique: false,
          bold: true,
        });
      y += 20;
      y += 30;
    doc.text(`আয়ের বিবারণসমূহঃ-`, 50, y);
    y+=5;
    specificEarnValue()

      y += 20;
      y += 30;
      doc.text(`ব্যায়ের বিবারণসমূহঃ-`, 50, y);

      y += 30;

      Object.entries(typeTotals).forEach(([type, value]) => {
        let label = "";
        switch (type) {
          case "others":
            label = "অন্যান্য ব্যয়ঃ";
            break;
          case "festival":
            label = "উৎসবে ব্যয়ঃ";
            break;
          case "tv":
            label = "টিভি মেরামতে ব্যয়ঃ";
            break;
          case "bidhut":
            label = "বিদ্যুৎ বিলে ব্যয়ঃ";
            break;
          case "onudan":
            label = "অনুদানে ব্যয়ঃ";
            break;
          case "bank":
            label = "ব্যাংকে জমাঃ";
            break;
          default:
            label = `${type} ব্যয়ঃ`;
            break;
        }
        doc.text(`${label} ${value} টাকা`, 50, y);
        y += 15;
      });
    };

    const drawTypeBasedPages = () => {
      const typeGrouped = {};
      for (const s of spending) {
        if (!typeGrouped[s.type]) typeGrouped[s.type] = [];
        typeGrouped[s.type].push(s);
      }

      for (const [type, entries] of Object.entries(typeGrouped)) {
        doc.addPage();
        y = 50;
        let label = "";
        switch (type) {
          case "others":
            label = "অন্যান্য ব্যয়ের বিবরণ";
            break;
          case "festival":
            label = "উৎসবে ব্যয়ের বিবরণ";
            break;
          case "tv":
            label = "টিভি মেরামতে ব্যয়ের বিবরণ";
            break;
          case "bidhut":
            label = "বিদ্যুৎ বিল বাবদ ব্যয়ের বিবরণ";
            break;
          case "onudan":
            label = "অনুদানে ব্যয়ের বিবরণ";
            break;
          case "bank":
            label = "ব্যাংকে জমার বিবরণ";
            break;
          default:
            label = `${type} ব্যয়ের বিবরণ`;
            break;
        }
        doc.font("Bangla").fontSize(14).text(label, { align: "center" });
        y += 30;

        doc.fontSize(10).text("তারিখ", tableStartX, y);
        doc.text("ব্যয়কারীর নাম", tableStartX + 80, y);
        doc.text("বিবরণ", tableStartX + 200, y);
        doc.text("পরিমাণ", tableStartX + 400, y);
        doc
          .moveTo(tableStartX, y + 15)
          .lineTo(pageWidth, y + 15)
          .stroke();
        y += 20;

        for (const s of entries) {
          const detailsHeight = doc.heightOfString(s.spendDetails, {
            width: 140,
          });
          const rowHeight = Math.max(20, detailsHeight + 10);

          if (y + rowHeight > 750) {
            doc.addPage();
            y = 50;
          }

          doc.rect(tableStartX, y, 500, rowHeight).stroke();
          doc.text(s.spendDate, tableStartX + 5, y + 5);
          doc.text(s.spenderName, tableStartX + 80, y + 5);
          doc.text(s.spendDetails, tableStartX + 200, y + 5, { width: 180 });
          doc.text(s.spendValue.toString(), tableStartX + 400, y + 5);
          y += rowHeight;
        }
      }
    };

    // Draw main
    drawHeader();
    drawTableHeader();
    drawTableRows();
    // drawFooter();

    drawTypeBasedEarningsPages();
    drawTypeBasedPages();
    drawSummary();

    doc.end();
  } catch (error) {
    console.error("PDF Generation Error:", error);
    res.status(500).send("Server Error");
  }
};

const csvOrPdfController = {
  getAllEarnPdfGenerator,
};

module.exports = csvOrPdfController;
// const {
//   earnsCollection,
//   spendCollection,
// } = require("../../Dbconfig/DatabaseConfig");

// const PDFDocument = require("pdfkit");
// const path = require("path");
// const fs = require("fs");

// // Get all Earn Values
// const getAllEarnPdfGenerator = async (req, res) => {
//   try {
//     const result = await earnsCollection.find().toArray();
//     const spendResult = await spendCollection.find().toArray();

//     const earnings = result.sort(
//       (a, b) => new Date(a.earnDate) - new Date(b.earnDate)
//     );

//     const spending = spendResult.sort(
//       (a, b) => new Date(a.spendDate) - new Date(b.spendDate)
//     );

//     const doc = new PDFDocument({
//       margin: 50,
//       size: "A4",
//       bufferPages: true,
//     });

//     // ✅ SAFE FONT LOAD
//     const fontPath = path.join(
//       __dirname,
//       "../../../fonts/NotoSansBengali-VariableFont_wdth,wght.ttf"
//     );

//     if (!fs.existsSync(fontPath)) {
//       throw new Error("Bangla font not found!");
//     }

//     doc.registerFont("Bangla", fontPath);
//     doc.font("Bangla");

//     // ✅ SAFE DATE RANGE
//     const getDateRange = (data) => {
//       if (!data.length) return { min: "-", max: "-" };
//       const dates = data.map((e) => new Date(e.earnDate));
//       return {
//         min: new Date(Math.min(...dates)).toLocaleDateString(),
//         max: new Date(Math.max(...dates)).toLocaleDateString(),
//       };
//     };

//     const { min, max } = getDateRange(earnings);

//     // ✅ CATEGORY TOTALS FIXED
//     const categoryTotals = {};
//     for (const entry of earnings) {
//       if (!categoryTotals[entry.catagory]) {
//         categoryTotals[entry.catagory] = 0;
//       }
//       categoryTotals[entry.catagory] += entry.earnValue;
//     }

//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader("Content-Disposition", "attachment; filename=earnings.pdf");

//     doc.pipe(res);

//     const tableStartX = 50;
//     let y = 50;

//     const drawHeader = () => {
//       doc.fontSize(16).text("রূপসী বাংলা ক্লাব", { align: "center" });
//       doc.fontSize(12).text("কাদিরদী, বোয়ালমারী, ফরিদপুর", {
//         align: "center",
//       });
//       doc.text("স্থাপিতঃ ২০১৫ ইং", { align: "center" }).moveDown(2);
//     };

//     const drawTableHeader = () => {
//       doc.fontSize(20).text("ক্লাব এবং গ্রামের হিসাব", {
//         align: "center",
//       });
//       y += 30;

//       doc
//         .fontSize(10)
//         .text(`হিসাব বিবরণ সীমা: ${min} থেকে ${max}`, {
//           align: "center",
//         });

//       y += 40;
//     };

//     const drawTypeBasedEarningsPages = () => {
//       const types = {
//         cada: "মাসিক চাঁদা থেকে আয়ঃ",
//         dhak: "ঢাকের দক্ষিণা থেকে আয়ঃ",
//         extraPujaMoney: "অতিরিক্ত অর্থ থেকে আয়ঃ",
//         jomi: "জমি লিজ বাবদ আয়ঃ",
//         others: "অন্যান্য আয়ঃ",
//       };

//       for (const [type, title] of Object.entries(types)) {
//         const entries = earnings.filter((e) => e.type === type);
//         if (!entries.length) continue;

//         doc.addPage();
//         y = 50;

//         doc.fontSize(14).text(title, { align: "center" });
//         y += 30;

//         for (const e of entries) {
//           const rowHeight = 25;

//           if (y + rowHeight > doc.page.height - 50) {
//             doc.addPage();
//             y = 50;
//           }

//           doc
//             .fontSize(10)
//             .text(
//               `${e.earnDate} | ${e.senderName} | ${e.earnDetails} | ${e.earnValue}`,
//               tableStartX,
//               y
//             );

//           y += rowHeight;
//         }

//         const total = entries.reduce((sum, e) => sum + e.earnValue, 0);
//         y += 20;
//         doc.fontSize(12).text(`মোট আয়ঃ ${total} টাকা`, 50, y);
//       }
//     };

//     const drawSummary = () => {
//       doc.addPage();
//       y = 50;

//       const totalEarn = earnings.reduce((sum, e) => sum + e.earnValue, 0);
//       const totalSpend = spending.reduce((sum, s) => sum + s.spendValue, 0);

//       doc.fontSize(14).text("সারসংক্ষেপ", { align: "center" });
//       y += 30;

//       doc.fontSize(12).text(`মোট আয়ঃ ${totalEarn} টাকা`, 50, y);
//       y += 20;
//       doc.text(`মোট ব্যয়ঃ ${totalSpend} টাকা`, 50, y);
//     };

//     // ✅ FOOTER WITH PAGE NUMBER
//     const drawFooter = () => {
//       const range = doc.bufferedPageRange();

//       for (let i = range.start; i < range.start + range.count; i++) {
//         doc.switchToPage(i);

//         doc
//           .fontSize(8)
//           .text(`পৃষ্ঠা ${i + 1}`, 50, doc.page.height - 30, {
//             align: "center",
//           });
//       }
//     };

//     // DRAW
//     drawHeader();
//     drawTableHeader();
//     drawTypeBasedEarningsPages();
//     drawSummary();
//     drawFooter();

//     doc.end();
//   } catch (error) {
//     console.error("PDF Generation Error:", error);
//     res.status(500).send(error.message);
//   }
// };

// module.exports = {
//   getAllEarnPdfGenerator,
// };