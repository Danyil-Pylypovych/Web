import React, {useContext, useState} from 'react';
import classes from './TeacherCard.module.scss';
import Button from "../../UI/Button/Button.jsx";
import Modal from "../TeacherInfo/InfoModal.jsx";
import {FAVOURITE_TEACHERS} from "../../../constants/constants.js";
import TeacherContext from "../../../store/TeacherContext/teacher-context.jsx";
import InfoModal from "../TeacherInfo/InfoModal.jsx";

const TeacherCard = (props) => {
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const {full_name, picture_Large, favorite} = props.teacherData;
    const modalHandler = () => {
        setIsVisibleModal(prevState => !prevState);
    };

    const teacherCtx = useContext(TeacherContext);
    return (

        <li className={classes['min-teacher-card']}>
            <div className={classes['min-teacher-img__container']}>

                {picture_Large &&
                    <img className={classes['min-teacher-card__img']} src={picture_Large} alt="teacher face"/>}
                {!picture_Large && <p>{1}</p>}

            </div>
            <div className={classes['min-teacher-card__body']}>
                <div>
                    <p>{full_name}</p>
                </div>
                <div className={classes['min-teacher-card__actions']}>
                    <Button onClick={modalHandler}>More info</Button>
                </div>
            </div>

            {props.renderStar && favorite && <span>&#128970;</span>}
            {isVisibleModal && <InfoModal
                teacher={props.teacherData}
                onClose={modalHandler}
                onConfirm={teacherCtx.addToFavorite.bind(null, props.teacherData)}
            />}
        </li>
    );
};

export default TeacherCard;
