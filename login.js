const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    // get entered values
    const username = document.querySelector('input[name="uname"]').value;
    const password = document.querySelector('input[name="psw"]').value;

    // get users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // find matching account
    const foundUser = users.find(user => {
        return user.email === username && user.password === password;
    });

    // check result
    if (foundUser) {
        alert("Login successful");

        // optional: save logged in user
        localStorage.setItem("loggedInUser", JSON.stringify(foundUser));

        // redirect
        window.location.href = "index.html";
    } else {
        alert("Invalid username or password");
    }
});