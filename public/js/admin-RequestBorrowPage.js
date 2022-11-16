openAddModal = (id) => {
  idRequest = id;
  $("#exampleModalLabel").html("Add new quality");

  // $(".updateAsset").attr("style", "display: none !important");
  // $(".updatebtn").attr("style", "display: none !important");
  // $(".createAsset").css("display", "inline-block");
  // $(".addbtn").css("display", "inline-block");
  // $("#exampleModalLabel").html("Add ass");
};

handleAddNew = async () => {
  const res = await $.ajax({
    url: `/requestBorrow/api/${idRequest}`,
    type: "GET",
  });
  const Quality = $(".Quality").val().trim();
  if (!Quality) {
    alert("Please fill the input!");
    return;
  }
  if (Quality > 100 || Quality < 0) {
    alert("Quality must be between 0 and 100");
    return;
  }
  // update request borrow state
  await $.ajax({
    url: `/requestBorrow/api/_stocker/${idRequest}`,
    type: "PUT",
    data: {
      State: "assigned",
    },
  });

  //create quality
  await $.ajax({
    url: "/quality/api",
    type: "POST",
    data: { Quality: Quality, AssetId: res.AssetId._id },
  })
    .then(async (data) => {
      if (data) {
        //create assignment
        let qltId = data.data._id;
        await $.ajax({
          url: "/assignments/api",
          type: "POST",
          data: {
            AssignToId: res.RequestBy._id,
            SignedBy: res.Approval,
            AssetId: res.AssetId._id,
          },
        }).then(async (data) => {
          if (data) {
            //create storage
            await $.ajax({
              url: "/storage/api",
              type: "POST",
              data: {
                AssignmentId: data.newAssignment._id,
                Type: "export",
                StockerId: data.newAssignment.AssignById,
                QualityId: qltId,
              },
            }).then(() => {
              alert("Create assignment successfully!");
              window.location.reload();
            });
          }
        });
      }
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
    $("#exampleModalLabel").html("Update request borrow");
    idRequest = id;
    const res = await $.ajax({
      url: `/requestBorrow/api/${idRequest}`,
      type: "GET",
    });
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
    }).then(async (data) => {
      if (newState == "deniedByDirector" || newState == "denied") {
        await $.ajax({
          url: `/asset/api/${data.data.AssetId}`,
          type: "PUT",
          data: {
            State: "available",
          },
        }).then(() => {
          alert("Denied successfully!");
          window.location.reload();
        });
      }
    });

    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};
