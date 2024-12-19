<template>
	<div class="ham-cont" @click="hamClick()"
	     :class="[{'is-open': $store.getters.getNav}, {'is-closed': !$store.getters.getNav}]">
		<div class="hamburger-lines">
			<span class="line line1" :class="[{'!bg-teal-default':$store.getters.isLoggedIn}]"></span>
			<span class="line line2" :class="[{'!bg-orange-default':$store.getters.isLoggedIn}]"></span>
			<span class="line line3" :class="[{'!bg-teal-default':$store.getters.isLoggedIn}]"></span>
		</div>
	</div>
</template>
<script>
export default {
	name: 'hamburger',
	computed: {},
	props: {
		lang: '',
		translation: ''
	},
	data() {
		return {}
	},
	methods: {
		hamClick() {
			this.$store.commit('toggleNav');
		}
	},
}
</script>
<style lang="scss">

.ham-cont {
	display: none;
	position: relative;
	width: theme('spacing.5');
	height: theme('spacing.3');
	align-items: center;
	justify-content: center;

	.hamburger-lines {
		width: theme('spacing.5');
		height: theme('spacing.3');
		position: absolute;
		top: 0;
		right: 0;
		z-index: 2;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: space-between;

		.line {
			display: block;
			height: 2px;
			width: theme('spacing.5');
			border-radius: 1px;
			background: #fff;

			&.line1 {
				transform-origin: 5px 0;
				transition: transform 0.4s ease-in-out;
			}

			&.line2 {
				transition: transform 0.2s ease-in-out;
			}

			&.line3 {
				transform-origin: 0 0;
				transition: transform 0.4s ease-in-out;
			}
		}
	}

	&.is-open {

		.hamburger-lines {
			.line {
				&.line1 {
					width: 20px;
					transform: rotate(45deg);
				}

				&.line2 {
					transform: scaleY(0);
				}

				&.line3 {
					width: 20px;
					transform: rotate(-45deg);
				}
			}
		}
	}

	@media all and (max-width: 1024px) {
		display: inline-flex;
	}
}
</style>
