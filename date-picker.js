var V_DatePickersCnt = 0;

class V_DatePickers{
    _GetId() {
        return (V_DatePickersCnt++) + "_" + new Date().getTime();
    }

    constructor(option = {},cb=null) {
        let _self = this;
        _self.Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        _self.MonthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        _self.option = option;
        _self.src = null;
        _self.target = null;
        _self.cb = cb;
        if ("src" in _self.option) {
            if(typeof (_self.option["src"]) == "string")_self.src=document.getElementById(_self.option["src"])
            else _self.src = _self.option["src"]
        }
        if ("target" in _self.option) {
            if(typeof (_self.option["target"]) == "string")_self.target=document.getElementById(_self.option["target"])
            else _self.target = _self.option["target"]
        }

        if (_self.src == null) {
            console.error("please set src at id or element in option")
        } else {
            _self.selectDatePickert(_self.src, _self.target);
        }
    }

    selectDatePickert(src, target) {
        let _self = this;
        src.addEventListener('click', function (event) {
            if (target == null) target = event.currentTarget
            _self.AddCalendarDays((new Date()).getFullYear(), (new Date()).getMonth(), target);
        })
    }

    AddCalendarDays(Year, Month, Object) {
        let _self = this;
        if (Object) {
            _self.DateObject = Object
        }
        if (!_self.DatePickerHolder) {
            _self.DatePickerHolder = document.createElement('div');
            _self.DatePickerHolder.className = "v-date-picker-holder";
            _self.DatePickerTable = document.createElement('table');
            _self.DatePickerTable.className = "v-date-picker-table";
            document.body.appendChild(_self.DatePickerHolder);
            document.body.appendChild(_self.DatePickerTable);
        } else {
            _self.DatePickerHolder.style.display = 'block';
            _self.DatePickerTable.style.display = 'table';
            _self.DatePickerTable.innerHTML = '';
        }
        if (Month < 0) {
            Year = Year - 1;
            Month = 11;
        }
        if (Month > 11) {
            Year = Year + 1;
            Month = 0;
        }
        _self.Month = Month;
        _self.Year = Year;

        let firstDay = new Date(_self.Year, _self.Month, 1);
        let lastDay = new Date(_self.Year, _self.Month + 1, 0);

        let DayOffset = firstDay.getDay();
        let Day = 1;
        let MaxDay = lastDay.getDate();
        let Done = false;

// 創建表格元素
        let calendarTable = document.createElement('table');

// 創建表頭列元素
        let headerRow = document.createElement('tr');

// 創建前一個月按鈕元素
        let prevMonthButton = document.createElement('td');
        prevMonthButton.textContent = '❮';
        prevMonthButton.addEventListener('click', function() {
            _self.AddCalendarDays(_self.Year, _self.Month - 1);
        });

// 創建目前月份元素
        let currentMonthCell = document.createElement('td');
        currentMonthCell.textContent = _self.Months[_self.Month] + " " + _self.Year.toString();

// 創建後一個月按鈕元素
        let nextMonthButton = document.createElement('td');
        nextMonthButton.textContent = '❯';
        nextMonthButton.addEventListener('click', function() {
            _self.AddCalendarDays(_self.Year, _self.Month + 1);
        });

// 將按鈕元素添加到表頭列元素中
        headerRow.appendChild(prevMonthButton);
        headerRow.appendChild(currentMonthCell);
        headerRow.appendChild(nextMonthButton);

// 將表頭列元素添加到表格元素中
        calendarTable.appendChild(headerRow);


        let mainTable = document.createElement('table');

// 創建主要內容元素
        let mainContent = document.createElement('tbody');

        for (let r = 0; r < 6; r++) {
            if(r==0){
                let row = document.createElement('tr');
                row.appendChild(_self.creat_td("Su"))
                row.appendChild(_self.creat_td("Mo"))
                row.appendChild(_self.creat_td("Tu"))
                row.appendChild(_self.creat_td("We"))
                row.appendChild(_self.creat_td("Th"))
                row.appendChild(_self.creat_td("Fr"))
                row.appendChild(_self.creat_td("Sa"))
                mainContent.appendChild(row);
            }
            if (!Done) {
                let row = document.createElement('tr');
                for (let c = 0; c < 7; c++) {
                    let cell = document.createElement('td');
                    cell.addEventListener('click', function() {
                        _self.SetDate(cell);
                    });
                    if (DayOffset > 0) {
                        DayOffset = DayOffset - 1;
                    } else {
                        if (Day <= MaxDay) {
                            cell.textContent = Day.toString();
                            Day = Day + 1;
                        } else {
                            Done = true;
                        }
                    }
                    row.appendChild(cell);
                }
                mainContent.appendChild(row);
            }
        }

// 將主要內容元素添加到表格元素中
        mainTable.appendChild(mainContent);

// 將表格元素添加到 DatePickerTable 中
        _self.DatePickerTable.innerHTML = "";
        let tr1 = document.createElement('tr');
// 創建前一個月按鈕元素
        let td1 = document.createElement('td');
        let tr2 = document.createElement('tr');
// 創建前一個月按鈕元素
        let td2 = document.createElement('td');
        tr1.appendChild(td1)
        td1.appendChild(calendarTable)
        tr2.appendChild(td2)
        td2.appendChild(mainTable)
        let tbody = document.createElement('tbody');
        tbody.appendChild(tr1);
        tbody.appendChild(tr2);

        _self.DatePickerTable.appendChild(tbody);

    }

