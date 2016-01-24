window.onload = function(){

	var Box = React.createClass({displayName: "Box",
		getDefaultProps: function(){
			return {
				colorIndex: -1
			}
		},
		prop: {
			colorIndex: -1
		},
		getInitialState: function(){
			return {
				backgroundColor: "blue",
				height: 200,
				width: 200
			}
		},
		update: function(){
			// this.setProps({colorIndex: this.props.colorIndex + 1});
			this.prop.colorIndex++
			var color = this.props.colors.split(',')[this.prop.colorIndex]
			if(!color) {this.prop.colorIndex=0}
			this.setState({backgroundColor: color});
			console.log(this.prop);
		},
		componentWillReceiveProps: function(nextProps){
			console.log(nextProps);
			var color = this.props.colors.split(',')[nextProps.colorIndex]
			if(!color) {this.setProps({colorIndex:0})}
			this.setState({backgroundColor: color});
		},
		render: function(){
			return React.createElement("div", {onClick: this.update, style: this.state})
		}
	});

	ReactDOM.render(React.createElement(Box, {colors: "Red,DarkGreen,Purple,Pink,Chartreuse"}),document.getElementById('react-container'));

	// console.log(document.getElementById('react-container'));

}
