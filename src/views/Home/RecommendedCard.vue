<script setup>
import IconLike from '@/components/icons/IconLike.vue';

const props=defineProps({
	title:{default:''},
	abstract:{default:''},
	likes:{default:0},
	like:{default:false},
	id:{default:''},
})

</script>

<template>
	<el-card style="margin:10px;border:0px">
		<template #header>
			<a class="link" :href="`/question/${id}`">
				<span style="font-weight: bold;">{{ $props.title }}</span>
			</a>
		</template>
		<p>{{ $props.abstract }} </p>
		<template #footer>
			<div class="card-footer">
				<span>
					<IconLike :like='like'/>
					{{$props.likes}}
				</span>
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