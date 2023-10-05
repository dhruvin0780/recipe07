const registrationForm = document.getElementById("registration-form");
const loginForm = document.getElementById("login-form");

registrationForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const userEmail = document.getElementById("username").value;
	const password = document.getElementById("password").value;

	// Send a POST request to the backend to register the user
	fetch("http://localhost:9000/auth/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ userEmail, password }),
	})
		.then((response) => response.json())
		.then((data) => {
			alert(data.message);
			// Clear the form
			registrationForm.reset();
		})
		.catch((error) => {
			console.error(error);
			alert("An error occurred");
		});
});

loginForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const userEmail = document.getElementById("login-username").value;
	const password = document.getElementById("login-password").value;

	function change() {
		document.getElementById("LOG-IN").style.display = "none";
		document.getElementById("REG").style.display = "none";
	}
	// Send a POST request to the backend to login the user
	fetch("http://localhost:9000/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ userEmail, password }),
	})
		.then((response) => response.json())
		.then((data) => {
			//set token in loacal...
			localStorage.setItem("token", data.token);

			//replace..
			data.statusCode === 1
				? location.replace(
						"D:/clgs/e-comerce web/mini-project/recipe-management/homepage/index.html",
				  )
				: location.replace(
						"file:///D:/clgs/e-comerce%20web/mini-project/recipe-management/User/index.html",
				  );

			change();
			// Clear the form
			loginForm.reset();
		})
		.catch((error) => {
			console.error(error);
			alert("An error occurred...");
		});
});

///reg
function replaceToLogin() {
	location.replace("../User/index.html");
}

//login
function replaceToReg() {
	location.replace("../User/index.html");
}
