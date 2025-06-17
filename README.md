# FoodOrder ระบบสั่งอาหารออนไลน์

[ดู Demo ที่นี่ 🚀](https://peempat-foodorder.netlify.app/)

---

## 📦 ฟีเจอร์หลัก

- **Authentication**  
  - ลงทะเบียน/เข้าสู่ระบบ/ออกจากระบบ ด้วย Clerk
- **ร้านอาหารและเมนู**
  - แสดงรายการร้านอาหาร (BusinessList)
  - แสดงหมวดหมู่อาหาร (CategoryList)
  - ดูรายละเอียดร้านอาหารและเมนู (MenuSection)
- **ตะกร้าสินค้า (Cart)**
  - เพิ่ม/ลบเมนูในตะกร้า
  - คำนวณยอดรวม อัตราภาษี และค่าจัดส่ง
- **ชำระเงิน (Checkout)**
  - กรอกข้อมูลผู้รับ
  - ชำระเงินผ่าน PayPal
- **ออเดอร์ของฉัน (My Orders)**
  - ดูประวัติการสั่งซื้อ
- **รีวิวร้านอาหาร**
  - ให้คะแนนและเขียนรีวิวร้านอาหาร
- **แจ้งเตือน (Toast/Toaster)**
  - แจ้งเตือนสถานะต่าง ๆ เช่น เพิ่มสินค้า, ลบสินค้า, สั่งซื้อสำเร็จ ฯลฯ

---

## 🛠️ เทคโนโลยีที่ใช้

- **Frontend:**  
  - Next.js (App Router, Client Components)
  - React
  - Tailwind CSS
  - Clerk (Authentication)
  - Lucide React (Icon)
  - @smastrom/react-rating (Rating)
  - Radix UI (Popover, Tabs, Toast, Dropdown, Accordion)
- **State Management:**  
  - React Context (CartUpdateContext)
- **API:**  
  - GraphQL (เชื่อมต่อ Hygraph สำหรับข้อมูลร้านอาหาร, เมนู, ตะกร้า, ออเดอร์ ฯลฯ)
- **อื่น ๆ:**  
  - moment.js (จัดการวันที่ในออเดอร์)

---

## 📁 โครงสร้างไฟล์หลัก

```
peempat-foodOrder/
├── app/                # หน้าเพจหลัก, layout, routing
│   ├── api/            # Next.js API routes (เชื่อมต่อ backend)
│   └── ...             # หน้าเพจต่าง ๆ (เช่น /checkout, /restaurant/[name])
├── components/         # UI Components เช่น Header, Cart, BusinessList, CategoryList, Restaurant, MyOrders ฯลฯ
│   └── ui/             # UI primitives (Button, Popover, Tabs, Toast, Dropdown ฯลฯ)
├── context/            # React Context (CartUpdateContext)
├── hooks/              # Custom hooks (use-toast)
├── utils/              # ฟังก์ชันสำหรับเรียก API (GlobalApi.js)
├── public/             # ไฟล์ static
├── styles/             # ไฟล์ CSS (globals.css, tailwind.config.js)
└── README.md           # ไฟล์นี้
```

---

## 🚀 วิธีเริ่มต้นใช้งาน

1. ติดตั้ง dependencies  
   ```bash
   npm install
   # หรือ
   yarn install
   ```

2. รันเซิร์ฟเวอร์พัฒนา  
   ```bash
   npm run dev
   # หรือ
   yarn dev
   ```

3. เปิด [http://localhost:3000](http://localhost:3000) ด้วยเบราว์เซอร์ของคุณ

---

## 🔗 ลิงก์ Demo

[https://peempat-foodorder.netlify.app/](https://peempat-foodorder.netlify.app/)

---

## 📚 เรียนรู้เพิ่มเติม

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Clerk Documentation](https://clerk.com/docs)
- [PayPal React SDK Documentation](https://github.com/paypal/react-paypal-js)
- [Lucide React Documentation](https://lucide.dev)
- [React Rating Documentation](https://www.npmjs.com/package/@smastrom/react-rating)
- [Radix UI Documentation](https://www.radix-ui.com/docs)
- [Moment.js Documentation](https://momentjs.com/docs/)
