/**
   *  获取当前时间
   * 
   * @return 返回时间类型 yyyy-MM-dd HH:mm:ss
   */
  export function sysTime(ts){
    if(!ts) return ""
    var myDate = new Date(ts);
     
    var year = myDate.getFullYear();
     
    var month = myDate.getMonth()+1;
     
    var date = myDate.getDate();
     
    var h = myDate.getHours();
     
    var m = myDate.getMinutes();
     
    var s = myDate.getSeconds();
     
    var now = year + '-' + getMakeZero(month) + "-" + getMakeZero(date) + " " + getMakeZero(h) + ':' + getMakeZero(m) + ":" + getMakeZero(s);
     
    return now;
    }
     
    
    /**
       *  时间补0
       * 
       * @return 返回时间类型 yyyy-MM-dd HH:mm:ss
       */
    
    function getMakeZero(s) {
    
     
    
        return s < 10 ? '0' + s : s;
    
    }
    