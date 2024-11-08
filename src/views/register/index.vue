<script setup lang="ts">
	import { ref } from "vue";

	import TheSocialLink from "@/components/TheSocialLink.vue";
	import TheCheckbox from "@/components/TheCheckbox.vue";
	import TheLineText from "@/components/TheLineText.vue";
	import TheContainer from "@/layouts/TheContainer.vue";
	import TheButton from "@/components/TheButton.vue";
	import TheInput from "@/components/TheInput.vue";
	
	import { useLogin } from "@/hooks/login";
	import "@/assets/styles/default.scss";


	interface IForm {
		firstName: string,
		lastName: string,
		email: string,
		password: string,
		passwordConfirm: string
	}


	const { social, forms, permissions, validations, labels, titles, urls, getUrl, getIcon } = useLogin();

	const formValue = ref<IForm>({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		passwordConfirm: ""
	});

	const showPassword = ref<boolean>(false);
	const showPasswordConfirm = ref<boolean>(false);
</script>

<template>
	<TheContainer>
		<section class="login">
			<h2 class="login__title">{{ titles.registerTitle }}</h2>
			<p class="login__text">
				{{ labels.haveAccount }}
				<a class="login__text--accent" :href="getUrl(urls.login)">{{ labels.doLogIn }}</a>
			</p>
			<form :action="getUrl(urls.registrationAction)" method="post" class="login__form">
				<div class="login__row">
					<div class="login__field">
						<TheInput
							v-model="formValue.firstName"
							:error="validations.firstName"
							:title="labels.firstName"
							name="firstName"
							type="text"
						/>
					</div>
					<TheInput
						v-model="formValue.lastName"
						:error="validations.lastName"
						:title="labels.lastName"
						name="lastName"
						type="text"
					/>
				</div>

				<TheInput
					v-model="formValue.email"
					:error="validations.email || validations.username"
					:title="labels.email"
					name="email"
					type="text"
				/>

				<TheInput
					v-model="formValue.password"
					:error="validations.password"
					:title="labels.password"
					:type="showPassword ? 'text' : 'password'"
					name="password"
				>
					<svg @click="() => showPassword = !showPassword" class="login__icon" height="20" width="20">
						<use :href="getIcon(`/input.svg#password-${showPassword ? 'show' : 'hide'}`)"/>
					</svg>
				</TheInput>

				<TheInput
					v-model="formValue.passwordConfirm"
					:error="validations.passwordConfirm"
					:title="labels.passwordConfirm"
					:type="showPasswordConfirm ? 'text' : 'password'"
					name="passwordConfirm"
				>
					<svg @click="() => showPasswordConfirm = !showPasswordConfirm" class="login__icon" height="20" width="20">
						<use :href="getIcon(`/input.svg#password-${showPasswordConfirm ? 'show' : 'hide'}`)"/>
					</svg>
				</TheInput>

				<input
					:value="forms.selectedCredential"
					name="credentialId"
					id="id-hidden-input"
					type="hidden"
				/>

				<TheButton class="login__button">{{ labels.doRegister }}</TheButton>
			</form>
			<TheLineText v-if="social.length > 0"/>
			<div class="login__social">
				<TheSocialLink
					v-for="el in social" 
					:key="el.displayName"
					:="el"
				/>
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

		&__field {
			flex: 0 1 60%;
		}

		&__row {
			align-items: center;
			display: flex;
			justify-content: space-between;
			gap: 20px;
		}

		&__button {
			margin-top: 10px;
		}

		&__social {
			display: flex;
			flex-direction: column;
			gap: 20px;
		}
	}


	@media(hover: hover) {
		.login__text--accent:hover {
			text-decoration: underline;
		}
	}

	@media(max-width: 1024px) {
		.login {
			max-width: 800px;
			padding: 50px;
			padding-top: 100px;

			margin: 0px auto;

			&__row {
				align-items: stretch;
				flex-direction: column;
			}
		}
	}

	@media(max-width: 500px) {
		.login {
			padding: 20px;
			padding-top: 100px;

			&__title {
				font-size: 28px;
				margin-bottom: 5px;
			}

			&__text {
				font-size: 14px;
				margin-bottom: 80px;
			}
		}
	}
</style>

