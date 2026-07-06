# HƯỚNG DẪN QUẢN TRỊ WEBSITE — Top Gear Decide

Tài liệu này hướng dẫn quản trị nội dung website **https://topgeardecide.com** qua trang Admin (Sveltia CMS).
Không cần biết lập trình. Mọi thay đổi bạn bấm **Publish** → website tự cập nhật sau **1–2 phút**.

- **Trang web:** https://topgeardecide.com
- **Trang quản trị (Admin):** https://topgeardecide.com/admin/
- **Cách hoạt động:** Admin lưu nội dung vào GitHub → Cloudflare tự động build lại website. Bạn không cần cài gì trên máy.

> ⏱️ **Ghi nhớ chung:** Sau khi bấm **Publish**, chờ **1–2 phút** rồi F5 lại website để thấy thay đổi (không hiện ngay lập tức là bình thường).

---

## MỤC LỤC
1. [Đăng nhập Admin](#1-đăng-nhập-admin)
2. [Cấp quyền cho nhân viên](#2-cấp-quyền-cho-nhân-viên)
3. [Tổng quan giao diện Admin](#3-tổng-quan-giao-diện-admin)
4. [Thêm một bài review mới (chi tiết từng ô)](#4-thêm-một-bài-review-mới)
5. [Sửa / xoá / ẩn bài viết](#5-sửa--xoá--ẩn-bài-viết)
6. [Thêm ảnh sản phẩm & ảnh bài viết](#6-thêm-ảnh)
7. [Dán link affiliate cho sản phẩm](#7-dán-link-affiliate)
8. [Web3Forms — để form Liên hệ gửi được email](#8-web3forms)
9. [Google Analytics 4 (GA4)](#9-google-analytics-4)
10. [Code xác minh / tracking của Awin, Impact, Amazon](#10-code-awin-impact-amazon)
11. [Sửa Menu, Footer, Banner trang chủ](#11-sửa-menu-footer-banner)
12. [Quy tắc quan trọng & lỗi hay gặp](#12-quy-tắc-quan-trọng--lỗi-hay-gặp)

---

## 1. ĐĂNG NHẬP ADMIN

1. Mở trình duyệt (khuyên dùng **Chrome**), vào: **https://topgeardecide.com/admin/**
2. Bấm nút **“Sign In with GitHub”**.
3. Cửa sổ GitHub hiện ra → bấm **Authorize** (đăng nhập bằng tài khoản GitHub đã được cấp quyền — xem Mục 2).
4. Vào được là thấy màn hình quản trị với 2 mục: **Articles (Reviews)** và **Site Settings**.

**Nếu nút GitHub không vào được**, dùng cách dự phòng:
- Bấm **“Sign In Using Access Token”** → dán **GitHub Personal Access Token** (xem Mục 2, cách B) → Sign In.

> 💡 Trình duyệt sẽ **nhớ đăng nhập**, lần sau vào thẳng. Nếu dùng máy chung, nhớ **Log out** khi xong (góc trên bên phải trong Admin).

---

## 2. CẤP QUYỀN CHO NHÂN VIÊN

Website lưu nội dung trên GitHub, nên mỗi người sửa bài cần quyền ghi vào kho mã (repo). Có 2 cách:

### Cách A — Thêm tài khoản GitHub của nhân viên làm cộng tác viên (khuyên dùng)
Chủ website làm 1 lần cho mỗi nhân viên:
1. Nhân viên tạo tài khoản GitHub (miễn phí, tại https://github.com/signup) và gửi **username GitHub** cho chủ.
2. Chủ vào: **https://github.com/hiepdiep1997-ux/topgeardecide-cms** → tab **Settings** → **Collaborators** → **Add people**.
3. Nhập username GitHub của nhân viên → **Add** → chọn quyền **Write**.
4. Nhân viên mở email GitHub → bấm **Accept invitation**.
5. Xong: nhân viên vào https://topgeardecide.com/admin/ → **Sign In with GitHub** bằng tài khoản của họ là dùng được.

### Cách B — Dùng Access Token dùng chung (nếu nhân viên không muốn tạo GitHub riêng)
1. Chủ vào: **https://github.com/settings/personal-access-tokens/new** (Fine-grained token).
2. Điền: Name = `TGD CMS Staff`; Expiration = tuỳ chọn; Resource owner = `hiepdiep1997-ux`; Repository access = **Only select repositories** → chọn `topgeardecide-cms`.
3. Mục **Repository permissions** → **Contents** = **Read and write** → **Generate token** → copy chuỗi `github_pat_...`.
4. Đưa token cho nhân viên. Họ vào Admin → **Sign In Using Access Token** → dán token → Sign In.

> ⚠️ Token = chìa khoá, đừng đăng công khai. Khi nhân viên nghỉ việc, vào GitHub xoá token / gỡ collaborator để thu hồi quyền.

---

## 3. TỔNG QUAN GIAO DIỆN ADMIN

Sau khi đăng nhập, cột trái có 2 mục:

| Mục | Dùng để |
|---|---|
| **Articles (Reviews)** | Thêm / sửa / xoá các bài review sản phẩm (nội dung chính của web) |
| **Site Settings** | Sửa Menu, Footer, Banner trang chủ, ô Deals, và **dán code** (Web3Forms, GA4, Awin, Impact) |

Nút **Publish** (hoặc “Save”) luôn ở **góc trên bên phải** khi đang mở một bài / một mục. **Bấm Publish thì thay đổi mới lên web.**

---

## 4. THÊM MỘT BÀI REVIEW MỚI

1. Bấm **Articles (Reviews)** → nút **“New Article”** (góc trên phải).
2. Điền các ô theo bảng dưới. Ô có dấu (*) là bắt buộc.
3. Bấm **Publish** khi xong.

### Các ô thông tin chung của bài

| Ô | Ý nghĩa | Ghi chú quan trọng |
|---|---|---|
| **Title (H1)** (*) | Tiêu đề lớn hiển thị đầu bài | VD: `Best Air Fryers in 2025: Tested & Compared` |
| **Meta Title (SEO)** (*) | Tiêu đề hiện trên Google | **Tối đa 70 ký tự** — quá là báo lỗi, không Publish được |
| **Meta Description (SEO)** (*) | Đoạn mô tả dưới tiêu đề trên Google | **Tối đa 165 ký tự** |
| **Category** (*) | Danh mục | Chọn 1 trong: **Supplements / Pantry / Drinks** |
| **Category Link** (*) | Link danh mục (khớp với Category) | Supplements→`/supplements`, Pantry→`/pantry`, Drinks→`/drinks` |
| **Card / Hero Image** | Ảnh đại diện bài (hiện ở trang chủ & danh mục) | Xem Mục 6 để tải ảnh lên |
| **Social Share Image** | Ảnh khi chia sẻ Facebook/Zalo (không bắt buộc) | Bỏ trống thì tự dùng Card Image |
| **Short Card Title** | Tiêu đề ngắn cho thẻ (không bắt buộc) | Bỏ trống thì dùng Title |
| **Card Summary** (*) | Câu mô tả ngắn trên thẻ ngoài trang chủ | 1–2 câu |
| **Published Label** | Nhãn ngày | Mặc định `Updated 2025` |
| **Read Time** | Thời gian đọc | Mặc định `8 min read` |
| **Intro Paragraph** (*) | Đoạn mở đầu bài | 3–4 câu giới thiệu |
| **Price Note** | Ghi chú giá dưới bảng | Đã có sẵn mặc định, không cần sửa |
| **Order** | Thứ tự hiển thị (số nhỏ = lên trước) | VD 1, 2, 3… |
| **Draft** | Bật = ẩn bài khỏi web (đang viết dở) | Tắt = cho hiển thị |

### Quick Pick (ô “Lựa chọn hàng đầu”)
- **Product Name** (*): tên sản phẩm được chọn là số 1 — **phải gõ GIỐNG HỆT** tên một sản phẩm trong danh sách bên dưới.
- **Why it's the quick pick** (*): lý do ngắn vì sao chọn nó.

### Products (danh sách sản phẩm — nên có 4–5 sản phẩm)
Bấm **“Add Product”** để thêm từng sản phẩm. Mỗi sản phẩm gồm:

| Ô | Ý nghĩa |
|---|---|
| **Product Name** (*) | Tên sản phẩm (model thật) |
| **Award** (*) | Danh hiệu, VD `Best Overall`, `Best Budget`, `Best Taste`… (mỗi sản phẩm 1 danh hiệu khác nhau) |
| **Affiliate Link** | Link tiếp thị liên kết — xem Mục 7. Để trống = nút bấm trơ (an toàn) |
| **Price** | Giá hiển thị, VD `~$40` |
| **Rating** | Điểm hiển thị, VD `4.7 / 5` |
| **Best For** | Phù hợp với ai (ô trong bảng so sánh) |
| **Product Image** | Ảnh sản phẩm — xem Mục 6 |
| **Description** (*) | Mô tả 2–3 câu |
| **Pros** | Ưu điểm — bấm “Add” thêm từng gạch đầu dòng |
| **Cons** | Nhược điểm — tương tự |
| **Price Value for SEO** | Chỉ SỐ, VD `40` (không $, không chữ) |
| **Rating Value for SEO** | VD `4.7` |
| **Rating Count for SEO** | VD `212` (số lượt đánh giá) |
| **Review Summary for SEO** | 1–2 câu tóm tắt |

> 4 ô “…for SEO” giúp Google hiển thị **sao vàng + giá** dưới kết quả tìm kiếm. Nên điền đủ.

### FAQs (câu hỏi thường gặp — không bắt buộc)
- Bấm **Add** → nhập **Question** (câu hỏi) và **Answer** (câu trả lời). Nên có 3 câu.

### Conclusion (*)
- Đoạn kết luận ~3 câu, nêu lại sản phẩm số 1 và ai nên chọn cái nào.

Xong hết → **Publish**. Chờ 1–2 phút, vào https://topgeardecide.com xem bài mới.

---

## 5. SỬA / XOÁ / ẨN BÀI VIẾT

- **Sửa:** Articles → bấm vào bài → sửa → **Publish**.
- **Ẩn tạm (không xoá):** mở bài → bật **Draft** = ON → Publish. (Bật lại OFF để hiện lại.)
- **Xoá hẳn:** mở bài → nút **Delete** (thùng rác, thường ở góc trên phải) → xác nhận.

---

## 6. THÊM ẢNH

Ở bất kỳ ô ảnh nào (**Card / Hero Image**, **Product Image**…):
1. Bấm vào ô ảnh → cửa sổ chọn ảnh hiện ra.
2. Bấm **Upload** → chọn ảnh từ máy → chọn ảnh vừa tải → **Insert/Choose**.
3. Ảnh sẽ được lưu vào thư mục `public/images` của website.

**Lưu ý bản quyền ảnh (quan trọng):**
- ✅ Nên dùng: ảnh bạn tự chụp, ảnh mua bản quyền, ảnh miễn phí (Pexels/Unsplash/Pixabay), hoặc ảnh chính hãng.
- ❌ **KHÔNG lấy ảnh sản phẩm từ Amazon** để đăng lên — vi phạm điều khoản Amazon Associates, có thể bị **khoá tài khoản affiliate**. Khi được duyệt Amazon, hãy lấy ảnh qua **SiteStripe** (thanh công cụ Amazon) — đó là ảnh được cấp phép.
- Nên nén ảnh nhẹ (< ~300KB) cho web chạy nhanh.

---

## 7. DÁN LINK AFFILIATE

Khi bạn được duyệt chương trình tiếp thị (Amazon Associates / Awin / Impact) và có link cho từng sản phẩm:
1. Articles → mở bài → cuộn tới **Products** → sản phẩm cần gắn.
2. Dán link vào ô **“Affiliate Link”**.
3. **Publish.** Nút **“Check Latest Price”** của sản phẩm đó sẽ hoạt động (mở link ra, có gắn `rel="nofollow sponsored"` đúng chuẩn).

> Lấy link ở đâu:
> - **Amazon:** đăng nhập Associates → vào trang sản phẩm → thanh **SiteStripe** trên cùng → **Text → Copy link**.
> - **Awin:** trong dashboard Awin → **Links & Tools / Link Builder** → dán URL sản phẩm của advertiser → lấy **deep link**.
> - **Impact:** trong Impact → **Content / Links** → tạo **tracking link** cho sản phẩm.

---

## 8. WEB3FORMS
### (để form Liên hệ ở trang /contact gửi được email)

**Bước 1 — Lấy Access Key (miễn phí):**
1. Vào **https://web3forms.com**
2. Ở ô **“Create your Access Key”**, nhập **email bạn muốn nhận thư liên hệ**.
   - Gợi ý: dùng **Gmail thật** để chắc chắn nhận được. (Nếu muốn nhận ở `info@topgeardecide.com` thì cần cài Cloudflare Email Routing trước — hỏi kỹ thuật.)
3. Bấm **Create Access Key** → mở email → **copy** chuỗi Access Key (dạng `xxxxxxxx-xxxx-xxxx-...`).

**Bước 2 — Dán vào Admin:**
4. Admin → **Site Settings** → **Header, Footer & Code**.
5. Kéo xuống mục **“Contact Form”** → dán key vào ô **“Web3Forms Access Key”**.
6. **Publish.** Chờ 1–2 phút → vào https://topgeardecide.com/contact thử gửi 1 tin nhắn để kiểm tra.

> Nếu gửi mà không nhận được mail: kiểm tra hộp **Spam**; đảm bảo key dán đúng, đủ; email đăng ký Web3Forms phải là email đang mở được.

---

## 9. GOOGLE ANALYTICS 4

**Bước 1 — Lấy đoạn mã (snippet):**
1. Vào **https://analytics.google.com** → **Admin** (bánh răng góc dưới trái).
2. **Create Property** → đặt tên `Top Gear Decide` → chọn múi giờ, tiền tệ → Next.
3. Tạo **Data Stream** loại **Web** → Website URL: `https://topgeardecide.com` → **Create stream**.
4. Trong stream, mở **“View tag instructions”** → tab **“Install manually”** → **copy TOÀN BỘ đoạn** bắt đầu bằng `<!-- Google tag (gtag.js) -->` cho tới `</script>` cuối.

**Bước 2 — Dán vào Admin:**
5. Admin → **Site Settings** → **Header, Footer & Code** → mục **“Site-wide Code”**.
6. Dán đoạn mã vào ô **“Custom Head Code”**.
7. **Publish.** Sau 1–2 phút, GA4 bắt đầu ghi nhận truy cập (kiểm tra ở GA4 → **Reports → Realtime**).

---

## 10. CODE AWIN / IMPACT / AMAZON
### (mã xác minh website & mã theo dõi của các mạng affiliate)

Các mạng affiliate thường yêu cầu **gắn 1 đoạn mã xác minh** hoặc **mã theo dõi** vào website. Tất cả dán vào cùng chỗ:
**Admin → Site Settings → Header, Footer & Code → “Site-wide Code”.**

| Loại mã | Dán vào ô nào |
|---|---|
| Thẻ meta xác minh (VD `<meta name="..." content="..."/>`) | **Custom Head Code** |
| Đoạn `<script>` chạy khi tải trang (MasterTag, pixel…) | **Custom Head Code** |
| Mã cần đặt cuối trang (hiếm, nhà mạng ghi rõ “end of body”) | **Custom Body Code** |

**Awin:**
- Awin cấp **“Awin MasterTag”** (một đoạn `<script>`) và/hoặc **thẻ meta xác minh domain**. → Dán vào **Custom Head Code**.
- Đường lấy: Awin dashboard → **Account / Site → Web / Tags** (hoặc bước xác minh website khi đăng ký).

**Impact:**
- Impact có thể cấp **thẻ meta xác minh** hoặc **Universal Tracking Tag (UTT)**. → Dán vào **Custom Head Code**.
- Đường lấy: Impact → **Settings / General → Tracking** hoặc bước xác minh domain.

**Amazon Associates:**
- Amazon **không cần dán mã** — họ **xét duyệt bằng cách xem nội dung website**. Chỉ cần site có bài chất lượng + có trang **Affiliate Disclosure** (đã có sẵn ở footer).
- Sau khi được duyệt: lấy link/ảnh qua **SiteStripe** (Mục 6, 7).

> 💡 Có thể dán **nhiều đoạn mã cùng lúc** trong ô Custom Head Code (mỗi đoạn xuống dòng riêng). VD vừa GA4, vừa Awin MasterTag, vừa meta xác minh Impact — tất cả nằm chung ô này. Xong bấm **Publish** một lần.

---

## 11. SỬA MENU, FOOTER, BANNER

Vào **Site Settings → Header, Footer & Code**:
- **Logo:** đổi 2 phần chữ logo (phần thường + phần màu cam).
- **Header Navigation → Menu Items:** thêm/sửa/xoá mục menu (Label = chữ hiển thị, Link = đường dẫn, VD `/supplements`).
- **Footer:** sửa tagline, các cột link, dòng disclosure, dòng copyright.
- **Homepage Hero Banner (slideshow):** thêm/xoá ảnh banner trang chủ (tự chạy đổi ảnh mỗi 5 giây). Để trống = hero nền xanh phẳng.
- **Deals Card:** ảnh + tiêu đề + mô tả + link của khối “Deals” trên trang chủ.

Sửa xong → **Publish**.

---

## 12. QUY TẮC QUAN TRỌNG & LỖI HAY GẶP

**Quy tắc vàng:**
- ✅ **Meta Title ≤ 70 ký tự**, **Meta Description ≤ 165 ký tự** — vượt là không Publish được.
- ✅ **Quick Pick → Product Name** phải **trùng khớp tuyệt đối** tên một sản phẩm trong bài.
- ✅ Mỗi sản phẩm nên có **Award khác nhau**.
- ✅ Ô “…Value for SEO” chỉ nhập **số** (không $, không dấu phẩy).
- ✅ Luôn bấm **Publish**, và **chờ 1–2 phút** rồi F5 web.
- ❌ Không dùng ảnh Amazon/ảnh không rõ bản quyền.

**Lỗi hay gặp & cách xử lý:**

| Hiện tượng | Cách xử lý |
|---|---|
| Bấm Publish báo lỗi đỏ ở một ô | Đọc dòng đỏ — thường do Meta Title/Description quá dài, hoặc ô bắt buộc bỏ trống. Sửa rồi Publish lại. |
| Sửa xong mà web chưa đổi | Chờ 1–2 phút (Cloudflare đang build), rồi **Ctrl+F5**. |
| Đăng nhập GitHub không vào | Thử **Ctrl+Shift+N** (cửa sổ ẩn danh, tắt tiện ích trình duyệt); hoặc dùng **Sign In Using Access Token** (Mục 2B). |
| Form liên hệ không nhận mail | Kiểm tra Spam; kiểm tra đã dán đúng **Web3Forms Access Key**; email đăng ký key phải mở được. |
| Ảnh tải lên bị vỡ/không hiện | Chờ build xong; kiểm tra đã bấm Insert đúng ảnh; ảnh nên < 300KB. |

---

## LIÊN HỆ KỸ THUẬT
Nếu gặp vấn đề ngoài tài liệu này (website lỗi, cần thêm danh mục mới, đổi giao diện…), liên hệ người phụ trách kỹ thuật.

*Cập nhật: 2026 — Website Top Gear Decide (Astro + Sveltia CMS, Cloudflare Pages).*
