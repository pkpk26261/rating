# 成績管理系統

一個純前端的班級成績管理工具，所有資料僅儲存於本機瀏覽器（localStorage），不需要伺服器，開啟 `index.html` 即可使用。

## 功能總覽

| 模式 | 說明 |
|------|------|
| **加扣分** | 點擊學生卡片的 ＋/− 按鈕即時加扣分，左側同步更新加分排行榜與扣分排行榜 |
| **違規記錄簿** | 以表格式記錄每位學生的違規次數，支援遲到、缺交、上課違規、其他四類，並可在同一記事視窗切換「違規記事 / 特殊記事」，左側同步顯示違規排行榜 |
| **座位** | 自訂列×欄數，拖放學生安排座位；支援自動排位、隨機入座 |
| **作業成績** | 動態新增作業欄位、雙擊改名；支援批次輸入（整欄同分/貼上多筆） |
| **抽號** | 隨機抽取學生，可設抽選人數、序列模式、不重覆；支援緩停動畫 |
| **分組** | 設定組數後隨機分組或手動拖放；支援匯入/匯出 JSON 分組名單 |
| **倒數計時** | 快速預設（1～15 分鐘）或自訂秒數，倒數結束彈出提醒 |
| **教學進度** | 多分頁追蹤進度，各班獨立勾選完成狀態，統計即時更新 |
| **學生管理** | 新增/刪除班級與學生，完整名單含座號、學號、分數、作業平均 |

## 快速開始

