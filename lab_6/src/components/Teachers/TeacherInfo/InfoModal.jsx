import React from 'react';
import classes from "./InfoModal.module.scss";
import Button from "../../UI/Button/Button.jsx";
import Modal from "../../UI/Modal/Modal.jsx";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {daysUntilBirthday} from "../../../helpers/DateHelpers/calculateDaysToNextBirthday.js";

const InfoModal = ({teacher, onConfirm, onClose}) => {
    const {
        full_name, picture_Large,
        course, city,
        country, age,
        gender, email,
        phone, note,
        coordinates,b_date
    } = teacher;
    console.log(teacher)
    const position = [+coordinates.longitude, +coordinates.latitude];

    console.log(position)
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
                        <p>Days until next birthday: {daysUntilBirthday(b_date)}</p>
                        <a href={`mailto: ${email}`}><p>{email}</p></a>
                        <a href={`tel: ${phone}`}><p>{phone}</p></a>
                    </div>
                </header>
                <section>
                    <p>{note}</p>
                    {coordinates && <MapContainer className={classes.map} center={position} zoom={0.5}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                        <Marker position={position}>
                            <Popup>

                                Hi! I'm here👋
                            </Popup>
                        </Marker>
                    </MapContainer>
                    }
                </section>
                <Button id=" addFavorite__modalTeacher" onClick={() => {
                    onConfirm();
                    onClose();
                }}>Add to favorite</Button>
                <Button id=" close__modalTeacher" onClick={onClose}>Close</Button>

            </article>
        </Modal>

    );
};

export default InfoModal;
