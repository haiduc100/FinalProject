// $.ajax({
//     url: 'http://localhost:4000/user/register',
//     type: 'GET'
// })
// .then((data) => {
//   console.log(data);  
// }).catch((err) => {
//     console.log(err);
// });


//
function SetRegister()
{
    let userName = $('#UserName').val();
    let PassWord = $('#PassWord').val();
    $.ajax({
        url: '/user/register',
        type: 'POST',
        data:{
            FistName: String,
            LastName: String,
            Email: String,
            PhoneNumber: String,
            PassWord: String,
            Gender: String,
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
