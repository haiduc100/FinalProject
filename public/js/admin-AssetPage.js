openAddModal = () => {
  $(".updateAsset").css("display", "none");
  $(".updatebtn").css("display", "none");
  $(".createAsset").css("display", "inline-block");
  $(".addbtn").css("display", "inline-block");
};

handleAddNew = () => {
  const AssetName = $(".AssetName").val().trim();
  const Category = $(".Category").val().trim();
  const AssetDate = $(".AssetDate").val().trim();

  $.ajax({
    url: "/asset/api",
    type: "POST",
    data: { AssetName, Category, AssetDate },
  })
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
};

let idAsset;
openUpdate = async (id) => {
  try {
    idAsset = id;
    console.log(28, idAsset);
    const res = await $.ajax({
      url: `/asset/api/${idAsset}`,
      type: "GET",
    });

    $(".CategoryUpdate").val(res.asset.Category);
    $(".AssetNameUpdate").val(res.asset.AssetName);
    $(".State").val(res.asset.State);

    $(".createAsset").css("display", "none");
    $(".addbtn").css("display", "none");
    $(".updateAsset").css("display", "inline-block");
    $(".updatebtn").css("display", "inline-block");
  } catch (error) {
    console.log(error);
  }
};

handleUpdate = async () => {
  try {
    const Category = $(".CategoryUpdate").val();
    const AssetName = $(".AssetNameUpdate").val().trim();
    const State = $(".State").val();
    await $.ajax({
      url: `/asset/api/${idAsset}`,
      type: "PUT",
      data: {
        Category: Category,
        AssetName: AssetName,
        State: State,
      },
    });
    window.location.reload();

    idAsset = 0;
  } catch (error) {
    console.log(error);
  }
};

handleDelete = async (id) => {
  try {
    let processed = confirm("Do you want to delete this asset?");
    if (processed) {
      await $.ajax({
        url: `/asset/api/${id}`,
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
  
  window.location.href = `/asset/filter?search=${inp}`;
};
