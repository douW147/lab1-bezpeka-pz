function toggleMode() {
  var encryptionDiv = document.getElementById("encryption");
  var decryptionDiv = document.getElementById("decryption");

  if (encryptionDiv.style.display === "block") {
      encryptionDiv.style.display = "none";
      decryptionDiv.style.display = "block";
  } else {
      encryptionDiv.style.display = "block";
      decryptionDiv.style.display = "none";
  }

  document.getElementById("plaintext").value = "";
  document.getElementById("key").value = "";
  document.getElementById("encrypted_text").value = "";
  document.getElementById("decryption_key").value = "";
  document.getElementById("decrypted_result").innerText = "";
}

function encrypt() {
  var plaintext = document.getElementById("plaintext").value;
  var key = document.getElementById("key").value;
  var encrypted_text = '';
  var key_positions = [];

  for (var i = 0; i < plaintext.length; i++) {
      var key_pos = i % key.length;
      var char_code = plaintext.charCodeAt(i) ^ key.charCodeAt(key_pos);
      encrypted_text += String.fromCharCode(char_code);
      key_positions.push(key_pos);
  }

  document.getElementById("plaintext").value = "";
  document.getElementById("key").value = "";
  document.getElementById("encryption").style.display = "none";
  document.getElementById("decryption").style.display = "block";
  document.getElementById("encrypted_text").value = encrypted_text;
  document.getElementById("decryption_key").setAttribute("data-key-positions", JSON.stringify(key_positions));
}

function decrypt() {
  var encrypted_text = document.getElementById("encrypted_text").value;
  var key = document.getElementById("decryption_key").value;
  var key_positions = JSON.parse(document.getElementById("decryption_key").getAttribute("data-key-positions"));
  var decrypted_text = '';

  for (var i = 0; i < encrypted_text.length; i++) {
      var key_pos = key_positions[i % key_positions.length];
      var char_code = encrypted_text.charCodeAt(i) ^ key.charCodeAt(key_pos);
      decrypted_text += String.fromCharCode(char_code);
  }

  document.getElementById("decrypted_result").innerText = "Розшифрований текст:\n" + decrypted_text;
}
