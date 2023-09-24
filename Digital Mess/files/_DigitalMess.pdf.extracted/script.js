function validateForm() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  if (
    username === "Jumpman" &&
    hasher(password) ===
      "0384bffa403214fb8d287624521b78307002e9abc0c0d90ccd3a0912e7651008"
  ) {
    var answer = document.querySelector(".answer");
    answer.innerHTML = "Congratulations, the key is: <br> milanCTF{4nD_th3y_l1ved_h4pp1ly_3v3r_4fter}";
    return false;
  } else {
    alert("Invalid username or password");
    return false;
  }
}