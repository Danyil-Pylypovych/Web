import React, {useEffect, useState} from "react";
import {FAVOURITE_TEACHERS} from "../../constants/constants.js";
import {randomUserTransformed, teacherListMerged} from "../../constants/mockedData.js";

const TeacherContext = React.createContext({
    favoriteTeacherList: [],
    teachersList: [],
    searchValue: '',
    searchHandler: (search) => {
    },
    addNewTeacher: (teacher) => {
    },
    addToFavorite: (teacher) => {
    },
})

export const TeacherProvider = (props) => {
    const [favTeacher, setFavTeacher] = useState([]);
    const [allTeachers, setAllTeachers] = useState([...teacherListMerged]);
    const [enteredSearchValue, setEnteredSearchValue] = useState('');
    useEffect(() => {
        const storedFavoriteTeachersList = JSON.parse(localStorage.getItem(FAVOURITE_TEACHERS));
        if (storedFavoriteTeachersList) {
            setFavTeacher(storedFavoriteTeachersList);
        }
    }, [])

    const addFavoriteTeacherHandler = (teacher) => {

        let teachersArr = localStorage.getItem(FAVOURITE_TEACHERS);
        let newTeachersArr = [];
        teacher.favorite = true;

        if (!teachersArr) {

            newTeachersArr.push(teacher);

            localStorage.setItem(FAVOURITE_TEACHERS, JSON.stringify(newTeachersArr));
            setFavTeacher(prevState => [teacher, ...prevState]);
            return;
        }
        newTeachersArr = [teacher, ...JSON.parse(teachersArr)];
        localStorage.setItem(FAVOURITE_TEACHERS, JSON.stringify(newTeachersArr));
        setFavTeacher(prevState => [teacher, ...prevState]);


    };
    const addNewTeacher = (teacher) => {
        setAllTeachers(prevState => [teacher, ...prevState]);
    }
    const searchHandler = (value) => {
        setEnteredSearchValue(value);
    }
    return (
        <TeacherContext.Provider value={{

            favoriteTeacherList: favTeacher,
            teachersList: allTeachers,
            searchValue: enteredSearchValue,
            searchHandler,
            addToFavorite: addFavoriteTeacherHandler,
            addNewTeacher:addNewTeacher

        }}>
            {props.children}
        </TeacherContext.Provider>
    );
};
export default TeacherContext;
