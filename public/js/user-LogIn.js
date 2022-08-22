//
function LoginUser() {
  let userName = $("#UserName").val();
  let PassWord = $("#PassWord").val();
  $.ajax({
    url: "/user/LogIn",
    type: "POST",
    data: {
      UserName: userName,
      PassWord: PassWord,
    },
  })
    .then((data) => {
      if (data.status === 200) {
        window.location.href = "/staff";
      }
    })
    .catch((err) => {
      console.log(20, err);
    });
}
