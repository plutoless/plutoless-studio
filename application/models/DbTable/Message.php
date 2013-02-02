<?php

class Application_Model_DbTable_Message extends Zend_Db_Table_Abstract
{

    protected $_name = 'message';
    protected $_primary = 'msgid';
    public function addMessage($content){
        
        $adapter = $this->getAdapter();
        $data = array(
            'content' => $content
        );
        $id = $this->insert($data);
        $row = $adapter->fetchRow($this->select()->where('msgid='.$id));
        return $row;
    }
    
    public function getMessage(){
        $adapter = $this->getAdapter();
        $rows = $adapter->fetchAll($this->select()->limit(1000));
        return $rows;
    }

}

