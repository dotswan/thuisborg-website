<template>
	<div class="overzicht">
		<div class="overzicht-wrapper">
			<div class="title-controls">
				<h1 class="title">
					<span>Plaats uw deelname aan </span>
					<br>
					<span class="green-text">de Vastgoed Obligaties</span>
				</h1>
				<div class="controls">
					<div class="control-section">
						<span class="cs-title">Selecteer de gewenste Obligaties serie:</span>
						<ul class="options-list">
							<li class="btn btn-style"
							    :class="[{'btn-deactivate':(plan.id !== activePlan.id)}]"
							    v-for="plan in plans"
							    @click="activatePlan(plan.id)"
							>
								{{ plan.title }}
							</li>
						</ul>
					</div>
					<div class="control-section">
						<p class="cs-title navy">Beginsaldo</p>
						<ul class="options-list">
							<li class="btn btn-style"
							    :class="[{'btn-deactivate': (!!investment || (item!==investmentShortcut)) }]"
							    v-for="item in activePlan.primaryPrices"
							    @click="changeInvestment(item)">
								€ {{ euroSigned(item) }}
							</li>
							<select class="btn btn-style" :class="[{'btn-deactivate': !!!investment}]"
							        v-model="investment">
								<option :value="null">Aanpassen</option>
								<option :value="item" v-for="item in activePlan.secondaryPrices">€{{
										euroSigned(item)
								                                                                 }}
								</option>
							</select>

						</ul>
					</div>
					<div class="control-section">
						<p class="cs-title navy">Looptijd</p>
						<ul class="options-list">
							<li class="btn btn-style" :class="[{'btn-deactivate': !item.selected}]"
							    v-for="item in activePlan.calculations"
							    @click="calculationsChange(item)"
							>
								{{ item.year }} jaar
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="results">
				<div class="results-inner">
					<!--					<h2 class="title">Overzicht</h2>-->
					<div class="chart">
						<h3 class="chart-title">Obligaties serie {{ activePlan.title }}:</h3>
						<h4>Groei vermogen gedurende de looptijd van uw investering </h4>
						<highcharts :options="chartOptions"></highcharts>
					</div>
					<div class="result-actions">
						<span><b>Resultaat: </b>€ {{ euroSigned(perYear) }}  netto per jaar</span>
						<a href="#" target="_blank" class="btn btn-style-radius">Selecteer</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	computed: {
		activePlan() {
			let active = this.plans.find(x => x.active);
			return active;
		},
		percentage() {
			return this.activePlan.calculations.find(x => x.selected).profit;
		},
		years() {
			return this.activePlan.calculations.find(x => x.selected).year;
		},
		amount() {
			return !!this.investment ? this.investment : this.investmentShortcut;
		},
		perYear() {
			return (this.amount * this.percentage) / 100;
		},
		chartOptions() {
			let data = [this.amount];
			for (var i = 0; i < this.years; i++) {
				data.push(this.amount + (this.perYear * (i + 1)))
			}
			return {
				yAxis: {
					labels: {
						formatter: function (obj) {
							let formatter = v => `${(' ' + v).replace(/\B(?=(\d{3})+(?!\d))/g, '.')},-`;
							return formatter(obj.value);
						}
					},
					title: {
						text: 'Geïnvesteerd (€)',
					},
					floor: this.amount
				},
				xAxis: {
					type: 'linear',
					tickInterval: 1,
					labels: {
						// formatter: function () {
						// 	return (this.value + 1);
						// }
					},
					title: {
						text: 'Tijd (jaren)'
					},
				},
				title: {
					text: ''
				},
				series: [
					{
						data: data,
						name: 'investeringsvoordelen',
					}
				],
				legend: [],
				credits: [],
				accessibility: {
					enabled: false
				},
				tooltip: {
					formatter: function () {
						let formatter = v => `${('' + v).replace(/\B(?=(\d{3})+(?!\d))/g, '.')},-`,
								priceFormatted = formatter(this.y);
						return '<span>'
								+ '<i>Uw vermogen: </i>'
								+ '<b> € '
								+ priceFormatted
								+ '</b>'
								+ '</span>';
					}
				}
			}
		}
	},
	props: {},
	data() {
		return {
			investment: null,
			investmentShortcut: 25000,
			plans: [
				{
					id: 1,
					title: "TB19",
					active: true,
					selectedPrice: 25000,
					primaryPrices: [5000, 25000, 50000],
					secondaryPrices: [1000, 2500, 5000, 7500, 10000, 15000, 20000, 30000, 35000, 40000, 45000, 55000, 60000, 65000, 70000, 75000, 80000],
					calculations: [
						{
							selected: true,
							year: 1,
							profit: 4.5
						},
						{
							selected: false,
							year: 3,
							profit: 5.5
						},
						{
							selected: false,
							year: 5,
							profit: 6.5
						}
					]
				},
				{
					id: 2,
					title: "TB20",
					active: false,
					selectedPrice: 250000,
					primaryPrices: [100000, 250000, 500000],
					secondaryPrices: [150000, 200000, 300000, 350000, 400000, 450000],
					calculations: [
						{
							selected: true,
							year: 3,
							profit: 7
						},
						{
							selected: false,
							year: 5,
							profit: 8
						},
					]
				}
			],
		};
	},
	methods: {
		euroSigned: v => `${(' ' + v).replace(/\B(?=(\d{3})+(?!\d))/g, '.')},-`,
		activatePlan(id) {
			this.plans.map(x => {
				x.active = (x.id === id)
			});
			this.investment = null;
			this.investmentShortcut = this.activePlan.selectedPrice;

		},
		changeInvestment(invstmnt) {
			this.investmentShortcut = invstmnt;
			this.investment = null
		},
		calculationsChange(calc) {
			this.plans.map(plan => {
				if (plan.id === this.activePlan.id) {
					plan.calculations.map(item => {
						item.selected = (item.year === calc.year);
					})
				}
			});
		}
	},
}
</script>
