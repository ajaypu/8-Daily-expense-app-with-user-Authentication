const email = document.querySelector("#email");
const password = document.querySelector("#password");
const form = document.querySelector("#form");

async function onLogin(e) {
  e.preventDefault();

  const loginDetails = {
    email: email.value,
    password: password.value,
  };
  const response = await axios
    .post("http://localhost:3000/user/login", loginDetails)
    .then((response) => {
      if (response.status === 200) {
        alert("Login Successfully");

        window.location.href = "./expense.html";
      } else {
        throw new Error("Failed to login");
      }
    })
    .catch((err) => {
      document.body.innerHTML += `<div style="color:red">${err.message}</div>`;
    });
}

form.addEventListener("submit", onLogin);
