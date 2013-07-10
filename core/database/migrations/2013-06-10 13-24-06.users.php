<?php

if ( class_exists ( "query_builder" ) != TRUE )
    include "cmd/query_builder.php";

if ( class_exists ( "base_build" ) != TRUE )
    include "cmd/base_build.php";

class build_users extends base_build
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
                  "name" => array ( "name" => "name",
                                                              "type" => "varchar",
                                                              "limit" => "255" ), 
                                                              "email" => array ( "name" => "email",
                                                              "type" => "varchar",
                                                              "limit" => "255" ), 
                                                              "password" => array ( "name" => "password",
                                                              "type" => "varchar",
                                                              "limit" => "255" ), 
                                                              "address_line_one" => array ( "name" => "address_line_one",
                                                              "type" => "varchar",
                                                              "limit" => "255" ), 
                                                              "address_line_two" => array ( "name" => "address_line_two",
                                                              "type" => "varchar",
                                                              "limit" => "255" ), 
                                                              "town" => array ( "name" => "town",
                                                              "type" => "varchar",
                                                              "limit" => "255" ), 
                                                              "county" => array ( "name" => "county",
                                                              "type" => "varchar",
                                                              "limit" => "255" ), 
                                                              "postcode" => array ( "name" => "postcode",
                                                              "type" => "varchar",
                                                              "limit" => "255" ), 
                                                              "phone" => array ( "name" => "phone",
                                                              "type" => "varchar",
                                                              "limit" => "255" )
                                                               );

    public function __Construct ( $db_name, $tablename )
    {
        $this->_tablename = $tablename;
        $this->_db_name = $db_name;

        $this->_build = new query_builder ( $db_name, "users" );
    }

    public function put ()
    {
        $this->_build->create_table ( "users" );

        $this->_build->varchar ( "name", "255" );
        $this->_build->varchar ( "email", "255" );
        $this->_build->varchar ( "password", "255" );
        $this->_build->varchar ( "address_line_one", "255" );
        $this->_build->varchar ( "address_line_two", "255" );
        $this->_build->varchar ( "town", "255" );
        $this->_build->varchar ( "county", "255" );
        $this->_build->varchar ( "postcode", "255" );
        $this->_build->varchar ( "phone", "255" );
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

$build = new build_users ( $this->_db_name, "users" );
$build->desc ();

?>