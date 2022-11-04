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
    await $.ajax({
      url: `/penaltyBill/api/${idPenalty}`,
      type: "GET",
    })
      .then(async (data) => {
        await $(".OldQualityUpdate").val(data.data.OldQuality);
        await $(".NewQualityUpdate").val(data.data.NewQuality);
        await $(".IsFinesUpdate").val(data.data.IsFines);
        await $(".StaffCodeUpdate").val(data.data.UserId.StaffCode);
        await $(".Deadline").val(
          new Date(data.data.Deadline).toISOString().split("T")[0]
        );
        await $(".createPenaltyRule").attr("style", "display: none !important");
        await $(".addbtn").attr("style", "display: none !important");
        await $(".updatePenaltyRule").css("display", "inline-block");
        await $(".updatebtn").css("display", "inline-block");
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (error) {
    console.log(error);
  }
};

handleUpdate = async () => {
  try {
    newIsFines = $(".IsFinesUpdate").val();
    if (!newIsFines) {
      alert("You must fill the input!");
      return;
    }
    await $.ajax({
      url: `/penaltyBill/api/${idPenalty}`,
      type: "PUT",
      data: {
        IsFines: newIsFines,
      },
    })
      .then(async (data) => {
        alert(data.status);
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
