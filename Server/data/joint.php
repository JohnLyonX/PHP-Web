
<?php
// 获取表单提交的数据
$name = $_POST["name"];
$classes = $_POST["classes"];
$number = $_POST["number"];

// 连接到 MySQL 数据库
$con = mysqli_connect("localhost","root","","myData");

// 如果连接失败，返回错误信息
if (!$con) {
    die("连接数据库失败: " . mysqli_connect_error());
}

// 设置 MySQL 字符集
mysqli_set_charset($con, "utf8");

// 插入数据到数据库表中
$sql = "INSERT INTO joint VALUES (null,'$name', '$classes', '$number')";
$result = mysqli_query($con, $sql);

// 如果插入数据成功，输出成功信息
if ($result) {

    echo "我们已收到您的Join申请！";
} else {
    // 如果插入数据失败，输出错误信息
    echo "我们未能收到您的申请: " . mysqli_error($con);
}

// 关闭数据库连接
mysqli_close($con);
?>