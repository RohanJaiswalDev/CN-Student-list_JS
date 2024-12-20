document.getElementById("btn").addEventListener("click", function (e) {
    e.preventDefault();
    var rollNo = document.getElementById("rollno").value;
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var course = document.getElementById("course").value;
    var email = document.getElementById("email").value;
    var errors = [];
    if (!rollNo) errors.push("Roll No");
    if (!fname) errors.push("First Name");
    if (!lname) errors.push("Last Name");
    if (!course) errors.push("Course");
    if (!email) errors.push("Email");
    if (errors.length > 0) {
        Swal.fire({
            title: "Missing Fields!",
            text: `Please fill the following fields: ${errors.join(", ")}`,
            icon: "warning",
            confirmButtonText: "Okay",
        });
        return;
    }
    // My spinner....
    var button = document.getElementById("btn");
    var spinner = document.querySelector(".spinner");
    var buttonText = document.querySelector(".button-text");
    button.setAttribute("disabled", true);
    spinner.classList.remove("hidden");
    buttonText.classList.add("hidden");
    // Axios POST Request
    axios.post("https://674fc935bb559617b27015dc.mockapi.io/students", {
        rollNo,
        firstName: fname,
        lastName: lname,
        email,
        course,
    })
        .then((response) => {
            console.log("Data added:", response.data);
            // Add data in table....
            var newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${response.data.rollNo}</td>
                <td>${response.data.firstName}</td>
                <td>${response.data.lastName}</td>
                <td>${response.data.course}</td>
                <td>${response.data.email}</td>
            `;
            document.getElementById("student-tbody").appendChild(newRow);
            // SweetAlert...
            Swal.fire({
                title: "Student Added Successfully!",
                text: "The student has been added in the table & API URL.",
                icon: "success",
                confirmButtonText: "Cool!",
                draggable: true,
            });
            // Reset...
            document.getElementById("form-box").reset();
        })
        .catch((error) => {
            Swal.fire({
                title: "Error!",
                text: "Failed to add the student. Please try again.",
                icon: "error",
                confirmButtonText: "Okay",
            });
            console.error("Error adding data:", error);
        })
        .finally(() => {
            // Hide Spinner....
            button.removeAttribute("disabled");
            spinner.classList.add("hidden");
            buttonText.classList.remove("hidden");
        });
});
