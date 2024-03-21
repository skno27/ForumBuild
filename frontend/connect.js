import fetch from "node-fetch";

async function getUsers() {
  const results = await fetch("http://localhost:3000/users")
    .then((data) => data.json())
    .then((data) => data);

  for (const result of results.users) {
    console.log(
      "User Creds:",
      "ID:",
      result.id,
      "Email:",
      result.email,
      "Username:",
      result.username
    );
  }
}

async function addUser(newemail, newusername) {
  try {
    const user = await fetch(`http://localhost:3000/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: newemail,
        username: newusername,
      }),
    });

    // console.log(user);

    if (user.ok) {
      const userData = await user.json();
      console.log("User created:", userData);
    } else {
      const errorData = await user.json(); // Parse the error response
      throw new Error(`Network response was not OK: ${errorData.message}`);
    }
  } catch (error) {
    console.log("Error:", error);
  }
}

async function getUser(id) {
  const user = await fetch(`http://localhost:3000/user/${id}`)
    .then((data) => JSON.stringify(data))
    .then((data) => data);
  console.log(user);
}

// getUsers();
// getUser(1);
addUser("t2@test.com", "testing_again");
