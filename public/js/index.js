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
                $(this).addClass("color2");
            },
            function()
            {
                $(this).removeClass("color2");
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
            P: ["project", "post", "public"],
            C: ["contact", "Test", "Test", "Test"],
            F: ["fun","Test"],
            G: ["game","contact", "Test", "Test", "Test"],
            B: ["blog"]
        };
        $('#key-P .key-element-content').addClass('nav-color2');
        $('#key-B .key-element-content').addClass('nav-color2');
        $('#key-C .key-element-content').addClass('nav-color2');
        $('#key-F .key-element-content').addClass('nav-color2');
    },
    
    getKeyboardPos : function()
    {/*
        var windowH = $(window).height();
        var keyboardH = index.dom.keyboard.height();
        var headerH = $('#header').height();
        alert(headerH);
        index.dom.keyboard.css("margin-top", (windowH-keyboardH)/2-headerH);*/
        index.dom.keyboard.css("margin-top", "140px");
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
        
        index.dom.keyboardElements.removeClass("selected");
        index.dom.keyboardMenus.hide();
        if(!object.hasClass("selected"))
            object.addClass("selected");
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
            navElement.css("display", "block");
            navElement.css("opacity", 0);
            navElement.css("left", x+(keyW-menuW)/2+1);
            navElement.css("top", y);
            if(object.hasClass("selected"))
            {
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
            }
            
            navElement.find('.key-menu-content').css("background",
                        'url("public/images/'+links[i]+'.png") no-repeat center center');
            
            
            navElement.stop().animate(
                {opacity: 1, "left": "-="+moveLeft,
                "top": moveTop},
                {
                    duration: animTime,
                    easing:  "easeOutElastic",
                    complete: function(){
                        index.dom.overlay.hide();
                    }
                }
            );

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