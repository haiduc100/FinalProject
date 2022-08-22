openAddModal = () => {
  $(".updateDepartment").attr("style", "display: none !important");
  $(".updatebtn").attr("style", "display: none !important");
  $(".createDepartment").css("display", "inline-block");
  $(".addbtn").css("display", "inline-block");
};

handleAddNew = () => {
  const DepartmentName = $(".DepartmentName").val().trim().toUpperCase();
  const Prefix = $(".Prefix").val().trim().toUpperCase();
  $.ajax({
    url: "/department/api",
    type: "POST",
    data: { DepartmentName: DepartmentName, Prefix: Prefix },
  })
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
      alert(error.responseJSON.message);
    });
};

let idDepartment;
openUpdate = async (id) => {
  try {
    idDepartment = id;
    const res = await $.ajax({
      url: `/department/api/${idDepartment}`,
      type: "GET",
    });

    $(".DepartmentNameUpdate").val(res.DepartmentName);
    $(".PrefixUpdate").val(res.Prefix);

    $(".createDepartment").attr("style", "display: none !important");
    $(".addbtn").attr("style", "display: none !important");
    $(".updateDepartment").css("display", "inline-block");
    $(".updatebtn").css("display", "inline-block");
  } catch (error) {
    console.log(error);
  }
};

handleUpdate = async () => {
  try {
    const DepartmentName = $(".DepartmentNameUpdate")
      .val()
      .trim()
      .toUpperCase();
    const Prefix = $(".PrefixUpdate").val().trim().toUpperCase();

    await $.ajax({
      url: `/department/api/${idDepartment}`,
      type: "PUT",
      data: { DepartmentName: DepartmentName, Prefix: Prefix },
    });
    window.location.reload();

    idDepartment = 0;
  } catch (error) {
    console.log(error);
  }
};

handleDelete = async (id) => {
  try {
    let processed = confirm("Do you want to delete this Department?");
    if (processed) {
      await $.ajax({
        url: `/department/api/${id}`,
        type: "DELETE",
      });
      window.location.reload();
    }
  } catch (error) {
    alert(error.responseJSON.message);
  }
};
