from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import os                                      
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'documents' 
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

#connector
db = mysql.connector.connect(
    host='localhost',
    user='root',
    password='',
    database=''
)

#login
@app.route('/login', methods = ['POST'])
def login():
    data = request.json
    user_app_id = data.get('app_ID')
    user_email = data.get('app_emailAddress')
    
    cursor = db.cursor(dictionary=True)
    sql_query = "SELECT app_ID, app_emailAddress, app_name FROM applicant WHERE app_ID = %s AND app_emailAddress = %s" 
    cursor.execute(sql_query, (user_app_id, user_email))
    applicant_record = cursor.fetchone()
    cursor.close()

    if applicant_record:
        return jsonify({
            "status": "success", 
            "message": f"Welcome back, {applicant_record['app_name']}!",
            "data": applicant_record
        }), 200
    else:
        return jsonify({
            "status": "error", 
            "message": "Invalid Application ID or Email."
        }), 401



#application
@app.route('/application', methods=['POST'])
def application():
    data = request.json 
    
    if not data:
        return jsonify({"status": "error", "message": "No data provided"}), 400

    user_app_type = data.get('app_type')
    user_app_name = data.get('app_name')
    user_app_gender = data.get('app_gender')
    user_app_contactNo = data.get('app_contactNo')
    user_app_secondaryContactNo = data.get('app_secondaryContactNo')
    user_app_emailAddress = data.get('app_emailAddress')
    user_app_secondaryEmailAddress = data.get('app_secondaryEmailAddress')
    user_app_serviceOwnership = data.get('app_serviceOwnership')
    user_app_companyPaid = data.get('app_companyPaid')
    user_app_yearsOfResidency = data.get('app_yearsOfResidency')
    user_app_lessorOwner = data.get('app_lessorOwner')
    user_app_lessorOwnerContactNo = data.get('app_lessorOwnerContactNo')
    user_app_address = data.get('app_address')

    #For Residential Applicant:
    user_app_birthDate = data.get('app_birthDate')
    user_app_civilStatus = data.get('app_civilStatus')
    user_app_mothersName = data.get('app_mothersName')
    user_app_spouseName = data.get('app_spouseName')
    user_app_nationality = data.get('app_nationality')
    
    #For Commercial Applicant:
    user_app_businessName = data.get('app_businessName')
    user_app_industry = data.get('app_industry')
    user_app_tin = data.get('app_tin')
    user_app_companyIDNo = data.get('app_companyIDNo')
    user_app_department = data.get('app_department')
    
    #Plan_ID 
    user_plan_name = data.get('plan_name')
    user_plan_type = data.get('plan_type')
    user_plan_speed = data.get('plan_speed')
    user_plan_cableAddOn = data.get('plan_cableAddOn')
    user_plan_publicIP = data.get('plan_publicIP')
    user_plan_installationFee = data.get('plan_installationFee')

    cursor = db.cursor(dictionary=True)

    try:
        sql_find_plan = """
            SELECT plan_ID FROM internet_plans 
            WHERE plan_name = %s AND plan_type = %s AND plan_speed = %s 
            AND plan_cableAddOn <=> %s AND plan_publicIP = %s AND plan_installationFee = %s
        """
        cursor.execute(sql_find_plan, (user_plan_name, user_plan_type, user_plan_speed, user_plan_cableAddOn, user_plan_publicIP, user_plan_installationFee))
        plan_record = cursor.fetchone()
        
        if not plan_record:
            return jsonify({"status": "error", "message": "Selected Internet Plan not found in system."}), 404
            
        plan_id = plan_record['plan_ID']

        sql_insert_applicant = """
            INSERT INTO applicant (
                app_type, app_date, app_name, app_gender, app_contactNo, 
                app_secondaryContactNo, app_emailAddress, app_secondaryEmailAddress, 
                app_serviceOwnership, app_companyPaid, app_yearsOfResidency, 
                app_lessorOwner, app_lessorOwnerContactNo, app_address, plan_ID
            ) VALUES (%s, DATE_FORMAT(CURDATE(), '%Y-%m-%d'), %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(sql_insert_applicant, (
            user_app_type, user_app_name, user_app_gender, user_app_contactNo,
            user_app_secondaryContactNo, user_app_emailAddress, user_app_secondaryEmailAddress,
            user_app_serviceOwnership, user_app_companyPaid, user_app_yearsOfResidency,
            user_app_lessorOwner, user_app_lessorOwnerContactNo, user_app_address, plan_id
        ))

        cursor.execute("SELECT app_ID FROM applicant WHERE app_emailAddress = %s ORDER BY app_date DESC LIMIT 1", (user_app_emailAddress,))
        new_applicant = cursor.fetchone()
        new_app_id = new_applicant['app_ID']

        if int(user_app_type) == 0:
            sql_insert_residential = """
                INSERT INTO residential_applicants (
                    app_ID, app_birthDate, app_civilStatus, app_mothersName, app_spouseName, app_nationality
                ) VALUES (%s, %s, %s, %s, %s, %s)
            """
            cursor.execute(sql_insert_residential, (
                new_app_id, user_app_birthDate, user_app_civilStatus, 
                user_app_mothersName, user_app_spouseName, user_app_nationality
            ))
            
        elif int(user_app_type) == 1:
            sql_insert_commercial = """
                INSERT INTO commercial_applicants (
                    app_ID, app_businessName, app_industry, app_tin, app_companyIDNo, app_department
                ) VALUES (%s, %s, %s, %s, %s, %s)
            """
            cursor.execute(sql_insert_commercial, (
                new_app_id, user_app_businessName, user_app_industry, 
                user_app_tin, user_app_companyIDNo, user_app_department
            ))

        db.commit()
        
        return jsonify({
            "status": "success", 
            "message": "Application submitted successfully!",
            "generated_id": new_app_id
        }), 201

    except Exception as e:
        db.rollback()
        return jsonify({"status": "error", "message": f"Database error: {str(e)}"}), 500
        
    finally:
        cursor.close()

#profile
from flask import request, jsonify

def is_application_complete(app_type, uploaded_docs):
    uploaded_set = set(uploaded_docs)

    if app_type == 0:
        required_res = {'DOC-101', 'DOC-201', 'DOC-202', 'DOC-301', 'DOC-601'}
        return required_res.issubset(uploaded_set)
        
    elif app_type == 1:
        base_req = {'DOC-102', 'DOC-103', 'DOC-601'}
        
        opt_1 = {'DOC-401', 'DOC-402'}
        opt_2 = {'DOC-401', 'DOC-403', 'DOC-404'}
        opt_3 = {'DOC-104', 'DOC-501'}
        opt_4 = {'DOC-502', 'DOC-503'}
        
        has_base = base_req.issubset(uploaded_set)
        has_option = (opt_1.issubset(uploaded_set) or 
                      opt_2.issubset(uploaded_set) or 
                      opt_3.issubset(uploaded_set) or 
                      opt_4.issubset(uploaded_set))
                      
        return has_base and has_option
        
    return False

@app.route('/profile/<app_id>/document/<doc_id>', methods=['DELETE'])
def delete_document(app_id, doc_id):
    cursor = db.cursor(dictionary=True)
    
    try:
        cursor.execute("SELECT app_type FROM applicant WHERE app_ID = %s", (app_id,))
        applicant = cursor.fetchone()
        
        if not applicant:
            return jsonify({"status": "error", "message": "Applicant not found"}), 404
            
        cursor.execute("SELECT doc_ID FROM applicants_documents WHERE app_ID = %s", (app_id,))
        uploaded_doc_ids = [row['doc_ID'] for row in cursor.fetchall()]
        
        if is_application_complete(applicant['app_type'], uploaded_doc_ids):
            return jsonify({"status": "error", "message": "Cannot delete documents: Application is already complete."}), 403

        cursor.execute("SELECT doc_path FROM applicants_documents WHERE app_ID = %s AND doc_ID = %s", (app_id, doc_id))
        doc_record = cursor.fetchone()
        
        if not doc_record:
            return jsonify({"status": "error", "message": "Document not found in system."}), 404
            
        file_path = doc_record['doc_path']
        if os.path.exists(file_path):
            os.remove(file_path)
            
        cursor.execute("DELETE FROM applicants_documents WHERE app_ID = %s AND doc_ID = %s", (app_id, doc_id))
        db.commit()
        
        return jsonify({"status": "success", "message": "Document deleted successfully."}), 200

    except Exception as e:
        db.rollback()
        return jsonify({"status": "error", "message": f"Database error: {str(e)}"}), 500
        
    finally:
        cursor.close()


@app.route('/profile/<app_id>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def profile(app_id):
    cursor = db.cursor(dictionary=True)
    
    try:
        if request.method == 'GET':
            sql_profile = """
                SELECT a.app_name, a.app_type, a.app_ID, 
                       a.app_contactNo, a.app_secondaryContactNo, 
                       a.app_emailAddress, a.app_secondaryEmailAddress,
                       p.plan_ID, p.plan_name, p.plan_type, p.plan_speed, 
                       p.plan_cableAddOn, p.plan_publicIP, p.plan_installationFee, 
                       p.plan_monthlyServiceFee
                FROM applicant a
                JOIN internet_plans p ON a.plan_ID = p.plan_ID
                WHERE a.app_ID = %s
            """
            cursor.execute(sql_profile, (app_id,))
            profile_data = cursor.fetchone()
            
            if not profile_data:
                return jsonify({"status": "error", "message": "Applicant not found"}), 404
                
            profile_data['app_type_display'] = "Residential" if profile_data['app_type'] == 0 else "Commercial"

            sql_docs = """
                SELECT d.doc_ID, d.doc_type, ad.doc_path 
                FROM applicants_documents ad
                JOIN documents d ON ad.doc_ID = d.doc_ID
                WHERE ad.app_ID = %s
            """
            cursor.execute(sql_docs, (app_id,))
            uploaded_files = cursor.fetchall()

            uploaded_doc_ids = [doc['doc_ID'] for doc in uploaded_files]
            
            # Check completion status
            is_complete = is_application_complete(profile_data['app_type'], uploaded_doc_ids)
            
            return jsonify({
                "status": "success",
                "profile": profile_data,
                "uploaded_documents": uploaded_files,
                "application_complete": is_complete
            }), 200
        
        elif request.method == 'POST':
            if 'file' not in request.files:
                return jsonify({"status": "error", "message": "No file part sent."}), 400
                
            file = request.files['file']
        
            frontend_doc_id = request.form.get('doc_type') 
            
            if file.filename == '':
                return jsonify({"status": "error", "message": "No file selected."}), 400
                
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                
                user_folder = os.path.join(app.config['UPLOAD_FOLDER'], app_id)
                os.makedirs(user_folder, exist_ok=True)
                file_path = os.path.join(user_folder, filename)
                file.save(file_path)
                
                cursor.execute("SELECT doc_type FROM documents WHERE doc_ID = %s", (frontend_doc_id,))
                doc_record = cursor.fetchone()
                
                if not doc_record:
                    os.remove(file_path) 
                    return jsonify({"status": "error", "message": "Invalid document ID."}), 400
                    
                cursor.execute("INSERT INTO applicants_documents (app_ID, doc_ID, doc_path) VALUES (%s, %s, %s)", 
                               (app_id, frontend_doc_id, file_path))
                db.commit()
                
                real_doc_name = doc_record['doc_type']
                return jsonify({"status": "success", "message": f"{real_doc_name} uploaded successfully!"}), 201
            else:
                return jsonify({"status": "error", "message": "Invalid file format. Please use PDF, JPG, or PNG."}), 400
        
        elif request.method == 'PUT':
            data = request.json
            
            sql_update = """
                UPDATE applicant 
                SET app_contactNo = %s, app_secondaryContactNo = %s, 
                    app_emailAddress = %s, app_secondaryEmailAddress = %s
                WHERE app_ID = %s
            """
            cursor.execute(sql_update, (
                data.get('app_contactNo'), 
                data.get('app_secondaryContactNo'), 
                data.get('app_emailAddress'), 
                data.get('app_secondaryEmailAddress'),
                app_id
            ))
            db.commit()
            return jsonify({"status": "success", "message": "Contact details updated!"}), 200

        elif request.method == 'DELETE':
            cursor.execute("SELECT app_type FROM applicant WHERE app_ID = %s", (app_id,))
            applicant = cursor.fetchone()
            
            if not applicant:
                return jsonify({"status": "error", "message": "Applicant not found"}), 404
                
            cursor.execute("SELECT doc_ID FROM applicants_documents WHERE app_ID = %s", (app_id,))
            uploaded_doc_ids = [row['doc_ID'] for row in cursor.fetchall()]
            
            if is_application_complete(applicant['app_type'], uploaded_doc_ids):
                return jsonify({"status": "error", "message": "Cannot delete: Application is already complete."}), 403
                
            # --- NEW CODE: Delete child rows first ---
            # 1. Delete associated documents from database (and optionally physical files here if needed)
            cursor.execute("DELETE FROM applicants_documents WHERE app_ID = %s", (app_id,))
            
            # 2. Delete from specific applicant type tables
            if applicant['app_type'] == 0:
                cursor.execute("DELETE FROM residential_applicants WHERE app_ID = %s", (app_id,))
            elif applicant['app_type'] == 1:
                cursor.execute("DELETE FROM commercial_applicants WHERE app_ID = %s", (app_id,))
                
            # 3. Finally, delete the parent record
            cursor.execute("DELETE FROM applicant WHERE app_ID = %s", (app_id,))
            # -----------------------------------------
            
            db.commit()
            return jsonify({"status": "success", "message": "Application cancelled and deleted."}), 200

    except Exception as e:
        db.rollback()
        return jsonify({"status": "error", "message": str(e)}), 500
        
    finally:
        cursor.close()

if __name__ == "__main__":
    print("Connecting to DB and starting server on port 5000...")
    app.run(debug=True)
