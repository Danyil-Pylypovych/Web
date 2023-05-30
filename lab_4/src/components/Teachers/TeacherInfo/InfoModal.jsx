import React from 'react';
import classes from "./InfoModal.module.scss";
import Button from "../../UI/Button/Button.jsx";
import Modal from "../../UI/Modal/Modal.jsx";

const InfoModal = ({teacher, onConfirm, onClose}) => {
    const {full_name, picture_Large, course, city, country, age, gender, email, phone,note} = teacher;
    return (
        <Modal headerText={full_name}>
            <article className={classes['full-teacher-card']}>
                <header className={classes['full-teacher-card__header']}>
                    <div className={classes['teacher-card__img']}>
                        <img src={picture_Large} alt="Photo with teacher face"/>
                    </div>
                    <div className={classes['teacher-card__info']}>
                        <h1>{full_name}</h1>
                        <h2>{course}</h2>
                        <p>{city}, {country}</p>
                        <p>{age}, {gender}</p>
                        <a href={`mailto: ${email}`}><p>{email}</p></a>
                        <a href={`tel: ${phone}`}><p>{phone}</p></a>
                    </div>
                </header>
                <section>
                    <p>{note}
                    </p>
                    <a href="#">toggle map</a>

                </section>
                <Button id="addFavorite__modalTeacher" onClick={() => {
                    onConfirm();
                    onClose();
                }}>Add to favorite</Button>
                <Button id="close__modalTeacher" onClick={onClose}>Close</Button>

            </article>
        </Modal>

    );
};

export default InfoModal;
