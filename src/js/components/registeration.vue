<template>
	<div class="register-form" ref="body">
		<div class="progress-bar" v-show="!thankYou">
			<div class="progress-bar__progress" :style="[{width: (step/steps)*100 + '%'}]"></div>
		</div>
		<form action='https://forms.zohopublic.eu/soliditry/form/TBwebsiteBekijkuwmogelijkheden/formperma/w6wMmzSHmLmWQUpqQLIQS3eUgwpZ2Ix8ahaxbCtleo4/htmlRecords/submit'
		      name='form' method='POST' ref="form"
		      accept-charset='UTF-8' enctype='multipart/form-data' id='form' @submit.prevent.stop="next($event)">
			<div class="form_hiddens">
				<input type="hidden"
				       name="zf_referrer_name" value="">
				<!-- To Track referrals , place the referrer name within the " " in the above hidden input field -->
				<input type="hidden" name="zf_redirect_url" value="">
				<!-- To redirect to a specific page after record submission , place the respective url within the " " in the above hidden input field -->
				<input type="hidden" name="zc_gad" value="">
				<!-- If GCLID is enabled in Zoho CRM Integration, click details of AdWords Ads will be pushed to Zoho CRM -->
				<input type="hidden" name="utm_source" value=""/>
				<input type="hidden" name="utm_medium" value=""/>
				<input type="hidden" name="utm_campaign" value=""/>
				<input type="hidden" name="utm_term" value=""/>
				<input type="hidden" name="utm_content" value=""/>
			</div>
			<div class="step-cont" v-show="!thankYou && step==1">
				<div class="title-cont">
					<h1>Welkom bij Thuisborg</h1>
				</div>
				<p>Laten we kijken naar uw mogelijkheden. Wij hebben uw adres nodig om in te kunnen schatten of uw
				   woning in
				   aanmerking komt.</p>
				<div class="field-row">
					<input type="text" name="SingleLine2" checktype="c1"
					       value="" maxlength="255" fieldType=1 v-model="q"
					       placeholder="Straat & huisnummer"/>
				</div>
				<div class="field-row">
					<input type="text" name="SingleLine3" checktype="c1"
					       value="" maxlength="255" fieldType=1
					       placeholder="Postcode"/>
				</div>
				<div class="field-row">
					<input type="text" name="SingleLine4" checktype="c1"
					       value="" maxlength="255" fieldType=1
					       placeholder="Stad"/>
				</div>
				<!--						<p>Lorem ipsum dolor sit amet, consectetscing elit </p>-->
				<button class="btn">Verder gaan</button>
			</div>
			<div class="step-cont" v-show="!thankYou && step==2">
				<div class="title-cont">
					<h1>Vertel ons meer over uw woning</h1>
					<img src="/template/images/house.png">
				</div>
				<div class="inpt-set">
					<p>Wat is volgens u de vrije verkoopwaarde van uw woning op dit moment?</p>
					<div class="field-row">
						<input type="text" name="Number" checktype="c1"
						       value="" maxlength="255" fieldType=1
						       placeholder=""/>
					</div>
				</div>
				<div class="inpt-set">
					<p>Hoe groot is uw ruimte aan grond rondom deze woning?</p>
					<div class="field-row">
						<select name="SingleLine6">
							<option value="Selectie">Selectie</option>
							<option value="0-50 m2">0-50 m2</option>
							<option value="51-100 m2">51-100 m2</option>
							<option value="101-250 m2">101-250 m2</option>
							<option value="251-1.000 m2">251-1.000 m2</option>
							<option value="1.000+ m2">1.000+ m2</option>
						</select>
					</div>
				</div>
				<div class="inpt-set">
					<p>Hoeveel slaapkamers heeft uw woning?</p>
					<div class="field-row">
						<input type="number" name="Number1" checktype="c1"
						       value="" maxlength="255" fieldType=1
						       placeholder="(Graag alleen een nummer invullen)"/>
					</div>

				</div>
				<button class="btn">Verder gaan</button>
			</div>
			<div class="step-cont" v-show="!thankYou && step==3">
				<div class="title-cont">
					<h1>Uw persoonlijke situatie</h1>
				</div>
				<!--					<p>Lorem ipsum dolor sit amet, consectetscing elit</p>-->
				<!--						<div class="inpt-set">-->
				<!--							<p>Wat is volgens u de vrije verkoopwaarde van uw woning op dit moment?</p>-->
				<!--							<input type="text">-->
				<!--						</div>-->
				<div class="inpt-set">
					<p>Is er nog een lopende hypotheek op de woning?</p>
					<div class="field-row">
						<select name="SingleLine8" checktype="c1"
						        maxlength="255" fieldType=1>
							<option selected>Ja</option>
							<option>Nee</option>
						</select>
					</div>
				</div>
				<div class="inpt-set">
					<p>Wat is de openstaande hypotheekschuld?</p>
					<div class="field-row">
						<input type="text" name="Number2" checktype="c1"
						       value="" maxlength="255" fieldType=1
						       placeholder=""/>
					</div>
				</div>
				<button class="btn">Verder gaan</button>
			</div>
			<div class="step-cont" v-show="!thankYou && step==4">
				<div class="title-cont">
					<h1>Graag bespreken we geheel vrijblijvend de mogelijkheden met u</h1>
				</div>
				<!--					<p>Lorem ipsum dolor sit amet, consectetscing elit</p>-->
				<div class="field-row">

					<input type="text" name="SingleLine" checktype="c1"
					       value="" maxlength="255" fieldType=1
					       placeholder="Voornaam"/>
				</div>
				<div class="field-row">

					<input type="text" name="SingleLine1" checktype="c1"
					       value="" maxlength="255" fieldType=1
					       placeholder="Achternaam"/>
				</div>
				<div class="field-row">

					<input fieldType=9 type="text" maxlength="255"
					       name="Email" checktype="c5" value=""
					       placeholder="E-mailadres"/>
				</div>
				<div class="field-row">

					<input type="text" name="SingleLine10" checktype="c1"
					       value="" maxlength="255" fieldType=1
					       placeholder="Telefoonnummer"/>
				</div>
				<!--				<div class="code-num">-->
				<!--					<input type="text" compname="PhoneNumber_countrycodeval" name="PhoneNumber_countrycodeval"-->
				<!--					       checktype="c7"-->
				<!--					       maxlength="10" phoneFormat="1" isCountryCodeEnabled=true-->
				<!--					       id="international_PhoneNumber_countrycodeval"-->
				<!--					       valType="code" placeholder="postcode"/>-->
				<!--					<input type="text" compname="PhoneNumber" name="PhoneNumber_countrycode"-->
				<!--					       maxlength="20" checktype="c7" value="" phoneFormat="1"-->
				<!--					       isCountryCodeEnabled=true fieldType="11"-->
				<!--					       id="international_PhoneNumber_countrycode" valType="number"-->
				<!--					       phoneFormatType="1" placeholder="huisnummer"/>-->
				<!--				</div>-->
				<div class="agreement">
					<input type="checkbox" checktype="c1" id="DecisionBox" name="DecisionBox" v-model="agreement"/>
					<label for="DecisionBox">Ik accepteer de <a
							href="https://thuisborg.nl/docs/2.-AV-Thuisborg-2021-v3-NL.pdf">voorwaarden</a> van
					                         Thuisborg</label>
				</div>
				<button class="btn">Verder gaan</button>
			</div>
			<div class="step-cont thank-you" v-show="thankYou">
				<svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
					<circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
					<path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
				</svg>
				<!--			<div class="title-cont">-->
				<!--				<h1>Thank you</h1>-->
				<!--			</div>-->
				<p>Bedankt, we nemen op werkdagen binnen 48 contact met u op!</p>
			</div>
		</form>
	</div>
