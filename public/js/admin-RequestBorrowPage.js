let idRequest;

openUpdate = async (id) => {
  try {
    idRequest = id;
    const res = await $.ajax({
      url: `/requestBorrow/api/${idRequest}`,
      type: "GET",
    });
    // console.log(res.State);
    // $(".StateUpdate").val(res.State);
    $(".AssetCode").val(res.AssetId.AssetCode);
    $(".CategoryUpdate").val(res.Category);
    $(".RequestBy").val(res.RequestBy.StaffCode);
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
    if (newState == "signed") {
      await $.ajax({
        url: `/requestBorrow/api/${idRequest}`,
        type: "PUT",
        data: {
          State: newState,
        },
      });
      await $.ajax({
        url: `/assignment/api`,
        type: "POST",
        data: {
          State: newState,
          AssignById: idRequest,
        },
      });
    }
    $("#btnUpdate").prop("disabled", true);

    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};
