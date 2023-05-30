import React, {useContext} from 'react';
import classes from './Header.module.scss';
import Navbar from "../Navigation/Navbar.jsx";
import Button from "../../UI/Button/Button.jsx";
import Input from "../../UI/Input/Input.jsx";
import Logo from "../../../assets/img.png";
import TeacherContext from "../../../store/TeacherContext/teacher-context.jsx";

const Header = () => {
    const teacherCtx = useContext(TeacherContext);

    const enteredValue = teacherCtx.searchValue;
    const inputHandler = (event)=>{
        teacherCtx.searchHandler(event.target.value);
    }


    return (
        <header className={classes.header}>
            <div className={classes.header__body}>
                <h1>Teachinder</h1>
                <div className={classes.header__search}>
                    <Input
                        type="text"
                        placeholder="Name,note or age to search"
                        value={enteredValue}
                        onChange={inputHandler}/>
                    <Button>Search</Button>
                </div>
            </div>
            <Navbar/>
        </header>
    );
};

export default Header;
