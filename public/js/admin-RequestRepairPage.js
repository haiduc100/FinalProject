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
openUpdate = async (id) => {
  let processed = confirm("Do you want to repair this asset?");
  if (processed) {
    idRequest = id;
    // update asset State
    await $.ajax({
      url: `/requestRepair/api/${idRequest}`,
      type: "GET",
    })
      .then(async (data) => {
        assetId = data.data.AssetId;
        await $.ajax({
          url: `/asset/api/${assetId}`,
          type: "PUT",
          data: {
            State: "repairing",
          },
        }).then(async () => {
          //get latest quality
          await $.ajax({
            url: `/quality/api/_latest/${assetId}`,
            type: "GET",
          }).then(async (data) => {
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
                QualityId: data.data._id,
              },
            }).then(async () => {
              await $(`#updatebtn${id}`).prop("disabled", true);
              alert("Repair successfully!");
              window.location.reload();
            });
          });
        });
      })
      .catch((e) => {
        console.log(e);
      });
  } else {
    return;
  }
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
    }).then(async () => {
      await $(`#signbtn${id}`).prop("disabled", true);
      alert("Sign successfully!");
      window.location.reload();
    });
  } else {
    return;
  }
};
