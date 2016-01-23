	var helloWorld = React.createClass({displayName: "helloWorld",
		render: function(){
			return (
				React.createElement("div", null, 
					React.createElement("h1", null, "Hello World"), 
					React.createElement("span", null, "This is some text.")
				)
				);
		}
	});

	React.renderDOM(React.createElement("helloWorld", null), document.body);