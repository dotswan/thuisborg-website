<template>
	<div class="calculator">
		<!--		<div class="results-window" style="position: fixed; width: 400px; bottom: 0; right:0; height: 100%; overflow: scroll; display: flex; align-items: flex-end">-->
		<!--			<div class="calculator__result" style="width: 100% !important;">-->
		<!--				<div class="">-->
		<!--					<p>Bij aanvang van de verzilvering-->
		<!--					   ontvangt u een bedrag van-->
		<!--						<span class="highlight"> <span class="price">EUR {{ result1 }}</span></span> op uw-->
		<!--					   rekening.-->
		<!--					</p>-->
		<!--				</div>-->
		<!--				<div class="">-->
		<!--					<p>Daarbij lost u ook een open staande hypotheek af van <span class="highlight"> <span-->
		<!--							class="price">EUR {{-->
		<!--							result2-->
		<!--					                      }}</span></span> gebruikt om-->
		<!--					   uw lopende hypotheek helemaal af te lossen.</p>-->
		<!--				</div>-->
		<!--				<div class="">-->
		<!--					<p>Tijdens de bewoning van-->
		<!--						<span class="highlight">-->
		<!--								<span class="price">{{ result3 }}</span>-->
		<!--							</span>-->
		<!--					   jaar als-->
		<!--					   looptijd-->
		<!--					   van de-->
		<!--					   verzilvering-->
		<!--					   (altijd-->
		<!--					   verlengbaar; u hoeft nooit uw huis uit)</p>-->
		<!--					<br>-->
		<!--					<p>-->
		<!--							<span v-if="result4 > 0" class="highlight">-->
		<!--								ontvangt u per maand een aanbetaling op de koopsom van uw woning-->
		<!--							</span>-->
		<!--						<span v-else-if="result4 < 0" class="highlight">-->
		<!--								betaalt u een vaste, jaarlijks gelijk blijvende huur-->
		<!--							</span>-->
		<!--						<span v-else class="highlight">-->
		<!--								ontvangt of betaalt u geen bedragen van of aan Thuisborg-->
		<!--							</span>-->
		<!--						<span>-->
		<!--								<span> van netto </span><span class="highlight"><span-->
		<!--								class="price">EUR {{ euroSigned(result4) }}</span></span>-->
		<!--							</span>-->
		<!--					</p>-->
		<!--				</div>-->
		<!--				<div class="">-->
		<!--					<p>En wanneer u de woning uiteindelijk verlaat ontvangt u een extra bedrag van <span-->
		<!--							class="highlight"><span class="price">EUR {{ result5 }}</span></span>-->
		<!--					</p>-->
		<!--				</div>-->
		<!--				<div class="calculator__result__section __green">-->
		<!--					<p>In totaal ontvangt u daarmee-->
		<!--					   dan <span class="highlight"><span class="price">EUR {{ euroSigned(j175) }}</span></span>-->
		<!--					   ofwel-->
		<!--						<span-->
		<!--								class="highlight">{{ j173 }}%</span>-->
		<!--					   van uw huidige woningwaarde.</p>-->
		<!--				</div>-->
		<!--			</div>-->
		<!--		</div>-->
		<!--		<h2 @click="setTestValues()">test</h2>-->
		<h2 class="section-title" v-if="step==1 || step == 2">Woningwaarde calculator</h2>
		<h2 class="section-title" v-else>Uw vermogensplanning</h2>
		<div class="calculator__fields" ref="starter">
			<div class="steps-cont" :class="['step-'+step, {'active':step==1}]">
				<div class="calculator__header">
					<h2>Ontvang nu tot 125% van de waarde van uw woning!</h2>
					<h3>in 10 stappen naar uw beste vermogensplanning</h3>
					<a href="/template/docs/2.ThuisborgCalculatorDisclaimerv2.pdf" target="_blank">
						<b>Lees hier de disclaimer voor u deze calculator gebruikt, het gaat om een indicatieve
						   berekening.</b>
					</a>
				</div>
				<div class="calculator__row">
					<p class="calculator__row__title">
						<span>Wat is volgens u de vrije verkoopwaarde van uw woning op dit moment?</span>
						<!--						<span v-tooltip="{content:'Schuif tussen minimum en maximum waarde'}"></span>-->
						<span></span>
					</p>
					<div class="calculator__row__field price-input">
						<price-input v-model="fields.field1" min="50000" max="2000000" type="number"
						             placeholder="Voer bedrag in" class="cw-40 price"></price-input>
						<!--						<input placeholder="Voer bedrag in" v-model="fields.field1"-->
						<!--						       type="number" class="cw-40 price" min="50000" max="2000000">-->
						<!--						<vue-slider :min="50000"-->
						<!--						            :max="2000000"-->
						<!--						            :interval="1000"-->
						<!--						            :tooltip-formatter="euroFormatter"-->
						<!--						            :dotSize="30"-->
						<!--						            :height="12"-->
						<!--						            direction="ltr"-->
						<!--						            tooltip="active"-->
						<!--						            v-model="fields.field1"></vue-slider>-->
					</div>
					<!--					<div class="calculator__row__value">-->
					<!--						<p><span class="price">{{ euroSigned(parseInt(fields.field1)) }}</span></p>-->
					<!--					</div>-->
				</div>
				<div class="calculator__row">
					<p class="calculator__row__title">
						<span>In welke plaats of gemeente staat de woning?</span>
						<span v-tooltip="{content:'Voer plaatsnaam in'}"></span>
					</p>
					<div class="calculator__row__field">
						<input type="text" v-model="fields.field2" placeholder="Voer plaatsnaam in" class="cw-40">
					</div>
				</div>
				<div class="calculator__row">
					<p class="calculator__row__title cw-10">
						<span>Hoe groot is uw ruimte aan grond rondom deze woning?</span>
						<span v-tooltip="{content:'Selecteer'}"></span>
					</p>
					<div class="calculator__row__field">
						<select type="text" v-model="fields.field3" class="cw-60">
							<option value="0">Selecteer</option>
							<option value="1">Tussen 0 en 100 m2</option>
							<option value="2">Tussen 100 en 200 m2</option>
							<option value="3">Tussen 200 en 500 m2</option>
							<option value="4">Tussen 500 en 1.000 m2</option>
							<option value="5">Tussen 1.000 en 2.000 m2</option>
							<option value="6">Groter dan 2.000 m2</option>
						</select>
					</div>
				</div>
				<div class="calculator__row">
					<p class="calculator__row__title">
						<span>Hoeveel slaapkamers heeft uw woning?</span>
						<span v-tooltip="{content:'Selecteer'}"></span>
					</p>
					<div class="calculator__row__field">
						<select type="text" v-model="fields.field4" class="cw-60">
							<option value="0">Selecteer</option>
							<option value="0">1</option>
							<option value="1">2</option>
							<option value="2">3</option>
							<option value="3">4</option>
							<option value="4">5</option>
							<option value="5">6 of meer</option>
						</select>
					</div>
				</div>
				<div class="calculator__row">
					<p class="calculator__row__title">
						<span>Hoeveel jaar wilt u minimaal nog in uw woning blijven wonen?</span>
						<span v-tooltip="{content:'Schuif tusen minimum en maximum waarde'}"></span>
					</p>
					<div class="calculator__row__field cw-50">
						<vue-slider :min="0"
						            :max="30"
						            :interval=".5"
						            :dotSize="30"
						            :height="12"
						            direction="ltr"
						            tooltip="active"
						            v-model="fields.field5"></vue-slider>
					</div>
					<div class="calculator__row__value">
						<p class="year">{{ fields.field5 }}</p>
					</div>
				</div>
				<div class="calculator__row">
					<p class="calculator__row__title">
						<span>Wilt u een deel van uw woning onderverhuren tijdens bewoning?</span>
						<span v-tooltip="{content:'Selecteer'}"></span>
					</p>
					<div class="calculator__row__field">
						<select type="text" v-model="fields.field6" class="cw-50">
							<option value="2">Nee</option>
							<option value="3">Ja</option>
							<option value="1">Weet niet / Graag overleg</option>
						</select>
					</div>
				</div>
				<div class="calculator__row">
					<p class="calculator__row__title">
						<span>Is er nog een lopende hypotheek op de woning?</span>
						<span v-tooltip="{content:'Selecteer'}"></span>
					</p>
					<div class="calculator__row__field">
						<select type="text" v-model="fields.field7" class="cw-50">
							<option value="2">Nee</option>
							<option value="3">Ja</option>
							<!--							<option value="1">Weet niet / Graag overleg</option>-->
						</select>
					</div>
					<br>
					<p class="calculator__row__title cw-10" v-show="fields.field7==3">
						<span>Bij ja: wat is de openstaande hypotheekschuld?</span>
						<span v-tooltip="{content:'Schuif tusen minimum en maximum waarde'}"></span>
					</p>
					<div class="calculator__row__field price-input" v-show="fields.field7==3">
						<price-input v-model="fields.field7a" min="0" max="2500000" type="number"
						             placeholder="Voer bedrag in" class="cw-40 price"></price-input>
					</div>
				</div>
				<div class="stepchange">
					<span class="btn" @click="changeStep(2)">Volgende stap</span>
				</div>
			</div>
			<div class="steps-cont" :class="['step-'+step, {'active':step==2}]">
				<div class="calculator__row">
					<p class="calculator__row__title cw-10">
						<span>Wat wilt u bij aanvang van verzilvering netto op uw rekening ontvangen, exclusief het bedrag van uw lopende hypotheek?</span>
						<span v-tooltip="{content:'Wilt u bij aanvang van het verzilveren van uw woning meer dan EUR 50.000,- ontvangen (inclusief uw lopende hypotheek), dan maakt men gebruik van het Woningwaarde Verzilverplan. Wanneer het bedrag lager is dan EUR 50.000,- kunt u gebruik maken van het Estate Plan.'}"></span>
					</p>
					<div class="calculator__row__field price-input">
						<price-input v-model="fields.field8" min="0" max="500000" type="number"
						             placeholder="Voer bedrag in" class="cw-40 price"></price-input>
					</div>
				</div>
				<div class="calculator__row">
					<p class="calculator__row__title cw-10">
						<span>Wat wilt u deze <b class="highlight">{{ fields.field5 }} jaar</b> maandelijks ontvangen als periodieke aanbetaling op de woning?</span>
						<span v-tooltip="{content:'U maakt gebruik van ons Estate Plan wanneer u maandelijks een bedrag wenst te ontvangen als aanbetaling op de toekomstige koopsom, en deze hoger is dan het eventueel te betalen huurbedrag. Het bedrag wat u bij aanvang wenst te ontvangen is maximaal EUR 50.000,-'}"></span>
					</p>
					<div class="calculator__row__field cw-40">
						<vue-slider :min="0"
						            :max="5000"
						            :interval="100"
						            :tooltip-formatter="euroFormatter"
						            :dotSize="30"
						            :height="12"
						            direction="ltr"
						            tooltip="active"
						            v-model="fields.field9a"></vue-slider>
					</div>
					<div class="calculator__row__value">
						<p><span class="price">{{ euroSigned(fields.field9a) }}</span> <span>per maand</span></p>
					</div>
					<br></br>
					<p class="calculator__row__title cw-10">
						<span>Wat wilt u maandelijks betalen aan huur (vast bedrag) voor de woning?</span>
						<span v-tooltip="{content:'U maakt gebruik van ons Woningwaarde Verzilverplan wanneer u kiest om maandelijks een bedrag als huur te betalen, en het bedrag aan huur hoger is dan een eventuele aanbetaling.'}"></span>
					</p>
					<div class="calculator__row__field cw-40">
						<vue-slider :min="0"
						            :max="5000"
						            :interval="100"
						            :tooltip-formatter="euroFormatter"
						            :dotSize="30"
						            :height="12"
						            direction="ltr"
						            tooltip="active"
						            v-model="fields.field9b"></vue-slider>
					</div>
					<div class="calculator__row__value">
						<p><span class="price">{{ euroSigned(fields.field9b) }}</span> <span>per maand</span></p>
					</div>
				</div>
				<div class="calculator__row">
					<p class="calculator__row__title">
					<span>Bij het verlaten van uw woning ontvangt u nog een netto bedrag, na aftrek van alle lasten en kosten, als deel van de koopsom.
