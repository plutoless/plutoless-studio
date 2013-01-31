var common = {
    
    dom : {
      msgBoxWrapper : 0,
      idleCounter : 0,
      busyCounter : 0
    },
    
    init : function()
    {
      common.dom.msgBoxWrapper = $('#msg-box-wrapper');
      var navLinks = $('#navigation .nav-link');
      var msgBox = $('#msg-box-wrapper');
      common.appear(navLinks, msgBox);
      common.dynamicMessage();
    },
    
    appear : function(navLinks)
    {
      navLinks.mouseenter(function(){
        var name = $(this).attr("name");
        if(name=="index")
          common.showMessage(122);
        else if(name=="post")
          common.showMessage(154);
        else if(name=="project")
          common.showMessage(148);
        else if(name=="fun")
          common.showMessage(110);
        else if(name=="contact")
          common.showMessage(138);
      });
      
    },
    
    showMessage : function(n)
    {
      var msgBoxWrapper = common.dom.msgBoxWrapper;
      if(msgBoxWrapper.hasClass('inDisplay'))
      {
        /* already in display, dim the msg box & show again with new pic */
        msgBoxWrapper.stop().fadeOut(
        { 
          duration: 200,
          complete: function(){
            var htmlStr = '<img src="public/images/msg3/'+ n + '.png"/>';
            msgBoxWrapper.find('.msg-box').html(htmlStr);
            msgBoxWrapper.fadeIn();
          }
        });
        
      }else{
        var htmlStr = '<img src="public/images/msg3/'+ n + '.png"/>';
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
      if(!msgBoxWrapper.hasClass('inDisplay'))
      {
        /* if idle */
        if(common.dom.idleCounter>0)
        {
          common.showMessage(rpic);
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
      /* self call after random time */
      setTimeout(function() {
        common.dynamicMessage();
      }, rtime);
      
    }
}