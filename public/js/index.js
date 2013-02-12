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
        keyboardMenus   : 0,
        overlay : 0
    },
    
    data : {
        keyMapping : new Array()
    },
    
    init : function()
    {
        common.init();
        index.dom.keyboard = $('#index-wrap .key-board');
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
        index.dom.keyboardMenus =
            $('.nav-menu');
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
        $(document).keypress(function(e){index.bindKeyboardActions(e);});
    },
    
    getKeyMapping : function()
    {
        index.data.keyMapping = {
            P: ["project", "post"],
            C: ["contact"],
            F: ["fun"],
            G: ["game"],
            B: ["blog"]
        };
        $('#key-P .key-element-content').addClass('color2');
        $('#key-C .key-element-content').addClass('color3');
        $('#key-F .key-element-content').addClass('color5');
        $('#key-G .key-element-content').addClass('color6');
        $('#key-B .key-element-content').addClass('color4');
        
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
        $('#key-> .key-element-content').addClass('color1');
    },
    
    getKeyboardPos : function()
    {
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
        if(e.keyCode >=97 && e.keyCode <=122)
        {
          /* IT'S CHAR CODE */
          var c = String.fromCharCode(e.keyCode).toUpperCase();
          var key = $('#key-'+c+' .key-element-content');
          
          index.bindKeyboardMenuAnim(key);
        }
    },
    
    bindKeyboardMenuAnim : function(object)
    {
        if(!object.hasClass("selected"))
        {
            index.dom.keyboardMenus.hide();
            index.dom.keyboardElements.removeClass("selected");
            object.addClass("selected");
        }
        else
            object.removeClass("selected");
        var literal = object.attr("name");
        var links = index.data.keyMapping[literal];
        if(links==null)
            links = ["default"];
        index.dom.overlay.show(0);
        var x = object.offset().left;
        var y = object.offset().top;
        var menuH = $('#nav-menu-0').height();
        var keyW = object.width();
        var menuW = $('#nav-menu-0').width();
        var animTime = 500;
        for(var i = 0; i<links.length; i++)
        {
            var navElement = $('#nav-menu-'+i);
            var moveLeft = 0;
            var moveTop = 0;
            
            if(object.hasClass("selected"))
            {
                navElement.css("display", "block");
                navElement.css("opacity", 0);
                navElement.css("left", x+(keyW-menuW)/2+1);
                navElement.css("top", y);
                if(i == 0 && links.length == 1)
                    moveLeft = 0;
                else if(links.length % 2 == 0)
                {  
                    if(i % 2 == 1)
                        moveLeft = -(menuW/2+2.5+Math.floor(i/2)*menuW+
                            (Math.floor(i/2)>0?1:0)*5);
                    else
                        moveLeft = menuW/2+2.5+Math.floor(i/2)*menuW+
                            (Math.floor(i/2)>0?1:0)*5;

                }
                else if(links.length % 2 == 1)
                {
                    if(i == 0)
                        moveLeft = 0;
                    else if(i % 2 == 1)
                        /* LEFT */
                        moveLeft = -((i+1)/2*(menuW+5));
                    else if(i % 2 == 0)
                        moveLeft = i/2*(menuW+5);

                }
                moveTop = y-menuH-5;
                /*
                navElement.find('.key-menu-content').css("background",
                        'url("public/images/'+links[i]+'.png") no-repeat center center');*/
            
                navElement.css("top", moveTop);
                navElement.stop().animate(
                    {"opacity": 1, "left": "-="+moveLeft},
                    {
                        duration: animTime,
                        easing:  "swing",
                        complete: function(){
                            index.dom.overlay.hide();
                        }
                    }
                );
            }else
            {
              moveLeft = x+(keyW-menuW)/2+1;
              navElement.stop().animate(
                    {"opacity": 0, "left": moveLeft},
                    {
                        duration: animTime,
                        complete: function(){
                            index.dom.overlay.hide();
                            navElement.hide();
                        }
                    }
                );
            }
            
            

        }
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
    }

}