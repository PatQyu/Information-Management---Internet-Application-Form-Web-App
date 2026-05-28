const residentialPlans = [
    // FIBERX
    { 
        id: "PL1101", 
        display: "FiberX 1500 (Up to 200 Mbps)",
        backend_name: "FIBERX", 
        backend_type: "FIBERX 1500", 
        backend_speed: "Up to 200 Mbps" 
    },
    { 
        id: "PL1102", 
        display: "FiberX 2000 (Up to 400 Mbps)",
        backend_name: "FIBERX", 
        backend_type: "FIBERX 2000", 
        backend_speed: "Up to 400 Mbps" 
    },
    { 
        id: "PL1103", 
        display: "FiberX 2500 (Up to 600 Mbps)",
        backend_name: "FIBERX", 
        backend_type: "FIBERX 2500", 
        backend_speed: "Up to 600 Mbps" 
    },
    { 
        id: "PL1104", 
        display: "FiberX 3500 (Up to 800 Mbps)",
        backend_name: "FIBERX", 
        backend_type: "FIBERX 3500", 
        backend_speed: "Up to 800 Mbps" 
    },
    { 
        id: "PL1105", 
        display: "FiberX 7499 (Up to 1 Gbps)",
        backend_name: "FIBERX", 
        backend_type: "FIBERX 7499", 
        backend_speed: "Up to 1 Gbps" 
    },

    // TIME OF DAY
    { 
        id: "PL1201", 
        display: "Time of Day 1699 (Day 400Mbps / Night 200Mbps)",
        backend_name: "TIME OF DAY", 
        backend_type: "Time of Day 1699", 
        backend_speed: "Day 400Mbps / Night 200Mbps" 
    },
    { 
        id: "PL1202", 
        display: "Time of Day 3000 (Day 800Mbps / Night 600Mbps)",
        backend_name: "TIME OF DAY", 
        backend_type: "Time of Day 3000", 
        backend_speed: "Day 800Mbps / Night 600Mbps" 
    },

    // GAMECHANGER
    { 
        id: "PL1301", 
        display: "Gamechanger PRO ENTRY (Up to 400 Mbps)",
        backend_name: "GAMECHANGER", 
        backend_type: "PRO ENTRY", 
        backend_speed: "Up to 400 Mbps" 
    },
    { 
        id: "PL1302", 
        display: "Gamechanger PRO MID (Up to 600 Mbps)",
        backend_name: "GAMECHANGER", 
        backend_type: "PRO MID", 
        backend_speed: "Up to 600 Mbps" 
    },
    { 
        id: "PL1303", 
        display: "Gamechanger PRO HIGH (Up to 800Mbps / 600Mbps)",
        backend_name: "GAMECHANGER", 
        backend_type: "PRO HIGH", 
        backend_speed: "Up to 800Mbps / 600Mbps" 
    },
    { 
        id: "PL1304", 
        display: "Gamechanger ELITE (Up to 800 Mbps)",
        backend_name: "GAMECHANGER", 
        backend_type: "ELITE", 
        backend_speed: "Up to 800 Mbps" 
    },

    // HOMEBASE
    { 
        id: "PL1401", 
        display: "HomeBase Plan 1899 (up to 300 Mbps)",
        backend_name: "HOMEBASE", 
        backend_type: "HomeBase Plan 1899", 
        backend_speed: "up to 300 Mbps" 
    },
    { 
        id: "PL1402", 
        display: "HomeBase Plan 1500 (up to 200 Mbps)",
        backend_name: "HOMEBASE", 
        backend_type: "HomeBase Plan 1500", 
        backend_speed: "up to 200 Mbps" 
    },

    // AIR INTERNET
    { 
        id: "PL1501", 
        display: "AIR INTERNET 1250 (Up to 10 Mbps)",
        backend_name: "AIR INTERNET", 
        backend_type: "AIR INTERNET 1250", 
        backend_speed: "Up to 10 Mbps" 
    },
    { 
        id: "PL1502", 
        display: "AIR INTERNET 1350 (Up to 15 Mbps)",
        backend_name: "AIR INTERNET", 
        backend_type: "AIR INTERNET 1350", 
        backend_speed: "Up to 15 Mbps" 
    }
];

