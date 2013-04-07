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
        screenMenuWrapper :0,
        screenMenuElements :0,
        subpageWrapper : 0,
        logo : 0,
        logoWrap : 0,
        newsArea : 0,
        newsContent : 0,
        newsBuf : 0
    },
    
    data : {
        keyMapping : 0,
        navMapping : 0,
        lastKey : "",
        navStr : "",
        idleCounter : 0,
        busyCounter : 0,
        newsCount : 0,
        msgList : 0,
        sampleKey : 0,
        loadLock : false,
        startup : true
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
        index.dom.subpageWrapper = index.dom.screenCanvas.find('.subpage-wrap');
        index.dom.subpageWrapperFront = $('#index-wrap .screen-index-float .subpage-wrap');
        index.dom.screenMenuCover = index.dom.screenAnimCanvas.find('.cover');
        index.dom.screenMenuWrapper = $('#index-wrap .screen-index-float .menu-wrap');
        index.dom.textArea = index.dom.screenCanvas.find('.input-wrap ul');
        index.dom.logo = index.dom.screenArea.find('.screen-logo');
        index.dom.logoWrap = index.dom.screenArea.find('.screen-index-inner');
        index.dom.keyboard = $('#index-wrap .key-board');
        
        index.getKeyMapping();
        index.getKeyboardPos();
        
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
        
        index.initializeKeyboard();
        index.initializeNews();
        /*var animList = [new $.Deferred(),new $.Deferred()];*/
        index.dom.screenArea.find('.screen-index-tips').fadeIn(1000,
            function()
            {
                /*
                $(this).fadeOut(function(){animList[0].resolve();});
                index.indexInAnim(animList[1]);
                $.when(animList[0], animList[1])
                    .done(function(){
                        index.initializeKeyboard();
                    });*/
            }
        );
        
    },
    
    indexInAnim : function(signal)
    {
        var logo = index.dom.screenArea.find('.screen-logo');
        var animList = [new $.Deferred(),new $.Deferred()
            ,new $.Deferred()];
        index.dom.logoWrap.stop(true, true).show().animate(
                {
                    "width": "175px",
                    "height": "175px",
                    "margin-top": "412px"
                },
                {
                    duration: 400,
                    easing : "easeOutExpo",
                    queue: false,
                    complete:function(){
                        animList[0].resolve();
                    }
                }

        );
        
        logo.stop(true, true).animate(
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
        index.dom.logo.stop(true, true).animate(
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
        index.dom.logoWrap.stop(true, true).animate(
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
        
        index.dom.screenAnimCanvas.stop().animate(
            {
                "top": 0
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
        );
        /*
        index.dom.screenAnimCanvas.stop(true, true).fadeIn(
            {duration: 800,complete:function(){animList[1].resolve();}})*/
        /* navigate elements in */
        
        index.dom.screenMenuWrapper.stop(true, true).
        animate({'top': 70},{queue:false})
        .fadeIn({easing: "easeInExpo"});
        /*
        $.when(animList[0], animList[1])
            .done(
            function(){
            }
        );*/
    },
    
    menuOutAnim :function(inAnim, signal)
    {
        var animList = [new $.Deferred(), new $.Deferred(), new $.Deferred()];
        
        
        index.dom.screenMenuWrapper.stop(true, true).
            animate({'top': 90},{queue:false, complete:function(){animList[0].resolve();}})
            .fadeOut();
        
        /* Anim to right */
        
        index.dom.screenAnimCanvas.stop().animate(
            {
                "top": 265
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
        );
        /*
        index.dom.screenAnimCanvas.stop(true, true).fadeOut(
            {duration: 800, complete:function(){animList[1].resolve();}})*/
        if(inAnim!=null)
        {
            inAnim(null);
            /*
            $.when(animList[0],animList[1]).done(
                function(){
                }
            );*/
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
    
    initializeNews : function()
    {
        index.dom.newsArea = $('#index-wrap .screen-index-tips .news');
        index.dom.newsContent = index.dom.newsArea.find('.news-area');
        index.dom.newsBuf = index.dom.newsArea.find('.news-buf');
        setTimeout(index.getNextNews, 3000);
    },
    
    getNextNews : function()
    {
        /* only do this when at startup screen */
        if(index.data.startup)
        {
          if(index.data.newsCount+1 >= newsList.length)
              index.data.newsCount = 0;
          else
              index.data.newsCount++;
          var newsStr = newsList[index.data.newsCount];
          var newsH = index.dom.newsArea.height();
          index.dom.newsBuf.html(newsStr);
          index.dom.newsArea.animate(
            {'scrollTop':newsH},
            {
                complete: function()
                {
                    var buf = index.dom.newsBuf.contents();
                    index.dom.newsContent.html(buf);
                    index.dom.newsArea.scrollTop(0);
                }
            }
          );
          setTimeout(index.getNextNews, 3000);
        }
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
        
        /* Attach listener */
        $(window).resize();
    },
    
    getKeyMapping : function()
    {
        
        index.data.keyMapping = {
            P: [
                {target:'project',url:'projects'},
                {target:'post',url:'post'},
                {target:'public',url:'public'}
            ],
            B: [
                {target:'blog',url:''}
            ],
            C: [
                {target:'contact',url:''}
            ],
            G: [
                {target:'game',url:'game'}
            ],
            F: [
                {target:'fightclub',url:''},
                {target:'fun',url:''}
            ]
        };
        
        index.data.navMapping = {
            project : "projects",
            post : "post",
            fun : "fun",
            contact : "contact"
        };
        /*
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
        
        if(index.data.startup)
        {
            index.data.startup = false;
            index.dom.screenArea.find('.screen-index-tips').stop(true,true).fadeOut();
            index.indexInAnim(null);
            return;
        }
        
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
          {
            index.bindKeyboardPress(key);
          }
          else
          {
            index.bindKeyboardRelease(key);
            if(index.data.navMapping[index.data.navStr]!=null)
            {
                index.navigatePage(index.data.navMapping[index.data.navStr]);
            }
            else
            {
                /* TODO */
            }
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
        index.dom.screenMenuWrapper.fadeOut(
            {
                duration: 300,
                complete : function()
                {
                    index.dom.subpageWrapper.animate(
                        {
                            "height": 265
                        },
                        {
                            duration : 600,
                            easing : "easeOutExpo",
                            complete : function()
                            {
                                common.showLoading($(this));
                                $(this).load(link, function()
                                {
                                    /*$.ajaxSetup({cache: true});*/
                                    $.ajaxSetup({cache: false});
                                    if(link=="post")
                                      $.getScript('./public/js/post.js', 
                                        function(){
                                            post.init();
                                        });
                                    if(link=="projects")
                                    {
                                      $.getScript('./public/js/project.js', 
                                        function(){
                                            project.init();
                                        });
                                    }
                                    $.ajaxSetup({cache: false});
                                    index.data.loadLock = false;
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
    
    generateMenuHTML : function(target)
    {
        return '<div class="menu-element-wrap">'+
               '<div class="menu-element-pic"><img src="'+baseUrl+
               '/public/images/menu/'+target+'.png"/></div>'+
               '<div class="menu-element-text">'+target+'</div></div>';
    },
    
    bindKeyboardCharAnim : function(object)
    {
        var name  = object.attr("name");
        if(name==null)
            name="";
        
        /*
         *
         *
         *<div class="menu-element-wrap">
                            <div class="menu-element-pic"><img src="<?php echo $this->baseUrl().'/public/images/menu/project.png'; ?>"/></div>
                            <div class="menu-element-text">project</div>
                        </div>
         *
         */
        if(index.data.navStr.length==0)
        {
            if(index.data.keyMapping[name]!=null)
            {
                index.dom.screenMenuWrapper.html("");
                for(var i = 0; i<index.data.keyMapping[name].length;i++)
                {
                    var html = 
                        index.generateMenuHTML(index.data.keyMapping[name][i]['target']);
                    $(html).appendTo(index.dom.screenMenuWrapper);
                }
            }else{
                index.dom.screenMenuWrapper
                .html('<div class="menu-message">No element for key '+name+'</div>');
            }
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
                $('<li>').html(c).css('vertical-align',15).addClass('in-use').
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
    
    clearNavStr : function()
    {
        index.data.navStr = "";
        index.dom.textArea.find('li.in-use').remove();
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