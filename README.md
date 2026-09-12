# 成績管理系統

一個純前端的班級成績管理工具，資料預設儲存於本機瀏覽器（localStorage），可下載完整備份，或另行設定 Google 試算表同步。開啟 `index.html` 即可使用。

## 功能總覽

| 模式 | 說明 |
|------|------|
| **加扣分** | 點擊學生卡片的 ＋/− 按鈕即時加扣分，左側同步更新加分排行榜與扣分排行榜 |
| **違規記錄簿** | 以表格式記錄每位學生的違規次數，支援遲到、缺交、上課違規、其他四類，並可在同一記事視窗切換「違規記事 / 特殊記事」，左側同步顯示違規排行榜 |
| **座位** | 自訂列×欄數，拖放學生安排座位；支援自動排位、隨機入座 |
| **作業成績** | 全部作業並排；支援整欄／多欄複製貼上、20 次復原及欄位就地操作 |
| **抽號** | 隨機抽取學生，可設抽選人數、序列模式、不重覆；支援緩停動畫 |
| **分組** | 設定組數後隨機分組或手動拖放；支援匯入/匯出 JSON 分組名單 |
| **倒數計時** | 快速預設（1～15 分鐘）或自訂秒數，倒數結束彈出提醒 |
| **教學進度** | 多分頁追蹤進度，各班獨立勾選完成狀態，統計即時更新 |
| **學生管理** | 新增/刪除班級與學生，完整名單含座號、學號、分數、作業平均 |

## 快速開始

