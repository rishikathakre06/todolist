// console.log("hello world!");

// const state ={
//     taskList:[
//         {
//         image:"",
//         title:"",
//         type:"",
//         description:"",
//         },
//         {
//             image:"",
//             title:"",
//             type:"",
//             description:"",
//             },
//             {
//                 image:"",
//                 title:"",
//                 type:"",
//                 description:"",
//                 },
//                 {
//                     image:"",
//                     title:"",
//                     type:"",
//                     description:"",
//                     },
//     ]
// }


const state = {
    tasklist: [],
};

//DOM
const taskContents = document.querySelector(".task_contents");
const taskModal = document.querySelector(".task__modal__body");

// console.log(taskContents);
// console.log(taskModal)

const htmlTaskContent =({ url, title, type, description, id }) =>
   `<div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
 <div class="card shadow-sm task__card">
    <div class="card-header d-flex justify-content-end task__card__header">
        <button type="button" class="btn btn-outline-primary mr-2" name=${ id }  >
            <i class="fas fa-pencil-alt" name = ${ id } ></i> 
            </button>
        <button type="button" class="btn btn-outline-danger mr-2" name=${ id } >
            <i class="fas fa-trash-alt" name = ${ id } ></i>
        </button>
    </div>
    <div class="card-body">
       ${
            url ?
         `<img width="100%" src=${ url } alt="card image top" class="card-img-top md-3 rounded-lg" />`:
         `<img width="100%" src="https://www.google.com/imgres?q=default%20image%20placeholder&imgurl=https%3A%2F%2Fimg.freepik.com%2Fpremium-vector%2Fdefault-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg&imgrefurl=https%3A%2F%2Fwww.freepik.com%2Fpremium-vector%2Fdefault-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_33011701.htm&docid=tdI57J_9_vvsOM&tbnid=cmONzJaEjGDkSM&vet=12ahUKEwj5o9WRvdiFAxXoSGcHHdjOBCYQM3oECFEQAA..i&w=626&h=470&hcb=2&ved=2ahUKEwj5o9WRvdiFAxXoSGcHHdjOBCYQM3oECFEQAA"alt="card image top" class="card-img-top md-3 rounded-lg" />`
        }
        <h4 class="card-title task__card__title">${title}</h4>
        <p class="description card-text trim-3-lines text-muted">${description}</p>
        <div class="tags text-white d-flex flex-wrap">
            <span class="badge bg-primary m-1">${type}</span>
        </div>
    </div>
    <div class="card-footer">
        <button class="btn btn-outline-primary float-right" data-bs-toggle="modal" data-bs-target="#showTask" id=${id} onclick=>open task</button>
    </div>
 </div>
 </div>
 `
const htmlModalContent = ({id,title,url,description}) =>{
    const data  =new Date(parseInt(id));
    return `
    <div id = ${ id }>
     ${
        url ?
    `<img width="100%" src="${url}" alt="card image top" class="img-fluid place__holder__image md-3 rounded-lg"/>`:
    `<img width="100%" src="https://www.google.com/imgres?q=default%20image%20placeholder&imgurl=https%3A%2F%2Fimg.freepik.com%2Fpremium-vector%2Fdefault-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg&imgrefurl=https%3A%2F%2Fwww.freepik.com%2Fpremium-vector%2Fdefault-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_33011701.htm&docid=tdI57J_9_vvsOM&tbnid=cmONzJaEjGDkSM&vet=12ahUKEwj5o9WRvdiFAxXoSGcHHdjOBCYQM3oECFEQAA..i&w=626&h=470&hcb=2&ved=2ahUKEwj5o9WRvdiFAxXoSGcHHdjOBCYQM3oECFEQAA"alt="card image top" class="card-img-top md-3 rounded-lg" />`
    
    }
     <strong > Created on: ${date.toDateString() } </strong>
    <h2 class="my-3">${title}</h2>
    <p class="lead">${description}
    </p>
        </div>
  `
}


const updateLocalStorage = () => {
    localStorage.setItem("task",JSON.stringify({
        tasks:state.taskList,
    }))
}

const localInitialData = () =>{
    const localStorageCopy = JSON.parse(localStorage.task)

    if(localStorageCopy) state.taskList = localStorageCopy.tasks;

    state.taskList.map((cardDate) => {
        taskContents.insertAdjacentHTML("beforeend",htmlTaskContent(cardDate))
    })
}

const handleSubmit = (event) => {
    const id = `${Date.now()}`;
    const input ={
        url: document.getElementById('imageurl').value,
        title: document.getElementById('tasktitle').value,
        description: document.getElementById('taskdescription').value,
        type: document.getElementById('tags').value, 
    };
    
    if(input.title === "" || input.description === "" || input.type === ""){
        return alert("please fill all required field :-( ");
    }
    taskContents.insertAdjacentHTML
    {"beforeend",htmlTaskContent({
        ...input,
        id
    })}

    state.taskList.push({...input,id});
    updateLocalStorage();
}




