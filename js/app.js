console.log(typeof React)

// window.onload = function(){

	console.log(typeof React)

	var MyComponent = React.createClass({
		render: function(){
			return <div>My react myComponent</div>;
		}
	});
	// var node = document.getElementById('react-container');

	ReactDOM.render(<MyComponent />, document.getElementById('react-container'));

// }
// },100);