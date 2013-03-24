

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
            currentPost : 0,
            currentPostSlider : 0
        },

        data :{
            api : new Array(),
            scrollBy : 1
        },

        init : function()
        {
            common.init();
            post.dom.contentWrap = index.dom.subpageWrapper;
            post.dom.mainColumn = post.dom.contentWrap
                .find('.post-seg-wrap');
            post.dom.postList = post.dom.contentWrap.find('.post-list-wrap');
            post.dom.posts = post.dom.postList.find('.post');
            for(var i=0; i<post.dom.posts.length; i++)
            {
                
                post.dom.posts.eq(i).attr('sindex', i);
                var element = post.dom.posts.eq(i).find('.post-right')
                    .jScrollPane({animateScroll: true});
                post.data.api[i] = element.data('jsp');
            }
            post.dom.currentPost = post.dom.posts.filter(':first');
            post.dom.currentPostSlider = post.data.api[0];
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
            
            if(e.keyCode == 38 || e.keyCode == 87)
            {
                /* up arrow */
                if(e.keyCode == 38)
                  key = $('#key-up-arrow .key-element-content');
                if(e.keyCode == 87)
                  key = $('#key-W .key-element-content');
                if(!action)
                {
                    index.bindKeyboardPress(key);
                    post.scrollPostUp(post.dom.currentPostSlider);
                    post.data.scrollBy++;
                }
                else
                {
                    index.bindKeyboardRelease(key);
                    post.data.scrollBy = 1;
                }
                preventDefault = true;
            }
            
            if(e.keyCode == 40 || e.keyCode == 83)
            {
                /* down arrow */
                if(e.keyCode == 40)
                  key = $('#key-down-arrow .key-element-content');
                if(e.keyCode == 83)
                  key = $('#key-S .key-element-content');
                if(!action)
                {
                    index.bindKeyboardPress(key);
                    post.scrollPostDown(post.dom.currentPostSlider);
                    post.data.scrollBy++;
                }
                else
                {
                    index.bindKeyboardRelease(key);
                    post.data.scrollBy = 1;
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
                var index = parseInt(object.attr('sindex'));
                post.dom.currentPostSlider = post.data.api[index];
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
                var index = parseInt(object.attr('sindex'));
                post.dom.currentPostSlider = post.data.api[index];
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
        
        scrollPostDown : function(currentAPI)
        {
            if(currentAPI!=null)
            {
                currentAPI.scrollByY(50*post.data.scrollBy);
            }
        },
        
        scrollPostUp : function(currentAPI)
        {
            if(currentAPI!=null)
            {
                currentAPI.scrollByY(-50*post.data.scrollBy);
            }
        }
    }
}