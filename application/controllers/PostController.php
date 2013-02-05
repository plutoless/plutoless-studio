<?php

class PostController extends Zend_Controller_Action
{

    public $posts = null;

    public function init()
    {
        /* Initialize action controller here */
        $this->posts = new Application_Model_DbTable_Post();
    }

    public function indexAction()
    {
        // action body
        $this->view->pagePosts = $this->posts->getPost();
        $this->view->postTypes = $this->posts->getAllPostTypes();
    }

    public function monthAction()
    {
        // action body
    }

    public function addAction()
    {
        // action body
        $form = new Application_Form_Post();
        $form->submit->setLabel('Add');
        $this->view->form = $form;
        
        if($this->getRequest()->isPost()){/*
          $formData = $this->getRequest()->getPost();
          if ($form->isValid($formData)) {
              $title = $form->getValue('title');
              $text = $form->getValue('text');
              $this->posts->addPost($title, $text);
              $this->_helper->redirector('index');
          } else {
              $form->populate($formData);
          }*/
        }
    }


}







