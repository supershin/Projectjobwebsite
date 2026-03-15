# JobCrew - Payment & Subscription Plans Data Model

## 💳 ระบบชำระเงินและแพ็กเกจสมาชิก

JobCrew ใช้ระบบคิดค่าบริการสำหรับนายจ้าง (Employer) ในการโพสต์งานและใช้ฟีเจอร์ต่างๆ

---

## 📦 Subscription Plans (แพ็กเกจสมาชิกสำหรับนายจ้าง)

### **แพ็กเกจทั้งหมด 4 แบบ**

| Plan | Price/Month | Price/Year | Job Posts | Featured Jobs | Priority Support | Analytics |
|------|-------------|------------|-----------|---------------|------------------|-----------|
| **Free** | ฟรี | ฟรี | 1 งาน/เดือน | ❌ | ❌ | Basic |
| **Basic** | 999 บาท | 9,990 บาท | 5 งาน/เดือน | 1 งาน | ❌ | Standard |
| **Premium** | 2,499 บาท | 24,990 บาท | 20 งาน/เดือน | 5 งาน | ✅ | Advanced |
| **Enterprise** | 4,999 บาท | 49,990 บาท | Unlimited | Unlimited | ✅ VIP | Full |

---

## 📋 Subscription Plan Data Model

### **Plan Object Structure**

```json
{
  "planId": "premium",
  "planName": "Premium Plan",
  "planNameTH": "แพ็กเกจพรีเมียม",
  "price": {
    "monthly": 2499,
    "yearly": 24990,
    "currency": "THB"
  },
  "discount": {
    "yearly": 10,
    "description": "ประหยัด 10% เมื่อชำระรายปี"
  },
  "features": {
    "jobPosts": 20,
    "featuredJobs": 5,
    "urgentTags": 10,
    "prioritySupport": true,
    "analytics": "advanced",
    "applicantTracking": true,
    "bulkPosting": true,
    "apiAccess": false,
    "customBranding": false
  },
  "limits": {
    "jobPostsPerMonth": 20,
    "featuredJobsPerMonth": 5,
    "applicantMessages": 1000,
    "cvDownloads": 500
  },
  "addOns": [
    {
      "name": "Extra Job Post",
      "price": 299,
      "description": "โพสต์งานเพิ่ม 1 ตำแหน่ง"
    },
    {
      "name": "Featured Boost",
      "price": 499,
      "description": "ปักหมุดงานไว้ด้านบน 7 วัน"
    }
  ]
}
```

---

## 💰 Payment Data Model

### **Payment Transaction Fields**

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| **paymentId** | String | ✅ | รหัสการชำระเงิน | `"pay_20260315_001"` |
| **invoiceId** | String | ✅ | เลขที่ใบแจ้งหนี้ | `"INV-2026-001"` |
| **employerId** | String | ✅ | รหัสนายจ้าง | `"emp001"` |
| **planId** | String | ✅ | รหัสแพ็กเกจ | `"premium"` |
| **planType** | String | ✅ | ประเภท | `"monthly"`, `"yearly"` |
| **amount** | Number | ✅ | จำนวนเงิน | `24990` |
| **currency** | String | ✅ | สกุลเงิน | `"THB"` |
| **vat** | Number | ✅ | ภาษี VAT 7% | `1749.30` |
| **totalAmount** | Number | ✅ | ยอดรวมสุทธิ | `26739.30` |
| **paymentMethod** | String | ✅ | วิธีชำระเงิน | `"credit_card"`, `"bank_transfer"`, `"promptpay"` |
| **paymentGateway** | String | ❌ | Payment Gateway | `"omise"`, `"2c2p"`, `"stripe"` |
| **transactionId** | String | ❌ | Transaction ID จาก Gateway | `"chrg_test_5xyz..."` |
| **status** | String | ✅ | สถานะ | `"pending"`, `"paid"`, `"failed"`, `"refunded"` |
| **paymentDate** | String (ISO DateTime) | ✅ | วันที่ชำระเงิน | `"2026-03-15T10:30:00Z"` |
| **confirmedDate** | String (ISO DateTime) | ❌ | วันที่ยืนยันการชำระ | `"2026-03-15T10:35:00Z"` |
| **subscriptionStart** | String (ISO Date) | ✅ | วันเริ่มแพ็กเกจ | `"2026-03-15"` |
| **subscriptionEnd** | String (ISO Date) | ✅ | วันหมดอายุแพ็กเกจ | `"2027-03-14"` |
| **autoRenew** | Boolean | ✅ | ต่ออายุอัตโนมัติ | `true`, `false` |
| **receiptUrl** | String (URL) | ❌ | URL ใบเสร็จ | `"/receipts/INV-2026-001.pdf"` |
| **notes** | String | ❌ | หมายเหตุ | `"ชำระผ่าน PromptPay"` |

