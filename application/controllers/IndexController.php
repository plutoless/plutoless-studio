<?php

class IndexController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        // action body
        $posts = new Application_Model_DbTable_Posts();
        $this->view->posts = $posts->fetchAll();
        $this->view->recentPost = $posts->getRecentPost();
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













