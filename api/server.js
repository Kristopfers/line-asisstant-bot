const express = require('express');
const { messagingApi } = require('@line/bot-sdk'); 

// 🎯 เรียกดึงหน้าตาปุ่มกด (Templates) แยกตามเรื่องมาจากโฟลเดอร์ที่เราเพิ่งสร้าง
const { getMainMenuFlex } = require('./templates/mainTemplate');
const { getReasonFlexMenu } = require('./templates/poleTemplate');

const config = {
  channelAccessToken: 'b1EmCl8jjRXe48svki8dv75yio7pwwwtMxuSF6KR9raLzc6mMXEmoJDek9LPha0DRRS8MNvO1TulrLwlGbP1tJlza7TmQhfz9ydE0ad6Dp61OC1f6mjVN2F3IcnrI6x1Wj2gR0/S2QMbU844hkNw5QdB04t89/1O/w1cDnyilFU=', 
  channelSecret: '4867e2664adac744ef099365746de945'             
};

const client = new messagingApi.MessagingApiClient(config); 
const app = express();

const API_BASE = "https://pole-liff-api.onrender.com";

app.post('/webhook', express.json(), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then(() => res.json({ status: 'ok' }))
    .catch((err) => {
      console.error('Error in Webhook:', err);
      res.status(500).end();
    });
});

async function handleEvent(event) {
  // 1. จัดการฝั่งข้อความตัวหนังสือ
  if (event.type === 'message' && event.message.type === 'text') {
    const text = event.message.text.trim().toUpperCase();

    // ดักจับรหัสเสาไฟ
    const poleRegex = /[A-Z]\d{3}/; 
    const match = text.match(poleRegex);

    if (match) {
      // ➡️ เคสพิมพ์รหัสเสาไฟ: เรียกใช้ข้อมูลฐานข้อมูลร่วมกับ poleTemplate
      const extractedPoleId = match[0];
      try {
        const response = await fetch(`${API_BASE}/api/poles/${encodeURIComponent(extractedPoleId)}`);
        if (response.ok) {
          const poleData = await response.json();
          const flexMenu = getReasonFlexMenu(poleData); // เรียกหน้าตาปุ่มจากไฟล์ย่อย
          return client.replyMessage({ replyToken: event.replyToken, messages: [flexMenu] });
        } else {
          return client.replyMessage({
            replyToken: event.replyToken,
            messages: [{ type: 'text', text: `❌ ไม่พบข้อมูลรหัสเสาไฟ "${extractedPoleId}" ในระบบฐานข้อมูลหลักครับ` }]
          });
        }
      } catch (error) {
        console.error("DB error:", error);
        return client.replyMessage({
          replyToken: event.replyToken,
          messages: [{ type: 'text', text: `⚠️ ระบบฐานข้อมูลขัดข้อง กรุณาลองใหม่` }]
        });
      }
    } else if (text === "แจ้งซ่อมเสาไฟฟ้า") {
      // ➡️ เคสผู้ใช้กดจากเมนูหลักเข้ามา
      return client.replyMessage({
        replyToken: event.replyToken,
        messages: [{
          type: 'text',
          text: `⚡ ท่านได้เลือกบริการ: แจ้งซ่อมเสาไฟฟ้า\n\n💡 กรุณาพิมพ์ "รหัสเสาไฟฟ้า" (เช่น P001) ส่งเข้ามาเพื่อตรวจสอบพิกัดความถูกต้องครับ`
        }]
      });
    } else {
      // ➡️ เคสทักคำอื่นทั่วไป: ดึงหน้าตาเมนูหลักมาจาก mainTemplate
      const mainMenuFlex = getMainMenuFlex();
      return client.replyMessage({ replyToken: event.replyToken, messages: [mainMenuFlex] });
    }
  }

  // 2. จัดการฝั่งการกดปุ่มบันทึกเรื่อง
  if (event.type === 'postback') {
    const data = event.postback.data;
    return client.replyMessage({
      replyToken: event.replyToken,
      messages: [{ type: 'text', text: `🎯 ระบบได้รับข้อมูลปัญหาเรียบร้อยแล้ว!\n\n${data}\n\nขอบคุณครับ 🤝` }]
    });
  }
}

module.exports = app;