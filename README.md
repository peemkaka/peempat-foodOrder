# ระบบสั่งอาหารออนไลน์ (Food Order Platform)

โปรเจคนี้เป็นระบบสั่งอาหารออนไลน์ พัฒนาด้วย [Next.js](https://nextjs.org) รองรับการล็อกอิน, เลือกร้านอาหาร, เลือกเมนู, สั่งซื้อ, ชำระเงินผ่าน PayPal และรีวิวร้านอาหาร

---

## ฟีเจอร์หลัก

- **Authentication**  
  - ลงทะเบียน/เข้าสู่ระบบ/ออกจากระบบ ด้วย [Clerk](https://clerk.com)
- **ร้านอาหารและเมนู**
  - แสดงรายการร้านอาหาร (BusinessList)
  - แสดงหมวดหมู่อาหาร (CategoryList)
  - ดูรายละเอียดร้านอาหารและเมนู (MenuSection)
- **ตะกร้าสินค้า (Cart)**
  - เพิ่ม/ลบเมนูในตะกร้า
  - คำนวณยอดรวม อัตราภาษี และค่าจัดส่ง
- **ชำระเงิน (Checkout)**
  - กรอกข้อมูลผู้รับ
- **ออเดอร์ของฉัน (My Orders)**
  - ดูประวัติการสั่งซื้อ
- **รีวิวร้านอาหาร**
  - ให้คะแนนและเขียนรีวิวร้านอาหาร
- **แจ้งเตือน (Toast/Toaster)**
  - แจ้งเตือนสถานะต่าง ๆ เช่น เพิ่มสินค้า, ลบสินค้า, สั่งซื้อสำเร็จ ฯลฯ

---

## เทคโนโลยีและไลบรารีที่ใช้

- **Frontend:**  
  - [Next.js](https://nextjs.org) (App Router, Client Components)
  - [React](https://react.dev)
  - [Tailwind CSS](https://tailwindcss.com) (ปรับแต่ง UI)
  - [@clerk/nextjs](https://clerk.com/docs/nextjs) (Authentication)
  - [@paypal/react-paypal-js](https://github.com/paypal/react-paypal-js) (PayPal Integration)
  - [lucide-react](https://lucide.dev) (Icon)
  - [@smastrom/react-rating](https://www.npmjs.com/package/@smastrom/react-rating) (Rating)
  - [Radix UI](https://www.radix-ui.com/) (Popover, Tabs, Toast, Dropdown, Accordion)
- **State Management:**  
  - React Context (CartUpdateContext)
- **API:**  
  - GraphQL (เชื่อมต่อข้อมูลร้านอาหาร, เมนู, ตะกร้า, ออเดอร์ ฯลฯ)
- **อื่น ๆ:**  
  - [moment.js](https://momentjs.com) (จัดการวันที่ในออเดอร์)

---

## โครงสร้างโฟลเดอร์หลัก

- `app/` — หน้าเพจหลัก, layout, routing
- `components/` — UI Components เช่น Header, Cart, BusinessList, CategoryList, Restaurant, MyOrders ฯลฯ
- `components/ui/` — UI primitives (Button, Popover, Tabs, Toast, Dropdown ฯลฯ)
- `context/` — React Context (CartUpdateContext)
- `hooks/` — Custom hooks (use-toast)
- `utils/` — ฟังก์ชันสำหรับเรียก API (GlobalApi.js)
- `public/` — ไฟล์ static
- `styles/` — ไฟล์ CSS (globals.css, tailwind.config.js)

---

## วิธีเริ่มต้นใช้งาน

1. ติดตั้ง dependencies  
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

2. รันเซิร์ฟเวอร์พัฒนา  
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

3. เปิด [http://localhost:3000](http://localhost:3000) ด้วยเบราว์เซอร์ของคุณเพื่อดูผลลัพธ์

คุณสามารถเริ่มแก้ไขหน้าเพจได้โดยการปรับแต่งไฟล์ `app/page.js` ซึ่งหน้าเพจจะอัปเดตโดยอัตโนมัติเมื่อคุณแก้ไขไฟล์นี้

โปรเจคนี้ใช้ [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) เพื่อทำการปรับแต่งและโหลดอัตโนมัติ [Geist](https://vercel.com/font) ซึ่งเป็นฟอนต์แฟมิลี่ใหม่สำหรับ Vercel

---

## เรียนรู้เพิ่มเติม

หากต้องการเรียนรู้เพิ่มเติมเกี่ยวกับ Next.js คุณสามารถดูที่แหล่งข้อมูลต่อไปนี้:

- [Next.js Documentation](https://nextjs.org/docs) - เรียนรู้เกี่ยวกับฟีเจอร์และ API ของ Next.js
- [Learn Next.js](https://nextjs.org/learn) - ติวเตอร์ออนไลน์เชิงโต้ตอบเกี่ยวกับ Next.js

คุณสามารถตรวจสอบ [repository ของ Next.js บน GitHub](https://github.com/vercel/next.js) - ข้อเสนอแนะแบบฟีดแบ็กและการมีส่วนร่วมของคุณยินดีต้อนรับ!

---

## การปรับใช้บน Vercel

วิธีที่ง่ายที่สุดในการปรับใช้แอป Next.js ของคุณคือการใช้ [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) จากผู้สร้าง Next.js

ตรวจสอบ [เอกสารการปรับใช้ Next.js](https://nextjs.org/docs/app/building-your-application/deploying) สำหรับรายละเอียดเพิ่มเติม
