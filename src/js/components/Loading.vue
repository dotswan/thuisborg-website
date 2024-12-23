<template>
	<div v-show="display !== undefined && display" class="loading-holder" :class="color">
		<svg class="svg-loading" width="44" height="44" viewBox="0 0 44 44"
		     stroke="#136ba7">
			<g fill="none" fill-rule="evenodd" stroke-width="2">
				<circle cx="22" cy="22" r="1">
					<animate attributeName="r"
					         begin="0s" dur="1.8s"
					         values="1; 20"
					         calcMode="spline"
					         keyTimes="0; 1"
					         keySplines="0.165, 0.84, 0.44, 1"
					         repeatCount="indefinite"/>
					<animate attributeName="stroke-opacity"
					         begin="0s" dur="1.8s"
					         values="1; 0"
					         calcMode="spline"
					         keyTimes="0; 1"
					         keySplines="0.3, 0.61, 0.355, 1"
					         repeatCount="indefinite"/>
				</circle>
				<circle cx="22" cy="22" r="1">
					<animate attributeName="r"
					         begin="-0.9s" dur="1.8s"
					         values="1; 20"
					         calcMode="spline"
					         keyTimes="0; 1"
					         keySplines="0.165, 0.84, 0.44, 1"
					         repeatCount="indefinite"/>
					<animate attributeName="stroke-opacity"
					         begin="-0.9s" dur="1.8s"
					         values="1; 0"
					         calcMode="spline"
					         keyTimes="0; 1"
					         keySplines="0.3, 0.61, 0.355, 1"
					         repeatCount="indefinite"/>
				</circle>
			</g>
		</svg>
		<span v-show="(msg !== undefined && msg.length!==0)" class="loading-msg">{{ msg }}</span>
	</div>
</template>

<script>
export default {
	name: 'Loading',
	props: {
		display: false,
		msg: '',
		color: ''
	},
	data() {
		return {
			active: true
		}
	},
	methods: {
		hide: function () {
			this.display = false;
		}
	},
}
</script>