1. 用瀏覽器開啟 [成績管理系統](https://pkpk26261.github.io/rating/)
2. 點擊「立即匯入檔案」上傳 Excel / ODS / CSV 名單（也可直接拖放檔案至頁面），或選「從 Google 載入」「手動建立班級」。
3. 匯入名單後進入作業成績，選擇班級即可登錄；其他功能可由上方導覽切換。

> 💡 沒有正式名單時，可先下載範例檔再匯入試用。

## 第一次使用

第一次開啟時，主畫面會顯示匯入入口。操作很簡單：

- **匯入名單**：有 Excel 或 CSV 就直接匯入；沒有名單可先下載範例檔試用。
- **選好班級**：匯入後，確認班級出現在列表，並選好要操作的班級。
- **開始記錄**：上方固定提供「作業成績、加扣分、教學進度、學生管理」；「課堂工具」依固定順序提供成績預警、違規記錄、座位、分組、抽號及倒數計時。

資料預設只存在這台瀏覽器。備份或換電腦可使用下方的完整備份／還原功能；多台裝置共用時，可另行設定 Google 試算表同步。

## 電腦與平板操作

上方固定使用精簡導覽列，保留功能導覽、主題切換與資料同步入口，不再顯示系統標題或收合按鈕。日期時間移至「資料與同步」選單內，使用裝置當地時間，格式為 `YYYY/MM/DD HH:mm`，每分鐘自動更新。

導覽按鈕的名稱和相對順序保持一致，切換功能不會重新排列；目前所在頁面會標示選取狀態。按 Tab 可使用「跳到主要內容」，展開選單後按 Escape 可關閉。介面圖示使用 SVG，支援深／淺色主題。

平板會調整工具列及班級列表配置；較寬的資料表在表格內捲動，作業表保留座號與姓名方便對照。儲存狀態持續顯示本機存檔及 Google 同步結果；同步失敗可重試。重新開啟時保留上次使用的功能頁面。

### 登錄作業成績

所有作業固定並排在同一張表，每份作業維持合理欄寬；只有一份也不會拉滿螢幕。小計與平均靠表格最右側，數字靠右對齊。空白成績格顯示「未批改」，按「開始批改」後可輸入；右側箭頭只提供未批改、缺交、免交；已評分由直接輸入分數自動判定，不列為下拉選項。Enter 跳到同一作業下一位，Shift + Enter 回上一位，Tab 依畫面順序切換分數及狀態欄位。

作業頁預設採用精簡工具列，只顯示班級、搜尋、「開始批改」與「新增作業」。開始批改後才顯示選取多格、複製、貼上、復原、各欄整批登錄與作業選單，並定位第一筆未批改成績；沒有未批改時仍可修改既有成績。結束批改後重新鎖定成績並隱藏編輯工具，維持精簡版面。切換功能或重新整理也會回到唯讀。「新增作業」在兩種模式都可使用，取消不建立。每份作業標題下方提供「整批登錄」；點作業標題仍可批次輸入、複製整欄、改名、前移／後移或刪除。作業多時左右捲動表格，座號和姓名保持固定。小計、平均一律計算全部作業。

### 整批複製、貼上與登錄

- **選取多格**：工具列固定提供「選取多格、複製、貼上、復原」，無選取時複製／貼上停用，沒有可復原紀錄時復原停用。電腦可拖曳框選，或按住 Shift 點終點；平板按「選取多格」，再依序點起點與終點。多格選取後同一按鈕改為「結束選取」，也可按 Esc 清除選取，不影響已登錄成績。
- **複製**：選取整欄或多位學生、多份作業，按「複製」或 Ctrl／⌘ + C。複製內容只有分數與狀態，不含座號、姓名、作業標題或平均，可貼到本站其他成績格、Excel 或 Google 試算表。
- **貼上**：選一個起始格，按 Ctrl／⌘ + V 或「貼上」，依來源的列數與欄數向下、向右填入；已框選多格時，來源尺寸必須完全相同。使用試算表的 Tab 分欄、換行分列格式；中間空格、空列及最後空白列保留位置。空白是未批改，明確零分、缺交、免交各自保留。
- **格式檢查**：驗證整批後才一次寫入，不另開預覽。錯誤值、欄數不齊、範圍超出學生或現有作業時整批拒絕；不自動新增學生或作業。空剪貼簿不清空成績，要清空請刪除格內數字或改選「未批改」。
- **整批登錄**：每份作業標題下方提供單一入口，可整欄設定同一分數或狀態，也可依順序或按座號貼上。工具列不再提供重複的「填入」功能。
- **搜尋**：只修改目前顯示且選取的學生，不修改隱藏學生。操作列和批次視窗會標示範圍；一次操作開始時固定名單。頁面不提供「只看未批改」篩選，也不顯示學生人數／未批改筆數摘要。
- **剪貼簿限制**：無法直接讀取時提供貼上框，使用系統貼上後按「貼入表格」；無法直接複製時提供已選取的文字，使用系統複製即可，不需要變更瀏覽器權限。

### 復原與同步

每班在目前開啟期間保留最近 20 次成績操作，單格輸入、狀態變更、整批填入或貼上各算一次。按「復原」或在成績表按 Ctrl／⌘ + Z，一次還原該次全部成績；單格輸入離開欄位後形成一筆紀錄。重新整理不保留歷史。

名單或作業結構改變時，清除該班復原紀錄；雲端下載、完整資料還原時清除全部紀錄，避免對到錯誤學生或欄位。復原會走相同本機存檔與 Google 同步流程；已上傳的成績經復原後，會再上傳復原結果。選取範圍和復原紀錄不放入 Google 資料或備份。

## 編輯教學進度

主題固定單行顯示；進度內容隨文字與欄寬自動換行、增高，縮短內容也會收回高度。主題旁的「＋」直接新增並聚焦進度，「⋯」集中上移、下移與刪除；刪除主題標題仍保留其下進度。桌面可拖曳排序，選單可用 Escape 關閉。

## 課堂任務板

「課堂工具 → 課堂任務板」可投影今天的任務、下一步和剩餘時間；沒有班級名單也能使用。

- 尚未選流程時，先顯示「先選擇今天的流程」，可套用範例或建立自己的流程；選好前隱藏任務預覽與投影按鈕。
- 上方只保留「目前流程 ▾」、「編輯任務」、「開始投影」。點流程名稱開啟流程卡片，直接點卡片即可套用；重新命名及刪除收在各張已存流程的「⋯」選單。
- 任務板流程供各班共用，不顯示班級選擇與學生搜尋。流程、編輯與投影操作維持單列等高；窄畫面可橫向捲動操作列。沒有班級時也能使用。
- 「建立新流程」直接填寫名稱與任務，按「建立並使用」才會存入流程庫；取消不會留下空白流程。
- 「編輯任務」以可展開的步驟卡片呈現，每次專心設定一步；可新增、刪除、上移／下移。時間提供 1／3／5／10／15／20 分鐘快捷鍵，以及一體式「分：秒」輸入框；也能取消計時，上方即時顯示總時間。
- 背景上傳期間仍可開啟編輯與完成設定；正在下載或唯讀時會顯示原因，保留編輯草稿。重複開啟編輯不會覆蓋未儲存的內容。
- 編輯器統一使用「流程名稱」及「儲存流程」。已存流程的「儲存方式」僅提供「更新共用流程」（預設）與「另存新流程」，各班皆可套用；範例首次儲存直接建立共用流程，不顯示無法使用的更新選項。刪除共用流程仍保留正在使用的課堂。
- 「開始」啟動第一步；老師按「下一步」才會換任務並開始下一段計時。時間到顯示提醒，不自動跳步。可加 1 分鐘；倒數中加時繼續運行，時間到後加時保持暫停。
- 計時暫停後顯示「繼續倒數」及「重新開始」：前者接續剩餘時間，後者讓目前步驟恢復原訂時間（不含臨時加時）並立即倒數，不改變目前步驟。時間到後也可重新開始；不計時步驟不顯示此按鈕。
- 暫停／繼續、下一步、加 1 分鐘及重新開始目前步驟皆在點擊當下更新，背景 Google 上傳不會阻擋這些課堂操作；新狀態仍依既有機制保存並排入後續同步。雲端下載與唯讀視窗維持操作保護。
- 流程名稱旁以綠色「已開啟」標籤標示目前使用中。開啟編輯器會先暫停，已開始的步驟用鎖頭、琥珀色「已鎖定」標籤與外框表示；展開後顯示鎖定原因。後續步驟標示「可編輯」。最後按「完成課堂」，可再「重新開始」。
- 完成課堂後可直接按「重新編輯」，全部步驟都能修改、刪除及排序。按「儲存流程」後回到第一步待開始；取消則保留完成畫面及原內容。
- 「開始投影」只進入全螢幕，老師按「開始任務」才啟動計時；暫停後重新進入投影仍保持暫停，按「繼續倒數」才接續。進行中的投影按鈕顯示「放大投影」。隱藏導覽及成績，任務名稱以大字單行置中，倒數固定在正下方。超出畫面寬度的標題自動左右緩慢捲動，短標題不捲動；偏好減少動態效果時可手動水平捲動。退出投影不停止倒數；不支援全螢幕的瀏覽器使用網頁內投影版面。
- 與原倒數計時共用一個計時器。任務啟動前若有獨立倒數，會先確認取代；任務進行中，倒數頁提供開始、暫停、重置，時長設定由任務板管理。
- 本機重新開啟接續倒數；完整 JSON 備份／還原及現有 Google 同步包含流程庫與本次課堂。從備份或 Google 載入後一律暫停。舊完整備份沒有任務板時還原為空；舊 Google 資料沒有任務板時保留本機內容並提示。
- Google 沿用完整補充快照格式，不新增分頁或 Apps Script API。只有任務板、沒有班級及教學進度時也能同步。這是保存／下載，不是多裝置即時遙控。

## 完整備份與還原

右上「資料與同步」整合儲存狀態、Google 同步與檔案操作，其中備份相關入口為：

- **匯入名單**：維持 Excel／ODS／CSV 乾淨名單規則，用來新增班級及學生。
- **下載完整備份**：產生一個 JSON 檔，包含全部班級、學生與幹部、加扣分、作業分數及四種狀態、座位格數／配置／停用格、學生備註、違規與特殊記事、分組、抽號歷史、全部課程進度與勾選，以及課堂任務板、倒數計時和成績顯示設定。沒有班級但仍有課程時也可備份。
- **還原完整備份**：選擇上述 JSON 檔，先檢查格式、版本與內容，再顯示備份時間、班級、人數和課程摘要。勾選取代確認後，按「確認還原」才會取代目前全部資料；可先下載目前資料的備份，或直接關閉取消。

備份使用目前畫面所操作的最新資料，包含尚未完成本機存檔的修改。請確認 JSON 檔已下載完成並妥善保管。Excel／CSV 成績匯出檔供查閱使用，並非此功能的還原檔案；舊成績檔不會自動轉為完整備份。

還原先完成整份快照的本機寫入，空間不足或檔案無效時不會取代原資料。成功後若個別本機快取寫入失敗，常駐儲存狀態會顯示錯誤並提供重試。支援的完整備份格式為第 1 版，檔案上限 50 MB。

還原後自動上傳與開啟時雲端載入會暫停，重新整理後仍維持暫停；手動上傳或下載成功後，才恢復原有的自動同步設定。Google 連線網址與密碼、瀏覽器主題不放入備份，也不因還原而變更。倒數計時會保留備份剩餘時間並暫停。

## 作業狀態與平均規則

每筆作業可選擇四種狀態：

| 狀態 | 平均計算 |
|------|----------|
| 未批改 | 不計入總分與項數 |
| 缺交 | 以 0 分計入，項數加 1 |
| 免交 | 不計入總分與項數 |
| 已評分 | 以實際分數計入，項數加 1；明確輸入 0 也算已評分 |

平均＝已評分總分 ÷（已評分項數＋缺交項數）。例如「80 分＋未批改」平均為 80 分；「80 分＋缺交」或「80 分＋已評分 0 分」平均為 40 分；「80 分＋免交」平均為 80 分。

沒有可計算項目時顯示「—」，不列入低分預警；預警頁另列尚無可計算成績的人數。作業表格會顯示實際計入項數，學生管理與匯出使用相同計算規則。

直接輸入分數會切換為已評分；清空分數會變為未批改。既有空白視為未批改，既有數字（包含 0）保留為已評分。若過去以空白記錄缺交，請改選「缺交」。

批次輸入可填數字或「未批改、缺交、免交」；依表格順序貼上時，中間空行保留位置並代表未批改。「只套用未批改」不覆蓋已評分 0 分、缺交或免交。格式錯誤時整批不套用。

完整成績匯出與 Google 同步會保留狀態文字及數字；雲端載入可辨識相同格式。手動名單匯入範圍仍依下方規則。

## 匯入格式

支援以下格式：`.xlsx`、`.xls`、`.ods`、`.csv`

- **多檔匯入**：可同時選取多份名單。有「班級」欄時，依欄位內容分班；沒有填寫班級時，每個有學生資料的工作表會先要求填寫「班級」與「科目」。
- **單檔多工作表**：逐一處理有學生的工作表；有「班級」欄時可在同一表內分出多班。
- **手動匯入只接受乾淨名單**：必要欄位為「座號、姓名」，另可選填「班級、學號、性別」。可直接匯入全校班級名條（班級／座號／學號／性別／姓名），系統會依「班級」欄自動分班。
- 支援第一列為報表標題、第二列為「學號、座號、姓名」的名單，例如「資訊科技全學期平時成績.xlsx」；不需要新增成績欄。空白及僅含格式的分頁會自動略過。未填班級時會跳出視窗，必須填寫「班級」與「科目」，確認後整份名單建立為一個班級，例如「七年01班 資訊科技」。所有視窗確認後才開始寫入；任一視窗取消即取消整批匯入，原有資料保持不變。
- 匯出的完整成績試算表保留分數、作業、座位、違規與記事資料，供查閱使用，不作為新增班級的手動匯入格式；可還原的完整備份請使用 JSON 備份入口。
- Google 試算表下載以雲端內容取代本機班級資料：新增雲端班級、移除雲端已刪除的班級／學生／作業，並覆蓋成績、座位、分組、記事與教學進度；空白值也會清除舊設定。整份資料解析成功後才套用，解析失敗則保留原資料。新版同步會另存完整補充快照，保留抽號歷史、扣分累計、座位格數／停用格、空組與進度結構。舊版雲端未保存的資料無法憑空復原。

### 欄位對應

| 欄位 | 必要 | 說明 |
|------|:----:|------|
| 班級 | 選填 | 同一張表有多班時使用；未填班級時，匯入視窗會要求填寫班級與科目 |
| 姓名 | ✅ | 學生姓名 |
| 座號 | ✅ | 學生座號 |
| 學號 | 選填 | 學生學號，作為唯一識別碼 |
| 性別 | 選填 | 全校名條常見欄位；匯入時會被略過（目前不儲存） |

## 匯出

右上角「資料與同步 → 匯出成績報表」可將資料輸出為 Excel / CSV / ODS，支援選擇匯出項目（分數、作業、座位、進度、分組等）。設定 Google 後，這個入口仍維持匯出用途；上傳請使用「Google 同步」。

若匯出的是班級工作表，檔內也會包含違規資料與「姓名顏色」欄（學生管理裡替姓名設定的標注顏色），供查閱留存。完整資料還原請使用 JSON 備份，或透過既有 Google 同步格式載入。

## ☁️ Google 試算表同步

需要多台裝置共用或雲端同步時，再設定 Google 同步；本機 JSON 備份／還原不需要 Google 設定。

流程很短：開 Google 試算表 → 開 Apps Script → 部署成網頁應用程式 → 把網址和同步密碼貼回系統。

### 一次性設定

1. 開啟（或新建）一個 Google 試算表 → 上方選單「**擴充功能**」→「**Apps Script**」。
2. 刪除編輯器內原本的內容，貼上下方「Apps Script 程式碼」。找到最上方引號內的「**在這裡填入你的密碼**」，換成自己設定的密碼，**保留左右引號**。整份程式只需修改這一行，其他地方不用改。
3. 先在 Apps Script 左側「**服務 → ＋**」新增 **Google Sheets API**（識別名稱 `Sheets`）。若使用自訂 Google Cloud 專案，也需在該專案啟用 Sheets API。再點右上角「**部署**」→「**新增部署作業**」→ 齒輪選「**網頁應用程式**」。
4. 設定「**執行身分**」為**你自己**、「**誰可以存取**」為「**任何人**」，按「部署」並完成授權。
5. 複製產生的「網頁應用程式」網址（形如 `https://script.google.com/macros/s/.../exec`）。
6. 回到成績系統，點右上「**資料與同步 → Google 同步設定與下載**」，貼上網址與剛剛設定的密碼。雲端寫入保護必須更新下方 Apps Script 並重新部署新版本；編輯既有部署可沿用原網址與密碼。

上傳與下載提供流動進度條及處理階段提示，Google 等待期間不顯示估算百分比；成功後填滿，錯誤或逾時停止。下載遮罩內也顯示進度條，並支援系統減少動畫設定。

上傳最多等待 90 秒，20 秒後顯示仍在等待 Google 完成備份與上傳。等待期間不重複送出請求；逾時顯示「上傳結果尚未確認」，保留本機資料且不自動重傳。Google 可能仍在處理或已完成寫入，請先開啟試算表核對，勿立即重複上傳。此期限修改在網站端，不需再次更新 Apps Script。

雲端下載最多等待 90 秒；超過 20 秒會顯示仍在等待的提示，不會重複送出下載。若逾時，原有本機資料保持不變，可稍候按「重試」。逾時表示未在期限內收到完整回應，不一定是網路斷線，也可能是 Google 端處理較久；若持續發生，請檢查 Apps Script 部署與執行記錄。

> 🔒 「誰可以存取」必須設為「任何人」，前端才能呼叫；資料安全由你設定的密碼（`SECRET_TOKEN`）把關，請勿外洩網址與密碼。

### 使用方式

- **⬆️ 上傳到試算表**：把目前所有班級寫入試算表（每班一個分頁，會覆蓋同名分頁）。
- **同步會移除舊班級分頁**：本機已刪除的班級，在下次上傳同步後，也會從試算表刪除。
- **⬇️ 從試算表下載**：把試算表內容讀回系統（會覆蓋目前的本機班級資料）。
- **變更後自動上傳**：勾選後，停止編輯約 1 秒後自動上傳；連續修改會合併送出，上傳中有新修改則待本次完成後接續同步。此時間是送出前等待，不含 Google 處理時間。
- **開啟網頁時自動載入**：勾選後（預設開啟），本機沒有尚未確認同步的修改時，才自動從試算表下載最新資料；未同步、儲存失敗或舊版沒有同步版本時保留本機資料，請先備份再選擇同步方向。載入失敗會沿用本機暫存資料。

> ⚠️ 設定視窗會提醒這件事：**從試算表下載會覆蓋目前這台裝置上的班級資料**。若你剛做完大量修改，建議先手動上傳一次再下載或切換裝置。

同步的欄位與 Excel 匯出完全相同（含分數、作業、座位、分組、四類違規次數與違規/特殊記事 JSON）。

### 同步讀取加速

新版 Apps Script 上傳以一次批次請求讀取目前資料並精確比對，只備份、寫入有變動的分頁；完全相同時不寫入、不推進復原點。下載以一次批次請求取得全部非備份分頁的資料；每次同步只取得一次分頁清單。保留原子寫入與上傳前備份。數字使用未格式化原值（不四捨五入成績），人工設定為日期／時間的儲存格使用試算表顯示的日期／時間字串。

這項加速需要更新 Apps Script 並部署新版本，原網址與密碼可沿用。尚未量測真實 Google 執行時間；Google 啟動、網路及備份寫入耗時仍會影響等待。設計依據：[Google 建議使用批次操作減少服務呼叫](https://developers.google.com/apps-script/guides/support/best-practices)。

### 雲端寫入保護與復原

- 上傳先檢查全部分頁名稱、資料列及儲存格格式；空內容、保留名稱、重複名稱、非同步分頁及無效值不會寫入。零分、空白、缺交與免交保持原值。
- 備份、更新、新增及刪除舊同步分頁合併為單一 Sheets API `batchUpdate`。任何子請求無效時整筆不套用，既有資料和上一份備份均保留；容量不足、權限不足或 API 未啟用不會降級為逐頁覆寫。
- 同一份 Apps Script 的上傳、下載及復原使用同一把鎖，避免互相穿插。這不是跨裝置版本衝突偵測，也無法鎖住直接在 Google 試算表上的人工編輯或其他腳本。
- `__GRADE_SYNC_BACKUP__` 與 `__GRADE_SYNC_COPY_` 開頭的隱藏分頁是系統保留區，不能手動編輯、刪除或作為班級名稱。下載會排除它們。只保留最近一次實際寫入前受影響的同步分頁，下一次有變更的成功上傳才更新此復原點；不會在 Drive 不斷建立檔案。
- 備份固定當下的儲存格值（人工公式保留計算結果，不保留公式）。復原涵蓋同步資料與儲存格格式，恢復已移除分頁、移除該次新增分頁，既有分頁保留原 ID。這不是整份試算表封存：已刪分頁的欄寬、圖表、篩選器等額外設定不在自動復原範圍。長期留存請另下載完整 JSON 備份或複製試算表。
- 若網路逾時或回應遺失，整筆更新可能已成功，不能宣稱未寫入。先下載核對再決定是否重試，避免新一次上傳推進復原點。

復原操作：

1. 在所有裝置關閉自動上傳並停止編輯，先保留目前資料備份。
2. 重新整理 Google 試算表，選「**成績系統 → 復原最近一次上傳前版本**」。首次使用依 Google 提示授權。
3. 確認顯示的備份時間；選「否」不變更資料。確認期間若另有成功上傳，拒絕使用過期的復原確認。
4. 成功後，所有裝置先從 Google 下載，再恢復編輯與自動同步。復原點用完即移除，不能連續倒退多版。

維護來源為 `apps-script/Code.gs`；修改後執行 `node scripts/sync-apps-script.cjs`，同步網站複製區和本 README。原子更新依據：[Google Sheets 批次請求文件](https://developers.google.com/workspace/sheets/api/guides/batch)。

### Apps Script 程式碼

> 系統內的「資料與同步 → Google 同步設定與下載 → 第一次設定」也提供同一份程式碼與「複製程式碼」按鈕。

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
  if (!payload || payload.action !== 'upload' || !payload.sheets || typeof payload.sheets !== 'object' || Array.isArray(payload.sheets) || typeof payload.replaceManagedSheets !== 'boolean') throw new Error('上傳格式錯誤，尚未寫入。');
  const names = Object.keys(payload.sheets), seen = new Set();
  if (!names.length) throw new Error('上傳不可為空，尚未寫入。');
  return names.map(name => {
    if (!name.trim() || name.length > 100 || /[\[\]:*?/\\]/.test(name) || name === BACKUP_SHEET || name.startsWith(BACKUP_PREFIX) || seen.has(name.toLowerCase())) throw new Error('分頁名稱無效或重複：' + name);
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
  const active = sheets.filter(s => s.getName() !== BACKUP_SHEET && !s.getName().startsWith(BACKUP_PREFIX));
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
  try {
    return jsonOut(withSyncLock(() => {
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      const allSheets = ss.getSheets();
      readBackup(ss, allSheets);
      const sheets = Object.create(null);
      const active = allSheets.filter(s => s.getName() !== BACKUP_SHEET && !s.getName().startsWith(BACKUP_PREFIX));
      const rows = readSheetValues(ss, active);
      active.forEach((s, i) => {
        const values = rows[i];
        if (values.length) sheets[s.getName()] = values;
      });
      return {ok:true, sheets};
    }));
  } catch (err) { return jsonOut({ok:false, error:String(err.message || err)}); }
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
      const requests = uploadPlan(ss, payload, entries, readBackup(ss, allSheets), allSheets);
      if (!requests.length) return {ok:true, unchanged:true};
      submitted = true;
      Sheets.Spreadsheets.batchUpdate({requests}, ss.getId());
      return {ok:true, backupAvailable:true};
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

> 改過程式碼後若同步沒生效，請到「部署 → 管理部署作業」重新部署（或建立新版本）。

## 主題

支援深色 / 淺色主題切換，偏好會自動記憶。

## 資料儲存

資料預設儲存於目前瀏覽器的 localStorage；設定 Google 試算表同步後，會依手動或自動同步設定上傳。建議定期匯出資料留存。

右上「資料與同步」顯示一則主要狀態：優先提示本機儲存失敗、正在儲存或雲端同步異常。展開後分別查看本機與 Google 狀態，並操作同步、匯入名單、匯出成績報表及完整備份／還原；最近操作訊息也收在選單內。

- **正在儲存／已存本機**：本機資料正在寫入，或已完成寫入。
- **本機儲存失敗**：部分資料尚未存妥；按「重試儲存」重新保存目前內容。若持續失敗，可使用同一選單的「下載完整備份」保留目前資料。
- **未設定同步／待同步／同步中／已同步**：雲端連線未設定、目前版本待上傳、正在傳送，或已收到該版本的成功回應。
- **同步失敗**：顯示失敗原因並提供「重試同步」。雲端失敗時仍會獨立顯示本機是否已存妥；重新載入前請先確認本機狀態。

上傳期間若繼續編輯，較新的修改會保留「待同步」；開啟自動同步時會接續上傳。下載重試仍會先確認是否覆蓋本機班級資料。

### 學生編輯與姓名顏色

在「學生管理」開啟編輯模式後，可直接修改座號、姓名與學號。從「新增職稱…」選取即可加入，也可選擇自訂職稱；完成後按「完成編輯」。姓名顏色收在姓名下方，點開才顯示色票，使用「恢復預設顏色」取消標注。

姓名顏色統一套用至作業、加扣分與排行榜、座位、分組、成績預警、違規及抽籤等介面；變更後既有抽籤結果也會同步更新。

### 學生分組

選擇班級與組數後，按「隨機分組」即可平均安排全班；已有結果時顯示「重新隨機分組」。換組時，點選一位或多位學生，再從「移動到…」選擇組別，選好立即移動；選「待分組」可退回名單。點組名可重新命名，「復原上一步」可回復最近一次分組、移動、清空、組數或名稱調整。取消選取可按按鈕或 Esc。桌面仍可拖曳，平板使用點選方式，保留上下捲動。

各組使用自然高度的名單卡片，姓名 18px、每位學生至少 52px 高；寬螢幕內容置中，平板改為兩欄，內容較多時上下捲動。選取學生後才顯示集中移動選單，捲動時操作列仍保持可見。待分組名單可搜尋姓名或座號，全班安排完成後只顯示完成提示。姓名沿用學生管理設定的顏色。

## 保存與載入修正（2026-09-11）

- 座號排列依可用寬度排欄，列高 120px 並可捲動，不再沿用座位欄數把全班縮成細線。
- 新版 Google 同步在 `__CLASS_META__` 標頭第三欄起加入分段的完整補充快照與原表格對照。保留原班級分頁、幹部欄位及可編輯成績表。每段 JSON 字串小於單格上限，包含的完整備份不帶同步網址或密碼。
- 未人工修改的分頁從補充快照還原內部學生代碼、各類紀錄及完整結構。人工修改班級表時，以表格內容為準，並保留可對應學生的扣分累計、抽號、空組與座位格數。只改幹部選項時，以 metadata 當前選項為準。
- 舊版表格仍可下載。缺少座位格數的舊表採至少 6×6，依原講台座標放置，這是相容預設，不是找回原始格數。舊表沒有記錄的停用格、抽號等資訊仍無法還原。所有操作裝置應使用新版網頁，避免舊版上傳移除補充快照。
- 自動下載不覆蓋尚未確認同步的本機資料。手動下載先保存一份本機復原點，可在「資料與同步 → 下載雲端載入前的本機備份」取出。僅保留最近一次下載前版本；需長期留存時仍應下載完整備份。
- 下載期間若資料、連線設定或作用視窗變更，取消套用。非法成績、重複學生／座位、無效違規次數、損壞記事或補充快照會拒絕整批，保留本機資料。
- 單純切頁、切班與排列方式只存本機偏好，不觸發雲端資料上傳。下載成功記錄對應版本；只有教學進度也可上傳。班級分頁名稱碰撞會明確拒絕上傳。
- 此次未加入跨裝置的雲端版本衝突合併。兩台裝置同時編輯仍可能覆蓋彼此，不能把同一瀏覽器分頁鎖或單次原子寫入當成跨裝置衝突保護。

本次逐步驗證與實際雲端唯讀比對見 `tests/2026-09-11-sync-audit.md`。未發布網站、未上傳或復原使用者的雲端資料。

### 學生備註隱藏

可在每位學生的備註視窗勾選「下次開啟時隱藏內容」，按儲存後生效。再次開啟時先顯示遮蔽提示，點「顯示內容」才可查看、編輯及清空；取消不變更設定。受保護備註的卡片與作業表提示只顯示「有備註」。設定隨完整備份及 Google 同步保存，班級匯出末欄為「備註預設隱藏」（0／1）；既有無此欄資料視為不隱藏。備註匯出仍保留全文，這是畫面隱藏功能，並非密碼或加密。

### 點名板

點名板與作業成績共用座號、姓名兩欄的版型、欄寬、字級、表頭底色與備註樣式。一般學生列高 45px、表頭高 52px，點名狀態圖例放在上方工具列，表格可用高度與作業成績一致。姓名沿用學生管理設定的顏色；座號前的備註按鈕可查看、新增、編輯或清空作業成績的同一份學生備註。有內容時姓名旁顯示橘色筆形圖示，風格沿用作業成績，並保留「下次開啟時隱藏內容」設定。

在「課堂工具 → 點名板」直接選擇班級。每個既有班級名單自動有一張點名表，不需另外建立或填科目；班級名稱及科目沿用原名單並分色顯示。同名但不同科目的名單仍各自獨立。新增班級後會自動有空表，刪除班級時移除對應點名表。

- 「＋新增」每次新增一欄。節次、日期皆可留空；日期預填今天，也可清空。兩項全空時顯示「點名 1、點名 2……」，相同日期、節次可重複新增。
- 欄位固定 80px，日期與星期、節次分兩行緊湊排列；科目只在上方點名板顯示，長標籤省略顯示並可懸停查看全文；座號、姓名及欄頭固定。新欄加在最右側並自動捲到該欄；在欄頭按右鍵、長按約半秒或按 Shift＋F10 可直接編輯，也可選取欄頭後按上方「編輯點名」修改；「刪除此欄」放在編輯視窗中，確認後才刪除。編輯不改順序或所屬點名板。上方只顯示四種狀態的符號圖例，不顯示統計數量。
- 空白為未點；各狀態均保持表格原本底色，只用符號與符號顏色辨識。每點一下依序切換「空白 未點 → ✓ 已到 → ○ 缺席 → × 遲到 → 未點」。長按約半秒或右鍵可選擇四種狀態；Enter／空白鍵依序切換狀態，Shift＋F10 開啟選單，Escape 關閉。點名只更新該格，保持捲動位置與焦點。
- 舊紀錄依原班級名單整合為一張表，保留各原板內欄位順序及狀態。同班舊板若有重複欄位識別碼，僅為衝突欄建立新識別碼，兩欄均保留。新版資料隨本機、完整備份及 Google 完整補充快照保存；不另建可編輯的 Google 點名分頁。若原始點名資料無法轉換，系統保留原始本機快照並停止覆寫，可還原有效的完整備份。
- 班級改名保留點名板；刪除學生或班級會清除對應紀錄。新增學生在原有各欄預設未點。「資料與同步 → 清除資料」可單獨清除全部點名紀錄。

點名板同步後會更新目前畫面；若編輯或刪除確認期間收到較新的資料，會保留新資料並請老師重新開啟操作。入口、標題及空板引導皆使用 SVG 圖示。

## 考試時間表（僅存本機）

從「課堂工具 → 考試時間表」開啟，即使沒有學生名單也能使用。所有班級共用同一份考試設定。介面依原版的深藍漸層、紅色標題、黃色／紅色倒數及青色提示設計，支援深淺色。考試頁與課堂入口使用同一個筆記板＋時鐘 SVG，其餘操作使用一致的線條 SVG。

- 保留早自習、午休及七節考試的預設時間。點選時間可一起修改起訖時間；科目直接在節次表輸入。時間須完整、結束晚於開始，且不可與相鄰節次重疊。
- 依裝置時間與考場校正值顯示本節剩餘時間、下一節考試及節次狀態。自習、自修、複習、休息等時段不計入下一節考試，也不顯示考試結束提醒。考試中單獨放大本節倒數；下課時並排顯示下一節考試與預備鐘倒數（下節開始前 3 分鐘），用餐時段不扣除預備鐘時間。
- 人數、備註與規則可直接編輯；缺席人數自動計算，最低為 0。資訊可手動切換或每 8 秒自動輪播；輸入、停留在資訊區或開啟編輯視窗時暫停輪播。備註與規則可各別調整為 50%～200%。
- 左右分區間的箭頭可收合節次、放大倒數與資訊區。「全螢幕」放大考試畫面，右上可退出；若瀏覽器不允許全螢幕，仍可使用頁內投影。考試頁的左右方向鍵切換資訊，F11 切換投影，Escape 退出投影；編輯文字時不攔截方向鍵。
- 底部控制列提供時間校正、儲存、載入與清除資料。右上可隱藏／顯示控制列，偏好只存本機；清除需確認，只恢復考試時間表預設值，不清除成績或名單。

修改會自動保存到目前瀏覽器的獨立本機資料。**考試內容不傳送 Google，也不包含在系統完整 JSON 備份中**；Google 下載、系統備份還原或清除班級資料皆不覆蓋考試設定。換裝置、換網址或清除瀏覽器網站資料不會保留這份設定，也不會自動搬移舊獨立程式的資料。

儲存失敗時，考試頁會顯示原因及「重試儲存」，未存內容保留於目前頁面。既有資料損壞時保留原始內容並停止覆寫，可重試載入，或確認清除考試資料後重新開始。
