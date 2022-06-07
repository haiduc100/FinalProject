

//
function LoginAdmin()
{
    let userName = $('#UserName').val();
    let passWord = $('#PassWord').val();
    let Role;
    if($("input[type='radio'].radioBtnClass").is(':checked')) {
        Role = $("input[type='radio'].radioBtnClass:checked").val();
    }
    // alert( Role);
    $.ajax({
        url: '/user/LogInAdmin',
        type: 'POST',
        data:{
            UserName : userName,
            PassWord : passWord,
            Role: Role
        }
    })
    .then((data)=>{
         console.log(23, data);
    })
    .catch((err)=>
    {
         console.log(27, err);
    })
    console.log(userName,passWord );
}















