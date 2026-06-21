// REACT
// Интерфейс состоит из КОМПОНЕНТОВ
// КОМПОНЕНТЫ пишутся на JSX

// REACT будет рендерить компоненты
// рендер бывает 2 типов
//  - первоначальный (монтирование) - первое отображение компоненты
//  - повторный (обновление) - перерисовка компонента после  изменения "реактивных данных" или после изменения его родителя

// Данные в компоненты бывают 2 видов:
//  - обычные
//  - реактивные, в зависимости от способа получения:
//      - пропы - произвольные значения, полученное от родителя. Должен иметь уникальное имя. Проп изменяется после обновления родителя.
//      - состояния - произвольные значение, выработанное внутри самого компонента

// СПУСК И ПОДЪЕМ
// Спуск - от родителя дочернему через пропы
// Подъем - передача от дочернего родительскому (сначала спустили функцию, потом функцию вызвали, чтобы она вверх вернула данные)

// Сборщик webpack, отладочный веб-сервер
// create-react-app - через npx
// npx create-react-app имя_проекта
// что будет лежать в созданном проекте ?
//  - public - папка со статическими файлами
//      -- index.html - единственная страница для фронтенда. В нем лежит div id="root"
//      -- favicon.ico
//      -- robots.txt - нужен для указания поисковых служб
//      -- manifest.json
//      -- и т.д.
//  - src - папка с исходным кодом, обрабатывается сборщиком webpack
//      -- index.js - стартовый модуль
//      -- index.css
//      -- App.js
//      -- App.css
//      -- App.test.js - тестовый модуль главного компонента
//      -- reportWebVitals.js - проверка производительности
//      -- setupTest.js - код запуска тестирования

// РАЗРАБОТКА КОМПОНЕНТОВ
// объявление КОМПОНЕНТОВ
// Компонент является обычной JS функцией, название с большой буквы
// Принимает {} с пропами, которые этому компоненту передаются родителями
// {} содержит свойства имена которых совпадают с именами пропов
// *** Если компонент гарантировано не передаются, {} можно не указывать
// Функция должна возвращать содержимое компонента (JSX в виде HTML с вкраплениями JS)

// Компонента Test, которая выводит заголовок и абзац из пропов и родителя
export default function Test({ hContent, pContent = "Если ничего не указали" }) {
    let x = ""
    
    function getH(hContent) {
        return <h1>{hContent}</h1>
    }
    return (
        <div className="boman">
            <h1>{getH (hContent)}</h1>
            <p>{pContent}</p>
        </div>
    )
}

// Пример использования:
import Test from "......"

export default function App() {
    return (
        <div>
            <Test hContent="Всем привет!" pContent="С вами я, Джокер Виктор Дудка" />
            <Test hContent="Всем пока!"/>
        </div>
    )
}


// Форматирование содержимого КОМПОНЕНТОВ
// Правила JSX
// 1) HTML-теги записываем как обычно в HTML
// 2) Все теги надо закрывать, даже одинарные
// <img /> - одиночный тег закрытый
// 3) HTML-теги вместо атрибутов содержат соответствующие этим атрибутам свойства в DOM
// вместо <img class="boman"/> пишу <img className="boman"/>
// 4) Для вставки результат выполнения JS кода надо писать { JS код }
// **** Если результатом будет null, true, false, undefined то вообще ничего не выведется.
// 5) Для сохранения результата выполнения JS в атрибут:
// <img src={ JS }/>
// 6) Любое JSX выражение может выдавать одно из трех:
//      1. Единственный тег:
        function SimpleImage({ src }) {
            return <img src={ src } /> // (можно без доп скобок и тп)
        }
//  **** Если содержимое сложнее, но тоже просто теги, то вкладываем их в общий тег:
        function AdvencedImage({ src, text }) {
            return (
                <div>
                    <img src={src}/>
                    <p>{text};</p>
                </div>
            )
        }
// 2. Фрагмент - нужен для объединения нескольких тегов в одну сузность (чтобы не оборачивать все в еще один тег в HTML). Сам Fragment не отобразится, он просто передаст данные
import { Fragment, use } from "react"
function AdvencedImage2({ src, text }) {
    return (
        <Fragment>
            <img src={src} />
            <p>{text}</p>
                </Fragment>
            )
}
        
// **** Можно встретить фрагменты без импортирования, они выглядят вот так:
function AdvencedImage3({ src, text }) {
    return (
        <>
            <img src={src} />
            <p>{text}</p>
                </>
            )
}
// 3. Массив тегов. Элементы массива нужно писать через запятую. У каждого элемента указывается уникальный ключ в атрибуте key. Ключом может быть все что угодно.
function AdvencedImage4({ src, text }) {
    return [
        <img key="el1" src={ src } />,
        <p key="el2">{text}</p>
    ]
}
// 7) Содержимое занимающее несколько строк в круглые скобки.

// указание встроенных стилей
// JSX указывает стили в виде ОБЪЕКТОВ, где свойство - свойство стиля в DOM, значение - значение
function SimpleImage2({ src }) {
    const objStyle = {
        margin: "20px",
        borderBottom: "1px solid black"
    }
    return <img src={src} style={objStyle} />
}

