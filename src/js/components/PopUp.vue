<template>
	<div class="popup-cont" v-show="mayI">
		<div class="popup" :class="[{'hidden': !display}]" @click="close()" ref="cont">
			<i class="close">⨯</i>
			<slot></slot>
		</div>
		<div class="popup-minified" v-show="!display && shortcutDisplay" @click="shortcutClicked">
			<span>{{ title }}</span>
			<i class="closer" @click.stop="closeShortcut">⨯</i>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		default: {
			type: Boolean,
			default: false
		},
		pid: '',
		exceptions: {
			type: Array,
			default: () => []
		},
		title: '',
		end: null
	},
	data() {
		return {
			display: false,
			id: '',
			shortcutDisplay: true,
			mayI: true
		};
	},
	methods: {
		close() {
			this.display = false;
			this.shortcutDisplay = true;
			this.$cookies.set(this.id, 1, '1m');
		},
		show() {
			this.display = true;
			this.$cookies.set(this.id, 1, '1m');
		},
		shortcutClicked() {
			this.show()
		},
		closeShortcut() {
			this.shortcutDisplay = false;
		},
		checkUrl() {
			let out = true
			if (this.exceptions?.length) {
				let url = window.location.href,
						res = true;

				this.exceptions.map(x => {
					if (url.indexOf(x) > -1) {
						out = res = res && false;
					} else {
						out = res = res && true;
					}
				})
				out = res;
			}
			return out
		},
		isDatePassed() {
			let res = true;
			if (!!this.end) {
				let now = new Date(),
						exp = new Date(this.end);
				now.setHours(0, 0, 0, 0)
				res = exp > now;
			}
			return res;
		},
		checkShow() {
			this.mayI = this.checkUrl() && this.isDatePassed()
		}
	},
	created() {
		this.checkShow()
		let _this = this;
		document.addEventListener("keydown", function (e) {
			if (e.keyCode == 27 && _this.display) {
				_this.display = false;
			}
		});
	},
	mounted() {
		if (!!this.pid) {
			this.id = this.pid;
		} else {
			this.id = 'pip';
		}
		let _this = this,
				img = document.querySelectorAll('.popup img')[0];
		if (!(!!this.$cookies.get(this.id))) {
			setTimeout(() => {
				if (img.complete) {
					_this.show();
				} else {
					img.addEventListener('load', _this.show());
				}
			}, 3000);
		}
	}
}
</script>
