<?php

if ( class_exists ( "query_builder" ) != TRUE )
    include "cmd/query_builder.php";

if ( class_exists ( "base_build" ) != TRUE )
    include "cmd/base_build.php";

class build_interiors extends base_build
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
                  "image_id" => array ( "name" => "image_id",
                                              "type" => "int",
                                              "limit" => "11" ),
                  "title" => array ( "name" => "title",
                                    "type" => "varchar",
                                    "limit" => "255" ), 
                  "price" => array ( "name" => "price",
                                    "type" => "varchar",
                                    "limit" => "255" ), 
                  "doors" => array ( "name" => "doors",
                                    "type" => "varchar",
                                    "limit" => "255" ), 
                  "colour" => array ( "name" => "colour",
                                    "type" => "varchar",
                                    "limit" => "255" ), 
                  "image" => array ( "name" => "image",
                                    "type" => "",
                                    "limit" => "" ), 
                  "additional_draws" => array ( "name" => "additional_draws",
                                    "type" => "varchar",
                                    "limit" => "255" ), 
                  "interior_style" => array ( "name" => "interior_style",
                                    "type" => "varchar",
                                    "limit" => "255" ), 
                  "additional_shelves" => array ( "name" => "additional_shelves",
                                        "type" => "varchar",
                                        "limit" => "255" )
                                                 );

    public function __Construct ( $db_name, $tablename )
    {
        $this->_tablename = $tablename;
        $this->_db_name = $db_name;

        $this->_build = new query_builder ( $db_name, "interiors" );
    }

    public function put ()
    {
        $this->_build->create_table ( "interiors" );

        $this->_build->varchar ( "title", "255" );
        $this->_build->varchar ( "price", "255" );
        $this->_build->varchar ( "doors", "255" );
        $this->_build->varchar ( "colour", "255" );
        $this->_build->int( "image", "11" );
        $this->_build->varchar ( "additional_draws", "255" );
        $this->_build->varchar ( "interior_style", "255" );
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

$build = new build_interiors ( $this->_db_name, "interiors" );
$build->desc ();

?>