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
		componentWillMount: function(){
			this.style = {
				right: this.randomBetween(0,window.innerWidth - 150) + 'px',
				top: this.randomBetween(0,window.innerHeight - 150) + 'px',
				transform: 'rotate('+this.randomBetween(-15,15) + 'deg)'
			}
		},
		componentDidMount:function(){
			$(ReactDOM.findDOMNode(this)).draggable();
		},
		randomBetween: function(min,max){
			return (min + Math.ceil(Math.random()  * max));
		},
		handleCheck: function(){
			this.setState({checked: !this.state.checked});
		},
		renderDisplay: function(){
			return (
				<div className="note" style={this.style}>
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
				<div className="note" style={this.style}>
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
		nextId: function(){
			this.uniqueId = this.uniqueId || 0;
			return this.uniqueId++;
		},
		componentWillMount: function(){
			var self = this;
			console.log(this.props.count);
			if(this.props.count){
				$.getJSON("http://baconipsum.com/api/?type=all-meat&sentences="+this.props.count+"&start-with-lorem=1",function(results){
					results[0].split(". ").forEach(function(sentence){
						self.add(sentence.substring(0,40));
					});
				});
			}
		},
		add: function(text){
			var arr = this.state.notes;
			arr.push({
				id: this.nextId(),
				note: text
			});
			this.setState({notes: arr});
		},
		update: function(newText, i){
			var arr = this.state.notes;
			arr[i].note = newText;
			this.setState({notes:arr});

		},
		eachNote: function(note, i){
			return (
				<Note key={note.id}
					index={i}
					onChange={this.update}
					onRemove={this.remove}
				>{note.note}</Note>
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
					<button className="add-btn btn btn-success btn-sm glyphicon glyphicon-plus" onClick={this.add.bind(null,"New note")}/>
				</div>
			);
		}
	})

	ReactDOM.render(<Board count={25}/>, document.getElementById('react-container'));

}
