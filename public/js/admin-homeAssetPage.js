handleAddNew = async () => {
  const AssetName = $(".AssetName").val().trim();
  const Category = $(".Category").val().trim();
  const AssetDate = $(".AssetDate").val().trim();

  $.ajax({
    url: "/asset/api",
    type: "POST",
    data: { AssetName, Category, AssetDate },
  })
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
};
