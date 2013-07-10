<?php

if ( class_exists ( "query_builder" ) != TRUE )
    include "cmd/query_builder.php";

if ( class_exists ( "base_build" ) != TRUE )
    include "cmd/base_build.php";

class build_door_type extends base_build
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
                  "sections" => array ( "name" => "sections",
                                                              "type" => "varchar",
                                                              "limit" => "255" ), 
                                                              "price" => array ( "name" => "price",
                                                              "type" => "varchar",
                                                              "limit" => "255" ), 
                                                              "doors_id" => array ( "name" => "doors_id",
                                                              "type" => "varchar",
                                                              "limit" => "255" )
                                                               );

    public function __Construct ( $db_name, $tablename )
    {
        $this->_tablename = $tablename;
        $this->_db_name = $db_name;

        $this->_build = new query_builder ( $db_name, "door_type" );
    }

    public function put ()
    {
        $this->_build->create_table ( "door_type" );

        $this->_build->varchar ( "sections", "255" );
        $this->_build->varchar ( "price", "255" );
        $this->_build->varchar ( "door_id", "255" );
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

$build = new build_door_type ( $this->_db_name, "door_type" );
$build->desc ();

?>