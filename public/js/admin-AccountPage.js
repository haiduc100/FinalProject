let idAccount;
openUpdate = async (id) => {
  try {
    $(".changePass").addClass("d-none");
    $(".changebtn").addClass("d-none");
    $(".update").removeClass("d-none");
    $(".updatebtn").removeClass("d-none");
    idAccount = id;
    await $.ajax({
      url: `/user/api/${idAccount}`,
      type: "GET",
    })
      .then((data) => {
        $(".StaffCode").val(data.StaffCode);
        $(".Department").val(data.Department.DepartmentName);
        $(".FirstName").val(data.FirstName);
        $(".LastName").val(data.LastName);
        $(".UserName").val(data.UserName);
        $(".DateOfBirth").val(
          new Date(data.DateOfBirth).toISOString().split("T")[0]
        );
      })
      .then((data) => {
        alert(data.status);
      })
      .catch((error) => {
        alert(error.responseJSON.message);
      });
  } catch (error) {
    console.log(error);
  }
};

openChangePass = async (id) => {
  idAccount = id;
  $(".update").addClass("d-none");
  $(".changePass").removeClass("d-none");
  $(".updatebtn").addClass("d-none");
  $(".changebtn").removeClass("d-none");
};
handleChangePass = async () => {
  const oldPassword = $(".oldPassword").val();
  const newPassword = $(".newPassword").val();
  if (!oldPassword || !newPassword) {
    return;
  }
  $.ajax({
    url: `/user/api/_changepass/${idAccount}`,
    type: "POST",
    data: {
      Password: oldPassword,
      newPassword: newPassword,
    },
  })
    .then((data) => {
      if (data.status === 400) {
        alert(data.message);
      } else {
        window.location.href = "/user/login";
      }
    })
    .catch((error) => {
      alert(error.responseJSON.message);
    });
};
handleUpdate = async () => {
  try {
    const DateOfBirth = $(".DateOfBirth").val();
    const FirstName = $(".FirstName").val();
    const LastName = $(".LastName").val();
    const UserName = $(".UserName").val();
    await $.ajax({
      url: `/user/api/${idAccount}`,
      type: "PUT",
      data: {
        DateOfBirth: DateOfBirth,
        FirstName: FirstName,
        LastName: LastName,
        UserName: UserName,
      },
    }).then(() => {
      window.location.reload();
      idAccount = 0;
    });
  } catch (error) {
    console.log(error);
  }
};
