$(function(){
    post.init();
});


var post = {
    
    dom : {
        contentWrap : 0,
        mainColumn : 0,
        controlPanel : 0,
        postList : 0
    },
    
    data :{
        controlPanelH : 0
    },
    
    init : function()
    {
        alert();
        common.init();
        post.dom.contentWrap = $('#index-wrap .navigate-area .content-wrap');
        post.dom.mainColumn = post.dom.contentWrap
            .find('.center-column');
        post.dom.controlPanel = post.dom.contentWrap
            .find('.post-control-wrap');
        post.dom.postList = post.dom.contentWrap.find('.post-list-wrap');
        post.data.controlPanelH = post.dom.controlPanel.height();
        
        post.getContentWrapPos();
        
        $(window).resize(post.getContentWrapPos);
    },
    
    getControlPanelPos : function()
    {
        var centerColumnH = post.dom.mainColumn.height();
        post.dom.postList.css("height", centerColumnH - post.data.controlPanelH);
    },
    
    getContentWrapPos : function()
    {
        var wrapH = common.getWrapHeight();
        post.dom.contentWrap.css("height", wrapH);
        post.getControlPanelPos();
    }
}