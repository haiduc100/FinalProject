openAddModal = () => {
  $(".updateRole").attr("style", "display: none !important");
  $(".updatebtn").attr("style", "display: none !important");
  $(".createRole").css("display", "inline-block");
  $(".addbtn").css("display", "inline-block");
};

handleAddNew = () => {
  const RoleName = $(".RoleName").val().trim().toUpperCase();
  const Role = $(".Role").val().trim().toUpperCase();

  if (!RoleName || !Role) {
    return;
  }
  $.ajax({
    url: "/role/api",
    type: "POST",
    data: { RoleName: RoleName, Role: Role },
  })
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
      alert(error.responseJSON.message);
    });
};

let idRole;
openUpdate = async (id) => {
  try {
    idRole = id;
    const res = await $.ajax({
      url: `/role/api/${idRole}`,
      type: "GET",
    });

    $(".RoleNameUpdate").val(res.RoleName);
    $(".RoleUpdate").val(res.Role);

    $(".createRole").attr("style", "display: none !important");
    $(".addbtn").attr("style", "display: none !important");
    $(".updateRole").css("display", "inline-block");
    $(".updatebtn").css("display", "inline-block");
  } catch (error) {
    console.log(error);
  }
};

handleUpdate = async () => {
  try {
    const RoleName = $(".RoleNameUpdate").val().trim().toUpperCase();
    const Role = $(".RoleUpdate").val().trim().toUpperCase();

    await $.ajax({
      url: `/Role/api/${idRole}`,
      type: "PUT",
      data: { RoleName: RoleName, Role: Role },
    });
    window.location.reload();

    idRole = 0;
  } catch (error) {
    console.log(error);
  }
};

handleDelete = async (id) => {
  try {
    let processed = confirm("Do you want to delete this Role?");
    if (processed) {
      await $.ajax({
        url: `/Role/api/${id}`,
        type: "DELETE",
      });
      window.location.reload();
    }
  } catch (error) {
    alert(error.responseJSON.message);
  }
};
