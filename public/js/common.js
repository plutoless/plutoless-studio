var common = {
    
    dom : {
      msgBoxWrapper : 0,
      idleCounter : 0,
      busyCounter : 0,
      navFocused : false
    },
    
    init : function()
    {
      common.dom.msgBoxWrapper = $('#msg-box-wrapper');
      var navLinks = $('#navigation .nav-link');
      var msgBox = $('#msg-box-wrapper');
      var msgInput = $('#say-something');
      common.prepareMessageInput(msgInput);
      common.appear(navLinks, msgBox);
      common.dynamicMessage();
    },
    
    appear : function(navLinks)
    {
      navLinks.mouseenter(function(){
        var name = $(this).attr("name");
        common.dom.navFocused = true;
        if(name=="index")
          common.showMessage(122,"");
        else if(name=="post")
          common.showMessage(154,"");
        else if(name=="project")
          common.showMessage(148,"");
        else if(name=="fun")
          common.showMessage(110,"");
        else if(name=="contact")
          common.showMessage(138,"");
      });
      navLinks.mouseleave(function(){
        common.dom.navFocused = false;
      });
      
    },
    
    prepareMessageInput : function(msgInput){
        var msgInputField = msgInput.find('.input-wrapper input');
        var msgInputSubmitButton = msgInput.find('.submit-button');
        msgInputField.focus(function(){
            if(msgInputField.val()=="Say something?")
                msgInputField.val("");
        });
        msgInputField.blur(function(){
            if(msgInputField.val()=="")
                msgInputField.val("Say something?");
        });
        msgInputSubmitButton.click(function(){
            
                common.showMessage(1,"Fill in something then:(");
        });
    },
    
    showMessage : function(n, str)
    {
        var msgBoxWrapper = common.dom.msgBoxWrapper;
      
        if(msgBoxWrapper.hasClass('inDisplay'))
        {
            var original = msgBoxWrapper.find('.msg-box').html();
            var newStr="",oriStr="";
            if(str=="")
            {
                newStr = newStr+n+'.png';
                oriStr = oriStr+original.match(/[0-9]{1,3}.png/);
            }
            else
            {
                oriStr = oriStr+original;
                newStr = newStr+'<span>'+str+'</span>';
            }
            if(oriStr!=newStr)
            {
            /* already in display & not same, dim the msg box & show again with new pic */
            msgBoxWrapper.stop().fadeOut(
            { 
                duration: 200,
                complete: function(){
                    if(str=="")
                        var htmlStr = '<img src="public/images/msg3/'+ n + '.png"/>';
                    else
                        var htmlStr = newStr;
                    msgBoxWrapper.find('.msg-box').html(htmlStr);
                    msgBoxWrapper.fadeIn();
                }
            });
            }
        }else{
            var htmlStr="";
            if(str=="")
                htmlStr = '<img src="public/images/msg3/'+ n + '.png"/>';
            else
                htmlStr = htmlStr+'<span>'+str+'</span>';
            msgBoxWrapper.find('.msg-box').html(htmlStr);
            msgBoxWrapper.addClass('inDisplay');
            msgBoxWrapper.fadeIn(
            {
                duration: 200
            }
            );
        }
    },
    
    hideMessage : function()
    {
      var msgBoxWrapper = common.dom.msgBoxWrapper;
      msgBoxWrapper.stop().fadeOut(
        {
          complete: function(){
            msgBoxWrapper.removeClass('inDisplay');
          }
        }
      );
    },
    
    dynamicMessage : function()
    {
      var msgBoxWrapper = common.dom.msgBoxWrapper;
      var rtime = Math.floor(Math.random()*6*1000);
      var rpic = Math.floor(Math.random()*244+1);
      if(!common.dom.navFocused)
      {
        if(!msgBoxWrapper.hasClass('inDisplay'))
        {
          /* if idle */
          if(common.dom.idleCounter>0)
          {
            common.showMessage(rpic, "");
            common.dom.busyCounter = 0;
            common.dom.idleCounter = 0;
          }
          common.dom.idleCounter++;
        }else{
          if(common.dom.busyCounter>1)
          {
            common.hideMessage();
            common.dom.busyCounter = 0;
            common.dom.idleCounter = 0;
          }
          common.dom.busyCounter++;
        }
      
      }
      /* self call after random time */
      setTimeout(function() {
        common.dynamicMessage();
      }, rtime);
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
        success: callback,
        error: function(e, xhr)
        {
        }
    });
}