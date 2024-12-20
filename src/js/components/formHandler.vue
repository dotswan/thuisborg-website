<template>
	<div class="form-handler" ref="body" :class="[{'formIsValid' : isValid}]">
		<slot></slot>
	</div>
</template>

<script>
export default {
	computed: {
		isValid() {
			let res = this.toValidate.filter(item => item.status === false);
			return !!!res.length;
		}
	},
	props: {
		recaptcha: null,
		captcha: "",
		blacklist: [],
		validations: []
	},
	data() {
		return {
			form: null,
			toValidate: []
		};
	},
	methods: {
		setUp() {
			// get the form
			this.form = this.$refs.body.getElementsByTagName('form')[0];
			this.form.addEventListener('submit', this.formSubmit);
			this.form.addEventListener('change', this.fieldsChange);
			this.parseForm();
			if (!!this.recaptcha) {
				this.setRecaptcha();
			}
		},
		setRecaptcha() {
			let scriptTag = document.createElement('script'),
					scriptAddress = "https://www.google.com/recaptcha/api.js";
			scriptTag.setAttribute('src', scriptAddress);
			scriptTag.setAttribute('async', '');
			scriptTag.setAttribute('defer', '');
			if (!!!this.form.getElementsByClassName('g-recaptcha').length) {
				let recaptchaTag = document.createElement('div');
				recaptchaTag.classList.add('g-recaptcha', 'brochure__form__captcha');
				recaptchaTag.setAttribute('data-sitekey', this.recaptcha);
				recaptchaTag.setAttribute('data-errormessage', 'Captcha validation is required');
				this.form.appendChild(recaptchaTag);
			}
			document.head.appendChild(scriptTag);
		},
		formSubmit(e) {
			e.preventDefault();
			e.stopPropagation();
			this.validateForm();
			if (this.isValid) {
				if (!!this.recaptcha && grecaptcha.getResponse() !== "") {
					//submit
					this.toggleCaptchaError(true);
					this.form.submit()
				} else {
					this.form.submit()
				}
			}
		},
		toggleCaptchaError(status) {
			let elm = this.form.getElementsByClassName('g-recaptcha')[0];
			elm.classList.toggle('error');
		},
		applyValidationMessages() {
			this.toValidate.forEach(item => {
				if (!!!item.status) {
					let parent = !!item.node.length ? item.node[0].parentNode : item.node.parentNode;
					parent.classList.add('js-validation-error');
					parent.setAttribute('js-validation-message', item.message)
				} else {
					let parent = !!item.node.length ? item.node[0].parentNode : item.node.parentNode;
					parent.classList.remove('js-validation-error');
					parent.removeAttribute('js-validation-message');
				}
			})
		},
		validateEmail(email) {
			return String(email)
					.toLowerCase()
					.match(
							/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
					);
		},
		validateForm() {
			this.parseForm();
			this.toValidate.forEach(item => {
				if (!!item.value) {
					item.status = true;
					item.message = '';
					if (!!item.validation) {
						if (item.validation === 'email') {
							item.status = !!this.validateEmail(item.value);
							item.message = !!this.validateEmail(item.value) ? '' : '* Voer een geldig emailadres in';
							if (this.validateEmail(item.value) && !!this.blacklist && !!this.blacklist.length && this.blacklist.includes(item.value)) {
								// blacklist
								item.status = false;
								item.message = '* Your email address is defined as spam.';
							}
						}
					}
				} else {
					item.status = false;
					item.message = '* Dit is een verplicht veld';
				}
			});
			this.applyValidationMessages();
		},
		parseForm() {
			this.toValidate = [];
			this.validations.forEach(item => {
				if (!!this.form.elements[item] || !!this.form.elements[item.name]) {
					//if element exists
					let element = !!this.form.elements[item] ? this.form.elements[item] : this.form.elements[item.name],
							type = element.type,
							length = element.length,
							field = {};
					if (typeof item === "string") {
						//just required validations
						if (type === 'select-one') {
							field = {
								name: item,
								type: 'select',
								value: element.value,
								status: false,
								message: ""
							}
						} else if (!!length && element[0].type === "radio") {
							let value = null;
							element.forEach(el => {
								if (el.checked) {
									value = el.value
								}
							})
							field = {
								name: item,
								type: 'radio',
								value: value,
								status: false,
								message: "",
								node: element
							}
						} else if (type === 'checkbox') {
							field = {
								name: item,
								type: 'checkbox',
								value: element.checked,
								status: false,
								message: "",
								node: element
							}
						} else {
							field = {
								name: item,
								type: 'text',
								value: element.value,
								status: false,
								message: "",
								node: element
							}
						}
						this.toValidate.push(field)
					} else {
						// more validations than just required
						let field = {
							name: item.name,
							value: element.value,
							type: 'text',
							validation: item.validation,
							status: false,
							message: "",
							node: element
						}
						this.toValidate.push(field)
					}
				}
			});
		},
		fieldsChange() {
			this.validateForm()
		}
	},
	mounted() {
		this.setUp()
	}
}
</script>