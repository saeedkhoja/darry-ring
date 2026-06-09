# 💍 Yagona — Umrda bir marta, yagonangizga

Darry Ring konsepsiyasining **O'zbekiston bozori** uchun moslashtirilgan versiyasi.
Har bir foydalanuvchi umri davomida **faqat bitta** uzuk sotib oladi. Ro'yxatdan
o'tish **faqat OneID** orqali. Har bir xaridga noyob **platformId** va raqamli
**sevgi passporti** beriladi.

## Texnologiyalar
- **React 18** + **Vite**
- **React Router** (SPA)
- **Tailwind CSS v4** — mobile / desktop / tablet to'liq responsive
- Generatsiya qilingan SVG **logo** va olmos illyustratsiyalari

## Ishga tushirish
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # ishlab chiqarish uchun (dist/)
```

## Sahifalar
| Yo'l | Tavsif |
|------|--------|
| `/` | Asosiy landing — brend, falsafa, jarayon |
| `/concept` | "Umrda bir marta" falsafasi |
| `/login` | **OneID** orqali kirish (yagona ro'yxatdan o'tish usuli) |
| `/purchase` | Uzuk tanlash + xarid (umrda 1 marta cheklovi) |
| `/passport` | **platformId** orqali sevgi passportini tekshirish |
| `/profile` | Foydalanuvchi ma'lumotlari + o'z passporti |

## 🔌 Backend ulash (siz qiladigan qism)

Hozir ilova **MOCK rejim**da (localStorage) ishlaydi. Real backend ulash uchun:

1. `.env` faylida API manzilini bering:
   ```
   VITE_API_URL=https://api.yagona.uz
   ```
   `VITE_API_URL` berilishi bilan ilova avtomatik real backendga o'tadi.

2. Backend quyidagi endpointlarni taqdim etishi kerak (`src/api/client.js` ga qarang):

   **OneID autentifikatsiya**
   - `GET  /auth/oneid/start` — foydalanuvchini OneID (`sso.egov.uz`) sahifasiga yo'naltiradi
   - `POST /auth/oneid/callback` `{ code, state }` → `{ token, pinfl, fullName, birthDate, region }`
   - `GET  /me` (Bearer token) → foydalanuvchi profili

   **Xarid (umrda bir marta)**
   - `GET  /orders/eligibility` (Bearer) → `{ eligible: bool, reason }`
   - `POST /orders` (Bearer) `{ ringModel, partnerName, message }` → `{ platformId, ... }`
     - ⚠️ Backend takroriy xaridni (bir PINFL uchun) **rad etishi** shart.

   **Passport (ommaviy tekshiruv)**
   - `GET  /passport/:platformId` → `{ platformId, buyer, partnerName, ringModel, pinfl, message, issuedAt }`

### OneID OAuth oqimi (qisqacha)
1. Foydalanuvchi "OneID bilan kirish" tugmasini bosadi → backend `/auth/oneid/start`
2. Backend `sso.egov.uz/sso/oauth/Authorization.do` ga `client_id`, `redirect_uri`, `state` bilan redirect qiladi
3. OneID `code` bilan `redirect_uri` ga qaytaradi
4. Backend `code` → `access_token` → foydalanuvchi ma'lumotlari (PINFL, F.I.Sh)
5. Backend o'z JWT tokenini frontendga qaytaradi

> **Umrda bir marta** mantig'i backendda PINFL bo'yicha kafolatlanishi kerak —
> frontend faqat `eligibility` natijasiga tayanadi.

## Brend
- **Nom:** Yagona (yagona, takrorlanmas)
- **Shior:** *Umrda bir marta, yagonangizga*
- **Rang palitrasi:** rose-gold (`#c9a36a`), deep rose (`#b8533a`), ink (`#2a2226`), cream
- **Shriftlar:** Cormorant Garamond (sarlavhalar), Manrope (matn)
