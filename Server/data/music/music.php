<?php

$name = "name";
$author = "author";

$con = mysqli_connect("localhost","root","","myData");

if ($con){

    mysqli_query($con,"set names utf8");

    $sql = "SELECT * FROM music";

    $reuslt =  mysqli_query($con,$sql);

    $data = mysqli_fetch_all($reuslt,MYSQLI_ASSOC);

    if ($data) {
        echo json_encode(array("msg"=>"查询成功","data"=>$data),JSON_UNESCAPED_UNICODE);
    }else{
        echo json_encode(array("msg"=>"暂无数据"),JSON_UNESCAPED_UNICODE);
    }

}else{
    echo "数据库连接失败";
}

?>
