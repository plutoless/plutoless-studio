if(project==null)
{
   var project = {

        dom : {
            mainBody : 0
        },
        
        init : function()
        {
            common.init();
            post.dom.contentWrap = index.dom.subpageWrapper;
        }
   }
}