

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
            posts : 0,
            currentPost : 0
        },

        data :{
            api : 0
        },

        init : function()
        {
            common.init();
            post.dom.contentWrap = index.dom.subpageWrapper;
            post.dom.mainColumn = post.dom.contentWrap
                .find('.post-seg-wrap');
            post.dom.postList = post.dom.contentWrap.find('.post-list-wrap');
            post.dom.posts = post.dom.postList.find('.post');
            post.dom.posts.jScrollPane();
            post.dom.currentPost = post.dom.postList.find('.post').filter(':first');
            post.initializePostKeyboard();
            
            $(window).resize(index.getKeyboardPos);
        },
        
        initializePostKeyboard : function()
        {
            $(document).keydown(function(e){post.bindKeyboardActions(e,false);});
            $(document).keyup(function(e){post.bindKeyboardActions(e,true)});
        },

        bindKeyboardActions : function(e, action)
        {
            var preventDefault = false;
            var key = 0;

            if(e.keyCode == 37 || e.keyCode == 65)
            {
                /* left arrow */
                if(e.keyCode == 37)
                  key = $('#key-left-arrow .key-element-content');
                if(e.keyCode == 65)
                  key = $('#key-A .key-element-content');
                if(!action)
                {
                    index.bindKeyboardPress(key);
                    post.prevPost(post.dom.currentPost);
                }
                else
                {
                    index.bindKeyboardRelease(key);
                }
                preventDefault = true;
            }
            
            if(e.keyCode == 39 || e.keyCode == 68)
            {
                /* right arrow */
                if(e.keyCode == 39)
                  key = $('#key-right-arrow .key-element-content');
                if(e.keyCode == 68)
                  key = $('#key-D .key-element-content');
                
                if(!action)
                {
                    index.bindKeyboardPress(key);
                    post.nextPost(post.dom.currentPost);
                }
                else
                {
                    index.bindKeyboardRelease(key);
                }
                preventDefault = true;
            }
            
            if(preventDefault)
                e.preventDefault();
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
                post.dom.currentPost = object;
                post.dom.postList.stop(true,true).animate(
                    {"scrollLeft": scrollLeft+left},
                    {
                        duration: animTime,
                        complete: function()
                        {
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
                post.dom.currentPost = object;
                post.dom.postList.stop(true,true).animate(
                    {"scrollLeft": scrollLeft+left},
                    {
                        duration: animTime,
                        complete: function()
                        {
                        }
                    }
                );
            }
        }
    }
}