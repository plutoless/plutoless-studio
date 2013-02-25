var common = {
    
    dom : {
    },

    init : function()
    {
      
    },
    
    getWrapHeight : function()
    { 
        var headerH = 80;
        var marginV = 40;
        return $(window).height()-headerH-marginV-50;
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