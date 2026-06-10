// ไฟล์สำหรับเก็บโครงสร้าง Flex Message ของระบบเสาไฟฟ้า
function getReasonFlexMenu(pole) {
  const poleId = pole.pole_id || "-";
  const serial = pole.serial_number || "-";
  const lat = pole.latitude || "";
  const lng = pole.longitude || "";
  const locationStr = (lat && lng) ? `${lat}, ${lng}` : "ไม่มีข้อมูลพิกัดในระบบ";

  return {
    type: 'flex',
    altText: 'กรุณาเลือกสาเหตุความเสียหาย',
    contents: {
      type: 'bubble',
      header: {
        type: 'box', layout: 'vertical', backgroundColor: '#1257ff', // สีน้ำเงินเสาไฟ
        contents: [{ type: 'text', text: `📍 พบข้อมูลเสาไฟ: ${poleId}`, weight: 'bold', color: '#ffffff', size: 'md' }]
      },
      body: {
        type: 'box', layout: 'vertical', spacing: 'sm',
        contents: [
          { type: 'text', text: `🔢 Serial: ${serial}`, size: 'xs', color: '#333333', weight: 'bold' },
          { type: 'text', text: `🌐 พิกัด: ${locationStr}`, size: 'xs', color: '#666666' },
          { type: 'separator', margin: 'md' },
          { type: 'text', text: 'โปรดเลือกสาเหตุที่พบด้านล่างเพื่อแจ้งซ่อม:', color: '#222222', size: 'sm', margin: 'md' },
          { type: 'button', style: 'secondary', height: 'sm', action: { type: 'postback', label: '💡 โคมไฟกิ่งดับ/ชำรุด', data: `สาเหตุ: โคมไฟกิ่งดับ\nรหัสเสาไฟ: ${poleId}\nSerial: ${serial}` } },
          { type: 'button', style: 'secondary', height: 'sm', action: { type: 'postback', label: '⚠️ เสาไฟเอียง/ชำรุด', data: `สาเหตุ: เสาไฟเอียง/ชำรุด\nรหัสเสาไฟ: ${poleId}\nSerial: ${serial}` } },
          { type: 'button', style: 'secondary', height: 'sm', action: { type: 'postback', label: '🔌 สายไฟขาด/ห้อยต่ำ', data: `สาเหตุ: สายไฟขาด/ห้อยต่ำ\nรหัสเสาไฟ: ${poleId}\nSerial: ${serial}` } }
        ]
      }
    }
  };
}

module.exports = { getReasonFlexMenu };