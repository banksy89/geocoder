<?php

if ( class_exists ( "query_builder" ) != TRUE )
    include "cmd/query_builder.php";

if ( class_exists ( "base_build" ) != TRUE )
    include "cmd/base_build.php";

class build_basket extends base_build
{
    private $_builder;

    protected $_schema = array( 
                                "id" => array( "name" => "id",
                                              "type" => "int",
                                              "limit" => "11" ),

                                "create_date" => array( "name" => "create_date",
                                                         "type" => "timestamp",
                                                         "limit" => "" ),

                                "content" => array( "name" => "content",
                                                     "type" => "varchar",
                                                     "limit" => "500" ),

                                "price" => array( "name" => "price",
                                                     "type" => "varchar",
                                                     "limit" => "500" ),
                                
                                "quantity" => array( "name" => "quantity",
                                                     "type" => "int",
                                                     "limit" => "11" ),

                                "cart_id" => array( "name" => "cart_id",
                                                 "type" => "varchar",
                                                 "limit" => "255" )
                                 );

    public function __Construct ( $db_name, $tablename )
    {
        $this->_tablename = $tablename;
        $this->_db_name = $db_name;

        $this->_build = new query_builder ( $db_name, "basket" );
    }

    public function put ()
    {
        $this->_build->create_table( "basket" );

        $this->_build->varchar( "content", "500" );
        $this->_build->varchar( "price", "500" );
        $this->_build->varchar( "cart_id", "255" );
        $this->_build->int( "quantity", "11" );

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

$build = new build_basket ( $this->_db_name, "basket" );
$build->desc ();

?>