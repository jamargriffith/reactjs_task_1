import React from 'react';


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

export default AddTask;