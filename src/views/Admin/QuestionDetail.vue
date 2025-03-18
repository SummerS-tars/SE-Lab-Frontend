<script setup>

</script>

<template>
  <div>
    <div class="head" style="font-weight: bold;">
      问题详情
    </div>
    <br>
    <div class="info-box">
      <MarkdownContent :content="dialogContent" v-if="dialogVisible"></MarkdownContent>
    </div>
  </div>
</template>