Wilt u daarvoor een vast of een variabel bedrag ontvangen:</span>
						<span v-tooltip="{content:'Wilt u een eindbetaling ontvangen die door de jaren heen mee verandert met de waarde van uw woning, of wilt u een eindbetaling ontvangen die vanaf het begin af aan al vastgesteld wordt?'}"></span>
					</p>
					<div class="calculator__row__field">
						<select type="text" v-model="fields.field10" class="cw-50">
							<option value="0">Nee</option>
							<option value="1">Vast</option>
							<option value="2">Variabel</option>
						</select>
					</div>
				</div>
				<div class="calculator__row">
					<p class="calculator__row__title cw-10">
						<span>Een vast netto bedrag, van</span>
						<!--						<span v-tooltip="{content:'Schuif tusen minimum en maximum waarde'}"></span>-->
					</p>
					<div class="calculator__row__field price-input">
						<price-input v-model="fields.field10a" min="0" max="2500000" type="number"
						             placeholder="Voer bedrag in" class="cw-40 price"></price-input>
					</div>
					<br>
					<p class="calculator__row__title cw-10">
						<span>Een variabel bedrag, gebaseerd op</span>
						<!--						<span v-tooltip="{content:'Schuif tusen minimum en maximum waarde'}"></span>-->
					</p>
					<div class="calculator__row__field cw-40">
						<vue-slider :min="0"
						            :max="100"
						            :interval="1"
						            :tooltip-formatter="euroFormatter"
						            :dotSize="30"
						            :height="12"
						            direction="ltr"
						            tooltip="active"
						            v-model="fields.field10b"></vue-slider>
					</div>
					<div class="calculator__row__value">
						<p>
							<span>{{ fields.field10b }}%</span>
							<span>van de waardestijging van de woning</span>
						</p>
					</div>
				</div>
				<div class="stepchange">
					<span class="btn outline green" @click="changeStep(1)">Terug</span>
					<span class="btn" @click="changeStep(3)">Volgende stap</span>
				</div>
			</div>
			<div class="steps-cont" :class="['step-'+step, {'active':step==3}]">
				<div class="calculator__result">
					<div class="calculator__result__section">
						<p>Bij aanvang van de verzilvering
						   ontvangt u een bedrag van
							<span class="highlight"> <span class="price">EUR {{ result1 }}</span></span> op uw
						   rekening.
						</p>
					</div>
					<div class="calculator__result__section">
						<p>Daarbij lost u ook een open staande hypotheek af van <span class="highlight"> <span
								class="price">EUR {{
								result2
						                      }}</span></span> gebruikt om
						   uw lopende hypotheek helemaal af te lossen.</p>
					</div>
					<div class="calculator__result__section">
						<p>Tijdens de bewoning van
							<span class="highlight">
								<span class="price">{{ result3 }}</span>
							</span>
						   jaar als
						   looptijd
						   van de
						   verzilvering
						   (altijd
						   verlengbaar; u hoeft nooit uw huis uit)</p>
						<br>
						<p>
							<span v-if="result4 > 0" class="highlight">
								ontvangt u per maand een aanbetaling op de koopsom van uw woning
							</span>
							<span v-else-if="result4 < 0" class="highlight">
								betaalt u een vaste, jaarlijks gelijk blijvende huur
							</span>
							<span v-else class="highlight">
								ontvangt of betaalt u geen bedragen van of aan Thuisborg
							</span>
							<span>
								<span> van netto </span><span class="highlight"><span
									class="price">EUR {{ euroSigned(result4) }}</span></span>
							</span>
						</p>
					</div>
					<div class="calculator__result__section">
						<p>En wanneer u de woning uiteindelijk verlaat ontvangt u een extra bedrag van <span
								class="highlight"><span class="price">EUR {{ result5 }}</span></span>
						</p>
					</div>
					<div class="calculator__result__section __green">
						<p>In totaal ontvangt u daarmee
						   dan <span class="highlight"><span class="price">EUR {{ euroSigned(j175) }}</span></span>
						   ofwel
							<span
									class="highlight">{{ j173 }}%</span>
						   van uw huidige woningwaarde.</p>
					</div>
					<div class="calculator__result__section">
						<p>Op het gebruik van deze calculator is <a target="_blank"
						                                            href="https://thuisborg.nl/template/docs/Thuisborg-Woningwaarde-Vastgoed-Obligaties-Brochure.pdf">deze
						                                                                                                                                              disclaimer</a>
						   van toepassing. Deze calculator is
						   uitsluitend een hulpmiddel en gaat om indicatieve bedragen. Laat voor een uitgebreid rapport
						   per mail hier uw gegevens achter.</p>
					</div>
				</div>
				<div class="stepchange">
					<span class="btn outline green" @click="changeStep(2)">Terug</span>
					<span class="btn send result" @click="changeStep(4)">Rapport aanvragen</span>
				</div>
			</div>
			<div class="steps-cont send-request" :class="['step-'+step, {'active':step==4}]">
				<div class="calculator__row">
					<p class="calculator__row__title cw-10">
						<span>Aanhef</span>
					</p>
					<div class="calculator__row__field ">
						<select type="text" v-model="fields.aanhef" class="cw-60">
							<option value="mevrouw">Mevrouw</option>
							<option value="heer">heer</option>
						</select>
					</div>
				</div>
				<div class="calculator__row"
				     :class="[{'error': (!required['naam'].status.required || (!!required['naam'].type && !required['naam'].status.type))}]">
					<p class="calculator__row__title cw-10">
						<span>Naam</span>
					</p>
					<div class="calculator__row__field required">
						<input placeholder="Naam" v-model="fields.naam"
						       type="text" class="cw-40">
					</div>
					<div class="messages" v-show="!required['naam'].status.required || !required['naam'].status.type">
						<p v-for="error in required['naam'].message">{{ error }}</p>
					</div>
				</div>
				<div class="calculator__row"
				     :class="[{'error': (!required['email'].status.required || !required['email'].status.type)}]">
					<p class="calculator__row__title cw-10">
						<span>Email</span>
					</p>
					<div class="calculator__row__field required">
						<input placeholder="email" v-model="fields.email"
						       type="text" class="cw-40">
					</div>
					<div class="messages" v-show="!required['email'].status.required || !required['email'].status.type">
						<p v-for="error in required['email'].message">{{ error }}</p>
					</div>
				</div>
				<div class="calculator__row"
				     :class="[{'error': (!required['telefoon'].status.required || !required['telefoon'].status.type)}]">
					<p class="calculator__row__title cw-10">
						<span>Telefoon</span>
					</p>
					<div class="calculator__row__field required">
						<input placeholder="telefoon" v-model="fields.telefoon"
						       type="text" class="cw-40">
					</div>
					<div class="messages"
					     v-show="!required['telefoon'].status.required || !required['telefoon'].status.type">
						<p v-for="error in required['telefoon'].message">{{ error }}</p>
					</div>
				</div>
				<div class="submit-status">
					<p v-if="sent && success" class="success">Hartelijk dank voor het invullen van de calculator. U
					                                          ontvangt de resultaten per mail.</p>
					<p v-if="sent && !success" class="error">Please check errors </p>
				</div>
				<div class="stepchange">
					<div class="btn" @click="sendResult()">
						Indienen
						<div class="loading" v-show="loading">
							<div class="load-spinner" v-show="loading">
								<div></div>
								<div></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>

