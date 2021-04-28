import React, { Component } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./App.css";
import "./components/HeaDer.css";
import HeaDer from "./components/HeaDer";
import ToDoList from "./components/ToDoList";
import Footer from "./components/Footer";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toDoList: [
        { id: 1, title: "test Toeic", isComplete: true },
        { id: 2,title: "test IQ", isComplete: true },
        { id: 3,title: "test Voice", isComplete: false },
      ],

      toDoListView: [],
      statusShow: "all", // statusShow = all || active || completed


      idToDoEditing : null,
      toDoEditing: {},
      indexTodoEditing: 1,

      isCompletedAll: false,
    };
    this.headerRef = React.createRef();
  }

  static getDerivedStateFromProps(props, state) {
    // TODO: Tính toán lại thằng toDoListView dựa trên thằng toDoList, statusShow
    const { toDoList, statusShow } = state;

    let toDoListView = toDoList;
    let toDoListCompleted = toDoList.filter((num) => num.isComplete);

    switch (statusShow) {
      case "active": {
        toDoListView = toDoList.filter((num) => !num.isComplete);
        break;
      }
      case "completed": {
        toDoListView = toDoListCompleted;
        break;
      }
      default: {
        break;
      }
    }

    return {
      toDoListView,
      isCompletedAll: toDoListCompleted.length === toDoList.length,
    };
  }

  //them moi
  addToDo = (value) => {
    const { toDoList } = this.state;
    this.setState({
      toDoList: [
        { id: uuidv4(), title: value, isComplete: false },
        ...this.state.toDoList,
      ],
    });
  };

  //hinh Sua
  onDelete = (id) => {
    const { toDoList } = this.state;

    const copyTodoList = [...toDoList];
    // loc ra nhung phan tu khong bang id
    const todoListDeleted = copyTodoList.filter((todo) => {
      return todo.id !== id;
    });
    this.setState({
      toDoList: todoListDeleted,
    });
  };

  handleUpdate = (title) => {
    const { toDoList, toDoEditing } = this.state;
    // debugger;
    // console.log('toDoList', toDoList);
    // toDoEditing.title = title;
    // let indexEdit
    // toDoList.map((item, index) => {
    //   if(item.id === toDoEditing.id) {
    //     indexEdit = index
    //   }
    // });
    // const newToDoList = [...toDoList];
    // newToDoList.splice(indexEdit, 1, toDoEditing);
    const newToDoList = [...toDoList];
    for(let item of newToDoList) {
      if(item.id === toDoEditing.id) {
        item.title = title;
      }
    }

    this.setState({
      toDoList: [...newToDoList],
      toDoEditing: null,
      indexTodoEditing: null,
    });
  };

  //gach Chan
  clickUnderlined = (id) => {
    const { toDoList } = this.state;
    let copyTodoList = [...toDoList];
    // so sanh id ban dau voi id duoc truyen tu thang con gui toi neu 2 id bang nhau thi moi thuc hien khoi lenhj
    copyTodoList.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
        return;
      }
    });


    this.setState({ toDoList: copyTodoList });
    // this.setState({ toDoList });
  };

  //Item Click
  itemClick = (item) => {
    console.log('id', item.id);
    console.log('item', item);
    this.setState({
      // idToDoEditing: item.id,
      toDoEditing: item,
      //indexTodoEditing: toDoIndex,
    });
    // call func của header => update state "value" trong comp header
    // ========================
    // /*this.headerRef && this.headerRef.current &&*/

    // this.headerRef.current.setValue(item.title);
    console.log('ref', this.headerRef.current);
    this.headerRef.current.setValue(item)
  };
  // handleF = (item) => {
  //   this.headerRef.current.setValue(item.title);
  //
  // }

  // check all
  checkAll = () => {
    const { toDoList, isCompletedAll } = this.state;
    if (isCompletedAll) {
      this.removeCompletedAll();
    } else {
      this.completedAll();
    }
  };

  completedAll = () => {
    const { toDoList } = this.state;
    debugger;
    const test = toDoList.map((item, index) => {
      if (item.isComplete === false) {
        item.isComplete = true;
      }
      return item;
    });
    debugger;
    this.setState({
      toDoList: test,
    });
  };

  removeCompletedAll = () => {
    const { toDoList } = this.state;
    const test = toDoList.map((item, index) => {
      if (item.isComplete === true) {
        item.isComplete = false;
      }
      return item;
    });
    this.setState({
      toDoList: test,
    });
  };

  updateStatusShow = (statusShow) => {
    this.setState({
      statusShow,
    });
  };

  getNumberToDoActive = () => {
    const { toDoList } = this.state;
    const toDoListActive = toDoList.filter((num) => !num.isComplete);
    return toDoListActive.length;
  };

  removeAllToDoListCompleted = () => {
    const { toDoList } = this.state;
    this.setState({
      toDoList: toDoList.filter((num) => !num.isComplete),
    });
  };

  // onC = () => {
  //   this.headerRef && this.headerRef.current && this.headerRef.current.onclick();
  // }

  render() {
    const {
      toDoListView,
      idToDoEditing,
      toDoEditing,
      indexTodoEditing,
      statusShow,
      toDoList,
      isCompletedAll,
    } = this.state;
    // console.log('headerRef: ', this.headerRef);
    const numberToDoActive = this.getNumberToDoActive();

    return (
      <div className="App">
        {/*<button className="button" onClick={this.itemClick}>*/}
        {/*  Submit*/}
        {/*</button>*/}
        <HeaDer
          isCompletedAl={isCompletedAll}
          idToDoEditing={idToDoEditing}
          toDoEditing={toDoEditing}

          indexTodoEditing={indexTodoEditing}
          addToDo={this.addToDo}
          checkAllApp={this.checkAll}
          handleUpdate={this.handleUpdate}
           ref={this.headerRef}
        />
        <ToDoList
            // ref={this.headerRef}
          toDoListView={toDoListView}
          onChangeUnderlinedApp={this.clickUnderlined}
          onDeleteApp={this.onDelete}
          onClickItemApp={this.itemClick}
          onClickActive={this.props.onClickActive}
          checkItem={this.checkItem}
          onClickA={this.onClickA}
        />
        {(toDoList.length > 0) && (
          <Footer
            toDoList={toDoList}
            numberToDoActive={numberToDoActive}
            updateStatusShow={this.updateStatusShow}
            statusShow={statusShow}
            removeAllToDoListCompleted={this.removeAllToDoListCompleted}
          />
        )}
      </div>
    );
  }
}

export default App;
