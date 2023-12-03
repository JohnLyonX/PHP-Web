<?php
    //获取用户通过URL传递的name参数
    $name = $_GET["name"];
    $date = $_GET["date"];
    $plan = $_GET["plan"];
    $week = $_GET["week"];

    //连接
    $con = mysqli_connect("localhost","root","","myData");
    if ($con) {
        //指定连接对象设置编码
        mysqli_query($con,"set names utf8");
        $sql = "insert into plan values (null,'$name','$date','$plan','$week')";

        //指定连接对象并且插入数据
        //影响行数
        $result = mysqli_query($con,$sql);

        if ($result > 0){
            echo json_encode(array("msg"=>"提交成功"));
        }else{
            echo json_encode(array("msg"=>"提交失败"));
        }
    }


?>
