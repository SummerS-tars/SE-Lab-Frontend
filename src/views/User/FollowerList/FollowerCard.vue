<script setup>
import IconLike from '@/components/icons/IconLike.vue';
import MarkdownContent from '@/components/MarkdownContent.vue';

const props=defineProps({
    username:{default:''},
	id:{default:''},
})

</script>

<template>
	<el-card style="margin:10px;border:0px">
        <a class="link" :href="`/user/profile/${id}`">
            <span style="font-weight: bold;">{{ $props.username }}</span>
        </a>
	</el-card>

</template>

<style scoped>

.link{
	font-weight: bold;
	color: black;
	text-decoration: none;
	font-size: large;
}

.link:hover{
	color: #007BFF;
}
</style>