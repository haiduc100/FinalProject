
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
        console.log(data);
        if(data.status === 200){
            window.location.href='/home'
        }
    })
    .catch((err)=>
    {
         console.log(20, err);
    })
    console.log(userName,PassWord );
}















