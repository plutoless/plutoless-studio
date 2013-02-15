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
        overlay : 0
    },
    
    data : {
        keyMapping : 0,
        lastKey : ""
    },
    
    init : function()
    {
        common.init();
        index.dom.keyboard = $('#index-wrap .key-board');
        index.dom.navBar =
            $('#index-wrap .navigate-area');
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
        $(document).keypress(function(e){index.bindKeyboardActions(e);});
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
        if(e.keyCode >=97 && e.keyCode <=122)
        {
          /* IT'S CHAR CODE */
          var c = String.fromCharCode(e.keyCode).toUpperCase();
          var key = $('#key-'+c+' .key-element-content');
          
          index.bindKeyboardMenuAnim(key);
        }
    },
    
    
    constructNavMenuElement : function(name)
    {
        return '<li class="rounded shadow3"><div class="tags">'+
                            name+'</div></li>';
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
    
    selectKey : function(object)
    {
        object.addClass('selected');
        index.data.lastKey = object.attr("name");
    },
    
    revertKey : function()
    {
        index.dom.keyboardElements.removeClass('selected');
        index.setKeyColors();
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