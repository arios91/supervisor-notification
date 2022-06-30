const { default: axios } = require('axios');
var validator = require("email-validator");
const {phone} = require('phone');
const express = require('express');
const router = express.Router();


//GET supervisors
router.get('/supervisors', async(req, res) => {
    try {
        let supers = []
        await axios.get('https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers')
        .then(res => {
            let data = res.data;
            //remove numeric jurisdictions
            let supervisors = data.filter(supervisor => isNaN(supervisor.jurisdiction));
            //sort alphabetically by jurisdiction -> lastName -> firstName
            supervisors.sort((a,b) => {
                if(a.jurisdiction.toUpperCase() == b.jurisdiction.toUpperCase()){
                    if(a.lastName.toUpperCase() == b.lastName.toUpperCase()){
                        if(a.firstName.toUpperCase() == b.firstName.toUpperCase()){
                            return 0;
                        }else if(a.firstName.toUpperCase() > b.firstName.toUpperCase()){
                            return 1
                        }else if(a.firstName.toUpperCase() < b.firstName.toUpperCase()){
                            return -1
                        }
                    }else if(a.lastName.toUpperCase() > b.lastName.toUpperCase()){
                        return 1
                    }else if(a.lastName.toUpperCase() < b.lastName.toUpperCase()){
                        return -1
                    }
                }else if(a.jurisdiction.toUpperCase() > b.jurisdiction.toUpperCase()){
                    return 1
                }else if(a.jurisdiction.toUpperCase() < b.jurisdiction.toUpperCase()){
                    return -1
                }
                return 0;
            })
            
            //format to the required specification
            supers = supervisors.map(supervisor => {
                return {
                    supervisor : `${supervisor.jurisdiction} - ${supervisor.lastName}, ${supervisor.firstName}`
                }
            })
        })
        res.send(supers)
    } catch (error) {
        console.log('ERROR!!')
        console.log(error)
    }
})

//POST submit
// accepts a request for new notification request for supervisor
// following data is required
// firstName, lastName, email, phoneNumber, Supervisor
// print to console of node server if sucessful
// if error, return error with appropriate message
// validation requirements
// 1) name fields are required and only letters, NO NUMBERS
// 2) standard validation against phone number and email
// 3) any invalid request must send back an error response
// Note: phone and email are optional, but must be validated
const specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~0123456789]/;
router.post('/submit', async(req, res) => {
    try {
        let {firstName, lastName, email, selectedSuper} = req.body;
        //errors array to be sent back to the front-end
        let errors = [];

        //validation
        if(firstName == ''){
            errors.push({message: 'First name is required'})
        }else if(specialChars.test(firstName)){
            errors.push({message: 'First name cannot contain special characters or numbers'})
        }

        if(lastName == ''){
            errors.push({message: 'Last name is required'})
        }else if(specialChars.test(lastName)){
            errors.push({message: 'Last name cannot contain special characters or numbers'})
        }

        if(!selectedSuper || selectedSuper == ''){
            errors.push({message: 'Supervisor must be selected'})
        }

        if(email != '' && !validator.validate(email)){
            errors.push({message: 'Invalid email address'})
        }

        if(req.body.phone != ''){
            let phoneObj = phone(req.body.phone, {country: 'USA'});
            if(!phoneObj.isValid){
                errors.push({message: 'Invalid phone number'})
            }
        }

        //if there are any errors, send them back to the ui
        if(errors.length > 0){
            console.log('Invalid post')
            return res.json({success: false, errors});
        }

        //if no errors, then print to console
        console.log('Successful post');
        console.log(req.body)
        return res.send('success')
    } catch (error) {
        console.log('ERROR!');
        console.log(error);
    }
})


module.exports = router;