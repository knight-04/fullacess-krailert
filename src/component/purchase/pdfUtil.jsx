import html2pdf from 'html2pdf.js';

export const exportToPDF = async (content, poNumber) => {
    if (!content) return;

    const opt = {
        margin: 0,
        filename: `PO-${poNumber}.pdf`,
        image: { 
            type: 'jpeg', 
            quality: 0.98 
        },
        html2canvas: {
            scale: 2,
            useCORS: true,
            letterRendering: true
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait'
        }
    };

    try {
        await html2pdf().set(opt).from(content).save();
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw new Error('เกิดข้อผิดพลาดในการสร้าง PDF กรุณาลองใหม่อีกครั้ง');
    }
};