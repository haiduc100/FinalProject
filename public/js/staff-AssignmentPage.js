let idAssigmnet;
openUpdate = async (id) => {
  try {
    idAssigmnet = id;
    let processed = confirm("Do you want to return this asset?");
    if (processed) {
      let res = await $.ajax({
        url: `/requestReturning/api`,
        type: "POST",
        data: { AssignmentId: idAssigmnet },
      });
      alert(res.status);
      // console.log(res.status);
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
      url: `/assignments/api/${idAssigmnet}`,
      type: "GET",
    })
      .then(async (data) => {
        // create requestRepair
        assetId = data.assignment.AssetId._id;
        console.log(data.assignment.AssetId);
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
