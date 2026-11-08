import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export async function exportPdf(elementId, filename) {
  const el = document.getElementById(elementId);
  const canvas = await html2canvas(el, { scale: 2, backgroundColor: "#ffffff" });
  const pdf = new jsPDF({ unit: "pt", format: "a4" });
  const w = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const h = (canvas.height * w) / canvas.width;
  const img = canvas.toDataURL("image/jpeg", 0.95);

  let left = h;
  let y = 0;
  pdf.addImage(img, "JPEG", 0, y, w, h);
  left -= pageH;
  while (left > 0) {
    y -= pageH;
    pdf.addPage();
    pdf.addImage(img, "JPEG", 0, y, w, h);
    left -= pageH;
  }
  pdf.save(filename);
}