### **📖 Example Payment Object**

```json
{
  "paymentId": "pay_20260315_001",
  "invoiceId": "INV-2026-001",
  "employerId": "emp001",
  "planId": "premium",
  "planName": "Premium Plan - Yearly",
  "planType": "yearly",
  "amount": 24990,
  "currency": "THB",
  "vat": 1749.30,
  "discount": 2499,
  "totalAmount": 24240.30,
  "paymentMethod": "credit_card",
  "paymentGateway": "omise",
  "transactionId": "chrg_test_5xyz123abc",
  "cardDetails": {
    "brand": "visa",
    "lastDigits": "4242",
    "expiryMonth": "12",
    "expiryYear": "2027"
  },
  "status": "paid",
  "paymentDate": "2026-03-15T10:30:00Z",
  "confirmedDate": "2026-03-15T10:35:00Z",
  "subscriptionStart": "2026-03-15",
  "subscriptionEnd": "2027-03-14",
  "autoRenew": true,
  "receiptUrl": "/receipts/INV-2026-001.pdf",
  "billingAddress": {
    "companyName": "Grand Hyatt Erawan Bangkok",
    "taxId": "0123456789012",
    "address": "494 Rajdamri Road, Pathumwan",
    "city": "Bangkok",
    "postalCode": "10330",
    "country": "Thailand"
  },
  "notes": "Annual subscription - 10% discount applied"
}
```

---

## 💳 Payment Methods

### **Supported Payment Methods**

| Method | methodId | Provider | Processing Time | Fees |
|--------|----------|----------|-----------------|------|
| บัตรเครดิต/เดบิต | `credit_card` | Omise, 2C2P | ทันที | 2.95% + 10฿ |
| โอนเงินผ่านธนาคาร | `bank_transfer` | Manual | 1-3 วันทำการ | ฟรี |
| PromptPay QR | `promptpay` | ThaiQR | ทันที | 0.5% |
| TrueMoney Wallet | `truemoney` | TrueMoney | ทันที | 1% |
| Rabbit LINE Pay | `linepay` | LINE Pay | ทันที | 1.5% |

### **Payment Method Data Model**

```json
{
  "methodId": "credit_card",
  "methodName": "บัตรเครดิต/เดบิต",
  "methodNameEN": "Credit/Debit Card",
  "provider": "omise",
  "icon": "/images/payment/credit-card.svg",
  "enabled": true,
  "processingTime": "instant",
  "fees": {
    "percentage": 2.95,
    "fixed": 10,
    "currency": "THB"
  },
  "supportedCards": ["visa", "mastercard", "jcb", "amex"],
  "minAmount": 100,
  "maxAmount": 200000,
  "description": "รองรับบัตรเครดิต/เดบิตทุกประเภท"
}
```

---

## 📊 Credit System (ระบบเครดิต)

### **Credit Pricing**

| Item | Credits Required | THB Price |
|------|------------------|-----------|
| โพสต์งาน 1 ตำแหน่ง | 10 credits | 299฿ |
| Featured Job (30 วัน) | 5 credits | 149฿ |
| Urgent Tag (7 วัน) | 3 credits | 89฿ |
| Boost Post (Top 3 for 7 days) | 8 credits | 239฿ |
| Download 1 Resume | 1 credit | 29฿ |
| Message 1 Applicant | 0.5 credits | 15฿ |

### **Credit Purchase Packages**

```json
[
  {
    "packageId": "credit_50",
    "credits": 50,
    "price": 1490,
    "bonus": 0,
    "discount": 0,
    "pricePerCredit": 29.80
  },
  {
    "packageId": "credit_100",
    "credits": 100,
    "price": 2490,
    "bonus": 10,
    "discount": 16,
    "pricePerCredit": 22.64,
    "popular": true
  },
  {
    "packageId": "credit_250",
    "credits": 250,
    "price": 4990,
    "bonus": 50,
    "discount": 33,
    "pricePerCredit": 16.63
  },
  {
    "packageId": "credit_500",
    "credits": 500,
    "price": 7990,
    "bonus": 150,
    "discount": 45,
    "pricePerCredit": 12.29,
    "bestValue": true
  }
]
```

---

## 🧾 Invoice Data Model

