import React from 'react';
import ReactDOM from 'react-dom';

class AddTask extends React.Component{
	
	submitHandler = () => {
		
		let task_obj = document.getElementById("add_task");
		
			if(task_obj.value === '')
			{
				alert("This field cannot be empty!");
			}
			else
			{
				
					fetch("http://localhost/uwi_internship/reactjs_task1/add_task.php?task=" + task_obj.value)
					.then( (response) => {
							
							if(response.status !== 200)
							{
								
								alert("An error occured");
								
								return;
	
							}
							
									this.props.update();
									
										alert("Item Saved!");
							}
						  )
						  .catch(function(err){  
							
							  alert("An error occured");
						  });
						  
		
			}
	}
	
	render(){
		return (	
		<form>
			<h2>Add Item</h2>
			<input type="text" id="add_task" />
			<button type="button" onClick={this.submitHandler}>Save</button>
		</form>
		);
		
	}
	
	
}

class Tasks extends React.Component{
	constructor(props){
		super(props);
		
		this.updateTask = this.updateTask.bind(this)
		this.deleteTask = this.deleteTask.bind(this)
		
		this.state = {tasks: []};
	}
	
	componentDidMount(){
		
		
		this.getTasks();
		
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
	
	updateTask = (index, task_id) => {
				
				let new_value = document.getElementById("task_" + index).value;
				
				fetch("http://localhost/uwi_internship/reactjs_task1/edit_task.php?task_id=" + task_id + "&change=" +  new_value)
				.then( (response) => {
					
						if(response.status !== 200)
						{
							alert("An error occured while updating the task");	
							
							return;
						}
						
							let array = this.state.tasks.map( function(item, i){
								
								if(i === index)
								{
									
									task_id = item.Task_ID
									item.Task = document.getElementById("task_" + index).value;
									
									return item;
								}
								else
								{
									return item
								}
							
							})
							
							this.setState({tasks : array});
						
							alert("Item Updated");
							
						})
						.catch(function(err){  
							
							  alert("An error occured");
						  });
						
			
					
		}
	
	deleteTask = (task_id) => {
		
			fetch("http://localhost/uwi_internship/reactjs_task1/delete_task.php?task_id=" + task_id)
			.then( (response) => {
					
						if(response.status !== 200)
						{
							alert("An error occured while deleting the task");
						
							return;
						}
					
							const u_tasks = this.state.tasks.map( (item, i) => {
								
								if(item !== undefined)
								{
									if(Number(item.Task_ID) !== Number(task_id))
									{
									
										return item
									}
								}
								
							
							})
							
							this.setState({tasks : u_tasks});
							
								alert("Item Deleted");	
					
					}
			)
			.catch(function(err){  
				
				  alert("An error occured");
			  });
				
	}
	
	
	onChangeHandler = (i) => {
		
			
				
	}
	
	render(){
		
		return(
				<div>
				<AddTask update = {this.getTasks} />
				<h2>Manage List</h2>
				
				{this.state.tasks.map( (item, i) => {  
					if(item !== undefined ) 
					{ 
						return <div className="task" key = {i}>
									<input type="text" onChange={() => this.onChangeHandler(i)} defaultValue = {item.Task} id = {"task_" + i} />
										<button onClick={() => this.updateTask(i, item.Task_ID)}>Save</button>
											<button onClick={() => this.deleteTask(item.Task_ID)}>Delete</button>
								</div> 
					}
					return false;
				})
					
				}
				
				<h2>To Do List</h2>
				<ShowTasks tasks={this.state.tasks} />
				</div>
				);
				
	}
		
	
	
}

class ShowTasks extends React.Component{
	
	render(){
	
		return(
			<div>
			{this.props.tasks.map(function (item, i){ 
				
				if(item !== undefined) 
				{
					return <div key = {i}>{item.Task}</div> 
				}
				
					return false;
				
				})
			}
			</div>
		);
		
	}
	
}


ReactDOM.render(<Tasks />, document.getElementById('root'));

