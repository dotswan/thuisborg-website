<template>
  <div class="stepped-form-handler" ref="body">
    <div class="steps-cont" :class="[{ 'tab-style': !intro }]">
      <div class="steps-header" v-show="!intro">
        <a class="logo" href="/">
          <img src="/template/images/logo.png" class="logo-image" alt="Thuisborg" />
        </a>
        <h1>Inschrijving Thuisborg Woningwaarde Vastgoed Obligaties Serie TB22</h1>
      </div>
      <form
        action="https://forms.zohopublic.eu/soliditry/form/InschrijvingThuisborgWoningwaardeVastgoedObligatie6/formperma/FTyzOLITJ1F9vBbYqLdX1HeLMumojO0x9fLwJ3PULf0/htmlRecords/submit"
        method="POST"
        accept-charset="UTF-8"
        enctype="multipart/form-data"
        id="tb20form"
        onSubmit="javascript:document.charset='UTF-8'"
        ref="form"
      >
        <div class="hiddens" v-show="false">
          <input type="hidden" name="zf_referrer_name" value="" />
          <input type="hidden" name="zf_redirect_url" value="" />
          <input type="hidden" name="zc_gad" value="" />
        </div>
        <div class="tabs-cont" :class="[{ intro: intro }]">
          <div class="tab-header" v-show="currentStep.type === 'tab'">
            <div class="tab" v-for="tab in formSteps" :class="[{ active: tab.active }, 'type-' + tab.type]" v-if="tab.type === 'tab'">
              <div class="title" v-html="tab.title"></div>
            </div>
          </div>
          <div class="tab-body">
            <div class="step step-0 intro" v-show="currentStep.alias === 'intro'" :class="[{ active: currentStep.alias === 'intro' }]">
              <div class="intro">
                <div class="intro-header">
                  <a class="logo" href="/">
                    <img src="/template/images/logo.png" class="logo-image" alt="Thuisborg" />
                  </a>
                </div>
                <div class="intro-body">
                  <h1>Inschrijving Thuisborg Woningwaarde Vastgoed Obligaties Serie TB22</h1>
                  <div class="intro-text">
                    <p>
                      Voor het registratieproces is het belangrijk dat u een kopie van uw identiteitsbewijs beschikbaar hebt en dat alle informatie correct
                      wordt ingevuld. Het registratieproces duurt ongeveer <b>5 minuten</b>.
                    </p>
                    <br />
                    <p>
                      Voordat u overgaat tot de betalingstransactie, krijgt u eerst het ingevulde overzicht van uw aanvraag te zien. Controleer nogmaals of
                      alles in orde is.
                    </p>
                  </div>
                  <div class="intro-agreement">
                    <div class="agreement-item">
                      <input type="checkbox" id="agreement" name="privacy" />
                      <label for="agreement"
                        >Ik ben akkoord met de <a href=""> Algemene Voorwaarden</a>
                        en
                        <a href="">Privacy Policy</a></label
                      >
                    </div>
                    <div class="agreement-item">
                      <input type="checkbox" id="instructies" name="instructions" />
                      <label for="instructies">Ik heb de instructies gelezen en ben klaar om verder te gaan</label>
                    </div>
                  </div>
                  <div class="submit-bar">
                    <span @click="changeStep('next')" class="btn reg-btn" :class="[{ disabled: !isStepValid }]">Begin met inschrijving</span>
                  </div>
                </div>
                <div class="intro-footer">
                  <img src="/template/images/schermafbeelding.png" class="afm" alt="schermafbeelding" />
                  <img src="/template/images/Secure-payments.png" class="logos" alt="Secure-payments" />
                </div>
              </div>
            </div>
            <div class="step step-1" v-show="currentStep.alias === 'step1'" :class="[{ active: currentStep.alias === 'step1' }]">
              <div class="tab-wrapper">
                <p class="single-line-h2">Geïnteresseerde(n) wenst of wensen zich in te schrijven voor de volgende Obliigaties:</p>
                <p class="single-line-p bold">Thuisborg Woningwaarde Vastgoed Obligaties Serie TB22</p>
                <div class="row required">
                  <div class="label">
                    <label>Datum</label>
                  </div>
                  <div class="input">
                    <div class="date-picker-container-icon">
                      <custom-date-picker simple format="dd-MM-yyyy" name="Date" :locale-config="localeConfig" @change="datesChangeListener" />
                      <div class="icon-cont">
                        <img src="/template/images/calendar-icon.svg" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row required">
                  <div class="label">
                    <label>Deelnamebedrag</label>
                  </div>
                  <div class="input">
                    <input type="number" name="Number" maxlength="18" placeholder="" />
                  </div>
                  <div class="note">
                    <p>Nominale waarde per Obligatie € 0,01. Minimaal deelnamebedrag van € 100.000,- bij inschrijving.</p>
                  </div>
                </div>
                <!--								<div class="row" v-show="!!emissionpercentage">-->
                <!--									<div class="label">-->
                <!--										<label>Emissiekosten {{ emissionpercentage }}%</label>-->
                <!--									</div>-->
                <!--									<div class="input">-->
                <!--										<input type="text" name="Emissiekosten" v-model="emission" disabled>-->
                <!--									</div>-->
                <!--									&lt;!&ndash;									<div class="note">&ndash;&gt;-->
                <!--									&lt;!&ndash;										<p>Vast rendement wordt dan basis rendement, daar komt bovenop: de variabele&ndash;&gt;-->
                <!--									&lt;!&ndash;										   rendementsvergoeding, gebaseerd op de prijsontwikkeling van de Nederlandse&ndash;&gt;-->
                <!--									&lt;!&ndash;										   huizenmarkt, met een bandbreedte tussen -3% en 3%</p>&ndash;&gt;-->
                <!--									&lt;!&ndash;									</div>&ndash;&gt;-->
                <!--								</div>-->
                <!--								<div class="row" v-show="!!emissionpercentage">-->
                <!--									<div class="label">-->
                <!--										<label>Kortingscode</label>-->
                <!--									</div>-->
                <!--									<div class="input">-->
                <!--										<input type="text" name="SingleLine" checktype="c1" value="" maxlength="255"-->
                <!--										       fieldType=1 placeholder="" @input="fieldsChange"/>-->
                <!--									</div>-->
                <!--								</div>-->
                <!--								<div class="row"> -->
                <!--									<div class="label">-->
                <!--										<label>Totaalbedrag</label>-->
                <!--									</div>-->
                <!--									<div class="input">-->
                <!--										<input type="text" name="totalbedrag" v-model="totaalbedrag" disabled>-->
                <!--									</div>-->
                <!--									<div class="note">-->
                <!--										<p>Dit is het totale bedrag dat u dient over te maken voor deelname.</p>-->
                <!--									</div>-->
                <!--								</div>-->
                <div class="row required">
                  <div class="label">
                    <label>Looptijd (Vanaf 3 of 5 jaar)</label>
                  </div>
                  <div class="input">
                    <div class="checkbox-group">
                      <!--											<div class="checkbox-set">-->
                      <!--												<input type="radio" name="checkbox" value="1 jaar" id="Looptijd-1">-->
                      <!--												<label for="Looptijd-1">1 jaar</label>-->
                      <!--											</div>-->
                      <div class="checkbox-set">
                        <input type="radio" name="checkbox" value="3 jaar" id="Looptijd-3" />
                        <label for="Looptijd-3">3 jaar</label>
                      </div>
                      <div class="checkbox-set">
                        <input type="radio" name="checkbox" value="5 jaar" id="Looptijd-5" />
                        <label for="Looptijd-5">5 jaar</label>
                      </div>
                    </div>
                  </div>
                </div>
                <!--								<div class="row required" v-show="isKeuze">-->
                <!--									<div class="label">-->
                <!--										<label>Keuze optie Prijsontwikkeling Woningmarkt -3% / +3%</label>-->
                <!--									</div>-->
                <!--									<div class="input">-->
                <!--										<div class="radio-group">-->
                <!--											<div class="radio-set">-->
                <!--												<input type="radio" id="Keuze-ja" name="Radio"-->
                <!--												       value="Ja">-->
                <!--												<label for="Keuze-ja">Ja</label>-->
                <!--											</div>-->
                <!--											<div class="radio-set">-->
                <!--												<input type="radio" id="Keuze-Nee" name="Radio"-->
                <!--												       value="Nee">-->
                <!--												<label for="Keuze-Nee">Nee</label>-->
                <!--											</div>-->
                <!--										</div>-->
                <!--									</div>-->
                <!--									<div class="note">-->
                <!--										<p>Vast rendement wordt dan basis rendement, daar komt bovenop: de variabele-->
                <!--										   rendementsvergoeding, gebaseerd op de prijsontwikkeling van de Nederlandse-->
                <!--										   huizenmarkt, met een bandbreedte tussen -3% en 3%.</p>-->
                <!--									</div>-->
                <!--								</div>-->
              </div>
              <div class="tab-footer">
                <span @click="changeStep('next')" class="btn reg-btn" :class="[{ disabled: !isStepValid }]">Volgende </span>
              </div>
            </div>
            <div class="step step-2" v-show="currentStep.alias === 'step2'" :class="[{ active: currentStep.alias === 'step2' }]">
              <div class="tab-wrapper">
                <p class="single-line-h2">Contactgegevens obligatiehouder</p>
                <div class="row">
                  <div class="input checkbox-set">
                    <input type="checkbox" id="DecisionBox" name="DecisionBox" v-model="organization" />
                    <label for="DecisionBox">Ik teken namens een rechtspersoon</label>
                  </div>
                  <div class="note">
                    <p>Indien van toepassing</p>
                  </div>
                </div>
                <div v-show="organization" class="row">
                  <div class="label">
                    <label>Namens rechtspersoon</label>
                  </div>
                  <div class="input">
                    <div class="multi-fields col-2">
                      <div class="col">
                        <div class="note">Functie</div>
                        <input type="text" maxlength="255" name="Address1_AddressLine1" checktype="c1" placeholder="" />
                      </div>
                      <div class="col">
                        <div class="note">Statutaire naam</div>
                        <input type="text" maxlength="255" name="Address1_AddressLine2" checktype="c1" placeholder="" />
                      </div>
                      <div class="col">
                        <div class="note">Registratienummer</div>
                        <input type="text" maxlength="255" name="Address1_City" checktype="c1" placeholder="" />
                      </div>
                      <div class="col">
                        <div class="note">Vestigingsland</div>
                        <select name="Address1_Country">
                          <option value="">-Select-</option>
                          <option>&Aring;land Islands</option>
                          <option>Afghanistan</option>
                          <option>Akrotiri</option>
                          <option>Albania</option>
                          <option>Algeria</option>
                          <option>American Samoa</option>
                          <option>Andorra</option>
                          <option>Angola</option>
                          <option>Anguilla</option>
                          <option>Antarctica</option>
                          <option>Antigua and Barbuda</option>
                          <option>Argentina</option>
                          <option>Armenia</option>
                          <option>Aruba</option>
                          <option>Ashmore and Cartier Islands</option>
                          <option>Australia</option>
                          <option>Austria</option>
                          <option>Azerbaijan</option>
                          <option>Bahrain</option>
                          <option>Bangladesh</option>
                          <option>Barbados</option>
                          <option>Bassas Da India</option>
                          <option>Belarus</option>
                          <option>Belgium</option>
                          <option>Belize</option>
                          <option>Benin</option>
                          <option>Bermuda</option>
                          <option>Bhutan</option>
                          <option>Bolivia</option>
                          <option>Bosnia and Herzegovina</option>
                          <option>Botswana</option>
                          <option>Bouvet Island</option>
                          <option>Brazil</option>
                          <option>British Indian Ocean Territory</option>
                          <option>British Virgin Islands</option>
                          <option>Brunei</option>
                          <option>Bulgaria</option>
                          <option>Burkina Faso</option>
                          <option>Burma</option>
                          <option>Burundi</option>
                          <option>Cambodia</option>
                          <option>Cameroon</option>
                          <option>Canada</option>
                          <option>Cape Verde</option>
                          <option>Caribbean Netherlands</option>
                          <option>Cayman Islands</option>
                          <option>Central African Republic</option>
                          <option>Chad</option>
                          <option>Chile</option>
                          <option>China</option>
                          <option>Christmas Island</option>
                          <option>Clipperton Island</option>
                          <option>Cocos &#x28;Keeling&#x29; Islands</option>
                          <option>Colombia</option>
                          <option>Comoros</option>
                          <option>Cook Islands</option>
                          <option>Coral Sea Islands</option>
                          <option>Costa Rica</option>
                          <option>Cote D&#x27;Ivoire</option>
                          <option>Croatia</option>
                          <option>Cuba</option>
                          <option>Cura&ccedil;ao</option>
                          <option>Cyprus</option>
                          <option>Czech Republic</option>
                          <option>Democratic Republic of the Congo</option>
                          <option>Denmark</option>
                          <option>Dhekelia</option>
                          <option>Djibouti</option>
                          <option>Dominica</option>
                          <option>Dominican Republic</option>
                          <option>Ecuador</option>
                          <option>Egypt</option>
                          <option>El Salvador</option>
                          <option>Equatorial Guinea</option>
                          <option>Eritrea</option>
                          <option>Estonia</option>
                          <option>Ethiopia</option>
                          <option>Europa Island</option>
                          <option>Falkland Islands &#x28;Islas Malvinas&#x29;</option>
                          <option>Faroe Islands</option>
                          <option>Federated States of Micronesia</option>
                          <option>Fiji</option>
                          <option>Finland</option>
                          <option>France</option>
                          <option>French Guiana</option>
                          <option>French Polynesia</option>
                          <option>French Southern and Antarctic Lands</option>
                          <option>Gabon</option>
                          <option>Gaza Strip</option>
                          <option>Georgia</option>
                          <option>Germany</option>
                          <option>Ghana</option>
                          <option>Gibraltar</option>
                          <option>Glorioso Islands</option>
                          <option>Greece</option>
                          <option>Greenland</option>
                          <option>Grenada</option>
                          <option>Guadeloupe</option>
                          <option>Guam</option>
                          <option>Guatemala</option>
                          <option>Guernsey</option>
                          <option>Guinea</option>
                          <option>Guinea-bissau</option>
                          <option>Guyana</option>
                          <option>Haiti</option>
                          <option>Heard Island and Mcdonald Islands</option>
                          <option>Holy See &#x28;Vatican City&#x29;</option>
                          <option>Honduras</option>
                          <option>Hong Kong</option>
                          <option>Hungary</option>
                          <option>Iceland</option>
                          <option>India</option>
                          <option>Indonesia</option>
                          <option>Iran</option>
                          <option>Iraq</option>
                          <option>Ireland</option>
                          <option>Isle of Man</option>
                          <option>Israel</option>
                          <option>Italy</option>
                          <option>Jamaica</option>
                          <option>Jan Mayen</option>
                          <option>Japan</option>
                          <option>Jersey</option>
                          <option>Jordan</option>
                          <option>Juan De Nova Island</option>
                          <option>Kazakhstan</option>
                          <option>Kenya</option>
                          <option>Kiribati</option>
                          <option>Kosovo</option>
                          <option>Kuwait</option>
                          <option>Kyrgyzstan</option>
                          <option>Laos</option>
                          <option>Latvia</option>
                          <option>Lebanon</option>
                          <option>Lesotho</option>
                          <option>Liberia</option>
                          <option>Libya</option>
                          <option>Liechtenstein</option>
                          <option>Lithuania</option>
                          <option>Luxembourg</option>
                          <option>Macau</option>
                          <option>Macedonia</option>
                          <option>Madagascar</option>
                          <option>Malawi</option>
                          <option>Malaysia</option>
                          <option>Maldives</option>
                          <option>Mali</option>
                          <option>Malta</option>
                          <option>Marshall Islands</option>
                          <option>Martinique</option>
                          <option>Mauritania</option>
                          <option>Mauritius</option>
                          <option>Mayotte</option>
                          <option>Mexico</option>
                          <option>Moldova</option>
                          <option>Monaco</option>
                          <option>Mongolia</option>
                          <option>Montenegro</option>
                          <option>Montserrat</option>
                          <option>Morocco</option>
                          <option>Mozambique</option>
                          <option>Myanmar</option>
                          <option>Namibia</option>
                          <option>Nauru</option>
                          <option>Navassa Island</option>
                          <option>Nepal</option>
                          <option selected>Netherlands</option>
                          <option>Netherlands Antilles</option>
                          <option>New Caledonia</option>
                          <option>New Zealand</option>
                          <option>Nicaragua</option>
                          <option>Niger</option>
                          <option>Nigeria</option>
                          <option>Niue</option>
                          <option>Norfolk Island</option>
                          <option>North Korea</option>
                          <option>Northern Mariana Islands</option>
                          <option>Norway</option>
                          <option>Oman</option>
                          <option>Pakistan</option>
                          <option>Palau</option>
                          <option>Palestine</option>
                          <option>Panama</option>
                          <option>Papua New Guinea</option>
                          <option>Paracel Islands</option>
                          <option>Paraguay</option>
                          <option>Peru</option>
                          <option>Philippines</option>
                          <option>Pitcairn Islands</option>
                          <option>Poland</option>
                          <option>Portugal</option>
                          <option>Puerto Rico</option>
                          <option>Qatar</option>
                          <option>Republic of the Congo</option>
                          <option>Reunion</option>
                          <option>Romania</option>
                          <option>Russia</option>
                          <option>Rwanda</option>
                          <option>Saint Barth&Atilde;&copy;lemy</option>
                          <option>Saint Helena</option>
                          <option>Saint Kitts and Nevis</option>
                          <option>Saint Lucia</option>
                          <option>Saint Martin</option>
                          <option>Saint Pierre and Miquelon</option>
                          <option>Saint Vincent and the Grenadines</option>
                          <option>Samoa</option>
                          <option>San Marino</option>
                          <option>Sao Tome and Principe</option>
                          <option>Saudi Arabia</option>
                          <option>Senegal</option>
                          <option>Serbia</option>
                          <option>Seychelles</option>
                          <option>Sierra Leone</option>
                          <option>Singapore</option>
                          <option>Sint Maarten</option>
                          <option>Slovakia</option>
                          <option>Slovenia</option>
                          <option>Solomon Islands</option>
                          <option>Somalia</option>
                          <option>South Africa</option>
                          <option>South Georgia and the South Sandwich Islands</option>
                          <option>South Korea</option>
                          <option>South Sudan</option>
                          <option>Spain</option>
                          <option>Spratly Islands</option>
                          <option>Sri Lanka</option>
                          <option>Sudan</option>
                          <option>Suriname</option>
                          <option>Svalbard</option>
                          <option>Swaziland</option>
                          <option>Sweden</option>
                          <option>Switzerland</option>
                          <option>Syria</option>
                          <option>Taiwan</option>
                          <option>Tajikistan</option>
                          <option>Tanzania</option>
                          <option>Thailand</option>
                          <option>The Bahamas</option>
                          <option>The Gambia</option>
                          <option>Timor-leste</option>
                          <option>Togo</option>
                          <option>Tokelau</option>
                          <option>Tonga</option>
                          <option>Trinidad and Tobago</option>
                          <option>Tromelin Island</option>
                          <option>Tunisia</option>
                          <option>Turkey</option>
                          <option>Turkmenistan</option>
                          <option>Turks and Caicos Islands</option>
                          <option>Tuvalu</option>
                          <option>Uganda</option>
                          <option>Ukraine</option>
                          <option>United Arab Emirates</option>
                          <option>United Kingdom</option>
                          <option>United States</option>
                          <option>Uruguay</option>
                          <option>Uzbekistan</option>
                          <option>Vanuatu</option>
                          <option>Venezuela</option>
                          <option>Vietnam</option>
                          <option>Virgin Islands</option>
                          <option>Wake Island</option>
                          <option>Wallis and Futuna</option>
                          <option>West Bank</option>
                          <option>Western Sahara</option>
                          <option>Yemen</option>
                          <option>Zambia</option>
                          <option>Zimbabwe</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="note">
                    <p>
                      Waar van toepassing: Vertegenwoordiger verklaart op te treden namens voornoemde rechtspersoon als Obligatiehouder en voor deze
                      inschrijving op Obligaties volledig bevoegd te zijn om deze rechtspersoon te vertegenwoordigen.
                    </p>
                  </div>
                </div>
                <div class="multi-row">
                  <div class="row required">
                    <div class="label">
                      <label>Naam Obligatiehouder</label>
                    </div>
                    <div class="input">
                      <div class="multi-fields col-3">
                        <div class="col">
                          <div class="input">
                            <select name="Name_Salutation">
                              <option value="">Titel</option>
                              <option value="heer">heer</option>
                              <option value="mevrouw">mevrouw</option>
                              <option value="geen&#x20;keuze">geen&#x20;keuze</option>
                            </select>
                          </div>
                        </div>
                        <div class="col">
                          <div class="input">
                            <input type="text" maxlength="255" name="Name_First" placeholder="Voornaam" />
                          </div>
                        </div>
                        <div class="col">
                          <div class="input">
                            <input type="text" maxlength="255" name="Name_Last" placeholder="Achternaam" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row required">
                    <div class="label">
                      <label>Geboortedatum Obligatiehouder</label>
                    </div>
                    <div class="input">
                      <div class="date-picker-container-icon">
                        <custom-date-picker format="dd-MM-yyyy" simple name="Date1" :locale-config="localeConfig" @change="datesChangeListener" />
                        <!--												<datetime :auto="true" name="Date1"-->
                        <!--												          :flow="['year', 'month', 'date']"></datetime>-->
                        <!--												<datepicker name="Date1" format="dd-MM-yyyy"-->
                        <!--												            :value="Date.now()"></datepicker>-->
                        <div class="icon-cont">
                          <img src="/template/images/calendar-icon.svg" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row required">
                    <div class="label">Burgerservicenummer(BSN)</div>
                    <div class="input">
                      <input type="text" maxlength="255" name="Address_AddressLine1" checktype="c1" placeholder="" />
                    </div>
                  </div>
                  <div class="row">
                    <div class="label">
                      <label>Adresgegevens</label>
                    </div>
                    <div class="input">
                      <div class="multi-fields col-2">
                        <div class="col input">
                          <div class="note">Staat en huisnummer</div>
                          <input type="text" maxlength="255" name="Address_Region" checktype="c1" placeholder="" />
                        </div>
                        <div class="col input">
                          <div class="note">Postcode</div>
                          <input type="text" maxlength="255" name="Address_ZipCode" checktype="c1" placeholder="" />
                        </div>
                        <div class="col input">
                          <div class="note">Plaats</div>
                          <input type="text" maxlength="255" name="Address_City" checktype="c1" placeholder="" />
                        </div>
                        <div class="col input">
                          <div class="note">Nationaliteit</div>
                          <select name="Address_Country" checktype="c1">
                            <option value="">-Select-</option>
                            <option>&Aring;land Islands</option>
                            <option>Afghanistan</option>
                            <option>Akrotiri</option>
                            <option>Albania</option>
                            <option>Algeria</option>
                            <option>American Samoa</option>
                            <option>Andorra</option>
                            <option>Angola</option>
                            <option>Anguilla</option>
                            <option>Antarctica</option>
                            <option>Antigua and Barbuda</option>
                            <option>Argentina</option>
                            <option>Armenia</option>
                            <option>Aruba</option>
                            <option>Ashmore and Cartier Islands</option>
                            <option>Australia</option>
                            <option>Austria</option>
                            <option>Azerbaijan</option>
                            <option>Bahrain</option>
                            <option>Bangladesh</option>
                            <option>Barbados</option>
                            <option>Bassas Da India</option>
                            <option>Belarus</option>
                            <option>Belgium</option>
                            <option>Belize</option>
                            <option>Benin</option>
                            <option>Bermuda</option>
                            <option>Bhutan</option>
                            <option>Bolivia</option>
                            <option>Bosnia and Herzegovina</option>
                            <option>Botswana</option>
                            <option>Bouvet Island</option>
                            <option>Brazil</option>
                            <option>British Indian Ocean Territory</option>
                            <option>British Virgin Islands</option>
                            <option>Brunei</option>
                            <option>Bulgaria</option>
                            <option>Burkina Faso</option>
                            <option>Burma</option>
                            <option>Burundi</option>
                            <option>Cambodia</option>
                            <option>Cameroon</option>
                            <option>Canada</option>
                            <option>Cape Verde</option>
                            <option>Caribbean Netherlands</option>
                            <option>Cayman Islands</option>
                            <option>Central African Republic</option>
                            <option>Chad</option>
                            <option>Chile</option>
                            <option>China</option>
                            <option>Christmas Island</option>
                            <option>Clipperton Island</option>
                            <option>Cocos &#x28;Keeling&#x29; Islands</option>
                            <option>Colombia</option>
                            <option>Comoros</option>
                            <option>Cook Islands</option>
                            <option>Coral Sea Islands</option>
                            <option>Costa Rica</option>
                            <option>Cote D&#x27;Ivoire</option>
                            <option>Croatia</option>
                            <option>Cuba</option>
                            <option>Cura&ccedil;ao</option>
                            <option>Cyprus</option>
                            <option>Czech Republic</option>
                            <option>Democratic Republic of the Congo</option>
                            <option>Denmark</option>
                            <option>Dhekelia</option>
                            <option>Djibouti</option>
                            <option>Dominica</option>
                            <option>Dominican Republic</option>
                            <option>Ecuador</option>
                            <option>Egypt</option>
                            <option>El Salvador</option>
                            <option>Equatorial Guinea</option>
                            <option>Eritrea</option>
                            <option>Estonia</option>
                            <option>Ethiopia</option>
                            <option>Europa Island</option>
                            <option>Falkland Islands &#x28;Islas Malvinas&#x29;</option>
                            <option>Faroe Islands</option>
                            <option>Federated States of Micronesia</option>
                            <option>Fiji</option>
                            <option>Finland</option>
                            <option>France</option>
                            <option>French Guiana</option>
                            <option>French Polynesia</option>
                            <option>French Southern and Antarctic Lands</option>
                            <option>Gabon</option>
                            <option>Gaza Strip</option>
                            <option>Georgia</option>
                            <option>Germany</option>
                            <option>Ghana</option>
                            <option>Gibraltar</option>
                            <option>Glorioso Islands</option>
                            <option>Greece</option>
                            <option>Greenland</option>
                            <option>Grenada</option>
                            <option>Guadeloupe</option>
                            <option>Guam</option>
                            <option>Guatemala</option>
                            <option>Guernsey</option>
                            <option>Guinea</option>
                            <option>Guinea-bissau</option>
                            <option>Guyana</option>
                            <option>Haiti</option>
                            <option>Heard Island and Mcdonald Islands</option>
                            <option>Holy See &#x28;Vatican City&#x29;</option>
                            <option>Honduras</option>
                            <option>Hong Kong</option>
                            <option>Hungary</option>
                            <option>Iceland</option>
                            <option>India</option>
                            <option>Indonesia</option>
                            <option>Iran</option>
                            <option>Iraq</option>
                            <option>Ireland</option>
                            <option>Isle of Man</option>
                            <option>Israel</option>
                            <option>Italy</option>
                            <option>Jamaica</option>
                            <option>Jan Mayen</option>
                            <option>Japan</option>
                            <option>Jersey</option>
                            <option>Jordan</option>
                            <option>Juan De Nova Island</option>
                            <option>Kazakhstan</option>
                            <option>Kenya</option>
                            <option>Kiribati</option>
                            <option>Kosovo</option>
                            <option>Kuwait</option>
                            <option>Kyrgyzstan</option>
                            <option>Laos</option>
                            <option>Latvia</option>
                            <option>Lebanon</option>
                            <option>Lesotho</option>
                            <option>Liberia</option>
                            <option>Libya</option>
                            <option>Liechtenstein</option>
                            <option>Lithuania</option>
                            <option>Luxembourg</option>
                            <option>Macau</option>
                            <option>Macedonia</option>
                            <option>Madagascar</option>
                            <option>Malawi</option>
                            <option>Malaysia</option>
                            <option>Maldives</option>
                            <option>Mali</option>
                            <option>Malta</option>
                            <option>Marshall Islands</option>
                            <option>Martinique</option>
                            <option>Mauritania</option>
                            <option>Mauritius</option>
                            <option>Mayotte</option>
                            <option>Mexico</option>
                            <option>Moldova</option>
                            <option>Monaco</option>
                            <option>Mongolia</option>
                            <option>Montenegro</option>
                            <option>Montserrat</option>
                            <option>Morocco</option>
                            <option>Mozambique</option>
                            <option>Myanmar</option>
                            <option>Namibia</option>
                            <option>Nauru</option>
                            <option>Navassa Island</option>
                            <option>Nepal</option>
                            <option selected>Netherlands</option>
                            <option>Netherlands Antilles</option>
                            <option>New Caledonia</option>
                            <option>New Zealand</option>
                            <option>Nicaragua</option>
                            <option>Niger</option>
                            <option>Nigeria</option>
                            <option>Niue</option>
                            <option>Norfolk Island</option>
                            <option>North Korea</option>
                            <option>Northern Mariana Islands</option>
                            <option>Norway</option>
                            <option>Oman</option>
                            <option>Pakistan</option>
                            <option>Palau</option>
                            <option>Palestine</option>
                            <option>Panama</option>
                            <option>Papua New Guinea</option>
                            <option>Paracel Islands</option>
                            <option>Paraguay</option>
                            <option>Peru</option>
                            <option>Philippines</option>
                            <option>Pitcairn Islands</option>
                            <option>Poland</option>
                            <option>Portugal</option>
                            <option>Puerto Rico</option>
                            <option>Qatar</option>
                            <option>Republic of the Congo</option>
                            <option>Reunion</option>
                            <option>Romania</option>
                            <option>Russia</option>
                            <option>Rwanda</option>
                            <option>Saint Barth&Atilde;&copy;lemy</option>
                            <option>Saint Helena</option>
                            <option>Saint Kitts and Nevis</option>
                            <option>Saint Lucia</option>
                            <option>Saint Martin</option>
                            <option>Saint Pierre and Miquelon</option>
                            <option>Saint Vincent and the Grenadines</option>
                            <option>Samoa</option>
                            <option>San Marino</option>
                            <option>Sao Tome and Principe</option>
                            <option>Saudi Arabia</option>
                            <option>Senegal</option>
                            <option>Serbia</option>
                            <option>Seychelles</option>
                            <option>Sierra Leone</option>
                            <option>Singapore</option>
                            <option>Sint Maarten</option>
                            <option>Slovakia</option>
                            <option>Slovenia</option>
                            <option>Solomon Islands</option>
                            <option>Somalia</option>
                            <option>South Africa</option>
                            <option>South Georgia and the South Sandwich Islands</option>
                            <option>South Korea</option>
                            <option>South Sudan</option>
                            <option>Spain</option>
                            <option>Spratly Islands</option>
                            <option>Sri Lanka</option>
                            <option>Sudan</option>
                            <option>Suriname</option>
                            <option>Svalbard</option>
                            <option>Swaziland</option>
                            <option>Sweden</option>
                            <option>Switzerland</option>
                            <option>Syria</option>
                            <option>Taiwan</option>
                            <option>Tajikistan</option>
                            <option>Tanzania</option>
                            <option>Thailand</option>
                            <option>The Bahamas</option>
                            <option>The Gambia</option>
                            <option>Timor-leste</option>
                            <option>Togo</option>
                            <option>Tokelau</option>
                            <option>Tonga</option>
                            <option>Trinidad and Tobago</option>
                            <option>Tromelin Island</option>
                            <option>Tunisia</option>
                            <option>Turkey</option>
                            <option>Turkmenistan</option>
                            <option>Turks and Caicos Islands</option>
                            <option>Tuvalu</option>
                            <option>Uganda</option>
                            <option>Ukraine</option>
                            <option>United Arab Emirates</option>
                            <option>United Kingdom</option>
                            <option>United States</option>
                            <option>Uruguay</option>
                            <option>Uzbekistan</option>
                            <option>Vanuatu</option>
                            <option>Venezuela</option>
                            <option>Vietnam</option>
                            <option>Virgin Islands</option>
                            <option>Wake Island</option>
                            <option>Wallis and Futuna</option>
                            <option>West Bank</option>
                            <option>Western Sahara</option>
                            <option>Yemen</option>
                            <option>Zambia</option>
                            <option>Zimbabwe</option>
                          </select>
                        </div>
                        <div class="col input">
                          <div class="note">Telefoon Obligatiehouder</div>
                          <input type="text" name="PhoneNumber_countrycode" maxlength="20" value="" />
                        </div>
                        <div class="col input">
                          <div class="note">E-mail Obligatiehouder</div>
                          <input fieldType="9" type="text" maxlength="255" name="Email" checktype="c5" value="" placeholder="" />
                        </div>
                      </div>
                    </div>
                    <div class="note">
                      <p>
                        Waar van toepassing: Vertegenwoordiger verklaart op te treden namens voornoemde rechtspersoon als Obligatiehouder en voor deze
                        inschrijving op Obligaties volledig bevoegd te zijn om deze rechtspersoon te vertegenwoordigen.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="input">
                    <div class="checkbox-set">
                      <input type="checkbox" checktype="c1" id="DecisionBox1" v-model="secondary" name="DecisionBox1" />
                      <label for="DecisionBox1">Ik wil een tweede Obligatiehouder toevoegen (optioneel)</label>
                    </div>
                  </div>
                  <div class="note">
                    <p>
                      Waar van toepassing: Eerstgenoemde Obligatiehouder wordt door de tweede Obligatiehouder aangewezen als contactpersoon en gemachtigde voor
                      alle Obligaties waarop ingeschreven wordt.
                    </p>
                  </div>
                </div>
                <div v-show="secondary" class="row">
                  <div class="label">
                    <label>Naam Tweede Obligatiehouder</label>
                  </div>
                  <div class="input">
                    <div class="multi-fields">
                      <div class="col input">
                        <select class="zf-form-sBox" name="Name1_Salutation" fieldType="7">
                          <option value="">-Select-</option>
                          <option value="de&#x20;heer">de&#x20;heer</option>
                          <option value="mevrouw">mevrouw</option>
                          <option value="geen&#x20;keuze">geen&#x20;keuze</option>
                        </select>
                        <div class="note"><p>Titel</p></div>
                      </div>
                      <div class="col input">
                        <input type="text" maxlength="255" name="Name1_First" fieldType="7" placeholder="" />
                        <div class="note"><p>Voornaam</p></div>
                      </div>
                      <div class="col input">
                        <input type="text" maxlength="255" name="Name1_Last" fieldType="7" placeholder="" />
                        <div class="note">
                          <p>Achternaam</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-show="secondary" class="row">
                  <div class="label">
                    <label>Geboortedatum Tweede Obligatiehouder</label>
                  </div>
                  <div class="input">
                    <div class="date-picker-container-icon">
                      <custom-date-picker format="dd-MM-yyyy" simple name="Date2" :locale-config="localeConfig" @change="datesChangeListener" />
                      <!--											<datetime :auto="true" name="Date2"-->
                      <!--											          :flow="['year', 'month', 'date']"></datetime>-->
                      <!--											<datepicker name="Date2" format="dd-MM-yyyy"-->
                      <!--											            :value="Date.now()"></datepicker>-->
                      <div class="icon-cont">
                        <img src="/template/images/calendar-icon.svg" />
                      </div>
                    </div>
                    <div class="note">
                      <p>dd-MM-yyyy</p>
                    </div>
                  </div>
                </div>
                <div v-show="secondary" class="row">
                  <div class="label">
                    <label>Gegevens Tweede Obligatiehouder</label>
                  </div>
                  <div class="input">
                    <div class="multi-fields col-2">
                      <div class="col input">
                        <div class="note">Staat en huisnummer</div>
                        <input type="text" maxlength="255" name="Address2_Region" checktype="c1" placeholder="" />
                      </div>
                      <div class="col input">
                        <div class="note">Postcode</div>
                        <input type="text" maxlength="255" name="Address2_ZipCode" checktype="c1" placeholder="" />
                      </div>
                      <div class="col input">
                        <div class="note">Plaats</div>
                        <input type="text" maxlength="255" name="Address2_City" checktype="c1" placeholder="" />
                      </div>
                      <div class="col input">
                        <div class="note">Nationaliteit</div>
                        <select class="zf-form-sBox" name="Address2_Country" checktype="c1">
                          <option value="">-Select-</option>
                          <option>&Aring;land Islands</option>
                          <option>Afghanistan</option>
                          <option>Akrotiri</option>
                          <option>Albania</option>
                          <option>Algeria</option>
                          <option>American Samoa</option>
                          <option>Andorra</option>
                          <option>Angola</option>
                          <option>Anguilla</option>
                          <option>Antarctica</option>
                          <option>Antigua and Barbuda</option>
                          <option>Argentina</option>
                          <option>Armenia</option>
                          <option>Aruba</option>
                          <option>Ashmore and Cartier Islands</option>
                          <option>Australia</option>
                          <option>Austria</option>
                          <option>Azerbaijan</option>
                          <option>Bahrain</option>
                          <option>Bangladesh</option>
                          <option>Barbados</option>
                          <option>Bassas Da India</option>
                          <option>Belarus</option>
                          <option>Belgium</option>
                          <option>Belize</option>
                          <option>Benin</option>
                          <option>Bermuda</option>
                          <option>Bhutan</option>
                          <option>Bolivia</option>
                          <option>Bosnia and Herzegovina</option>
                          <option>Botswana</option>
                          <option>Bouvet Island</option>
                          <option>Brazil</option>
                          <option>British Indian Ocean Territory</option>
                          <option>British Virgin Islands</option>
                          <option>Brunei</option>
                          <option>Bulgaria</option>
                          <option>Burkina Faso</option>
                          <option>Burma</option>
                          <option>Burundi</option>
                          <option>Cambodia</option>
                          <option>Cameroon</option>
                          <option>Canada</option>
                          <option>Cape Verde</option>
                          <option>Caribbean Netherlands</option>
                          <option>Cayman Islands</option>
                          <option>Central African Republic</option>
                          <option>Chad</option>
                          <option>Chile</option>
                          <option>China</option>
                          <option>Christmas Island</option>
                          <option>Clipperton Island</option>
                          <option>Cocos &#x28;Keeling&#x29; Islands</option>
                          <option>Colombia</option>
                          <option>Comoros</option>
                          <option>Cook Islands</option>
                          <option>Coral Sea Islands</option>
                          <option>Costa Rica</option>
                          <option>Cote D&#x27;Ivoire</option>
                          <option>Croatia</option>
                          <option>Cuba</option>
                          <option>Cura&ccedil;ao</option>
                          <option>Cyprus</option>
                          <option>Czech Republic</option>
                          <option>Democratic Republic of the Congo</option>
                          <option>Denmark</option>
                          <option>Dhekelia</option>
                          <option>Djibouti</option>
                          <option>Dominica</option>
                          <option>Dominican Republic</option>
                          <option>Ecuador</option>
                          <option>Egypt</option>
                          <option>El Salvador</option>
                          <option>Equatorial Guinea</option>
                          <option>Eritrea</option>
                          <option>Estonia</option>
                          <option>Ethiopia</option>
                          <option>Europa Island</option>
                          <option>Falkland Islands &#x28;Islas Malvinas&#x29;</option>
                          <option>Faroe Islands</option>
                          <option>Federated States of Micronesia</option>
                          <option>Fiji</option>
                          <option>Finland</option>
                          <option>France</option>
                          <option>French Guiana</option>
                          <option>French Polynesia</option>
                          <option>French Southern and Antarctic Lands</option>
                          <option>Gabon</option>
                          <option>Gaza Strip</option>
                          <option>Georgia</option>
                          <option>Germany</option>
                          <option>Ghana</option>
                          <option>Gibraltar</option>
                          <option>Glorioso Islands</option>
                          <option>Greece</option>
                          <option>Greenland</option>
                          <option>Grenada</option>
                          <option>Guadeloupe</option>
                          <option>Guam</option>
                          <option>Guatemala</option>
                          <option>Guernsey</option>
                          <option>Guinea</option>
                          <option>Guinea-bissau</option>
                          <option>Guyana</option>
                          <option>Haiti</option>
                          <option>Heard Island and Mcdonald Islands</option>
                          <option>Holy See &#x28;Vatican City&#x29;</option>
                          <option>Honduras</option>
                          <option>Hong Kong</option>
                          <option>Hungary</option>
                          <option>Iceland</option>
                          <option>India</option>
                          <option>Indonesia</option>
                          <option>Iran</option>
                          <option>Iraq</option>
                          <option>Ireland</option>
                          <option>Isle of Man</option>
                          <option>Israel</option>
                          <option>Italy</option>
                          <option>Jamaica</option>
                          <option>Jan Mayen</option>
                          <option>Japan</option>
                          <option>Jersey</option>
                          <option>Jordan</option>
                          <option>Juan De Nova Island</option>
                          <option>Kazakhstan</option>
                          <option>Kenya</option>
                          <option>Kiribati</option>
                          <option>Kosovo</option>
                          <option>Kuwait</option>
                          <option>Kyrgyzstan</option>
                          <option>Laos</option>
                          <option>Latvia</option>
                          <option>Lebanon</option>
                          <option>Lesotho</option>
                          <option>Liberia</option>
                          <option>Libya</option>
                          <option>Liechtenstein</option>
                          <option>Lithuania</option>
                          <option>Luxembourg</option>
                          <option>Macau</option>
                          <option>Macedonia</option>
                          <option>Madagascar</option>
                          <option>Malawi</option>
                          <option>Malaysia</option>
                          <option>Maldives</option>
                          <option>Mali</option>
                          <option>Malta</option>
                          <option>Marshall Islands</option>
                          <option>Martinique</option>
                          <option>Mauritania</option>
                          <option>Mauritius</option>
                          <option>Mayotte</option>
                          <option>Mexico</option>
                          <option>Moldova</option>
                          <option>Monaco</option>
                          <option>Mongolia</option>
                          <option>Montenegro</option>
                          <option>Montserrat</option>
                          <option>Morocco</option>
                          <option>Mozambique</option>
                          <option>Myanmar</option>
                          <option>Namibia</option>
                          <option>Nauru</option>
                          <option>Navassa Island</option>
                          <option>Nepal</option>
                          <option selected>Netherlands</option>
                          <option>Netherlands Antilles</option>
                          <option>New Caledonia</option>
                          <option>New Zealand</option>
                          <option>Nicaragua</option>
                          <option>Niger</option>
                          <option>Nigeria</option>
                          <option>Niue</option>
                          <option>Norfolk Island</option>
                          <option>North Korea</option>
                          <option>Northern Mariana Islands</option>
                          <option>Norway</option>
                          <option>Oman</option>
                          <option>Pakistan</option>
                          <option>Palau</option>
                          <option>Palestine</option>
                          <option>Panama</option>
                          <option>Papua New Guinea</option>
                          <option>Paracel Islands</option>
                          <option>Paraguay</option>
                          <option>Peru</option>
                          <option>Philippines</option>
                          <option>Pitcairn Islands</option>
                          <option>Poland</option>
                          <option>Portugal</option>
                          <option>Puerto Rico</option>
                          <option>Qatar</option>
                          <option>Republic of the Congo</option>
                          <option>Reunion</option>
                          <option>Romania</option>
                          <option>Russia</option>
                          <option>Rwanda</option>
                          <option>Saint Barth&Atilde;&copy;lemy</option>
                          <option>Saint Helena</option>
                          <option>Saint Kitts and Nevis</option>
                          <option>Saint Lucia</option>
                          <option>Saint Martin</option>
                          <option>Saint Pierre and Miquelon</option>
                          <option>Saint Vincent and the Grenadines</option>
                          <option>Samoa</option>
                          <option>San Marino</option>
                          <option>Sao Tome and Principe</option>
                          <option>Saudi Arabia</option>
                          <option>Senegal</option>
                          <option>Serbia</option>
                          <option>Seychelles</option>
                          <option>Sierra Leone</option>
                          <option>Singapore</option>
                          <option>Sint Maarten</option>
                          <option>Slovakia</option>
                          <option>Slovenia</option>
                          <option>Solomon Islands</option>
                          <option>Somalia</option>
                          <option>South Africa</option>
                          <option>South Georgia and the South Sandwich Islands</option>
                          <option>South Korea</option>
                          <option>South Sudan</option>
                          <option>Spain</option>
                          <option>Spratly Islands</option>
                          <option>Sri Lanka</option>
                          <option>Sudan</option>
                          <option>Suriname</option>
                          <option>Svalbard</option>
                          <option>Swaziland</option>
                          <option>Sweden</option>
                          <option>Switzerland</option>
                          <option>Syria</option>
                          <option>Taiwan</option>
                          <option>Tajikistan</option>
                          <option>Tanzania</option>
                          <option>Thailand</option>
                          <option>The Bahamas</option>
                          <option>The Gambia</option>
                          <option>Timor-leste</option>
                          <option>Togo</option>
                          <option>Tokelau</option>
                          <option>Tonga</option>
                          <option>Trinidad and Tobago</option>
                          <option>Tromelin Island</option>
                          <option>Tunisia</option>
                          <option>Turkey</option>
                          <option>Turkmenistan</option>
                          <option>Turks and Caicos Islands</option>
                          <option>Tuvalu</option>
                          <option>Uganda</option>
                          <option>Ukraine</option>
                          <option>United Arab Emirates</option>
                          <option>United Kingdom</option>
                          <option>United States</option>
                          <option>Uruguay</option>
                          <option>Uzbekistan</option>
                          <option>Vanuatu</option>
                          <option>Venezuela</option>
                          <option>Vietnam</option>
                          <option>Virgin Islands</option>
                          <option>Wake Island</option>
                          <option>Wallis and Futuna</option>
                          <option>West Bank</option>
                          <option>Western Sahara</option>
                          <option>Yemen</option>
                          <option>Zambia</option>
                          <option>Zimbabwe</option>
                        </select>
                      </div>
                      <div class="col input">
                        <div class="note">Burgerservicenummer</div>
                        <input type="text" maxlength="255" name="Address2_AddressLine1" checktype="c1" placeholder="" />
                      </div>
                      <div class="col input">
                        <div class="note">Telefoon Tweede Obligatiehouder</div>
                        <input
                          type="text"
                          compname="PhoneNumber1"
                          name="PhoneNumber1_countrycode"
                          maxlength="20"
                          checktype="c7"
                          value=""
                          phoneFormat="1"
                          isCountryCodeEnabled="false"
                          fieldType="11"
                          id="international_PhoneNumber1_countrycode"
                          valType="number"
                          phoneFormatType="1"
                          placeholder=""
                        />
                      </div>
                      <div class="col input">
                        <div class="note">E-mail Tweede Obligatiehouder</div>
                        <input fieldType="9" type="text" maxlength="255" name="Email1" checktype="c5" value="" placeholder="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-footer">
                <span @click="changeStep('next')" class="btn reg-btn" :class="[{ disabled: !isStepValid }]">Volgende </span>
                <span @click="changeStep('previous')" class="btn reg-btn">Terug</span>
              </div>
            </div>
            <div class="step step-3" v-show="currentStep.alias === 'step3'" :class="[{ active: currentStep.alias === 'step3' }]">
              <div class="tab-wrapper">
                <p class="single-line-p bold">
                  Voor de ontvangst van enig voordeel of vergoeding of uitkering door, namens of vanwege Thuisborg in verband met deze effecten wijst
                  Obligatiehouder de volgende bankrekening aan:
                </p>
                <div class="row">
                  <div class="label">
                    <label>IBAN nummer</label>
                  </div>
                  <div class="input">
                    <input type="text" maxlength="255" name="Address3_AddressLine1" checktype="c1" placeholder="" />
                  </div>
                </div>
                <div class="row">
                  <div class="label">
                    <label>Ten name van</label>
                  </div>
                  <div class="input">
                    <input type="text" maxlength="255" name="Address3_AddressLine2" checktype="c1" placeholder="" />
                  </div>
                </div>
                <div class="row">
                  <div class="label">
                    <label>Plaats</label>
                  </div>
                  <div class="input">
                    <input type="text" maxlength="255" name="Address3_City" checktype="c1" placeholder="" />
                  </div>
                </div>
                <div class="row checkbox-set">
                  <div class="input">
                    <input type="checkbox" checktype="c1" id="DecisionBox2" name="DecisionBox2" />
                    <label>Herinvesteer mijn rendement</label>
                  </div>
                  <div class="note">
                    <p>
                      U kunt het rendement direct herinvesteren. Het exacte bedrag van uw rendementsuitkering wordt dan bijgestort in het lopende product dan
                      wel in een opvolgende serie. Zo blijft uw deelneming exponentieel groeien.
                    </p>
                  </div>
                </div>
                <div class="row required">
                  <div class="label">
                    <label>Identiteitsbewijs Obligatiehouder</label>
                  </div>
                  <div class="input">
                    <div class="file-input-cont">
                      <input type="file" name="FileUpload" checktype="c1" />
                    </div>
                  </div>
                  <div class="note">
                    <p>Choose any file for this field.</p>
                    <p>
                      Bestandstypes: JPEG, JPG, PNG, GIF, TIF, TIFF, WEBP, JFIF en ICO. Max. 20MB. De machinecode mag u afschermen. U kunt uw ID veilig
                      verzenden door het met de link toe te voegen of door het bestand te verslepen naar het vak.
                    </p>
                  </div>
                </div>
                <div class="row required" v-show="secondary">
                  <div class="label">
                    <label>Identiteitsbewijs tweede Obligatiehouder</label>
                  </div>
                  <div class="input">
                    <div class="file-input-cont">
                      <input type="file" name="FileUpload1" checktype="c1" />
                    </div>
                  </div>
                  <div class="note">
                    <p>Choose any file for this field.</p>
                    <p>
                      Bestandstypes: JPEG, JPG, PNG, GIF, TIF, TIFF, WEBP, JFIF en ICO. Max. 20MB. De machinecode mag u afschermen. U kunt uw ID veilig
                      verzenden door het met de link toe te voegen of door het bestand te verslepen naar het vak.
                    </p>
                  </div>
                </div>
                <div class="row required" v-show="organization">
                  <div class="label">
                    <label>Uittreksel Kamer van Koophandel</label>
                  </div>
                  <div class="input">
                    <div class="file-input-cont">
                      <input type="file" name="FileUpload2" checktype="c1" />
                    </div>
                  </div>
                  <div class="note">
                    <p>Choose any file for this field.</p>
                    <p>Bestandstypes: JPEG, JPG, PNG, GIF, TIF, TIFF, WEBP, JFIF en ICO. Max. 20MB.</p>
                  </div>
                </div>
              </div>
              <div class="tab-footer">
                <span @click="changeStep('next')" class="btn reg-btn" :class="[{ disabled: !isStepValid }]">Volgende </span>
                <span @click="changeStep('previous')" class="btn reg-btn">Terug</span>
              </div>
            </div>
            <div class="step step-4" v-show="currentStep.alias === 'step4'" :class="[{ active: currentStep.alias === 'step4' }]">
              <div class="tab-wrapper">
                <h2 class="single-line-h2 bold">Belangrijke informatie</h2>
                <p class="single-line-p">
                  Na ontvangst van het compleet ingevulde inschrijfformulier ontvangt u, na controle op volledigheid, een toewijzing van uw deelname onder
                  opschortende voorwaarde van overmaking van het deelnamebedrag. Het deelnamebedrag dient binnen 10 werkdagen na ondertekening van het
                  inschrijfformulier te zijn overgemaakt op de betaalrekening van Thuisborg Finance B.V. In geval dat het deelnamebedrag niet tijdig of volledig
                  wordt ontvangen, is Thuisborg Finance B.V. bevoegd deze koopovereenkomst te ontbinden. In plaats van overboeking kan ook een bestaande
                  vordering van Obligatiehouder op Thuisborg Finance B.V. worden geconverteerd of verrekenend binnen deze termijn, zoals bepaald in de
                  Obligatievoorwaarden.
                </p>
                <br />
                <p class="single-line-p">IBAN nummer: NL 95 ABNA 0425 8140 09</p>
                <br />
                <p class="single-line-p">Ten name van : Thuisborg Finance B.V.</p>
                <br />
                <p class="single-line-p">O.v.v.: Naam Eerste Obligatiehouder of naam Rechtspersoon</p>
                <br />
                <p class="single-line-p bold">Na ontvangst van het deelnamebedrag ontvangt u een bevestiging.</p>
                <br />
                <div class="seperator"></div>
                <br />
                <h2 class="single-line-h2 bold">Handtekening voor akkoord</h2>
                <p class="single-line-p">
                  De aankoop van deze effecten valt onder de bepalingen van afdeling 3A van Titel 3 van Boek 6 Burgerlijk Wetboek en daarmee onder het toezicht
                  van de Autoriteit Consument en Markt en de Autoriteit Financiële Markten op de naleving daarvan. De aanbieding van deze effecten valt niet
                  onder de reikwijdte van de Wet op het financieel toezicht en daarmee ook niet onder het toezicht van de AFM op naleving daarvan. Met
                  ondertekening verklaart ondergetekende dat alle gegevens naar waarheid werden ingevuld en dat deze voldoende bekend is met de meest recente
                  informatie op de website, de brochure, de akte en met het meest recente informatiedocument van Thuisborg met betrekking tot deze effecten.
                  Ondergetekende verklaart dat zij deze informatie schriftelijk dan wel per e-mail heeft ontvangen per de datum van ondertekening van dit
                  Inschrijfformulier. Tevens verklaart hierna ondertekende Obligatiehouder – waar van toepassing namens de (rechts-) persoon die wordt
                  vertegenwoordigd – dat zij de ontvangen informatie gelezen en begrepen heeft en dat zij daarmee volledig akkoord is gegaan voorafgaand aan
                  navolgende ondertekening:
                </p>
                <div class="row">
                  <div class="label">
                    <label for="">Handtekening Obligatiehouder</label>
                  </div>
                  <div class="input">
                    <signature @change="fieldsChange($event)" name="Signature" ref="Signature"></signature>
                  </div>
                  <div class="note">
                    <p>of: de vertegenwoordigde vennootschap</p>
                  </div>
                </div>
                <div class="row" v-show="secondary">
                  <div class="label">
                    <label for="">Handtekening Tweede Obligatiehouder </label>
                  </div>
                  <div class="input">
                    <signature name="Signature1"></signature>
                  </div>
                  <div class="note">
                    <p>of: de vertegenwoordigde vennootschap</p>
                  </div>
                </div>
              </div>
              <div class="tab-footer">
                <span @click="formSubmit" class="btn reg-btn" :class="[{ disabled: !isStepValid }]">Volgende </span>
                <span @click="changeStep('previous')" class="btn reg-btn">Terug</span>
              </div>
            </div>
            <div class="step step-4" v-show="currentStep.alias === 'step5'" :class="[{ active: currentStep.alias === 'step5' }]">
              <div class="tab-wrapper">
                <div class="payment-selection" :class="[{ enabled: canPay }]">
                  <!--								<div class="payment-selection enabled">-->
                  <mollie-redirect :data="mollie"></mollie-redirect>
                </div>
                <div class="other-payment-method" :class="[{ enabled: !canPay }]">
                  <div class="other-payment-cont">
                    <img src="/template/images/payment-sent.png" />
                    <h2 class="single-line-h2 bold navy">
                      Zodra wij het inschrijfformulier en het deelnamebedrag hebben ontvangen ontvangt u hier per post een bevestiging van.
                    </h2>
                    <p>
                      U kunt het deelname bedrag overmaken op onderstaande rekening: <br />
                      <b>NL 95 ABNA 0425 8140 09</b> - t.n.v. Thuisborg Finance B.V.
                    </p>
                  </div>
                </div>
              </div>
              <div class="tab-footer">
                <span style="visibility: hidden" @click="formSubmit" v-show="!zohoSuccess" class="btn reg-btn" :class="[{ disabled: !isStepValid }]"
                  >Volgende
                </span>
                <span @click="changeStep('previous')" v-show="!zohoSuccess" class="btn reg-btn">Terug</span>
              </div>
            </div>
            <!--						<div class="step" v-for="tab in formSteps"-->
            <!--						     :class="['step-'+ tab.id, {'active':tab.active}, {'intro':intro}]"-->
            <!--						     v-show="tab.active">-->
            <!--							<slot :name="tab.alias"-->
            <!--							      v-bind="{changeStep, isStepValid, formSubmit, zohoSuccess, mollie,canPay}">-->
            <!--							</slot>-->
            <!--						</div>-->
          </div>
        </div>
      </form>
      <div class="loading-cont" v-show="loading">
        <loading v-show="loading" msg="submitting form . . ."></loading>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TBRegisterSteps22",
  computed: {
    canPay() {
      return this.isMollie;
    },
    mollie() {
      return this.mollieParams;
    },
    zohoSuccess() {
      return this.afterzoho;
    },
    isValid() {
      let res = this.toValidate.filter((item) => item.status === false);
      return !!!res.length;
    },
    currentStep() {
      return this.formSteps.find((item) => item.active);
    },
    isStepValid() {
      let search = this.toValidate.filter((item) => item.step === this.currentStep.alias && !item.status);
      return !!!search.length;
    },
    intro() {
      return this.currentStep.type === "intro" && this.currentStep.active;
    },
  },
  props: {
    formTag: {},
    steps: [],
    recaptcha: false,
    captcha: "",
    validations: [],
  },
  data() {
    return {
      test: null,
      loading: false,
      form: null,
      toValidate: [],
      formSteps: this.steps,
      afterzoho: false,
      isMollie: false,
      mollieParams: {
        amount: null,
        name: null,
        email: null,
        desc: null,
      },
      //fields
      emission: 0,
      emissionpercentage: 0,
      discount: 0,
      totaalbedrag: 0,
      isKeuze: false,
      organization: false,
      secondary: false,
      localeConfig: {
        nl: {
          lang: {
            year: "jaar",
            month: "maand",
            day: "dag",
          },
        },
      },
    };
  },
  methods: {
    formatDate(date) {
      let d = !!date ? new Date(date) : new Date(Date.now()),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();
      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      return [day, month, year].join("-");
    },
    setUp() {
      this.parseZoho();
      this.form = this.$refs.body.getElementsByTagName("form")[0];
      this.parseForm();
      if (!!this.recaptcha) {
        this.setRecaptcha();
      }
    },
    setRecaptcha() {
      let scriptTag = document.createElement("script"),
        scriptAddress = "https://www.google.com/recaptcha/api.js";
      scriptTag.setAttribute("src", scriptAddress);
      scriptTag.setAttribute("async", "");
      scriptTag.setAttribute("defer", "");
      if (!!!this.form.getElementsByClassName("g-recaptcha").length) {
        let recaptchaTag = document.createElement("div");
        recaptchaTag.classList.add("g-recaptcha", "brochure__form__captcha");
        recaptchaTag.setAttribute("data-sitekey", this.recaptcha);
        recaptchaTag.setAttribute("data-errormessage", "Captcha validation is required");
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
          // if recaptcha is active
          this.toggleCaptchaError(true);
          this.loading = true;
          this.formatAllDates();
          this.form.submit();
        } else {
          this.loading = true;
          this.formatAllDates();
          this.form.submit();
        }
      }
    },
    formatAllDates() {
      this.toValidate.map((item) => {
        item.validation.forEach((validationItem) => {
          if (validationItem.type === "date") {
            item.nodes[0].value = this.formatDate(item.value);
            item.value = this.formatDate(item.value);
          }
        });
      });
    },
    toggleCaptchaError(status) {
      let elm = this.form.getElementsByClassName("g-recaptcha")[0];
      elm.classList.toggle("error");
    },
    applyValidationMessages() {
      this.toValidate.forEach((item) => {
        if (item.type === "signature") {
          let closestInputParrent = item.nodes.$el.closest(".input"),
            parent = !!closestInputParrent ? closestInputParrent : !!item.nodes.length ? item.nodes[0].parentNode : item.nodes.parentNode;
          if (!!!item.status) {
            parent.classList.add("js-validation-error");
            parent.setAttribute("js-validation-message", item.message);
          } else {
            parent.classList.remove("js-validation-error");
            parent.removeAttribute("js-validation-message");
          }
        } else {
          if (item.step === this.currentStep.alias) {
            let closestInputParrent = item.nodes[0].closest(".input"),
              parent = !!closestInputParrent ? closestInputParrent : !!item.nodes.length ? item.nodes[0].parentNode : item.nodes.parentNode;
            if (!!!item.status) {
              parent.classList.add("js-validation-error");
              parent.setAttribute("js-validation-message", item.message);
            } else {
              parent.classList.remove("js-validation-error");
              parent.removeAttribute("js-validation-message");
            }
          }
        }
      });
    },
    validateEmail(email) {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    },
    updateFormStatus() {
      this.toValidate.map((item) => {
        if (!!item.condition) {
          //add main field value
          let finalValue = null;
          item.nodes.forEach((nodeItem, index) => {
            if (nodeItem.type === "radio" || nodeItem.type === "checkbox") {
              finalValue = !!finalValue ? (!!nodeItem.checked ? nodeItem.checked : finalValue) : nodeItem.checked;
            } else {
              finalValue = nodeItem.value;
            }
          });
          item.value = finalValue;

          //add condition field value
          let finalValueInsideCondition = null;
          item.condition.nodes.forEach((nodeItemInNodes, index) => {
            if (nodeItemInNodes.type === "radio" || nodeItemInNodes.type === "checkbox") {
              finalValueInsideCondition = !!finalValueInsideCondition
                ? !!nodeItemInNodes.checked
                  ? nodeItemInNodes.checked
                  : finalValueInsideCondition
                : nodeItemInNodes.checked;
            } else {
              finalValueInsideCondition = nodeItemInNodes.value;
            }
          });
          item.condition.value = finalValueInsideCondition;
        } else {
          if (item.type === "signature") {
            item.value = item.nodes.isEmpty();
          } else {
            let finalValue = null;
            item.nodes.forEach((nodeItem, index) => {
              if (nodeItem.type === "radio" || nodeItem.type === "checkbox") {
                finalValue = !!finalValue ? (!!nodeItem.checked ? nodeItem.checked : finalValue) : nodeItem.checked;
              } else {
                finalValue = nodeItem.value;
              }
            });
            item.value = finalValue;
          }
        }
      });
    },
    validateForm() {
      this.updateFormStatus();
      this.toValidate.forEach((item) => {
        if (!!item.condition) {
          let cond = item.condition,
            active = false;
          if (cond.if === "true") {
            if (cond.value.toString() === cond.if) {
              active = true;
            }
          } else if (cond.if === "values") {
            // if the related field has values listed then this field is required
            cond.nodes.forEach((item) => {
              if (item.checked && cond.values.includes(item.value)) {
                active = true;
              }
            });
          }
          if (active) {
            if (!!item.value) {
              item.status = true;
              item.message = "";
              /* TODO
							    here we should check email and other kind of validations if it has a condition */
              // item.validation.forEach(validationItem => {
              // 	if (validationItem.type === 'email') {
              // 		item.status = !!this.validateEmail(item.value);
              // 		item.message = !!this.validateEmail(item.value) ? '' : '- Voer een geldig emailadres in';
              // 	}
              // 	if (validationItem.type === 'min') {
              // 		// input must be more than value
              // 		if (parseInt(item.value) < parseInt(validationItem.valid_value)) {
              // 			item.status = false;
              // 			item.message = 'Het minimale deelnamebedrag is € 100.000,-';
              // 		}
              // 	}
              // });
            } else {
              item.status = false;
              item.message = "- Dit is een verplicht veld";
            }
          } else {
            item.status = true;
            item.message = "";
          }
        } else {
          if (!!item.value) {
            item.status = true;
            item.message = "";
            item.validation.forEach((validationItem) => {
              if (validationItem.type === "email") {
                item.status = !!this.validateEmail(item.value);
                item.message = !!this.validateEmail(item.value) ? "" : "- Voer een geldig emailadres in";
              }
              if (validationItem.type === "min") {
                // input must be more than value
                if (parseInt(item.value) < parseInt(validationItem.valid_value)) {
                  item.status = false;
                  item.message = "- Het minimale deelnamebedrag is € 100.000,-";
                }
              }
            });
          } else {
            item.status = false;
            item.message = "- Dit is een verplicht veld";
          }
        }
      });

      this.applyValidationMessages();
    },
    passNodes(name, type) {
      let nodes = null;
      if (type === "textarea") {
        nodes = this.$refs.body.querySelectorAll("textarea[name=" + name + "]");
      } else if (type === "select-one") {
        nodes = this.$refs.body.querySelectorAll("select[name=" + name + "]");
      } else {
        nodes = this.$refs.body.querySelectorAll("input[name=" + name + "]");
      }
      return nodes;
    },
    parseForm() {
      if (!!this.validations.length) {
        this.toValidate = [];
        this.validations.forEach((item) => {
          if (!!this.form.elements[item.name]) {
            //if element exists
            let element = !!this.form.elements[item.name] ? this.form.elements[item.name] : false;
            if (!!element) {
              if (!!item.validation && item.validation.type === "signature") {
                let component = !!this.$refs[item.name] ? this.$refs[item.name] : false;
                if (!!component) {
                  let field = {
                    name: item.name,
                    type: "signature",
                    value: component.isEmpty(),
                    status: false,
                    step: item.step,
                    message: "",
                    nodes: component,
                    validation: [{ type: "required" }],
                  };
                  this.toValidate.push(field);
                }
              } else {
                let nodes = this.passNodes(item.name, element.type),
                  field = {},
                  type = null;
                type = nodes[0].type;
                field = {
                  name: item.name,
                  type: type,
                  value: element.value,
                  status: false,
                  step: item.step,
                  message: "",
                  nodes: nodes,
                  validation: [{ type: "required" }],
                };
                if (type == "hidden") {
                  // todo
                }
                if (!!item.validation) field.validation.push(item.validation);
                if (type === "checkbox" || type === "radio") {
                  field.value = element.checked;
                }
                nodes.forEach((item) => {
                  item.addEventListener("input", this.fieldsChange);
                });
                //condition field
                if (!!item.condition) {
                  field.condition = item.condition;
                  let relatedElement = !!this.form.elements[item.condition.field] ? this.form.elements[item.condition.field] : false,
                    relatedElementNodes = this.passNodes(item.condition.field, relatedElement.type);
                  relatedElementNodes.forEach((item) => {
                    item.addEventListener("input", this.fieldsChange);
                  });
                  field.condition.nodes = relatedElementNodes;
                  field.condition.type = relatedElementNodes[0].type;
                  field.condition.value = field.condition.type === "checkbox" || field.condition.type === "radio" ? relatedElement.checked : null;
                }
                this.toValidate.push(field);
              }
            }
          }
        });
      }
    },
    updateLiveValues() {
      let input = parseFloat(this.form.elements["Number"].value);
      // if input is less than 30.000,  "Korting"  & "Emission" are active
      // if input is less than 15000, the emission is 2%, more than 15k & less than 30.000 emission
      // if korting is equal to "thuisborgfinance" the emission will not apply
      if (!!input) {
        //emission
        // this.calculateEmission(input);
        //korting
        // this.countDiscount(input);
        // totaalbedrag
        this.totaalbedrag = this.countTotalBedrag(input);
      }
    },
    calculateEmission(input) {
      //emission
      this.emissionpercentage = 2;
      if (input >= 15000 && input < 30000) {
        this.emissionpercentage = 1;
      } else if (input >= 30000) {
        this.emissionpercentage = 0;
      }
      this.emission = !!this.emissionpercentage ? (input * this.emissionpercentage) / 100 : 0;
    },
    countDiscount(value) {
      let code = this.form.elements["SingleLine"].value;
      if (code === "ThuisborgFinance") {
        this.discount = (value * this.emissionpercentage) / 100;
      } else {
        this.discount = 0;
      }
    },
    countTotalBedrag(input) {
      let res = 0;
      if (!!this.emissionpercentage) {
        res = input + this.emission - this.discount;
      } else {
        res = input;
      }
      return res;
    },
    checkKeuze() {
      let val = !!this.form ? this.form.elements["checkbox"].value : null;
      this.isKeuze = val.includes("3") || val.includes("5");
    },
    fieldsChange(e) {
      // this.checkKeuze();
      this.updateLiveValues();
      this.validateForm();
    },
    changeStep(to) {
      this.validateForm();
      if (to === "next") {
        let currentIndex = this.formSteps.findIndex((x) => x.alias == this.currentStep.alias);
        if (this.isStepValid) {
          this.activateStep(currentIndex + 1);
        }
      } else if (to === "previous") {
        let currentIndex = this.formSteps.findIndex((x) => x.alias == this.currentStep.alias);
        this.activateStep(currentIndex - 1);
      }
    },
    activateStep(index) {
      this.formSteps.map((item, i) => {
        item.active = i === index;
      });
    },
    parseZoho() {
      let dl = new URL(document.location),
        searchParams = dl.searchParams,
        inv = searchParams.get("inv"),
        name = searchParams.get("name"),
        lastname = searchParams.get("lastname"),
        email = searchParams.get("email"),
        desc = searchParams.get("description"),
        paid = searchParams.get("_i");
      this.afterzoho = !!inv;
      if (this.afterzoho) {
        if (parseInt(inv) <= 50000) {
          this.isMollie = true;
          this.mollieParams = {
            amount: inv,
            name: name + " " + lastname,
            email: email,
            desc: desc,
            status: !!paid ? paid : null,
          };
        } else {
          this.isMollie = false;
        }
        this.activateStep(5);
      }
    },
    checkDates() {
      this.formatAllDates();
      let copy = this.form.elements;
      for (var i = 0; i < copy.length; i++) {
        if (copy[i].classList.contains("vdatetime-input")) {
          console.log(copy[i].value, copy[i]);
        }
      }
    },
    datesChangeListener() {
      let _this = this;
      setTimeout(function () {
        _this.fieldsChange();
      }, 100);
    },
  },
  onMounted() {
    this.setUp();
    if (this.zohoSuccess) {
      this.parseZoho();
    }
  },
};
</script>
