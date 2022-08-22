openAddModal = () => {
  $("#updateAccount").attr("style", "display: none !important");
  $(".updatebtn").attr("style", "display: none !important");
  $("#createAccount").css("display", "inline-block");
  $(".addbtn").css("display", "inline-block");
};

handleAddNew = () => {
  const FirstName = $(".FirstName").val().trim();
  const LastName = $(".LastName").val().trim();
  const Role = $(".roleCreate").val().trim();
  const Gender = $(".Gender").val().trim();
  const UserName = $(".UserName").val().trim();
  const Email = $(".Email ").val().trim();
  const DateOfBirth = $(".DateOfBirth").val().trim();
  const Department = $(".Department").val().trim();

  $.ajax({
    url: "/user/api",
    type: "POST",
    data: {
      FirstName,
      LastName,
      Role,
      Gender,
      UserName,
      Email,
      DateOfBirth,
      Department,
    },
  })
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
};

let idAccount;
openUpdate = async (id) => {
  try {
    idAccount = id;
    const res = await $.ajax({
      url: `/user/api/${idAccount}`,
      type: "GET",
    });

    $(".roleUpdate").val(res.Role);
    // console.log(res);

    $("#createAccount").attr("style", "display: none !important");
    $(".addbtn").attr("style", "display: none !important");
    $("#updateAccount").css("display", "inline-block");
    $(".updatebtn").css("display", "inline-block");
  } catch (error) {
    console.log(error);
  }
};

handleUpdate = async () => {
  try {
    const Role = $(".roleUpdate").val();

    await $.ajax({
      url: `/user/api/${idAccount}`,
      type: "PUT",
      data: {
        Role,
      },
    });
    window.location.reload();

    idAccount = 0;
  } catch (error) {
    console.log(error);
  }
};

handleDelete = async (id) => {
  try {
    let processed = confirm("Do you want to delete this account?");
    if (processed) {
      await $.ajax({
        url: `/user/api/${id}`,
        type: "DELETE",
      });
      window.location.reload();
    }
  } catch (error) {
    alert(error.responseJSON.message);
  }
};

handleSearch = () => {
  const inp = $(".searchBox").val().trim();
  if (inp.length === 0) {
    alert("You must fill the search before you can search!!!");
  } else {
    window.location.href = `/user/filter?search=${inp}`;
  }
};
