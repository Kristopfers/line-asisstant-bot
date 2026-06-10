// ไฟล์สำหรับเก็บโครงสร้าง Flex Message ของเมนูหลัก
function getMainMenuFlex() {
  return {
    type: 'flex',
    altText: 'กรุณาเลือกบริการที่ต้องการ',
    contents: {
      type: 'bubble',
      header: {
        type: 'box', layout: 'vertical', backgroundColor: '#06c755', // สีเขียว LINE
        contents: [{ type: 'text', text: '🤖 เมนูหลัก ระบบรับแจ้งเหตุ', weight: 'bold', color: '#ffffff', size: 'md' }]
      },
      body: {
        type: 'box', layout: 'vertical', spacing: 'md',
        contents: [
          { type: 'text', text: 'ยินดีต้อนรับครับ โปรดเลือกบริการที่ต้องการทำรายการ:', color: '#222222', size: 'sm' },
          {
            type: 'button', style: 'primary', color: '#1257ff', height: 'sm',
            action: {
              type: 'message',
              label: '⚡ แจ้งซ่อมเสาไฟฟ้า',
              text: 'แจ้งซ่อมเสาไฟฟ้า'
            }
          },
          {
            type: 'button', style: 'secondary', height: 'sm', disabled: true, // ล็อคปุ่มไว้รออนาคต
            action: { type: 'message', label: '🗑️ แจ้งขยะมูลฝอย (Soon)', text: 'แจ้งขยะ' }
          }
        ]
      }
    }
  };
}

module.exports = { getMainMenuFlex };