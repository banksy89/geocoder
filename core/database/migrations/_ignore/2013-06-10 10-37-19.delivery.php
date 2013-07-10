<?php

if ( class_exists ( "query_builder" ) != TRUE )
    include "cmd/query_builder.php";

if ( class_exists ( "base_build" ) != TRUE )
    include "cmd/base_build.php";

class build_delivery extends base_build
{
    private $_builder;

    protected $_schema = array( 
                                "id" => array( "name" => "id",
                                              "type" => "int",
                                              "limit" => "11" ),

                                "create_date" => array( "name" => "create_date",
                                                         "type" => "timestamp",
                                                         "limit" => "" ),

                                "firstname" => array( "name" => "firstname",
                                                     "type" => "varchar",
                                                     "limit" => "250" ),

                                "lastname" => array( "name" => "lastname",
                                                     "type" => "varchar",
                                                     "limit" => "250" ),

                                "address_1" => array( "name" => "address_1",
                                                     "type" => "varchar",
                                                     "limit" => "250" ),

                                "address_2" => array( "name" => "address_2",
                                                     "type" => "varchar",
                                                     "limit" => "250" ),

                                "town" => array( "name" => "town",
                                                     "type" => "varchar",
                                                     "limit" => "250" ),

                                "county" => array( "name" => "county",
                                                     "type" => "varchar",
                                                     "limit" => "250" ),

                                "postcode" => array( "name" => "postcode",
                                                     "type" => "varchar",
                                                     "limit" => "250" ),

                                "telephone" => array( "name" => "telephone",
                                                     "type" => "varchar",
                                                     "limit" => "250" ),

                                "email" => array( "name" => "email",
                                                   "type" => "varchar",
                                                   "limit" => "250" )
                                
                                 );

    public function __Construct ( $db_name, $tablename )
    {
        $this->_tablename = $tablename;
        $this->_db_name = $db_name;

        $this->_build = new query_builder ( $db_name, "delivery" );
    }

    public function put ()
    {
        $this->_build->create_table( "delivery" );

        $this->_build->varchar( "firstname", "250" );
        $this->_build->varchar( "lastname", "250" );
        $this->_build->varchar( "address_1", "250" );
        $this->_build->varchar( "address_2", "250" );
        $this->_build->varchar( "town", "250" );
        $this->_build->varchar( "county", "250" );
        $this->_build->varchar( "postcode", "250" );
        $this->_build->varchar( "telephone", "250" );
        $this->_build->varchar( "email", "250" );
        

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

$build = new build_delivery ( $this->_db_name, "delivery" );
$build->desc ();

?>