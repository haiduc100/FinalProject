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
  const res = await $.ajax({
    url: `/home/pagination?page=${page}&limit=${limit}`,
    type: "GET",
  });
  $(".div-table").html(res);
}

// bắt đầu làm cái openUpdate
// async function AddAsset() {
//   try {
//     const idAsset = id;
//     console.log(28, idAsset);
//     const res = await $.ajax({
//       url: `/asset/api/${idAsset}`,
//       type: "GET",
//     });

//     $(".CategoryUpdate").val(res.asset.Category);
//     $(".AssetNameUpdate").val(res.asset.AssetName);
//     $(".State").val(res.asset.State);

//     $(".createAsset").css("display", "none");
//     $(".addbtn").css("display", "none");
//     $(".updateAsset").css("display", "inline-block");
//     $(".updatebtn").css("display", "inline-block");
//   } catch (error) {
//     console.log(error);
//   }
// }
