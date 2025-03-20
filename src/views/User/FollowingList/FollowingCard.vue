<script setup>
import IconLike from '@/components/icons/IconLike.vue';
import FollowButton from '../FollowButton.vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';

const route = useRoute();
const userid =  route.params.id;

const props=defineProps({
	username:{default:''},
	id:{default:''},
})

</script>

<template>
	<el-card style="margin:10px;border:0px;">
		<div class="FollowingCard">
			<div>
				<a class="link" :href="`/user/profile/${id}`">
					<span style="font-weight: bold;">{{ $props.username }}</span>
				</a>
			</div>
			<div>
				<template v-if="useUserStore().token()&&useUserStore().id==userid">
					<FollowButton :authorId="props.id"/>
				</template>
			</div>
		</div>
	</el-card>

</template>

<style scoped>

.FollowingCard{
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

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