1. 用瀏覽器開啟 [成績管理系統](https://pkpk26261.github.io/rating/)
2. 點擊「📂 匯入」上傳 Excel / ODS / CSV 名單（也可直接拖放檔案至頁面）
3. 開始使用各項功能

> 💡 首次使用可點擊「📥 下載範例檔」取得含兩班各 30 人的範例 Excel。

## 新手導覽

點擊頂部工具列的「🚀 導覽」按鈕，即可啟動**互動式新手導覽**。導覽會根據你目前所在的模式，逐步高亮並說明該模式的各項功能：

- **歡迎頁面**：介紹匯入流程與範例檔下載
- **加扣分模式**：學生卡片、加扣分操作、加分排行榜、扣分排行榜
- **違規記錄簿模式**：違規記錄表格、違規分類操作、違規排行榜
- **座位模式**：座位設定、拖放安排、未安排名單
- **作業成績模式**：工具列、成績表、批次輸入
- **抽號模式**：控制面板、抽籤動畫、結果與歷史
- **分組模式**：工具列、分組看板、拖放操作
- **倒數計時模式**：計時器、快速預設、控制按鈕
- **教學進度模式**：進度工具列、進度表格、勾選操作
- **學生管理模式**：班級列表、學生名單、增刪操作

切換到不同模式後再按「🚀 導覽」，會自動顯示對應的說明步驟。

## 匯入格式

支援以下格式：`.xlsx`、`.xls`、`.ods`、`.csv`

- **多檔匯入**：每個檔案 = 一個班級（檔名自動作為班級名稱）
- **單檔多工作表**：每個工作表 = 一個班級
- 匯出的檔案可直接再匯入回來
- 匯出後的班級工作表會一併保留四類違規次數、違規記事 JSON 與特殊記事 JSON，重新匯入時可完整還原違規狀態

### 欄位對應

| 欄位 | 必要 | 說明 |
|------|:----:|------|
| 姓名 | ✅ | 學生姓名 |
| 座號 | 選填 | 學生座號 |
| 學號 | 選填 | 學生學號（用於跨檔案識別） |
| 加扣分 | 選填 | 初始分數 |
| 座位列 / 座位欄 | 選填 | 座位位置（列 1～9、欄 1～9） |
| 作業 N | 選填 | 作業成績欄位（可多欄） |
| 備註 | 選填 | 學生備註文字 |
| 分組 | 選填 | 分組名稱 |
| 遲到 / 缺交 / 上課違規 / 其他 | 選填 | 四類違規次數（由系統匯出，用於再次匯入還原） |
| 違規記事 | 選填 | JSON 格式記事清單（由系統匯出，用於再次匯入還原） |
| 特殊記事 | 選填 | JSON 格式特殊記事清單（由系統匯出，用於再次匯入還原） |

## 匯出

右上角「💾 匯出」可將資料輸出為 Excel / CSV / ODS，支援選擇匯出項目（分數、作業、座位、進度、分組等）。

若匯出的是班級工作表，檔內也會包含違規資料，方便日後直接重新匯入。

## ☁️ Google 試算表同步

透過 Google **Apps Script 網頁應用程式**，可把全部班級資料（每個班級一個分頁）雙向同步到你自己的 Google 試算表。**完全免費，不需要 Google Cloud、不需要信用卡。**

### 一次性設定

1. 開啟（或新建）一個 Google 試算表 → 上方選單「**擴充功能**」→「**Apps Script**」。
2. 刪除編輯器內原本的內容，貼上下方「Apps Script 程式碼」，並把 `SECRET_TOKEN` 改成你自己的密碼。
3. 點右上角「**部署**」→「**新增部署作業**」→ 齒輪選「**網頁應用程式**」。
4. 設定「**執行身分**」為**你自己**、「**誰可以存取**」為「**任何人**」，按「部署」並完成授權。
5. 複製產生的「網頁應用程式」網址（形如 `https://script.google.com/macros/s/.../exec`）。
6. 回到成績系統，點工具列「**☁️ Google 試算表**」，貼上網址與剛剛設定的密碼。

> 🔒 「誰可以存取」必須設為「任何人」，前端才能呼叫；資料安全由你設定的密碼（`SECRET_TOKEN`）把關，請勿外洩網址與密碼。

### 使用方式

- **⬆️ 上傳到試算表**：把目前所有班級寫入試算表（每班一個分頁，會覆蓋同名分頁）。
- **⬇️ 從試算表下載**：把試算表內容讀回系統（會覆蓋目前的本機班級資料）。
- **變更後自動上傳**：勾選後，資料一有變動就會在約 3.5 秒後自動上傳。

同步的欄位與 Excel 匯出完全相同（含分數、作業、座位、分組、四類違規次數與違規/特殊記事 JSON）。

### Apps Script 程式碼

> 系統內的「☁️ Google 試算表 → 📖 如何設定」也提供同一份程式碼與「複製程式碼」按鈕。

```javascript
/**
 * 成績系統 ←→ Google 試算表 同步用 Apps Script
 * 使用方式：把 SECRET_TOKEN 改成你自己的密碼，
 * 然後「部署」成「網頁應用程式」（執行身分=你自己、誰可以存取=任何人）。
 */
const SECRET_TOKEN = '請改成你自己的密碼';

function doGet(e) {
  try {
    if (!e || !e.parameter || e.parameter.token !== SECRET_TOKEN) {
      return jsonOut({ ok: false, error: '密碼錯誤' });
    }
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheets = {};
    ss.getSheets().forEach(function (sh) {
      const values = sh.getDataRange().getValues();
      if (values && values.length) sheets[sh.getName()] = values;
    });
    return jsonOut({ ok: true, sheets: sheets });
  } catch (err) {
    return jsonOut({ ok: false, error: String(err) });
  }
}

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    if (payload.token !== SECRET_TOKEN) {
      return jsonOut({ ok: false, error: '密碼錯誤' });
    }
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheets = payload.sheets || {};
    Object.keys(sheets).forEach(function (name) {
      const aoa = sheets[name];
      if (!aoa || !aoa.length) return;
      let sh = ss.getSheetByName(name);
      if (!sh) sh = ss.insertSheet(name);
      else sh.clear();
      const cols = Math.max.apply(null, aoa.map(function (r) { return r.length; }));
      const norm = aoa.map(function (r) {
        const row = r.slice();
        while (row.length < cols) row.push('');
        return row;
      });
      sh.getRange(1, 1, norm.length, cols).setValues(norm);
    });
    return jsonOut({ ok: true });
  } catch (err) {
    return jsonOut({ ok: false, error: String(err) });
  }
}

function jsonOut(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```

> 改過程式碼後若同步沒生效，請到「部署 → 管理部署作業」重新部署（或建立新版本）。

## 主題

支援深色 / 淺色主題切換，偏好會自動記憶。

## 資料儲存

所有資料儲存於瀏覽器的 localStorage，**不會上傳至任何伺服器**。建議定期使用匯出功能備份。
