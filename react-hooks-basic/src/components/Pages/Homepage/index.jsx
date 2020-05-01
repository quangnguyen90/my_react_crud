import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import './Homepage.scss';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import PostList from './components/PostList';
import Pagination from './components/Pagination';
import PostFilterForm from './components/PostFilterForm';
import Clock from './components/Clock';
import BetterClock from './components/BetterClock';
import MagicBox from './components/MagicBox';

function Homepage() {
    const [todoList, setTodoList] = useState([
        { id: 1, title: 'I love Easy Frontend!' },
        { id: 2, title: 'We love Easy Frontend!' },
        { id: 3, title: 'They love Easy Frontend!' },
    ]);

    const [postList, setPostList] = useState([]);
    const [pagination, setPagination] = useState({
        _page: 1,
        _limit: 10,
        _totalRows: 1
    });

    const [filters, setFilters] = useState({
        _limit: 10,
        _page: 1,
        title_like: '',
        // _sort: ASC || DESC
        // _order: key
    });

    useEffect(() => {
        async function fetchPostList() {
            try {
                const paramString = queryString.stringify(filters);
                const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramString}`;
                const response = await fetch(requestUrl);
                const responseJSON = await response.json();
                console.log({ responseJSON });

                const { data, pagination } = responseJSON;
                setPostList(data);
                setPagination(pagination);
            } catch (error) {
                console.log('Fail to fetch post list ', error.nessage);
            }
        }

        fetchPostList();
    }, [filters]); // [] means run only 1 times

    useEffect(() => {
        console.log('yolo');
    });

    function handlePageChange(newPage) {
        setFilters({
            ...filters,
            _page: newPage,
        });
    }

    function hanldeTodoClick(todo) {
        const index = todoList.findIndex(x => x.id === todo.id);
        if (index < 0) return;
        const newTodoList = [...todoList];
        newTodoList.splice(index, 1);
        setTodoList(newTodoList);
    }

    function handleTodoFormSubmit(formValues) {
        // add new todo to current todo list
        const newTodo = {
            id: todoList.length + 1,
            ...formValues, // to get all value
        }
        const newTodoList = [...todoList];
        newTodoList.push(newTodo);
        setTodoList(newTodoList);
    }

    function handleFilterChange(newFilters) {
        console.log('New filter', newFilters);
        setFilters({
            ...filters,
            _page: 1,
            title_like: newFilters.searchTerm,
        });
    }

    const [showClock, setShowClock] = useState(true);
    return (
        <div className="app">
            <h1>React hook - Magic box</h1>
            <MagicBox />
            {/* <h1>React Hook - Clock</h1> */}
            {/* {showClock && <Clock />} */}
            {/* <BetterClock /> */}
            {/* <button onClick={() => setShowClock(false)}>Hide Clock</button> */}
            {/* <h1>React Hook - TodoList</h1> */}
            {/* <TodoForm onSubmit={handleTodoFormSubmit} /> */}
            {/* <TodoList todos={todoList} onTodoClick={hanldeTodoClick} /> */}
            {/* <h1>React Hook - PostList</h1>
      <PostFilterForm onSubmit={handleFilterChange} />
      <PostList posts={postList} />
      <Pagination
        pagination={pagination}
        onPageChange={handlePageChange}
      /> */}

        </div>
    );
}

export default Homepage;