// Условный вывод:
// 1) Тернарный оператор из JS:
function TodoHeading({ todo }) {
    return (
        <div>
            <h2>{todo.name}</h2>
            <p>{todo.desc ? todo.desc : "Нет описания"}</p>
            { todo.done ? <p>Выполнено</p>: undefined }
        </div>
    )
}

// 2) Логическое И из JS:
function Todo2({ todo }) {
    return (
        <div>
            {/* покажу только done */}
            { todo.done && <p>Выполнено</p> }
        </div>
    )
}

// Вывод последовательностей
// 1) Для перебора использовать .map
function TodoList({ todos }) {
    return (
        <div>
            {todos.map(todo => {
                <div key={todo._id}>   // смотреть пункт 2 и 3
                    <h2>{todo.title}</h2>
                    <p>{todo.desc}</p>
            </div>
        })}
        </div>
    )
}
// 2) Каждый элемент должен выводится в отдельном теге
// 3) Каждому тегу их п.2 мы должны указывать ключ. Это надо для повторного рендера чтобы изменения реактивных данных понимало, какие элементы в HTML надо затрагивать, а какие нет


// Вывод потомков
<panel title="Современное приложение">
    <p>2 части:</p>
    <ol>
        <li>фронтенд</li>
        <li>Бэкенд</li>
    </ol>
</panel>

function Panel({ title, children }) {
    return (
        <div>
            <h6>{title}</h6>
            {children}
        </div>
    )
}


// Работа с состояниями компонентов
// Состояния это данные:
// 1) Данные, которые выводятся как есть на экран (перечень дел, например)
// 2) Данные, которые управляют отображением компонента (надо что то выводить или нет)

// Для создания состояния с начальным значением нужно использовать функцию useState
import { useState } from "react"

useFormState(начальноеЗначение)

// Ф-ция возвращает массив из 2 элементов:
// 1) Текущее значение
// 2) Ф-ция обновления значения состояния. Эта функция принимает либо новое значение, либо функцию...

export default function Counter() {
    const [cnt, setCnt] = useState(0);
    return (
        <div>
            <p>Количество кликов на кнопке: </p>
            <button onClick={() => {setCnt(++cnt)}}>Нажми на меня</button>
        </div>
    )
}

// Обработка событий. 2 шага:
// 1) Записать в теге элемента, на котором обрабатываем событие атрибут:
//      on<имя события, где каждое слово с большой буквы>
//      onKeyDown
// 2) Присвоить этому атрибуту обработчик в {}
// Там может быть функция объявленная внутри компонента либо обычная стрелочная функция
export default function Counter2() {
    const [cnt, setCnt] = useState(0);

    function handleButtonClick() {
        setCnt(++cnt)
    }
    return (
        <div>
            <p>Количество кликов на кнопке: {cnt}</p>
            <button onClick={handleButtonClick}>Нажми на меня</button>
        </div>
    )
}

// простота работы с элементами управления
export default function Sqrt() {
    const [val, setVal] = useState(2);

    return (
        <div>
            <input value={val} onChange={(event) => { setVal(event.target.value) }} />
            <p>{Math.sqrt(val)}</p>
        </div>
    )
}

// РЕФЫ - это ссылка на объект в DOM дереве, а этот объект - элемент содержимого компонента.
// Чтобы создать и использовать реф, надо:
// 1) Создать - userRef(undefined)
// 2) Связать реф с нужным элементом содержимого - записать элементу атрибут ref и присвоить туда наш реф
// 3) Для получения этого объекта - обратится к свойству current рефа

import { useRef } from "react"

function VideoPlayer({ src }) {
    const videoRef = useRef(undefined);

    return (
        <div>
            <video src={src} ref={videoRef}/>
            <button onClick={() => {videoRef.current.play()}}>Пуск</button>
            <button onClick={() => {videoRef.current.pause()}}>Пауза</button>
        </div>
    )
}

// реф можно использовать для хранения постоянного значения
const valueRef = useRef(123); // сохранил в valueRef ссылку на значение 123
// ... 
let val = valueRef.current; // 123
valueRef.current = 321; // обновили


// ХУКИ
// хук - механизм, позволяющий выполнить заданные действия в определенный момент, пока существует
// часто используется хук - useEffect
import { useEffect } from "react"

// useEffect(функция, ?массивЗависимостей)

function TodoList() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await fetch(url); // типа у нас есть url для запроса на бэк
            const json = await response.json();// типа получили json, в котором есть поле todos
            setTodos(json.todos);
        })();
    })
}

function TodoDetail({ id }) {
    const [todo, setTodo] = useState(undefined);

    useEffect(() => {
        (async () => {
            const response = await fetch(url + "/" + id);
            setTodo(await response.json())
        })()
    }, [id])
}

// еще один хук - useLayoutEffect
import { useLayoutEffect } from "react"

