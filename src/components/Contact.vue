<template>
  <div class="contact-us-modal">
    <div class="wrapper">
      <div class="img-cont">
        <img src="/template/images/contact-image.jpg" />
      </div>
      <p class="hinter">
        Wij zullen telefonisch contact met u opnemen om dit beleggingspand met u te bespreken. Wij staan u graag te woord en informeren u geheel vrijblijvend
        over de mogelijkheden.
      </p>
      <form-handler
        :validations="['SingleLine', 'SingleLine1', { name: 'Email', validation: 'email' }, 'SingleLine2', 'DecisionBox']"
        class="contact-us-modal-form"
      >
        <form
          action="https://forms.zohopublic.eu/soliditry/form/TBbeleggingspandenmeerinfoaanvraagbeleggingspand/formperma/ij00AuSaddfDR2paSV-As-lZwkwzSx31Tk2PyMXIRtw/htmlRecords/submit"
          name="form"
          method="POST"
          onSubmit='javascript:document.charset="UTF-8";'
          accept-charset="UTF-8"
          enctype="multipart/form-data"
          id="form"
        >
          <div class="form_hiddens">
            <input type="hidden" name="zf_referrer_name" value="" />
            <!-- To Track referrals , place the referrer name within the " " in the above hidden input field -->
            <input type="hidden" name="zf_redirect_url" value="" />
            <!-- To redirect to a specific page after record submission , place the respective url within the " " in the above hidden input field -->
            <input type="hidden" name="zc_gad" value="" />
            <!-- If GCLID is enabled in Zoho CRM Integration, click details of AdWords Ads will be pushed to Zoho CRM -->
            <input type="hidden" name="utm_source" value="" />
            <input type="hidden" name="utm_medium" value="" />
            <input type="hidden" name="utm_campaign" value="" />
            <input type="hidden" name="utm_term" value="" />
            <input type="hidden" name="utm_content" value="" />
          </div>
          <div class="fields-wrapper">
            <div class="form-row">
              <div class="form-row__label">
                <p>Voornaam:*</p>
              </div>
              <div class="form-row__input">
                <input type="text" name="SingleLine" checktype="c1" value="" maxlength="255" fieldtype="1" placeholder="Voornaam" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-row__label">
                <p>Achternaam:*</p>
              </div>
              <div class="form-row__input">
                <input type="text" name="SingleLine1" checktype="c1" value="" maxlength="255" fieldType="1" placeholder="Achternaam" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-row__label">
                <p>Uw e-mailadres:*</p>
              </div>
              <div class="form-row__input">
                <input fieldType="9" type="text" maxlength="255" name="Email" checktype="c5" value="" placeholder="E-mailadres" />
              </div>
            </div>
            <div class="form-row double">
              <div class="form-row__label">
                <p>Uw telefoonnummer:*</p>
              </div>
              <div class="form-row__input">
                <input type="text" name="SingleLine2" checktype="c1" value="" maxlength="255" fieldType="1" placeholder="Telefoonnummer" />
              </div>
            </div>
          </div>
          <div class="agreement-submit">
            <div class="agreement">
              <input type="checkbox" checktype="c1" id="DecisionBoxcontactform" name="DecisionBox" />
              <label for="DecisionBoxcontactform"
                >Ik accepteer de <a class="link" href="https://thuisborg.nl/docs/2.-AV-Thuisborg-2021-v3-NL.pdf" target="_blank">voorwaarden</a> van
                Thuisborg.</label
              >
            </div>
            <button class="btn v2 fh-flexible-btn-color">Neem contact op</button>
          </div>
        </form>
      </form-handler>
    </div>
  </div>
</template>

<script>
export default {
  name: "Contact",
  computed: {
    status() {
      return false;
    },
  },
  props: {},
  data() {
    return {};
  },
  methods: {
    setUp() {
      console.log("setup");
    },
  },
};
</script>
