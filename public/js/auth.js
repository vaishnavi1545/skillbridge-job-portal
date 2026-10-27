
const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const formTitle = document.getElementById("formTitle");
const formSubtitle = document.getElementById("formSubtitle");
const notice = document.getElementById("notice");

function showNotice(message, type = "success") {
  notice.textContent = message;
  notice.className = type === "error" ? "notice error" : "notice";
  notice.hidden = false;
}

function clearNotice() {
  notice.hidden = true;
  notice.textContent = "";
  notice.className = "notice";
}

function switchForm(mode) {
  const isLogin = mode === "login";

  loginForm.hidden = !isLogin;
  registerForm.hidden = isLogin;

  loginTab.classList.toggle("active", isLogin);
  registerTab.classList.toggle("active", !isLogin);

  loginTab.setAttribute("aria-selected", String(isLogin));
  registerTab.setAttribute("aria-selected", String(!isLogin));

  formTitle.textContent = isLogin
    ? "Welcome back!"
    : "Create your account";

  formSubtitle.textContent = isLogin
    ? "Sign in to continue your career journey."
    : "Join SkillBridge and explore new opportunities.";

  clearNotice();
}

loginTab.addEventListener("click", () => switchForm("login"));
registerTab.addEventListener("click", () => switchForm("register"));

document.querySelectorAll("[data-switch]").forEach((button) => {
  button.addEventListener("click", () => {
    switchForm(button.dataset.switch);
  });
});

// Show or hide password
document.querySelectorAll(".password-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const input = document.getElementById(button.dataset.target);
    const isHidden = input.type === "password";

    input.type = isHidden ? "text" : "password";
    button.textContent = isHidden ? "Hide" : "Show";
    button.setAttribute(
      "aria-label",
      isHidden ? "Hide password" : "Show password"
    );
  });
});

// Frontend-only registration demo
registerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  clearNotice();

  if (!registerForm.reportValidity()) return;

  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (!name || !email) {
    showNotice("Please enter your name and email.", "error");
    return;
  }

  if (password.length < 8) {
    showNotice("Password must contain at least 8 characters.", "error");
    return;
  }

  if (password !== confirmPassword) {
    showNotice("Passwords do not match. Please try again.", "error");
    document.getElementById("confirmPassword").focus();
    return;
  }

  showNotice(
    "The registration form is valid! Account creation is not enabled yet. A backend authentication service is required.",
    "success"
  );
});

// Frontend-only login demo
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  clearNotice();

  if (!loginForm.reportValidity()) return;

  showNotice(
    "The form is valid, but login is not enabled yet. Connect a secure authentication backend to verify your account.",
    "success"
  );
});
