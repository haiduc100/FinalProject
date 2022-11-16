openAddModal = () => {
  $(".updateCategory").attr("style", "display: none !important");
  $(".updatebtn").attr("style", "display: none !important");
  $(".createCategory").css("display", "inline-block");
  $(".addbtn").css("display", "inline-block");
  $("#exampleModalLabel").html("Add new category");
};

handleAddNew = () => {
  const CategoryName = $(".CategoryName").val().trim();
  const Prefix = $(".Prefix").val().trim().toUpperCase();
  if (!CategoryName || !Prefix) {
    alert("Please fill the input!");
    return;
  }
  $.ajax({
    url: "/category/api",
    type: "POST",
    data: { CategoryName: CategoryName, Prefix: Prefix },
  })
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
      alert(error.responseJSON.message);
    });
};

let idCategory;
openUpdate = async (id) => {
  try {
    $("#exampleModalLabel").html("Update category");

    idCategory = id;
    const res = await $.ajax({
      url: `/category/api/${idCategory}`,
      type: "GET",
    });

    $(".CategoryNameUpdate").val(res.CategoryName);
    $(".PrefixUpdate").val(res.Prefix);

    $(".createCategory").attr("style", "display: none !important");
    $(".addbtn").attr("style", "display: none !important");
    $(".updateCategory").css("display", "inline-block");
    $(".updatebtn").css("display", "inline-block");
  } catch (error) {
    console.log(error);
  }
};

handleUpdate = async () => {
  try {
    const CategoryName = $(".CategoryNameUpdate").val().trim();
    const Prefix = $(".PrefixUpdate").val().trim().toUpperCase();
    if (!CategoryName || !Prefix) {
      alert("Please fill the input!");
      return;
    }
    await $.ajax({
      url: `/category/api/${idCategory}`,
      type: "PUT",
      data: { CategoryName: CategoryName, Prefix: Prefix },
    });
    window.location.reload();

    idCategory = 0;
  } catch (error) {
    console.log(error);
  }
};

handleDelete = async (id) => {
  try {
    let processed = confirm("Do you want to delete this category?");
    if (processed) {
      await $.ajax({
        url: `/category/api/${id}`,
        type: "DELETE",
      });
      window.location.reload();
    }
  } catch (error) {
    alert(error.responseJSON.message);
  }
};
