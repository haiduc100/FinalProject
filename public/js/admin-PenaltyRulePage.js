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

let idPenalty;
openUpdate = async (id) => {
  try {
    idPenalty = id;
    const res = await $.ajax({
      url: `/penaltyRule/api/${idPenalty}`,
      type: "GET",
    });
    $(".PercentUpdate").val(res.penaltyRule.Percent);
    $(".AmountUpdate").val(res.penaltyRule.Amount);

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