### **Invoice Fields**

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| **invoiceId** | String | ✅ | เลขที่ใบแจ้งหนี้ | `"INV-2026-001"` |
| **employerId** | String | ✅ | รหัสนายจ้าง | `"emp001"` |
| **companyName** | String | ✅ | ชื่อบริษัท | `"Grand Hyatt..."` |
| **taxId** | String | ✅ | เลขประจำตัวผู้เสียภาษี | `"0123456789012"` |
| **address** | Object | ✅ | ที่อยู่ในใบกำกับภาษี | `{...}` |
| **items** | Array[Object] | ✅ | รายการสินค้า/บริการ | `[{...}]` |
| **subtotal** | Number | ✅ | ยอดรวมก่อน VAT | `24990` |
| **vat** | Number | ✅ | ภาษี VAT 7% | `1749.30` |
| **discount** | Number | ❌ | ส่วนลด | `2499` |
| **total** | Number | ✅ | ยอดรวมสุทธิ | `24240.30` |
| **issueDate** | String (ISO Date) | ✅ | วันที่ออกใบแจ้งหนี้ | `"2026-03-15"` |
| **dueDate** | String (ISO Date) | ✅ | วันครบกำหนดชำระ | `"2026-03-22"` |
| **status** | String | ✅ | สถานะ | `"draft"`, `"sent"`, `"paid"`, `"overdue"`, `"void"` |
| **pdfUrl** | String (URL) | ❌ | URL ไฟล์ PDF | `"/invoices/INV-2026-001.pdf"` |

### **📖 Example Invoice Object**

```json
{
  "invoiceId": "INV-2026-001",
  "invoiceNumber": "JC-2026-03-001",
  "employerId": "emp001",
  "companyName": "Grand Hyatt Erawan Bangkok",
  "taxId": "0123456789012",
  "address": {
    "line1": "494 Rajdamri Road",
    "line2": "Pathumwan",
    "city": "Bangkok",
    "postalCode": "10330",
    "country": "Thailand"
  },
  "contactEmail": "hr@grandhyatt.com",
  "contactPhone": "02-254-1234",
  "items": [
    {
      "itemId": "1",
      "description": "Premium Plan - Annual Subscription",
      "quantity": 1,
      "unitPrice": 24990,
      "amount": 24990
    },
    {
      "itemId": "2",
      "description": "Early Bird Discount (10%)",
      "quantity": 1,
      "unitPrice": -2499,
      "amount": -2499
    }
  ],
  "subtotal": 22491,
  "vat": 1574.37,
  "vatRate": 7,
  "discount": 0,
  "total": 24065.37,
  "currency": "THB",
  "issueDate": "2026-03-15",
  "dueDate": "2026-03-22",
  "paymentDate": "2026-03-15",
  "status": "paid",
  "paymentMethod": "credit_card",
  "pdfUrl": "/invoices/INV-2026-001.pdf",
  "notes": "ขอบคุณที่ใช้บริการ JobCrew",
  "terms": "กรุณาชำระภายใน 7 วันหลังจากได้รับใบแจ้งหนี้"
}
```

---

## 📈 Billing Cycle & Auto-Renewal

### **Billing Cycle**

```json
{
  "employerId": "emp001",
  "currentPlan": "premium",
  "billingCycle": "yearly",
  "subscriptionStart": "2026-03-15",
  "subscriptionEnd": "2027-03-14",
  "nextBillingDate": "2027-03-14",
  "autoRenew": true,
  "renewalReminder": {
    "enabled": true,
    "daysBeforeExpiry": [30, 14, 7, 1]
  },
  "paymentMethod": {
    "type": "credit_card",
    "lastDigits": "4242",
    "expiryDate": "12/2027"
  },
  "billingHistory": [
    {
      "invoiceId": "INV-2026-001",
      "date": "2026-03-15",
      "amount": 24065.37,
      "status": "paid"
    },
    {
      "invoiceId": "INV-2025-045",
      "date": "2025-03-15",
      "amount": 24065.37,
      "status": "paid"
    }
  ]
}
```

---

## 🎁 Promotions & Discounts

### **Promotion Code Data Model**

```json
{
  "promoId": "NEWHOTEL2026",
  "code": "NEWHOTEL2026",
  "description": "ส่วนลดพิเศษสำหรับนายจ้างใหม่",
  "discountType": "percentage",
  "discountValue": 20,
  "minPurchase": 1000,
  "maxDiscount": 5000,
  "validFrom": "2026-03-01",
  "validUntil": "2026-06-30",
  "usageLimit": 100,
  "usageCount": 23,
  "applicablePlans": ["basic", "premium", "enterprise"],
  "status": "active",
  "terms": [
    "ใช้ได้เฉพาะนายจ้างใหม่",
    "ใช้ได้ครั้งเดียวต่อบัญชี",
    "ไม่สามารถใช้ร่วมกับโปรโมชั่นอื่นได้"
  ]
}
```

