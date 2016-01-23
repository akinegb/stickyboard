window.onload = function(){

	var Note = React.createClass({
		edit: function(){
			this.setState({editing: true});
		},
		save: function(){
			this.props.onChange(this.refs.newText.value, this.props.index);
			this.setState({editing: false});
		},
		remove: function(){
			this.props.onRemove(this.props.index);
		},
		getInitialState: function(){
			return {checked: false}
		},
		handleCheck: function(){
			this.setState({checked: !this.state.checked});
		},
		renderDisplay: function(){
			return (
				<div className="note">
					<h2>{this.props.children}</h2>
					<span>
						<button onClick={this.edit} className="btn btn-primary glyphicon glyphicon-pencil"/>
						<button onClick={this.remove} className="btn btn-primary glyphicon glyphicon-trash"/>
					</span>
				</div>
			);
		},
		renderForm: function(){
			return (
				<div className="note">
					<textarea ref="newText" defaultValue={this.props.children}></textarea>
					<button onClick={this.save} className="btn btn-sm btn-success glyphicon glyphicon-floppy-disk"></button>
				</div>
				);
		},
		render: function(){
			if (this.state.editing){
				return this.renderForm();
			} else {
				return this.renderDisplay();
			}
			
		}
	});

	var Board = React.createClass({
		propTypes: {
			count: function(props, propName){
				if(typeof props[propName] !== "number"){
					return new Error(" The count must be a number :)");
				}
				if(props[propName]>100){
					return new Error('Creating ' +props[propName]+ " is just silly");
				}
			}
		},
		getInitialState: function(){
			return {
				notes: []
			}
		},
		add: function(text){
			var arr = this.state.notes;
			arr.push(text);
			console.log(arr);
			this.setState({notes: arr});
			// console.log("Lies!");
		},
		update: function(newText, i){
			var arr = this.state.notes;
			arr[i] = newText;
			this.setState({notes:arr});

		},
		eachNote: function(note, i){
			return (
				<Note key={i}
					index={i}
					onChange={this.update}
					onRemove={this.remove}
				>{note}</Note>
			);
		},
		remove: function(i){
			var arr = this.state.notes;
			arr.splice(i,1);
			this.setState({notes:arr});
		},
		render: function(){
			return (<div className="board">
					{this.state.notes.map(this.eachNote)}
					<button className="add-btn btn btn-sm glyphicon glyphicon-plus" onClick={this.add.bind(null,"")}/>
				</div>
			);
		}
	})

	ReactDOM.render(<Board count={10}/>, document.getElementById('react-container'));

}
