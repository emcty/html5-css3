$(function(){



    $("#btn").on("click",function(){
        $.ajax({
            url:"/ajax",
            data:{
                msg:$("#msg").val()
            }
        }).done(function(res){
        })
    })

    $("#testsign").on("click",function(){
        $.ajax({
            url:"http://123.57.50.120:3000/ajax/test",
            data:{
                avatar:"http://up.qqjia.com/z/24/tu29535_1.jpg",
            }
        }).done(function(res){
        })
    })
    $('#testsignxx').on("click",function(){
        var inx = 0;
        var flag = false;
        setInterval(function(){
            //var ava = "http://pic.58pic.com/58pic/11/55/72/56T58PICGYz.jpg";
            //if(inx > 107 ){
            //    ava = "http://img1.cache.netease.com/catchpic/E/E5/E56AD54E3677DBA07B9EC8DB0E3CBA64.jpg"
            //}
            //if(inx > 215){
            //    ava =  "http://img2.imgtn.bdimg.com/it/u=2845942942,23579596&fm=21&gp=0.jpg"
            //}
            //if(inx > 322){
            //    ava = "http://upload.news.cecb2b.com/2015/0312/1426142712493.jpg"
            //}
            //if(inx>=648){
            //    return false;
            //}

            if(inx > 600){

                flag = true;

            }
            var ava = "https://avatars.githubusercontent.com/u/3118"
            $.ajax({
                url:"http://123.57.50.120:3000/ajax/test",
                data:{
                    end:flag,
                    data:{
                        avatar:ava+ parseInt(Math.random()*(998 - 100 +1)+100),
                        name:"马云",
                        index:++inx
                    }
                }
            }).done(function(res){
            })
        },50)

    })
})