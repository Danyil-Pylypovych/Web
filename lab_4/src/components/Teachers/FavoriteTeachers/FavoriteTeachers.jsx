import React, {useContext, useEffect, useRef, useState} from 'react';
import classes from './FavoriteTeachers.module.scss';
import TeacherCard from "../TeacherCard/TeacherCard.jsx";
import {FAVOURITE_TEACHERS} from "../../../constants/constants.js";
import TeacherContext from "../../../store/TeacherContext/teacher-context.jsx";
import {teacherListMerged} from "../../../constants/mockedData.js";

const FavoriteTeachers = () => {

    const [sliderPosition, setSliderPosition] = useState(0);
    const teacherCtx = useContext(TeacherContext);
    const teachersList = teacherCtx.favoriteTeacherList;

    let leftArrowClasses = `${classes.left_arrow} fas fa-angle-left`;
    let rightArrowClasses = `${classes.right_arrow} fas fa-angle-right`;
    const leftSlideHandler = () => {
        setSliderPosition(prevState => prevState - 1);
    };
    const rightSlideHandler = () => {
        setSliderPosition(prevState => prevState + 1);
    };
    let content;
    if (teachersList.length!==0) {
        content = teachersList.slice(sliderPosition, sliderPosition + 5).map(teacher => <TeacherCard
            key={teacher.id}
            teacherData={teacher}
            renderStar={false}/>)

        if (sliderPosition === 0) {
            leftArrowClasses += classes.disabled;
        }
        if (sliderPosition+1*5===teachersList.length) {
            rightArrowClasses += classes.disabled;
        }
    } else {
        content = 'Empty list';
        leftArrowClasses += classes.disabled;
        rightArrowClasses += classes.disabled;
    }


    return (
        <article className={classes['favourite-teachers']} id="favourites">
            <h1>Favourites</h1>
            <div className="favourite-teachers__container">
                <ul className={classes['favourite-teachers__scroll-list']}>
                    <span className={leftArrowClasses}
                                           onClick={leftSlideHandler}></span>
                        <span className={rightArrowClasses} onClick={rightSlideHandler}></span>
                    {content}
                </ul>
            </div>
        </article>
    );
};

export default FavoriteTeachers;
