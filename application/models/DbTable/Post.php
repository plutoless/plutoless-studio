<?php


class Application_Model_DbTable_Post extends Zend_Db_Table_Abstract
{

    protected $_name = 'Post';
    
    public function getPost(){
        $posts = Array();
        $posts = $this->fetchAll($this->select()->setIntegrityCheck(false)
                ->from(array('p' => 'Post'),
                        array('pid','title','content','ts','ptid','type'=>'t.title'))
                ->joinLeft(array('t' => 'Type'), 
                        't.ptid = p.ptid',
                        array('ptype'=>'title'))
                ->order(array('ts DESC')));
        return $posts;
    }
    
    public function getAllPostTypes(){
        $types = Array();
        $types = $this->fetchAll($this->select()->setIntegrityCheck(false)
                ->from(array('p' => 'Post'),
                        array('ptid'))
                ->joinRight(array('t' => 'Type'), 
                        't.ptid = p.ptid', 
                        array('ptype' => 'title'))
                ->group('ptid'));
        return $types;
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

