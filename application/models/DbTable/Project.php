<?php

class Application_Model_DbTable_Project extends Zend_Db_Table_Abstract
{

    protected $_name = 'project';

    public function getAllProjects(){
        $projects = Array();
        $projects = $this->fetchAll($this->select()->setIntegrityCheck(false)
                ->from(array('p' => 'project'),
                        array('prid','title','data',
                            'photo','caption', 'ts', 'width', 'height'))
                ->order(array('ts DESC')));
        return $projects;
    }
}

