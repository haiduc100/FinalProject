openAddModal = () => {
  $(".updatePenaltyRule").attr("style", "display: none !important");
  $(".updatebtn").attr("style", "display: none !important");
  $(".createPenaltyRule").css("display", "inline-block");
  $(".addbtn").css("display", "inline-block");
};

let idPenalty;
openUpdate = async (id) => {
  try {
    idPenalty = id;
    const res = await $.ajax({
      url: `/penaltyBill/api/${idPenalty}`,
      type: "GET",
    });
    $(".OldQualityUpdate").val(res.data.OldQuality);
    $(".NewQualityUpdate").val(res.data.NewQuality);
    $(".IsFinesUpdate").val(res.data.IsFines);
    $(".StaffCodeUpdate").val(res.data.UserId.StaffCode);

    $(".createPenaltyRule").attr("style", "display: none !important");
    $(".addbtn").attr("style", "display: none !important");
    $(".updatePenaltyRule").css("display", "inline-block");
    $(".updatebtn").css("display", "inline-block");
  } catch (error) {
    console.log(error);
  }
};

handleUpdate = async () => {
  try {
    const Percent = $(".PercentUpdate").val().trim();
    const Amount = $(".AmountUpdate").val().trim();
    await $.ajax({
      url: `/penaltyRule/api/${idPenalty}`,
      type: "PUT",
      data: { Percent: Percent, Amount: Amount },
    })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        if (error.status === 400) {
          alert(error.responseJSON.message);
        }
      });

    idPenalty = 0;
  } catch (error) {
    console.log(error);
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
