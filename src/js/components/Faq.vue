<template>
	<div v-if="!!$store.getters.getFaq">
		<div v-for="faqSet in $store.getters.getFaq" class="faq-set">
			<div v-if="!!faqSet.sectionTitle" class="faqsect">
				<h2 class="faq-set__title">{{ faqSet.sectionTitle }}
				</h2>
				<div v-for="fq in faqSet.items" class="faq-rest">
					<h2 class="faq-set__title sub">{{ fq.title }}
					</h2>
					<ul>
						<li v-for="fqi in fq.items" class="faq-set__item">
							<div class="faq-set__item__header" @click="toggleFaq($event)">
								<h4>{{ fqi.question }}
								</h4>
								<span class="toggler"></span>
							</div>
							<div v-html="fqi.answer" class="faq-set__item__desc">
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div v-else class="faq-rest">
				<h2 class="faq-set__title">{{ faqSet.title }}
				</h2>
				<ul>
					<li v-for="faqItem in faqSet.items" class="faq-set__item">
						<div class="faq-set__item__header" @click="toggleFaq($event)">
							<h4>{{ faqItem.question }}
							</h4>
							<span class="toggler"></span>
						</div>
						<div v-html="faqItem.answer" class="faq-set__item__desc">
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: "faq",

	data() {
		return {};
	},
	methods: {
		toggleFaq(elm) {
			let clicked = elm.target,
					parent = clicked.closest('.faq-set__item'),
					parentStat = parent.classList.contains('active');
			if (parentStat) {
				parent.classList.remove('active');
			} else {
				parent.classList.add('active');
			}
		}
	},
	mounted() {
	}
}
</script>