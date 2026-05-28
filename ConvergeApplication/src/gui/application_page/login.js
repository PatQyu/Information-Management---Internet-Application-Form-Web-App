document.addEventListener("DOMContentLoaded", function() {
    
    const loginBtn = document.getElementById("loginBtn");
    const applyBtn = document.getElementById("applyBtn");

    applyBtn.addEventListener("click", function() {
        window.location.href = "./application.html";
    });

    loginBtn.addEventListener("click", function() {
        
        const appIdInput = document.getElementById("app_ID").value.trim();
        const emailInput = document.getElementById("app_emailAddress").value.trim();

        if (!appIdInput || !emailInput) {
            alert("Please fill in both your Application ID and Email Address.");
            return;
        }

        const loginData = {
            app_ID: appIdInput,
            app_emailAddress: emailInput
        };

        fetch("http://127.0.0.1:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        })
        .then(response => response.json())
        .then(data => {
            
            if (data.status === "success") {
                alert(data.message);
                
                localStorage.setItem("loggedInAppId", data.data.app_ID);
                
                window.location.href = "./profile.html";
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error("Error logging in:", error);
            alert("Could not connect to the server. Make sure your Flask backend is running!");
        });
    });
});