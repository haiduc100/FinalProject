let idRequest;

openUpdate = async (id) => {
  try {
    idRequest = id;
    // console.log(idRequest);
    const res = await $.ajax({
      url: `/requestBorrow/api/${idRequest}`,
      type: "GET",
    });
    // console.log(res.State);
    // $(".StateUpdate").val(res.State);
    $(".AssetCode").val(res.AssetId);
    $(".CategoryUpdate").val(res.Category);
    $(".RequestBy").val(res.RequestBy);
    $(".Description").val(res.Description);
  } catch (error) {
    console.log(error);
  }
};

handleUpdate = async () => {
  try {
    const newState = $(".StateUpdate").val();
    await $.ajax({
      url: `/requestBorrow/api/${idRequest}`,
      type: "PUT",
      data: {
        State: newState,
      },
    });
    $("#btnUpdate").prop("disabled", true);
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};
