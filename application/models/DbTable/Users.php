<?php

class Application_Model_DbTable_Users extends Zend_Db_Table_Abstract
{

    protected $_name = 'users';
    public function login($user, $pass){
      $u = mysql_real_escape_string($user);
      $p = mysql_real_escape_string($pass);
      $adapter = $this->getDefaultAdapter();
      $user = $adapter->query('SELECT * FROM users WHERE users.name = "' . $u . '" AND users.pass = MD5("' . $p . '")');
      $rows = $user->fetchAll();
      if(count($rows)>0)
        return TRUE;
      else
        return FALSE;
    }

}

