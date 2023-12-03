$(function (){

    window.addEventListener("scroll",()=>{
        var auto = document.getElementsByClassName("navbarbefore")[0];
        auto.classList.toggle("navbarAlter", window.scrollY > 30)
    })

    $(document).ready(function(){
        $(".login-closs").click(()=>{
            $("#login-content").css("display","none")
        })
        // 检查localStorage中是否保存了登录信息
        if (localStorage.getItem('username') && localStorage.getItem('expires')) {
            var expiresTime = parseInt(localStorage.getItem('expires'));
            if (Date.now() < expiresTime) {
                // 用户已登录，且未超过过期时间，执行相关操作
                $("#login-content").css("display","none")
                $("#LogIn").html("Welcome：" + localStorage.getItem('username')); // 显示保存的用户名
            } else {
                // 用户需要重新登录，执行相关操作
                $("#login-content").css("display","flex")
            }
        } else {
            // 显示登录框
            $("#login-content").css("display","flex")
        }



        $("#submit").click(function () {
            var username = $("#username").val()
            var password = $("#password").val()
            if (username && password) {
                $.ajax({
                    type: 'post',
                    url: 'http://192.168.27.166/Server/data/login.php',
                    data: {
                        username: username,
                        password: password
                    },
                    success: function (res) {
                        if (res.msg) { // Check if an error message is present
                            alert(res.msg);
                        } else {
                            localStorage.setItem("username", res[0].username);
                            var expires = new Date();
                            expires.setHours(24, 0, 0, 0); // 设置过期时间为第二天凌晨12点
                            localStorage.setItem('expires', expires.getTime().toString());
                            alert("登陆成功，Welcome " + res[0].username);
                            $(".login-content").css("display", "none");
                            $("#LogIn").html("Welcome：" + res[0].username);
                        }
                    },
                    error: function (error) {
                        alert(error)
                    }
                })
            } else {
                alert("请输入帐号密码")
            }
        });

    });


    //公告
        $.ajax({
            url:'http://192.168.27.166/Server/data/public.php',
            type:'get',
            dataType:'json',
            success: function (data){
                $("#public").html(data.data[0].text)
                $("#publicDate").html(data.data[0].date)

            },
            error:function (){
                alert("请求失败")
            }
        })


    //计划
        $("#go-plan-btn").click(function (){
            if (localStorage.getItem('username')){
                $(".plan-item").css("display","flex")
            }else{
                alert("请登陆！")
            }
        })
        $(".plan-closs").click(function (){
            $(".plan-item").css("display","none")
        })
        $.ajax({
            url:'http://192.168.27.166/Server/data/plan/planWeek.php',
            type:'get',
            success:function (data){
                var dates = JSON.parse(data).date;
                for(var i = 0; i < dates.length; i++){
                    $(".plan-select").append(`
                    <option>`+ dates[i] +`</option>
            `);
                }
            }
        });
        $("#planSubmit").click(function (){
            var get_name = $("#get_name").val()
            var get_date = $("#get_date").val()
            var get_plan = $("#get_plan").val()
            var get_week = $("#get_week").val()

            if (get_name && get_date && get_plan && get_week && localStorage.getItem('username')){
                $.ajax({
                    url:'http://192.168.27.166/Server/data/plan/plan.php',
                    type:'get',
                    dataType: 'json',
                    data:$("#planForm").serialize(),
                    success:function (data){
                        alert(JSON.stringify(data))
                        $(".plan-item").fadeOut(100)
                    },
                    error:function (error){
                        alert(JSON.stringify(error))
                    }
                })
            }else{
                alert("请将内容填写完整")
            }
            return false;
        })




// 音乐
    $.ajax({
        type: "get",
        url: "http://192.168.27.166/Server/data/music/music.php",
        dataType:'json',
        success:function (data){
            $("#musicName").html("歌曲名: " + data.data[0].name);
            $("#musicAuthor").html("作者: " + data.data[0].author);
        }
    })
    $(function (){
        //播放音乐
        function musicPlay(){
            var audio = $("#audio")[0];
            if (audio.paused){
                audio.play()
                $("#playBtn-content").removeClass("icon-bofang").addClass("icon-zanting")

            }else{
                audio.pause()
                $("#playBtn-content").removeClass("icon-zanting").addClass("icon-bofang")
            }

            // 音乐时常
            var playTimer = null;
            playTimer = setInterval(function (){
                if (audio.paused){
                    clearInterval(playTimer)
                }
                var playTime_s = audio.currentTime;
                var mTime = parseInt(playTime_s / 60);
                var sTime = parseInt(playTime_s % 60);
                var totalTime_s = audio.duration;
                var mTime_total = parseInt(totalTime_s / 60);
                var sTime_total = parseInt(totalTime_s % 60);

                function checkTime(m,s){
                    if (m < 10){
                        m = "0" + m;
                    }else{
                        m += "";
                    }

                    if (s < 10){
                        s = "0" + s;
                    }else{
                        s += "";
                    }

                    return m + ":" + s
                }

                var pagePassTime = checkTime(mTime,sTime)
                var pageTotalTime = checkTime(mTime_total,sTime_total)

                $("#PassTime").html(pagePassTime);
                $("#TotalTime").html(pageTotalTime);

                // 进度条
                var playedTimePercent = playTime_s / totalTime_s;
                if (totalTime_s - playTime_s > 0){
                    $(".pace-content").width(playedTimePercent * 100 + "%");


                } else {
                    $(".pace-content").width(0 + "%");
                    $("#playBtn-content").removeClass("icon-zanting").addClass("icon-bofang")
                }

            },1000)

        }
        $("#playBtn-content").on("click",function (){
            musicPlay();
        })
    })

    //文案
    $.ajax({
        url:'http://192.168.27.166/Server/data/copy.php',
        dataType:'json',
        success:function (data){
            $("#ctext").html(data.data[0].chineseText)
            $("#etext").html(data.data[0].englishText)
        }
    })

    //排行榜
    $.ajax({
        url: "http://192.168.27.166/Server/data/codingstar.php",
        type: "get",
        dataType: "json",
        success: function(data) {
            var arr = [];


            for (var i = 0; i < data.data.length; i++) {
                var name = data.data[i].name;
                var stars = data.data[i].star;
                arr.push({
                    name: name,
                    stars: stars
                });
            }


            arr.sort(function(a, b) {
                return b.stars - a.stars;
            });


            arr = arr.slice(0, 3);


            for (var j = 0; j < arr.length; j++) {
                $("#codingStars").append(`
                
                <li>`+arr[j].name + "：" + arr[j].stars + "颗星" +`</li>
                
                `);
            }
        },
        error: function(error) {
            alert("无法获取数据" + error)
        }
    });


// link
    $("#GoToStudy").click(function (){
        if(localStorage.getItem('username')){
            open("http://192.168.27.166/Server/study/");
        }else{
            alert("请登陆！")
        }

    })
    $("#GoToExercise").click(function (){
        open("http://192.168.27.166/Server/exercise/");
    })
    $("#GoToView").click(function (){
        if(localStorage.getItem('username')){
            open("http://192.168.27.166/Server/images/");
        }else{
            alert("请登陆！")
        }

    });
    $("#GoToJoin").click(function (){
        if(localStorage.getItem('username')){
            open("http://192.168.252.5/index.htm");
        }else{
            alert("请登陆！")
        }
    });
    $("#webstorm").click(function (){
        open("https://www.jetbrains.com.cn/webstorm/");
    })
    $("#vscode").click(function (){
        open("https://code.visualstudio.com");
    })
    $("#dreamweaver").click(function (){
        open("http://192.168.27.166/exercise/");
    })

    // 加入我们
    $("#applyFory").click(()=>{
        $(".applyFor-content").css("display","flex")
    })
    $(".applyFor-closs").click(()=>{
        $(".applyFor-content").css("display","none")
    })
    $("#applyForn").click(function (){
        var the_name = $("#the_name").val()
        var the_classes = $("#the_classes").val()
        var the_number = $("#the_number").val()

        if (the_name && the_classes && the_number){
            $.ajax({
                url:'http://192.168.27.166/Server/data/joint.php',
                type:'put',
                dataType: 'json',
                data:$("#applyForndata").serialize(),
                success:function (data){
                    alert(JSON.stringify(data))
                    $(".applyFor-content").fadeOut(100)
                    $(".applyFor-content").css("display","none")
                },
                error:function (error){
                    alert(JSON.stringify(error))
                }
            })
        }else{
            alert("请将内容填写完整")
        }
        return false;
    })



})

