# 成績管理系統

一個純前端的班級成績管理工具，所有資料僅儲存於本機瀏覽器（localStorage），不需要伺服器，開啟 `index.html` 即可使用。

## 功能總覽

| 模式 | 說明 |
|------|------|
| **加扣分** | 點擊學生卡片的 ＋/− 按鈕即時加扣分，左側同步更新加分排行榜與扣分排行榜 |
| **違規記錄簿** | 以表格式記錄每位學生的違規次數，支援遲到、缺交、上課違規、其他四類，並可在同一記事視窗切換「違規記事 / 特殊記事」，左側同步顯示違規排行榜 |
| **座位** | 自訂列×欄數，拖放學生安排座位；支援自動排位、隨機入座 |
| **作業成績** | 動態新增作業欄位、雙擊改名、拖曳排序；支援前後移備援與批次輸入（整欄同分/貼上多筆） |
| **抽號** | 隨機抽取學生，可設抽選人數、序列模式、不重覆；支援緩停動畫 |
| **分組** | 設定組數後隨機分組或手動拖放；支援匯入/匯出 JSON 分組名單 |
| **倒數計時** | 快速預設（1～15 分鐘）或自訂秒數，倒數結束彈出提醒 |
| **教學進度** | 多分頁追蹤進度，各班獨立勾選完成狀態，統計即時更新 |
| **學生管理** | 新增/刪除班級與學生，完整名單含座號、學號、分數、作業平均 |

## 快速開始

1. 用瀏覽器開啟 [成績管理系統](https://pkpk26261.github.io/rating/)
2. 點擊「📂 匯入」上傳 Excel / ODS / CSV 名單（也可直接拖放檔案至頁面）
3. 開始使用各項功能

> 💡 沒有正式名單時，可先下載範例檔再匯入試用。

## 第一次使用

第一次開啟時，主畫面會顯示匯入入口。操作很簡單：

- **匯入名單**：有 Excel 或 CSV 就直接匯入；沒有名單可先下載範例檔試用。
- **選好班級**：匯入後，確認班級出現在列表，並選好要操作的班級。
- **開始記錄**：用左上角的模式按鈕切換加扣分、作業成績、座位、抽號等功能。

資料預設只存在這台瀏覽器。需要備份、換電腦，或多台裝置共用時，再設定 Google 試算表同步。

## 匯入格式

支援以下格式：`.xlsx`、`.xls`、`.ods`、`.csv`

- **多檔匯入**：每個檔案 = 一個班級（檔名自動作為班級名稱）
- **單檔多工作表**：每個工作表 = 一個班級
- **手動匯入只接受乾淨名單**：欄位只能是「班級、座號、姓名」，另可選填「學號、性別」（若用檔名或工作表當班級，可省略「班級」欄）。可直接匯入全校班級名條（班級／座號／學號／性別／姓名），系統會依「班級」欄自動分班。
- 匯出的完整成績檔保留分數、作業、座位、違規與記事資料，適合備份查看，不作為新增班級的手動匯入格式。
- Google 試算表同步載入：本機沒有班級時可作為初次載入；本機已有班級時只更新既有班級，不會新增試算表裡多出來的班級。

### 欄位對應

| 欄位 | 必要 | 說明 |
|------|:----:|------|
| 班級 | 選填 | 同一張表有多班時使用；也可用檔名或工作表名稱當班級 |
| 姓名 | ✅ | 學生姓名 |
| 座號 | ✅ | 學生座號 |
| 學號 | 選填 | 學生學號，作為唯一識別碼 |
| 性別 | 選填 | 全校名條常見欄位；匯入時會被略過（目前不儲存） |

## 匯出

右上角「💾 匯出」可將資料輸出為 Excel / CSV / ODS，支援選擇匯出項目（分數、作業、座位、進度、分組等）。

若匯出的是班級工作表，檔內也會包含違規資料，方便日後直接重新匯入。匯出時也會保留「姓名顏色」欄（學生管理裡替姓名設定的標注顏色），重新匯入或 Google 同步後仍會還原。

## ☁️ Google 試算表同步

只有要備份、換電腦，或多台裝置共用時，才需要設定 Google 同步。

流程很短：開 Google 試算表 → 開 Apps Script → 部署成網頁應用程式 → 把網址和同步密碼貼回系統。

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
- **同步會移除舊班級分頁**：本機已刪除的班級，在下次上傳同步後，也會從試算表刪除。
- **⬇️ 從試算表下載**：把試算表內容讀回系統（會覆蓋目前的本機班級資料）。
- **變更後自動上傳**：勾選後，資料一有變動就會在約 3.5 秒後自動上傳。
- **開啟網頁時自動載入**：勾選後（預設開啟），每次打開網頁會優先從試算表下載最新資料；若載入失敗會自動沿用本機暫存資料。

> ⚠️ 設定視窗會提醒這件事：**從試算表下載會覆蓋目前這台裝置上的班級資料**。若你剛做完大量修改，建議先手動上傳一次再下載或切換裝置。

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
    if (payload.replaceManagedSheets === true) {
      const keepNames = Object.keys(sheets);
      const keep = {};
      keepNames.forEach(function (name) { keep[name] = true; });
      const deletable = ss.getSheets().filter(function (sh) {
        if (keep[sh.getName()]) return false;
        const values = sh.getDataRange().getValues();
        if (!values || !values.length) return false;
        const first = String(values[0][0] || '').trim();
        const header = (values[0] || []).map(function (v) { return String(v || '').trim(); });
        const isManaged =
          first === '__CLASS_META__' ||
          first.replace(/\s+/g, '') === '教學進度' ||
          (header.indexOf('姓名') >= 0 && header.indexOf('座號') >= 0);
        return isManaged;
      });
      deletable.forEach(function (sh) {
        if (ss.getSheets().length > 1) ss.deleteSheet(sh);
      });
    }
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
