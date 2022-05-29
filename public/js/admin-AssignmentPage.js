openAddModal = () => {
  $(".updateAssignment").css("display", "none");
  $(".updatebtn").css("display", "none");
  $(".createAssignment").css("display", "inline-block");
  $(".addbtn").css("display", "inline-block");
};

handleAddNew = () => {
  const AssignToId = $(".AssignTo").val().trim();
  const AssetId = $(".AssetName").val().trim();
  const Note = $(".Note").val().trim();

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
    $(".AssignToUpdate").val(res.assignments.AssignToId);
    $(".AssetNameUpdate").val(res.assignments.AssetId);
    $(".NoteUpdate").val(res.assignments.Note);
    $(".TransferringUpdate").val(res.assignments.TransferringId);

    $(".createAssignment").css("display", "none");
    $(".addbtn").css("display", "none");
    $(".updateAssignment").css("display", "inline-block");
    $(".updatebtn").css("display", "inline-block");
  } catch (error) {
    console.log(error);
  }
};

handleUpdate = async () => {
  try {
    const AssignTo = $(".AssignToUpdate").val();
    const AssetName = $(".AssetNameUpdate").val();
    const Transferring = $(".TransferringUpdate").val();
    const Note = $(".NoteUpdate").val();

    console.log(39, Note);
    await $.ajax({
      url: `/assignments/api/${idAssigmnet}`,
      type: "PUT",
      data: {
        AssignToId: AssignTo,
        AssetId: AssetName,
        TransferringId: Transferring,
        Note: Note,
      },
    });
    window.location.reload();

    idAssigmnet = 0;
  } catch (error) {
    console.log(error);
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
