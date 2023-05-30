import './App.css'

import Container from "./components/Layout/Container/Container.jsx";
import Header from "./components/Layout/Header/Header.jsx";
import Main from "./components/Layout/Main/Main.jsx";
import TopTeachers from "./components/Teachers/TopTeachers/TopTeachers.jsx";
import Statistics from "./components/Statistics/Statistics.jsx";
import FavoriteTeachers from "./components/Teachers/FavoriteTeachers/FavoriteTeachers.jsx";
import Footer from "./components/Layout/Footer/Footer.jsx";
import  {TeacherProvider} from "./store/TeacherContext/teacher-context.jsx";

function App() {
    return (
        <Container>
            <TeacherProvider>
                <Header/>
                <Main>
                    <TopTeachers/>
                    <Statistics/>
                    <FavoriteTeachers/>
                </Main>
                <Footer/>
            </TeacherProvider>
        </Container>
    )
}

export default App
