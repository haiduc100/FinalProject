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
let assignmentId;
let assignToId;
handleUpdate = async () => {
  try {
    let newQuality = $(".Quality").val().trim();
    const newState = $(".StateUpdate").val();
    if (!newQuality || !newState) {
      return;
    }
    if (newQuality > 100 || newQuality < 0) {
      alert("new quality must be between 0 and 100!!!");
      return;
    }
    await $.ajax({
      url: `/requestReturning/api/${idRequest}`,
      type: "PUT",
      data: { State: newState },
    })
      .then(async (data) => {
        assignmentId = data.data.AssignmentId;
        let assmRes = await $.ajax({
          url: `/assignments/api/${assignmentId}`,
          type: "GET",
        });
        assignToId = assmRes.assignment.AssignToId;
        if (newState == "completed") {
          //create new quality for asset after return
          await $.ajax({
            url: `/quality/api`,
            type: "POST",
            data: {
              AssetId: assmRes.assignment.AssetId._id,
              Quality: newQuality,
            },
          }).then(async (data) => {
            // crate storage event
            await $.ajax({
              url: `/storage/api`,
              type: "POST",
              data: {
                AssignmentId: assignmentId,
                RequestReturnId: idRequest,
                Type: "import",
                QualityId: data.data._id,
              },
            }).then(async (data) => {
              let newStorageId = data.data._id;
              await $.ajax({
                url: `/storage/api/_quality/${assignmentId}`,
                type: "GET",
              }).then((data) => {
                let checkPenalty = +data.data - +newQuality;
                //create penaltyBill
                if (checkPenalty > 10) {
                  $.ajax({
                    url: `/penaltyBill/api`,
                    type: "POST",
                    data: {
                      Percent: checkPenalty,
                      OldQuality: data.data,
                      NewQuality: newQuality,
                      StorageId: newStorageId,
                      UserId: assignToId,
                    },
                  }).then((data) => {
                    alert("Low quality " + data.status);
                    window.location.reload();
                  });
                } else {
                  alert("Return asset done!!!");
                  window.location.reload();
                }
              });
            });
          });
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
