document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === "user@example.com" && password === "password123") {
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("errorMessage").innerText = "Invalid email or password.";
    }
});

function register() {
    alert("Registration not implemented yet!");
}

function loginWithGoogle() {
    alert("Google login will be implemented here.");
}

function loginWithGitHub() {
    alert("GitHub login will be implemented here.");
}
