<template>
	<div class="mollie-redirect">
		<div class="payment-status failed" v-if="!paid && !!paymentStatus">
			<div class="paid">
				<p>Payment Error <b>{{ paymentStatus.data.status }}</b></p>
				<p>tracking code: <span class="code">{{ paymentCode }}</span></p>
			</div>
		</div>
		<div class="pending-payment" v-if="!paid && !goBank">
			<div class="select-payment">
				<h3>Selecteer een optie</h3>
				<ul class="methods">
					<li @click="changePaymentMethod('ideal')" :class="[{'selected': method==='ideal'}]">
						<img src="/template/images//ideal.svg">
						<span>iDeal</span>
					</li>
					<li @click="changePaymentMethod('bank')" :class="[{'selected': method==='bank'}]">
						<i>BANK</i>
						<span>Bankoverschrijving</span>
					</li>
				</ul>
				<br>
				<div class="btn-loading">
					<div class="bl-inner">
						<span @click="startPayment()" class="btn reg-btn"
						      :class="[{'disabled': (!!!method || methodsLoading)}]">Volgende stap</span>
						<div class="loading-wrapper">
							<loading v-show="methodsLoading"></loading>
						</div>
					</div>

				</div>
			</div>
			<!--			<div class="redirect-cont">-->
			<!--				<p class="redirect-message">U wordt doorgestuurd naar de betalingsverzoek in-->
			<!--					<b class="timer">{{ timer }}</b>seconden.</p>-->
			<!--				<p v-show="!!link"> of klik <a :href="link" class="redirect-link">hier</a> om nu door te verwijzen.</p>-->
			<!--			</div>-->
			<!--			<div class="information">-->
			<!--				<div class="multi-fields col-2">-->
			<!--					<div class="col">-->
			<!--						<b>naam</b>-->
			<!--						<span>{{ data.name }}</span>-->
			<!--					</div>-->
			<!--					<div class="col">-->
			<!--						<b>email</b>-->
			<!--						<span>{{ data.email }}</span>-->
			<!--					</div>-->
			<!--					<div class="col">-->
			<!--						<b>amount</b>-->
			<!--						<span>{{ data.amount }}</span>-->
			<!--					</div>-->
			<!--					<div class="col">-->
			<!--						<b>Description</b>-->
			<!--						<span>{{ data.desc }}</span>-->
			<!--					</div>-->
			<!--				</div>-->
			<!--			</div>-->
		</div>
		<div class="other-payment-cont" v-if="method==='bank' && goBank">
			<img src="/template/images/payment-sent.png">
			<h2 class="single-line-h2 bold navy ">Zodra wij het inschrijfformulier en het
			                                      deelnamebedrag hebben ontvangen ontvangt u
			                                      hier per post een bevestiging van</h2>
			<p>U kunt het deelname bedrag overmaken op onderstaande rekening: <br>
				<b>{{ $store.getters.getBankAccount }}</b> - t.n.v. Thuisborg Finance B.V.</p>
		</div>
		<div class="payment-status" v-if="paid">
			<div class="paid">
				<p>Payment successful</p>
				<p>tracking code: <span class="code">{{ paymentCode }}</span></p>
			</div>
			<div class="information">
				<div class="multi-fields col-2">
					<div class="col">
						<b>naam</b>
						<span>{{ data.name }}</span>
					</div>
					<div class="col">
						<b>email</b>
						<span>{{ data.email }}</span>
					</div>
					<div class="col">
						<b>amount</b>
						<span>{{ data.amount }}</span>
					</div>
					<div class="col">
						<b>Description</b>
						<span>{{ data.desc }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'MollieRedirect',
	computed: {
		hasValue() {
			return this.data.amount
		},
	},
	props: {
		data: null,
	},
	data() {
		return {
			step: 0,
			link: null,
			timer: 15,
			paid: false,
			paymentCode: null,
			method: null,
			goBank: false,
			paymentStatus: null,
			methodsLoading: false
		};
	},
	methods: {
		changePaymentMethod(to) {
			this.method = to;
		},
		startPayment() {
			if (!!this.method && !this.methodsLoading) {
				if (this.method === 'bank') {
					this.goBank = true
				} else if (this.method === 'ideal') {
					this.redirectNow()
				}
			}
		},
		euroSigned(v) {
			return `${('' + v).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
		},
		setUp() {
			if (!!this.data.status) {
				this.fetchPayment(this.data.status);
			} else {
				// this.fetchLinkViaApi();
				// this.startTimer();
			}
		},
		fetchPayment(code) {
			//https://thuisborg.dotcms.online/api/v1/payment/status?id=PAYMENT_UUID
			const form = new FormData(),
					_this = this;
			form.append("id", code);
			this.paymentCode = code;
			const options = {
				method: 'POST',
				url: 'https://thuisborg.dotcms.online/api/v1/payment/status',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				data: form
			};

			Axios.request(options).then(function (response) {
				_this.paymentStatus = response.data;
				_this.fetchLinkViaApi();
				if (_this.paymentStatus.success && _this.paymentStatus.data.status === "paid") {
					_this.paid = true;
				} else {
					_this.paid = false;
					_this.fetchLinkViaApi();
				}
			}).catch(function (error) {
				_this.paid = false;
				_this.fetchLinkViaApi();
			});
		},
		countCharsInString(str, letter) {
			let count = 0;
			for (let i = 0; i < str.length; i++) {
				if (str[i] === letter)
					count++;
			}
			return count;
		},
		parseAmount(inpt) {
			let occur = this.countCharsInString(inpt, '.'), amount = inpt;
			if (occur > 1) {
				let arr = inpt.split('.');
				amount = '';

				for (let i = 0; i <= occur; i++) {
					if (i === occur) {
						amount += '.' + arr[i];
					} else {
						amount += arr[i];
					}

				}
			} else if (occur < 1) {
				amount = inpt + '.00'
			}
			return amount
		},
		fetchLinkViaApi() {
			//https://thuisborg.dotcms.online/api/v1/payment/thuisborg-mollie-payment/request
			const form = new FormData();
			this.methodsLoading = true;
			form.append("amount", this.parseAmount(this.data.amount));
			form.append("description", this.data.desc);
			form.append("email", this.data.email);
			form.append("name", this.data.name);
			form.append("redirect", window.location.href); //
			form.append("metadata", JSON.stringify({id: 0})); // JSON.stringify(this.data.metadata)
			const options = {
				method: 'POST',
				url: 'https://thuisborg.dotcms.online/api/v1/payment/thuisborg-mollie-payment/request',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
				data: form
			};
			Axios.request(options).then((response) => {
				this.methodsLoading = false;
				this.link = response.data.data.redirect
			}).catch(function (error) {
				console.error(error);
			});
		},
		startTimer() {
			let _this = this,
					timer = setInterval(() => {
						if (_this.timer >= 1) {
							_this.timer--
						} else {
							_this.timer = 0;
							clearInterval(timer);
							_this.redirectNow();
						}
					}, 1000)
		},
		redirectNow() {
			window.location.href = this.link
		}
	},

	watch: {
		data() {
			if (this.hasValue) {
				this.setUp();
			}
		},
		method() {
			if (this.method === 'ideal') {
				this.fetchLinkViaApi();
			}
		}
	}
}
</script>