    AddCalendarMonths(Year) {
        let _self = this;
        _self.DatePickerTable.innerHTML = '';
        _self.Year = Year;
        let Done = false;
        let HeaderRow = "<table><tr>" +
            "<td id='prevYearButton'>&lt;</td>" +
            "<td>" + _self.Year.toString() + "</td>" +
            "<td id='nextYearButton'>&gt;</td>" +
            "</tr></table>";

        let MainContent = "<table>";
        for (let r = 0; r < 3; r++) {
            MainContent += "<tr>";
            for (let c = 0; c < 4; c++) {
                let MonthNo = (r * 4) + c;
                MainContent += "<td class='monthCell'>" + _self.Months[MonthNo].substring(0, 3) + "</td>";
            }
            MainContent += "</tr>";
        }
        MainContent += "</table>";
        _self.DatePickerTable.innerHTML = "<tr><td>" + HeaderRow + "</td></tr><tr><td>" + MainContent + "</td></tr>";

// 監聽前一年按鈕的點擊事件
        document.getElementById('prevYearButton').addEventListener('click', function() {
            _self.AddCalendarMonths(_self.Year - 1);
        });

// 監聽後一年按鈕的點擊事件
        document.getElementById('nextYearButton').addEventListener('click', function() {
            _self.AddCalendarMonths(_self.Year + 1);
        });

// 監聽月份格子的點擊事件
        let monthCells = document.getElementsByClassName('monthCell');
        for (let i = 0; i < monthCells.length; i++) {
            monthCells[i].addEventListener('click', function() {
                let monthIndex = Array.prototype.indexOf.call(this.parentNode.children, this);
                _self.AddCalendarDays(_self.Year, monthIndex, null);
            });
        }
    }

    SetDate(Obj) {
        let _self = this;
        if (Obj.innerHTML.toString() != '') {
            let str=_self.Year.toString()+"-"+(_self.Month+1).toString().padStart(2, '0')+"-"+Obj.innerHTML.toString().padStart(2, '0');
            if(_self.DateObject!=null){
                if(_self.isInputTag(_self.DateObject))_self.DateObject.value = str;
                else _self.DateObject.innerHTML=str;
            }
            if(_self.cb!=null && typeof _self.cb === 'function'){
                _self.cb(str)
            }
            _self.ClearDatePicker();
        }
    }

    ClearDatePicker() {
        let _self = this;
        if (_self.DatePickerHolder) {
            _self.DatePickerHolder.style.display = 'none';
            // document.body.removeChild(_self.DatePickerHolder);
        }
        if (_self.DatePickerTable) {
            _self.DatePickerTable.style.display = 'none';
            // document.body.removeChild(_self.DatePickerTable);
        }
        _self.Month = null;
        _self.Year = null;
    }
    creat_td(txt){
        let cell1 = document.createElement('td');
        cell1.textContent = txt;
        return cell1
    }
    isInputTag(obj) {
        return obj instanceof HTMLElement && obj.tagName === 'INPUT';
    }


    FormatDate(DateString) {
        let _self = this;
        let D = new Date(DateString);
        return D.getDate().toString() + " " + _self.Months[D.getMonth()] + " " + D.getFullYear().toString();
    }

    FormatDateShort(DateString) {
        let _self = this;
        let D = new Date(DateString);
        return D.getDate().toString() + " " + _self.MonthsShort[D.getMonth()] + " " + D.getFullYear().toString();
    }
}
