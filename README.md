# 成績管理系統

整合班級名單、作業成績、加扣分與課堂工具，讓老師在同一個工作區完成日常教學紀錄。

[開啟系統](https://pkpk26261.github.io/rating/) · [快速開始](#快速開始) · [資料與同步](#資料與同步) · [維護與發布](#維護與發布)

> **目前文件對應 2026-09-30 本機候選版。** 本機修改尚未發布，線上網站可能與本文不同。瀏覽器模擬服務測試不代表真實雲端、寄信或實體平板已驗收。

## 內容導覽

- [快速開始](#快速開始)
- [功能總覽](#功能總覽)
- [常用操作](#常用操作)
- [資料與同步](#資料與同步)
- [Google 試算表設定](#google-試算表設定)
- [匯入與匯出](#匯入與匯出)
- [常見問題](#常見問題)
- [維護與發布](#維護與發布)
- [近期更新與驗證](#近期更新與驗證)

## 快速開始

1. **登入帳號**：開啟系統，登入或建立系統帳號；忘記密碼可由登入頁重設。
2. **建立名單**：空白工作區選擇「立即匯入檔案」或「手動建立班級」。已有完整備份時，登入後使用「資料與同步 → 完整備份與還原」。
3. **開始記錄**：選擇班級，從「作業成績」開始批改，或切換「加扣分」「教學進度」等功能。
4. **確認保存**：離開或換電腦前，確認系統帳號顯示「已同步」；換裝置登入同一帳號即可接續。

目前入口統一使用系統帳號。既有本機資料保留，但不會因為瀏覽器已有資料而跳過登入，也不會自動合併到登入帳號。Google 試算表為選用的輔助備份。

## 功能總覽

| 功能 | 可以完成的工作 |
| --- | --- |
| 作業成績 | 登錄分數、未批改／缺交／免交狀態，整批貼上、複製與復原 |
| 加扣分 | 依座號或座位圖操作，查看加分與扣分排行榜 |
| 教學進度 | 分頁管理課程內容，各班獨立勾選完成狀態 |
| 成績預警 | 依可計算的作業成績查看低分學生與尚無成績的人數 |
| 違規記錄 | 記錄遲到、缺交、上課違規、其他，以及違規／特殊記事 |
| 學生管理 | 管理班級、座號、姓名、學號、幹部與姓名標注顏色 |
| 座位 | 佈置教室、旋轉桌椅、設定門與講台，依座號或隨機安排 |
| 分組 | 隨機分組、手動換組、組名調整、復原與待分組名單 |
| 抽號與點名板 | 抽取學生，依日期記錄出缺席與備註 |
| 課堂任務板 | 建立共用流程、逐步執行任務、計時與投影 |
| 倒數計時 | 使用快速預設或自訂時間，結束時顯示提醒 |
| 考試時間表 | 顯示節次、科目、倒數、人數與考場規則；設定僅存目前瀏覽器 |

座位、分組、抽號、點名板、任務板、倒數計時與考試時間表位於「課堂工具」。登入後即使尚無名單，也能使用任務板、倒數計時與考試時間表。

## 常用操作

### 作業成績

選擇班級後按「開始批改」，直接輸入分數或選擇狀態；完成後結束批改，表格回到唯讀。切換功能或重新整理也會回到唯讀。

| 狀態 | 計算方式 |
| --- | --- |
| 未批改 | 不計入總分與項數 |
| 缺交 | 以 0 分計入，項數加 1 |
| 免交 | 不計入總分與項數 |
| 已評分 | 以實際分數計入；明確輸入 0 也算已評分 |

**平均＝已評分總分 ÷（已評分項數＋缺交項數）。** 例如「80 分＋未批改」平均為 80；「80 分＋缺交」平均為 40。沒有可計算項目時顯示「—」，不列入低分預警。

- **鍵盤登錄**：Enter 跳到同一作業下一位，Shift + Enter 回上一位。
- **整批登錄**：使用作業標題下方入口，依順序或座號貼上，也可整欄設定同一分數或狀態。
- **多格操作**：電腦可拖曳或 Shift 選取；平板用「選取多格」點起點及終點。選取後可複製／貼上，Esc 取消選取。
- **試算表貼上**：Tab 分欄、換行分列；空白代表未批改。尺寸不符、無效值或超出範圍時整批拒絕，不新增學生或作業。
- **搜尋範圍**：批次操作只修改顯示且選取的學生。搜尋框叉號或 Enter 顯示全班，中文組字期間不清除。
- **復原**：每班保留目前開啟期間最近 20 次成績操作。重新整理或名單／作業結構改變後不保留歷史；復原結果也會重新保存。

作業較多時，在表格內左右捲動，座號與姓名保持固定。搜尋無結果時，提示填滿表頭下方的剩餘空間並置中；班級沒有學生時，顯示新增名單的說明。

### 座位與分組

座位頁分為「安排學生」與「佈置教室」。可套用教室範本，再移動、旋轉桌子及調整設施；清空座位會把學生放回待入座名單，保留教室配置。

依座號排位時，先在預覽選擇左上、右上、左下或右下起點，再按「依座號安排全班」。預覽與實際排位使用同一順序，禁止入座的桌位會跳過。修正後需重新執行安排才套用新順序。

分組先選班級與組數，再按「隨機分組」。點選一位或多位學生後，可選目的組別，也可回到待分組名單；組名、清空與移動均可復原。結果依可用寬高重排，縮窄學生卡片並利用組內並列；小視窗或組數較多時會縮小文字。

### 教學進度與課堂任務板

教學進度的主題旁「＋」新增進度，「⋯」調整順序或刪除；各班完成勾選分開保存。

任務板先選流程，再編輯任務或開始投影。投影後需按「開始任務」才啟動；老師按「下一步」換任務，時間到不自動跳步。已開始的步驟鎖定，完成課堂後可重新編輯。任務板與倒數計時共用一個計時器；換裝置載入或還原備份後會暫停，不作為多裝置即時遙控。

## 資料與同步

### 保存位置

| 位置 | 用途 | 換裝置時的處理 |
| --- | --- | --- |
| 系統帳號 | 主要保存班級、成績與教學紀錄 | 等待「已同步」後，登入同一帳號取回 |
| 瀏覽器本機暫存 | 保留目前資料與尚未同步的修改 | 不會因換網址或換瀏覽器自動搬移 |
| Google 試算表 | 帳號存妥後的輔助備份 | Google 連線設定隨同一帳號取回 |
| 完整 JSON／TXT 備份 | 自行留存、移轉與還原完整教學資料 | 登入後手動選檔還原 |
| 考試時間表 | 獨立的本機考場設定 | 不隨帳號、Google 或完整備份移轉 |

右上角「資料與同步」可查看保存結果、匯入、匯出、備份與還原。Google 失敗不會取消已完成的帳號保存；「帳號已存・Google 待備份」表示兩者進度不同。

若本機儲存失敗，先保留目前頁面，使用「重試儲存」或下載完整備份。離線修改先留在本機，恢復連線後重試；重新開啟帳號仍需要驗證身分，不保證完全離線登入。

### 兩台裝置同時修改

兩邊都在上次同步後修改時，停止自動覆寫並提供版本選擇。可先下載兩份資料核對，再選用本機或雲端的完整版本；系統不自動合併。取代前保存兩份本機版本備份，容量不足或確認期間版本改變時中止操作。

### 完整備份與還原

「資料與同步 → 完整備份與還原」提供下載與還原。備份包含班級、學生、加扣分、作業狀態、座位配置、記事、分組、抽號、點名、教學進度、任務板與倒數計時等教學資料。

- **下載**：保留目前最新資料，不必先完成 Google 備份。備份不包含登入憑證、Google 部署網址／同步密碼、瀏覽器主題或考試設定。
- **還原**：支援完整 JSON 或系統產生的 TXT 備份；先檢查並顯示摘要，確認後取代目前全部教學資料。還原前可先下載現有資料。
- **iPad 儲存**：使用「開啟儲存選單 → 儲存到檔案」，完成後到目的位置確認檔案；亦可使用一般 JSON 下載。
- **報表與備份不同**：Excel／CSV／ODS 匯出供查閱，不作為完整還原檔。

完整備份格式為第 1 版，上限 50 MB。還原後倒數暫停，Google 自動同步的恢復方式依畫面提示操作。登出清空可能移除尚未同步的本機變更及內部版本備份，請先保存需要的資料。

## Google 試算表設定

### 兩種密碼分開使用

| 欄位 | 用途 |
| --- | --- |
| 系統帳號登入密碼 | 登入系統，由帳號服務處理 |
| Google 同步密碼 | 對應 Apps Script 中的 `SECRET_TOKEN`，用來驗證 Google 資料同步 |

Google 部署網址與同步密碼保存於各自帳號設定。等待帳號「已同步」後，換電腦登入同一帳號即可取回；下載的完整備份及 Google 試算表資料不包含這組設定。

同步欄使用獨立遮罩欄位，避免登入帳密誤填；若瀏覽器仍自動填入，會還原已保存的同步密碼並提示。若舊版曾誤存登入密碼，需手動填回 Apps Script 的正確同步密碼一次。

### 第一次連線

1. 開啟 Google 試算表，選擇「擴充功能 → Apps Script」。
2. 貼上本文末尾或系統「第一次設定」提供的完整程式碼，將 `SECRET_TOKEN` 改成自訂同步密碼，保留引號。
3. 在 Apps Script「服務 → ＋」加入 Google Sheets API，識別名稱為 `Sheets`。
4. 部署為網頁應用程式，執行身分選自己，存取權限選「任何人」，依畫面完成授權。
5. 複製 `/exec` 部署網址，回到「資料與同步 → Google 試算表」，填入網址及同步密碼。
6. 確認帳號已保存，再查看 Google 備份結果。

設定完成後，帳號存妥的版本會自動備份至 Google。登入期間停用 Google 下載及開啟時自動載入，避免試算表覆寫帳號資料。舊部署若顯示「需更新部署」，請以完整程式碼更新原部署；原網址及正確同步密碼可沿用。

Apps Script 在寫入前驗證資料，透過單一 Sheets API 批次請求建立復原點並更新；保留最近一次實際寫入前受影響的分頁。這不是完整試算表封存，不保存所有圖表、欄寬與人工公式。

`__GRADE_SYNC_BACKUP__`、`__GRADE_SYNC_COPY_` 開頭的分頁為系統保留區。若需 Google 端復原，先停止各裝置操作並留存目前備份，再使用試算表「成績系統 → 復原最近一次上傳前版本」；帳號模式不會自動把復原後的試算表下載回帳號，請先核對版本，避免自動備份再次取代它。

## 匯入與匯出

名單支援 `.xlsx`、`.xls`、`.ods`、`.csv`，可同時選多檔及處理多工作表。「資料與同步 → 匯入檔案」也可匯入教學進度。

| 名單欄位 | 要求 | 說明 |
| --- | --- | --- |
| 座號 | 必填 | 學生座號 |
| 姓名 | 必填 | 學生姓名 |
| 班級 | 選填 | 同一表可依班級分班；未填時要求輸入班級與科目 |
| 學號 | 選填 | 學生識別欄位 |
| 性別 | 選填 | 可辨識並略過，目前不儲存 |

支援第一列為報表名稱、第二列為欄位的名單；空白工作表略過。所有班級視窗確認後才寫入，任一取消會取消整批。匯出的完整成績表不作為新增班級的乾淨名單。

「資料與同步 → 匯出成績報表」提供 Excel／CSV／ODS，依選項輸出成績、座位、進度、分組等資料；完整移轉請使用 JSON 備份。

## 常見問題

| 情況 | 處理方式 |
| --- | --- |
| 搜尋找不到學生 | 換姓名或座號；使用搜尋框叉號或 Enter 顯示全班 |
| 換電腦沒有最新資料 | 確認兩台登入同一帳號，原裝置已顯示「已同步」；檢查是否有版本衝突 |
| Google 一直待備份 | 先確認帳號已存，再查看網址、同步密碼與部署版本的錯誤提示 |
| Google 上傳逾時 | 結果可能尚未確認；先核對試算表與執行記錄，依畫面提示重試 |
| 本機儲存失敗 | 保留頁面、重試儲存；仍失敗時下載完整備份，不直接清除網站資料 |
| 表格超出畫面 | 在表格內橫向捲動；作業座號與姓名保持固定 |
| 備份不包含考試設定 | 考試時間表獨立存於目前瀏覽器，需另外在考試頁保存與管理 |

介面提供深／淺色主題；Tab 可使用「跳到主要內容」，Escape 可關閉選單。登入帳密保留瀏覽器自動填入，學生搜尋及 Google 同步密碼使用各自的欄位規則。

## 維護與發布

### 本機預覽

從專案目錄執行：

```sh
node tests/serve-workspace-preview.cjs 8821
```

用瀏覽器開啟 `http://127.0.0.1:8821/`。帳號服務需允許相應的 localhost 登入／重設網址；瀏覽器測試使用隔離的模擬服務，設定見測試文件。

### 專案結構

| 路徑 | 用途 |
| --- | --- |
| `index.html` | 主介面、教學功能及內嵌執行資產 |
| `account/` | 帳號介面、同步決策與本機儲存來源 |
| `apps-script/Code.gs` | Google 試算表同步程式來源 |
| `supabase/` | 資料庫遷移與帳號服務模板 |
| `vendor/` | 本機第三方套件與授權 |
| `scripts/` | 同步內嵌帳號資產及 Apps Script 的維護工具 |
| `tests/` | 模型測試、瀏覽器驗證與驗收紀錄 |
| `docs/archive/` | 重整前的歷史 README |

修改 `account/` 來源後執行 `node scripts/sync-account-assets.cjs`；修改 Apps Script 後執行 `node scripts/sync-apps-script.cjs`，更新頁面與本文末尾程式碼。不要只修改自動產生的內嵌區塊。

### 手動上傳 GitHub

目前發布組合為以下七個檔案：

```text
index.html
README.md
manifest.json
icon.svg
icon.png
icon-192.png
icon-512.png
```

帳號程式、樣式及 Excel 元件已內嵌於 `index.html`，這個發布組合不需額外上傳 `account/`、`vendor/` 或 `scripts/`。它也不會部署 Apps Script 或 Supabase；兩項服務需各自設定。README 的原始碼與驗證文件連結供完整專案使用，只有七檔的發布包不包含這些文件。

發布前執行完整性檢查，並依實際變更執行聚焦測試：

```sh
node tests/release-integrity.cjs
node --test tests/account-sync-policy.test.cjs tests/account-storage.test.cjs tests/full-backup.test.cjs tests/sync-completeness.test.cjs
```

測試工具與操作說明見 [tests/README.md](tests/README.md)，帳號與後端設定見 [account/README.md](account/README.md)。上傳前先核對檔案範圍，保留無關工作區修改；正式發布後需另驗證線上版本。

## 近期更新與驗證

2026-09-30 本機版本的主要調整：

- 統一帳號登入入口；帳號為主要資料來源，Google 作輔助備份。
- Google 同步密碼隨帳號保存，與登入密碼分開，攔截瀏覽器誤填。
- 修正旋轉／偏移桌位的依座號排位起點，預覽與結果一致。
- 分組依視窗寬高排列，利用並列名單呈現全班。
- 作業與加扣分搜尋框統一，移除外部「清除篩選」按鈕。
- 作業空白結果依剩餘空間置中，區分搜尋無結果與班級無學生。

各次驗證的範圍、數量與限制集中於 [測試紀錄](tests/README.md)及[上線前驗收紀錄](tests/release-readiness-2026-09-30.md)。較早的完整內容保留於 [歷史 README](docs/archive/readme-2026-09-30.md)，其中舊版操作不代表目前介面。

## Apps Script 原始碼

以下程式碼與系統「第一次設定」提供的版本一致；維護來源為 [apps-script/Code.gs](apps-script/Code.gs)。

<details>
<summary>展開 Google 試算表部署程式碼</summary>

### Apps Script 程式碼

```javascript
// 請把下一行的「在這裡填入你的密碼」換成自己的密碼，保留左右引號。
// 整份程式只需修改這一行，其他地方不用改。
const SECRET_TOKEN = '在這裡填入你的密碼';

// ── 以下程式不用修改 ──
/** 成績系統同步：先驗證，再以單一 Sheets API batchUpdate 備份及寫入。
 * 啟用 Apps Script「服務 → Google Sheets API」後，設定密碼並更新部署。
 * 隱藏備份只保留最近一次上傳前的同步分頁；不是整份試算表的歷史封存。
 */

const BACKUP_SHEET = '__GRADE_SYNC_BACKUP__';
const BACKUP_PREFIX = '__GRADE_SYNC_COPY_';
const BACKUP_MARKER = 'grade-sync-backup-v1';
const ACCOUNT_SOURCE_SHEET = '__ACCOUNT_SOURCE__';

function jsonOut(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
function authorized(token) {
  return typeof SECRET_TOKEN === 'string' && SECRET_TOKEN.trim().length > 0 &&
    SECRET_TOKEN !== ['在這裡', '填入你的密碼'].join('') && token === SECRET_TOKEN;
}
function withSyncLock(action) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) throw new Error('其他同步或復原正在進行，請稍候重試。');
  try { return action(); } finally { lock.releaseLock(); }
}
function requireSheetsAPI() {
  if (typeof Sheets === 'undefined') throw new Error('請先在 Apps Script「服務」新增 Google Sheets API，再更新部署。尚未寫入。');
}
function readBackup(ss, sheets = ss.getSheets()) {
  const sh = sheets.find(s => s.getName() === BACKUP_SHEET);
  if (!sh) {
    if (sheets.some(s => s.getName().startsWith(BACKUP_PREFIX))) throw new Error('備份索引遺失，請先檢查隱藏備份分頁。');
    return null;
  }
  const values = sh.getDataRange().getValues();
  if (values[0]?.[0] !== BACKUP_MARKER) throw new Error('備份保留名稱已被其他分頁使用，尚未寫入。');
  const record = JSON.parse(values[1]?.[0] || 'null');
  if (!record || record.version !== 1 || !Array.isArray(record.copies) || !Array.isArray(record.created)) throw new Error('備份索引損壞，尚未寫入。');
  const ids = new Set(), sourceIds = new Set();
  record.copies.forEach(c => {
    const copy = sheets.find(s => s.getSheetId() === c.backupId);
    if (!Number.isInteger(c.sourceId) || !Number.isInteger(c.backupId) || ids.has(c.backupId) || sourceIds.has(c.sourceId) || !copy || copy.getName() !== BACKUP_PREFIX + c.backupId || typeof c.name !== 'string' || c.name === BACKUP_SHEET || c.name.startsWith(BACKUP_PREFIX)) throw new Error('備份分頁不完整，尚未寫入。');
    ids.add(c.backupId); sourceIds.add(c.sourceId);
  });
  record.created.forEach(c => {
    if (!Number.isInteger(c.id) || typeof c.name !== 'string' || sourceIds.has(c.id) || ids.has(c.id)) throw new Error('備份索引損壞，尚未寫入。');
    sourceIds.add(c.id);
  });
  if (sheets.some(s => s.getName().startsWith(BACKUP_PREFIX) && !ids.has(s.getSheetId()))) throw new Error('發現未登錄的備份分頁，尚未寫入。');
  return {sheetId:sh.getSheetId(), record};
}
// 一次取得多個範圍，避免每個班級分別往返 Google。
function readSheetValues(ss, sheets, headerOnly = false) {
  if (!sheets.length) return [];
  requireSheetsAPI();
  const ranges = sheets.map(s => "'" + s.getName().replace(/'/g, "''") + "'" + (headerOnly ? '!1:1' : ''));
  const result = Sheets.Spreadsheets.Values.batchGet(ss.getId(), {
    ranges, majorDimension:'ROWS', valueRenderOption:'UNFORMATTED_VALUE', dateTimeRenderOption:'FORMATTED_STRING'
  });
  if (!Array.isArray(result.valueRanges) || result.valueRanges.length !== sheets.length) throw new Error('雲端資料不完整，請稍候再試。');
  return result.valueRanges.map(r => r.values || []);
}
function isManaged(name, rows) {
  const header = (rows[0] || []).map(v => String(v).trim());
  return name === '__CLASS_META__' || header[0] === '__CLASS_META__' ||
    (header[0] || '').replace(/\s+/g, '') === '教學進度' ||
    (header.includes('姓名') && header.includes('座號'));
}
function validateUpload(payload) {
  if (!payload || !['upload','accountBackup'].includes(payload.action) || !payload.sheets || typeof payload.sheets !== 'object' || Array.isArray(payload.sheets) || typeof payload.replaceManagedSheets !== 'boolean') throw new Error('上傳格式錯誤，尚未寫入。');
  const names = Object.keys(payload.sheets), seen = new Set();
  if (!names.length) throw new Error('上傳不可為空，尚未寫入。');
  return names.map(name => {
    if (!name.trim() || name.length > 100 || /[\[\]:*?/\\]/.test(name) || name === BACKUP_SHEET || name === ACCOUNT_SOURCE_SHEET || name.startsWith(BACKUP_PREFIX) || seen.has(name.toLowerCase())) throw new Error('分頁名稱無效或重複：' + name);
    seen.add(name.toLowerCase());
    const rows = payload.sheets[name];
    if (!Array.isArray(rows) || !rows.length || rows.some(r => !Array.isArray(r))) throw new Error('分頁資料格式錯誤：' + name);
    const cols = rows.reduce((n, r) => Math.max(n, r.length), 0);
    if (!cols || !isManaged(name, rows)) throw new Error('不是成績系統分頁：' + name);
    const normalized = rows.map(row => Array.from({length:cols}, (_, i) => {
      const v = row[i] === undefined || row[i] === null ? '' : row[i];
      if (!['string','number','boolean'].includes(typeof v) || (typeof v === 'number' && !Number.isFinite(v)) || (typeof v === 'string' && v.length > 50000)) throw new Error('儲存格資料無效：' + name);
      return v;
    }));
    return {name, rows:normalized, cols};
  });
}
function valueRows(rows) {
  return rows.map(row => ({values:row.map(v => ({userEnteredValue:
    typeof v === 'number' ? {numberValue:v} : typeof v === 'boolean' ? {boolValue:v} : {stringValue:v}
  }))})); // 字串以文字儲存，包含以等號開頭的姓名或備註。
}
function writeCells(id, rows) {
  return {updateCells:{range:{sheetId:id}, rows:valueRows(rows), fields:'userEnteredValue'}};
}
// 只忽略 Sheets API 省略的尾端空白，不轉型、不四捨五入、不移動中間空列。
function comparableRows(rows) {
  const result = rows.map(row => {
    const cells = row.map(v => v === null || v === undefined ? '' : v);
    while (cells.length && cells[cells.length - 1] === '') cells.pop();
    return cells;
  });
  while (result.length && !result[result.length - 1].length) result.pop();
  return JSON.stringify(result);
}
function uploadPlan(ss, payload, entries, previous, sheets = ss.getSheets()) {
  const requests = [], used = new Set(sheets.map(s => s.getSheetId()));
  let nextId = 1;
  const allocate = () => { while (used.has(nextId)) nextId++; used.add(nextId); return nextId++; };
  const incoming = new Map(entries.map(e => [e.name, e]));
  const active = sheets.filter(s => s.getName() !== BACKUP_SHEET && s.getName() !== ACCOUNT_SOURCE_SHEET && !s.getName().startsWith(BACKUP_PREFIX));
  const currentRows = readSheetValues(ss, active);
  const current = new Map(active.map((s,i) => [s.getName(), comparableRows(currentRows[i])]));
  const managed = new Set(active.filter((s,i) => isManaged(s.getName(), currentRows[i])).map(s => s.getSheetId()));
  entries.forEach(e => {
    const collision = active.find(s => s.getName().toLowerCase() === e.name.toLowerCase());
    if (collision && (collision.getName() !== e.name || !managed.has(collision.getSheetId()))) throw new Error('同名分頁不是可覆寫的同步分頁：' + e.name);
  });
  const changedEntries = entries.filter(e => current.get(e.name) !== comparableRows(e.rows));
  const changedNames = new Set(changedEntries.map(e => e.name));
  const affected = active.filter(s => changedNames.has(s.getName()) || (!incoming.has(s.getName()) && payload.replaceManagedSheets && managed.has(s.getSheetId())));
  if (!changedEntries.length && !affected.length) return []; // 不推進既有復原點。

  const record = {version:1, createdAt:new Date().toISOString(), copies:[], created:[]};
  affected.forEach(s => {
    const backupId = allocate();
    record.copies.push({sourceId:s.getSheetId(), backupId, name:s.getName(), hidden:s.isSheetHidden()});
    requests.push({duplicateSheet:{sourceSheetId:s.getSheetId(), newSheetId:backupId, newSheetName:BACKUP_PREFIX + backupId}});
    // 固定備份當下的值，避免公式因後續刪除或改寫來源分頁而改變。
    requests.push({copyPaste:{source:{sheetId:s.getSheetId()}, destination:{sheetId:backupId}, pasteType:'PASTE_VALUES'}});
    requests.push({updateSheetProperties:{properties:{sheetId:backupId, hidden:true}, fields:'hidden'}});
  });
  changedEntries.forEach(e => {
    const existing = active.find(s => s.getName() === e.name);
    const id = existing ? existing.getSheetId() : allocate();
    if (!existing) {
      record.created.push({id, name:e.name});
      requests.push({addSheet:{properties:{sheetId:id, title:e.name, gridProperties:{rowCount:e.rows.length, columnCount:e.cols}}}});
    } else {
      requests.push({updateSheetProperties:{properties:{sheetId:id, gridProperties:{rowCount:Math.max(existing.getMaxRows(), e.rows.length), columnCount:Math.max(existing.getMaxColumns(), e.cols)}}, fields:'gridProperties.rowCount,gridProperties.columnCount'}});
    }
    requests.push(writeCells(id, e.rows));
  });
  affected.filter(s => !incoming.has(s.getName())).forEach(s => requests.push({deleteSheet:{sheetId:s.getSheetId()}}));
  if (previous) previous.record.copies.forEach(c => requests.push({deleteSheet:{sheetId:c.backupId}}));
  const manifestId = previous ? previous.sheetId : allocate();
  if (!previous) requests.push({addSheet:{properties:{sheetId:manifestId, title:BACKUP_SHEET, hidden:true, gridProperties:{rowCount:2, columnCount:1}}}});
  const manifest = JSON.stringify(record);
  if (manifest.length > 50000) throw new Error('備份索引超出容量，尚未寫入。');
  requests.push(writeCells(manifestId, [[BACKUP_MARKER], [manifest]]));
  return requests;
}
function doGet(e) {
  if (!authorized(e?.parameter?.token)) return jsonOut({ok:false, error:'密碼錯誤'});
  if(e?.parameter?.action==='capabilities')return jsonOut({ok:true,accountBackupProtocol:1});
  try {
    return jsonOut(withSyncLock(() => {
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      const allSheets = ss.getSheets();
      readBackup(ss, allSheets);
      const sheets = Object.create(null);
      const active = allSheets.filter(s => s.getName() !== BACKUP_SHEET && s.getName() !== ACCOUNT_SOURCE_SHEET && !s.getName().startsWith(BACKUP_PREFIX));
      const rows = readSheetValues(ss, active);
      active.forEach((s, i) => {
        const values = rows[i];
        if (values.length) sheets[s.getName()] = values;
      });
      return {ok:true, sheets};
    }));
  } catch (err) { return jsonOut({ok:false, error:String(err.message || err)}); }
}
function accountVersionTime(value){
  const fraction=String(value).match(/\.(\d+)/)?.[1]||'';
  return Date.parse(value)*1000+Number(fraction.padEnd(6,'0').slice(3,6));
}
function doPost(e) {
  let submitted = false;
  try {
    const payload = JSON.parse(e?.postData?.contents || 'null');
    if (!authorized(payload?.token)) return jsonOut({ok:false, error:'密碼錯誤'});
    const entries = validateUpload(payload);
    requireSheetsAPI();
    return jsonOut(withSyncLock(() => {
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      const allSheets = ss.getSheets();
      const source=payload.action==='accountBackup'?payload.accountSource:null;
      if(payload.action==='accountBackup'&&!source)throw new Error('缺少帳號備份版本。');
      const marker=allSheets.find(s=>s.getName()===ACCOUNT_SOURCE_SHEET);
      if(marker && !source)throw new Error('此試算表已用於帳號備份，請從線上帳號更新。');
      if(source){
        if(!/^[0-9a-f-]{36}$/i.test(source.userId)||!/^[0-9a-f-]{36}$/i.test(source.revision)||!Number.isFinite(Date.parse(source.updatedAt)))throw new Error('帳號備份版本格式錯誤。');
        if(marker){
          const values=marker.getDataRange().getValues();
          if(values[0]?.[0]!=='account-source-v1')throw new Error('帳號備份索引格式不符。');
          const previous=JSON.parse(values[1]?.[0]||'null');
          if(previous?.userId!==source.userId)throw new Error('此試算表已綁定另一個帳號，請使用各自的試算表。');
          if(source.revision===previous.revision)return {ok:true,unchanged:true,accountBackup:true};
          if(accountVersionTime(source.updatedAt)<=accountVersionTime(previous.updatedAt))return {ok:true,skipped:true,accountBackup:true};
        }
      }
      const requests = uploadPlan(ss, payload, entries, readBackup(ss, allSheets), allSheets);
      if(source){
        let id=marker?.getSheetId();
        if(!id){
          const used=new Set(allSheets.map(s=>s.getSheetId()));
          requests.forEach(r=>{if(r.addSheet)used.add(r.addSheet.properties.sheetId);if(r.duplicateSheet)used.add(r.duplicateSheet.newSheetId);});
          id=1;while(used.has(id))id++;
          requests.push({addSheet:{properties:{sheetId:id,title:ACCOUNT_SOURCE_SHEET,hidden:true,gridProperties:{rowCount:2,columnCount:1}}}});
        }
        requests.push(writeCells(id,[['account-source-v1'],[JSON.stringify(source)]]));
      }
      if (!requests.length) return {ok:true, unchanged:true};
      submitted = true;
      Sheets.Spreadsheets.batchUpdate({requests}, ss.getId());
      return {ok:true, backupAvailable:true, ...(source?{accountBackup:true}:{})};
    }));
  } catch (err) {
    return jsonOut({ok:false, error:String(err.message || err) + (submitted ? '；未收到成功確認，請先下載核對。原子更新不會只套用部分分頁；可從試算表「成績系統」選單復原上傳前版本。' : '')});
  }
}
function onOpen() {
  SpreadsheetApp.getUi().createMenu('成績系統').addItem('復原最近一次上傳前版本', 'restorePreviousUpload').addToUi();
}
function restorePlan(ss, backup) {
  const requests = [], sheets = ss.getSheets(), record = backup.record;
  const source=sheets.find(s=>s.getName()===ACCOUNT_SOURCE_SHEET);
  if(source)requests.push({deleteSheet:{sheetId:source.getSheetId()}});
  // 先恢復舊分頁，再移除本次新增分頁，始終保留可見分頁。
  record.copies.forEach(c => {
    const source = sheets.find(s => s.getSheetId() === c.sourceId);
    const copy = sheets.find(s => s.getSheetId() === c.backupId);
    if ((source && source.getName() !== c.name) || sheets.some(s => s.getName() === c.name && s.getSheetId() !== c.sourceId)) throw new Error('分頁已被手動改名或取代，請先檢查：' + c.name);
    if (!source) requests.push({addSheet:{properties:{sheetId:c.sourceId, title:c.name, hidden:!!c.hidden, gridProperties:{rowCount:copy.getMaxRows(), columnCount:copy.getMaxColumns()}}}});
    else requests.push({updateSheetProperties:{properties:{sheetId:c.sourceId, gridProperties:{rowCount:Math.max(source.getMaxRows(), copy.getMaxRows()), columnCount:Math.max(source.getMaxColumns(), copy.getMaxColumns())}}, fields:'gridProperties.rowCount,gridProperties.columnCount'}});
    requests.push({repeatCell:{range:{sheetId:c.sourceId}, cell:{}, fields:'userEnteredValue,userEnteredFormat,note,dataValidation'}});
    requests.push({copyPaste:{source:{sheetId:c.backupId, startRowIndex:0, endRowIndex:copy.getMaxRows(), startColumnIndex:0, endColumnIndex:copy.getMaxColumns()}, destination:{sheetId:c.sourceId, startRowIndex:0, endRowIndex:copy.getMaxRows(), startColumnIndex:0, endColumnIndex:copy.getMaxColumns()}, pasteType:'PASTE_NORMAL'}});
  });
  record.created.forEach(c => {
    const source = sheets.find(s => s.getSheetId() === c.id);
    if (source && source.getName() !== c.name) throw new Error('新增分頁已被手動改名，請先檢查：' + c.name);
    if (source) requests.push({deleteSheet:{sheetId:c.id}});
  });
  record.copies.forEach(c => requests.push({deleteSheet:{sheetId:c.backupId}}));
  requests.push({deleteSheet:{sheetId:backup.sheetId}});
  return requests;
}
function restorePreviousUpload() {
  const ui = SpreadsheetApp.getUi();
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet(), preview = readBackup(ss);
    if (!preview) { ui.alert('目前沒有可復原的上傳前版本。'); return; }
    const answer = ui.alert('復原上傳前版本', '將復原 ' + preview.record.createdAt + ' 上傳前的同步資料，移除該次新增分頁。請先關閉所有裝置的自動同步並保留目前資料備份。復原後，所有裝置須先從雲端下載再編輯。是否繼續？', ui.ButtonSet.YES_NO);
    if (answer !== ui.Button.YES) return;
    requireSheetsAPI();
    withSyncLock(() => {
      const current = readBackup(ss);
      if (!current || JSON.stringify(current.record) !== JSON.stringify(preview.record)) throw new Error('確認期間有新的上傳，請重新開啟復原。');
      Sheets.Spreadsheets.batchUpdate({requests:restorePlan(ss, current)}, ss.getId());
    });
    ui.alert('雲端已復原。請在各裝置先從 Google 下載，再恢復編輯與自動上傳。');
  } catch (err) { ui.alert('未確認復原成功：' + (err.message || err) + '。請核對雲端內容；請勿直接重傳本機舊資料。'); }
}
```

</details>
