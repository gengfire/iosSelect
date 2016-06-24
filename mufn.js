/*! mufn v1.1  | mumoon.cn/license */
var mufn = {
    touchfn: function(obj, startfn, movefn, endfn, ismove){
        var obj = obj[0], startX, startY, moveX, moveY, endX, endY, diffX, diffY, startTime;
        var ismove = ismove || 8695;
        function touchEvent(ev) {
            var event = ev || event;
            switch (event.type) {
            case "touchstart":
                if(ismove==8695) event.preventDefault();
                startTime =  new Date().getTime();
                startX = event.touches[0].clientX;
                startY = event.touches[0].clientY;
                startfn && startfn(startX, startY);
                break;
            case "touchmove":
                if(ismove==8695) event.preventDefault();
                moveX = event.touches[0].clientX;
                moveY = event.touches[0].clientY;
                diffX =  moveX - startX;
                diffY =  moveY - startY;
                movefn && movefn(diffX, diffY, moveX);
                break;
            case "touchend":
                if(ismove==8695) event.preventDefault();
                var diffTime = new Date().getTime() - startTime;
                endp = event.changedTouches[0].clientX;
                endX = event.changedTouches[0].clientX - startX;
                endY = event.changedTouches[0].clientY - startY;
                var speed =  Math.abs(1000 * endY/diffTime);  
                endfn && endfn(endX, endY, endp, speed);
                break;
            }
        }
        obj.addEventListener("touchstart", touchEvent, false);
        obj.addEventListener("touchmove", touchEvent, false);
        obj.addEventListener("touchend", touchEvent, false);
    },
    iosSelect : function(selecObj, selcUl, callback){
        var min = parseInt(selcUl.get(0).offsetLeft),
            max = min + parseInt(selcUl.width()),
            liHeight = selcUl.find('li').eq(0).height(),
            liSize = 0, ulY = 0,
            touchObj = selcUl.next('.gradient');
        this.touchfn(touchObj, function(){  //start
            ulY = parseInt(selcUl.attr('data'));
            liSize = selcUl.find('li').size();
        },function(diffX, diffY, movep){    //move
            var move = ulY + diffY;
            selcUl.attr('data',move).removeAttr('style').css({
                '-webkit-transform':'translateY('+move+'px)',
                '-webkit-transition-duration': '50ms'
            });
        },function(endX, endY, endp, speed){  //end
            var numAfter = (speed > 500) ? Math.floor(speed/200) : 1;
            var duration = (speed > 500) ? '0.8s' : '0.3s';
            var move = ulY + (numAfter * endY);
            var moveSize =  Math.round(move/liHeight);
            var index = moveSize<(1-liSize)?(1-liSize):moveSize>0?0:moveSize;
            move = index * liHeight;
            selcUl.attr('data',move).removeAttr('style').css({
                '-webkit-transform':'translateY('+move+'px)',
                '-webkit-transition-duration': duration
            });
            var seleCur = Math.abs(index);
            selcUl.find('li').removeAttr('style');
            selcUl.find('li').eq(seleCur).css('font-size','16px');
            callback(index, endY);
        });
    }
};