import React from 'react';
import ReactDOM from 'react-dom';

import AddTask from './add_task.js';
import ManageTasks from './manage_tasks.js';
import ShowTasks from './show_tasks.js';

class Main extends React.Component{

	constructor(props){
		super(props)
		
		this.state = {tasks: []};
		
	}
	
	componentDidMount(){
		
		
		this.getTasks();
		
	}
	
	
	setTasks = (updated_tasks) => {
		
		
		this.setState({tasks: updated_tasks});
		
	}
	
	
	
	getTasks = () => {
		
		fetch("http://localhost/uwi_internship/reactjs_task1/get_tasks.php")
		.then( (response) => {
			
			if(response.status !== 200)
			{
				
				alert("An error occured while getting tasks");
				
				return;
			}
			
			response.json().then( (data) => {
				let tasks = data;
					this.setState({tasks: tasks});
			});
		}
		)
		.catch(function(err){  
			
			  alert("An error occured");
		  });
		
	}
	
render(){
		
		return(
				<div>
				<AddTask update = {this.getTasks} />
				<h2>Manage List</h2>
				
				<ManageTasks tasks= {this.state.tasks} set_tasks = {this.setTasks}/> 
				
				<h2>To Do List</h2>
				<ShowTasks tasks={this.state.tasks} />
				</div>
				);
				
	}
	
}






ReactDOM.render(<Main />, document.getElementById('root'));

