// =============================================================
//  Yagona — API client
//  Backendni shu faylga ulaysiz. Hozircha localStorage asosida
//  ishlovchi MOCK rejim bor — VITE_API_URL berilsa real backendga
//  o'tadi. OneID OAuth oqimi ham shu yerda tasvirlangan.
// =============================================================

const API_URL = import.meta.env.VITE_API_URL || "";
const USE_MOCK = !API_URL;

// ---- past-level fetch helper ----
async function request(path, { method = "GET", body, token } = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `So'rov xatosi (${res.status})`);
  }
  return res.json();
}

// =============================================================
//  ONE-ID (https://id.egov.uz) OAuth 2.0 oqimi
// =============================================================
//
//  1. Foydalanuvchi "OneID bilan kirish" tugmasini bosadi.
//  2. Sizning BACKEND'ingiz quyidagi URL'ga yo'naltiradi:
//       https://sso.egov.uz/sso/oauth/Authorization.do
//         ?response_type=one_code
//         &client_id=<SIZNING_CLIENT_ID>
//         &redirect_uri=<https://yagona.uz/auth/callback>
//         &scope=<...>&state=<csrf>
//  3. OneID foydalanuvchini autentifikatsiya qilib, redirect_uri'ga
//     `code` bilan qaytaradi.
//  4. Backend `code`'ni access_token'ga, so'ng foydalanuvchi
//     ma'lumotlariga (PINFL, F.I.Sh, tug'ilgan sana) almashtiradi.
//  5. Backend o'z JWT tokenini frontendga qaytaradi.
//
//  Frontend faqat (a) login boshlash va (b) callback'ni qabul qilish
//  bilan shug'ullanadi.

export const auth = {
  // Foydalanuvchini OneID sahifasiga yuborish manzili.
  // Real holatda backend bu URL'ni qaytaradi yoki to'g'ridan-to'g'ri
  // shu yerga yo'naltirasiz.
  oneIdLoginUrl() {
    if (USE_MOCK) return null; // mock rejim — modal orqali
    return `${API_URL}/auth/oneid/start`;
  },

  // OneID callback'dan kelgan code'ni sessiyaga almashtirish.
  async exchangeCode(code, state) {
    if (USE_MOCK) return mock.fakeOneIdUser();
    return request("/auth/oneid/callback", {
      method: "POST",
      body: { code, state },
    });
  },

  // MOCK: OneID oynasini taqlid qilib darhol foydalanuvchi qaytaradi.
  async mockOneIdLogin(form) {
    return mock.fakeOneIdUser(form);
  },

  async me(token) {
    if (USE_MOCK) return mock.getProfile();
    return request("/me", { token });
  },
};

// =============================================================
//  Buyurtma / Sotib olish huquqi (umrda 1 marta)
// =============================================================
export const orders = {
  // Foydalanuvchining hayotiy huquqi (eligibility) holati.
  async eligibility(token) {
    if (USE_MOCK) return mock.getEligibility();
    return request("/orders/eligibility", { token });
  },

  // Buyurtma yaratish — backend takroriy sotib olishni rad etadi.
  async create(token, payload) {
    if (USE_MOCK) return mock.createOrder(payload);
    return request("/orders", { method: "POST", token, body: payload });
  },
};

// =============================================================
//  Passport (platformId orqali tekshirish)
//  Biz uzuk sotgan har bir juftlikka noyob platformId beramiz.
//  Shu ID orqali ularning ma'lumotlari va biz bergan "passport"
//  ko'rinib turadi.
// =============================================================
export const passport = {
  async lookup(platformId) {
    if (USE_MOCK) return mock.lookupPassport(platformId);
    return request(`/passport/${encodeURIComponent(platformId)}`);
  },
};

// =============================================================
//  MOCK ma'lumotlar bazasi (localStorage) — backend ulanmaganda
// =============================================================
const LS = {
  get user() {
    try {
      return JSON.parse(localStorage.getItem("yagona_user"));
    } catch {
      return null;
    }
  },
  set user(v) {
    localStorage.setItem("yagona_user", JSON.stringify(v));
  },
};

const mock = {
  fakeOneIdUser(form = {}) {
    const user = {
      token: "mock-token-" + Math.random().toString(36).slice(2),
      pinfl: form.pinfl || "3" + Math.floor(10 ** 12 + Math.random() * 10 ** 13),
      fullName: form.fullName || "Aliyev Sardor Akmalovich",
      birthDate: form.birthDate || "1996-04-12",
      region: form.region || "Toshkent shahri",
      eligible: true,
    };
    LS.user = user;
    return user;
  },
  getProfile() {
    return LS.user;
  },
  getEligibility() {
    const u = LS.user;
    return {
      eligible: u ? u.eligible !== false : true,
      reason: u && u.eligible === false ? "Siz hayotiy huquqingizdan foydalangansiz." : null,
    };
  },
  createOrder(payload) {
    const u = LS.user || {};
    const platformId =
      "YGN-" +
      new Date().getFullYear() +
      "-" +
      Math.random().toString(36).slice(2, 7).toUpperCase();
    const order = {
      platformId,
      ...payload,
      buyer: u.fullName,
      pinfl: u.pinfl,
      issuedAt: new Date().toISOString(),
    };
    u.eligible = false; // umrda bir marta — huquq sarflandi
    u.order = order;
    LS.user = u;
    // Passport bazasiga saqlaymiz (mock)
    const db = JSON.parse(localStorage.getItem("yagona_passports") || "{}");
    db[platformId] = order;
    localStorage.setItem("yagona_passports", JSON.stringify(db));
    return order;
  },
  lookupPassport(platformId) {
    const db = JSON.parse(localStorage.getItem("yagona_passports") || "{}");
    const found = db[(platformId || "").trim().toUpperCase()];
    if (!found) {
      // Namoyish uchun bitta tayyor namuna
      if ((platformId || "").trim().toUpperCase() === "YGN-DEMO-0001") {
        return {
          platformId: "YGN-DEMO-0001",
          buyer: "Aliyev Sardor Akmalovich",
          partnerName: "Karimova Malika",
          ringModel: "Yagona Classic — 0.30ct",
          pinfl: "31204961234567",
          message: "Butun umrim davomida faqat senga.",
          issuedAt: "2025-02-14T10:00:00.000Z",
        };
      }
      throw new Error("Bunday platformId topilmadi. Iltimos, ID'ni tekshiring.");
    }
    return found;
  },
};
