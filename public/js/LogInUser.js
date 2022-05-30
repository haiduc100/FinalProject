
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
    })
    .catch((err)=>
    {
         console.log(err);
    })
    console.log(UserName,PassWord );
}















