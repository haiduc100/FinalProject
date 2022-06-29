async function newAsset() {
  const AssetName = $("#AssetName").val().trim();
  const Amount = $("#Amount").val();
  const Category = $("#Category").val();
  const assets = await $.ajax({
    url: "/home/requestByAssetNew",
    type: "POST",
    data: {
      AssetName: AssetName,
      Amount: Amount,
      Category: Category,
    },
  })
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      alert(error.responseJSON.message);
    });
}

SearchAsset = () => {
  const inp = $(".form-control").val().trim();
  if (inp.length === 0) {
    alert("You must fill the search before you can search!!!");
  } else {
    window.location.href = `/home/find?search=${inp}`;
  }
};

async function log(page, limit) {
  const inp = window.location.href.split("/")[4];
  const res = await $.ajax({
    url: `/home/${inp}&page=${page}&limit=${limit}`,
    type: "GET",
  });
  $(".body").html(res);
}
