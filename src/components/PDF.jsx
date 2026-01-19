import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function PDF() {
  const generatePdf = async () => {
    const blocks = document.querySelectorAll(".print-block");

    if (!blocks.length) {
      alert("Calculate CGPA before printing");
      return;
    }

    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 10;
    const usableHeight = pageHeight - margin * 2;

    let yOffset = margin;
    let pageCount = 1;
    const pages = [];

    for (const block of blocks) {
      const canvas = await html2canvas(block, {
        scale: 2,
        useCORS: true
      });

      const imgData = canvas.toDataURL("image/png");
      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * (pageWidth - 20)) / imgProps.width;

      // 🔁 If block doesn't fit → new page
      if (yOffset + imgHeight > usableHeight) {
        pages.push(pageCount);
        pdf.addPage();
        pageCount++;
        yOffset = margin;
      }

      pdf.addImage(
        imgData,
        "PNG",
        margin,
        yOffset,
        pageWidth - 20,
        imgHeight
      );

      yOffset += imgHeight + 6;
    }

    pages.push(pageCount);

    // 🖊️ PAGE BORDER + PAGE NUMBER
    const totalPages = pdf.getNumberOfPages();

    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);

      // Border
      pdf.rect(5, 5, pageWidth - 10, pageHeight - 10);

      // Page number
      pdf.setFontSize(10);
      pdf.text(
        `Page ${i} of ${totalPages}`,
        pageWidth / 2,
        pageHeight - 8,
        { align: "center" }
      );
    }

    pdf.save("CGPA_Report.pdf");
  };

  return <button onClick={generatePdf}>Download PDF</button>;
}
