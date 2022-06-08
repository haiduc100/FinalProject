function LoginAdmin() {
  let userName = $("#UserName").val();
  let passWord = $("#PassWord").val();
  let Role;
  if ($("input[type='radio'].radioBtnClass").is(":checked")) {
    Role = $("input[type='radio'].radioBtnClass:checked").val();
  }
  // alert( Role);
  $.ajax({
    url: "/user/LogInAdmin",
    type: "POST",
    data: {
      UserName: userName,
      PassWord: passWord,
      Role: Role,
    },
  })
    .then((data) => {
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
  console.log(userName, passWord);
}
