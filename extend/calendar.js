define(function(require, exports, module) {
    var app = {
        init: function() {
            this.$dateWrap = $(".calendar-date");
            this.$date = $("#date");
            this.$dateVal = $("#date > i");
            this.$dateTabelTh = $(".calendar-date").find("table").find("thead").find("th");
            this.$dateTabelTd = $(".calendar-date").find("table").find("tbody").find("td");
            this.bind();
        },
        bind: function() {
            this.getNowYearMonth();
            this.$date
                .on("click", ".l", this.changeDate.bind(this, "-"))
                .on("click", ".r", this.changeDate.bind(this, "+"));
        },
        changeDate: function(left) {
            //2014年6月
            this.$dateVal.text().replace(/^(\d+).(\d+).$/,function(str,y,m){
                app.Y=y;
                app.M=m;
                //return str;
            });
            left == "-" ? this.M-- : this.M++;
            if (this.M == 0) {
                this.M = 12;
                this.Y--;
            }
            if (this.M > 12) {
                this.M = 1;
                this.Y++;
            }
            this.$dateVal.text(this.Y + "年" + this.M + "月");
            this.dateInit(this.Y, this.M);
        },
        getNowYearMonth: function() {
            var now = new Date;
            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            this.$dateVal.text(year + "年" + month + "月");
            this.dateInit(year, month);
        },
        dateInit: function(year, month) {
            var week = new Date(year, month - 1, 1).getDay(); //每个月1号是星期几
            var days = new Date(year, month, 0).getDate(); //这个月有多少天
            var prevDays=new Date(year, month-1, 0).getDate(); 
            var nextDays=new Date(year, month+1, 0).getDate(); 
            var index=0;
            this.$dateTabelTh.each(function(i, value) {
                if (Number($(this).attr("data-day")) == week) {
                    index=i;
                }
            });
            var firstDay = 1,
                n = 0,
                fillDay=index+days,
                tdLen = this.$dateTabelTd.length;
            // 上个月填充
            while (n < index) {
                this.$dateTabelTd.eq(n).find(".day").addClass("disabled").text(prevDays-index+1+n);
                n++;
            }
            // 填充中间部分
            for (var i = index; i < fillDay; i++) {
                this.$dateTabelTd.eq(i).find(".day").removeClass("disabled").text(firstDay);
                firstDay++;
            }
            // 下个月填充
            firstDay=1;
            while (fillDay< tdLen) {
                this.$dateTabelTd.eq(fillDay).find(".day").addClass("disabled").text(firstDay);
                fillDay++;
                firstDay++;
            }
        }
    }
    return app;

});
