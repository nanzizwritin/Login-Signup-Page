const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    // get entered values
    const username = document.querySelector('input[name="uname"]').value;
    const password = document.querySelector('input[name="psw"]').value;

    // get users from localStorage
    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {

        if (data.success) {
            alert("Login successful");
            window.location.href = "index.html";
        } else {
            alert("Your username or password might be incorrect. If you don't have an account, try signing up first.");
        }

    });
});