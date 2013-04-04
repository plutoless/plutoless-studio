if(project==null)
{
   var project = {

        dom : {
            contentWrap : 0,
            contentBody : 0,
            projectList : 0,
            projects : 0,
            currentProject : 0
        },
        
        data :{
            hints : [
                    {'key':'D','val':'Next'},
                    {'key':'A','val':'Prev'},
                    {'key':'enter', 'val':'Launch'},
                    {'key':'backspace','val':'Home'}
            ]
        },
        
        init : function()
        {
            
            common.init();
            project.dom.contentWrap = index.dom.subpageWrapper;
            project.dom.contentBody = 
                project.dom.contentWrap.find('.project-seg-wrap');
            project.dom.projectList = 
                project.dom.contentBody.find('.project-list');
            project.dom.projects = project.dom.projectList.find('.project-wrap');
            var screenWidth = project.dom.contentWrap.width();
            var screenHeight = project.dom.contentWrap.height();
            var projectWidth, projectHeight;
            for(var i=0; i<project.dom.projects.length; i++)
            {
                var projectElement = project.dom.projects.eq(i).find('.project');
                projectWidth = projectElement.width();
                projectHeight = projectElement.height();
                projectElement.css('left', (screenWidth-projectWidth)/2);
                projectElement.css('top', (screenHeight-projectHeight)/2);
            }
            
            project.dom.currentProject = project.dom.projects.filter(':first');
            project.dom.currentProject.find('.project').addClass('selected');
            project.initializeProjectKeyboard();
            
            project.dom.contentBody.animate({'opacity': 1});
        },
        
        initializeProjectKeyboard : function()
        {
            $(document).keydown(function(e){project.bindKeyboardActions(e,false);});
            $(document).keyup(function(e){project.bindKeyboardActions(e,true)});
            project.getKeyboardPos();
        },
        
        getKeyboardPos : function(){
            index.getKeyboardPos();
            common.clearHints();
            common.generateHints(project.data.hints);
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
                    project.prevProject(project.dom.currentProject);
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
                    project.nextProject(project.dom.currentProject);
                }
                else
                {
                    index.bindKeyboardRelease(key);
                }
                preventDefault = true;
            }
            
            if(e.keyCode == 8)
            {
                /* BACKSPACE */
                key = $('#key-backspace .key-element-content');

                if(!action)
                {
                    index.bindKeyboardPress(key);
                    common.backToIndex();
                    index.bindKeyboardRelease(key);
                }
                preventDefault = true;
            }
            
            if(preventDefault)
                e.preventDefault();
        },
        
        nextProject : function(currentObject)
        {
            var animTime = 600;
            var object = currentObject.next('.project-wrap');
            if(object.length)
            {
                var left = object.position().left;
                var scrollLeft = project.dom.projectList.scrollLeft();
                /*object.css("opacity", 0);
                currentObject.stop(true,true).animate({opacity: 0},animTime);
                object.stop(true,true).animate({opacity: 1},animTime);*/
                
                project.dom.currentProject.find('.project').removeClass('selected');
                project.dom.currentProject = object;
                project.dom.projectList.stop().animate(
                    {"scrollLeft": scrollLeft+left},
                    {
                        duration: animTime,
                        complete: function()
                        {
                            project.dom.currentProject.find('.project').addClass('selected');
                        }
                    }
                );
            }
        },
        
        prevProject : function(currentObject)
        {
            var animTime = 600;
            var object = currentObject.prev('.project-wrap');
            if(object.length)
            {
                var left = object.position().left;
                var scrollLeft = project.dom.projectList.scrollLeft();
                /*object.css("opacity", 0);
                currentObject.stop(true,true).animate({opacity: 0},animTime);
                object.stop(true,true).animate({opacity: 1},animTime);*/
                project.dom.currentProject.find('.project').removeClass('selected');
                project.dom.currentProject = object;
                project.dom.projectList.stop().animate(
                    {"scrollLeft": scrollLeft+left},
                    {
                        duration: animTime,
                        complete: function()
                        {
                            project.dom.currentProject.find('.project').addClass('selected');
                        }
                    }
                );
            }
        }
   }
}