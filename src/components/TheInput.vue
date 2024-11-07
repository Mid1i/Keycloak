<script setup lang="ts">
	import { ref, watch } from "vue";


	const props = defineProps<{
		name: string,
		error?: string,
		modelValue: string | number,
		type: "text" | "email" | "tel" | "password",
		title: string
	}>();

	const emit = defineEmits<{
		"update:modelValue": [value: string | number];
	}>();

	const localModel = ref(props.modelValue);


	watch(localModel, () => emit("update:modelValue", localModel.value));
</script>


<template>
	<div class="field">
		<input
			v-model="localModel"
			:id="name" 
			:name="name"
			:type="type"
			:class="`field__input ${type === 'password' ? 'password' : ''}`"
			autocomplete="new-password"
		>
		<label 
			:class="`
				field__label 
				${localModel !== '' ? 'active' : ''}
				${error ? 'error' : ''}
			`" 
			:for="name"
		>
			{{ error || title }}
		</label>
		<div class="field__icon">
			<slot></slot>
		</div>
	</div>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";


	.field {
		position: relative;
		width: 100%;

		$self: #{&};

		&__label {
			background: $background-primary;

			font-size: 16px;

			padding: 1px;

			pointer-events: none;

			position: absolute;
			left: 20px;
			top: 50%;

			transform: translateY(-50%);
			transition: all 0.1s ease-in-out;

			&.active,
			&.error {
				font-size: 12px;
				top: 0px;
			}

			&.error {
				color: $text-negative;
			}
		}

		&__input {
			border: 1px solid $border-primary;
			border-radius: 5px;

			font-size: 16px;

			padding: 0px 20px;

			height: 50px;
			width: 100%;

			transition: all 0.1s ease-in-out;

			&.password {
				padding-right: 50px;
			}

			&:focus {
				border-color: $border-secondary;
			}

			&:focus + #{$self}__label {
				font-size: 12px;
				top: 0px;
			}
		}

		&__icon {
			cursor: pointer; 

			position: absolute;
			right: 20px;
			top: 50%;

			transform: translateY(-50%);
		}
	}


	@media(hover: hover) {
		.field__input:hover {
			border-color: $text-accent;
		}
	}
</style>