### **Discount Types**

| Type | Description | Example |
|------|-------------|---------|
| `percentage` | ส่วนลดเป็นเปอร์เซ็นต์ | 20% off |
| `fixed` | ส่วนลดเป็นจำนวนเงิน | ลด 500฿ |
| `trial` | ทดลองใช้ฟรี | Free 7 days |
| `bonus_credits` | เครดิตโบนัส | +50 credits |

---

## 📊 Payment Status Values

| Status | Description | Action Required |
|--------|-------------|-----------------|
| `pending` | รอการชำระเงิน | รอ payment gateway confirm |
| `processing` | กำลังดำเนินการ | ระบบกำลังตรวจสอบ |
| `paid` | ชำระเงินแล้ว | ✅ Complete |
| `failed` | ชำระเงินไม่สำเร็จ | ลองใหม่อีกครั้ง |
| `refunded` | คืนเงินแล้ว | ยกเลิกการชำระเงิน |
| `expired` | หมดอายุ | สร้าง invoice ใหม่ |
| `void` | ยกเลิก | ยกเลิกโดย admin |

---

## 🔄 Backend Integration

### **Payment API Endpoints (.NET 8 MVC)**

```
POST   /api/payments/create              - สร้างการชำระเงิน
POST   /api/payments/confirm             - ยืนยันการชำระเงิน
GET    /api/payments/{id}                - ดูรายละเอียดการชำระเงิน
GET    /api/payments/employer/{id}       - ดูประวัติการชำระของนายจ้าง
POST   /api/payments/refund/{id}         - คืนเงิน
GET    /api/payments/invoice/{id}        - ดาวน์โหลดใบแจ้งหนี้

POST   /api/subscriptions/subscribe      - สมัครแพ็กเกจ
PUT    /api/subscriptions/change         - เปลี่ยนแพ็กเกจ
POST   /api/subscriptions/cancel         - ยกเลิกแพ็กเกจ
PUT    /api/subscriptions/renew          - ต่ออายุแพ็กเกจ

POST   /api/credits/purchase             - ซื้อเครดิต
POST   /api/credits/use                  - ใช้เครดิต
GET    /api/credits/balance/{employerId} - ดูยอดเครดิตคงเหลือ

POST   /api/promo/validate               - ตรวจสอบโค้ดส่วนลด
POST   /api/promo/apply                  - ใช้โค้ดส่วนลด
```

---

## 💡 Business Rules

### **Free Plan Limitations**
- ✅ โพสต์งานได้ 1 ตำแหน่ง/เดือน
- ❌ ไม่สามารถใช้ Featured Job
- ❌ ไม่สามารถใช้ Urgent Tag
- ✅ ดู Analytics แบบ Basic
- ✅ Download Resume ได้ 10 ครั้ง/เดือน

### **Subscription Expiry**
- เมื่อแพ็กเกจหมดอายุ:
  1. งานที่เปิดรับสมัครอยู่จะยังคงแสดงต่อจนกว่าจะปิดงาน
  2. ไม่สามารถโพสต์งานใหม่ได้
  3. ไม่สามารถแก้ไขงานที่มีอยู่ได้
  4. ยังสามารถดูและตอบกลับผู้สมัครได้

### **Refund Policy**
- ✅ คืนเงินได้ภายใน 7 วันหากยังไม่ได้ใช้งาน
- ❌ ไม่คืนเงินหากใช้งานไปแล้ว
- ✅ คืนเงินตามสัดส่วนเมื่อยกเลิกแพ็กเกจรายปี (ภายใน 30 วัน)

---

## 📝 Notes

1. **VAT**: ราคาทั้งหมดยังไม่รวม VAT 7%
2. **Currency**: ใช้สกุลเงินบาท (THB) เป็นหลัก
3. **Payment Gateway**: แนะนำ Omise หรือ 2C2P สำหรับตลาดไทย
4. **Tax Invoice**: ออกใบกำกับภาษีอัตโนมัติเมื่อชำระเงินสำเร็จ
5. **Auto-Renewal**: แจ้งเตือนนายจ้างก่อนวันต่ออายุอัตโนมัติ 7 วัน

---

**Version**: 1.0.0  
**Last Updated**: March 15, 2026  
**Compatible with**: User Models v1.0.0, Job Data Model v1.0.0
