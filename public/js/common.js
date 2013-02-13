var common = {
    
    dom : {
      msgBoxWrapper : 0,
      idleCounter : 0,
      busyCounter : 0,
      msgList : 0
    },

    init : function()
    {
      common.dom.msgBoxWrapper = $('#msg-box-wrapper');
      common.getMessage();
    },
    
    getMessage : function()
    {
        sendAjaxCall("./index/getmessage/format/json",
                    "get",
                    {},
                    function(r){
                      common.dom.msgList = r;
                      common.dynamicMessage();
                    }
        );
    },
    
    showMessage : function(str)
    {
        var msgBox = common.dom.msgBoxWrapper.find('.text');
        msgBox.fadeOut(function(){msgBox.html(str);});
        msgBox.fadeIn();
    },
    
    dynamicMessage : function()
    {
      var rmsg = Math.floor(Math.random()*common.dom.msgList.length);
      if(common.dom.msgList[rmsg].content!=null)
        common.showMessage(common.dom.msgList[rmsg].content);
      
      /* self call after random time */
      setTimeout(function() {
        common.dynamicMessage();
      }, 5000);
    }
    

}

function sendAjaxCall(url,type,data,callback){
    $.ajax(
    {
        url: url,
        cache: false,
        dataType: 'json',
        type: type,
        data: data,
        success: function(r){
          callback(r);
        },
        error: function(e, xhr)
        {
        }
    });
}