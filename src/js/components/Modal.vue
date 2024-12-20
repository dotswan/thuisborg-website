<template>
	<transition name="modal" v-show="$store.state.modal">
		<div class="modal-mask">
			<div class="modal-wrapper">
				<div class="modal-container" :class="$store.getters.getModal.class">
					<i class="close icon-cross" @click="closeModal()">×</i>
					<div class="modal-header" v-if="!!$store.getters.getModal.header">
						<slot name="header">
							<h3>{{ $store.getters.getModal.header }}</h3>
						</slot>
					</div>
					<div class="modal-body">
						<div name="body" class="body-cont body-component"
						     v-if="$store.getters.getModal.loadType=='component'">
							<component
									v-for="(component, index) in $store.getters.getModal.components"
									:key="index"
									:is="component"
									:options="$store.getters.getModal.component.options"
							/>
						</div>
						<div name="body" class="body-cont" v-else v-html="$store.getters.getModal.body"></div>
					</div>
					<div class="modal-footer" v-if="$store.getters.getModal.buttons">
						<slot name="footer">
                            <span v-for="btn in $store.getters.getModal.buttons"
                                  class="modal-default-button"
                                  :class="btn.class"
                                  @click="btn.action=='default' ? closeModal() : (btn.action(),closeModal())">
                                {{ btn.title }}
                            </span>
						</slot>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	props: {},
	data() {
		return {};
	},
	methods: {
		closeModal: function () {
			this.$store.commit('hideModal');
			this.$emit('close');
		}
	},
	created() {
		let _this = this;
		document.addEventListener("keydown", function (e) {
			if (e.keyCode == 27 && _this.$store.state.modal) {
				_this.closeModal();
			}
		});
	}
}
</script>
