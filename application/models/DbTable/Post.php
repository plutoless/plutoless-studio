<?php


class Application_Model_DbTable_Post extends Zend_Db_Table_Abstract
{

    protected $_name = 'Post';
    
    public function getPost(){
        $adapter = $this->getDefaultAdapter();
        $posts = Array();
        $posts = $this->fetchAll(
                    $this->select('FROM Post LEFT JOIN Type ON Post.ptid = Type.ptid'),
                    'ORDER BY ts DESC');
        return $posts;
    }
    
    public function getRecentPost(){
    }
    
    public function addPost($title, $text)
    {
    
        $data = array(
            'title' => $title,
            'content' => $text,
            'ptid' => 1
        );
        $this->insert($data);
    }
    
    public function updateAlbum($id, $title, $text){
        $data = array(
            'title' => $title,
            'content' => $text,
        );
        $this->update($data, 'id = ' . (int)$id);
    }
    
    
    public function removePost($id){
        $this->delete('id =' . (int)$id);
    }
}

