import React, { Component } from 'react';
import Header from './header';
import './App.css';
import Modal from 'react-modal';

// Modal.setAppElement();

const customStyles = {
	content : {
	  top                   : '50%',
	  left                  : '50%',
	  right                 : 'auto',
	  bottom                : 'auto',
	  marginRight           : '-50%',
	  transform             : 'translate(-50%, -50%)'
	}
}

  Modal.setAppElement('#root');

  export default class App extends React.Component {
	  constructor() {
		  super();
		  this.state = {
			  todos: [],
			  modalIsOpened: false,
			  index: [],
			  data: [],
		  };
		  this.openModal = this.openModal.bind(this);
		  this.afterOpenModal = this.afterOpenModal.bind(this);
		  this.closeModal = this.closeModal.bind(this);
	  }
  
	  openModal(data, i) {
		  this.setState({ modalIsOpened: true, data: data, index: i });
	  }
  
	  afterOpenModal() {
		  // references are now sync'd and can be accessed.
		  this.subtitle.style.color = '#0001';
		  let data = this.state.data;
		  this.refs.editjam.value = data.jam;
		  this.refs.editaktivitas.value = data.aktivitas;
	  }
	  closeModal() {
		  this.setState({ modalIsOpened: false });
	  }
  
	  editTodo = a => {
		  a.preventDefault();
  
		  let ba = this.refs.editjam.value;
		  let ca = this.refs.editaktivitas.value;
		  let key = this.state.index;
		  // console.log(ba,,key);
  
		  this.state.todos.splice(key, 1, {jam:ba, aktivitas:ca});
		  this.setState({ todos: this.state.todos, data: [] });
  
		  this.closeModal();
	  };
  
	  addTodo = e => {
		  e.preventDefault(); // preventDefault untuk mencegah data yg belum diproses
  
		  let jam = this.refs.jam.value;
		  let aktivitas = this.refs.aktivitas.value;
  
		  this.state.todos.push({ jam, aktivitas });
		  this.setState({ todos: this.state.todos });
  
		  this.refs.formulir.reset();
		  this.refs.jam.focus();
	  };
  
	  removeTodo = i => {
		  this.state.todos.splice(i, 1);
		  this.setState({ todos: this.state.todos });
	  };
	  render() {
		  return (
			  <div>
				  <br />
				  <div className="App">
					  <Header />
				  </div>
				  <form ref="formulir" className="form-inline">
					  <div className="form-group mx-sm-3 mb-2">
						  <input type="time" className="form-control" ref="jam" />
						  <input type="text" className="form-control" ref="aktivitas" placeholder="jenis aktifitas" />
					  </div>
					  <div className="form-group mb-2">
						  <button onClick={this.addTodo} className="btn btn-info">
							  simpan
						  </button>
					  </div>
				  </form>
				  <hr />
				  <div>
					  <ul className="list-group">
						  {this.state.todos.map((data, i) => (
							  <li className="list-group-item" key={i}>
								  <div>
									  {data.jam} ~:~ {data.aktivitas}
									  <button onClick={() => this.openModal(data, i)} className="btn btn-outline-primary mx-sm-3 mb-2">
										  Edit
									  </button>
									  <button onClick={() => this.removeTodo(i)} className="btn btn-outline-danger mx-sm-3 mb-2">
										  Hapus
									  </button>
								  </div>
							  </li>
						  ))}
					  </ul>
				  </div>
				  <Modal
					  isOpen={this.state.modalIsOpened}
					  onAfterOpen={this.afterOpenModal}
					  onRequestClose={this.closeModal}
					  onAfterClose={this.afterClose}
					  style={customStyles}
					  contentLabel="Edit"
					  ariaHideApp={false}
				  >
					  <div>
						<center>  <h2 ref={subtitle => (this.subtitle = subtitle)} >Edit</h2></center>
						  <form ref={editform => (this.editform = editform)}>
							  <div className="form-group">
								  <input type="time" ref="editjam" className="form-control" />
							  </div>
							  <div className="form-group">
								  <input type="text" ref="editaktivitas" className="form-control" />
							  </div>
							  <div className="form-group mb-2 float-right">
								  <button onClick={this.editTodo}  className="btn btn-info">
									  simpan
								  </button>
							  </div>
						  </form>
					  </div>
				  </Modal>
			  </div>
		  );
	  }
  }







// class App extends Component{
// 	constructor(){
// 		super();
// 		this.state = { todos: [ ], modalIsOpen: false };
		
// 		this.openModal = this.openModal.bind(this);
// 		this.closeModal = this.closeModal.bind(this);
// 	}
	

// addTodos = e =>{
// 	e.preventDefault();

// 	let jam = this.refs.jam.value;
// 	let aktivitas = this.refs.aktivitas.value;

// 	this.state.todos.push({jam, aktivitas});
// 	this.setState({todos: this.state.todos});

// 	this.refs.formulir.reset();
// 	this.refs.jam.focus(); 
// };

// removeTodo = i => {
// 	this.state.todos.splice(i, 1);
// 	this.setState({todos: this.state.todos});
// };

// editTodo = i => {
// 	this.refs.jam.focus(); 
    
// 	let jam = this.refs.jam.value;
// 	let aktivitas = this.refs.aktivitas.value;
// 	this.state.todos.splice(i, 1);
// }

// openModal() {
//     this.setState({modalIsOpen: true});
//   }
 
//   closeModal() {
//     this.setState({modalIsOpen: false});
//   }

//  render(){
// 	return(
// 		<div>
//  			< br />
// 			<div className="App">
// 				<Header />
// 			</div>

// 			<form ref="formulir" className="form-inline">
// 				<div className="form-group mx-sm-3 mb-2">
// 					<input 
// 					type="time"
// 					className="form-control"
// 					ref="jam"
// 					placeholder="jam aktivitas" />

// 					<input 
// 					type="text"
// 					className="form-control"
// 					ref="aktivitas"
// 					placeholder="jenis aktivitas" />
// 				</div>

// 				<div className="form-group mb-2">
// 					<button onClick={this.addTodos} className="btn btn-info">
// 						SIMPAN
// 					</button>
// 				</div>
// 			</form>
// 			<hr />

// 			<div>
// 				<ul className="list-group">
// 					{this.state.todos.map((data, i) => (
// 						<li>
// 							{data.jam} -:- {data.aktivitas}
// 							<button onClick={() => this.editTodo(i)} className="btn btn-outline-primary mx-sm-3 mb-2"> EDIT </button>
// 							<button onClick={() => this.removeTodo(i)} className="btn btn-outline-danger mx-sm-3 mb-2"> HAPUS </button>
// 						</li>
// 					))}
// 				</ul>

// 			</div>

// 		</div>
// 	)
// }
// };




// export default App;
