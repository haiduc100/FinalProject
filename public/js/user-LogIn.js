
//
function LoginUser()
{
    let userName = $('#UserName').val();
    let PassWord = $('#PassWord').val();
    $.ajax({
        url: '/user/LogIn',
        type: 'POST',
        data:{
            UserName : userName,
            PassWord : PassWord
        }
    })
    .then((data)=>{
         console.log(16, data);
    })
    .catch((err)=>
    {
         console.log(20, err);
    })
    console.log(userName,PassWord );
}















