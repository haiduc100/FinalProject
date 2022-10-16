openAddModal = () => {
  $("#updateAccount").attr("style", "display: none !important");
  $(".updatebtn").attr("style", "display: none !important");
  $("#createAccount").css("display", "inline-block");
  $(".addbtn").css("display", "inline-block");
};
function capitalize(str) {
  const arr = str.split(" ");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  return arr.join(" ");
}

handleAddNew = () => {
  let FirstName = $(".FirstName").val().trim().toLowerCase();
  let LastName = $(".LastName").val().trim().toLowerCase();
  const Role = $(".roleCreate").val().trim();
  const Gender = $(".Gender").val().trim();
  const UserName = $(".UserName").val().trim();
  const DateOfBirth = $(".DateOfBirth").val().trim();
  const Department = $(".Department").val().trim();
  if (
    !FirstName ||
    !LastName ||
    !DateOfBirth ||
    !Department ||
    !Role ||
    !Gender ||
    !UserName
  ) {
    return;
  }
  FirstName = capitalize(FirstName);
  LastName = capitalize(LastName);
  $.ajax({
    url: "/user/api",
    type: "POST",
    data: {
      FirstName,
      LastName,
      Role,
      Gender,
      UserName,
      DateOfBirth,
      Department,
    },
  })
    .then(() => {
      $(".FirstName").val("");
      $(".LastName").val("");
      $(".roleCreate").val("");
      $(".Gender").val("");
      $(".UserName").val("");
      $(".DateOfBirth").val("");
      $(".Department").val("");
      window.location.reload();
    })
    .catch((error) => {
      alert(error.responseJSON.message);
    });
};

// let idAccount;
// openUpdate = async (id) => {
//   try {
//     idAccount = id;
//     const res = await $.ajax({
//       url: `/user/api/${idAccount}`,
//       type: "GET",
//     });

//     $(".emailUpdate").val(res.Email);
//     // console.log(res);

//     $("#createAccount").attr("style", "display: none !important");
//     $(".addbtn").attr("style", "display: none !important");
//     $("#updateAccount").css("display", "inline-block");
//     $(".updatebtn").css("display", "inline-block");
//   } catch (error) {
//     console.log(error);
//   }
// };

// handleUpdate = async () => {
//   try {
//     // const Role = $(".roleUpdate").val();
//     const Email = $(".emailUpdate").val();

//     await $.ajax({
//       url: `/user/api/${idAccount}`,
//       type: "PUT",
//       data: {
//         Email,
//       },
//     });
//     window.location.reload();

//     idAccount = 0;
//   } catch (error) {
//     console.log(error);
//   }
// };

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
