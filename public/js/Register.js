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
    let Email = $('#Email').val();
    let FistName =  $('#FistName').val();
    let LastName =  $('#LastName').val();
    let PhoneNumber =  $('#Phone').val();
    let sfPass =  $('#CFPassword').val();
    // let gender =  $('#Female').
    
    $.ajax({
        url: '/user/register',
        type: 'POST',
        data:{
            FistName: FistName,
            LastName: LastName,
            Email: Email,
            PhoneNumber: PhoneNumber,
            PassWord: PassWord,
            Gender: "Male",
            // Role: "admin"
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
