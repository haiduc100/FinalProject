openAddModal = async (id) => {
  idRequest = id;
};
handleAddNew = async () => {
  let res = await $.ajax({
    url: `/requestBuyNew/api/${idRequest}`,
    type: "GET",
  });

  //update state request buy new
  await $.ajax({
    url: `/requestBuyNew/api/${idRequest}`,
    type: "PUT",
    data: {
      State: "bought",
    },
  });
  // create Asset
  const AssetName = res.AssetName;
  const Category = res.Category;
  const AssetDate = $(".AssetDate").val().trim();
  const Description = $(".Description").val().trim();
  const Amount = res.Amount;

  const check = new Date(AssetDate).getTime();
  const Now = new Date().getTime();
  if (check < Now) {
    $("#warning_message").html(`<p>Asset Date must be greater than today</p>`);
    return;
  }
  if (!Description || !AssetDate) {
    return;
  }
  await $.ajax({
    url: "/asset/api/_buynew",
    type: "POST",
    data: {
      AssetName: AssetName,
      Category: Category,
      AssetDate: AssetDate,
      Amount: Amount,
      Description: Description,
      RequestBuyNewId: idRequest,
    },
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
let idRequest;

openUpdate = async (id) => {
  try {
    idRequest = id;
    // console.log(idRequest);
    const res = await $.ajax({
      url: `/RequestBuyNew/api/${idRequest}`,
      type: "GET",
    });
    // console.log(res.State);
    // $(".StateUpdate").val(res.State);
    $(".CategoryUpdate").val(res.Category);
    $(".AssetName").val(res.AssetName);
    $(".SuggestionLink").val(res.SuggestionLink);
    $(".Amount").val(res.Amount);
  } catch (error) {
    console.log(error);
  }
};

handleUpdate = async () => {
  try {
    const newState = $(".StateUpdate").val();
    const newCategory = $(".CategoryUpdate").val();
    const newAssetName = $(".AssetName").val();
    // const newSuggestionLink = $(".SuggestionLink").val();
    // const newAmount = $(".Amount").val();
    await $.ajax({
      url: `/RequestBuyNew/api/${idRequest}`,
      type: "PUT",
      data: {
        State: newState,
        Category: newCategory,
        AssetName: newAssetName,
      },
    });
    $("#btnUpdate").prop("disabled", true);
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};
