// 1. SECURITY & INITIALIZATION
// Check if they actually logged in. If not, kick them back to the login page.
const appId = localStorage.getItem("loggedInAppId");
if (!appId) {
    alert("Unauthorized access. Please log in first.");
    window.location.href = "./login.html";
}

// Global state to track completion status
let isComplete = false;

// When the page loads, immediately fetch their data
document.addEventListener("DOMContentLoaded", () => {
    fetchDashboardData();
    setupEventListeners();
});

// ==========================================
// 2. THE 'GET' ROUTE: Fetch & Populate Data
// ==========================================
function fetchDashboardData() {
    fetch(`http://127.0.0.1:5000/profile/${appId}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === "error") {
                alert(data.message);
                return;
            }

            const profile = data.profile;
            isComplete = data.application_complete;

            // -- A. Populate Header --
            document.getElementById("displayName").innerText = `Welcome, ${profile.app_name}`;
            document.getElementById("displayId").innerText = profile.app_ID;

            // -- B. Populate Contact Details --
            document.getElementById("update_contactNo").value = profile.app_contactNo;
            document.getElementById("update_secondaryContactNo").value = profile.app_secondaryContactNo || "";
            document.getElementById("update_email").value = profile.app_emailAddress;
            document.getElementById("update_secondaryEmail").value = profile.app_secondaryEmailAddress || "";

            // -- C. Populate the Dynamic Document Dropdown --
            const docSelect = document.getElementById("docTypeSelect");
            const instructions = document.getElementById("uploadInstructions");
            docSelect.innerHTML = '<option value="" disabled selected>-- Select Requirement --</option>';

            if (profile.app_type === 0) {
                // RESIDENTIAL UI
                instructions.innerHTML = "<strong>Required Documents:</strong> You must upload all 5 documents: Government Issued ID, Proof of Billing, Proof of Income, Lease Contract/Endorsement from Lessor, Signature Over Printed Name";
                
                docSelect.innerHTML += `
                    <option value="DOC-101">Government Issued ID (DOC-101)</option>
                    <option value="DOC-201">Proof of Billing (DOC-201)</option>
                    <option value="DOC-202">Proof of Income (DOC-202)</option>
                    <option value="DOC-301">Lease Contract/Endorsement from Lessor (DOC-301)</option>
                    <option value="DOC-601">Signature Over Printed Name (DOC-601)</option>
                `;
            } else if (profile.app_type === 1) {
                // COMMERCIAL UI
                instructions.innerHTML = `
                    <strong>Mandatory Base Documents:</strong><br>
                    • Government Issued ID w/ 3 Specimen Signature, Government Issued ID of Rep w/ 3 Specimen Signature, & Signature Over Printed Name br><br>
                    <strong>Plus ONE of the following options:</strong><br>
                    • <i>Single Proprietor:</i> Business Permit/Mayor Permit/Brgy Clearance + DTI Registration copy/BIR/COR<br>
                    • <i>Partnership/Corporation:</i> Business Permit/Mayor Permit/Brgy Clearance + SEC Registration Copy + Corporate Secretary Certificate<br>
                    • <i>Foreign Embassy:</i> Proof of Identification from Authorized Signatory + Authorized Letter from Ambassador<br>
                    • <i>Government Entity:</i> Notarized Certificate of Funds Available + Proof of Budget Allocation
                `;

                // Add ALL possible commercial documents to the dropdown
                docSelect.innerHTML += `
                    <optgroup label="Mandatory Base Documents">
                        <option value="DOC-102">Government Issued ID w/ 3 Specimen Signature (DOC-102)</option>
                        <option value="DOC-103">Government Issued ID of Rep w/ 3 Specimen Signature (DOC-103)</option>
                        <option value="DOC-601">Signature Over Printed Name (DOC-601)</option>
                    </optgroup>
                    <optgroup label="Single Proprietor">
                        <option value="DOC-401">Business Permit/Mayor Permit/Brgy Clearance (DOC-401)</option>
                        <option value="DOC-402">DTI Registration copy/BIR/COR (DOC-402)</option>
                    </optgroup>
                    <optgroup label="Partnership/Corporation">
                        <option value="DOC-401">Business Permit/Mayor Permit/Brgy Clearance (DOC-401)</option>
                        <option value="DOC-403">SEC Registration Copy (DOC-403)</option>
                        <option value="DOC-404">Corporate Secretary Certificate (DOC-404)</option>
                    </optgroup>
                    <optgroup label="Foreign Embassy">
                        <option value="DOC-104">Proof of Identification from Authorized Signatory (DOC-104)</option>
                        <option value="DOC-501">Authorized Letter from Ambassador (DOC-501)</option>
                    </optgroup>
                    <optgroup label="Government Entity">
                        <option value="DOC-502">Notarized Certificate of Funds Available (DOC-502)</option>
                        <option value="DOC-503">Proof of Budget Allocation (DOC-503)</option>
                    </optgroup>
                `;
            }

            // -- C. Populate Plan Overview --
            document.getElementById("displayAppType").innerText = profile.app_type_display;
            document.getElementById("displayPlanName").innerText = profile.plan_name;
            document.getElementById("displayPlanSpeed").innerText = profile.plan_speed;
            document.getElementById("displayCable").innerText = profile.plan_cableAddOn || "None";
            document.getElementById("displayIp").innerText = profile.plan_publicIP === "Y" ? "Public IP (+P700/mo)" : "Private IP (Default)";
            document.getElementById("displayInstall").innerText = profile.plan_installationFee === "O" ? "Outright" : "Staggered (24 mos)";
            
            // ADD THIS NEW LINE: Format the fee with commas and 2 decimal places
            document.getElementById("displayMonthlyFee").innerText = `₱ ${parseFloat(profile.plan_monthlyServiceFee).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

            // -- D. Populate the Document Vault --
            const vaultList = document.getElementById("uploadedList");
            vaultList.innerHTML = ""; // Clear the "loading" text

            // New code inside fetchDashboardData()
            if (data.uploaded_documents.length === 0) {
                vaultList.innerHTML = `<li class="empty-state">No documents uploaded yet.</li>`;
            } else {
                data.uploaded_documents.forEach(doc => {
                    const li = document.createElement("li");
                    
                    // Use flexbox via JS styles to align the text and button nicely
                    li.style.display = "flex";
                    li.style.justifyContent = "space-between";
                    li.style.alignItems = "center";
                    li.style.marginBottom = "8px"; 
                    
                    // If the app is complete, hide or disable the remove button
                    const removeBtnHtml = isComplete 
                        ? `<span style="font-size: 0.8rem; color: #ccc;">Locked</span>`
                        : `<button onclick="deleteSingleDocument('${doc.doc_ID}')" style="color: #dc3545; background: none; border: none; cursor: pointer; text-decoration: underline; font-size: 0.85rem;">Remove</button>`;

                    li.innerHTML = `
                        <span>${doc.doc_type}</span>
                        ${removeBtnHtml}
                    `;
                    
                    vaultList.appendChild(li);
                });
            }

            // -- E. Update Status Banner & Delete Button --
            const banner = document.getElementById("statusBanner");
            const statusMsg = document.getElementById("statusMessage");
            const deleteBtn = document.getElementById("deleteBtn");

            if (isComplete) {
                banner.className = "status-banner banner-success";
                statusMsg.innerText = "Application Complete! Your documents are currently under review.";
                deleteBtn.disabled = true; // Lock the delete button
                deleteBtn.innerText = "Locked (Application Complete)";
                deleteBtn.style.backgroundColor = "#ccc";
                deleteBtn.style.cursor = "not-allowed";
            } else {
                banner.className = "status-banner banner-pending";
                statusMsg.innerText = "Action Required: Please upload your missing documents.";
            }
        })
        .catch(err => {
            console.error(err);
            alert("Could not connect to the server.");
        });
}

