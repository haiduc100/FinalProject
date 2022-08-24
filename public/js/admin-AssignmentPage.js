openAddModal = () => {
  $(".updateAssignment").attr("style", "display: none !important");
  $(".updatebtn").attr("style", "display: none !important");
  $(".createAssignment").css("display", "inline-block");
  $(".addbtn").css("display", "inline-block");
};

handleAddNew = () => {
  const AssignToId = $(".AssignTo").val().trim();
  const AssetId = $(".AssetName").val().trim();
  const Note = $(".Note").val().trim();
  if (!AssignToId || !AssetId || !Note) {
    return;
  }
  $.ajax({
    url: "/assignments/api",
    type: "POST",
    data: { AssignToId, AssetId, Note },
  })
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      alert(error.responseJSON.message);
    });
};

let idAssigmnet;
openUpdate = async (id) => {
  try {
    idAssigmnet = id;
    const res = await $.ajax({
      url: `/assignments/api/${idAssigmnet}`,
      type: "GET",
    });
    $(".AssetNameUpdate").val(res.assignments.AssetId);
    $(".NoteUpdate").val(res.assignments.Note);
    $(".TransferringUpdate").val(res.assignments.TransferringId);

    $(".createAssignment").attr("style", "display: none !important");
    $(".addbtn").attr("style", "display: none !important");
    $(".updateAssignment").css("display", "inline-block");
    $(".updatebtn").css("display", "inline-block");
  } catch (error) {
    console.log(error);
  }
};

handleUpdate = async () => {
  try {
    const AssetName = $(".AssetNameUpdate").val();
    const Transferring = $(".TransferringUpdate").val();
    const Note = $(".NoteUpdate").val();
    const State = $(".StateUpdate").val();
    await $.ajax({
      url: `/assignments/api/${idAssigmnet}`,
      type: "PUT",
      data: {
        AssetId: AssetName,
        TransferringId: Transferring,
        Note: Note,
        State: State,
      },
    });
    window.location.reload();

    idAssigmnet = 0;
  } catch (error) {
    if (error.status === 400) {
      alert(error.responseJSON.message);
    }
  }
};

handleDelete = async (id) => {
  try {
    let processed = confirm("Do you want to delete this assignment?");
    if (processed) {
      await $.ajax({
        url: `/assignments/api/${id}`,
        type: "DELETE",
      });
      window.location.reload();
    }
  } catch (error) {
    alert(error.responseJSON.message);
  }
};
