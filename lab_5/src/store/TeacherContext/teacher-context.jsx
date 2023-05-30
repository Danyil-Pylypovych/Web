import React, {useEffect, useState} from "react";
import {FAVOURITE_TEACHERS} from "../../constants/constants.js";
import {randomUserTransformed, teacherListMerged, transformUserData} from "../../constants/mockedData.js";
import axios from "axios";

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
    updateFilterParams: (filter) => {

    },
    paginationCount: {
        next: () => {
        },
        prev: () => {
        }
    }
})

export const TeacherProvider = (props) => {
    const [favTeacher, setFavTeacher] = useState([]);
    const [allTeachers, setAllTeachers] = useState([]);
    const [enteredSearchValue, setEnteredSearchValue] = useState('');
    const [filterParams, setFilterParams] = useState({});
    const [pagination, setPagination] = useState(1);
    const {country, age, gender, favorite} = filterParams;

    useEffect(() => {
        const fetchTeacher = async () => {
            const response = await axios.get(`https://randomuser.me/api?page=${pagination}&results=10&seed=abc`);
            setAllTeachers(transformUserData(response.data.results));
        }
        const storedFavoriteTeachersList = JSON.parse(localStorage.getItem(FAVOURITE_TEACHERS));

        if (storedFavoriteTeachersList) {
            setFavTeacher(storedFavoriteTeachersList);
        }
        fetchTeacher();
    }, [pagination])

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

    const settingFilterParams = (filter) => {
        setFilterParams(prevState => ({
            ...prevState,
            ...filter
        }))
    }
    const goToNextPage = () => {
        setPagination(prevState => prevState + 1);
    }
    const goToPrevPage = () => {
        if (pagination > 1) {
            setPagination(prevState => prevState - 1);
        }
        return;
    }
    const filterTeacherList = (list, country, age, gender, favorite) => {
        return list.filter((teacher) => {

            return (country === undefined || teacher.country === country) &&
                (age === undefined || checkAge(teacher.age)) &&
                (gender === undefined || teacher.gender === gender) &&
                (favorite === undefined || teacher.favorite === favorite)
        })
    };
    const searchTeachers = (list) => list.filter((teacher) => {
        if (enteredSearchValue === "") {
            return teacher;
        }
        if (teacher.note.toLowerCase().indexOf(enteredSearchValue.toLowerCase()) >= 0) {
            return teacher;
        }
        if (teacher.full_name.toLowerCase().indexOf(enteredSearchValue.toLowerCase()) >= 0) {
            return teacher;
        }
        if (String(teacher.age).toLowerCase().indexOf(enteredSearchValue.toLowerCase()) >= 0) {
            return teacher;
        }
        return;
    });

    function checkAge(teacherAge) {
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
    }

    return (
        <TeacherContext.Provider value={{

            favoriteTeacherList: favTeacher,
            teachersList: searchTeachers(filterTeacherList(allTeachers, country, age, gender, favorite)),
            searchValue: enteredSearchValue,
            searchHandler,
            addToFavorite: addFavoriteTeacherHandler,
            addNewTeacher: addNewTeacher,
            updateFilterParams: settingFilterParams,
            paginationCount: {
                goToNextPage,
                goToPrevPage
            }
        }}>
            {props.children}
        </TeacherContext.Provider>
    );
};
export default TeacherContext;
