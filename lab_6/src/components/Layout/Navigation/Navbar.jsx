import React, {useState} from 'react';
import classes from './Navbar.module.scss';
import Button from "../../UI/Button/Button.jsx";
import CreateTeacherForm from "../../Teachers/CreateTeacher/CreateTeacherForm.jsx";
const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModalHandler = ()=>{
        setIsModalOpen(prevState => !prevState);
    }
    return (
        <nav className={classes.navbar}>
            <ul>
                <li><a href="#top-teachers">Teachers</a></li>
                <li><a href="#statistics">Statistics</a></li>
                <li><a href="#favourites">Favorites</a></li>
                <li><a href="#about">About</a></li>
            </ul>
            <div className="navbar__action">
                <Button onClick={showModalHandler}>Add teacher</Button>
            </div>
            {isModalOpen && <CreateTeacherForm onClose={showModalHandler}/>}
        </nav>
    );
};

export default Navbar;
