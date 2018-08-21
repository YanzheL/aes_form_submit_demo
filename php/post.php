<?php
header('Access-Control-Allow-Origin: *');
$key=file_get_contents("private.key");
//$key="A";
$decrypted=array();
foreach ($_POST as $k=>$v){
//    var_dump($v);
    $decrypted[$k]=openssl_decrypt($v,"AES-128-ECB",$key);
}
//var_dump(strlen($key));
//var_dump($key);
echo "Decryption key = ".$key."\n";
//var_dump (openssl_error_string ());
echo "Decrypted params:";
die(json_encode($decrypted));

?>