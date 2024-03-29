openAddModal = () => {
  $(".updateAsset").attr("style", "display: none !important");
  $(".updatebtn").attr("style", "display: none !important");
  $(".createAsset").css("display", "inline-block");
  $(".addbtn").css("display", "inline-block");
};

handleRepair = async (id) => {
  let processed = confirm("Do you want repair this asset?");
  if (processed) {
    let res = await $.ajax({
      url: `/asset/api/${id}`,
      type: "GET",
    });
    await $.ajax({
      url: `/asset/api/${id}`,
      type: "PUT",
      data: {
        State: "waitingRepair",
      },
    })
      .then(async () => {
        await $.ajax({
          url: `/requestRepair/api/_stocker`,
          type: "POST",
          data: {
            AssetId: id,
            Category: res.data.Category,
          },
        }).then(async (data) => {
          alert(data.status);
          window.location.reload();
        });
      })
      .catch((e) => {
        console.log(e);
      });
  } else {
    return;
  }
};
handleAddNew = () => {
  const AssetName = $(".AssetName").val().trim().toUpperCase();
  const Category = $(".Category").val().trim();
  const AssetDate = $(".AssetDate").val().trim();
  const Description = $(".Description").val().trim();
  const Amount = $(".Amount").val().trim();

  const check = new Date(AssetDate).getTime();
  const Now = new Date().getTime();
  if (check < Now) {
    $("#warning_message").html(`<p>Asset Date must be greater than today</p>`);
    return;
  }
  if (!AssetName || !Description || !Category || !AssetDate || !Amount) {
    return;
  }
  $.ajax({
    url: "/asset/api",
    type: "POST",
    data: { AssetName, Category, AssetDate, Amount, Description },
  })
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      if (error.status === 400) {
        alert(error.responseJSON.message);
      }
    });
};

let idAsset;
openUpdate = async (id) => {
  try {
    idAsset = id;
    const res = await $.ajax({
      url: `/asset/api/${idAsset}`,
      type: "GET",
    });

    $(".CategoryUpdate").val(res.data.Category);
    $(".AssetNameUpdate").val(res.data.AssetName);
    $(".State").val(res.data.State);
    $(".DescriptionUpdate").val(res.data.Description);
    $(".AssetCodeUpdate").val(res.data.AssetCode);
  } catch (error) {
    console.log(error);
  }
};

handleUpdate = async () => {
  try {
    const Category = $(".CategoryUpdate").val();
    const AssetName = $(".AssetNameUpdate").val().trim().toUpperCase();
    const State = $(".State").val();
    const Description = $(".DescriptionUpdate").val().trim();
    const AssetCode = $(".AssetCodeUpdate").val().trim();
    await $.ajax({
      url: `/asset/api/${idAsset}`,
      type: "PUT",
      data: {
        Category: Category,
        AssetName: AssetName,
        State: State,
        Description: Description,
        AssetCode: AssetCode,
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
      }).then((data) => {
        alert(data.message);
        window.location.reload();
      });
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
    window.location.href = `/asset/filter?search=${inp}`;
  }
};
