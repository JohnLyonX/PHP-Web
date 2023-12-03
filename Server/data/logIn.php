<?php
    header('Content-Type: application/json; charset=utf-8');

    $username = $_POST["username"];
    $password = $_POST["password"];

    $con = mysqli_connect("localhost","root","","myData");

    if ($con){
        mysqli_query($con,"set names utf8");
        $sql = "select * from user where username='$username' and password='$password'";

        $result =  mysqli_query($con,$sql);

        if ($result->num_rows > 0) {
            $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
            echo json_encode($data);
        } else {
            $error = "登录失败，请检查您输入的用户名和密码是否正确！";
            echo json_encode(array("msg" => $error));
        }


    }else{
        echo json_encode(array("msg"=>"数据库连接失败"));
    }
?>
