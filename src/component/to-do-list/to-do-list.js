import React, { createRef } from "react";


export class ToDoList extends React.Component{

    itemList = [];
    inputRef = React.createRef();
    getLocalStorage;
    isButtonActive = false;

    constructor(){  
        super();
    }

    componentDidMount() {
        this.itemList = JSON.parse(localStorage.getItem("New Todo"));
        this.itemList = [];
        this.setState(this.itemList);
        this.onInputChange(this.inputRef);
    }
    onInputChange(inputRef){
        if(inputRef.current.value.length > 0){
            this.isButtonActive = true;
        }
        else{
            this.isButtonActive = false;
        }

        this.setState({
            isButtonActive: this.isButtonActive
        });
        
    }
    showTasks(){
        this.itemList =JSON.parse(this.getLocalStorage);
        this.setState(this.itemList);
    };
    
    pushItemInList(inputRef){
        this.isButtonActive = false;
        this.setState({
            isButtonActive: this.isButtonActive
        })
        this.itemList.push(inputRef.current.value);
        localStorage.setItem("New Todo",JSON.stringify(this.itemList)); //transforming js object into a json string
        this.setState(this.itemList);
        inputRef.current.value = "";
    }    
    deleteTask(index){        
        this.itemList.splice(index,1);
        localStorage.setItem("New Todo",JSON.stringify(this.itemList)); //transforming js object into a json string
        this.setState(this.itemList);
    }
    deleteAllTasks(){
        this.itemList = [];
        localStorage.setItem("New Todo",JSON.stringify(this.itemList)); //transforming js object into a json string
        this.setState(this.itemList);   
    }
    
    render(){
        return(
            <div>
                <div className="wrapper">
                    <header>Todo App</header>
                    <div className="inputField">
                        <input type="text" ref={this.inputRef} placeholder="Add your new todo" onChange={() => { this.onInputChange(this.inputRef)}} />
                        <button onClick={this.pushItemInList.bind(this,this.inputRef)} className={`${this.isButtonActive ? 'active':'null'}`}><i className="fas fa-plus"></i></button>
                    </div>
                   <ul className="todoList">
                        {this.checkIfListIsEmpty()}  
                    </ul>
                    <div className="footer">
                        <span>you have {this.itemList ? this.itemList.length : 0} pending task</span>
                        <button className={`${this.itemList ? this.itemList.length == 0 ? 'null' : 'active' : 'none'}`} onClick ={()=>this.deleteAllTasks()} >clear all</button>
                        
                    </div>
                </div>
            </div>
        )
    }

    checkIfListIsEmpty(){
        if(this.itemList){
            return(
             this.itemList.map((item,index) => {
                 return (                     
                     <li key={index}>{item}<span onClick ={()=>this.deleteTask(index)}><i className="fas fa-trash"></i></span></li>
                     )
                 })
            )
        }
    }
}   
