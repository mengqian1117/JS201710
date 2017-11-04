let $list=$("#list");
$("#formCheck").on("click","#submit",searchUser);
//绑定删除事件
$list.on("click",".del",removeUser);
//绑定查看事件
$list.on("click",".check",checkUserInfo);

function searchUser() {
    function bindData(data) {
        //如果没有数据直接return
        if (!data) return;
        //1.获取总页数
        if (data) {
            //绑定data到页面上
            var str = ``;
            for (var i = 0; i < data.length; i++) {
                str += `<li>
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
        };
    }
    $.ajax({
        url:"/checkUser?"+$("#formCheck").serialize(),
        type:"get",
        data:null,
        dataType:"json",
        async:false,
        cache:false,
        success:function (result) {
            bindData(result.data)
        },
        error:function () {

        }
    })
}
function checkUserInfo() {
    //获取查看用户的ID
    let userID=$(this).attr("data-id");
    window.open("../page/userInfo.html?id="+userID);
}
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