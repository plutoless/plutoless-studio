var common = {
    
    dom : {
      msgInputWrap : 0
    },

    data : {
      inmsg: false
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
    
    /* if return true, stop further key binding */
    commonKeyBindOverride : function(e, action)
    {
        var preventDefault = false;
        var key = 0;
        
        if(e.keyCode == 17)
        {
          /* IT'S CTRL(MSG) key */
          /*
          key = $('#key-messages .key-element-content');
          if(!action)
          {
            index.bindKeyboardPress(key);
            common.data.inmsg = !common.data.inmsg;
            if(common.data.inmsg)
            {
              common.dom.msgInputWrap.stop().animate(
                {'bottom': 0},
                {
                    complete:function(){
                        common.dom.msgInputWrap.find('textarea').focus();
                    }
                }
              );
              
            }
            else
            {
              common.dom.msgInputWrap.stop().animate(
                {'bottom': -40},
                {
                    complete:function(){
                        common.dom.msgInputWrap.find('textarea').blur();
                    }
                }
              );*/
              /*common.dom.msgInputWrap.find('textarea').blur();*/
            /*}
          }
          else
          {
            index.bindKeyboardRelease(key);
          }*/
            preventDefault = true;
        }
        
        return preventDefault;
    },
    
    verticalCenter : function(object, parentObject)
    {
        var pH = parentObject.height();
        var oH = object.height();
        object.css("margin-top", (pH-oH)/2);
    },
    
    backToIndex : function()
    {
        $(document).off();
        $(window).off();
        common.clearHints();
        index.dom.subpageWrapper.animate(
           {height: 0},
           {
               duration: 600,
               easing: "easeOutExpo",
               complete: function(){
                   $(this).html("");
               }
           }
        );
        index.clearNavStr();
        index.initializeKeyboard();
        index.MenuOutIndexIn();
    },
    
    showLoading: function(area)
    {
        var h = area.height();
        var w = area.width();
        var loadingHtml = $('<div>').css('width', w).css('height',h).addClass('loading');
        area.html(loadingHtml);
    },
    
    generateHints:function(hints)
    {
        common.clearHints();
        for(var i = 0; i<hints.length; i++)
        {
            var k = hints[i]['key'];
            var v = hints[i]['val'];
            var key = $('#key-'+k);
            if(key!=undefined)
            {
                var keyLeft = key.offset().left;
                var keyTop = key.offset().top;
                var keyWidth = key.width();
                $('<div>').addClass('key-hint').css('left',keyLeft)
                    .css('width',keyWidth).css('top', keyTop-6)
                    .html(v).appendTo($('#key-hint-wrap'));
            }
        }
    },
    
    
    clearHints:function(){
        $('#key-hint-wrap').html('');
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