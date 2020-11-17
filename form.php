<?php
if ($_POST['data'] !=null) {
 $inp = file_get_contents('result.json'); 
 $tempArray = json_decode($inp); 
	if ($tempArray==null) {
		$tempArray = [];
	}
 array_push($tempArray, $_POST['data']); 
 $jsonData = json_encode($tempArray); 
 file_put_contents('result.json', $jsonData); 
}