</template>
<script>

export default {
	name: 'Registration',
	computed: {
		isStepValid() {
			let search = this.toValidate.filter(item => ((item.step === this.step) && !item.status));
			return !!!search.length;
		},
	},
	data() {
		return {
			validations: [
				{name: 'SingleLine2', step: '1'},
				{name: 'SingleLine3', step: '1'},
				{name: 'SingleLine4', step: '1'},
				{name: 'Number', step: '2'},
				{name: 'SingleLine6', step: '2'},
				{name: 'Number1', step: '2'},
				{name: 'SingleLine8', step: '3'},
				{name: 'Number2', step: '3'},
				{name: 'SingleLine', step: '4'},
				{name: 'SingleLine1', step: '4'},
				{name: 'Email', validation: [{type: 'email'}], step: '4'},
				{name: 'SingleLine10', step: '4'},
				{name: 'DecisionBox', step: '4'},
			],
			form: null,
			step: 1,
			steps: 4,
			thankYou: false,
			agreement: false,
			q: '',
			toValidate: []
		}
	},
	methods: {

		filterPrice() {
			let input = this.form.elements.Number,
					input2 = this.form.elements.Number2,
					input3 = this.form.elements.Number1,
					filtered = input.value.replace(/[^\d]/g, ''),
					filtered2 = input2.value.replace(/[^\d]/g, ''),
					filtered3 = input3.value.replace(/[^\d]/g, '');
			input.value = filtered;
			input2.value = filtered2;
			input3.value = filtered3;
		},
		next(ev) {
			this.filterPrice();
			if (this.isStepValid) {
				if (this.steps > this.step) {
					this.step++;
				} else {
					this.$refs.form.submit();
					// this.thankYou = true;
				}
			}
		},
		setUp() {
			// get the form
			this.form = this.$refs.body.getElementsByTagName('form')[0];
			this.form.addEventListener('submit', this.formSubmit);
			this.form.addEventListener('input', this.fieldsChange);
			this.parseForm();
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
								message: "",
								nodes: []
							}
							field.nodes.push(element)
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
								nodes: []
							}
							field.nodes.push(element)
						} else if (type === 'checkbox') {
							field = {
								name: item,
								type: 'checkbox',
								value: element.checked,
								status: false,
								message: "",
								nodes: []
							}
							field.nodes.push(element)
						} else {
							field = {
								name: item,
								type: 'text',
								value: element.value,
								status: false,
								message: "",
								nodes: []
							}
							field.nodes.push(element)
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
							nodes: []
						}
						field.nodes.push(element)
						field.step = parseInt(item.step)
						this.toValidate.push(field)
					}
				}
			});
		},
		formSubmit(e) {
			e.preventDefault();
			e.stopPropagation();
			this.validateForm();
			if (this.isValid) {
				if (!!this.recaptcha && grecaptcha.getResponse() !== "") {
					this.filterPrice();
					this.toggleCaptchaError(true);
					this.form.submit()
				} else {
					this.filterPrice();
					this.form.submit()
				}
			}
		},
		fieldsChange() {
			this.validateForm()
		},
		updateFormStatus() {
			this.toValidate.map(item => {
				let finalValue = null;
				item.nodes.forEach((nodeItem, index) => {
					if (nodeItem.type === 'radio' || nodeItem.type === 'checkbox') {
						finalValue = !!finalValue ? (!!nodeItem.checked ? nodeItem.checked : finalValue) : nodeItem.checked;
					} else {
						finalValue = nodeItem.value
					}
				});
				item.value = finalValue;
			});
		},
		validateEmail(email) {
			return String(email)
					.toLowerCase()
					.match(
							/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
					);
		},
		validateForm() {
			this.updateFormStatus()
			this.toValidate.forEach(item => {
				if (!!item.value) {
					item.status = true;
					item.message = '';
					if (!!item.validation) {
						item.validation.forEach(validationItem => {
							if (validationItem.type === 'email') {
								item.status = !!this.validateEmail(item.value);
								item.message = !!this.validateEmail(item.value) ? '' : '- Voer een geldig emailadres in';
							}
						});
					}
				} else {
					item.status = false;
					item.message = '* Dit is een verplicht veld';
				}
			});
			this.applyValidationMessages();
		},
		applyValidationMessages() {
			this.toValidate.forEach(item => {
				if (!!!item.status) {
					let parent = !!item.nodes.length ? item.nodes[0].parentNode : item.nodes.parentNode;
					parent.classList.add('js-validation-error');
					parent.setAttribute('js-validation-message', item.message)
				} else {
					let parent = !!item.nodes.length ? item.nodes[0].parentNode : item.nodes.parentNode;
					parent.classList.remove('js-validation-error');
					parent.removeAttribute('js-validation-message');
				}
			})
		},
	},
	mounted() {
		// let qsParsedObj = JSON.parse('{"' + decodeURI(window.location.search.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
		// this.q = qsParsedObj.q ? encodeURIComponent(qsParsedObj.q).replaceAll('%2', ' ') : '';
		this.setUp()
	},
	watch: {}
}
</script>
