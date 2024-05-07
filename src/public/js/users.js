console.log("Users frontend javascript file");

$(function () {
  $(".user-status").on("change", function (e) {
    const id = e.target.id,
      userStatus = $(`#${id}.user-status`).val();

    // TODO: Axios updateChosenUser   // rest API
    axios
      .post("/admin/user/edit", {
        _id: id,
        userStatus: userStatus,
      })
      .then((response) => {
        console.log("response:", response);
        const result = response.data;

        if (result.data) {
          $(".user-status").blur();
        } else alert("User update failed!");
      })
      .catch((err) => {
        console.log(err);
        alert("User update failed!");
      });
  });
});
