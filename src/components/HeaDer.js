import React, {Component, createRef} from "react";
import "./HeaDer.css";
import checkAll from "./images/checkall.svg";
class HeaDer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      idEdit: null,

    };
    // this.Update = React.createRef()
  }


  // componentDidUpdate(prevProps) {
  //
  //   if (
  //     this.props.idToDoEditing !== prevProps.idToDoEditing &&
  //     this.props.toDoEditing
  //   ) {
  //     this.setState({
  //       value: this.props.toDoEditing.title,
  //     });
  //   }
  // }
  
  setValue = (item) => {
    console.log('item', item); // MongLV log fix bug
    const {title, id} = item;
    this.setState({
      value: title,
      idEdit: id,
    });
  };

  onclick = () => {
    const { value, idEdit } = this.state;
    debugger;
    const { handleUpdate, toDoEditing, addToDo } = this.props;
    console.log(handleUpdate,toDoEditing,addToDo)
    // if (Object.keys(toDoEditing).length !== 0 && typeof toDoEditing === 'object') {
    if (idEdit) {
      handleUpdate(value);
    } else if (value.length > 0) {
      addToDo(value);
    }
    this.setState({
      value: "",
      idEdit: null,
    });
  };



  handleInput = (event) => {
    const text = event.target.value;
    this.setState({
      value: text,
      isComplete: false,
    });
  };

  onClickCheckAll = () => {
    const { checkAllApp } = this.props;
    checkAllApp();
  };

  render() {
    const {
      idToDoEditing,
      toDoEditing,
      checkAllApp,
      indexTodoEditing,
      handleUpdate,
      isCompletedAll,
    } = this.props;
    return (
      <div className="Header">
        <img
          style={{ opacity: isCompletedAll ? 1 : 0.5 }}
          className="image"
          src={checkAll}
          onClick={this.onClickCheckAll}
        />
        <input
          type="text"
          placeholder="What needs to be done?"
          value={this.state.value}
          onChange={this.handleInput}
          autoFocus
        />
        <button className="button" onClick={this.onclick}>
          Submit
        </button>

        <hr/>
      </div>
    );
  }
}

export default HeaDer;
