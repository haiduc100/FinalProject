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
      if (data.status === 200) {
        if (data.currentRole == 4) {
          //supper admin
          window.location.href = "/user";
        } else if (data.currentRole == 2) {
          //stocker
          window.location.href = "/asset";
        } else if (data.currentRole == 3) {
          //director
          window.location.href = "/requestBorrow";
        } else {
          //manager
          window.location.href = "/requestBorrow";
        }
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
}

$(document).on("keypress", function (e) {
  if (e.which == 13) {
    LoginAdmin();
  }
});
