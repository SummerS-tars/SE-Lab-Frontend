<script setup>
import { ref } from "vue";
import IconEmoji from "./icons/IconEmoji.vue";

// 控制 Popover 的显示状态
const popoverVisible = ref(false);

// 表情列表
const Smileys = [
  "😀", "🤔", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃",
  "😉", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "😚", "😋",
  "😛", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🥳", "😏", "😒",
  "😞", "😔", "😟", "😕", "🙁", "😢", "😠", "😡", "🤬", "🤯",
];

const emojiCategories = {
  Smileys: Smileys,
  Animals: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯","🐛"],
  Food: ["🍎", "🍌", "🍇", "🍓", "🍉", "🍕", "🍔", "🍟", "🎂", "🍦"],
  Activities: ["⚽", "🏀", "🏈", "⚾", "🎾", "🏐", "🏉", "🎱", "🏓", "🏸"],
};

// const generateEmojisFromRange = (start, end) => {
//   const emojis = [];
//   for (let codePoint = start; codePoint <= end; codePoint++) {
//     const emoji = String.fromCodePoint(codePoint);
//     if (emoji.trim() !== "") {
//       emojis.push(emoji);
//     }
//   }
//   return emojis;
// };

// // 定义表情分类数据
// const emojiCategories = {
//   Smileys: generateEmojisFromRange(0x1f600, 0x1f64f), // 笑脸和情感
//   Animals: generateEmojisFromRange(0x1f400, 0x1f43e), // 动物
//   Food: generateEmojisFromRange(0x1f347, 0x1f37c),   // 食物
//   Activities: generateEmojisFromRange(0x1f3c0, 0x1f3df), // 活动
// };

const currentCategory = ref("Smileys");

// 点击表情时触发
const emit = defineEmits(["select"]);
const selectEmoji = (emoji) => {
  emit("select", emoji); // 向父组件发送选择的表情
  // popoverVisible.value = false; // 关闭 Popover
};
</script>

<template>
    <el-popover
      v-model:visible="popoverVisible"
      placement="bottom-start"
      :width="400"
      trigger="hover"
    >
      <!-- 触发按钮 -->
      <template #reference>
				<IconEmoji style="margin-top: 10px;margin-left: 10px;"/>
      </template>
  
			<el-tabs v-model="currentCategory" class="emoji-tabs">
				<el-tab-pane
					v-for="(category, index) in Object.keys(emojiCategories)"
					:key="index"
					:label="category"
					:name="category"
				>
					<!-- 表情列表 -->
					<el-scrollbar max-height="200px" class="emoji-list">
						<div class="emoji-grid">
							<div
								v-for="(emoji, index) in emojiCategories[category]"
								:key="index"
								class="emoji-item"
								@click="selectEmoji(emoji)"
							>
								{{ emoji }}
							</div>
						</div>
					</el-scrollbar>
				</el-tab-pane>
			</el-tabs>
    </el-popover>
</template>

<style scoped>
.emoji-tabs {
  margin-top: -10px; /* 微调顶部间距 */
}

.emoji-list {
  padding: 10px;
}

.emoji-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
  gap: 8px;
}

.emoji-item {
  font-size: 24px;
  cursor: pointer;
  text-align: center;
  transition: transform 0.2s ease;
	user-select: none;
}

.emoji-item:hover {
  transform: scale(1.2);
}
</style>