// ==========================================
// 3. EVENT LISTENERS FOR PUT, POST, DELETE
// ==========================================
function setupEventListeners() {
    
    // --- PUT: Edit & Save Contact Details ---
    const editBtn = document.getElementById("editBtn");
    const saveBtn = document.getElementById("saveBtn");
    const contactForm = document.getElementById("contactForm");
    const contactInputs = contactForm.querySelectorAll("input");

    editBtn.addEventListener("click", (e) => {
        e.preventDefault(); // Stop form submission
        // Unlock inputs
        contactInputs.forEach(input => {
            input.removeAttribute("readonly");
            input.style.border = "1px solid #FF6B00"; // Visual cue
            input.style.backgroundColor = "#fff";
        });
        editBtn.classList.add("hidden");
        saveBtn.classList.remove("hidden");
    });

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const payload = {
            app_contactNo: document.getElementById("update_contactNo").value,
            app_secondaryContactNo: document.getElementById("update_secondaryContactNo").value,
            app_emailAddress: document.getElementById("update_email").value,
            app_secondaryEmailAddress: document.getElementById("update_secondaryEmail").value
        };

        fetch(`http://127.0.0.1:5000/profile/${appId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                alert("Contact details updated successfully!");
                // Lock inputs again
                contactInputs.forEach(input => {
                    input.setAttribute("readonly", true);
                    input.style.border = "transparent";
                    input.style.backgroundColor = "transparent";
                });
                saveBtn.classList.add("hidden");
                editBtn.classList.remove("hidden");
            } else {
                alert(data.message);
            }
        });
    });

    // --- POST: Upload Document ---
    const uploadForm = document.getElementById("uploadForm");
    const uploadBtn = document.getElementById("uploadBtn");

    uploadForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const fileInput = document.getElementById("fileInput");
        const docType = document.getElementById("docTypeSelect").value;

        if (fileInput.files.length === 0) return;

        // Use FormData instead of JSON for files
        const formData = new FormData();
        formData.append("file", fileInput.files[0]);
        formData.append("doc_type", docType);

        uploadBtn.innerText = "Uploading...";
        uploadBtn.disabled = true;

        fetch(`http://127.0.0.1:5000/profile/${appId}`, {
            method: "POST",
            // Notice: Do NOT set "Content-Type" here. The browser sets it automatically for FormData!
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            uploadBtn.innerText = "Upload Document";
            uploadBtn.disabled = false;
            fileInput.value = ""; // Clear the file input
            
            // Reload the dashboard to update the vault list and check completion status!
            if (data.status === "success") fetchDashboardData(); 
        })
        .catch(err => {
            alert("Upload failed. Check console.");
            uploadBtn.innerText = "Upload Document";
            uploadBtn.disabled = false;
        });
    });

    // --- DELETE: Cancel Application ---
    document.getElementById("deleteBtn").addEventListener("click", () => {
        if (isComplete) return; // Failsafe

        if (confirm("Are you sure you want to cancel your application? This permanently deletes your data.")) {
            fetch(`http://127.0.0.1:5000/profile/${appId}`, {
                method: "DELETE"
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    alert("Your application has been cancelled and deleted.");
                    logout(); // Clear memory and go to login
                } else {
                    alert(data.message);
                }
            });
        }
    });
}

// ==========================================
// 5. DELETE SPECIFIC DOCUMENT
// ==========================================
window.deleteSingleDocument = function(docId) {
    if (isComplete) {
        alert("Action blocked: Your application is already complete and locked.");
        return;
    }

    if (confirm("Are you sure you want to delete this document? You will need to upload it again.")) {
        fetch(`http://127.0.0.1:5000/profile/${appId}/document/${docId}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                alert(data.message);
                // Re-fetch dashboard data to update the UI and recalculate completion status
                fetchDashboardData(); 
            } else {
                alert(data.message);
            }
        })
        .catch(err => {
            console.error("Error deleting document:", err);
            alert("Could not delete the document due to a network error.");
        });
    }
};

// ==========================================
// 4. LOGOUT UTILITY
// ==========================================
window.logout = function() {
    localStorage.removeItem("loggedInAppId");
    window.location.href = "./login.html";
};