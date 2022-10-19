openAddModal = () => {
  $(".updateAsset").attr("style", "display: none !important");
  $(".updatebtn").attr("style", "display: none !important");
  $(".createAsset").css("display", "inline-block");
  $(".addbtn").css("display", "inline-block");
};

handleAddNew = () => {
  const AssetName = $(".AssetName").val().trim().toUpperCase();
  const Category = $(".Category").val().trim();
  const Price = $(".Price").val().trim();
  const Description = $(".Description").val().trim();
  const Amount = $(".Amount").val().trim();
  const SuggestionLink = $(".SuggestionLink").val().trim();

  if (
    !AssetName ||
    !Description ||
    !Category ||
    !Price ||
    !Amount ||
    !SuggestionLink
  ) {
    return;
  }
  $.ajax({
    url: "/RequestBuyNew/api",
    type: "POST",
    data: { AssetName, Category, Price, Amount, Description, SuggestionLink },
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

    $(".createAsset").attr("style", "display: none !important");
    $(".addbtn").attr("style", "display: none !important");
    $(".updateAsset").attr("style", "display:inline-block");
    $(".updatebtn").attr("style", "display:inline-block");
  } catch (error) {
    console.log(error);
  }
};

handleUpdate = async () => {
  try {
    const Description = $(".DescriptionBorrow").val().trim();
    const res = await $.ajax({
      url: `/asset/api/${idAsset}`,
      type: "GET",
    });

    await $.ajax({
      url: `/requestBorrow/api`,
      type: "POST",
      data: {
        AssetId: idAsset,
        Description: Description,
        Category: res.asset.Category,
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
    let processed = confirm("Do you want to delete this request?");
    if (processed) {
      await $.ajax({
        url: `/requestBorrow/api/${id}`,
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
    window.location.href = `/asset/filter?search=${inp}`;
  }
};
