
<h1>V_DatePickers</h1>

This is a secondary development library refer to [Minimalist Popup Date Picker – date-picker.js](https://www.cssscript.com/popup-date-picker/)

a simple and easy DatePickers for anywhere
there only one code

<h2>
Step1 include js and css
</h2>

``````js
<link rel="stylesheet" href="date-picker.css">
<script src="date-picker.js"></script>
``````


<h2>
Step2 new instance and set src,target,callback
</h2>
"src" can be id or element and that used for click

"target" can be id or input element and that used for set select value

"callback" can defined how to do after select value

``````js
new V_DatePickers({"src":"date_picker","target":"date_picker"},function(ret){});
``````


<br><br><br>
######################################
<h1>中文說明</h1>

這是二次開發程式庫,參考[Minimalist Popup Date Picker – date-picker.js](https://www.cssscript.com/popup-date-picker/)

<br>
只需要一行程式碼,簡單易用於各式場合
<br>


<h2>
第一步 引用 js 和 css
</h2>

``````js
<link rel="stylesheet" href="date-picker.css">
<script src="date-picker.js"></script>
``````


<h2>
第二步
初始化並設定 src,target,callback
</h2>
"src" 可以是id或html element,他將偵測點擊事件跳出萬年曆

"target" 可以是id或html input element,在選擇日期後會設定value

"callback" 可以定義在選擇日期後取得回傳值

``````js
new V_DatePickers({"src":"date_picker","target":"date_picker"},function(ret){});
``````
