openAddModal = () => {
  $(".updatePenaltyRule").attr("style", "display: none !important");
  $(".updatebtn").attr("style", "display: none !important");
  $(".createPenaltyRule").css("display", "inline-block");
  $(".addbtn").css("display", "inline-block");
};

handleAddNew = () => {
  const Percent = $(".Percent").val().trim();
  const Amount = $(".Amount").val().trim();

  if (!Percent || !Amount) {
    return;
  }
  $.ajax({
    url: "/penaltyRule/api",
    type: "POST",
    data: { Percent: Percent, Amount: Amount },
  })
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
      alert(error.responseJSON.message);
    });
};

let idRequest;
let assetId;
let checkPenalty;
let qualityId;
let olderQuality;
let newStorageId;
let staffId;
handleUpdate = async () => {
  let newQuality = $(".Quality").val().trim();
  if (!newQuality) {
    alert("You must enter quality");
    return;
  }
  if (newQuality > 100 || newQuality < 0) {
    alert("new quality must be between 0 and 100!!!");
    return;
  }

  // update asset State
  await $.ajax({
    url: `/requestRepair/api/${idRequest}`,
    type: "GET",
  })
    .then(async (data) => {
      // update assignment state
      assetId = data.data.AssetId;
      staffId = data.data.StaffId;
      await $.ajax({
        url: `/assignments/api/_repair/${assetId}`,
        type: "PUT",
        data: {
          IsReturning: true,
        },
      });
      // update asset State
      await $.ajax({
        url: `/asset/api/${assetId}`,
        type: "PUT",
        data: {
          State: "repairing",
        },
      }).then(async () => {
        // create quality
        await $.ajax({
          url: `/quality/api/`,
          type: "POST",
          data: {
            Quality: newQuality,
            AssetId: assetId,
          },
        }).then(async (data) => {
          // get quality before import
          qualityId = data.data._id;
          await $.ajax({
            url: `/quality/api/_latestexport/${assetId}`,
            type: "GET",
          }).then(async (data) => {
            checkPenalty = +data.data.Quality - +newQuality;
            olderQuality = data.data.Quality;
          });
          // import asset
          await $.ajax({
            url: `/storage/api`,
            type: "POST",
            data: {
              RequestRepairId: idRequest,
              Type: "import",
              QualityId: qualityId,
            },
          }).then(async (data) => {
            await $.ajax({
              url: `/penaltyBill/api`,
              type: "POST",
              data: {
                Percent: checkPenalty,
                OldQuality: olderQuality,
                NewQuality: newQuality,
                StorageId: data.data._id,
                UserId: staffId,
              },
            });
            // update stockerId
            await $.ajax({
              url: `/requestRepair/api/_stocker/${idRequest}`,
              type: "PUT",
            });
            // create storage event
            await $.ajax({
              url: `/storage/api`,
              type: "POST",
              data: {
                RequestRepairId: idRequest,
                Type: "export",
                QualityId: qualityId,
              },
            }).then(() => {
              alert("Send to repair and create penalty bill  successfully!");
              window.location.reload();
            });
          });
        });
      });
    })
    .catch((e) => {
      console.log(e);
    });
};
openUpdate = async (id) => {
  idRequest = id;
};

handleDelete = async (id) => {
  try {
    let processed = confirm("Do you want to delete this rule?");
    if (processed) {
      await $.ajax({
        url: `/penaltyRule/api/${id}`,
        type: "DELETE",
      });
      window.location.reload();
    }
  } catch (error) {
    alert(error.responseJSON.message);
  }
};

handleSign = async (id) => {
  let processed = confirm("Do you want to sign this request?");
  if (processed) {
    await $.ajax({
      url: `/requestRepair/api/_director/${id}`,
      type: "PUT",
      data: {
        State: "accpeted",
      },
    }).then(() => {
      alert("Sign successfully!");
      window.location.reload();
    });
  } else {
    return;
  }
};
