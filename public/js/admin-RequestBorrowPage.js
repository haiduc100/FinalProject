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
    if (newState == "accepted") {
      const res = await $.ajax({
        url: `/requestBorrow/api/${idRequest}`,
        type: "GET",
      });

      await $.ajax({
        url: "/assignments/api",
        type: "POST",
        data: { AssignToId: res.RequestBy, AssetId: res.AssetId },
      });
    }
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};
