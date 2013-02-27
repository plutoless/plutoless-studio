

if(post==null)
{
    var post = {

        dom : {
            mainBody : 0,
            contentWrap : 0,
            mainColumn : 0,
            controlPanel : 0,
            controlKeys : 0,
            postList : 0,
            currentPost : 0
        },

        data :{
            controlPanelH : 0
        },

        init : function()
        {
            common.init();
            post.dom.mainBody = $('#index-wrap .navigate-area');
            post.dom.contentWrap = $('#index-wrap .navigate-area .content-wrap');
            post.dom.mainColumn = post.dom.contentWrap
                .find('.center-column');
            post.dom.controlPanel = post.dom.contentWrap
                .find('.post-control-wrap');
            post.dom.controlKeys = post.dom.controlPanel.find('.control-key-wrap');
            post.dom.postList = post.dom.contentWrap.find('.post-list-wrap');
            post.dom.currentPost = post.dom.postList.find('.post').filter(':first');

            post.data.controlPanelH = post.dom.controlPanel.height();

            post.getContentWrapPos();

            post.getControlKeyBindings();

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
            post.dom.mainBody.css("height", wrapH);
            post.getControlPanelPos();
        },

        getControlKeyBindings : function()
        {
            post.dom.controlKeys.click(
                function()
                {
                    var name = $(this).attr('name');
                    if(name=="next")
                    {
                        post.nextPost(post.dom.currentPost);
                    }
                    if(name=="prev")
                    {
                        post.prevPost(post.dom.currentPost);
                    }
                }
            );
        },

        prevPost : function(currentObject)
        {
            var animTime = 600;
            var object = currentObject.prev('.post');
            if(object.length)
            {
                var left = object.position().left;
                var scrollLeft = post.dom.postList.scrollLeft();
                object.css("opacity", 0);
                currentObject.stop(true,true).animate({opacity: 0},animTime);
                object.stop(true,true).animate({opacity: 1},animTime);
                post.dom.postList.stop(true,true).animate(
                    {"scrollLeft": scrollLeft+left},
                    {
                        duration: animTime,
                        complete: function()
                        {
                            post.dom.currentPost = object;
                        }
                    }
                );
            }
        },

        nextPost : function(currentObject)
        {
            var animTime = 600;
            var object = currentObject.next('.post');
            if(object.length)
            {
                var left = object.position().left;
                var scrollLeft = post.dom.postList.scrollLeft();
                object.css("opacity", 0);
                currentObject.stop(true,true).animate({opacity: 0},animTime);
                object.stop(true,true).animate({opacity: 1},animTime);
                post.dom.postList.stop(true,true).animate(
                    {"scrollLeft": scrollLeft+left},
                    {
                        duration: animTime,
                        complete: function()
                        {
                            post.dom.currentPost = object;
                        }
                    }
                );
            }
        }
    }
}