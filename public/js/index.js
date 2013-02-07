/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(function(){
    index.init();
});

var index = {
    
    dom : {
        keyboard : 0
    },
    
    init : function()
    {
        common.init();
        index.dom.keyboard = $('#index-wrap .key-board');
        index.getKeyboardPos();
        
        /* Attach listener */
        $(window).resize(index.getKeyboardPos);
        $('#index-wrap .key-board .key-element-content').hover(
            function()
            {
                $(this).addClass("color2");
            },
            function()
            {
                $(this).removeClass("color2");
            }
        );

    },
    
    getKeyboardPos : function()
    {
        var windowH = $(window).height();
        var keyboardH = index.dom.keyboard.height();
        index.dom.keyboard.css("margin-top", (windowH-keyboardH)/2);
    }
    
    

}