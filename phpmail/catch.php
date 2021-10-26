<?php
try {
　　throw new Exception("抛出异常"); } catch (Exception $e) { 　　echo '捕获到异常'.$e->getMessage(); }
?>