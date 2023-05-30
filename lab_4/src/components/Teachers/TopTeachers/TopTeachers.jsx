import React, {useState} from 'react';
import classes from './TopTeachers.module.scss';
import TeacherFiltersMenu from "./TeacherFiltersMenu/TeacherFiltersMenu.jsx";
import TeachersList from "./TeachersList/TeachersList.jsx";

const TopTeachers = () => {
    const [filterParams, setFilterParams] = useState({});
    const settingFilterParams = (filter) => {
        setFilterParams(prevState => ({
            ...prevState,
            ...filter
        }))
    }
    return (
        <article className={classes['top-teachers']} id="top-teachers">
            <h1>Top Teachers</h1>
            <TeacherFiltersMenu onSet={settingFilterParams}/>
            <TeachersList filterParams={filterParams}/>
        </article>
    );
};

export default TopTeachers;
