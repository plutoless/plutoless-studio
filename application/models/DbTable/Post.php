<?php

class PostFindType{
    const ID = 0;
    const MONTH = 1;
    const PAGE = 2;
}

class Application_Model_DbTable_Post extends Zend_Db_Table_Abstract
{

    protected $_name = 'post';
    public function getPost($type, $param){
        
        $adapter = $this->getDefaultAdapter();
        $posts = Array();
        switch($type){
            case PostFindType::ID:
                $id = (int) $param;
                $row = $this->fetchRow('id = ' . $id);
                if (!$row) {
                    throw new Exception("Could not find row $id");
                }
                break;
            case PostFindType::MONTH:

                //$ = (int) $param;
                $result = $adapter->query('SELECT * FROM Post WHERE MONTHNAME(Post.ts) = "' . $param . '"');
                while($row = $result->fetchObject()){
                    $posts[] = $row;
                }
                break;
            case PostFindType::PAGE:
            
                $result = $adapter->query('SELECT Post.content, Post.ts, Type.title AS category FROM Post LEFT JOIN Type ON Post.ptid = Type.ptid ORDER BY ts DESC');
                while($row = $result->fetchObject()){
                    $posts[] = $row;
                }
                break;
        }
        
        return $posts;
    }
    
    public function getRecentPost(){
        $stmt = $this->getAdapter()->query('SELECT * FROM post AS p ORDER BY ts DESC');
        $result = $stmt->fetchAll();
        return $result[0];
    }
    
    public function addPost($title, $text)
    {
        $data = array(
            'ts' => new Zend_Db_Expr('NOW()'),
            'title' => $title,
            'text' => $text,
            'cid' => 1
        );
        $this->insert($data);
    }
    
    public function updateAlbum($id, $title, $text){
        $data = array(
            'title' => $title,
            'text' => $text,
        );
        $this->update($data, 'id = ' . (int)$id);
    }
    
    
    public function removePost($id){
        $this->delete('id =' . (int)$id);
    }
}

