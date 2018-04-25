document.addEventListener("visibilitychange", function() {
	if(!document.hidden){
		location.reload();
	}
});

//提示框
function showTip(html,timer){
    timer = timer ||'2000';
    var elem = document.getElementById("popUpLayer");
    if(!elem){
        $("<div id='popUpLayer'></div>").appendTo($("body"));
    }
    var popUpLayer = $("#popUpLayer");
	popUpLayer.html(html);
    popUpLayer.fadeIn(100);
	var timer = setTimeout(function(){
		popUpLayer.fadeOut(100);
		clearTimeout(timer);
	},timer);
}
//提示框隐藏
function hideTip(){
	$('#popUpLayer').fadeOut(100);
}


//遮罩层显示
function screenShow(){
	var lockheight=document.documentElement.clientHeight,
	lockwidth=document.documentElement.clientWidth;
	$('<div id="screen"></div>').appendTo("body");
    $("#screen").css("height",lockheight).css("width",lockwidth);
    $("body").bind("touchmove",function(event){event.preventDefault;});
}
//遮罩层隐藏
function screenHide(){
    $('#screen').remove();
    $("body").unbind("touchmove",function(event){event.preventDefault;});
}


//show loading
var loading = new loader();
function loader(){
    var load_content_box = document.createElement("div");
        load_content_box.className = "preloader-indicator-modal";
        load_content_box.id = "loading_id";
    var load_content_e = document.createElement("div");
        load_content_e.className = "preloader preloader-white";
    load_content_box.appendChild(load_content_e);
    this.show = function(){
        document.body.appendChild(load_content_box);
    },
    this.hide = function(){
        try{
            load_content_box.remove();
        }catch(error){
            document.body.removeChild(load_content_box);           
        }
    } 
}


//时间戳转换为时分秒
function changeTime(time){
	//检查月、日、年、分、秒，前面加0
	function check(i){
        if(i < 10){
            i = "0" + i;
        }
        return i;
    }
    //转换时间
    var timeS = parseInt(time),
        date = new Date(timeS),
        year = date.getFullYear(),
        Month = check(date.getMonth() + 1),
        day = check(date.getDate()),
        hours = check(date.getHours()),
        minutes = check(date.getMinutes()),
        seconds = check(date.getSeconds()),
        getDate = year + "-" + Month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    return getDate;
}


//返回多少天前的日期20160701
function get_str_date(v){
    var d = new Date();
        d.setDate(d.getDate()-v);
    var y = d.getFullYear(),
        m = (d.getMonth()+1) > 9 ? d.getMonth()+1 : "0"+(d.getMonth()+1),                
        day = d.getDate() > 9 ? d.getDate() :  "0"+d.getDate();
    return y.toString() + m.toString() + day.toString();
}


//返回多少天前的日期2017-07-01
function get_date(v){
    var d = new Date();
        d.setDate(d.getDate()-v);
    var y = d.getFullYear(),
        m = (d.getMonth()+1) > 9 ? d.getMonth()+1 : "0"+(d.getMonth()+1),                
        day = d.getDate() > 9 ? d.getDate() :  "0"+d.getDate();
    return y.toString() +"-"+ m.toString() +"-"+ day.toString();
}


//返回多少月前的年月2017-07
function get_mouth(v){
    var d = new Date();
        d.setMonth(d.getMonth()-v);
    var y = d.getFullYear(),
        m = (d.getMonth()+1) > 9 ? d.getMonth()+1 : "0"+(d.getMonth()+1);
    return y.toString() +"-"+ m.toString();
}


//返回某天的时间戳   v=2014-07-10
function get_time_stamp(v){
	var stringTime = v;
	var timestamp2 = Date.parse(new Date(stringTime));
	timestamp2 = timestamp2 / 1000;
	return timestamp2;
}


//返回最近N天的数组(不含今天)
function date_arr(v){
	var day = new Date();
	var a = [],i = 0;
	while (i < v+1) {
	    var y = day.getFullYear(),
	        m = (day.getMonth()+1) > 9 ? day.getMonth()+1 : "0"+(day.getMonth()+1),                
	        d = day.getDate() > 9 ? day.getDate() :  "0"+day.getDate();		   
		a.push(y.toString() +"-"+ m.toString() +"-"+ d.toString());
	    day = new Date(day - 24 * 60 * 60 * 1000); //减去一天的毫秒数效果就是把日期往前推一天
	    i++;
	}	
	return a.slice(1);
}


//返回两个日期间隔多少天
function date_diff(date1, date2){       
    var type1 = typeof date1, type2 = typeof date2;       
    if(type1 == 'string')       
        date1 = stringToTime(date1);       
    else if(date1.getTime)       
        date1 = date1.getTime();       
    if(type2 == 'string')       
        date2 = stringToTime(date2);       
    else if(date2.getTime)       
        date2 = date2.getTime();   
    return (date2 - date1) / 1000 / 60 / 60 / 24;
}   
function stringToTime(string){       
    var f = string.split(' ', 2);       
    var d = (f[0] ? f[0] : '').split('-', 3);       
    var t = (f[1] ? f[1] : '').split(':', 3);       
    return (new Date(       
        parseInt(d[0], 10) || null,       
        (parseInt(d[1], 10) || 1)-1,       
        parseInt(d[2], 10) || null,       
        parseInt(t[0], 10) || null,      
        parseInt(t[1], 10) || null,       
        parseInt(t[2], 10) || null)).getTime();
} 



//截取后n位  不足n位前面补0   
function sliceN(num, n) {
    return (Array(n).join('0') + num).slice(-n);
}


//点击其他地方隐藏菜单
$.fn.autoHide = function(){
    var ele = $(this);
    $(document).on('touchend',function(e){
        if(ele.is(':visible') && (!$(e.target)[0].isEqualNode(ele[0]) && ele.has(e.target).length === 0)){
            ele.hide();
        }
    })
    return this;
}

//获取url上的参数
function params_arr(){
    var arr = location.search.substr(1).split("&"),params={};
    arr.forEach(function(e){
        var s = e.split("=");
        params[s[0]] = s[1];
    });    
    return params;
}


//animate.css
$.fn.extend({
    animateCss: function (animationName,fn) {
        var animationEnd =
            'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function () {
            $(this).removeClass('animated ' + animationName);
            fn ? fn() : '';
        });
    }
});


(function() {
    //设置全局字体
    var n = function() {
        var n = document.documentElement.clientWidth;
        if(n > 414) {
            n = 414
        }
        document.documentElement.style.fontSize = n / 7.5 + "px"
    };
    window.onresize = function() {
        n()
    };
    n()
})();


//返回间隔多少月
//调用：newDate('2017-08','2018-04')
function newDate(s,e){
	s = s.split('-');
	s = parseInt(s[0])*12+parseInt(s[1]);
	e = e.split('-');
	e = parseInt(e[0])*12+parseInt(e[1]);
	return (Math.abs(e-s));
}
