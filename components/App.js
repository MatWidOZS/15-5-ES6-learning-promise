App = React.createClass({
	getInitialState() {
		return {
			loading: false,
			searchingText: '',
			gif: {}
		}
	},
	
	handleSearch: function(searchingText) {
		this.setState({
			loading: true
		});
		this.getGif(searchingText, gif)
			.then(function(gif) {
				this.setState({
					loading: false,
					gif: gif,
					searchingText: searchingText
				});
			}.bind(this))
			.catch(function(error) {
				console.error(error);
			});
	},

	getGif: function(searchingText, callback) {
		return new Promise(
			function(resolve, reject) {
				let url = 'http://api.giphy.com' + '/v1/gifs/random?api_key=' + 'dc6zaTOxFJmzC' + '&tag=' + searchingText;
				let xhr = new XMLHttpRequest();
				xhr.open('GET', url);
				xhr.onload = function() {
					if (xhr.status === 200) {
						let data = JSON.parse(xhr.responseText).data;
						let gif = {
							url: data.fixed_width_downsampled_url,
							sourceUrl: data.url
						};
						resolve(gif);
					} else {
						reject(new Error(this.statusText));
					}
				};
				xhr.send();
			}
		);
	},

	render: function() {

		var styles = {
			margin: '0 auto',
			textAlign: 'center',
			width: '90%'
		};

		return (
			<div style={styles}>
				<h1>GIF search engine!</h1>
				<p>Find GIF on <a href='http://giphy.com'> giphy</a> Press enter to donwload another GIF.</p>
				<Search onSearch={this.handleSearch}/>
				<Gif 
					loading={this.state.loading}
					url={this.state.gif.url}
					sourceUrl={this.state.gif.sourceUrl}
				/>
			</div>
		);
	}
});