function Spoiler({ title, content }) {
    const [height, setHeight] = useState(0);
    const contentRef = useRef(undefined);

    useLayoutEffect(() => {
        const h = contentRef.current.getBoundingClientRect().height;
        setHeight(h)
    })

    return (
        <div>
            <h5> onClick={() => {
                // обработчик клика
            }}{title}</h5>
            <div ref={contentRef} style={{ height: height}}>
                {content}
            </div>
        </div>
    )
}

// СТИЛИ
// 1) Стили можно закинуть в index.css - обычно тут хранится общее оформление всего фронтенда
// 2) в таблицах стилей отдельных компонентов



// КОНТЕКСТ - используем, когда пропы по цепочке долго передавать и хочется быстрее
// у контекса есть значение называемое НАГРУЗКА
// ПРОВАЙДЕР КОНТЕКСТА - компонент, который задаёт значение нагрузки
// Когда изменится нагрузка, все компоненты, которые использует этот контекст перерисуются

// 1) Создать контекст в родительском компоненте
import { createContext } from "react"

const TokenContext = createContext(undefined);

export { TokenContext }

// 2) Обернуть потомков в провайдер
function App() {
    const [token, setToken] = useState(undefined);

    return (
        <TokenContext.Provider value={token}>
            <TodoList />
        </TokenContext.Provider>
    )
}


// 3) получить нагрузку в компоненте(потомке)

import { useContext } from "react"
import { TokenContext } from "./App.js";

function TodoList() {
    const token = useContext(TokenContext);   
}


// МАРШРУТИЗАТОР - получает у браузера URL и передает коммутатору
import { BrowserRouter } from 'react-router-dom'

function App() {
    return (
        <BrowserRouter>
            {/* Тут все остальное */}
        </BrowserRouter>
    )
}

// КОММУТАТОР - хранит все маршруты и при выполнении навигации ищет маршрут и выводит нужный компонент
import { Routes } from "react-router-dom"

function App() {
    return (
        <BrowserRouter>
            {/* Все остальное, например, навигация nav */}
            <Routes>
                {/* тут будут лежать маршруты */}
            </Routes>
            <p className="copyright">Все права и тд</p>
        </BrowserRouter>
    )
}

// МАРШРУТЫ - связывает шаблонный путь с компонентом
import { Route } from "react-router-dom"

// У Route есть 3 важных пропа:
// 1) path - шаблонный путь в виде строки. Слеш в начале, но не в конце
// Он может содержать URL - параметр :параметр

<BrowserRouter>
            {/* Все остальное, например, навигация nav */}
            <Routes>
                <Route path="/"/> {/* это только пример path пропа */}
                <Route path="/add"/>
                <Route path="/:id"/>
            </Routes>

            <p className="copyright">Все права и тд</p>
</BrowserRouter>
        
// путь может содержать литералы:
// фрагмент? - заданный фрагмент является не обязательным:
// /todo?/add
// /* - совпадает с любой последовательностью символов:
// /add/* - /add, /add/todo, /add/new/todo

// 2) element - целевое содержимое
function App() {
    return (
        <BrowserRouter>
            {/* Все остальное */}

            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/add" element {
                <div>
                    <h1>Доб дел</h1>
                    <TodoAdd/>
                </div>
                }/>
            </Routes>
        </BrowserRouter>
    )
}


// 3) caseSensitive - true/(false) - учитывать ли регистр при сравнении пути
// /add /aDD 

// Есть два вида гиперссылок в React Router:
// Простые гиперссылки
import { Link } from "react-router-dom"

function App() {
    return (
        <>
            <Link to="/add">Добавить дело</Link>
            <Link to={`/${todo._id}`} state={todo}>{todo.title}</Link> {/* state - доп контент для целевого компонента */}
        </>
    )
}

// какие еще есть пропы:
// replace = true/(false) - заменить ли в истории браузера (если да, то кнопка назад работать не будет)
// preventScrollReset - true/(false) - надо ли остаться на той же позиции скролла браузера
// reloadDocument - true/(false) - использовать ли как обычную <a></a>, т.е. с загрузкой данных с сервера

// Расширенная гиперссылка
import { NavLink } from "react-router-dom"

// нужен для отслеживания, открыта ли эта ссылка сейчас


// ПЕРЕНАПРАВЛЕНИЕ

import { Navigate } from "react-router-dom"

return (
    <>
        {token && <Navigate to="/" />}

        {!token && <>
            <h1>Вход</h1>
            ...
        </>}
    </>
)

// Если надо в JS коде перенаправить используется специальный хук:
import { useNavigate } from "react-router-dom"

const redirect = useNavigate();

async function handleFormSubmit(event) {
    // ...
    const response = await fetch("...")
    if (response.ok) redirect("/")
}

// Получение URL-ПАРАМЕТРА
import { useParams } from "react-router-dom"

// /todos/:id/setName/:name
const { id } = useParams();

// Получить доп значение (STATE)
import { useLocation } from "react-router-dom"

const { state } = useLocation();

// Какие маршруты сейчас создадим
// / - будет выводить
// /:id - экран сведения об определенном деле
// /login = экран входа
// /add - экран создания нового дела
// /register - экран регистрации
