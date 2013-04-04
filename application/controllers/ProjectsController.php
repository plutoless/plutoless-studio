<?php

class ProjectsController extends Zend_Controller_Action
{
    public $projects = null;
    public function init()
    {
        /* Initialize action controller here */
        $this->_helper->layout()->disableLayout();
        $this->projects = new Application_Model_DbTable_Project();
    }

    public function indexAction()
    {
        // action body
        $this->view->projects = $this->projects->getAllProjects();
    }


}

