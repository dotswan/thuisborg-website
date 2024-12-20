<template>
	<div class="mollie">
		<div class="mollie-card-cont">
			<form @submit.stop.prevent="submitForm" ref="form">
				<div class="mollie-card" ref="card">
				</div>
				<button class="btn reg-btn" type="submit">pay {{ settings.inputs.price }}</button>
			</form>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Mollie',
	props: {
		settings: null
	},
	data() {
		return {
			scriptLoad: false,
			mollie: null,
			mollieCard: null,
			mollieOptions: {
				testmode: this.settings.testmode || null,
				locale: this.settings.locale || null,
				styles: {
					base: {
						color: '#eee',
						fontSize: '10px',
						'::placeholder': {
							color: 'rgba(68, 68, 68, 0.2)',
						}
					},
					valid: {
						color: '#090',
					}
				},
			}
		};
	},
	methods: {
		setUp() {
			if (!!this.settings && !!this.settings.profileID && this.scriptLoad && !this.mollieSuccess) {
				this.configMollie();
			}
		},
		configMollie() {
			this.mollie = Mollie(this.settings.profileID, this.mollieOptions);
			this.mollieCard = this.mollie.createComponent('card');
			this.mollieCard.mount(this.$refs.card);
		},
		async submitForm() {
			var {token, error} = await this.mollie.createToken();
			if (error) {
				return;
			}

			let tokenInput = document.createElement('input');
			tokenInput.setAttribute('type', 'hidden');
			tokenInput.setAttribute('name', 'cardToken');
			tokenInput.setAttribute('value', token);
			// _this.$refs.form.appendChild(tokenInput);
			// _this.$refs.form.submit();
			this.sendTokenToMollie(token);
		},
		sendTokenToMollie(token) {
			Axios({
				method: "post",
				url: "http://localhost:3000",
				headers: {
					"Target-Endpoint": "https://api.mollie.com/v2/methods/all",
					"access-control-request-headers": '*',
					"Access-Control-Allow-Methods": "GET, PUT, PATCH, POST, DELETE"
				},
				data: {
					profileId: this.settings.profileID,
				}
			}).then(res => {
				console.log(res)
			}).catch(err => {
				console.log(err)
			});
			Axios({
				method: "post",
				url: "http://localhost:3000",
				headers: {
					"Authorization": 'Bearer ' + this.settings.apiKey,
					"Target-Endpoint": "https://api.mollie.com/v2/payments",
					"access-control-request-headers":'*',
					"Access-Control-Allow-Methods": "GET, PUT, PATCH, POST, DELETE"
				},
				data: {
					method: 'creditcard',
					amount: {
						currency: 'EUR',
						value: this.settings.inputs.price
					},
					profileId: this.settings.profileID,
					testmode: this.settings.testmode,
					description: 'TB OBL19',
					cardToken: token,
					redirectUrl: 'http://www.google.com'
				}
			}).then(response => {
				console.log(response)
			}).catch(error => {
				console.log(error)
			})
			return false
			// const mollieClient = createMollieClient({'apiKey': this.settings.apiKey});
			//
			// const payment = await mollieClient.payments.create({
			// 	method: 'creditcard',
			// 	amount: {
			// 		currency: 'EUR',
			// 		value: this.settings.price
			// 	},
			// 	description: 'Thuisborg OB19',
			// 	redirectUrl: 'google.com',
			// 	cardToken: token
			// });
		},
		addScript() {
			let _this = this,
					head = document.head,
					interval,
					scriptTag = document.createElement('script');
			scriptTag.setAttribute('src', 'https://js.mollie.com/v1/mollie.js');
			scriptTag.classList.add('mollie');
			scriptTag.addEventListener('load', function () {
				_this.scriptLoad = true;
			});
			head.appendChild(scriptTag);
		}
	},
	created() {
		this.addScript();
	},
	watch: {
		scriptLoad() {
			this.setUp()
		},
		settings(val) {
			if (!!val) {
				this.setUp();
			}
		}
	}
}
</script>
