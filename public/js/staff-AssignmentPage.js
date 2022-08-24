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
