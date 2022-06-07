

function GetRoleChecked() {
    let str = $("#selectbox1").val();
  if (str == "Admin") {
    return 1;
  } else {
    return 0;
  }
}
//
function GetRadioChecked() {
  let Gender;
  Gender = $("#mycheckbox").is(":checked");
  if (Gender) {
    return 'Female';
  } else {
    $("#mycheckbox").removeAttr("checked");
    return  "Male";
  }
}

function SetRegister() {
  let FirstName = $("#FistName").val();
  let LastName = $("#LastName").val();
  let dateofbirth = $("#dateofbirth").val();
  let Goitinh = GetRadioChecked();
  let Role = GetRoleChecked();
  let userName = $("#UserName").val();
  let StaffCode = $("#StaffCode").val();
  let PassWord = $("#PassWord").val();
  let Email = $("#Email").val();
  let PhoneNumber = $("#Phone").val();
  let sfPass = $("#CFPassword").val();
  $.ajax({
    url: "/user/register",
    type: "POST",
    data: {
      FirstName: FirstName,
      LastName: LastName,
      DatOfBirth: dateofbirth,
      Gender: Goitinh,
      Role: Role,
      UserName: userName,
      StaffCode: StaffCode,
      Password: PassWord,
      Email: Email,
      PhoneNumber: PhoneNumber,
      Avatar: "Null"
    },
  })
    .then((data) => {
      if (sfPass == PassWord) {
        next();
      }
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(userName, PassWord);
}
