import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function PDF() {
  const generatePdf = async () => {
    const element = document.getElementById('print-area');
    if (!element) {
      alert('Calculate CGPA before printing');
      return;
    }

    const canvas = await html2canvas(element, { scale: 2 });
    const img = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage(img, 'PNG', 10, 10, 190, 0);
    pdf.save('CGPA_Report.pdf');
  };

  return <button onClick={generatePdf}>Download PDF</button>;
}
