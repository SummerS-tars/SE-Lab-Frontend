<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import { addv1,getv1 } from "@/request/api.js"
import {ref} from "vue"

let v1=ref(0)

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
    <p>{{ v1 }}</p>
    <br>
    <button @click="add()">Add</button>
    <br>
    <button @click="reflesh()">Refresh</button>
  </main>
</template>
