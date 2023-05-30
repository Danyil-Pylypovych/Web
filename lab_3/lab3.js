import { randomUserMock } from "./FE4U-Lab3-mock.js";
import { additionalUsers } from "./FE4U-Lab3-mock.js";


function Task1()
{
    let course = [ "Mathematics", "Physics", "English",
                    "Computer Science", "Dancing", "Chess",
                    "Biology", "Chemistry", "Law", 
                    "Art", "Medicine", "Statistics" ];
    
    let users = [];
    let id = 0;
    randomUserMock.forEach((currentUser) => {
        let user = {};

        user["id"]                  = id++;
        user["favorite"]            = false;
        user["course"]              = course[Math.floor(Math.random() * course.length)];
        user["bg_color"]            = "#FFFFFF";
        user["note"]                = "Notes for you!"
        user["gender"]              = currentUser.gender;
        user["title"]               = currentUser.name.title;
        user["full_name"]           = currentUser.name.first.concat(" ", currentUser.name.last);
        user["city"]                = currentUser.location.city;
        user["state"]               = currentUser.location.state;
        user["country"]             = currentUser.location.country;
        user["postcode"]            = currentUser.location.postcode;
        
        let coordinates = {};
        coordinates["latitude"]     = currentUser.location.coordinates.latitude;
        coordinates["longitude"]    = currentUser.location.coordinates.longitude;
        user["coordinates"]         = coordinates;

        let timezone = {};
        timezone["offset"]          = currentUser.location.timezone.offset;
        timezone["description"]     = currentUser.location.timezone.description;
        user["timezone"]            = timezone;
        user["email"]               = currentUser.email;
        user["b_date"]              = currentUser.dob.date;
        user["age"]                 = currentUser.dob.age;
        user["phone"]               = currentUser.phone;
        user["picture_large"]       = currentUser.picture.large;
        user["picture_thumbnail"]   = currentUser.picture.thumbnail;

        let congruence = additionalUsers.find((addUser) => {
            return user["full_name"] == addUser.full_name;
        });

        if(congruence != undefined)
        {
            user["id"]              = congruence.id;
            user["favorite"]        = congruence.favorite;
            user["course"]          = congruence.course;
            user["bg_color"]        = congruence.bg_color;
            user["note"]            = congruence.note;
        }

        users.push(user); 
    });

    return users;
}

function testUppercase(word)
{
    if (word == null || word == undefined)
    {
        return false;
    } 
    return /^[A-Z\p{Lu}]/u.test(word);
}

function Task2(user)
{
    let firstname    = user["full_name"].split(' ')[0];
    let surname = user["full_name"].split(' ')[1];

    let auditName       = testUppercase(firstname) && testUppercase(surname);
    let auditGender     = testUppercase(user["gender"]);
    let auditNote       = testUppercase(user["note"]);
    let auditState      = testUppercase(user["state"]);
    let auditCity       = testUppercase(user["city"]);
    let auditCountry    = testUppercase(user["country"]);

    if(!auditName || !auditGender || !auditNote || !auditState || !auditCity || !auditCountry)
    {
        return false;
    }

    if(isNaN(user["age"]))
    {
        return false;
    }

    let phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if(!phoneRegex.test(user["phone"]))
    {
        return false;
    }

    let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if(!emailRegex.test(user["email"]))
    {
        return false;
    }

    return true;
}

function Task3(users, country, age, gender, favorite)
{
    if(!Array.isArray(users)) 
    {
        return undefined;
    }

    let filtrated = [];
    users.forEach((user) => {
        let isMatch = user["country"] == country 
                    && user["age"] == age 
                    && user["gender"] == gender 
                    && user["favorite"] == favorite;
        if(isMatch) filtrated.push(user);
    });

    return filtrated;
}

function Task4(users, isDescending, fieldName = "full_name")
{
    let avalibleFields = ["full_name", "age", "b_date", "country"];

    if(!Array.isArray(users) || !avalibleFields.includes(fieldName))
    {
        return undefined;
    } 

    let more = isDescending ? -1 : 1;
    let less = isDescending ? 1 : -1;

    let sorted = users.slice();
    sorted.sort((user1, user2) => {
        if(user1[fieldName] > user2[fieldName])
        {
            return more;
        }
        if(user1[fieldName] < user2[fieldName])
        {
            return less;
        }
    });

    return sorted;
}

function Task5(users, fieldName, value)
{
    let avalibleFields = ["full_name", "note", "age"];

    if(!Array.isArray(users) || !avalibleFields.includes(fieldName)) 
    {
        return undefined;
    }

    let found = equalsTo(users, fieldName, value);
    return found;
}

function moreThan(array, fieldName, comparationValue) 
{
    if(!Array.isArray(array)) 
    {
        return undefined;
    }
    return array.filter((value) => value[fieldName] > comparationValue);
}

function equalsTo(array, fieldName, comparationValue)
{
    if(!Array.isArray(array)) 
    {
        return undefined;
    }
    return array.filter((value) => value[fieldName] == comparationValue);
}

function findFragmentText(array, fieldName, possibleAppearance)
{
    if(!Array.isArray(array)) 
    {
        return undefined;
    }
    return array.filter((value) => value[fieldName].toLowerCase().includes(possibleAppearance.toLowerCase()));
}

function Task6(users, fieldName, value, comparator)
{
    if(!Array.isArray(users)) 
    {
        return undefined;
    }

    let avalibleFields = Object.keys(users[0]);
    if(!avalibleFields.includes(fieldName)) 
    {
        return undefined;
    }
    let filtrated = comparator(users, fieldName, value);

    return filtrated.length / users.length * 100;
}

console.log("Task_1");
let listUsers = Task1();
console.log(listUsers);

console.log("----------------------------------");
console.log("Task_2");
listUsers.forEach((user) => {
    console.log(Task2(user));
});

console.log("----------------------------------");
console.log("Task_3");
let filtratedUsers = Task3(listUsers, "France", 70, "male", false);
console.log(filtratedUsers);

console.log("----------------------------------");
console.log("Task_4");
let sortedField1 = Task4(listUsers, true, "age");
sortedField1.forEach((user) => {
    console.log(`${user["full_name"]}, Age: ${user["age"]}`);
});

console.log("----------------------------------");

let sortedField2 = Task4(listUsers, false, "age");
sortedField2.forEach((user) => {
    console.log(`${user["full_name"]}, Age: ${user["age"]}`);
});

console.log("----------------------------------");
console.log("Task_5");
let found = Task5(listUsers, "age", 58);
console.log(found);
let found2 = Task5(listUsers, "full_name", "Curtis Mendoza");
console.log(found2);

console.log("----------------------------------");
console.log("Task_6");

let percent = Task6(listUsers, "age", 66, moreThan);
console.log(`Older persons than 66: ${percent}%`);

let fragmentText = "d";
percent = Task6(listUsers, "full_name", fragmentText, findFragmentText);
console.log(`'${fragmentText}' does appear in user names in: ${percent}%`);