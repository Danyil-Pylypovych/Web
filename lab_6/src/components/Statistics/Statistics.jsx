import React, {useContext, useEffect, useState} from 'react';
import classes from './Statistics.module.scss';
import TeacherContext from "../../store/TeacherContext/teacher-context.jsx";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Pie} from 'react-chartjs-2';
import _ from "lodash";

const Statistics = () => {
    ChartJS.register(ArcElement, Tooltip, Legend);

    const teacherCtx = useContext(TeacherContext);
    const teacherStatistics = teacherCtx.teachersList;
    const [sortParameter, setSortParameter] = useState(undefined);
    const [ASC_DESC, setASC_DESC] = useState(false);
    const [sortedTeacherList, setSortedTeacherList] = useState([]);

    useEffect(() => {
        let newTeacherList = [...teacherStatistics];
        if (sortParameter) {
            newTeacherList = sortTeacherList(
                newTeacherList,
                sortParameter,
                ASC_DESC,
            );
        }
        setSortedTeacherList(newTeacherList);
    }, [sortParameter, ASC_DESC, teacherStatistics]);

    const sortTeacherList = (list, sortParam, isASC = true,) => {

        let ascDesc = isASC ? 'asc' : 'desc';

        if (sortParam) {
            return _.orderBy(list, [sortParam], [ascDesc]);
        }
        return list;
    };

    const getCoursesData = () => {
        const courses = teacherStatistics.reduce((acc, current) => {
            if (current.courseList in acc) {
                acc[current.courseList] += 1;
            } else {
                acc[current.courseList] = 1;
            }
            return acc;
        }, {})
        return courses
    }
    const generateRgbaArray = (length, alpha) => {
        let rgbaArray = [];
        for (let i = 0; i < length; i++) {
            let r = Math.floor(Math.random() * 256);
            let g = Math.floor(Math.random() * 256);
            let b = Math.floor(Math.random() * 256);
            let rgba = 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
            rgbaArray.push(rgba);
        }
        return rgbaArray;
    };

    const data = {
        labels: Object.keys(getCoursesData()),
        datasets: [
            {
                label: '# of Teachers',
                data: Object.values(getCoursesData()),
                backgroundColor: generateRgbaArray(Object.keys(getCoursesData()).length, 0.2),
                borderColor: generateRgbaArray(Object.keys(getCoursesData()).length, 1),
                borderWidth: .5,
            },
        ],
    };

    return (
        <React.Fragment>
            <article className={classes.statistics}>
                <h1>Statistics</h1>
                {teacherStatistics.length!==0 ? <div>
                    <Pie data={data} width={"500px"} height={"500px"} options={{maintainAspectRatio: false}}/>
                </div> : <p >We can`t display statistics with empty teacher list. Sorry</p>}
            </article>
        </React.Fragment>
    );
};
export default Statistics;
