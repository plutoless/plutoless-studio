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
        keyboardMenus   : 0
    },
    
    init : function()
    {
        common.init();
        index.dom.keyboard = $('#index-wrap .key-board');
        index.initializeKeyboard();
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
                var x = $(this).offset().left;
                var y = $(this).offset().top;
                var nav = $('#nav-menu-wrapper');
                /* initialize pos */
                nav.css("left", x+5);
                nav.css("top", y-50);
                nav.css("display", "block");
                
                $('#nav-menu-0').css("margin-top", "0");
                $('#nav-menu-0').css("margin-left", "0");
                $('#nav-menu-1').css("margin-top", "-45px");
                $('#nav-menu-1').css("margin-left", "0");
                $('#nav-menu-2').css("margin-top", "-45px");
                $('#nav-menu-2').css("margin-left", "0");
                
                for(var i = 0; i<3; i++)
                {
                    $('#nav-menu-'+i).animate(
                        {opacity: 1, "margin-left": "-"+i*50},
                        {duration: 200}
                    );
                    
                }
            }
        );
    },
    
    getKeyboardPos : function()
    {
        var windowH = $(window).height();
        var keyboardH = index.dom.keyboard.height();
        index.dom.keyboard.css("margin-top", (windowH-keyboardH)/2);
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