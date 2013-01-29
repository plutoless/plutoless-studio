/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(function(){
    index.init();
});

var index = {
    
    
    init : function()
    {
        var menuBlocks = $('#index-wrap .medium-block');
        var indexObjects = $('#index-wrap .index-object');
        var inputBox = $('#index-wrap .admin-login .input-box');
        var posts = $('#index-wrap .posts');
        var blog = $('#index-wrap .blog');
        var works = $('#index-wrap .recent-works');
        var contact = $('#index-wrap .contact');
        var login = $('#index-wrap .admin-login');
        var clickBlockCtrl = menuBlocks.find('.ctrl-layer');
        
        
        //show up animation
        index.appear(posts, blog, works, contact, login);
        
        //attach relevant listeners
        index.attachListeners(menuBlocks, indexObjects, clickBlockCtrl, inputBox);
        

    },
    
    
    appear : function(posts, blog, works, contact, login)
    {
        setTimeout(function(){
          posts.parent().animate({
            opacity:1
          }, 800);
        }, 100);
        
        setTimeout(function(){
          blog.parent().animate({
            opacity:1
          }, 800);
        }, 200);
        
        setTimeout(function(){
          works.parent().animate({
            opacity:1
          }, 800);
        }, 400);
        
        setTimeout(function(){
          contact.parent().animate({
            opacity:1
          }, 800);
        }, 300);
        
        setTimeout(function(){
          login.animate({
            opacity:1
          }, 800);
        }, 500);
    },
    
    attachListeners : function(menuBlocks, indexObjects, clickBlockCtrl, inputBox)
    {
      //click
      menuBlocks.click(
        function()
        {
          var addr = $(this).attr("name");
          if(addr=="blog")
            addr = "http://blog.sina.com.cn/u/2597150870";
          
          indexObjects.animate({
            opacity: 0
          }, 300, 
            function(){
              window.location.href = addr;
            }
          );
        }
      );
    
    
      //hover
      clickBlockCtrl.hover(
        function(){
          var hoverLayer = $(this).siblings('.hover-layer');
          hoverLayer.animate({
            top: 130
          }, 300);
        },
        function(){
          var hoverLayer = $(this).siblings('.hover-layer');
          hoverLayer.animate({
            top: 160
          }, 300);
        }
      );
      
      inputBox.focus(
        function(){
          if(($(this).attr('name')=='cm-name' && $(this).val()=='username') || ($(this).attr('name')=='cm-pass' && $(this).val()=='password') )
            $(this).val('');
          var sib = $(this).siblings('.input-box');
          if(sib.val() == '')
          {
            if(sib.attr('name')=='cm-name')
              sib.val('username');
            else
              sib.val('password');
          }
        }
      );
      
    }
}