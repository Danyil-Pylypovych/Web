import React, {useState} from 'react';
import classes from './TopTeachers.module.scss';
import TeacherFiltersMenu from "./TeacherFiltersMenu/TeacherFiltersMenu.jsx";
import TeachersList from "./TeachersList/TeachersList.jsx";

const TopTeachers = () => {

    return (
        <article className={classes['top-teachers']} id="top-teachers">
            <h1>Top Teachers</h1>
            <TeacherFiltersMenu />
            <TeachersList />
        </article>
    );
};

export default TopTeachers;
