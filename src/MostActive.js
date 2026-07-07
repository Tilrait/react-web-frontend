import { useContext, useState, useEffect } from "react";
import { TokenContext, baseURL } from "./utility";

export default function MostActive() {
    const [stats, setStats] = useState({
        usersCount: 0,
        todosCount: 0,
        mostActiveAll: [],
        mostActiveDone: []
    });

    useEffect(() => {
        (async () => {
            const response = await fetch(`${baseURL}/mostactive`);
            if (response.ok) setStats(await response.json());
            else window.alert(response.status + ': ' + response.statusText);
        })();
    }, []);

    return (
        <>
            <h1>Информация о пользователях</h1>

            <h2>Сколько всего пользователей: {stats.usersCount}</h2>

            <h2>Сколько всего дел: {stats.todosCount}</h2>

            {stats.mostActiveAll[0] &&
                <>
                    <h2>Больше всего дел у пользователей:</h2>
                    <ul>
                        {stats.mostActiveAll.map((person) => (
                            <li key={person._id}>
                                {person._id}: {person.cnt}
                            </li>
                        ))}

                    </ul>
                </>}

            {stats.mostActiveDone[0] &&
                <>
                    <h2>Больше всего выполненных дел у пользователей:</h2>
                    <ul>
                        {stats.mostActiveDone.map((person) => (
                            <li key={person._id}>
                                {person._id}: {person.cnt}
                            </li>
                        ))}
                    </ul>
                </>}
        </>
    )
}