let idRequest;

openUpdate = async (id) => {
  try {
    idRequest = id;
    console.log(idRequest);
    const res = await $.ajax({
      url: `/requestByNew/api/${idRequest}`,
      type: "GET",
    });
    console.log(res.State);
    $(".StateUpdate").val(res.State);
    $(".CategoryUpdate").val(res.Category);
    $(".AssetName").val(res.AssetName);
  } catch (error) {
    console.log(error);
  }
};

handleUpdate = async () => {
  try {
    const newState = $(".StateUpdate").val();
    const newCategory = $(".CategoryUpdate").val();
    const newAssetName = $(".AssetName").val();
    await $.ajax({
      url: `/requestByNew/api/${idRequest}`,
      type: "PUT",
      data: {
        State: newState,
        Category: newCategory,
        AssetName: newAssetName,
      },
    });

    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};
