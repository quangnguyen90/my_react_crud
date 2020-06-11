console.log(window.Redux);
const { createStore } = window.Redux;

// I. SETUP REDUX STORE
// state
// reducer
// store

//----------------------------------------------------------

// Step 1: Create initial state
const initialSate = JSON.parse(localStorage.getItem('hobby_list')) || [];

// Step 2: Create reducer
const hobbyReducer = (state = initialSate, action) => {
    //Redux-flow-4: reducer return updated state
    switch (action.type) {
        case 'ADD_HOBBY': {
            const newList = [...state];
            newList.push(action.payload);
            return newList;
        }
        default:
            return state;
    }
}

// Step 3: Create store
const store = createStore(hobbyReducer);

//----------------------------------------------------------

// II. RENDER REDUX HOBBY LIST
// Step 4: create function to get data from initial state
// get redux hobby list
const renderHobbyList = (hobbyList) => {
    if (!Array.isArray(hobbyList) || hobbyList.length === 0) return;

    const ulElement = document.querySelector('#hobbyListId');
    if (!ulElement) return;

    // reset previous content of ul
    ulElement.innerHTML = '';

    for (const hobby of hobbyList) {
        const liElement = document.createElement('li');
        liElement.textContent = hobby;

        ulElement.appendChild(liElement);
    }
}

//----------------------------------------------------------

// III. RENDER INITIAL HOBBY LIST
// Step 5: render data
const initialHobbyList = store.getState();
renderHobbyList(initialHobbyList);

//----------------------------------------------------------

// IV. HANDLE FORM SUBMIT
// Step 6: create function to handle ACTION submit
//Redux-flow-1: handle form submit
const hobbyFormElement = document.querySelector('#hobbyForm');
if (hobbyFormElement) {
    const handleFormSubmit = (e) => {
        // prevent browser form reloading
        e.preventDefault();
        const hobbyTextElement = hobbyFormElement.querySelector('#hobbyText');
        if (!hobbyTextElement) return;
        //Redux-flow-2: declare action with type & data 
        const action = {
            type: 'ADD_HOBBY',
            payload: hobbyTextElement.value
        }
        //Redux-flow-3: dispatch action to store
        store.dispatch(action);

        //reset form
        hobbyFormElement.reset();
    }

    hobbyFormElement.addEventListener('submit', handleFormSubmit);
}

//----------------------------------------------------------

// Step 7: render updated list
// Redux-flow-5: store return udpated state & render UI
store.subscribe(() => {
    const newHobbyList = store.getState();
    renderHobbyList(newHobbyList);

    localStorage.setItem('hobby_list', JSON.stringify(newHobbyList));
});