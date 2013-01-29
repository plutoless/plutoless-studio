<?php

class PostFindType{
    const ID = 0;
    const MONTH = 1;
    const PAGE = 2;
}

class Application_Model_DbTable_Posts extends Zend_Db_Table_Abstract
{

    protected $_name = 'posts';
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
                $result = $adapter->query('SELECT * FROM posts WHERE MONTHNAME(posts.ts) = "' . $param . '"');
                while($row = $result->fetchObject()){
                    $posts[] = $row;
                }
                break;
            case PostFindType::PAGE:
            
                $result = $adapter->query('SELECT posts.title, posts.text, posts.ts, type.text AS category FROM posts LEFT JOIN type ON posts.cid = type.id ORDER BY ts DESC');
                while($row = $result->fetchObject()){
                    $posts[] = $row;
                }
                break;
        }
        
        return $posts;
    }
    
    public function getRecentPost(){
        $stmt = $this->getAdapter()->query('SELECT * FROM posts AS p ORDER BY ts DESC');
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