const commercialPlans = [
    // FLEXIBIZ DAYTIME
    { 
        id: "PL2101", 
        display: "flexiBIZ DAY 300 (Peak 300Mbps / Non 150Mbps)",
        backend_name: "flexiBIZ DAYTIME", 
        backend_type: "flexiBIZ DAY 300", 
        backend_speed: "Peak 300Mbps / Non 150Mbps" 
    },
    { 
        id: "PL2102", 
        display: "flexiBIZ DAY 200 (Peak 200Mbps / Non 100Mbps)",
        backend_name: "flexiBIZ DAYTIME", 
        backend_type: "flexiBIZ DAY 200", 
        backend_speed: "Peak 200Mbps / Non 100Mbps" 
    },
    { 
        id: "PL2103", 
        display: "flexiBIZ DAY 150 (Peak 150Mbps / Non 75Mbps)",
        backend_name: "flexiBIZ DAYTIME", 
        backend_type: "flexiBIZ DAY 150", 
        backend_speed: "Peak 150Mbps / Non 75Mbps" 
    },
    { 
        id: "PL2104", 
        display: "flexiBIZ DAY 120 (Peak 120Mbps / Non 60Mbps)",
        backend_name: "flexiBIZ DAYTIME", 
        backend_type: "flexiBIZ DAY 120", 
        backend_speed: "Peak 120Mbps / Non 60Mbps" 
    },
    { 
        id: "PL2105", 
        display: "flexiBIZ DAY 80 (Peak 80Mbps / Non 40Mbps)",
        backend_name: "flexiBIZ DAYTIME", 
        backend_type: "flexiBIZ DAY 80", 
        backend_speed: "Peak 80Mbps / Non 40Mbps" 
    },
    { 
        id: "PL2106", 
        display: "flexiBIZ DAY 50 (Peak 50Mbps / Non 25Mbps)",
        backend_name: "flexiBIZ DAYTIME", 
        backend_type: "flexiBIZ DAY 50", 
        backend_speed: "Peak 50Mbps / Non 25Mbps" 
    },

    // FLEXIBIZ PEAK
    { 
        id: "PL2201", 
        display: "flexiBIZ PEAK 300 (up to 300 Mbps)",
        backend_name: "flexiBIZ PEAK", 
        backend_type: "flexiBIZ PEAK 300", 
        backend_speed: "up to 300 Mbps" 
    },
    { 
        id: "PL2202", 
        display: "flexiBIZ PEAK 200 (up to 200 Mbps)",
        backend_name: "flexiBIZ PEAK", 
        backend_type: "flexiBIZ PEAK 200", 
        backend_speed: "up to 200 Mbps" 
    },
    { 
        id: "PL2203", 
        display: "flexiBIZ PEAK 150 (up to 150 Mbps)",
        backend_name: "flexiBIZ PEAK", 
        backend_type: "flexiBIZ PEAK 150", 
        backend_speed: "up to 150 Mbps" 
    },
    { 
        id: "PL2204", 
        display: "flexiBIZ PEAK 120 (up to 120 Mbps)",
        backend_name: "flexiBIZ PEAK", 
        backend_type: "flexiBIZ PEAK 120", 
        backend_speed: "up to 120 Mbps" 
    },
    { 
        id: "PL2205", 
        display: "flexiBIZ PEAK 80 (up to 80 Mbps)",
        backend_name: "flexiBIZ PEAK", 
        backend_type: "flexiBIZ PEAK 80", 
        backend_speed: "up to 80 Mbps" 
    },
    { 
        id: "PL2206", 
        display: "flexiBIZ PEAK 50 (up to 50 Mbps)",
        backend_name: "flexiBIZ PEAK", 
        backend_type: "flexiBIZ PEAK 50", 
        backend_speed: "up to 50 Mbps" 
    },

    // AIR MICROBIZ
    { 
        id: "PL2301", 
        display: "AIR MICROBIZ 1000 (Up to 5 Mbps)",
        backend_name: "AIR MICROBIZ", 
        backend_type: "AIR MICROBIZ 1000", 
        backend_speed: "Up to 5 Mbps" 
    },
    { 
        id: "PL2302", 
        display: "AIR MICROBIZ 1250 (Up to 10 Mbps)",
        backend_name: "AIR MICROBIZ", 
        backend_type: "AIR MICROBIZ 1250", 
        backend_speed: "Up to 10 Mbps" 
    },

    // AIR IBIZ
    { 
        id: "PL2401", 
        display: "AIR IBIZ PLAN 1500 (Up to 3 Mbps)",
        backend_name: "AIR IBIZ", 
        backend_type: "AIR IBIZ PLAN 1500", 
        backend_speed: "Up to 3 Mbps" 
    },
    { 
        id: "PL2402", 
        display: "AIR IBIZ PLAN 2000 (Up to 4 Mbps)",
        backend_name: "AIR IBIZ", 
        backend_type: "AIR IBIZ PLAN 2000", 
        backend_speed: "Up to 4 Mbps" 
    },
    { 
        id: "PL2403", 
        display: "AIR IBIZ PLAN 3000 (Up to 6 Mbps)",
        backend_name: "AIR IBIZ", 
        backend_type: "AIR IBIZ PLAN 3000", 
        backend_speed: "Up to 6 Mbps" 
    },
    { 
        id: "PL2404", 
        display: "AIR IBIZ PLAN 4000 (Up to 10 Mbps)",
        backend_name: "AIR IBIZ", 
        backend_type: "AIR IBIZ PLAN 4000", 
        backend_speed: "Up to 10 Mbps" 
    }
];

