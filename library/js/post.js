$(function(){
    post.init();
});


var post = {
    
    
    init : function()
    {
      var postBlock = $('#view-content');
      postBlock.animate({
            opacity: 1
          }, 800);
    }
}