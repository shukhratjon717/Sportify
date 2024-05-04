console.log("Signup frontend javascript file");

$(function () {
  const fileTarget = $(".file-box .upload-hidden");
  let filename;
  fileTarget.on("change", function () {
    if (window.FileReader) {
      const uploadFile = $(this)[0].files[0];
      const fileType = uploadFile["type"];
      const validImageType = ["image/jpg", "image/jpeg", "image/png"];
      if (!validImageType.includes(fileType)) {
        alert("Pease insert only jpeg, jpg, png!");
      } else {
        if (uploadFile) {
          console.log(URL.createObjectURL(uploadFile));
          $(".upload-img-frame")
            .attr("src", URL.createObjectURL(uploadFile))
            .addClass("success");
        }
        filename = $(this)[0].files[0].name;
      }
      $(this).siblings(".upload-name").val(filename);
    }
  });
});

function validateSignupForm() {
  const userNick = $(".user-nick").val();
  const userPhone = $(".user-phone").val();
  const userPassword = $(".user-password").val();
  const confirmPassword = $(".confirm-password").val();

  if (
    userNick === "" ||
    userPhone === "" ||
    userPassword === "" ||
    confirmPassword === ""
  ) {
    alert("Please insert all required inputs");
    return false;
  }

  if (userPassword !== confirmPassword) {
    alert("Password is different please check!");
    return false;
  }

  const userImage = $(".user-image").get(0).files[0]
    ? $(".user-image").get(0).files[0].name
    : mull;
  if (!userImage) {
    alert("Please insert shop image!");
    return false
  }
}
