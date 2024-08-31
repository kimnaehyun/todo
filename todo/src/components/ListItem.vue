<template>
  <div>

<div v-if="home">
  <select name="status" id="status" @change="todoStatus" >
    <option value="all">전체</option>
    <option value="continuing">진행중</option>
    <option value="done">완료</option>  
  </select>
  <div class="todoList" v-for="(t, i) in todos" :key="t+i" :id="'t'+t.done" >
    <div id="dsa">
      <input type="checkbox" :id="'c'+i" @click="checkTodo(t.id)" :checked=t.done>
      <div :class="'cs'+t.done" @click="modal(t)" id="asd">{{t.title}}</div>
    </div>
      
    </div>
    <div class="modal" v-if="isModal" >
        <div class="inner">
          <h3>{{selectedTodo.title}}</h3>
          <p>{{selectedTodo.content}}</p>
          <button @click="modal(null)">닫기</button>
        </div>
      </div>
</div>


  
<div v-if="addUpdate">
            <div class="todoAdd" >
        <input type="text" v-model="newTitle" name="" id="title" placeholder="제목">
<textarea name="" id="content" v-model="newContent" placeholder="내용"></textarea>
<input type="button" value="추가" @click="addTodo" id="add">
      </div>
      <div class="todoList" v-for="(t, i) in todos" :key="t+i">

      <span :id="'s'+i">{{t.title}}</span>
      <input :id="'b'+i" type="button" value="수정"  class="b" @click="update(t.title,t.content,i)">
      <input :id="'bc'+i" type="button" value="수정 취소" class="bc" @click="updateCancel(i)">
      <div class="todoUpdate" :id="'todoUpdate'+i" >
        <input type="text" v-model="updateTitle" name="" :id="'titleUpdate'+i" placeholder="제목">
        <textarea :id="'contentUpdate'+i" v-model="updateContent" placeholder="내용"></textarea>
        <input type="button" value="수정완료" @click="completeUpdate(i,t.id)">
      </div>
    </div>
</div>

<div v-if="eliminate">
<div class="todoList" v-for="(t, i) in todos" :key="t+i">
      <span>{{t.title}}</span>
      <input type="button" value="삭제" class="x"  @click="removeTodo(t.id)">
    </div>
</div>
  

  </div>

</template>
<script>
import useTodos from "../hooks/useTodo.js";
export default {
  props:['home','addUpdate','eliminate',],
  name: "ListItem",
  setup(){
    const {
        todos,
        addTodo,
        removeTodo,
        newTitle,
        newContent,
        updateTitle,
        updateContent,
        updateTodo,
        checkTodo,
        selectedTodo,
        modal,
        isModal,
      } = useTodos()

const todoStatus = () =>{
const status = document.getElementById('status').value;

let t0 = document.querySelectorAll('#t0')
let t1= document.querySelectorAll('#t1')
if(status == 'continuing'){
  t0.forEach(e => (e.classList.remove('none')));
  t1.forEach(e => (e.classList.remove('block')));
  t0.forEach(e => (e.classList.add('block')));
  t1.forEach(e => (e.classList.add('none')));
}
else if(status == 'done'){
  t0.forEach(e => (e.classList.remove('block')));
  t1.forEach(e => (e.classList.remove('none')));
  t0.forEach(e => (e.classList.add('none')));
  t1.forEach(e => (e.classList.add('block')));

}else if(status == 'all'){
  t0.forEach(e => (e.classList.remove('block')));
  t1.forEach(e => (e.classList.remove('block')));
  t0.forEach(e => (e.classList.remove('none')));
  t1.forEach(e => (e.classList.remove('none')));
}
}


const update = (t,c,i) => {
  let title = document.getElementById('titleUpdate'+i);
  let content = document.getElementById('contentUpdate'+i);
title.value = t;
  content.value = c;
  document.getElementById('todoUpdate'+i).style.display = 'block';
  document.getElementById('bc'+i).style.display = 'inline';
  document.getElementById('b'+i).style.display = 'none';
  document.getElementById('s'+i).style.display = 'none';
} 
 const updateCancel = (i) => {
  let title = document.getElementById('titleUpdate'+i);
  let content = document.getElementById('contentUpdate'+i);
title.value = "";
  content.value = "";
  document.getElementById('bc'+i).style.display = 'none';
  document.getElementById('todoUpdate'+i).style.display = 'none'
  document.getElementById('b'+i).style.display = 'inline';
  document.getElementById('s'+i).style.display = 'inline';
 }

    const completeUpdate = (i,id) => {
      let title = document.getElementById('titleUpdate'+i);
      let content = document.getElementById('contentUpdate'+i);
      title.value = "";
  content.value = "";
  document.getElementById('bc'+i).style.display = 'none';
  document.getElementById('todoUpdate'+i).style.display = 'none'
  document.getElementById('b'+i).style.display = 'inline';
  document.getElementById('s'+i).style.display = 'inline';
      updateTodo(id)
    }

    return{
      todos,
        addTodo,
        removeTodo,
        newTitle,
        newContent,
        updateTitle,
        updateContent,
        update,
        updateCancel,
        updateTodo,
        checkTodo,
        completeUpdate,
        isModal,
        modal,
        selectedTodo,
        todoStatus,
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#inner{
  border: 1px solid black;
}
input[type="checkbox"]{
  margin: 1vh;
}
.cs1{
  text-decoration:line-through
}
.content{
  position: relative;
  display: none;
}
.todoList{
  position: relative;
  border: 1px solid black;
  margin: 1vh;
}
#dsa{
  display: flex;
}
#asd{
width: 100%;
align-content: center;
}
.todoAdd{
  position: relative;
  margin: 1vh;
}
.todoUpdate{
  position: relative;
  margin: 1vh;
  display:none
}
.x, .b{
  position: absolute;
  right: 1px;
}
.bc{
  display: none;
}
.content{
  border: 1px solid black;
  margin: 1vh;
}
input[type=text]{
  width: 100%;
  
}
textarea{
  width: 100%;
  resize: none;
  height: 100px;
margin-top: 1vh;
}
.modal{
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal .inner{
  background: #fff;
  width: 80%;
  padding: 20px;
  border-radius: 10px;
}
.none{
  display: none;
}
.block{
  display: block;
}
</style>
