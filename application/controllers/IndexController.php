<?php

class IndexController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
        
        $ajaxContent = $this->_helper->getHelper('AjaxContext');
        $ajaxContent->addActionContext('message', 'json')
                    ->addActionContext('getMessage', 'json')
                    ->initContext();
                    
        if ($this->getRequest()->isXmlHttpRequest()) {
          $this->_helper->layout->disableLayout();
          $this->_helper->viewRenderer->setNoRender(true);
        }
    }
    
    public function messageAction(){
      $content = $this->getRequest()->getPost('text');
      $messages = new Application_Model_DbTable_Message();
      $data = $messages->addMessage($content);
      $this->_helper->json($data);
    }
    
    public function getmessageAction(){
      $messages = new Application_Model_DbTable_Message();
      $data = $messages->getMessage();
      $this->_helper->json($data);
    }
    
    public function indexAction()
    {
        // action body
        /*
        $posts = new Application_Model_DbTable_Post();
        $this->view->posts = $posts->fetchAll();
        $this->view->recentPost = $posts->getRecentPost();
        */
        $this->view->currentMonth = date("F");
        $this->view->rand = rand(2, 101);
    }

    public function addAction()
    {
        // action body
    }

    public function editAction()
    {
        // action body
    }

    public function deleteAction()
    {
        // action body
    }

    public function loginAction()
    {
        // action body
        $users = new Application_Model_DbTable_Users();
        $username = $this->_getParam('cm-name','guest');
        $password = $this->_getParam('cm-pass','');
        
        $this->view->username = $username;
        $this->view->success = $users->login($username,$password);
    }

    public function logoutAction()
    {
        // action body
    }


}













