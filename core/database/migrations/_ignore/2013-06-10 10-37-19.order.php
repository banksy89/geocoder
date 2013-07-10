<?php

if ( class_exists ( "query_builder" ) != TRUE )
    include "cmd/query_builder.php";

if ( class_exists ( "base_build" ) != TRUE )
    include "cmd/base_build.php";

class build_order extends base_build
{
    private $_builder;

    protected $_schema = array( 
                                "id" => array( "name" => "id",
                                              "type" => "int",
                                              "limit" => "11" ),

                                "create_date" => array( "name" => "create_date",
                                                         "type" => "timestamp",
                                                         "limit" => "" ),

                                "cart_id" => array( "name" => "cart_id",
                                                     "type" => "varchar",
                                                     "limit" => "250" ),
                                
                                "total_cost" => array( "name" => "total_cost",
                                                     "type" => "varchar",
                                                     "limit" => "250" ),

                                "st_ref" => array( "name" => "st_ref",
                                                     "type" => "varchar",
                                                     "limit" => "250" ),

                                "delivery_id" => array( "name" => "delivery_id",
                                                 "type" => "int",
                                                 "limit" => "11" )

                                "status" => array( "name" => "status",
                                                 "type" => "int",
                                                 "limit" => "11" )
                                 );

    public function __Construct ( $db_name, $tablename )
    {
        $this->_tablename = $tablename;
        $this->_db_name = $db_name;

        $this->_build = new query_builder ( $db_name, "order" );
    }

    public function put ()
    {
        $this->_build->create_table( "order" );

        $this->_build->varchar( "cart_id", "250" );
        $this->_build->varchar( "total_cost", "250" );
        $this->_build->varchar( "st_ref", "250" );        
        $this->_build->int( "delivery_id", "11" );
        $this->_build->int( "status", "11" );

        $this->_build->timestamp( "create_date" );
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

$build = new build_order ( $this->_db_name, "order" );
$build->desc ();

?>