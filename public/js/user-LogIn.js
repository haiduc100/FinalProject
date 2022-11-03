//
LoginUser = async () => {
  let userName = $("#UserName").val();
  let PassWord = $("#PassWord").val();
  await $.ajax({
    url: "/user/LogIn",
    type: "POST",
    data: {
      UserName: userName,
      PassWord: PassWord,
    },
  })
    .then((data) => {
      console.log(data);
      if (data.message == "Incorrect password!!!") {
        alert(data.message);
      }
      if (data.status === 200) {
        window.location.href = "/staff";
      }
    })
    .catch((err) => {
      console.log(20, err);
    });
};

$(document).on("keypress", function (e) {
  if (e.which == 13) {
    LoginUser();
  }
});
