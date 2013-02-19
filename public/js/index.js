/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(function(){
    index.init();
});

var index = {
    
    dom : {
        keyboard : 0,
        keyboardElements : 0,
        navBar   : 0,
        msgBoxWrapper : 0,
        msgBox : 0,
        navStrWin : 0,
        overlay : 0
    },
    
    data : {
        keyMapping : 0,
        lastKey : "",
        navStr : "",
        idleCounter : 0,
        busyCounter : 0,
        msgList : 0
    },
    
    init : function()
    {
        common.init();
        index.dom.msgBoxWrapper = $('#msg-box-wrapper');
        index.dom.navStrWin = 
            $('#nav-string-wrapper');
        index.getMessage();
        index.dom.keyboard = $('#index-wrap .key-board');
        index.dom.navBar =
            $('#index-wrap .navigate-area');
        index.dom.msgBox = 
            $('#msg-box-wrapper .msg-box');
        index.dom.overlay = $('.overlay');
        index.initializeKeyboard();
        index.getKeyMapping();
        index.turnup(index.dom.keyboard);
        
        /* Attach listener */
        $(window).resize(index.getKeyboardPos);
        

    },
    
    initializeKeyboard : function()
    {
        index.getKeyboardPos();
        index.dom.keyboardElements = 
            $('#index-wrap .key-board .key-element-content');
        index.dom.keyboardElements.hover(
            function()
            {
                $(this).addClass("hover");
            },
            function()
            {
                $(this).removeClass("hover");
            }
        );
        index.dom.keyboardElements.click(
            function()
            {
                if($(this).attr("name")!=null)
                {
                    index.bindKeyboardMenuAnim($(this));
                }
            }
        );
        $(document).keydown(function(e){index.bindKeyboardActions(e);});
    },
    
    getKeyMapping : function()
    {
        index.data.keyMapping = {
            P: $('.navigate-area .P').position().top,
            B: $('.navigate-area .B').position().top,
            C: $('.navigate-area .C').position().top,
            G: $('.navigate-area .G').position().top,
            F: $('.navigate-area .F').position().top
        };
        index.setKeyColors();
        /*
        $('#key-Q .key-element-content').addClass('color1');
        $('#key-W .key-element-content').addClass('color1');
        $('#key-T .key-element-content').addClass('color1');
        $('#key-Y .key-element-content').addClass('color3');
        $('#key-U .key-element-content').addClass('color4');
        $('#key-I .key-element-content').addClass('color1');
        $('#key-E .key-element-content').addClass('color2');
        $('#key-R .key-element-content').addClass('color2');
        $('#key-O .key-element-content').addClass('color2');
        
        $('#key-A .key-element-content').addClass('color6');
        $('#key-S .key-element-content').addClass('color2');
        $('#key-D .key-element-content').addClass('color1');
        $('#key-H .key-element-content').addClass('color6');
        $('#key-J .key-element-content').addClass('color4');
        $('#key-K .key-element-content').addClass('color3');
        $('#key-L .key-element-content').addClass('color3');
        
        $('#key-Z .key-element-content').addClass('color2');
        $('#key-X .key-element-content').addClass('color5');
        $('#key-V .key-element-content').addClass('color1');
        $('#key-N .key-element-content').addClass('color3');
        $('#key-M .key-element-content').addClass('color1');
        
        $('#key-< .key-element-content').addClass('color3');
        $('#key-> .key-element-content').addClass('color1');*/
    },
    
    getKeyboardPos : function()
    {
        /*
        var windowH = $(window).height();
        var windowW = $(window).width();
        var keyboardH = index.dom.keyboard.height();
        var keyboardW = index.dom.keyboard.width();
        var spaceH = $('#header').height();
        var spaceW = 60;
        var paddingV = (windowH - spaceH*2-keyboardH)/2;
        var paddingH = (windowW - spaceW*2-keyboardW)/2;
        var dom = $('#index-wrap');
        dom.css("padding", paddingV+"px "+paddingH+"px");
        /*$('#header').css("height", (windowH-keyboardH)/2);*/
    },
    
    bindKeyboardActions : function(e)
    {
        e.preventDefault();
        if(e.keyCode >=65 && e.keyCode <=90)
        {
          /* IT'S CHAR CODE */
          var c = String.fromCharCode(e.keyCode).toUpperCase();
          var key = $('#key-'+c+' .key-element-content');
          
          index.bindKeyboardMenuAnim(key);
        }
    },
    
    
    
    bindKeyboardMenuAnim : function(object)
    {
        
        var head = index.dom.navBar.find('.navigate-tips');
        var name  = object.attr("name");
        
        
        
        if(name == index.data.lastKey)
        {
            /* second attempt revert to initial */
            index.revertKey();
            index.data.lastKey = "";
            head.stop().animate(
                {"margin-top": [0,"easeInOutExpo"]},
                {duration: 800}
            );
        }
        else
        {
            index.revertKey();
            index.selectKey(object);

            if(index.data.keyMapping[name]!=null)
                head.stop().animate(
                    {"margin-top": ["-"+index.data.keyMapping[name]+"px","easeInOutExpo"]},
                    {duration: 800}
                );
            else
                head.stop().animate(
                    {"margin-top": [0,"easeInOutExpo"]},
                    {duration: 800}
                );
        }
        
    },
    
    setKeyColors : function()
    {
        $('#key-P .key-element-content').addClass('color2');
        $('#key-C .key-element-content').addClass('color3');
        $('#key-F .key-element-content').addClass('color5');
        $('#key-G .key-element-content').addClass('color6');
        $('#key-B .key-element-content').addClass('color4');
    },
    
    navStrPopUp : function(object)
    {
        var offsetH = object.offset().left;
        var offsetV = object.offset().top;
        index.dom.navStrWin.css("left",offsetH-68);
        index.dom.navStrWin.css("top",offsetV-160);
        var navContent = index.dom.navStrWin.find('.nav-string-content');
        var navTri = index.dom.navStrWin.find('.nav-string-tri');
        
        navContent.css("width", 0).css("height", 0).css("margin-top", 140)
            .css("margin-left", 100);
        navTri.css("border-left","0 solid transparent")
                .css("border-right","0 solid transparent")
                .css("border-top","0 solid #333").css("left", 92);
        navTri.stop().animate(
        
            {
                "border-left-width": "10px",
                "border-right-width": "10px",
                "border-top-width": "16px",
                "left": "84px"
            },
            
            {
                duration: 1000,
                easing: "easeOutElastic"
            }
        );
        navContent.stop().animate(
        
            {
                "width": 200,
                "height": 140,
                "margin-top": 0,
                "margin-left": 0
            },
            
            {
                duration: 1000,
                easing: "easeOutElastic"
            }
        );
        
    },
    
    selectKey : function(object)
    {
        var offsetH = object.offset().left;
        var offsetV = object.offset().top;
        object.removeClass('hover');
        var keyColor = object.css("background-color");
        var navSelectWrapper = $('<div>').appendTo('body')
            .addClass('nav-select-wrapper');
        var navSelectBack = $('<div>').appendTo(navSelectWrapper)
            .addClass('nav-select-background');
        var navSelectInner = $('<div>').appendTo(navSelectBack)
            .addClass('nav-inner').css("background-color", keyColor);
        navSelectWrapper.css("left",offsetH+10);
        navSelectWrapper.css("top",offsetV+4);
        
        index.navStrPopUp(object);
        
        navSelectInner.animate(
            {
                "width":"36px",
                "height":"36px",
                "margin-top": "0",
                "margin-left": "0"
            },
            {
                duration: 400,
                complete: function()
                {
                    navSelectWrapper.remove();
                }
            }
        );
        index.data.lastKey = object.attr("name");
    },
    
    revertKey : function()
    {
        /*
        index.dom.keyboardElements.removeClass('selected');
        index.setKeyColors();*/
    },
    
    turnup : function(object)
    {
        var toPosH = object.css("margin-top");
        var fromPosH = toPosH - 40;
        object.css("mragin-top", fromPosH);
        object.animate(
            {
                opacity: 1, 
                "margin-top": "+=20px"
            },
            {
                duration: 600
            }
        );
    },
    
    
    getMessage : function()
    {
        sendAjaxCall("./index/getmessage/format/json",
                    "get",
                    {},
                    function(r){
                      index.data.msgList = r;
                      index.dynamicMessage();
                    }
        );
    },
    
    showMessage : function(str)
    {
        var msgBox = index.dom.msgBox.find('.text');
        msgBox.fadeOut(function(){msgBox.html(str);});
        msgBox.fadeIn();
    },
    
    dynamicMessage : function()
    {
      var rmsg = Math.floor(Math.random()*index.data.msgList.length);
      if(index.data.msgList[rmsg].content!=null)
        index.showMessage(index.data.msgList[rmsg].content);
      
      /* self call after random time */
      setTimeout(function() {
        index.dynamicMessage();
      }, 5000);
    }

}