<script setup lang="ts">
	import { useLogin } from "@/hooks/login";


	const { getImage, getIcon, titles } = useLogin(); 
</script>


<template>
	<div class="container">
		<section class="container__left">
			<h1 class="container__title">
				<img
					alt="Фон" 
					class="container__background"
					:src="getImage('/container-background.png')"
				/>
				<img 
					alt="Логотип PERO ID" 
					class="container__title-logo"
					:src="getIcon('/logo.svg')"
				/>
				{{ titles.logoTitle }}
			</h1>
			<section class="container__bottom">
				<h2 class="container__subtitle">{{ titles.mainTitle }}</h2>
				<p class="container__text">{{ titles.mainSubtitle }}</p>
			</section>
		</section>
		<section class="container__right">
			<slot></slot>
		</section>
	</div>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";


	.container {
		align-items: stretch;
		display: flex;

		min-height: 100vh;
		width: 100vw;

		&__left {
			background: $background-secondary;

			display: flex;
			flex: 0 0 min(48vw, 800px);
			flex-direction: column;
			justify-content: space-between;

			position: relative;

			padding: 7vw;
			padding-right: 3.5vw;
		}

		&__right {
			flex: 1 1 auto;
			height: 100%;
		}

		&__background {
			pointer-events: none;
			position: absolute;
			right: 0px;
			top: 0px;

			height: 100%;
			width: auto;

			z-index: 0;
		}

		&__title {
			align-items: center;
			display: flex;
			gap: 30px;

			color: $text-secondary;
			font-weight: 700;
			font-size: 36px;

			z-index: 1;

			&-logo {
				object-fit: cover;
				height: 40px;
				width: 40px;
			}
		}

		&__bottom {
			display: flex;
			flex-direction: column;
			gap: 20px;
		}

		&__subtitle {
			color: $text-secondary;
			font-weight: 700;
			font-size: 40px;
		}

		&__text {
			color: $text-secondary;
			font-weight: 400;
			font-size: 24px;
		}
	}


	@media(max-width: 1024px) {
		.container {
			flex-direction: column;

			&__left {
				flex: 0 0 auto;
				padding: 50px;
			}

			&__right {
				flex: 0 0 auto;
				height: auto;
			}

			&__bottom {
				display: none;
			}

			&__background {
				bottom: 0px;
				top: auto;

				height: 1000px;
			}
		}
	}

	@media(max-width: 500px) {
		.container__left {
			padding: 10px 20px;
		}

		.container__background {
			right: -165px;
		}

		.container__right {
			flex: 1 0 auto;
		}

		.container__title {
			gap: 20px;
			font-size: 24px;

			&-logo {
				height: 24px;
				width: 24px;
			}
		}
	}
</style>