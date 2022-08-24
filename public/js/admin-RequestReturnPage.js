let idRequest;

openUpdate = async (id) => {
  try {
    idRequest = id;
    const res = await $.ajax({
      url: `/requestReturning/api/${idRequest}`,
      type: "GET",
    });
    $(".AssetCode").val(res.AssetId);
    $(".RequestBy").val(res.RequestBy);
  } catch (error) {
    console.log(error);
  }
};

handleUpdate = async () => {
  try {
    const newState = $(".StateUpdate").val();
    await $.ajax({
      url: `/requestReturning/api/${idRequest}`,
      type: "PUT",
      data: { State: newState },
    });

    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

handleExport = async () => {
  try {
    const res = await $.ajax({
      url: "/report/api",
      type: "GET",
    });
    alert(res.message);
  } catch (error) {
    console.log(error);
  }
};
