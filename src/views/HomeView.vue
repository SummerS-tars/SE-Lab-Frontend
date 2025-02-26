<script setup>
import { addv1,getv1 } from "@/request/api.js"
import {ref, onMounted} from "vue"

let v1=ref(0)

onMounted(()=>{
  reflesh()
})

const add=()=>{
  addv1()
  getv1().then(res=>{
    v1.value=res.value
  })
}

const reflesh=()=>{
  getv1().then(res=>{
    v1.value=res.value
  })
}

</script>

<template>
  <main>
      <div class="container">
        <div class="background">
          <p>{{ v1 }}</p>
          <button @click="add()">Add</button>
          <button @click="reflesh()">Refresh</button>
        </div>
      </div>
  </main>
</template>

<style scoped>

.container {
    height: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}

.background{
  background-color: rgba(255,255,255,0.96);
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.8);
}

p {
  font-size: 24px;
  text-align: center;
  color: #333;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  margin: 10px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}
</style>
