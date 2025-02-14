document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const signupBtn = document.getElementById("signup");
    const signinBtn = document.getElementById("signin");
    const userInfo = document.getElementById("user-info");
    const form = document.getElementById("authForm");

    // Function to handle showing user data after login/signup
    function showUser(email, password) {
        userInfo.innerHTML = `<h3>Welcome!</h3>
                              <p><strong>Email:</strong> ${email}</p>
                              <p><strong>Password:</strong> ${password}</p>
                              <button id="logout">Logout</button>`;
        form.style.display = "none"; // Hide form when user is logged in

        document.getElementById("logout").addEventListener("click", function () {
            localStorage.removeItem("user");  // Remove user data from localStorage
            userInfo.innerHTML = ""; // Clear user details
            form.style.display = "block"; // Show form again
        });
    }

    // Sign Up - Make POST request to the API
    signupBtn.addEventListener("click", function () {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            alert("Please enter an email and password.");
            return;
        }

        // Data to send in the POST request
        const userData = {
            email: email,
            password: password
        };

        
        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData) // Convert the object to a JSON string
        })
        .then(response => response.json()) // Parse JSON response
        .then(data => {
            // Saving the user data to localStorage after successful POST
            localStorage.setItem("user", JSON.stringify(userData));
            alert("Sign-up successful!");
            showUser(email, password); // Show the logged-in user's details
        })
        .catch(error => {
            console.error("Error during sign-up:", error);
            alert("There was an error while signing up.");
        });
    });

    // Sign In - Check user credentials from localStorage
    signinBtn.addEventListener("click", function () {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            alert("No user found. Please sign up first.");
            return;
        }

        const user = JSON.parse(storedUser);

        if (emailInput.value === user.email && passwordInput.value === user.password) {
            alert("Sign-in successful!");
            showUser(user.email, user.password);
        } else {
            alert("Incorrect email or password.");
        }
    });

    // **Auto-login if user exists in localStorage**
    const existingUser = localStorage.getItem("user");
    if (existingUser) {
        const user = JSON.parse(existingUser);
        showUser(user.email, user.password);
    } else {
        form.style.display = "block"; // Ensure form is visible initially
    }
});
