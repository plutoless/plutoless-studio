var common = {
    
    dom : {
    },

    init : function()
    {
      
    },
    
    getWrapHeight : function()
    { 
        var headerH = 80;
        /*var marginV = 40;*/
        marginV = 0;
        var result = $(window).height()-headerH-marginV-50;
        return (result>469)?result:469;
    },
    
    verticalCenter : function(object, parentObject)
    {
        var pH = parentObject.height();
        var oH = object.height();
        object.css("margin-top", (pH-oH)/2);
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

var preload = function(image_links, callback) {
  var self = this;
  // assume image_links is an array here
  var count = image_links.length;
  $.each( image_links, function(){
    $('<img/>', {
      'src': this, // url
      'load': function(){
        if( --count == 0 ) {
          callback.apply(self);
        }
      }
    });
  });      
}