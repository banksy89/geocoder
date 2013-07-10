<!DOCTYPE html>
<html dir="ltr" lang="en">
   <head>
      <title></title>
      <meta charset="utf-8">
      <link rel="stylesheet" media="screen" href="/Cash/Assets/Styles/admin.css?v=34" />
      <link rel="stylesheet" media="screen" href="/Cash/Assets/Styles/datatable.css" />
      <!--[if IE 8]>
      <link rel="stylesheet" media="screen" href="/Cash/Assets/Styles/admin-IE8.css" />
      <![endif]-->
      <!--[if IE 7]>
      <link rel="stylesheet" media="screen" href="/Cash/Assets/Styles/admin-IE7.css" />
      <![endif]-->
      <!--[if IE 6]>
      <link rel="stylesheet" media="screen" href="/Cash/Assets/Styles/admin-IE6.css" />
      <![endif]-->
      <style type="text/css">
		#map { border:1px solid black; height:400px; margin:30px auto auto; width:600px; }
	</style>
   </head>
	<?php flush(); ?>
	<body>
    	
      <div id="container">
         <!-- HEADER -->
         <?php include 'Includes/Header.php'; ?>         
         <div id="body">
            <div class="content">
               <!-- NAVIGATION -->
               <?php 
                  include 'Includes/Menu.php';
                  flush();
               ?> 
               <!-- MAIN CONTENT AREA -->
               <div id="main">
               <h1>Clinics: Add/Edit</h1>
               	<div class="wrap">
                     
                     <form method="post" action="">
                     <input type="hidden" id="id" name="id" value="<?php echo $_GET['id'];?>" />
                    <input type="hidden" id="imagename" name="imagename" value="<?php echo $imgname;?>" />
                     <table width="100%">
                         <tr>
                             <td><input type="submit" name="submit" id="submit" value="Save"<?php echo $disabled;?> />
                              <?php if(isset($_GET['id'])){?><input type="submit" name="edit" id="submit" value="Edit"<?php echo $editdisabled;?> /><?php }?><hr noshade></td>
                              </tr>
                              <tr>
                              <td>
                              <table>
                              <tr><td>Name: </td><td><input id="basename" name="name" value="<?php echo $row['name'];?>"<?php echo $disabled;?>></td></tr>
                              <tr><td>
                              Type:
                              </td>
                              <td>
                              <select id="type" name="type" <?php echo $disabled;?>/>
                              <option value="Clinic"<?php if($row['type'] == 'Clinic'){echo' selected';}?>>Clinic</option>
                              <option value="College"<?php if($row['type'] == 'College'){echo' selected';}?>>College</option>
                              <option value="GP"<?php if($row['type'] == 'GP'){echo' selected';}?>>GP</option>
                              <option value="Pharmacy"<?php if($row['type'] == 'Pharmacy'){echo' selected';}?>>Pharmacy</option>
                              <option value="Youthclub"<?php if($row['type'] == 'Youthclub'){echo' selected';}?>>Youth Club</option>
                              <option value="Other"<?php if($row['type'] == 'Other'){echo' selected';}?>>Other</option>
                              </select>
                              
                              </td></tr>
                              <tr> <td>Address Line 1:</td><td><input id="addressline1" name="address1" value="<?php echo $row['address1'];?>"<?php echo $disabled;?>></td></tr>
                              <tr> <td>Address Line 2:</td><td><input id="addressline2" name="address2" value="<?php echo $row['address2'];?>"<?php echo $disabled;?>></td></tr>
                              <tr><td>Town: </td><td><input id="town" name="town" value="<?php echo $row['town'];?>"<?php echo $disabled;?>></td></tr>
                              <tr><td>County: </td><td><input id="county" name="county" value="<?php echo $row['county'];?>"<?php echo $disabled;?>></td></tr>
                              <tr><td>PostCode: </td><td><input id="postcode" name="postcode" value="<?php echo $row['postcode'];?>"<?php echo $disabled;?>></td></tr>
                              <tr><td colspan="2"><input type="button" id="findlocation" value="Find"<?php echo $disabled;?>></td></tr>
                              <tr><td colspan="2"><input type="hidden" id="lat" name="lat" value="<?php echo $row['lat'];?>"><input type="hidden" id="lng" name="lng" value="<?php echo $row['lng'];?>"></td></tr>
                              </table>
                              </td>
                              </tr>
                              <tr>
                             <td><?php if(isset($_POST['edit']) || empty($_GET['id'])){?><div id="map"></div><?php }?>
                           </td>
                         </tr>
                      </table>
                      </form>
                </div>
               </div>
            </div>
         </div>
         <!-- FOOTER -->
         <?php include 'Includes/Footer.php'; ?>
        <script type="text/javascript" src="/Cash/Assets/Scripts/jquery.js"></script>
		<script src="http://maps.google.com/maps/api/js?sensor=false"></script>
        <script language="javascript" type="text/javascript">
		var clicked = false;
		
		function init() {
			var lng = $("#lng").val(),
				lat = $("#lat").val();
			if(lng == ''){
				var lng = 0.6323253;
			}
			if(lat == ''){
				var lat = 51.5483346;
			}
			var marker, 
				 latlng = new google.maps.LatLng(lat, lng),
				 options = {
					zoom: 10, 
					center: latlng, 
						// Make Map options into a drop down
						mapTypeControl: true,
						mapTypeControlOptions: { style: google.maps.MapTypeControlStyle.DROPDOWN_MENU },
					mapTypeId: google.maps.MapTypeId.ROADMAP
				 },
				 mapElement = new google.maps.Map(document.getElementById("map"), options);
			// 'Geocode Address' THEN 'Plot the Marker'
			var basename = $("#basename").val(),
				addressline1 = $("#addressline1").val(),
				addressline2 = $("#addressline2").val(),
				town = $("#town").val(),
				county = $("#county").val(),
				postCode = $("#postcode").val(),
				type = $("#type").val(),
				phone = $("#phone").val(),
				url = $("#url").val(),
				address = addressline1 + ", " + addressline2 + ", " + town + ", " + county + ", " + postCode + ', UK',
				formattedAddress = basename + " - " + type + "<br />" + addressline1 + "<br />" + addressline2 + "<br />" + town + "<br />" + county + "<br />" + postCode + ', UK' + "<br />" + phone + "<br />" + url,
				geocoder = new google.maps.Geocoder(),
				image = '/Cash/Assets/Images/Admin/grey-marker.png';
			
			var param = { 'latLng': latlng };
				
			if (clicked) {
				param = { 'address': address };
			}
				
			geocoder.geocode(param, function(results,status) {
				if (status == google.maps.GeocoderStatus.OK) {
					var office = results[0].geometry.location;
					
					marker = new google.maps.Marker({
						position: office,
						map: mapElement,
						title: $("#basename").val(),
						draggable: true,
						icon: image
					});
			
					var infowindow = new google.maps.InfoWindow({ 
						content: formattedAddress,
						maxWidth: 100
					});
					
					google.maps.event.addListener(marker, 'click', function() { 
						infowindow.open(mapElement,marker);
						
					});
					
					var new_pos = marker.getPosition().toString();
					new_pos = new_pos.split( ", " );
					
					$('#lat').val(new_pos[0].substring(1));
					$('#lng').val(new_pos[1].substring(0, new_pos[1].length-1));
					
					
					google.maps.event.addListener(marker, 'dragend', function() { 
						var new_pos = marker.getPosition().toString();
						new_pos = new_pos.split( ", " );
						
						$('#lat').val(new_pos[0].substring(1));
						$('#lng').val(new_pos[1].substring(0, new_pos[1].length-1));
					});
				}
			});
		}
		init();
		$('#findlocation').bind('click', function(){
			clicked = true;
			init();
		});     
        </script>
      </div>
   </body>
</html>