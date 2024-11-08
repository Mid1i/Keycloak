<script setup lang="ts">
	import { useLogin } from "@/hooks/login";
	
	
	defineProps<{
		alias: string,
		displayName: string,
		loginUrl: string
	}>();

	const { getIcon } = useLogin();
</script>


<template>
	<a class="button" :href="loginUrl">
		<img 
			:alt="displayName" 
			:src="getIcon(`/social/${alias}.svg`)"
			class="button__image" 
		/>
		{{ displayName }}
	</a>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";


	.button {
		border: 1px solid $background-secondary;
		border-radius: 5px;

		font-weight: 600;
		font-size: 16px;

		align-items: center;
		display: flex;
		justify-content: center;
		gap: 10px;

		height: 50px;
		width: 100%;

		transition: all 0.1s ease-in-out;

		&__image {
			object-fit: contain;
			height: 19px;
			width: 19px;
		}
	}	


	@media(hover: hover) {
		.button:hover {
			border-color: $text-accent;
			color: $text-accent;
		}
	}

	@media(max-width: 500px) {
		.button {
			font-size: 14px;
			height: 40px;

			&__image {
				height: 16px;
				width: 16px;
			}
		}
	}
</style>