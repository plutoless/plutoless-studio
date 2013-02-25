$(function(){
    post.init();
});


var post = {
    
    dom : {
        contentWrap : 0
    },
    
    init : function()
    {
        common.init();
        post.dom.contentWrap = $('#view-content-outer .content-wrap');
        post.getContentWrapPos();
        
        $(window).resize(post.getContentWrapPos);
    },
    
    getContentWrapPos : function()
    {
        var wrapH = common.getWrapHeight();
        post.dom.contentWrap.css("height", wrapH);
    }
}