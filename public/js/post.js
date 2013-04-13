

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
            scrollBy : 1,
            hints : [
                    {'key':'W','val':'Scroll Up'},
                    {'key':'S','val':'Scroll Down'},
                    {'key':'D','val':'Next'},
                    {'key':'A','val':'Prev'},
                    {'key':'backspace','val':'Home'}
            ]
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
                var element = post.dom.posts.eq(i)
                    .jScrollPane({animateScroll: true});
                post.data.api[i] = element.data('jsp');
            }
            post.dom.currentPost = post.dom.posts.filter(':first');
            post.dom.currentPostSlider = post.data.api[0];
            post.initializePostKeyboard();
            
            $(window).resize(post.getKeyboardPos);
            
            /* ALL FINISHED, FADE IN */
            post.dom.mainColumn.animate({opacity:1});
        },
        
        initializePostKeyboard : function()
        {
            index.dom.keyboardElements.hover(
                function()
                {
                    $(this).addClass("hover");
                },
                function()
                {
                    $(this).removeClass("hover");
                }

            ).css("cursor","pointer");

            index.dom.keyboardElements.mousedown(
                function()
                {
                    var that = $(this);
                    var thatKeycode = parseInt(that.data('keycode'));
                    $(this).addClass("selected");
                    if(thatKeycode!=NaN)
                    {
                        var event = new Object();
                        event.keyCode = thatKeycode;
                        post.bindKeyboardActions(event, false);
                    }
                }
            );
            index.dom.keyboardElements.mouseup(
                function()
                {
                    var that = $(this);
                    var thatKeycode = parseInt(that.data('keycode'));
                    $(this).removeClass("selected");
                    if(thatKeycode!=NaN)
                    {
                        var event = new Object();
                        event.keyCode = thatKeycode;
                        post.bindKeyboardActions(event, true);
                    }
                }
            );    
            
            $(document).keydown(function(e){post.bindKeyboardActions(e,false);});
            $(document).keyup(function(e){post.bindKeyboardActions(e,true)});
            post.getKeyboardPos();
        },

        getKeyboardPos : function(){
            index.getKeyboardPos();
            common.clearHints();
            common.generateHints(post.data.hints);
        },

        bindKeyboardActions : function(e, action)
        {
            var preventDefault = false;
            var key = 0;
            var type = "";

            if(e.keyCode == 37 || e.keyCode == 65)
            {
                /* left arrow */
                if(e.keyCode == 37)
                  key = $('#key-left-arrow .key-element-content');
                if(e.keyCode == 65)
                  key = $('#key-A .key-element-content');
                type = "prev";
            }
            
            if(e.keyCode == 39 || e.keyCode == 68)
            {
                /* right arrow */
                if(e.keyCode == 39)
                  key = $('#key-right-arrow .key-element-content');
                if(e.keyCode == 68)
                  key = $('#key-D .key-element-content');
                type = "next";
            }
            
            if(e.keyCode == 38 || e.keyCode == 87)
            {
                /* up arrow */
                if(e.keyCode == 38)
                  key = $('#key-up-arrow .key-element-content');
                if(e.keyCode == 87)
                  key = $('#key-W .key-element-content');
                type = "up";
            }
            
            if(e.keyCode == 40 || e.keyCode == 83)
            {
                /* down arrow */
                if(e.keyCode == 40)
                  key = $('#key-down-arrow .key-element-content');
                if(e.keyCode == 83)
                  key = $('#key-S .key-element-content');
                type = "down";
            }
            
            if(e.keyCode == 8)
            {
                /* BACKSPACE */
                key = $('#key-backspace .key-element-content');
                type = "return";
            }
            if(!common.data.inmsg)
                preventDefault = true;
        
            if(!action)
            {
                index.bindKeyboardPress(key);
                if(preventDefault)
                    post.bindKeyboardPressActions(type, key);
            }
            else
            {
                index.bindKeyboardRelease(key);
                if(preventDefault)
                    post.bindKeyboardReleaseActions(type, key);
            }
            
            
            if(preventDefault)
                e.preventDefault();
        },

        bindKeyboardPressActions : function(type, key)
        {
            if(type==null)
                return;
            if(type=="prev")
            {
                post.prevPost(post.dom.currentPost);
            }
            if(type=="next")
            {
                post.nextPost(post.dom.currentPost);
            }
            if(type=="up")
            {
                post.scrollPostUp(post.dom.currentPostSlider);
                post.data.scrollBy++;
            }
            if(type=="down")
            {
                post.scrollPostDown(post.dom.currentPostSlider);
                post.data.scrollBy++;
            }
            if(type=="return")
            {
                common.backToIndex();
            }
        },
        
        bindKeyboardReleaseActions : function(type, key)
        {
            if(type==null)
                return;
            if(type=="up")
            {
                post.data.scrollBy = 1;
            }
            if(type=="down")
            {
                post.data.scrollBy = 1;
            }
        },

        prevPost : function(currentObject)
        {
            var animTime = 600;
            var object = currentObject.prev('.post');
            if(object.length)
            {
                var left = object.position().left;
                var scrollLeft = post.dom.postList.scrollLeft();
                /*
                object.css("opacity", 0);
                currentObject.stop(true,true).animate({opacity: 0},animTime);
                object.stop(true,true).animate({opacity: 1},animTime);*/
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
                /*object.css("opacity", 0);
                currentObject.stop(true,true).animate({opacity: 0},animTime);
                object.stop(true,true).animate({opacity: 1},animTime);*/
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