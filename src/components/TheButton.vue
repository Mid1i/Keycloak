<script setup lang="ts">
	defineProps<{
		disabled: boolean
	}>();
</script>


<template>
	<button :disabled="disabled" class="button">
		<slot></slot>
	</button>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";


	.button {
		background: $background-accent;
		border-radius: 5px;

		color: $text-secondary;
		font-weight: 600;
		font-size: 16px;

		height: 50px;
		width: 100%;

		transition: all 0.1s ease-in-out;

		&:disabled {
			background: $border-primary;
			pointer-events: none;
		}
	}


	@media(hover: hover) {
		.button:not(:disabled):hover {
			background: $background-accent-hover;
		}
	}
</style>