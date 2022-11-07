openAddModal = async (id) => {
  idRequest = id;
};
handleAddNew = async () => {
  const AssetDate = $(".AssetDate").val().trim();
  const Description = $(".Description").val().trim();

  const check = new Date(AssetDate).getTime();
  const Now = new Date().getTime();
  if (check < Now) {
    alert("Asset Date must be greater than today");
    return;
  }
  if (!Description || !AssetDate) {
    alert("You must fill the input");
    return;
  }
  let res = await $.ajax({
    url: `/requestBuyNew/api/${idRequest}`,
    type: "GET",
  });

  //update state request buy new
  await $.ajax({
    url: `/requestBuyNew/api/${idRequest}`,
    type: "PUT",
    data: { State: "bought" },
  });
  // create Asset
  const Amount = res.Amount;
  const AssetName = res.AssetName;
  const Category = res.Category;

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
    .then(async () => {
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
    $(".Reason").val(res.Reason);
  } catch (error) {
    console.log(error);
  }
};

handleUpdate = async () => {
  try {
    const newState = $(".StateUpdate").val();
    const newCategory = $(".CategoryUpdate").val();
    const newAssetName = $(".AssetName").val();
    const newReason = $(".Reason").val().trim();
    if (!newState || !newReason) {
      alert("You must fill the input");
      return;
    }
    await $.ajax({
      url: `/RequestBuyNew/api/${idRequest}`,
      type: "PUT",
      data: {
        State: newState,
        Category: newCategory,
        AssetName: newAssetName,
        Reason: newReason,
      },
    });
    if (newState == "signed" || newState == "deniedByDirector") {
      window.location.reload();
    } else {
      console.log("hi");
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
};
