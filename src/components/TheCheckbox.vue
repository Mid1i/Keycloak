<script setup lang="ts">
	import { useLogin } from "@/hooks/login";


	defineProps<{
		name: string,
		checked: boolean
	}>();


	const { getIcon } = useLogin();
</script>


<template>
	<label :for="name" class="field">
		<input
			:checked="checked"
			:name="name"
			:id="name"
			type="checkbox"
			class="field__checkbox"
		>
		<span class="field__check">
			<img 
				:src="getIcon('/check.svg')"
				class="field__check-image" 
				alt="Галочка" 
			/>
		</span>
		<slot></slot>
	</label>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";


	.field {
		align-items: center;
		display: flex;
		gap: 15px;

		cursor: pointer;

		position: relative;

		$self: #{&};

		&__check {
			pointer-events: none;
			opacity: 0;

			transition: all 0.1s ease-in-out;

			position: absolute;
			left: 4px;
			top: 4px;

			height: 10px;
			width: 10px;

			&-image {
				height: 100%;
				width: 100%;
			}
		}

		&__checkbox {
			background: transparent;
			border: 1px solid $border-primary;
			border-radius: 3px;

			cursor: pointer;

			height: 18px;
			width: 18px;

			transition: all 0.1s ease-in-out;

			&:checked {
				appearance: none;

				background: $background-accent;
				border-color: transparent;

				& + #{$self}__check {
					opacity: 1;
				}
			}
		}
	}


	@media(hover: hover) {
		.field:hover {
			color: $text-accent;

			$self: #{&};

			& #{$self}__checkbox {
				border-color: $text-accent;
			}
		}
	}
</style>