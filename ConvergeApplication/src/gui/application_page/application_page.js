document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('convergeForm');
    const appTypeSelect = document.getElementById('app_type');
    const serviceOwnershipSelect = document.getElementById('app_serviceOwnership');
    
    const residentialSection = document.getElementById('residentialFields');
    const commercialSection = document.getElementById('commercialFields');
    const lessorFields = document.getElementById('lessorFields');

    // 1. Generate unique mock Operational Fields
    document.getElementById('app_ID').value = 'APP-' + Math.floor(100000 + Math.random() * 900000);
    document.getElementById('app_date').value = new Date().toISOString().split('T')[0];

    // 2. Toggle Subtype Fields (Dynamic Rendering)
    appTypeSelect.addEventListener('change', function () {
        if (this.value === 'RESIDENTIAL') {
            residentialSection.classList.remove('hidden');
            commercialSection.classList.add('hidden');
            setRequiredState(residentialSection, true);
            setRequiredState(commercialSection, false);
        } else if (this.value === 'COMMERCIAL') {
            commercialSection.classList.remove('hidden');
            residentialSection.classList.add('hidden');
            setRequiredState(commercialSection, true);
            setRequiredState(residentialSection, false);
        }
    });

    // 3. Toggle Lessor Fields based on Property Ownership
    serviceOwnershipSelect.addEventListener('change', function() {
        if (this.value === 'Rented') {
            lessorFields.classList.remove('hidden');
            setRequiredState(lessorFields, true);
        } else {
            lessorFields.classList.add('hidden');
            setRequiredState(lessorFields, false);
        }
    });

    // Helper utility to turn dynamic field validation on/off
    function setRequiredState(section, isRequired) {
        const inputs = section.querySelectorAll('input, select');
        inputs.forEach(input => {
            // Skip non-mandatory option fields
            if (input.id === 'app_spouseName' || input.id === 'app_secondaryContactNo' || input.id === 'app_secondaryEmailAddress') return;
            
            if (isRequired) {
                input.setAttribute('required', 'true');
            } else {
                input.removeAttribute('required');
                input.value = ''; // Clean values if hidden
            }
        });
    }

    // 4. Handle Final Normalization Submission
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = {};
        
        // Target all standard input fields inside form DOM
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            if (input.id) {
                formData[input.id] = input.value;
            }
        });

        // Split data to mimic structural backend mapping
        const primaryApplicationRecord = {
            app_ID: formData.app_ID,
            app_type: formData.app_type,
            app_date: formData.app_date,
            app_name: formData.app_name,
            app_gender: formData.app_gender,
            app_contactNo: formData.app_contactNo,
            app_secondaryContactNo: formData.app_secondaryContactNo || null,
            app_emailAddress: formData.app_emailAddress,
            app_secondaryEmailAddress: formData.app_secondaryEmailAddress || null,
            app_serviceOwnership: formData.app_serviceOwnership,
            app_companyPaid: formData.app_companyPaid,
            app_yearsOfResidency: formData.app_yearsOfResidency,
            app_lessorOwner: formData.app_lessorOwner || null,
            app_lessorOwnerContactNo: formData.app_lessorOwnerContactNo || null,
            app_address: formData.app_address,
            plan_ID: formData.plan_ID
        };

        let subtypeRecord = null;

        if (formData.app_type === 'RESIDENTIAL') {
            subtypeRecord = {
                app_ID: formData.app_ID,
                app_birthDate: formData.app_birthDate,
                app_civilStatus: formData.app_civilStatus,
                app_mothersName: formData.app_mothersName,
                app_spouseName: formData.app_spouseName || null,
                app_nationality: formData.app_nationality
            };
        } else if (formData.app_type === 'COMMERCIAL') {
            subtypeRecord = {
                app_ID: formData.app_ID,
                app_businessName: formData.app_businessName,
                app_industry: formData.app_industry,
                app_tin: formData.app_tin,
                app_companyIDNo: formData.companyIDNo,
                app_department: formData.app_department
            };
        }

        // Output objects organized into relational payloads
        console.log('--- RELATIONAL ENTITY STRUCTURE SUBMISSION ---');
        console.log('APPLICATION (Supertype Table):', primaryApplicationRecord);
        console.log(`${formData.app_type} (Subtype Table):`, subtypeRecord);

        alert(`Application Package [${formData.app_ID}] validated and structured for Relational Tables.`);
    });
});