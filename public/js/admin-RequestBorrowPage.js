openAddModal = (id) => {
  idRequest = id;

  // $(".updateAsset").attr("style", "display: none !important");
  // $(".updatebtn").attr("style", "display: none !important");
  // $(".createAsset").css("display", "inline-block");
  // $(".addbtn").css("display", "inline-block");
};

handleAddNew = async () => {
  const res = await $.ajax({
    url: `/requestBorrow/api/${idRequest}`,
    type: "GET",
  });

  const Quality = $(".Quality").val().trim();
  //create quality
  await $.ajax({
    url: "/quality",
    type: "POST",
    data: { Quality: Quality, AssetId: res.AssetId },
  })
    .then(() => {
      window.location.reload();
    })

    .catch((error) => {
      if (error.status === 400) {
        alert(error.responseJSON.message);
      }
    });

  //create assignment
  let asssignmentRes = await $.ajax({
    url: "/assignment",
    type: "POST",
    data: {
      AssignToId: res.RequestBy,
      SignedBy: res.Approval,
      AssetId: res.AssetId,
    },
  }).catch((error) => {
    if (error.status === 400) {
      alert(error.responseJSON.message);
    }
  });
  //create storage
  await $.ajax({
    url: "/storage",
    type: "POST",
    data: {
      AssignmentId: res.RequestBy,
      Type: "export",
      StockerId: asssignmentRes.AssignById,
    },
  }).catch((error) => {
    if (error.status === 400) {
      alert(error.responseJSON.message);
    }
  });
};

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
    // $("#btnUpdate").prop("disabled", true);

    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};
