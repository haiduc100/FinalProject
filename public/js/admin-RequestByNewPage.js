let idRequest;

openUpdate = async (id) => {
  try {
    idRequest = id;
    // console.log(idRequest);
    const res = await $.ajax({
      url: `/requestByNew/api/${idRequest}`,
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
      url: `/requestByNew/api/${idRequest}`,
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