let currentPlanArray = [];

function startApplication(typeInt) {
    document.getElementById('selectionScreen').classList.add('hidden');
    document.getElementById('mainFormContainer').classList.remove('hidden');
    document.getElementById('app_type').value = typeInt;

    if (typeInt === 0) {
        document.getElementById('residentialFields').classList.remove('hidden');
        document.getElementById('commercialFields').classList.add('hidden');
        document.getElementById('formSubtitle').innerText = "Residential Application Form";
        populatePlans(residentialPlans);
    } else {
        document.getElementById('commercialFields').classList.remove('hidden');
        document.getElementById('residentialFields').classList.add('hidden');
        document.getElementById('formSubtitle').innerText = "Commercial Application Form";
        populatePlans(commercialPlans);
    }
}

function populatePlans(planArray) {
    currentPlanArray = planArray;
    const planSelect = document.getElementById('plan_selection');
    planSelect.innerHTML = '<option value="" disabled selected>-- Select your preferred internet plan --</option>';
    
    planArray.forEach(plan => {
        let option = document.createElement('option');
        option.value = plan.id; 
        option.textContent = plan.display;
        planSelect.appendChild(option);
    });
    
    handlePlanChange();
}

function handlePlanChange() {
    const selectedPlanId = document.getElementById('plan_selection').value;
    const cableContainer = document.getElementById('cableAddOnContainer');
    const cableSelect = document.getElementById('cable_addon');
    const publicIpContainer = document.getElementById('publicIpContainer');
    const publicIpSelect = document.getElementById('public_ip');

    cableSelect.innerHTML = '<option value="">None</option>';
    publicIpSelect.value = "N";

    if (!selectedPlanId) {
        cableContainer.classList.add('hidden');
        publicIpContainer.classList.add('hidden');
        return;
    }

    const isResidential = selectedPlanId.startsWith("PL1");
    const planCategory = selectedPlanId.substring(2, 4); 

    if (planCategory === "21" || planCategory === "22") {
        cableContainer.classList.add('hidden');
    } else {
        cableContainer.classList.remove('hidden');
        if (isResidential) {
            cableSelect.innerHTML += `
                <option value="AIR CABLE 299">AIR CABLE 299</option>
                <option value="AIR CABLE 499">AIR CABLE 499</option>
                <option value="AIR CABLE 699">AIR CABLE 699</option>`;
        } else {
            cableSelect.innerHTML += `
                <option value="AIR CABLE 300">AIR CABLE 300</option>
                <option value="AIR CABLE 500">AIR CABLE 500</option>
                <option value="AIR CABLE 700">AIR CABLE 700</option>`;
        }
    }

    if (planCategory === "22") {
        publicIpContainer.classList.remove('hidden');
    } else {
        publicIpContainer.classList.add('hidden');
    }
}

