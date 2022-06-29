function LoginAdmin() {
  let userName = $("#UserName").val();
  let passWord = $("#PassWord").val();
  // alert( Role);
  $.ajax({
    url: "/user/LogInAdmin",
    type: "POST",
    data: {
      UserName: userName,
      PassWord: passWord,
    },
  })
    .then((data) => {
      console.log(data);
      if (data.status === 200) {
        window.location.href = "/user";
      } else {
        alert(data.message);
      }
    })
    .catch((err) => {
      if (err.status === 400) {
        alert(err.responseJSON.message);
      } else {
        console.log(27, err);
      }
    });
  console.log(29, userName, passWord);
}
