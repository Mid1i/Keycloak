<script setup lang="ts">
	import { useLogin } from "@/hooks/login";


	const { labels } = useLogin();
</script>


<template>
	<span class="line">{{ labels.or }}</span>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";


	.line {
		align-items: center;
		display: flex;
		gap: 10px;

		font-size: 16px;

		margin-bottom: 30px;

		&::before,
		&::after {
			background: $border-primary;
			content: "";

			flex: 1 0 auto;

			margin-top: 4px;
			height: 1px;
		}
	}


	@media(max-width: 500px) {
		.line {
			font-size: 14px;
		}
	}
</style>