function toggleLessor() {
    const ownership = document.getElementById('app_serviceOwnership').value;
    const lessorDiv = document.getElementById('lessorFields');

    if (ownership === "1") {
        lessorDiv.classList.add('hidden');
        document.getElementById('app_lessorOwner').value = document.getElementById('app_name').value.trim();
        document.getElementById('app_lessorOwnerContactNo').value = document.getElementById('app_contactNo').value.trim();
    }
    else {
        lessorDiv.classList.remove('hidden');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const submitBtn = document.getElementById('submitAppBtn');
    const form = document.getElementById('convergeForm');

    submitBtn.addEventListener('click', function (event) {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return; 
        }

        const selectedPlanId = document.getElementById('plan_selection').value;
        if (!selectedPlanId) {
            alert("Please select an internet plan.");
            return;
        }

        const selectedPlanData = currentPlanArray.find(plan => plan.id === selectedPlanId);

        const installationFeeElement = document.querySelector('input[name="installation_fee"]:checked');
        if (!installationFeeElement) {
            alert("Please select an installation fee payment option.");
            return;
        }
        const payload = {
            app_type: parseInt(document.getElementById('app_type').value),
            app_name: document.getElementById('app_name').value.trim(),
            app_gender: document.getElementById('app_gender').value,
            app_contactNo: document.getElementById('app_contactNo').value.trim(),
            app_secondaryContactNo: document.getElementById('app_secondaryContactNo').value.trim() || null,
            app_emailAddress: document.getElementById('app_emailAddress').value.trim(),
            app_secondaryEmailAddress: document.getElementById('app_secondaryEmailAddress').value.trim() || null,
            app_serviceOwnership: parseInt(document.getElementById('app_serviceOwnership').value),
            app_companyPaid: document.getElementById('app_companyPaid').value,
            app_yearsOfResidency: parseInt(document.getElementById('app_yearsOfResidency').value),
            app_lessorOwner: document.getElementById('app_lessorOwner').value.trim() || null,
            app_lessorOwnerContactNo: document.getElementById('app_lessorOwnerContactNo').value.trim() || null,
            app_address: document.getElementById('app_address').value.trim(),
            
            app_birthDate: document.getElementById('app_birthDate').value || null,
            app_civilStatus: document.getElementById('app_civilStatus').value || null,
            app_mothersName: document.getElementById('app_mothersName').value.trim() || null,
            app_spouseName: document.getElementById('app_spouseName').value.trim() || null,
            app_nationality: document.getElementById('app_nationality').value.trim() || null,
            
            app_businessName: document.getElementById('app_businessName').value.trim() || null,
            app_industry: document.getElementById('app_industry').value.trim() || null,
            app_tin: document.getElementById('app_tin').value.trim() || null,
            app_companyIDNo: document.getElementById('app_companyIDNo').value.trim() || null,
            app_department: document.getElementById('app_department').value.trim() || null,
            
            plan_name: selectedPlanData.backend_name,
            plan_type: selectedPlanData.backend_type,
            plan_speed: selectedPlanData.backend_speed,
            plan_cableAddOn: document.getElementById('cable_addon').value || null,
            plan_publicIP: document.getElementById('public_ip').value,
            plan_installationFee: installationFeeElement.value
        };

        submitBtn.innerText = "Submitting..."; 
        submitBtn.disabled = true;

        fetch("http://127.0.0.1:5000/application", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                alert(`Success! Your application ID is: ${data.generated_id}\n\nPlease save this ID to log in and upload your requirements.`);
                localStorage.setItem("loggedInAppId", data.generated_id);
                window.location.href = "./profile.html"; 
            } else {
                alert(`Error: ${data.message}`);
                submitBtn.innerText = "Submit Application";
                submitBtn.disabled = false;
            }
        })
        .catch(error => {
            console.error("Submission error:", error);
            alert("Could not connect to the server. Make sure your Flask backend is running!");
            submitBtn.innerText = "Submit Application";
            submitBtn.disabled = false;
        });
    });
});