<?php

if ( class_exists ( "query_builder" ) != TRUE )
    include "cmd/query_builder.php";

if ( class_exists ( "base_build" ) != TRUE )
    include "cmd/base_build.php";

class build_doors extends base_build
{
    private $_builder;

    protected $_schema = array ( "id" => array ( "name" => "id",
                                           "type" => "int",
                                           "limit" => "11" ),
                           "create_date" => array ( "name" => "create_date",
                                                    "type" => "timestamp",
                                                    "limit" => "" ),
                           "approved" => array ( "name" => "approved",
                                                 "type" => "int",
                                                 "limit" => "11" ),
                  "title" => array ( "name" => "title",
                                                              "type" => "varchar",
                                                              "limit" => "255" ), 
                                                              "description" => array ( "name" => "description",
                                                              "type" => "text",
                                                              "limit" => "" ), 
                                                              "price" => array ( "name" => "price",
                                                              "type" => "varchar",
                                                              "limit" => "255" ), 
                                                              "max_width" => array ( "name" => "max_width",
                                                              "type" => "varchar",
                                                              "limit" => "255" ), 
                                                              "max_height" => array ( "name" => "max_height",
                                                              "type" => "varchar",
                                                              "limit" => "255" ), 
                                                              "min_door_width" => array ( "name" => "min_door_width",
                                                              "type" => "varchar",
                                                              "limit" => "255" ), 
                                                              "max_door_width" => array ( "name" => "max_door_width",
                                                              "type" => "varchar",
                                                              "limit" => "255" ), 
                                                              "frame_width" => array ( "name" => "frame_width",
                                                              "type" => "varchar",
                                                              "limit" => "255" )
                                                               );

    public function __Construct ( $db_name, $tablename )
    {
        $this->_tablename = $tablename;
        $this->_db_name = $db_name;

        $this->_build = new query_builder ( $db_name, "doors" );
    }

    public function put ()
    {
        $this->_build->create_table ( "doors" );

        $this->_build->varchar ( "title", "255" );
        $this->_build->text ( "description" );
        $this->_build->varchar ( "price", "255" );
        $this->_build->varchar ( "max_width", "255" );
        $this->_build->varchar ( "max_height", "255" );
        $this->_build->varchar ( "min_door_width", "255" );
        $this->_build->varchar ( "max_door_width", "255" );
        $this->_build->varchar ( "frame_width", "255" );
        $this->_build->timestamp ( "create_date" );
        $this->_build->run ();
    }


    /**
     * Method to decide whether to create the whole table or to send it to the method so it can be altered
     *
     * @access public
     */
    public function desc ()
    {
        $this->alter ();
    }
}

$build = new build_doors ( $this->_db_name, "doors" );
$build->desc ();

?>