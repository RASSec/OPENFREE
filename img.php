<?php
#ip ua url referer etc...
$url = @$_SERVER['HTTP_REFERER'];
$ua = @$_SERVER['HTTP_USER_AGENT'];
$fop=fopen('1.log','a+');
fwrite($fop,$url.$ua);
fclose($fop);
