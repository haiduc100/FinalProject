
// $.ajax({
//     url: 'http://localhost:4000/user/Login',
//     type: 'GET'
// })
// .then((data) => {
//   console.log(data);  
// }).catch((err) => {
//     console.log(err);
// });





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
         console.log(data);
    })
    .catch((err)=>
    {
         console.log(err);
    })
    console.log(userName,PassWord );
}















