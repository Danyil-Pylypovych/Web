import React, {useContext, useState} from 'react';
import classes from './TeachersList.module.scss';
import TeacherCard from "../../TeacherCard/TeacherCard.jsx";
import TeacherContext from "../../../../store/TeacherContext/teacher-context.jsx";

const TeachersList = (props) => {

    const teacherCtx = useContext(TeacherContext);
    const {country, age, gender, favorite} = props.filterParams;
    const enteredSearch = teacherCtx.searchValue;
    const checkAge = (teacherAge) => {
        switch (age.toLowerCase()) {
            case "18-30":
                return Number(teacherAge) > 18 && Number(teacherAge) <= 30;
            case "31-40":
                return Number(teacherAge) > 30 && Number(teacherAge) <= 40;
            case "41-50":
                return Number(teacherAge) > 40 && Number(teacherAge) <= 50;
            case "51-60":
                return Number(teacherAge) > 50 && Number(teacherAge) <= 60;
            case "61-90":
                return Number(teacherAge) > 60 && Number(teacherAge) <= 90;
            case "all":
                return true;
            default:
                return true;
        }
    };
    const filterTeacherList = (list, country, age, gender, favorite) => {
        return list.filter((teacher) => {

            return (country === undefined || teacher.country === country) &&
                (age === undefined || checkAge(teacher.age)) &&
                (gender === undefined || teacher.gender === gender) &&
                (favorite === undefined || teacher.favorite === favorite)
        })
    };
    const searchTeachers = (list) => list.filter((teacher) => {
        if (enteredSearch === "") {
            return teacher;
        }
        if (teacher.note.toLowerCase().indexOf(enteredSearch.toLowerCase()) >= 0) {
            return teacher;
        }
        if (teacher.full_name.toLowerCase().indexOf(enteredSearch.toLowerCase()) >= 0) {
            return teacher;
        }
        if (String(teacher.age).toLowerCase().indexOf(enteredSearch.toLowerCase()) >= 0) {
            return teacher;
        }
        return;
    });
    const filteredList = filterTeacherList(teacherCtx.teachersList, country, age, gender, favorite);
    const content = searchTeachers(filteredList).map(teacher => (
        <TeacherCard
            key={teacher.id}
            teacherData={teacher}
            renderStar={true}
        />
    ));


    return (
        <div className={classes['top-teachers__list']}>
            {content.length !== 0 && <ul>
                {content}
            </ul>}
            {content.length === 0 && <p style={{textAlign: 'center'}}>No results :(</p>}
        </div>
    );
};

export default TeachersList;