export default {
	name: 'calculator',
	computed: {
		result1() {
			//{OK}
			//excel field =>  L56 (=N35) => field8
			return this.euroSigned(parseInt(this.fields.field8));
		},
		result2() {
			// {OK}
			//excel field =>  L58 (=L33)
			return this.euroSigned(parseInt(this.fields.field7a));
		},
		result3() {
			//{OK}
			//excel field =>  I60 (=L27)
			return this.fields.field5;
		},
		result4() {
			//excel field =>  G62 (=G164)
			//excel field G164 = =IF(O62>0,"ontvangt u per maand een aanbetaling op de koopsom van uw woning",IF(O62<0,"betaalt u een vaste, jaarlijks gelijk blijvende huur","ontvangt of betaalt u geen bedragen van of aan Thuisborg"))
			//means G164 = (O62>0)?"ontvangt u per maand een aanbetaling op de koopsom van uw woning":((O62<0) ? "betaalt u een vaste, jaarlijks gelijk blijvende huur":"ontvangt of betaalt u geen bedragen van of aan Thuisborg")
			return this.fields.field9a + (-this.fields.field9b);
		},
		result5() {
			// {OK}
			// excel field J181
			//=IF(J175-SUM(J177:J179)>0,J175-SUM(J177:J179),0)
			let sum = this.j175 - (this.j177 + this.j178 + this.j179);
			return this.euroSigned(sum > 0 ? sum : 0);
		},
		j162() {
			// =L19*(1+O76/100)^L76
			return this.fields.field1 * (1 + this.o76 / 100) ^ this.fields.field5;
		},
		j169() {
			//{OK}
			// excel field is H61 from other sheet which is 100
			return 100;
		},
		j170() {
			//{OK}
			return this.o116 + this.o122 + this.o126 + this.o130
		},
		j171() {
			//{OK}
			// excel =IF(N35+L33<=L27*O62,L27,0)
			return ((parseInt(this.fields.field8) + parseInt(this.fields.field7a) <= this.fields.field5 * this.o62) ? this.fields.field5 : 0);
		},
		j173() {
			//=IF(SUM(J169:J171)>Uitgangspunten!H76,Uitgangspunten!H76,SUM(J169:J171))
			let res = this.j169 + this.j170 + this.j171;
			if (res > this.constants.h76) {
				return this.constants.h76;
			} else {
				return res
			}
		},
		j175() {
			//{OK}
			// excel =J173*L19/100
			return (this.j173 * parseInt(this.fields.field1)) / 100
		},
		j178() {
			// {OK}
			// excel L58 => L33 => field7a
			return parseInt(this.fields.field7a);
		},
		j179() {
			// {OK}
			// excel =IF(O62>0,O62*12*L27,0)
			// hint *12 issue
			return (this.o62 > 0 ? (this.o62 * 12 * this.fields.field5) : 0);
		},
		j177() {
			// {OK}
			// excel L56 => N35 => field8
			return parseInt(this.fields.field8)
		},
		j93() {
			// =L80+L82+L91+(I84*O86*12)
			return parseInt(this.fields.field8) + parseInt(this.fields.field7a) + parseInt(this.result5) + (this.fields.field5 * this.o86 * 12)
		},
		l93() {
			// =J93/L19*100
			return this.j93 / this.fields.field1 * 100;
		},
		k78() {
			return this.j162 - this.fields.field1
		},
		o76() {
			return 2.5;
		},
		o62() {
			// {OK}
			// excel L40 + L42 => Inputs
			return this.fields.field9a + (-this.fields.field9b);
		},
		o86() {
			// {OK}
			//excel field  (=L40+L42)
			return parseInt(this.fields.field9a) + (-parseInt(this.fields.field9b))
		},
		o116() {
			// {OK}
			// excel = IF(L23=H111,M111,IF(L23=H112,M112,IF(L23=H113,M113,IF(L23=H114,M114,IF(L23=H115,M115,IF(L23=H116,M116,0))))))
			if (this.fields.field3 == this.constants.h111) {
				return this.constants.m111;
			} else {
				if (this.fields.field3 == this.constants.h112) {
					return this.constants.m112;
				} else {
					if (this.fields.field3 == this.constants.h113) {
						return this.constants.m113;
					} else {
						if (this.fields.field3 == this.constants.h114) {
							return this.constants.m114;
						} else {
							if (this.fields.field3 == this.constants.h115) {
								return this.constants.m115;
							} else {
								if (this.fields.field3 == this.constants.h116) {
									return this.constants.m116;
								} else {
									return 0;
								}
							}
						}
					}
				}
			}
		},
		o122() {
			// {OK}
			// excel => =IF(L25=H118,M118,IF(L25=H119,M119,IF(L25=H120,M120,IF(L25=H121,M121,IF(L25=H122,M122,IF(L25=H123,M123,0))))))
			if (this.fields.field4 == this.constants.h118) {
				return this.constants.m118
			} else {
				if (this.fields.field4 == this.constants.h119) {
					return this.constants.m119;
				} else {
					if (this.fields.field4 == this.constants.h120) {
						return this.constants.m120
					} else {
						if (this.fields.field4 == this.constants.h120) {
							return this.constants.m120
						} else {
							if (this.fields.field4 == this.constants.h121) {
								return this.constants.m121;
							} else {
								if (this.fields.field4 == this.constants.h122) {
									return this.constants.m122;
								} else {
									if (this.fields.field4 == this.constants.h123) {
										return this.constants.m123
									} else {
										return 0;
									}
								}
							}
						}
					}
				}
			}
		},
		o126() {
			// {OK}
			// excel => IF(L29=H124,M124,IF(L29=H125,M125,IF(L29=H126,M126,0)))
			if (this.fields.field6 == this.constants.h124) {
				return this.constants.m124;
			} else {
				if (this.fields.field6 == this.constants.h125) {
					return this.constants.m125;
				} else {
					if (this.fields.field6 == this.constants.h126) {
						return this.constants.m126;
					} else {
						return 0;
					}
				}
			}
		},
		o130() {
			// {OK}
			// excel => =IF(L31=H128,M128,IF(L31=H129,M129,IF(L31=H130,M130,0)))

			if (this.fields.field7 == this.constants.h128) {
				return this.constants.m128;
			} else {
				if (this.fields.field7 == this.constants.h129) {
					return this.constants.m129;
				} else {
					if (this.fields.field7 == this.constants.h130) {
						return this.constants.m130;
					} else {
						return 0;
					}
				}
			}
		},
		g166() {
			// {OK}
			// excel =IF(L45=1,"een einduitkering die meestijgt met de woningwaarde","een vast bedrag dat vooraf wordt vastgelegd")
			return this.fields.field10 === 1 ? "een einduitkering die meestijgt met de woningwaarde." : "een vast bedrag dat vooraf wordt vastgelegd.";
		},
		request() {
			return {
				fieldF11F95: this.fields.field1,
				fieldF11F96: this.fields.field2,
				fieldF11F97: this.fields.field3,
				fieldF11F98: this.fields.field4,
				fieldF11F99: this.fields.field5,
				fieldF11F100: this.fields.field6,
				fieldF11F101: this.fields.field7,
				fieldF11F102: this.fields.field7a,
				fieldF11F103: this.fields.field8,
				fieldF11F104: this.fields.field9a,
				fieldF11F105: this.fields.field9b,
				fieldF11F106: this.fields.field10,
				fieldF11F107: this.fields.field10a,
				fieldF11F108: this.calculated_results,
				fieldF11F109: this.fields.aanhef,
				fieldF11F110: this.fields.naam,
				fieldF11F111: this.fields.email,
				fieldF11F112: this.fields.telefoon,
			}
		},
		calculated_results() {
			let result = "<ul>" +
					"<li>" +
					"Bij aanvang van de verzilvering ontvangt u een bedrag van <b style='color: #0E68A5'>EUR " + this.result1 + "</b> op uw rekening." +
					"</li>" +
					"<li>" +
					"Daarbij lost u ook een open staande hypotheek af van <b style='color: #0E68A5'>EUR " + this.result2 + "</b>." +
					"</li>" +
					"<li>" +
					"Tijdens de bewoning van <b style='color: #0E68A5'>" + this.result3 + " </b> jaar als looptijd van de verzilvering (altijd verlengbaar; u hoeft nooit uw huis uit) " +
					(this.result4 == 0 ? "Ontvangt of betaalt u geen bedragen van of aan Thuisborg van netto <b style='color: #0E68A5'>EUR 0</b> " : (this.result4 > 0 ? "Ontvangt u per maand een aanbetaling op de koopsom van uw woning van netto <b style='color: #0E68A5'>EUR " + this.euroSigned(this.result4) + "</b>" : "")) + "." +
					"</li>" +
					"<li>" +
					"En wanneer u de woning uiteindelijk verlaat ontvangt u een extra bedrag van <b style='color: #0E68A5'>EUR " + this.result5 + "</b>." +
					"</li>" +
					"<li>" +
					"In totaal ontvangt u daarmee dan <b style='color: #0E68A5'>EUR " + this.euroSigned(this.j175) + " </b> ofwel <b style='color: #0E68A5'>" + this.j173 + "%</b> van uw huidige woningwaarde." +
					"</li>" +
					"</ul>";
			let addedDetails = "<br><hr>" +
					"<h3>Verdere specificatie</h3>" +
					"<ul>" +
					"<li>" +
					"U komt in aanmerking of u heeft gekozen voor het " + "<b style='color: #0E68A5'>Thuisborg Verzilver Plan</b>." +
					"</li>" +
					"<li>" +
					"Wij verwachten dat een huis zoals het uwe in een periode van <b style='color: #0E68A5'>" +
					this.fields.field5 + " jaar</b>, per jaar gemiddeld <b style='color: #0E68A5'>" +
					this.o76 + "</b>% in waarde toeneemt; dat zou in totaal opleveren <b style='color: #0E68A5'>EUR " + this.euroSigned(this.k78) +
					"</b> dus tot woning eindwaarde een bedrag van in totaal <b style='color: #0E68A5'>EUR " + this.euroSigned(this.j162) + "</b>." +
					"</li>" +
					"<li>" +
					"Bij aanvang van de verzilvering ontvangt u een bedrag van <b style='color: #0E68A5'> EUR " + this.euroSigned(parseInt(this.fields.field8)) + "</b> op uw rekening." +
					"</li>" +
					"<li>" +
					"Daarbij lost u ook een open staande hypotheek af van <b style='color: #0E68A5'>EUR " + this.euroSigned(parseInt(this.fields.field7a)) + "</b>." +
					"</li>" +
					"<li>" +
					"Tijdens de bewoning van <b style='color: #0E68A5'>" + this.fields.field5 + " jaar </b> als looptijd van de verzilvering (altijd verlengbaar; u hoeft nooit uw huis uit) " +
					(this.result4 == 0 ? "ontvangt of betaalt u geen bedragen van of aan Thuisborg van netto <b style='color: #0E68A5'>EUR 0</b> " : (this.result4 > 0 ? "ontvangt u per maand een aanbetaling op de koopsom van uw woning van netto <b style='color: #0E68A5'>EUR " + this.euroSigned(this.result4) + "</b>" : "")) +
					" netto per maand." + // this is removed from here => <b style='color: #0E68A5'>" + (!!this.o62 ? this.euroSigned(this.o62): '') + "</b>"
					"</li>" +
					"<li>" +
					"U woont zo lang in de woning als u dat wilt. Wanneer u de woning verlaat, ontvangt u een einduitkering als laatste termijn van de koopsom van uw woning. U heeft gekozen voor: <b style='color: #0E68A5'>" + this.g166 + "</b>." +
					"</li>" +
					"<li>" +
					"Uw einduitkering komt daarmee op netto: <b style='color: #0E68A5'>EUR " + this.result5 + " </b>." +
					"</li>" +
					"<li>" +
					"In totaal ontvangt u dan <b style='color: #0E68A5'>EUR " + this.euroSigned(this.j175) + "</b> ofwel <b style='color: #0E68A5'>" +
					Math.ceil(this.j173) + "%</b> van uw huidige woningwaarde." +
					"</li>" +
					"</ul>";
			result += addedDetails;
			return result;
		}
	},
	props: {},
	data() {
		return {
			loading: false,
			sent: false,
			success: false,
			step: 1,
			constants: {
				//h
				h76: 125,
				h111: 1,
				h112: 2,
				h113: 3,
				h114: 4,
				h115: 5,
				h116: 6,
				h118: 1,
				h119: 2,
				h120: 3,
				h121: 4,
				h122: 5,
				h123: '',
				h124: 1,
				h125: 2,
				h126: 3,
				h128: 1,
				h129: 2,
				h130: 3,

				//m
				m111: 10,
				m112: 5,
				m113: 2,
				m114: 2,
				m115: 5,
				m116: 10,
				m118: 0,
				m119: 1,
				m120: 3,
				m121: 5,
				m122: 10,
				m123: '',
				m124: 5,
				m125: 0,
				m126: 10,
				m128: 5,
				m129: 10,
				m130: 0,
			},
			fields: {
				aanhef: "mevrouw",
				naam: "",
				email: "",
				telefoon: "",
				field1: 387500,         //excel field =>  L19 (=Uitgangspunten!N37) [ input ]
				field2: null,
				field3: 1,              //excel field => L23 [ input ]
				field4: 3,              //excel field => L25 [ input ]
				field5: 15,           //excel field => L27 (=Uitgangspunten!N38) [ input ]
				field6: 2,              //excel field => L29 (=1) [ input ]
				field7: 2,              //excel field => L31 (=1) [ input ]
				field7a: 0,         //excel field => L33 (=G134) [ input ]
				field8: 57500,          //excel field => N35 (=Uitgangspunten!N39-L33) [n39 = input, l33 = field7a] {change value should be updated on change}
				field9a: 1500,             //excel field => L40 (=Uitgangspunten!N41) [ input ] ((default was 750))
				field9b: 500,             //excel field => L42 (=Uitgangspunten!N40) [ input ] ((default was -750))
				field10: 0,             //excel field => L45 (=G146) => (=Uitgangspunten!H69) => [is 0]
				field10a: 190000,       //excel field => J47 (=Uitgangspunten!H67) [ input ]
				field10b: 25,           //excel field => J49 (=25)
			},
			required: {
				naam: {
					step: 4,
					status: {
						required: true
					},
					message: []
				},
				telefoon: {
					step: 4,
					status: {
						required: true
					},
					message: []
				},
				email: {
					step: 4,
					type: 'email',
					status: {
						required: true,
						type: true,
					},
					message: []
				}
			},
			euroFormatter: v => `EUR${('' + v).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`,
			euroSigned: v => `${('' + v).replace(/\B(?=(\d{3})+(?!\d))/g, '.')},-`,
		}
	},
	methods: {
		setTestValues() {
			this.fields.field1 = 229000;
			this.fields.field3 = 1;
			this.fields.field4 = 3;
			this.fields.field5 = 10;
			this.fields.field6 = 1;
			this.fields.field7 = 2;
			this.fields.field7a = 60000;
			this.fields.field8 = 40000;
			this.fields.field9a = 1000;
			this.fields.field9b = 0;
			this.fields.field10 = 2;
			this.fields.field10a = 0;
			this.fields.field10b = 25;
			console.log(this.fields)
		},
		changeStep(inpt) {
			window.scrollTo({top: this.$refs.starter.offsetTop});
			this.step = inpt;
		},
		recalculate() {

			console.log(this.result5);
		},
		requiredCheck() {
			let canSubmit = true;
			for (const [key, value] of Object.entries(this.required)) {
				this.required[key].message = [];
				if (!!this.fields[key]) {
					this.required[key].status.required = true;
					if (!!this.required[key].type && this.required[key].type == 'email') {
						if (this.validateEmail(this.fields[key])) {
							this.required[key].status.type = true
						} else {
							this.required[key].status.type = false
							canSubmit = false;
							this.required[key].message.push('Please enter valid email');
						}
					}
				} else {
					this.required[key].message.push('Dit is een verplicht veld');
					this.required[key].status.required = false;
					canSubmit = false;
				}
			}
			return canSubmit;
		},
		validateEmail(email) {
			return String(email)
					.toLowerCase()
					.match(
							/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
					);
		},
		generateFormData() {
			let formData = new FormData();
			for (const [key, value] of Object.entries(this.request)) {
				formData.append(key, value);
			}
			return formData;
		},
		sendResult() {
			if (this.requiredCheck()) {
				this.loading = true;
				Axios({
					method: "POST",
					url: 'https://mijn.thuisborg.nl/api/forms/submit/tb_calculator_new',
					data: this.generateFormData()
				}).then(response => {
					this.sent = true;
					this.success = true;
					this.loading = false;
					console.log(response)
				}).catch(error => {
					this.sent = true;
					this.success = false;
					this.loading = false;
					console.log(error)
				});
			}
		},
	},
	mounted() {
	},
	watch: {
		fields: {
			immediate: true,
			deep: true,
			handler(val) {
				this.recalculate();
				this.requiredCheck();
			}
		}
	}
}
</script>
