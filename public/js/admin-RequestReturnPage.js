let idRequest;

openUpdate = async (id) => {
  try {
    idRequest = id;
    const res = await $.ajax({
      url: `/requestReturning/api/${idRequest}`,
      type: "GET",
    });
    const assignment = await $.ajax({
      url: `/assignments/api/${res.AssignmentId._id}`,
      type: "GET",
    });
    $(".AssetCode").val(assignment.assignment.AssetId.AssetCode);
    $(".RequestBy").val(res.RequestBy.StaffCode);
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
    })
      .then(async (data) => {
        console.log(data.data);
        let assmRes = await $.ajax({
          url: `/assignments/api/${data.data.AssignmentId}`,
          type: "GET",
        });
        console.log(assmRes.assignment.AssetId._id);
        if (newState == "completed") {
          //create new quality for asset after return
          await $.ajax({
            url: `/quality/api`,
            type: "POST",
            data: {
              AssetId: assmRes.assignment.AssetId._id,
              Quality: $(".Quality").val(),
            },
          }).then(() => {});
        }
      })
      .catch((error) => {
        if (error.status === 400) {
          alert(error.responseJSON.message);
        }
      });
  } catch (error) {
    console.log(error);
  }
};

// handleExport = async () => {
//   try {
//     const res = await $.ajax({
//       url: "/report/api",
//       type: "GET",
//     });
//     alert(res.message);
//   } catch (error) {
//     console.log(error);
//   }
// };
