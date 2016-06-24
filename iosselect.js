$(function(){
    var selcTime = function(setYear, setMonth, setDay, thisYear, thisMonth, selecm){
        var setYear=setYear||0, setMonth=setMonth||0, setDay=setDay||0,thisYear=thisYear||0,selecm=selecm||0;
        var date = new Date();
        var y = date.getFullYear(), m = date.getMonth() + 1, d = date.getDate(),
        yearHtml = '', monthHtml = '', dayHtml='';

        for(var i=0;i<20;i++){ //year
            var yy = y - i;
            yearHtml += '<li data="'+yy+'">'+yy+'年</li>';
        }
        for(var i=12;i>0;i--){ //month
            if(thisYear){
                if(i<=m){
                    var monthshow = (i<10)?'0'+i:i;
                    monthHtml += '<li data="'+monthshow+'">'+monthshow+'月</li>';
                }
            }else{
                var monthshow = (i<10)?'0'+i:i;
                monthHtml += '<li data="'+monthshow+'">'+monthshow+'月</li>';
            }
        }
        var daylong = (selecm==0)?31:(selecm==2)?29:30;
        //console.log('selecm:'+daylong);
        for(var i=daylong;i>0;i--){
            if(thisMonth){
                if(i <= d){
                    var dayshow = (i<10)?'0'+i:i;
                    dayHtml += '<li data="'+dayshow+'">'+dayshow+'日</li>';
                }
            }else{
                var dayshow = (i<10)?'0'+i:i;
                dayHtml += '<li data="'+dayshow+'">'+dayshow+'日</li>';
            }
        }
        
        //setting
        if(setYear){
            $('.time-select .year').html(yearHtml);
        }
        if(setMonth){
            $('.time-select .month').html(monthHtml);
        }
        if(setDay){
            $('.time-select .day').html(dayHtml);
        }
    }
    //底部时间滚动
    selcTime(1,1,1,1,1); //all
    //begin
    var findexYear = 0, findexMonth = 0, findexDay = 0;
    mufn.iosSelect($('.ios-select'), $('.ios-select .selec-ul.year'), function(index, diffY){
        //alert(index);
        if(findexYear==0 && index<0){
            selcTime(0,1,1,0,0);
            findexMonth = 0;findexDay = 0;
            $('.ios-select .selec-ul.month').removeAttr('style');
            $('.ios-select .selec-ul.day').removeAttr('style');
        }else if(index==0){
            selcTime(0,1,1,1,1);
            findexMonth = 0;findexDay = 0;
            $('.ios-select .selec-ul.month').removeAttr('style');
            $('.ios-select .selec-ul.day').removeAttr('style');
        }
        findexYear = index;
        setResult();
    });
    mufn.iosSelect($('.ios-select'), $('.ios-select .selec-ul.month'), function(index, diffY){
        var selecm = $('.ios-select .selec-ul.month li').eq(Math.abs(index)).attr('data');
        selecm = parseInt(selecm);
        if(findexMonth==0 && index<0){
            selcTime(0,0,1,0,0);
            findexDay = 0;
            $('.ios-select .selec-ul.day').removeAttr('style');
        }else if(findexYear==0 && index==0){
            selcTime(0,0,1,1,1);
            findexDay = 0;
            $('.ios-select .selec-ul.day').removeAttr('style');
        }
        if(selecm==02||selecm==04||selecm==06||selecm==09||selecm==11){
            selcTime(0,0,1,0,0,selecm);//将选择的月份传入
            findexDay = 0;
        }else{
            selcTime(0,0,1,0,0);
            findexDay = 0;
            $('.ios-select .selec-ul.day').removeAttr('style');
        }
        findexMonth = index;
        setResult();
    });
    mufn.iosSelect($('.ios-select'), $('.ios-select .selec-ul.day'), function(index, diffY){
        findexDay = index;
        setResult();
    });
    function setResult(){
        $('.select-value .vyear').html($('.ios-select .selec-ul.year li').eq(Math.abs(findexYear)).html());
        $('.select-value .vmonth').html($('.ios-select .selec-ul.month li').eq(Math.abs(findexMonth)).html());
        $('.select-value .vday').html($('.ios-select .selec-ul.day li').eq(Math.abs(findexDay)).html());
    }
    //11


    //底部时间关闭打开
    $('.ios-select .comfirm').on('touchend',function(event){
        event.preventDefault();
        $('.ios-select').animate({bottom:"-600px"});
        setTimeout(function(){
            $('.black-cover').addClass('hide');
        },400);
        var fselectedYear = $('.ios-select .selec-ul.year li').eq(Math.abs(findexYear)).attr('data');
        var fselectedMonth = $('.ios-select .selec-ul.month li').eq(Math.abs(findexMonth)).attr('data');
        var fselectedDay = $('.ios-select .selec-ul.day li').eq(Math.abs(findexDay)).attr('data');
        //alert();
        $('.info-time .ipt').val(fselectedYear +'-'+ fselectedMonth +'-'+ fselectedDay);
    });
    $('.ios-select .cancel,.black-cover').on('touchend',function(event){
        event.preventDefault();
        $('.ios-select').animate({bottom:"-600px"});
        setTimeout(function(){
            $('.black-cover').addClass('hide');
        },400);
    });
    $('.info-time').on('touchend',function(event){
        event.preventDefault();
        $('.black-cover').removeClass('hide');
        $('.ios-select').animate({bottom:"0"});
    });

    $('.goback').on('touchend',function(event){
        window.history.go(-1);
        event.stopPropagation();//阻止冒泡
    });
});