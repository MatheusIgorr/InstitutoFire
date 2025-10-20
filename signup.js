const signupForm = document.getElementById("signupForm")
const passwordInput = document.getElementById("password")
const confirmPasswordInput = document.getElementById("confirmPassword")
const passwordMatch = document.getElementById("passwordMatch")

if (confirmPasswordInput) {
  confirmPasswordInput.addEventListener("input", () => {
    if (passwordInput.value !== confirmPasswordInput.value) {
      passwordMatch.textContent = "As senhas não coincidem"
      passwordMatch.classList.remove("match")
      passwordMatch.classList.add("mismatch")
    } else if (passwordInput.value.length >= 8) {
      passwordMatch.textContent = "Senhas coincidem ✓"
      passwordMatch.classList.remove("mismatch")
      passwordMatch.classList.add("match")
    }
  })
}

if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const confirmPassword = document.getElementById("confirmPassword").value

    if (password !== confirmPassword) {
      alert("As senhas não coincidem!")
      return
    }

    if (password.length < 8) {
      alert("A senha deve ter no mínimo 8 caracteres!")
      return
    }

    console.log("[v0] Signup attempt:", { name, email })
    alert("Cadastro realizado com sucesso!")
    window.location.href = "login.html"
  })
}
