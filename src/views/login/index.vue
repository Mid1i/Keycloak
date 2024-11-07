<script setup lang="ts">
	import { ref } from "vue";

	import TheCheckbox from "@/components/TheCheckbox.vue";
	import TheLineText from "@/components/TheLineText.vue";
	import TheContainer from "@/layouts/TheContainer.vue";
	import TheButton from "@/components/TheButton.vue";
	import TheInput from "@/components/TheInput.vue";
	
	import { useLogin } from "@/hooks/login";
	import "@/assets/styles/default.scss";


	interface IForm {
		email: string,
		password: string
	}


	const { social, forms, permissions, validations, labels, titles, urls, getUrl, getIcon } = useLogin();

	const formValue = ref<IForm>({
		email: "",
		password: ""
	});

	const showPassword = ref<boolean>(false);
</script>

<template>
	<TheContainer>
		<section class="login">
			<h2 class="login__title">{{ titles.loginTitle }}</h2>
			<p class="login__text">
				{{ labels.noAccount }}
				<a class="login__text--accent" :href="getUrl(urls.registration)">{{ labels.doRegister }}</a>
			</p>
			<form :action="getUrl(urls.loginAction)" method="post" class="login__form">
				<span class="login__error">{{ validations.usernameOrPassword }}</span>
				<TheInput
					v-model="formValue.email"
					:title="labels.email"
					name="username"
					type="text"
				/>
				<TheInput
					v-model="formValue.password"
					:title="labels.password"
					:type="showPassword ? 'text' : 'password'"
					name="password"
				>
					<svg @click="() => showPassword = !showPassword" class="login__icon" height="20" width="20">
						<use :href="getIcon(`/input.svg#password-${showPassword ? 'show' : 'hide'}`)"/>
					</svg>
				</TheInput>

				<div class="login__row">
					<span v-if="permissions.rememberMe && !permissions.usernameEditDisabled">
						<TheCheckbox
							:checked="forms.loginRememberMe"
							name="rememberMe"
						>
							{{ labels.rememberMe }}
						</TheCheckbox>
					</span>
					<span v-if="permissions.resetPasswordAllowed">
						<a :href="getUrl(urls.loginResetCredentials)" class="login__text login__text--accent">{{ labels.doForgotPassword }}</a>
					</span>
				</div>

				<input
					:value="forms.selectedCredential"
					name="credentialId"
					id="id-hidden-input"
					type="hidden"
				/>

				<TheButton :disabled="!formValue.email || !formValue.password">{{ labels.doLogIn }}</TheButton>
			</form>
			<TheLineText v-if="social.length > 0"/>
			<div class="login__social">
				<a 
					v-for="el in social" 
					:href="el.loginUrl"
					class="login__social-link"
				>
					<img 
						:alt="el.displayName" 
						:src="getIcon(`/social/${el.alias}.svg`)"
						class="login__social-image" 
					/>
					{{ el.displayName }}
				</a>
			</div>
		</section>
	</TheContainer>
</template>

<style scoped lang="scss">
  @import "@/assets/styles/variables.scss";


	.login {
		display: flex;
		flex-direction: column;
		justify-content: center;

		padding: 7vw;

		max-width: 900px;
		height: 100%;
		width: 100%;

		&__title {
			font-size: 32px;
			font-weight: 700;

			margin-bottom: 10px;
		}

		&__text {
			font-size: 16px;
			margin-bottom: 100px;

			&--accent {
				color: $text-accent;
			}
		}

		&__form {
			display: flex;
			flex-direction: column;
			gap: 20px;

			margin-bottom: 30px;
			width: 100%;
		}

		&__error {
			color: $text-negative;
			font-size: 14px;
			text-align: center;

			&:empty {
				display: none;
			}
		}

		&__row {
			align-items: center;
			display: flex;
			justify-content: space-between;
		}

		&__social {
			display: flex;
			flex-direction: column;
			gap: 20px;

			&-link {
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
			}

			&-image {
				object-fit: contain;
				height: 19px;
				width: 19px;
			}
		}
	}


	@media(hover: hover) {
		.login__text--accent:hover {
			text-decoration: underline;
		}

		.login__social-link:hover {
			border-color: $text-accent;
			color: $text-accent;
		}
	}

	@media(max-width: 1024px) {
		.login {
			max-width: 800px;
			padding: 60px 100px;

			margin: 0px auto;
		}
	}

	@media(max-width: 500px) {
		.login {
			padding: 50px;
		}
	}
</style>
