import React from 'react';

class ManageTasks extends React.Component{
	constructor(props){
		super(props);	
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
						
							let array = this.props.tasks.map( function(item, i){
								
								if(i === index)
								{
							
									item.Task = document.getElementById("task_" + index).value;
									
									return item;
								}
								else
								{
									return item
								}
							
							})
							
							this.props.set_tasks(array);
						
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
					
							const u_tasks = this.props.tasks.map( (item, i) => {
								
								if(item !== undefined)
								{
									if(Number(item.Task_ID) !== Number(task_id))
									{
									
										return item
									}
								}
								
							
							})
							
							this.props.set_tasks(u_tasks);
							
								alert("Item Deleted");	
					
					}
			)
			.catch(function(err){  
				
				  alert(err);
			  });
				
	}
	
	
	onChangeHandler = (i) => {
		
			
				
	}
	
	render(){
		
		return(<div>
				{this.props.tasks.map( (item, i) => {  
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
				</div>
				);
				
	}
		
	
	
}

export default ManageTasks;