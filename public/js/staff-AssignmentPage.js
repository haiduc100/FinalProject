let idAssigmnet;
openUpdate = async (id) => {
  try {
    idAssigmnet = id;
    let processed = confirm("Do you want to return this asset?");
    if (processed) {
      // update assignment state
      await $.ajax({
        url: `/assignments/api/_returning/${idAssigmnet}`,
        type: "PUT",
        data: { State: "waitingToReturn" },
      });

      await $.ajax({
        url: `/requestReturning/api`,
        type: "POST",
        data: { AssignmentId: idAssigmnet },
      }).then((data) => {
        alert(data.status);
        window.location.reload();
      });
    } else {
      return;
    }
  } catch (error) {
    console.log(error);
  }
};
let assetId;
openReport = async (id) => {
  idAssigmnet = id;
  let processed = confirm("Do you want to report this asset?");
  if (processed) {
    await $.ajax({
      url: `/assignments/api/_returning/${idAssigmnet}`,
      type: "PUT",
      data: { State: "reported" },
    });

    await $.ajax({
      url: `/assignments/api/${idAssigmnet}`,
      type: "GET",
    })
      .then(async (data) => {
        // create requestRepair
        assetId = data.assignment.AssetId._id;
        await $.ajax({
          url: `/requestRepair/api/_staff`,
          type: "POST",
          data: {
            Category: data.assignment.AssetId.Category,
            AssetId: assetId,
          },
        }).then((data) => {
          alert(data.status);
          window.location.reload();
        });
      })
      .catch((e) => {
        console.log(e);
      });
  } else {
    return;
  }
};
