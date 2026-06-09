const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="psw"]').value;
    const repeatPassword = document.querySelector('input[name="psw-repeat"]').value;

    // validation
    if (password !== repeatPassword) {
        alert("Passwords do not match");
        return;
    }

  fetch("/signup", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        email: email,
        password: password
    })
})
.then(response => response.json())
.then(data => {
    if (data.success) {
        alert("Signup successful");
        window.location.href = "login.html";
    } else {
        alert("Account already exists. Try logging in.");
    }

});

 
});