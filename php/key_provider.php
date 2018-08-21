<?php
header('Access-Control-Allow-Origin: *');

$key="";
if (file_exists("private.key"))
    $key=file_get_contents("private.key");
else{
    $key_len=16;
    for($i=0;$i<$key_len;++$i){
        $key.=chr(rand(65,90));
    }
    file_put_contents("private.key",$key);
}

die($key);

?>