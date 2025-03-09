<script setup>
import IconLike from '@/components/icons/IconLike.vue';
import MarkdownContent from '@/components/MarkdownContent.vue';

const props=defineProps({
	title:{default:''},
	content:{default:''},
	id:{default:''},
    createAt:{default:''},
})

</script>

<template>
	<el-card style="margin:10px;border:0px">
		<template #header>
			<a class="link" :href="`/question/${id}`">
				<span style="font-weight: bold;">{{ $props.title }}</span>
			</a>
            <br/>
			<span style="font-size: 14px;color: #999;"> {{ $props.createAt }}</span>
		</template>
        <MarkdownContent :id="id+` problem-content`" :content="props.content"/>
		<template #footer>
			<div class="card-footer" style="display: flex;justify-content: flex-end">
                <el-button type="primary" plain>编辑</el-button>
			</div>
		</template>
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