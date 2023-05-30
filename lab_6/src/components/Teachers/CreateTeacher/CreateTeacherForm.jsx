import React, {useContext, useState} from 'react';
import Modal from "../../UI/Modal/Modal.jsx";
import Input from "../../UI/Input/Input.jsx";
import classes from './CreateTeacherForm.module.scss';
import Button from "../../UI/Button/Button.jsx";
import teacherContext from "../../../store/TeacherContext/teacher-context.jsx";
import axios from "axios";
import _, {isNumber, isString} from "lodash";

const CreateTeacherForm = (props) => {
    const teacherCtx = useContext(teacherContext);

    const [fullName, setFullName] = useState('');
    const [speciality, setSpeciality] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [color, setColor] = useState('');
    const [note, setNote] = useState('');


    const fullNameInputHandler = (e) => {
        setFullName(e.target.value);
    };
    const specialityInputHandler = (e) => {
        setSpeciality(e.target.value);
    };
    const countryInputHandler = (e) => {
        setCountry(e.target.value);
    };
    const cityInputHandler = (e) => {
        setCity(e.target.value);
    };
    const emailInputHandler = (e) => {
        setEmail(e.target.value);
    };
    const phoneInputHandler = (e) => {
        setPhone(e.target.value);
    };
    const dobInputHandler = (e) => {
        setDateOfBirth(e.target.value);
    };
    const colorInputHandler = (e) => {
        setColor(e.target.value);
    };
    const noteInputHandler = (e) => {
        setNote(e.target.value);
    };

    const genderInputHandler = (e) => {
        setGender(e.target.value);
    }
    const calculateAge = () => {
        if (dateOfBirth) {
            const currentDate = new Date();

            const diffInMs = currentDate.getTime() - new Date(dateOfBirth).getTime();
            return Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365.25));
        }
        return;
    }

    const validateTeacherForm = (teacherInfo) => {

        if (!isString(teacherInfo.full_name) || teacherInfo.full_name !== _.capitalize(teacherInfo.full_name)) {
            throw new Error('Input correct full name. Full name must start with a capital letter');
        }
        if (!isString(teacherInfo.gender)  || teacherInfo.gender !== _.capitalize(teacherInfo.gender)) {
            throw new Error('Input correct gender. Gender must start with a capital letter');
        }
        if (!isString(teacherInfo.note) || teacherInfo.note !== _.capitalize(teacherInfo.note)) {
            throw new Error('Input correct note. Note must start with a capital letter');
        }

        if (!isString(teacherInfo.city) || teacherInfo.city !== _.capitalize(teacherInfo.city)) {
            throw new Error('Input correct city. City must start with a capital letter');
        }
        if (!isString(teacherInfo.country) || teacherInfo.city !== _.capitalize(teacherInfo.city)) {
            throw new Error('Input correct country. Country must start with a capital letter');
        }
        if (!isNumber(teacherInfo.age)) {
            throw new Error('Please, input number');
        }
        if (!teacherInfo.email.includes('@')) {
            throw new Error('Please, input correct email')
        }

    };

    const submitHandler = (e) => {
        try {
            e.preventDefault();

            const newTeacher = {
                id: 'id' + Math.floor(Math.random() * 50 ** 10),
                gender: gender,
                full_name: fullName,
                city: city,
                country: country,
                email: email,
                b_date: dateOfBirth,
                age: calculateAge(dateOfBirth),
                phone: phone,
                favorite: false,
                courseList: speciality,
                bg_color: color,
                note: note,
                picture_Large: 'https://image-cdn.essentiallysports.com/wp-content/uploads/Mike-OHearn-740x710.jpg'
            };
            const addTeacherToDB = async ()=>{
                const response = await axios.post('http://localhost:3030/teachers', {...newTeacher})
                console.log(response);
            }
            validateTeacherForm(newTeacher);
            teacherCtx.addNewTeacher(newTeacher);
            addTeacherToDB();
            props.onClose();
        } catch (e) {
            alert(`Something went wrong. Please enter the correct data... \n${e.message}`)
        }
    };

    return (
        <Modal headerText='Add teacher'>
            <section>
                <form className={classes['add-teacher__form']} onSubmit={submitHandler}>
                    <div className={classes['add-teacher__input']}>
                        <Input
                            type='text'
                            id='full-name'
                            labelText='Name'
                            placeholder='Enter name'
                            value={fullName}
                            onChange={fullNameInputHandler}
                        />
                    </div>
                    <div className={classes['add-teacher__input']}>
                        <label htmlFor="speciality">Speciality</label>
                        <select id="speciality"
                                value={speciality}
                                onChange={specialityInputHandler}

                        >
                            <option value='Math'>Math</option>
                            <option value='Physics'>Physic</option>
                            <option value='PE'>PE</option>
                            <option value='Biology'>Biology</option>
                            <option value='Chemistry'>Chemistry</option>
                        </select>
                    </div>
                    <div className={classes.teacher__info}>
                        <div className={classes['add-teacher__input']}>
                            <Input
                                type='text'
                                id='country'
                                labelText='Country'
                                value={country}
                                onChange={countryInputHandler}
                            />
                        </div>
                        <div className={classes['add-teacher__input']}>
                            <Input
                                type='text'
                                id='city'
                                labelText='City'
                                value={city}
                                onChange={cityInputHandler}
                            />
                        </div>
                        <div className={classes['add-teacher__input']}>
                            <Input
                                type='text'
                                id='email'
                                labelText='Email'
                                value={email}
                                onChange={emailInputHandler}
                            />
                        </div>

                        <div className={classes['add-teacher__input']}>
                            <Input
                                type='tel'
                                id='phone-number'
                                labelText='Phone'
                                placeholder={'+380 (44)-123-4567'}
                                value={phone}
                                onChange={phoneInputHandler}
                            />
                        </div>
                    </div>
                    <div className={classes['add-teacher__input']}>
                        <Input
                            type='date'
                            id='date-of-birth'
                            labelText='Date of birth'
                            value={dateOfBirth}
                            onChange={dobInputHandler}
                        />
                    </div>
                    <div className={`${classes['add-teacher__input']} ${classes['gender__input']}`}>
                        <span>Sex</span>
                        <Input
                            type='radio'
                            id='male'
                            labelText='Male'
                            value='Male'
                            checked={gender === "Male"}
                            onChange={genderInputHandler}
                        />
                        <Input
                            type='radio'
                            id='female'
                            labelText='Female'
                            value='Female'
                            checked={gender === "Female"}
                            onChange={genderInputHandler}
                        />

                    </div>
                    <div className={`${classes['add-teacher__input']} ${classes['bg__input']}`}>
                        <Input
                            type='color'
                            id='bg-color'
                            labelText='Background color'
                            value={color}
                            onChange={colorInputHandler}
                        />
                    </div>


                    <div className={classes['add-teacher__input']}>
                        <label htmlFor="comments">Notes(optional)</label>
                        <textarea
                            id="comments"
                            value={note}
                            onChange={noteInputHandler}
                        >
                            Create a note...
                        </textarea>
                    </div>
                    <div className={classes['add-teacher__actions']}>
                        <Button type="submit">Add</Button>
                    </div>
                </form>
            </section>
        </Modal>

    );
};

export default CreateTeacherForm;
