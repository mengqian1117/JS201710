var pageRender=(function () {
    //准备元素
    let $box = $("#box"),
        $list = $("#list"),
        $pageBtn = $("#page"),
        $pageNum = $("#pageNum"),
        $pageInput = $("#pageInput");
    let total = 0;//总页数
    let page = 1;//当前页

    //从服务器上获取指定页的数据,并且绑定到页面上
    function bindHTML() {
        $.ajax({
            url: "/getUserList?page=" + page,
            type: "get",
            dataType: "json",
            success: bindData
        });
        function bindData(result) {
            //如果没有数据直接return
            if (!result) return;
            //1.获取总页数
            total = parseInt(result.total);
            var data = result.data;
            if (data) {
                //绑定data到页面上
                var str = ``;
                for (var i = 0; i < data.length; i++) {
                    str += `<li id="li${data[i].id}">
                     <span>${data[i].id}</span>
                     <span>${data[i].name}</span>
                     <span>${data[i].age}</span>
                     <span>${data[i].sex == 1 ? "女" : "男"}</span>
                     <span>
                        <button class="del" data-id="${data[i].id}">删除</button>
                        <button class="check" data-id="${data[i].id}">查看/修改</button>
                     </span>
                     </li>`
                }
                $list.html(str);
                //绑定页数
                str=``;
                for(var i=1;i<=total;i++){
                    if(i==page){
                        str+=`<li class="bg">${i}</li>`;
                        continue;
                    }
                    str+=`<li>${i}</li>`;
                }
                $pageNum.html(str);
                //将输入框中的内容变成当前页
                $pageInput.val(page);
            };
        }
    }

    //页码的点击事件
    function changePage() {
        //this就是点击的元素
        if(this.innerHTML=="首页"){
            if(page==1)return;
            page=1;
        }
        if(this.innerHTML=="上一页"){
            if(page==1)return;
            page--;
        }
        if(this.innerHTML=="下一页"){
            if(page==total)return;
            page++
        }
        if(this.innerHTML=="尾页"){
            if(page==total)return;
            page=total;
        }
        //只要是page改变了,就重新渲染数据,也就是去执行一次bindHTML即可
        if(this.tagName=="LI"){
            if(page==parseInt(this.innerHTML)) return;
            page=parseInt(this.innerHTML);
        }
        bindHTML();
    }

    //输入框事件
    function inputPage(e) {
        //当敲回车的时候进行处理
        if(e.keyCode==13){
            var val=Math.round(this.value);
            //假如输入的不是有效数字,那就不懂仍然显示当前页
            if(isNaN(val)){
                this.value=page;
                return;
            }
            //当输入的内容大于最大值或者小于最小值了
            val<1?val=1:null;
            val>total?val=total:null;
            page=val;
            bindHTML();
        }
    }

    //删除事件
    function removeUser() {
        //获取当前点击元素对应用户的id
        let userID=$(this).attr("data-id");
        let flag=confirm(`您确定要删除ID为[${userID}]的用户吗?`);
        if(flag){
            //当点击确定的时候才删除
            $.ajax({
                url:"/removeUser?id="+userID,
                type:"get",
                dataType:"json",
                success:(result)=> {
                    if(result&&result.code==0){
                        alert("亲,你好残忍,删了我就再也回不来了");
                        //将页面上的这个li也删除
                        $list[0].removeChild(this.parentNode.parentNode);
                    }else {
                        alert("嘿嘿,你删不了我哦!!")
                    }
                }
            })
        }
    }

    //查看用户信息事件
    function checkUserInfo() {
        //获取查看用户的ID
        let userID=$(this).attr("data-id");
        window.open("../page/userInfo.html?id="+userID);
    }

    //增加新用户的事件
    function addUser() {
        var data=eval("({"+decodeURIComponent($("#form1").serialize()).replace(/=/g,":'").replace(/&/g,"',")+"'})");
        $.ajax({
            url:"/addUserInfo",
            type:"post",
            dataType:"json",
            async:"false",
            data:JSON.stringify(data),
            cache:false,
            success:function (result) {
                alert(result.msg)
            }
        })
    }
    return {
        init: function () {
            //1.一打开页面就渲染一次
            bindHTML();
            //2.给pageBtn下面的页码绑定点击事件,使用预留事件绑定
            $pageBtn.on("click","li,span",changePage);
            //3.给输入框绑定事件,实现页码的对应和数据的重新渲染
            $pageInput.on("keyup",inputPage);
            //4.绑定删除事件
            $list.on("click",".del",removeUser);
            //5.绑定查看事件
            $list.on("click",".check",checkUserInfo);
            //6.绑定增加新用户的事件
            $("#form1").on("click","#submit",addUser);

        }
    }
})();
pageRender.init();