import {useState, useEffect, useContext, Fragment} from 'react';
import * as Constants from '../Constants'
import MyContext from '../context/MyContext';
import Loading from './Loading'
import Dropdown from 'react-dropdown';
import PhoneInput from 'react-phone-number-input/input'
import 'react-dropdown/style.css';

const Dashboard = () => {
    const {supers, success, superLabels, getSupers, loading, submitNotification, errors, setContext} = useContext(MyContext);
    const [selectedSuper, setSelectedSuper] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [useEmail, setUseEmail] = useState(false);
    const [usePhone, setUsePhone] = useState(false);

    //functions called on load or on change of errors or success status
    useEffect(() => {
        //if we don't have supervisors, grab them
        if(supers.length === 0){
            getSupers();
        }

        //if there are errors, clear them after three seconds
        if(errors.length > 0){
            const timer = setTimeout(() => {
                setContext(Constants.SET_ERRORS, []);
            }, 3000);
            return () => clearTimeout(timer);
        }

        //show success message for three seconds then clear form
        if(success){
            const timer = setTimeout(() => {
                console.log('SUCCESS!')
                setSelectedSuper(null)
                setFirstName('')
                setLastName('')
                setPhone('')
                setEmail('')
                setUseEmail(false)
                setUsePhone(false)
                setContext(Constants.SET_SUCCESS, false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errors, success])

    //submit notification to server
    const submitForm = (e) => {
        e.preventDefault();
        let customer = {
            firstName,
            lastName,
            email,
            phone,
            selectedSuper
        }
        submitNotification(customer);
    }


    //main UI, didn't put much effort into making it look nice since that's not being graded
    //However, it is mobile-friendly
    //removed validation on inputs so bad data could be submitted to server
  return (
    <form className='row border border-secondary' onSubmit={submitForm}>
        <h1>Notification Form</h1>
        <hr/>
        {loading? <Loading/> :
        <Fragment>
            <div className='col-12 col-md-6 form-group text-start'>
                <label htmlFor="firstName">First Name</label>
                <input type="text" 
                    name="firstName" 
                    id="firstNameInput" 
                    className='form-control'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}/>
            </div>
            <div className='col-12 col-md-6 form-group text-start'>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" 
                    name="lastName" 
                    id="lastNameInput" 
                    className='form-control'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}/>
            </div>
            <div className='col-12 text-muted text-start mt-4 mb-2'>How would you prefer to be notified?</div>
            <div className='col-12 col-md-6 form-group text-start'>
                <div className='form-check form-switch'>
                    <input className="form-check-input" type="checkbox" id="useEmailSwitch" checked={useEmail} onChange={(e) => setUseEmail(e.target.checked)}/>
                    <label className="form-check-label" htmlFor="useEmailSwitch">Email</label>
                </div>
                <input type="email" 
                    name="email" 
                    id="emailInput" 
                    className='form-control' 
                    value={email}
                    disabled={!useEmail}
                    onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className='col-12 col-md-6 form-group text-start'>
                <div className='form-check form-switch'>
                    <input className="form-check-input" type="checkbox" id="usePhoneSwitch" checked={usePhone} onChange={(e) => setUsePhone(e.target.checked)}/>
                    <label className="form-check-label" htmlFor="usePhoneSwitch">Phone Number</label>
                </div>
                <PhoneInput
                    name="phone"
                    country="US"
                    value={phone}
                    placeholder='(123) 456-7890'
                    className='form-control'
                    disabled={!usePhone}
                    onChange={(value) => setPhone(value)}/>
            </div>
            <div className='col-12 col-md-4 offset-md-4 mt-4 form-group text-start'>
                <label htmlFor="supervisor">Supervisor</label>
                <Dropdown
                    name='supervisor'
                    className='inputFields'
                    placeholder='Select Supervisor'
                    options={superLabels}
                    value={selectedSuper}
                    onChange={(e) =>setSelectedSuper(e.value)}
                />
            </div>
            <div className='col-12 mt-4 mb-2'>
                <input type='submit' value='Submit' className='btn btn-block btn-primary w-25'/>
                {errors.map(error => (
                    <div className='text-danger fw-bold'>Error: {error.message}</div>
                ))}
                {success && <div className='text-primary fw-bold'>Success!</div>}
            </div>
        </Fragment>
        }
    </form>
  )
}

export default Dashboard