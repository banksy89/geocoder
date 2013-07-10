<?php

class Home extends c_controller {
	
	public function index ()
	{	
		$this->addStyle('styles');
		$this->setView ( 'home/index' );
	}
	
}

?>