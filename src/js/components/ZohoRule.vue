<template>
	<div class="rule" v-show="displayStatus" ref="rule">
		<slot></slot>
	</div>
</template>

<script>

export default {
	name: "ZohoRule",
	computed: {
		displayStatus() {
			return this.display
		}
	},
	props: {
		conditions: null
	},
	data() {
		return {
			display: true,
			form: null,
			input: null,
			value: null
		};
	},
	methods: {
		setUp() {
			this.form = this.$refs.rule.closest('form').parentElement.getElementsByTagName('form')[0];
			this.input = this.form.elements[this.conditions.name];
			this.input.addEventListener('input', this.change);
			this.change()
		},
		checkLogic() {
			if (this.conditions.rule === "display") {
				if (this.conditions.type === 'checkbox') {
					if (this.value === this.conditions.meets) {
						this.display = true;
					} else {
						this.display = false;
					}
				} else if (!!this.conditions.lessthan) {
					if (this.value <= parseFloat(this.conditions.lessthan)) {
						this.display = true
					} else {
						this.display = false
					}
				}
			} else if (this.conditions.rule === "percent") {
				if (!!this.value) {
					this.setPercentageValue(this.conditions.appendOn, this.conditions.percent, this.value);
				}
			}
		},
		setPercentageValue(name, percent, val) {
			this.form.elements[name].value = Math.round(parseFloat(val) * parseFloat(percent) / 100);
		},
		change() {
			if (this.conditions.type === 'checkbox') {
				this.value = this.input.checked;
			} else {
				this.value = this.input.value;
			}
			this.checkLogic();
		}
	},
	mounted() {
		this.setUp()
	}
}
</script>


<!-- usage -->

<!--<zoho-rule type="and" :conditions="{name: 'privacy', type:'checkbox', meets:true, rule:'display'}">-->
<!--<span>content</span>-->
<!--</zoho-rule>-->


<!--<zoho-rule :conditions="{name: 'Number', rule:'percent', percent:'2', appendOn:'Emissiekosten'}">-->
<!--</zoho-rule>-->