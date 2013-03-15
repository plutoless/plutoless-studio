/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(function(){
    index.init();
});

var index = {
    
    dom : {
        mainContent : 0,
        keyboard : 0,
        keyboardElements : 0,
        navBar   : 0,
        msgBoxWrapper : 0,
        msgBox : 0,
        navStrWin : 0,
        overlay : 0,
        textArea : 0,
        screenArea : 0,
        screenCanvas : 0,
        screenAnimCanvas : 0,
        screenMenuCover :0,
        screenMenuElements :0,
        logo : 0,
        logoWrap : 0
    },
    
    data : {
        keyMapping : 0,
        navMapping : 0,
        lastKey : "",
        navStr : "",
        idleCounter : 0,
        busyCounter : 0,
        msgList : 0,
        sampleKey : 0,
        loadLock : false
    },
    
    init : function()
    {
        common.init();
        
        index.dom.mainContent = $('#content');
        
        
        index.getKeyboardPos();
        /*
        index.getMessage();*/
        index.dom.screenArea = $('#index-wrap .screen-index');
        index.dom.screenCanvas = $('#index-wrap .screen-index-back');
        index.dom.screenAnimCanvas = index.dom.screenCanvas.find('.bg-wrap');
        index.dom.screenMenuCover = index.dom.screenAnimCanvas.find('.cover');
        index.dom.screenMenuElements = $('#index-wrap .screen-index-float .menu-wrap .menu-element-wrap');
        index.dom.screenMenuElements.hide();
        index.dom.textArea = index.dom.screenCanvas.find('.input-wrap ul');
        index.dom.logo = index.dom.screenArea.find('.screen-logo');
        index.dom.logoWrap = index.dom.screenArea.find('.screen-index-inner');
        index.dom.keyboard = $('#index-wrap .key-board');
        
        index.getKeyMapping();
        
        /* Attach listener */
        $(window).resize(index.getKeyboardPos);
        
        /* START ANIM */
        
        preload([
            baseUrl+'/public/images/logo.png',
            baseUrl+'/public/images/battery.png',
            baseUrl+'/public/images/tips/tips_'+randTip+'.jpg',
            baseUrl+'/public/images/wallpaper/default.jpg'
        ], index.indexTipsInAnim);
        
        
        
    },
    
    indexTipsInAnim : function()
    {
        var animList = [new $.Deferred(),new $.Deferred()];
        index.dom.screenArea.find('.screen-index-tips').fadeIn(2000,
            function()
            {
                $(this).fadeOut(function(){animList[0].resolve();});
                index.indexInAnim(animList[1]);
                $.when(animList[0], animList[1])
                    .done(function(){
                        index.initializeKeyboard();
                    });
            }
        );
        
    },
    
    indexInAnim : function(signal)
    {
        var logo = index.dom.screenArea.find('.screen-logo');
        var animList = [new $.Deferred(),new $.Deferred()
            ,new $.Deferred()];
        
        index.dom.logoWrap.show().stop().animate(
                {
                    "width": "175px",
                    "height": "175px",
                    "margin-top": "412px"
                },
                {
                    duration: 400,
                    easing : "easeOutExpo",
                    complete:function(){
                        animList[0].resolve();
                    }
                }

        );
        
        logo.stop().animate(
            {
                "top" : "412px"
            },

            {
                duration: 600,
                queue: false,
                complete:function(){
                    animList[1].resolve();
                }
            }
        ).fadeIn(function(){animList[2].resolve();});
        /* Do not bind keyboard action before in anim finished */
        
        $.when(animList[0], animList[1], animList[2])
            .done(function(){if(signal!=null)signal.resolve();});
    },
    
    indexOutAnim :function(signal)
    {
        var animList = [new $.Deferred(),
            new $.Deferred(), new $.Deferred()];
        index.dom.logo.stop().animate(
            {
                "top" : "380px"
            },
            {
                duration: 300,
                queue: false,
                easing : "easeInBack",
                complete : function()
                {
                    animList[0].resolve();
                }
            }
        ).fadeOut({complete:function(){animList[1].resolve();}});
        index.dom.logoWrap.stop().animate(
            {
                "width": 0,
                "height": 0,
                "margin-top": "500px"
            },
            {
                duration: 400,
                queue: false,
                easing : "easeInExpo",
                complete : function()
                {
                    $(this).hide();
                    animList[2].resolve();
                }
            }
        );
        $.when(animList[0], animList[1], animList[2])
            .done(function(){if(signal!=null)signal.resolve();});
    },
    
    menuInAnim :function(out, signal, name)
    {
        var animList = [new $.Deferred(), new $.Deferred()];
        
        if(out!=null)
            out(animList[0]);
        /* Anim from right */
        /*
        index.dom.screenAnimCanvas.stop().animate(
            {
                "left": 0
            },
            {
                duration: 600,
                queue: false,
                easing : "easeOutExpo",
                complete : function()
                {
                    animList[1].resolve();
                }
            }
        );*/
        index.dom.screenAnimCanvas.stop().fadeIn(
            {duration: 600,queue:false, complete:function(){animList[1].resolve();}})
        /* navigate elements in */
        $.when(animList[0], animList[1])
            .done(
            function(){
                if(index.data.navStr!="")
                  index.dom.screenMenuElements.stop().
                    animate({'margin-top': 0},{queue:false})
                    .fadeIn();
            }
        );
    },
    
    menuOutAnim :function(inAnim, signal)
    {
        var animList = [new $.Deferred(), new $.Deferred(), new $.Deferred()];
        
        
        index.dom.screenMenuElements.stop().
            animate({'margin-top': 20},{queue:false, complete:function(){animList[0].resolve();}})
            .fadeOut();
        
        /* Anim to right */
        /*
        index.dom.screenAnimCanvas.stop().animate(
            {
                "left": 780
            },
            {
                duration: 600,
                queue: false,
                easing : "easeInExpo",
                complete : function()
                {
                    animList[1].resolve();
                }
            }
        );*/
        index.dom.screenAnimCanvas.stop().fadeOut(
            {duration: 600,queue:false, complete:function(){animList[1].resolve();}})
        if(inAnim!=null)
        {
            $.when(animList[0],animList[1]).done(
                function(){
                    inAnim(null);
                }
            );
        }
    },
    
    indexOutMenuIn:function(name)
    {
        index.menuInAnim(index.indexOutAnim, null, name);
    },
    
    MenuOutIndexIn:function()
    {
        index.menuOutAnim(index.indexInAnim, null);
    },
    
    initializeKeyboard : function()
    {
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

        ).css("cursor","pointer");
        
        index.dom.keyboardElements.mousedown(
            function()
            {
                $(this).addClass("selected");
            }
        );
        index.dom.keyboardElements.mouseup(
            function()
            {
                $(this).removeClass("selected");
            }
        );    
        
        
        index.dom.keyboardElements.click(
        /*
            function()
            {
                if($(this).attr("name")!=null)
                {
                    index.bindKeyboardMenuAnim($(this));
                }
            }*/
        );
        $(document).keydown(function(e){index.bindKeyboardActions(e,false);});
        $(document).keyup(function(e){index.bindKeyboardActions(e,true)});
    },
    
    getKeyMapping : function()
    {
        
        index.data.keyMapping = {
            P: [
                {name:'project',url:'project'},
                {name:'post',url:'post'},
                {name:'public',url:'public'}
            ],
            B: [
                {name:'blog',url:''}
            ],
            C: [
                {name:'contact',url:''}
            ],
            G: [
                {name:'game',url:'game'}
            ],
            F: [
                {name:'fightclub',url:''}
            ]
        };
        /*
        index.data.navMapping = {
            project : "projects",
            post : "post",
            fun : "fun",
            contact : "contact"
        };
        index.setKeyColors();
        
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
      var boardH = index.dom.mainContent.height();
      var winH = $(window).height();
      index.dom.mainContent.css("margin-top", (winH-boardH)/2);
    },
    
    bindKeydownActions : function(e)
    {
        
    },
    
    bindKeyboardActions : function(e, action)
    {
        var preventDefault = false;
        var key = 0;
        
        if(e.keyCode >=65 && e.keyCode <=90)
        {
          /* IT'S CHAR CODE */
          var c = String.fromCharCode(e.keyCode).toUpperCase();
          key = $('#key-'+c+' .key-element-content');
          if(!action)
          {
            index.bindKeyboardPress(key);
            index.bindKeyboardCharAnim(key);
          }
          else
          {
            index.bindKeyboardRelease(key);
            index.dom.textArea.find('li').
                animate({'vertical-align':0},{duration:800,easing:"easeOutBounce"});
          }
          preventDefault = true;
        }
        
        if(e.keyCode == 8)
        {
          /* BACKSPACE */
          key = $('#key-backspace .key-element-content');
          
          if(!action)
          {
            index.bindKeyboardPress(key);
            if(index.data.navStr.length>0)
            {
                index.removeNavStr();
                if(index.data.navStr.length==0)
                {
                    index.MenuOutIndexIn();
                }
            }
          }
          else
          {
            index.bindKeyboardRelease(key);
          }
          preventDefault = true;
        }
        
        if(e.keyCode == 13)
        {
          /* ENTER */
          key = $('#key-enter .key-element-content');
          if(!action)
            index.bindKeyboardPress(key);
          else
            index.bindKeyboardRelease(key);
          if(index.data.navMapping[index.data.navStr]!=null)
              index.navigatePage(index.data.navMapping[index.data.navStr]);
          else
          {
              /* TODO */
          }
          preventDefault = true;
        }
        
        if(preventDefault)
            e.preventDefault();
        
    },
    
    navigatePage : function(link)
    {
        if(!index.data.loadLock)
            index.data.loadLock = true;
        else
            return;
        
        $(document).off();
        $(window).off();
        var navElements = index.dom.navBar.find('.navigate-menu-wrap')
        navElements.stop().animate(
            {"opacity": 0},
            {
                duration: 400,
                step : function()
                {
                    index.dom.keyboard.css("opacity", $(this).css("opacity"));
                },
                complete : function()
                {
                    index.dom.keyboard.hide();
                    $(this).hide();
                    var h = common.getWrapHeight();
                    index.dom.navBar.animate(
                        {
                            height: h
                        },
                        {
                            duration : 800,
                            easing : "easeOutExpo",
                            complete : function()
                            {
                                index.dom.navBar.find('.content-wrap')
                                    .load(link, function()
                                {
                                    $.ajaxSetup({cache: true});
                                    $.getScript('./public/js/post.js', 
                                        function(){
                                            post.init();
                                        });
                                    $.ajaxSetup({cache: false});
                                });
                            }
                        }
                    );
                }
            }

        );
    },
    
    bindKeyboardPress : function(object)
    {
        if(!object.hasClass('selected'))
            object.addClass('selected');
    },
    
    bindKeyboardRelease : function(object)
    {
        if(object.hasClass('selected'))
            object.removeClass('selected');
    },
    
    bindKeyboardCharAnim : function(object)
    {
        var name  = object.attr("name");
        if(name==null)
            name="";
        
        
        if(index.data.navStr.length==0)
        {
            var c = name.toLowerCase();
            index.indexOutMenuIn(c);
            index.appendNavStr(name);
        }else if(index.data.navStr.length>0)
        {
            index.appendNavStr(name);
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
    
    
    appendNavStr : function(name)
    {
        if(name!="")
        {
            var c = name.toLowerCase();
            if(index.data.navStr.length <=15)
            {
                index.data.navStr = index.data.navStr + c;
                $('<li>').html(c).css('vertical-align',20).addClass('in-use').
                    appendTo(index.dom.textArea);
            }
        }
    },
    
    removeNavStr : function()
    {
        if(index.data.navStr.length > 0)
            index.data.navStr = index.data.navStr.substring(0, index.data.navStr.length-1);
        index.dom.textArea.find('li.in-use').last().removeClass('in-use')
            .fadeOut({duration: 200,complete:function(){$(this).remove();},queue:false});
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