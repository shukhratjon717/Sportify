console.log("Signup frontend javascript file");

$(function () {});

function validatesignupForm() {
  const userNick = $(".user-nick").val();
  const userPhone = $(".user-phone").val();
  const userPasswod = $(".user-password").val();
  const confirmPassword = $(".confirm-passwod").val();
}

if (
  userNick === "" ||
  userPhone === "" ||
  userPasswod === "" ||
  confirmPassword === ""
) {
  alert("Please insert all required inputs");
  return false;
}

if (userPasswod !== confirmPassword) {
  alert("Password is different please check!");
  return false;
}
