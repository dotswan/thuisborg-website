<template>
  <div class="middle standard">
    <div class="al-center btns-cont">
      <span @click="showEstatePlan" class="btn js__tabs_toggler" :class="getButtonClasses(isVerzilverPlanVisible)">Woningwaarde Estate Plan</span>
      <span @click="showVerzilverPlan" class="btn js__tabs_toggler" :class="getButtonClasses(isEstatePlanVisible)">Woningwaarde Verzilverplan</span>
    </div>
  </div>
  <div class="middle standard tabs-main-cont">
    <div v-if="isEstatePlanVisible" class="tab-5steps tabs" :class="[{ mobile: $store.getters.getMobile.mobile }]" handle-url="hash">
      <ul class="nav">
        <li v-for="(tab, index) in tabs" :key="index" class="nav-item" :class="{ active: activeTab === index }" @click="switchTab(index)" :title="tab.title">
          {{ tab.title }}
        </li>
      </ul>
      <div class="tab-contents">
        <div v-for="(tab, index) in tabs" :key="index" class="tab" :class="{ active: activeTab === index }" :data-tab-title="tab.title">
          <p>{{ tab.content }}</p>
        </div>
      </div>
    </div>

    <div v-if="isVerzilverPlanVisible" class="tab-5steps tabs" :class="[{ mobile: $store.getters.getMobile.mobile }]" handle-url="hash">
      <ul class="nav">
        <li
          v-for="(tab, index) in verzilverTabs"
          :key="index"
          class="nav-item"
          :class="{ active: activeVerzilverTab === index }"
          @click="switchVerzilverTab(index)"
          :title="tab.title"
        >
          {{ tab.title }}
        </li>
      </ul>
      <div class="tab-contents">
        <div v-for="(tab, index) in verzilverTabs" :key="index" class="tab" :class="{ active: activeVerzilverTab === index }" :data-tab-title="tab.title">
          <p>{{ tab.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 0,
      activeVerzilverTab: 0,
      isEstatePlanVisible: true, 
      isVerzilverPlanVisible: false,
      tabs: [
        {
          title: "Stap 1 - Intake",
          content: "In een telefonisch intakegesprek worden de mogelijkheden met u besproken. Aanvullend kan er nog informatie naar u worden gestuurd.",
        },
        {
          title: "Stap 2 - Waardebepaling",
          content:
            "Bij interesse zal Thuisborg voor u een waardebepaling van de woning opvragen. De kosten hiervoor EUR 50,-. Deze kosten zullen bij u in rekening worden gebracht. Wanneer wij tot overeenstemming komen nemen wij deze kosten over. Op basis van deze waardebepaling zal een indicatieve berekening worden gemaakt.",
        },
        {
          title: "Stap 3 - Berekening",
          content: "Zodra deze indicatie voor u bespreekbaar is, zullen wij uw woning komen bezichtigen.",
        },
        {
          title: "Stap 4 - Voorstel",
          content:
            "Op basis van ons overleg, de bezichtiging en de verstrekte informatie zal een NWWI-taxatie en eventueel een bouwkundige keuring plaatsvinden. De kosten van deze taxatie zijn voor uw rekening, maar worden overgenomen wanneer wij tot een transactie komen. Op basis van de NWWI-taxatie zullen wij een voorstel doen.",
        },
        {
          title: "Stap 5 - Overeenkomst",
          content:
            "Na akkoord van dit voorstel wordt de koopovereenkomst opgemaakt, hierin is het recht van hypotheek op (de verkoopopbrengst van) uw woning opgenomen, als aanvullende zekerheid voor Thuisborg. Dit recht van hypotheek wordt door de notaris vastgelegd. Een uittreksel van onze koopovereenkomst wordt bij het Kadaster gedeponeerd.",
        },
      ],
      verzilverTabs: [
        {
          title: "Stap 1 - Intake",
          content: "In een telefonisch intakegesprek worden de mogelijkheden met u besproken. Aanvullend kan er nog informatie naar u worden gestuurd.",
        },
        {
          title: "Stap 2 - Waardebepaling",
          content:
            "Wanneer u uw woning wilt verzilveren via Thuisborg of door plaatsing op Borgplaats, zal Thuisborg een waardebepaling van de woning opvragen. De kosten hiervoor bedragen EUR 50,- en zullen bij u in rekening worden gebracht. Wanneer Thuisborg uw woning verzilvert of wanneer er via Borgplaats een bemiddeling plaats vindt, nemen wij deze kosten over.",
        },
        {
          title: "Stap 3 - Berekening",
          content:
            "Thuisborg zal vervolgens een indicatieve berekening maken gebaseerd op de waardebepaling en de door u verstrekte gegevens. Zodra wij overgaan tot bezichtiging van uw woning dient er een overeenkomst tot dienstverlening getekend te worden.",
        },
        {
          title: "Stap 4 - Voorstel",
          content:
            "Komen de partijen tot overeenstemming over de prijzen, de vergoedingen en de levering, dan zal een NWWI-taxatie en eventueel een bouwkundige keuring plaatsvinden. Op basis van de NWWI-taxatie zullen wij een definitief voorstel doen.",
        },
        {
          title: "Stap 5 - Overeenkomst",
          content:
            "Na akkoord van dit voorstel worden de huur- en koopovereenkomst opgemaakt. De overdracht van de woning zal plaatsvinden bij een door Thuisborg aan te wijzen notaris.",
        },
      ],
    };
  },
  methods: {
    switchTab(index) {
      this.activeTab = index;
      window.location.hash = this.tabs[index].title;
    },
    switchVerzilverTab(index) {
      this.activeVerzilverTab = index;
      window.location.hash = this.verzilverTabs[index].title;
    },
    showEstatePlan() {
      this.isEstatePlanVisible = true;
      this.isVerzilverPlanVisible = false;
    },
    showVerzilverPlan() {
      this.isEstatePlanVisible = false;
      this.isVerzilverPlanVisible = true;
    },
    getButtonClasses(isActive) {
      return {
        outline: isActive,
        navy: isActive,
        verz: isActive,
      };
    },
  },
  mounted() {
    const urlHash = window.location.hash.replace("#", "");
    if (urlHash) {
      const foundTabIndex = this.tabs.findIndex((tab) => tab.title.toLowerCase() === urlHash.toLowerCase());
      if (foundTabIndex !== -1) {
        this.activeTab = foundTabIndex;
      }
      const foundVerzilverTabIndex = this.verzilverTabs.findIndex((tab) => tab.title.toLowerCase() === urlHash.toLowerCase());
      if (foundVerzilverTabIndex !== -1) {
        this.activeVerzilverTab = foundVerzilverTabIndex;
      }
    }
  },
};
</script>
