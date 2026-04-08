const loginForm = document.getElementById("loginForm");
const loginFeedback = document.getElementById("loginFeedback");

function clearLoginErrors() {
  document.querySelectorAll(".field-error").forEach((item) => {
    item.textContent = "";
  });
  loginFeedback.textContent = "";
  loginFeedback.className = "form-feedback";
}

function validateLogin(data) {
  const errors = {};

  if (data.username.trim().length < 3) {
    errors.username = "Informe um usuário com pelo menos 3 caracteres.";
  }

  if (data.password.trim().length < 4) {
    errors.password = "Informe uma senha válida.";
  }

  return errors;
}

function showLoginErrors(errors) {
  for (const [field, message] of Object.entries(errors)) {
    const element = document.getElementById(`${field}Error`);

    if (element) {
      element.textContent = message;
    }
  }
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  clearLoginErrors();

  const formData = new FormData(loginForm);
  const data = Object.fromEntries(formData.entries());
  const errors = validateLogin(data);

  if (Object.keys(errors).length > 0) {
    showLoginErrors(errors);

    loginFeedback.textContent = "Corrija os campos destacados.";
    loginFeedback.classList.add("error");

    return;
  }

  loginFeedback.textContent =
    "Validação front-end concluída. Na aula 07 este formulário chamará a API.";
  loginFeedback.classList.add("success");
});
