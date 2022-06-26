openAddModal = () => {
  $(".updateCategory").css("display", "none");
  $(".updatebtn").css("display", "none");
  $(".createCategory").css("display", "inline-block");
  $(".addbtn").css("display", "inline-block");
};

handleAddNew = () => {
  const CategoryName = $(".CategoryName").val().trim();

  $.ajax({
    url: "/category/api",
    type: "POST",
    data: { CategoryName: CategoryName },
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
    idCategory = id;
    console.log(28, idCategory);
    const res = await $.ajax({
      url: `/category/api/${idCategory}`,
      type: "GET",
    });

    $(".CategoryNameUpdate").val(res.CategoryName);
    console.log(res);

    $(".createCategory").css("display", "none");
    $(".addbtn").css("display", "none");
    $(".updateCategory").css("display", "inline-block");
    $(".updatebtn").css("display", "inline-block");
  } catch (error) {
    console.log(error);
  }
};

handleUpdate = async () => {
  try {
    const CategoryName = $(".CategoryNameUpdate").val().trim();
    await $.ajax({
      url: `/category/api/${idCategory}`,
      type: "PUT",
      data: CategoryName,
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
