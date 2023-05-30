import React, {useContext, useEffect, useState} from 'react';

import classes from './TeacherFiltersMenu.module.scss';
import Input from "../../../UI/Input/Input.jsx";
import TeacherContext from "../../../../store/TeacherContext/teacher-context.jsx";

const TeacherFiltersMenu = () => {
    const [enteredGender, setEnteredGender] = useState(undefined);
    const [enteredAge, setEnteredAge] = useState(undefined);
    const [enteredCountry, setEnteredCountry] = useState(undefined);
    const [enteredFavourite, setEnteredFavourite] = useState(false);
    const teacherCtx = useContext(TeacherContext);

    const genderHandler = (event) => {
        if (event.target.value === 'All') {
            setEnteredGender(undefined);
            return;
        }
        setEnteredGender(event.target.value);
    };
    const ageHandler = (event) => {
        if (event.target.value === 'All') {
            setEnteredAge(undefined);
            return;
        }
        setEnteredAge(event.target.value);
    };
    const countryHandler = (event) => {
        if (event.target.value === 'All') {
            setEnteredCountry(undefined);
            return;
        }
        setEnteredCountry(event.target.value);
    };
    const favouriteHandler = () => {

        setEnteredFavourite(prevState => !prevState);
    };
    useEffect(() => {
        teacherCtx.updateFilterParams({
            gender: enteredGender,
            age: enteredAge,
            country: enteredCountry,
            favorite: enteredFavourite
        });
    }, [enteredGender, enteredAge, enteredFavourite, enteredCountry]);
    return (
        <div className={classes['top-teachers__filter']}>
            <div className={classes['filter__options']}>
                <label htmlFor="age">Age</label>
                <select id="age" onChange={ageHandler}>
                    <option>All</option>
                    <option value='18-30'>18-30</option>
                    <option value='31-40'>31-40</option>
                    <option value='41-50'>41-50</option>
                    <option value='51-60'>51-60</option>
                    <option value='61-90'>61-90</option>
                </select>
            </div>
            <div className={classes['filter__options']}>
                <label htmlFor="region">Region</label>
                <select id="region" onChange={countryHandler}>
                    <option>All</option>
                    <option value='Norway'>Norway</option>
                    <option value='France'>France</option>
                    <option value='Denmark'>Denmark</option>
                    <option value='Canada'>Canada</option>
                    <option value='Netherlands'>Netherlands</option>
                </select>
            </div>
            <div className={classes['filter__options']}>
                <label htmlFor="sex">Sex</label>
                <select id="sex" onChange={genderHandler}>
                    <option>All</option>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                </select>
            </div>
            <div className={`${classes['filter__options']} ${classes.checkbox}`}>
                <Input id="with-photo" type="checkbox"/>
                <label>Only with photo</label>
            </div>
            <div className={`${classes['filter__options']} ${classes.checkbox}`}>
                <Input id="favorites" type="checkbox" onChange={favouriteHandler}/>
                <label>Only favorites</label>
            </div>
        </div>
    );
};

export default TeacherFiltersMenu;
