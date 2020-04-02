import React from 'react';

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

export default ShowTasks;