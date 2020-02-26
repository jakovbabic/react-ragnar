// @flow weak

import React, {
  PureComponent
} from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';


import NumberFormat from 'react-number-format';


import {
  Alert,
  AnimatedView,
  Panel,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCol
} from '../../components';

import Modal from 'react-modal';

import Highlight from 'react-highlight';
import './style.css'
import moment from 'moment';

import { Button, ButtonGroup, ButtonToolbar } from 'reactstrap';
//import { Pager, Pagination } from 'react-bootstrap';
import Pagination from "react-js-pagination";
//require("bootstrap/less/bootstrap.less");

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


import logo from "./logo.png"
import * as offer from "../../services/API/newOffer"



// import {urlExists} from 'url-exists'
Number.prototype.formatMoney = function (c, d, t) {
  var n = this;
  c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
    j = (j = i.length) > 3 ? j % 3 : 0;
  return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

Number.prototype.formatDec = function () {
  let c = 2;
  let d = ',';
  let t = '.';
  var n = this;
  c = isNaN(c = Math.abs(c)) ? 2 : c;
  d = d == undefined ? "." : d;
  t = t == undefined ? "," : t;
  let s = n < 0 ? "-" : "";
  let i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c)));
  let j = (j = i.length) > 3 ? j % 3 : 0;
  return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

Number.prototype.formatInt = function () {
  let c = 0;
  let d = ',';
  let t = '.';
  var n = this;
  c = isNaN(c = Math.abs(c)) ? 2 : c;
  d = d == undefined ? "." : d;
  t = t == undefined ? "," : t;
  let s = n < 0 ? "-" : "";
  let i = String(Number(n = Math.abs(Number(n) || 0).toFixed(c)));
  let j = (j = i.length) > 3 ? j % 3 : 0;
  return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

const nomiMesi = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];

const headersOfferte = ['Cliente', 'Offerta', 'Fornitura', 'Creazione'];
const headersConsumi = ['Cliente', 'Piva', 'Pod', 'Prov'];

const verificaStyles = {
  content: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    width: "400px",
    height: "400px",
  }
};
const offerteStyles = {
  content: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "px",
    right: 0,
    margin: "auto",
    width: "85%",
    height: "80%",
  }
};

const parcheggiaStyles = {
  content: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    width: "60%",
    height: "40%",
  }
};

function monthDiff(d1, d2) {
  var months;
  if (d1 > d2) return 0;
  if (d1 == d2) return 1;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months < 0 ? 0 : months + 1;
}

function meseAnno2Date(s) {
  var am = s.split(" ");
  return new Date(am[1], nomiMesi.indexOf(am[0].toLowerCase()), 1);

}

class NewOffer extends PureComponent {
  static propTypes = {
    actions: PropTypes.shape({
      enterNewOffer: PropTypes.func.isRequired,
      leaveNewOffer: PropTypes.func.isRequired
    })
  };

  state = { path: ['home', 'newoffer'] };

  constructor(props) {
    super(props);
    this.state = {
      errorValida: [],
      infoOffer: [],
      conversione: [],
      nomeOfferta: "",
      data_validita: "",
      data_posticipo: "",
      ore_validita: "",
      gennaioF1: "",
      gennaioF2: "",
      gennaioF3: "",
      febbraioF1: "",
      febbraioF2: "",
      febbraioF3: "",
      gennaioPeak: "",
      gennaioOffPeak: "",
      febbraioPeak: "",
      febbraioOffPeak: "",
      marzoF1: "",
      marzoF2: "",
      marzoF3: "",
      marzoPeak: "",
      marzoOffPeak: "",
      maggioF1: "",
      maggioF2: "",
      maggioF3: "",
      maggioPeak: "",
      maggioOffPeak: "",
      aprileF1: "",
      aprileF2: "",
      aprileF3: "",
      aprilePeak: "",
      aprileOffPeak: "",
      giugnoF1: "",
      giugnoF2: "",
      giugnoF3: "",
      giugnoOffPeak: "",
      giugnoPeak: "",
      luglioF1: "",
      luglioF2: "",
      luglioF3: "",
      luglioPeak: "",
      luglioOffPeak: "",
      agostoF1: "",
      agostoF2: "",
      agostoF3: "",
      agostoOffPeak: "",
      agostoPeak: "",
      settembreF1: "",
      settembreF2: "",
      settembreF3: "",
      settembreOffPeak: "",
      settembrePeak: "",
      ottobreF1: "",
      ottobreF2: "",
      ottobreF3: "",
      ottobrePeak: "",
      ottobreOffPeak: "",
      novembreF1: "",
      novembreF2: "",
      novembreF3: "",
      novembrePeak: "",
      novembreOffPeak: "",
      dicembreF1: "",
      dicembreF2: "",
      dicembreF3: "",
      dicembrePeak: "",
      dicembreOffPeak: "",
      tipoConsumi: "Mensili",
      cliente: "",
      indirizzo: "",
      localita: "",
      data: "",
      feeEco: 0,
      feeIntermediario: 0,
      consumoAnnuoF1: 0,
      consumoAnnuoF2: 0,
      consumoAnnuoF3: 0,
      consumoAnnuoOP: 0,
      consumoAnnuoPL: 0,
      fixMargineF1: 0.0,
      fixMargineF2: 0.0,
      fixMargineF3: 0.0,
      fixMarginePL: 0.0,
      fixMargineOP: 0.0,
      punMargineF1: 0.0,
      punMargineF2: 0.0,
      punMargineF3: 0.0,
      punMargineOrario : 0.0,
      greenMargine: 0.0,
      fine_forn: "",
      inizio_forn: "",
      tipoSbilanciamento: "",
      risParcheggio: "",
      parcheggiaModalIsOpen: false,
      verificaModalIsOpen: false,
      offerteModalIsOpen: false,
      consumiModalIsOpen: false,
      labels: [],
      proxy_F1: [],
      proxy_F2: [],
      proxy_F3: [],
      proxy_OP: [],
      proxy_PL: [],
      ore_F1: [],
      ore_F2: [],
      ore_F3: [],
      ore_OP: [],
      ore_PL: [],
      ore_TOT: [],
      //inizio_forn_select: 0,
      //checked: 0,
      radioScad: '',
      radioForn: 0,
      offerteList: [],
      offerteGrid: [],
      consumiList: [],
      consumiAdd: [],
      offerSearch: '',
      offerPage: 1,
      offerteListCount: 0,
      consumiSearch: '',
      consumiPage: 1,
      consumiListCount: 0,
      calcAutomatico: false
      /* ,
      Verifica: {
        fixMargineF1: 0.0,
        punMargineF1: 0.0,
      } */
    };
    //this.handleChange = this.handleChange.bind(this);
    this.getOfferList = this.getOfferList.bind(this)
    this.getConsumiList = this.getConsumiList.bind(this)
    this.onClickLoadOffer = this.onClickLoadOffer.bind(this)
    this.onClickClient = this.onClickClient.bind(this)
    this.onClickConsumiDelete = this.onClickConsumiDelete.bind(this)
    this.onClickLoadConsumi = this.onClickLoadConsumi.bind(this)
  }

  async componentDidMount() {
    await offer.getOffer().then((resulte) => {
      // trasformazione configurazione in array
      var acfg=[];
      for(var i=0;i<resulte.cfg.length;i++) {
        acfg[resulte.cfg[i].parametro]=resulte.cfg[i].valore;
      }

      //console.log("cfg")
      //console.log(acfg)

      this.setState({
        infoOffer: resulte.offerte,
        conversione: resulte.conversione,
        cfg: acfg,
        nomeOfferta: resulte.offerte[0].nomeOfferta,
        data: resulte.dataagg[0],
        cliente: resulte.offerte[0].cliente,
        indirizzo: resulte.offerte[0].indirizzo,
        localita: resulte.offerte[0].localita,
        info: resulte.offerte[0],
        ore_validita: resulte.offerte[0].ore_validita,
        gennaioF1: resulte.offerte[0].genF1,
        gennaioF2: resulte.offerte[0].genF2,
        gennaioF3: resulte.offerte[0].genF3,
        gennaioPeak: resulte.offerte[0].genOP,
        gennaioOffPeak: resulte.offerte[0].genPL,
        febbraioF1: resulte.offerte[0].febF1,
        febbraioF2: resulte.offerte[0].febF2,
        data_validita: resulte.offerte[0].data_validita,
        data_posticipo: resulte.offerte[0].data_posticipo || moment(new Date()).format("DD/MM/YYYY"),
        febbraioF3: resulte.offerte[0].febF3,
        febbraioPeak: resulte.offerte[0].febOP,
        febbraioOffPeak: resulte.offerte[0].febPL,
        marzoF1: resulte.offerte[0].marF1,
        marzoF2: resulte.offerte[0].marF2,
        marzoF3: resulte.offerte[0].marF3,
        marzoPeak: resulte.offerte[0].marOP,
        marzoOffPeak: resulte.offerte[0].marPL,
        aprileF3: resulte.offerte[0].aprF3,
        aprileF2: resulte.offerte[0].aprF2,
        aprileF1: resulte.offerte[0].aprF3,
        aprilePeak: resulte.offerte[0].aprOP,
        aprileOffPeak: resulte.offerte[0].aprPL,
        maggioF1: resulte.offerte[0].magF1,
        maggioF2: resulte.offerte[0].magF2,
        maggioF3: resulte.offerte[0].magF3,
        maggioPeak: resulte.offerte[0].magOP,
        maggioOffPeak: resulte.offerte[0].magPL,
        giugnoF1: resulte.offerte[0].giuF1,
        giugnoF2: resulte.offerte[0].magF2,
        giugnoF3: resulte.offerte[0].magF3,
        giugnoPeak: resulte.offerte[0].magOP,
        giugnoOffPeak: resulte.offerte[0].magPL,
        luglioF1: resulte.offerte[0].lugF1,
        luglioF2: resulte.offerte[0].lugF2,
        luglioF3: resulte.offerte[0].lugF3,
        luglioPeak: resulte.offerte[0].lugOP,
        luglioOffPeak: resulte.offerte[0].lugPL,
        agostoF1: resulte.offerte[0].agoF1,
        agostoF2: resulte.offerte[0].agoF2,
        agostoF3: resulte.offerte[0].agoF3,
        agostoPeak: resulte.offerte[0].agoOP,
        agostoOffPeak: resulte.offerte[0].agoPL,
        settembreF1: resulte.offerte[0].setF1,
        settembreF2: resulte.offerte[0].setF2,
        settembreF3: resulte.offerte[0].setF3,
        settembrePeak: resulte.offerte[0].setOP,
        settembreOffPeak: resulte.offerte[0].setPL,
        ottobreF1: resulte.offerte[0].ottF1,
        ottobreF2: resulte.offerte[0].ottF2,
        ottobreF3: resulte.offerte[0].ottF3,
        ottobrePeak: resulte.offerte[0].ottOP,
        ottobreOffPeak: resulte.offerte[0].ottPL,
        novembreF1: resulte.offerte[0].novF1,
        novembreF2: resulte.offerte[0].novF2,
        novembreF3: resulte.offerte[0].novF3,
        novembrePeak: resulte.offerte[0].novOP,
        novembreOffPeak: resulte.offerte[0].novPL,
        dicembreF1: resulte.offerte[0].dicF1,
        dicembreF2: resulte.offerte[0].decF2,
        dicembreF3: resulte.offerte[0].dicF3,
        dicembrePeak: resulte.offerte[0].dicOP,
        dicembreOffPeak: resulte.offerte[0].dicPL,
        feeEco: resulte.offerte[0].feeEco,
        feeIntermediario: resulte.offerte[0].feeIntermediario,
        tipoConsumi: resulte.offerte[0].tipoConsumi,
        consumoAnnuoF1: resulte.offerte[0].consumoAnnuoF1,
        consumoAnnuoF2: resulte.offerte[0].consumoAnnuoF2,
        consumoAnnuoF3: resulte.offerte[0].consumoAnnuoF3,
        consumoAnnuoOP: resulte.offerte[0].consumoAnnuoOP,
        consumoAnnuoPL: resulte.offerte[0].consumoAnnuoPL,
        fixMargineF1: resulte.offerte[0].fixMargineF1,
        fixMargineF2: resulte.offerte[0].fixMargineF2,
        fixMargineF3: resulte.offerte[0].fixMargineF3,
        fixMarginePL: resulte.offerte[0].fixMarginePL,
        fixMargineOP: resulte.offerte[0].fixMargineOP,
        punMargineF1: resulte.offerte[0].punMargineF1,
        punMargineF2: resulte.offerte[0].punMargineF2,
        punMargineF3: resulte.offerte[0].punMargineF3,
        punMargineOrario : resulte.offerte[0].punMargineOrario,
        greenMargine: resulte.offerte[0].greenMargine || acfg["cfg_def_sourcing_verde"],
        fine_forn: resulte.offerte[0].fine_forn,
        inizio_forn: resulte.offerte[0].inizio_forn,
        // inizio_forn_select: -1,
        tipoSbilanciamento: resulte.offerte[0].tipoSbilanciamento,
        labels: resulte.labels,
        proxy_F1: resulte.proxy_F1,
        proxy_F2: resulte.proxy_F2,
        proxy_F3: resulte.proxy_F3,
        proxy_OP: resulte.proxy_OP,
        proxy_PL: resulte.proxy_PL,
        ore_F1: resulte.ore_F1,
        ore_F2: resulte.ore_F2,
        ore_F3: resulte.ore_F3,
        ore_OP: resulte.ore_OP,
        ore_PL: resulte.ore_PL,
        ore_TOT: resulte.ore_TOT,
        numberInput: []
      })

      
    })
    var i = 0, temp = [];
    for (let x in this.refs) {
      temp[i] = x;
      this.refs[x].onKeyDown = (e) => 
        this._handleKeyPress(e, x);
      i++;
    }
    this.setState({ numberInput: temp });
  }

  _handleKeyPress(e, ref) {
    var index = this.state.numberInput.indexOf(ref);
    if (e.keyCode === 13) {
      e.preventDefault(); // Prevent form submission if button present
      let next = this.state.numberInput[index === this.state.numberInput.length - 1? 0: index + 1];
      if (next) {
        ReactDOM.findDOMNode(this.refs[next]).focus()
        // this.refs[next].onFocus();
      }
    }
  }

  componentWillMount() {
    const { actions: { enterNewOffer } } = this.props;
    enterNewOffer();
  }


  handleOfferPageChange(pageNumber) {
    //console.log(`active page is ${pageNumber}`);
    this.setState({ offerPage: pageNumber })
    this.getOfferList(pageNumber, this.state.offerSearch)
  }

  handleConsumiPageChange(pageNumber) {
    //console.log(`active page is ${pageNumber}`);
    this.setState({ consumiPage: pageNumber })
    this.getConsumiList(pageNumber, this.state.consumiSearch)
  }

  Verifica() {
    
    let errori = [];

    //console.log("-" + this.state.cliente + "-" );
    if (!this.state.nomeOfferta)
      errori.push("Inserire Nome Offerta");
    if (!this.state.cliente)
      errori.push("Inserire Cliente");
    if (!this.state.indirizzo)
      errori.push("Inserire Indirizzo");
    if (!this.state.localita)
      errori.push("Inserire Cap e Località");
    if (!this.state.inizio_forn)
      errori.push("Inserire Inizio Fornitura");
    if (!this.state.fine_forn)
      errori.push("Inserire Fine Fornitura");
    if (this.state.labels.indexOf(this.state.inizio_forn) > this.state.labels.indexOf(this.state.fine_forn))
      errori.push("Inizio Fornitura incongruente con Fine Fornitura");
    if (!this.state.data_posticipo)
      errori.push("Inserire Data Posticipo Offerta");
    //if (moment(this.state.data_validita + " " + this.state.ore_validita, "DD/MM/YYYY H:mm") < moment(new Date()))
    //  errori.push("Data e Ora Validità Inferiore ad adesso");
    if (moment(this.state.data_posticipo, "DD/MM/YYYY") < moment(new Date()))
      errori.push("Data e Ora Validità Inferiore ad adesso");
    if (this.state.tipoConsumi === "Mensili") {

      if (
        Number(this.state.gennaioF1) <= 0
        || Number(this.state.gennaioF2) <= 0
        || Number(this.state.gennaioF3) <= 0
        || Number(this.state.gennaioPeak) <= 0
        || Number(this.state.gennaioOffPeak) <= 0
        || Number(this.state.febbraioF1) <= 0
        || Number(this.state.febbraioF2) <= 0
        || Number(this.state.febbraioF3) <= 0
        || Number(this.state.febbraioPeak) <= 0
        || Number(this.state.febbraioOffPeak) <= 0
        || Number(this.state.marzoF1) <= 0
        || Number(this.state.marzoF2) <= 0
        || Number(this.state.marzoF3) <= 0
        || Number(this.state.marzoPeak) <= 0
        || Number(this.state.marzoOffPeak) <= 0
        || Number(this.state.aprileF3) <= 0
        || Number(this.state.aprileF2) <= 0
        || Number(this.state.aprileF1) <= 0
        || Number(this.state.aprilePeak) <= 0
        || Number(this.state.aprileOffPeak) <= 0
        || Number(this.state.maggioF1) <= 0
        || Number(this.state.maggioF2) <= 0
        || Number(this.state.maggioF3) <= 0
        || Number(this.state.maggioPeak) <= 0
        || Number(this.state.maggioOffPeak) <= 0
        || Number(this.state.giugnoF1) <= 0
        || Number(this.state.giugnoF2) <= 0
        || Number(this.state.giugnoF3) <= 0
        || Number(this.state.giugnoPeak) <= 0
        || Number(this.state.giugnoOffPeak) <= 0
        || Number(this.state.luglioF1) <= 0
        || Number(this.state.luglioF2) <= 0
        || Number(this.state.luglioF3) <= 0
        || Number(this.state.luglioPeak) <= 0
        || Number(this.state.luglioOffPeak) <= 0
        || Number(this.state.agostoF1) <= 0
        || Number(this.state.agostoF2) <= 0
        || Number(this.state.agostoF3) <= 0
        || Number(this.state.agostoPeak) <= 0
        || Number(this.state.agostoOffPeak) <= 0
        || Number(this.state.settembreF1) <= 0
        || Number(this.state.settembreF2) <= 0
        || Number(this.state.settembreF3) <= 0
        || Number(this.state.settembrePeak) <= 0
        || Number(this.state.settembreOffPeak) <= 0
        || Number(this.state.ottobreF1) <= 0
        || Number(this.state.ottobreF2) <= 0
        || Number(this.state.ottobreF3) <= 0
        || Number(this.state.ottobrePeak) <= 0
        || Number(this.state.ottobreOffPeak) <= 0
        || Number(this.state.novembreF1) <= 0
        || Number(this.state.novembreF2) <= 0
        || Number(this.state.novembreF3) <= 0
        || Number(this.state.novembrePeak) <= 0
        || Number(this.state.novembreOffPeak) <= 0
        || Number(this.state.dicembreF1) <= 0
        || Number(this.state.dicembreF2) <= 0
        || Number(this.state.dicembreF3) <= 0
        || Number(this.state.dicembrePeak) <= 0
        || Number(this.state.dicembreOffPeak) <= 0
      )
        errori.push("Inserire Tutti i Valori Mensili per Tutte le Fasce");
    }


    let mess = this.state.errorValida;

    if (errori.length) {
      errori.forEach(function (entry) {
        mess.push({ msg: entry, tipo: "danger" });
      });
    }
    else
      mess.push({ msg: "Ok, i dati sono corretti", tipo: "info" });

    //console.log(this.state.errorValida)
  }

  componentWillUnmount() {
    const { actions: { leaveNewOffer } } = this.props;
    leaveNewOffer();
  }


  calcPrezziConsumi() {
    var costiRischi = 0;
    var totConsumo = 0, totConsumoF1 = 0, totConsumoF2 = 0, totConsumoF3 = 0, totConsumoPeak = 0, totConsumoOffPeak = 0;
    var totPrzConsumoF1 = 0, totPrzConsumoF2 = 0, totPrzConsumoF3 = 0, totPrzConsumoPeak = 0, totPrzConsumoOffPeak = 0;
    var totFinalePrzConsumoF1 = 0, totFinalePrzConsumoF2 = 0, totFinalePrzConsumoF3 = 0, totFinalePrzConsumoPeak = 0, totFinalePrzConsumoOffPeak = 0;
    var totOre = 0, totOreF1 = 0, totOreF2 = 0, totOreF3 = 0, totOrePeak = 0, totOreOffPeak = 0;
    var totPrzOreF1 = 0, totPrzOreF2 = 0, totPrzOreF3 = 0, totPrzOrePeak = 0, totPrzOreOffPeak = 0;
    var totMargineConsumoF1 = 0, totMargineConsumoF2 = 0, totMargineConsumoF3 = 0, totMargineConsumoPeak = 0, totMargineConsumoOffPeak = 0;
    var margineEuroMwh = 0.0;
  
  
  
    //console.log(this.state.inizio_forn);
    //console.log(this.state.fine_forn);
    if (this.state.inizio_forn && this.state.fine_forn && this.state.tipoConsumi === "Mensili") {
      let startIndex = this.state.labels.indexOf(this.state.inizio_forn);
      let stopIndex = this.state.labels.indexOf(this.state.fine_forn);
      //console.log(startIndex);
      //console.log(stopIndex);
      if (startIndex >= 0 && stopIndex >= 0) {
        // loop su tutti i mesi anno della fornitura
        for (var i = startIndex; i <= stopIndex; i++) {
          // estarzione mese
          let am = this.state.labels[i].split(" ");
          let mese = am[0].toLowerCase();
          // totale consumi
          totConsumoF1 += Number(this.state[mese + "F1"]); // * this.state.ore_F1[i] ;
          totConsumoF2 += Number(this.state[mese + "F2"]); //  this.state.ore_F2[i] ;
          totConsumoF3 += Number(this.state[mese + "F3"]); // * this.state.ore_F3[i] ;
          totConsumoPeak += Number(this.state[mese + "Peak"]); //  * this.state.ore_PL[i] ;
          totConsumoOffPeak += Number(this.state[mese + "OffPeak"]); //  * this.state.ore_OP[i] );
         
      
          // totale importi (prezzo x consumo x ore)
          totPrzConsumoF1 += Number(this.state[mese + "F1"]) * this.state.ore_F1[i] * this.state.proxy_F1[i] ;
          totPrzConsumoF2 += Number(this.state[mese + "F2"]) * this.state.ore_F2[i] * this.state.proxy_F2[i] ;
          totPrzConsumoF3 += Number(this.state[mese + "F3"]) * this.state.ore_F3[i] * this.state.proxy_F3[i] ;
          totPrzConsumoPeak += Number(this.state[mese + "Peak"])  * this.state.ore_PL[i] * this.state.proxy_PL[i] ;
          totPrzConsumoOffPeak+=  Number(this.state[mese + "OffPeak"])  * this.state.ore_OP[i]  * this.state.proxy_OP[i] ;

           // totale importi (prezzo x consumo x ore)
           totMargineConsumoF1 += Number(this.state[mese + "F1"]) * this.state.ore_F1[i] * Number(this.state.fixMargineF1 );
           totMargineConsumoF2 += Number(this.state[mese + "F2"]) * this.state.ore_F2[i] * Number(this.state.fixMargineF2 );
           totMargineConsumoF3 += Number(this.state[mese + "F3"]) * this.state.ore_F3[i] * Number(this.state.fixMargineF3 );
           totMargineConsumoPeak += Number(this.state[mese + "Peak"])  * this.state.ore_PL[i] * Number(this.state.fixMarginePL) ;
           totMargineConsumoOffPeak+=  Number(this.state[mese + "OffPeak"])  * this.state.ore_OP[i]  * Number(this.state.fixMargineOP) ;
 
          
          // totale importi (prezzo finale x consumo x ore)
          totFinalePrzConsumoF1 += Number(this.state[mese + "F1"]) * this.state.ore_F1[i] * (this.state.proxy_F1[i]+this.state.fixMargineF1) ;
          totFinalePrzConsumoF2 += Number(this.state[mese + "F2"]) * this.state.ore_F2[i] * (this.state.proxy_F2[i]+this.state.fixMargineF2) ;
          totFinalePrzConsumoF3 += Number(this.state[mese + "F3"]) * this.state.ore_F3[i] * (this.state.proxy_F3[i]+this.state.fixMargineF3) ;
          totFinalePrzConsumoPeak += Number(this.state[mese + "Peak"])  * this.state.ore_PL[i] * (this.state.proxy_PL[i]+this.state.fixMarginePL) ;
          totFinalePrzConsumoOffPeak+=  Number(this.state[mese + "OffPeak"])  * this.state.ore_OP[i]  * (this.state.proxy_OP[i]+this.state.fixMargineOP) ;
 
          // totale ore
          totOreF1 += this.state.ore_F1[i];
          totOreF2 += this.state.ore_F2[i];
          totOreF3 += this.state.ore_F3[i];
          totOrePeak += this.state.ore_PL[i];
          totOreOffPeak += this.state.ore_OP[i];

          // totale prezzo per ore (per baseload Mercato)
          totPrzOreF1 += this.state.ore_F1[i] * this.state.proxy_F1[i] ;
          totPrzOreF2 += this.state.ore_F2[i] * this.state.proxy_F2[i] ;
          totPrzOreF3 += this.state.ore_F3[i] * this.state.proxy_F3[i] ;
          totPrzOrePeak += this.state.ore_PL[i] * this.state.proxy_PL[i] ;
          totPrzOreOffPeak+= this.state.ore_OP[i]  * this.state.proxy_OP[i] ;

          
          //console.log(mese);
          //console.log(this.state[mese + "OffPeak"]);
        }
      }
      // console.log(this.state["inizio_forn"]);
    }

    totOre=totOreF1+totOreF2+totOreF3;
    totConsumo += totConsumoF1 + totConsumoF2 + totConsumoF3;

    let margineBaseload3Fasce=totMargineConsumoF1+totMargineConsumoF2+totMargineConsumoF3;
    let margineBaseload2Fasce=totMargineConsumoPeak+totMargineConsumoOffPeak;
    margineEuroMwh=(totConsumo == 0 || totOre==0 ? 0.0 : (((margineBaseload3Fasce + margineBaseload2Fasce)/2)/ totConsumo / totOre ).toFixed(2));

    var valoreBaseLoad = totOreF1+totOreF2+totOreF3 == 0 ? 0.0 :
                          ((totPrzOreF1+totPrzOreF2+totPrzOreF3)/(totOreF1+totOreF2+totOreF3)).toFixed(2);

    //console.log("Baseload");
    //console.log(valoreBaseLoad);
    
    var profilato3F = (totConsumoF1+totConsumoF2+totConsumoF3 == 0 ? 0.0 : ((totPrzConsumoF1+totPrzConsumoF2+totPrzConsumoF3)/(totConsumoF1+totConsumoF2+totConsumoF3)).toFixed(2));
    var profilato2F = (totConsumoPeak+totConsumoOffPeak == 0 ? 0.0 : ((totPrzConsumoPeak+totPrzConsumoOffPeak)/(totConsumoPeak+totConsumoOffPeak)).toFixed(2));
    var valoreProfilato=((Number(profilato3F)+Number(profilato2F))/2).toFixed(2);
    
    //console.log("Profilato");
    //console.log(profilato3F);
    //console.log(profilato2F);
    //console.log(valoreProfilato);

    let costoProfilo=valoreProfilato-valoreBaseLoad;
    
      
    return {
      totConsumo: totConsumo,
      totConsumoF1: totConsumoF1,
      totConsumoF2: totConsumoF2,
      totConsumoF3: totConsumoF3,
      totConsumoPeak: totConsumoPeak,
      totConsumoOffPeak: totConsumoOffPeak,
      przSourcingF1: (totConsumoF1 == 0 ? 0 : totPrzConsumoF1/ totConsumoF1).toFixed(2),
      przSourcingF2: (totConsumoF2 == 0 ? 0 : totPrzConsumoF2/ totConsumoF2).toFixed(2),
      przSourcingF3: (totConsumoF3 == 0 ? 0 : totPrzConsumoF3/ totConsumoF3).toFixed(2),
      przSourcingPeak: (totConsumoPeak == 0 ? 0 : totPrzConsumoPeak/ totConsumoPeak).toFixed(2),
      przSourcingOffPeak: (totConsumoOffPeak == 0 ? 0 : totPrzConsumoOffPeak/ totConsumoOffPeak).toFixed(2),
      przSourcing3Fprof: profilato3F,
      przSourcing2Fprof: profilato2F,
      PrzFinale3fprof: (totConsumoF1+totConsumoF2+totConsumoF3 == 0 ? 0 : ((totFinalePrzConsumoF1+totFinalePrzConsumoF2+totFinalePrzConsumoF3)/(totConsumoF1+totConsumoF2+totConsumoF3)).toFixed(2)),      
      PrzFinale2fprof: (totConsumoPeak+totConsumoOffPeak == 0 ? 0 : ((totFinalePrzConsumoPeak+totFinalePrzConsumoOffPeak)/(totConsumoPeak+totConsumoOffPeak)).toFixed(2)),
      valoreBaseLoad: valoreBaseLoad,
      valoreProfilato: valoreProfilato,
      costoProfilo: costoProfilo,
      margineEuroMwh: margineEuroMwh
    };
  }


  calcMesiFornitura() {
    var nMesi = 0;
    if (this.state.inizio_forn && this.state.fine_forn) {
      nMesi = monthDiff(meseAnno2Date(this.state.inizio_forn), meseAnno2Date(this.state.fine_forn));
    }
    return nMesi;
  }



 

  /* handleInizioForn = (event) => {
    //setState({fine_forn: e.target.value})
    this.setState({ inizio_forn: event.target.value });
    console.log(this.props);
    this.calcFineForn(event.target.value);
  }; */

  handleRadioForn(inizio, fornradio) {
    this.setState({ radioForn: fornradio });
    this.calcFineForn(inizio, fornradio);
  }

  handleInizioForn(inizio, fornradio) {
    this.setState({ inizio_forn: inizio });
    this.calcFineForn(inizio, fornradio);
  }

  calcFineForn(inizio, fornradio) {
    if (fornradio == 6 || fornradio == 12 || fornradio == 24) {
      let newIndex = this.state.labels.indexOf(inizio) + fornradio - 1;
      newIndex = Math.min(this.state.labels.length - 1, newIndex)
      this.setState({ fine_forn: this.state.labels[newIndex] });
    }
    else if (fornradio == 100) {
      let am = inizio.split(" ");
      let newIndex = this.state.labels.indexOf("dicembre" + " " + am[1]);
      newIndex = newIndex === -1 ? this.state.labels.length - 1 : newIndex;
      this.setState({ fine_forn: this.state.labels[newIndex] });
    }

  }

  handleRadioScad(day, value) {
    let time = moment(this.state.data_posticipo, "DD/MM/YYYY");

    let dayy;
    if (day !== 0 && day !== 1 && day !== 2 && day !== 3) {
      dayy = 0;
    } else {
      dayy = day;
      //if(this.state.radioScad===value)return;
    }
    //conole.log(day);
    time.add(dayy,'days');
    this.setState({
      data_validita: moment(time).format("DD/MM/YYYY"),
      radioScad: value
    });
  }

  handleDataPosticipo(posticipo) {
    const listaRadScad = ["oggi", "domani", "2 gg", "3 gg"];

    let time = moment(posticipo, "DD/MM/YYYY");

    let day = ["oggi", "domani", "2 gg", "3 gg"].indexOf(this.state.radioScad);
    if (day !== 0 && day !== 1 && day !== 2 && day !== 3) {
      day = 0;
    }

    time.add(day,'days');

    this.setState({
      data_validita: moment(time).format("DD/MM/YYYY"),
      data_posticipo: posticipo })
  }

  async getOfferList(page, search) {
    //console.log('pagina');
    //console.log(page);
    this.setState({ offerteModalIsOpen: true })
    await offer.getOfferList(page, search).then((res) => this.setState({ offerteList: res.offerte, offerteGrid: res.offerte, offerteListCount: res.count }))
    //console.log('eccoceì');
    //console.log(this.state.offerList)

    this.setState({
      offerteGrid: {
        data_creazione: this.state.offerteList.map(function (obj) { return obj.data_creazione }),
        cliente: this.state.offerteList.map(function (obj) { return obj.data_creazione }),
        fine_forn: this.state.offerteList.map(function (obj) { return obj.fine_forn }),
        inizio_forn: this.state.offerteList.map(function (obj) { return obj.inizio_forn }),
        nomeOfferta: this.state.offerteList.map(function (obj) { return obj.nomeOfferta })
      }
    });
    //console.log(this.state.offerteGrid)
  }

  
  async getConsumiList(page, search) {
    //console.log('pagina');
    //console.log(page);
    this.setState({ consumiModalIsOpen: true })
    await offer.getConsumiList(page, search).then((res) => this.setState({ consumiList: res.consumi,  consumiListCount: res.count }))
    //console.log('eccoceì');
   // console.log(this.state.offerList)

    //console.log(this.state.offerteGrid)
  }


  onClickLoadOffer(data) {
    let click = confirm("Attenzione, i dati della pagina corrente saranno sostituiti con l’offerta scelta");
    if (click == true) {
      this.setState({
        cliente: data.cliente,
        indirizzo: data.indirizzo,
        localita: data.localita,
        ore_validita: data.ore_validita,
        gennaioF1: data.genF1,
        gennaioF2: data.genF2,
        gennaioF3: data.genF3,
        gennaioPeak: data.genOP,
        gennaioOffPeak: data.genPL,
        febbraioF1: data.febF1,
        febbraioF2: data.febF2,
        febbraioF3: data.febF3,
        febbraioPeak: data.febOP,
        febbraioOffPeak: data.febPL,
        marzoF1: data.marF1,
        marzoF2: data.marF2,
        marzoF3: data.marF3,
        marzoPeak: data.marOP,
        marzoOffPeak: data.marPL,
        aprileF3: data.aprF3,
        aprileF2: data.aprF2,
        aprileF1: data.aprF3,
        aprilePeak: data.aprOP,
        aprileOffPeak: data.aprPL,
        maggioF1: data.magF1,
        maggioF2: data.magF2,
        maggioF3: data.magF3,
        maggioPeak: data.magOP,
        maggioOffPeak: data.magPL,
        giugnoF1: data.giuF1,
        giugnoF2: data.magF2,
        giugnoF3: data.magF3,
        giugnoPeak: data.magOP,
        giugnoOffPeak: data.magPL,
        luglioF1: data.lugF1,
        luglioF2: data.lugF2,
        luglioF3: data.lugF3,
        luglioPeak: data.lugOP,
        luglioOffPeak: data.lugPL,
        agostoF1: data.agoF1,
        agostoF2: data.agoF2,
        agostoF3: data.agoF3,
        agostoPeak: data.agoOP,
        agostoOffPeak: data.agoPL,
        settembreF1: data.setF1,
        settembreF2: data.setF2,
        settembreF3: data.setF3,
        settembrePeak: data.setOP,
        settembreOffPeak: data.setPL,
        ottobreF1: data.ottF1,
        ottobreF2: data.ottF2,
        ottobreF3: data.ottF3,
        ottobrePeak: data.ottOP,
        ottobreOffPeak: data.ottPL,
        novembreF1: data.novF1,
        novembreF2: data.novF2,
        novembreF3: data.novF3,
        novembrePeak: data.novOP,
        novembreOffPeak: data.novPL,
        dicembreF1: data.dicF1,
        dicembreF2: data.decF2,
        dicembreF3: data.dicF3,
        dicembrePeak: data.dicOP,
        dicembreOffPeak: data.dicPL,
        fixMargineF1: data.fixMargineF1,
        fixMargineF2: data.fixMargineF2,
        fixMargineF3: data.fixMargineF3,
        fixMarginePL: data.fixMarginePL,
        fixMargineOP: data.fixMargineOP,
        punMargineF1: data.punMargineF1,
        punMargineF2: data.punMargineF2,
        punMargineF3: data.punMargineF3,
        punMargineOrario : data.punMargineOrario,
        greenMargine: data.greenMargine,
        feeEco: data.feeEco,
        feeIntermediario: data.feeIntermediario,
        tipoConsumi: data.tipoConsumi,
        consumoAnnuoF1: data.consumoAnnuoF1,
        consumoAnnuoF2: data.consumoAnnuoF2,
        consumoAnnuoF3: data.consumoAnnuoF3,
        consumoAnnuoOP: data.consumoAnnuoOP,
        consumoAnnuoPL: data.consumoAnnuoPL,
        fine_forn: data.fine_forn,
        inizio_forn: data.inizio_forn,
        offerSearch: '',
        tipoSbilanciamento: data.tipoSbilanciamento,
        offerteModalIsOpen: false,
      })
    } else {
      null
    }
  }

  onClickClient(data) {
    let addClient = this.state.consumiAdd
    addClient.push(data)
    this.setState({ consumiAdd: addClient }, () => this.forceUpdate())

  }

  onClickConsumiDelete(value, index) {
    let addClient = this.state.consumiAdd
    addClient.splice(index, 1)
    this.setState({ consumiAdd: addClient }, () => this.forceUpdate())
  }

  findConsumoAggiunto(value, index) {
    let isAdded = this.state.consumiAdd.find((val) => val.pod === value.pod)
    if (!isAdded) {
      return (
         <button
            className="btn btn-primary btn-xs" type="button"
            onClick={() => this.onClickClient(value, index)}><i className="fa fa-angle-double-right"></i>
        </button>
            
      )
    }
  }

  onClickLoadConsumi() {
    let click = confirm("Attenzione, i consumi della pagina corrente saranno sostiuiti con i valori selezionati");
    if (click == true) {

      var tot_consumi = this.state.consumiAdd[0];
      var i;
      for (i = 1; i < this.state.consumiAdd.length; i++) {
        tot_consumi.f1_c_01 += this.state.consumiAdd[i].f1_c_01;
        tot_consumi.f2_c_01 += this.state.consumiAdd[i].f2_c_01;
        tot_consumi.f3_c_01 += this.state.consumiAdd[i].f3_c_01;
        tot_consumi.f1_c_02 += this.state.consumiAdd[i].f1_c_02;
        tot_consumi.f2_c_02 += this.state.consumiAdd[i].f2_c_02;
        tot_consumi.f3_c_02 += this.state.consumiAdd[i].f3_c_02;
        tot_consumi.f1_c_03 += this.state.consumiAdd[i].f1_c_03;
        tot_consumi.f2_c_03 += this.state.consumiAdd[i].f2_c_03;
        tot_consumi.f3_c_03 += this.state.consumiAdd[i].f3_c_03;
        tot_consumi.f1_c_04 += this.state.consumiAdd[i].f1_c_04;
        tot_consumi.f2_c_04 += this.state.consumiAdd[i].f2_c_04;
        tot_consumi.f3_c_04 += this.state.consumiAdd[i].f3_c_04;
        tot_consumi.f1_c_05 += this.state.consumiAdd[i].f1_c_05;
        tot_consumi.f2_c_05 += this.state.consumiAdd[i].f2_c_05;
        tot_consumi.f3_c_05 += this.state.consumiAdd[i].f3_c_05;
        tot_consumi.f1_c_06 += this.state.consumiAdd[i].f1_c_06;
        tot_consumi.f2_c_06 += this.state.consumiAdd[i].f2_c_06;
        tot_consumi.f3_c_06 += this.state.consumiAdd[i].f3_c_06;
        tot_consumi.f1_c_07 += this.state.consumiAdd[i].f1_c_07;
        tot_consumi.f2_c_07 += this.state.consumiAdd[i].f2_c_07;
        tot_consumi.f3_c_07 += this.state.consumiAdd[i].f3_c_07;
        tot_consumi.f1_c_08 += this.state.consumiAdd[i].f1_c_08;
        tot_consumi.f2_c_08 += this.state.consumiAdd[i].f2_c_08;
        tot_consumi.f3_c_08 += this.state.consumiAdd[i].f3_c_08;
        tot_consumi.f1_c_09 += this.state.consumiAdd[i].f1_c_09;
        tot_consumi.f2_c_09 += this.state.consumiAdd[i].f2_c_09;
        tot_consumi.f3_c_09 += this.state.consumiAdd[i].f3_c_09;
        tot_consumi.f1_c_10 += this.state.consumiAdd[i].f1_c_10;
        tot_consumi.f2_c_10 += this.state.consumiAdd[i].f2_c_10;
        tot_consumi.f3_c_10 += this.state.consumiAdd[i].f3_c_10;
        tot_consumi.f1_c_11 += this.state.consumiAdd[i].f1_c_11;
        tot_consumi.f2_c_11 += this.state.consumiAdd[i].f2_c_11;
        tot_consumi.f3_c_11 += this.state.consumiAdd[i].f3_c_11;
        tot_consumi.f1_c_12 += this.state.consumiAdd[i].f1_c_12;
        tot_consumi.f2_c_12 += this.state.consumiAdd[i].f2_c_12;
        tot_consumi.f3_c_12 += this.state.consumiAdd[i].f3_c_12;
      }

      this.setState({
        consumiModalIsOpen: false,
        gennaioF1	: tot_consumi.f1_c_01,
        gennaioF2	: tot_consumi.f2_c_01,
        gennaioF3	: tot_consumi.f3_c_01,
        febbraioF1	: tot_consumi.f1_c_02,
        febbraioF2	: tot_consumi.f2_c_02,
        febbraioF3	: tot_consumi.f3_c_02,
        marzoF1		: tot_consumi.f1_c_03,
        marzoF2		: tot_consumi.f2_c_03,
        marzoF3		: tot_consumi.f3_c_03,
        aprileF1	: tot_consumi.f1_c_04,
        aprileF2	: tot_consumi.f2_c_04,
        aprileF3	: tot_consumi.f3_c_04,
        maggioF1	: tot_consumi.f1_c_05,
        maggioF2	: tot_consumi.f2_c_05,
        maggioF3	: tot_consumi.f3_c_05,
        giugnoF1	: tot_consumi.f1_c_06,
        giugnoF2	: tot_consumi.f2_c_06,
        giugnoF3	: tot_consumi.f3_c_06,
        luglioF1	: tot_consumi.f1_c_07,
        luglioF2	: tot_consumi.f2_c_07,
        luglioF3	: tot_consumi.f3_c_07,
        agostoF1	: tot_consumi.f1_c_08,
        agostoF2	: tot_consumi.f2_c_08,
        agostoF3	: tot_consumi.f3_c_08,
        settembreF1	: tot_consumi.f1_c_09,
        settembreF2	: tot_consumi.f2_c_09,
        settembreF3	: tot_consumi.f3_c_09,
        ottobreF1	: tot_consumi.f1_c_10,
        ottobreF2	: tot_consumi.f2_c_10,
        ottobreF3	: tot_consumi.f3_c_10,
        novembreF1	: tot_consumi.f1_c_11,
        novembreF2	: tot_consumi.f2_c_11,
        novembreF3	: tot_consumi.f3_c_11,
        dicembreF1	: tot_consumi.f1_c_12,
        dicembreF2	: tot_consumi.f2_c_12,
        dicembreF3	: tot_consumi.f3_c_12,        
        cliente: tot_consumi.ragione_sociale,
        consumiAdd: []
       
      })
    }

  }


  async onClickParcheggia() {   
      this.setState({
        risParcheggio: 'Parcheggio in corso, attendere...'
      })

    //  await offer.parcheggia().then((res) => this.setState({ risParcheggia: res.consumi,  consumiListCount: res.count }))
      await offer.parcheggia(this.state).then((res) => this.setState({ risParcheggia: res.consumi }))
      //console.log('eccoceì');
    
  }


  

  ricalcolaPLOP(mese, indiceMese, valF1, valF2, valF3) {
    if(this.state.calcAutomatico)
    {
      let valPL = (this.state.conversione[indiceMese].F1TOPL	* Number(valF1) +
              this.state.conversione[indiceMese].F2TOPL	* Number(valF2) +
              this.state.conversione[indiceMese].F3TOPL	* Number(valF3)).toFixed(0); 

      let valOP = Number(valF1)+Number(valF2)+Number(valF3) - valPL;

      this.state[mese+"Peak"] = valPL;
      this.state[mese+"OffPeak"] = valOP;
      
    }
  }

  ricalcolaF1F2F3(mese, indiceMese, valPL, valOP) {
    if(this.state.calcAutomatico)
    {
      let valF1 = (this.state.conversione[indiceMese].PLTOF1	* Number(valPL) +
                  this.state.conversione[indiceMese].OPTOF1	* Number(valOP)).toFixed(0) ;

      let valF2 = (this.state.conversione[indiceMese].PLTOF2	* Number(valPL) +
                  this.state.conversione[indiceMese].OPTOF2	* Number(valOP)).toFixed(0) ;

      let valF3 = Number(valPL)+Number(valOP) - valF1 - valF2;

      this.state[mese+"F1"] = valF1;
      this.state[mese+"F2"] = valF2;
      this.state[mese+"F3"] = valF3;
      
    }
  }

  render() {
    let INIZIO_FORN = this.state.labels.map((value, index) => {
      return (
        <option key={index}>{value}</option>
      )
    })
    let FINE_FORN = INIZIO_FORN

    let PREZZI_CONSUMI = this.calcPrezziConsumi()
    let DECORRENZA = isNaN(meseAnno2Date(this.state.inizio_forn)) ? '' : moment(meseAnno2Date(this.state.inizio_forn)).format("DD/MM/YYYY")
    let MESI_FORNITURA = this.calcMesiFornitura()


    let quotazioni = this.state.infoOffer[0]
    let F1TOT = Number(this.state.gennaioF1) + Number(this.state.febbraioF1) + Number(this.state.marzoF1) + Number(this.state.aprileF1) + Number(this.state.maggioF1) + Number(this.state.giugnoF1) + Number(this.state.luglioF1) + Number(this.state.agostoF1) + Number(this.state.settembreF1) + Number(this.state.ottobreF1) + Number(this.state.novembreF1) + Number(this.state.dicembreF1)
    let F2TOT = Number(this.state.gennaioF2) + Number(this.state.febbraioF2) + Number(this.state.marzoF2) + Number(this.state.aprileF2) + Number(this.state.maggioF2) + Number(this.state.giugnoF2) + Number(this.state.luglioF2) + Number(this.state.agostoF2) + Number(this.state.settembreF2) + Number(this.state.ottobreF2) + Number(this.state.novembreF2) + Number(this.state.dicembreF2)
    let F3TOT = Number(this.state.gennaioF3) + Number(this.state.febbraioF3) + Number(this.state.marzoF3) + Number(this.state.aprileF3) + Number(this.state.maggioF3) + Number(this.state.giugnoF3) + Number(this.state.luglioF3) + Number(this.state.agostoF3) + Number(this.state.settembreF3) + Number(this.state.ottobreF3) + Number(this.state.novembreF3) + Number(this.state.dicembreF3)
    let F3PEAK = Number(this.state.gennaioPeak) + Number(this.state.febbraioPeak) + Number(this.state.marzoPeak) + Number(this.state.aprilePeak) + Number(this.state.maggioPeak) + Number(this.state.giugnoPeak) + Number(this.state.luglioPeak) + Number(this.state.agostoPeak) + Number(this.state.settembrePeak) + Number(this.state.ottobrePeak) + Number(this.state.novembrePeak) + Number(this.state.dicembrePeak)
    let F3OFFPEAK = Number(this.state.gennaioOffPeak) + Number(this.state.febbraioOffPeak) + Number(this.state.marzoOffPeak) + Number(this.state.aprileOffPeak) + Number(this.state.maggioOffPeak) + Number(this.state.giugnoOffPeak) + Number(this.state.luglioOffPeak) + Number(this.state.agostoOffPeak) + Number(this.state.settembreOffPeak) + Number(this.state.ottobreOffPeak) + Number(this.state.novembreOffPeak) + Number(this.state.dicembreOffPeak)


    let errorValida = this.state.errorValida.map((value, index) => {
      //return (<li key={index}>Insert: {value}</li>)
      return (<Alert
        type={value.tipo}>
        <strong>
          {value.msg}
        </strong>
        {/* This alert needs your attention, but it's not super important. */}
      </Alert>)
    })

 
    var tot_consumi = 0;
    for (var x in this.state.consumiAdd) {
      tot_consumi = tot_consumi +this.state.consumiAdd[x].tot_consumi;
    }

    let vofferList = this.state.offerteList.map((value, index) => {
      return (
        <TableRow key={index}>
          {/*  <TableCol>{index + 1}</TableCol> */}
          <TableCol>{value.cliente}</TableCol>
          <TableCol>{value.nomeOfferta}</TableCol>
          <TableCol>{value.inizio_forn}-{value.fine_forn}</TableCol>
          <TableCol>{value.data_creazione}</TableCol>
          <TableCol><button
            className="btn btn-primary" type="button"
            onClick={() => this.onClickLoadOffer(value)}><i className="fa fa-upload"></i></button></TableCol>

        </TableRow>
      )
    })

    let vconsumiList = this.state.consumiList.map((value, index) => {
      return (
        <TableRow key={index}>
          {/*  <TableCol>{index + 1}</TableCol> */}
          <TableCol>{value.ragione_sociale}</TableCol>
          <TableCol>{value.p_iva}</TableCol>
          <TableCol>{value.pod}</TableCol>
          <TableCol>{value.prov_pdr}</TableCol>
          <TableCol>
            {this.findConsumoAggiunto(value, index)}
          </TableCol>
        </TableRow>
      )
    })

    let vconsumiAdd = this.state.consumiAdd.map((value, index) => {
      return (
        <TableRow key={index}>
          {/*  <TableCol>{index + 1}</TableCol> */}
          <TableCol>{value.ragione_sociale}</TableCol>
          <TableCol>{value.p_iva}</TableCol>
          <TableCol>{value.pod}</TableCol>
          <TableCol>{value.prov_pdr}</TableCol>
          <TableCol><button
            className="btn btn-primary btn-xs" type="button"
            onClick={() => this.onClickConsumiDelete(value, index)}><i className="fa fa-angle-double-left" ></i></button></TableCol>
        </TableRow>
      )
    })


    let CONSUMI_MENSILI = nomiMesi.map((value,index) => {
      return (
        <span className="col-md-12 row input_anag">
        <p className="col-md-1 col-md-offset-1">{value}</p>
        <label className="mobile_text">F1</label>
        <NumberFormat 
          ref={value + "F1"}
          className="col-md-1 text-right"  
          thousandSeparator={'.'}
          decimalScale={0}
          decimalSeparator={','}
          value={this.state[value+"F1"]}
          onValueChange = {(values,e) => { 
            this.setState({ [value + "F1"] : values.floatValue }) 
            this.ricalcolaPLOP(value, index, values.floatValue, this.state[value+"F2"], this.state[value+"F3"]) 
            }  }
          />
        <label className="mobile_text">F2</label>
        <NumberFormat 
          ref={value + "F2"}
          className="col-md-1 text-right"  
          thousandSeparator={'.'}
          decimalScale={0}
          decimalSeparator={','}
          value={this.state[value+"F2"]}
          onValueChange = {(values,e) => { 
            this.setState({ [value + "F2"] : values.floatValue })
            this.ricalcolaPLOP(value, index, this.state[value+"F1"], values.floatValue,this.state[value+"F3"]) 
            }  }
          />
        <label className="mobile_text">F3</label>
        <NumberFormat 
          ref={value + "F3"}
          className="col-md-1 text-right"  
          thousandSeparator={'.'}
          decimalScale={0}
          decimalSeparator={','}
          value={this.state[value+"F3"]}
          onValueChange = {(values,e) => { 
            this.setState({ [value + "F3"] : values.floatValue })
            this.ricalcolaPLOP(value, index, this.state[value+"F1"], this.state[value+"F2"], values.floatValue) 
            }  }
          />
        <label className="mobile_text">TOT</label>
        <div
          className="col-md-1 text-right">{(Number(this.state[value+"F1"]) + Number(this.state[value+"F2"]) + Number(this.state[value+"F3"])).formatInt()}
        </div>

        <label className="mobile_text">Peak</label>
        <NumberFormat 
          ref={value + "Peak"}
          className="col-md-1  col-md-offset-1  text-right"  
          thousandSeparator={'.'}
          decimalScale={0}
          decimalSeparator={','}
          value={this.state[value+"Peak"]}
          onValueChange = {(values,e) => { 
            this.setState({ [value + "Peak"] : values.floatValue }) 
            this.ricalcolaF1F2F3(value, index, values.floatValue, this.state[value+"OffPeak"])
            }  }
          />
        <label className="mobile_text">OffPeak</label>
        <NumberFormat 
          ref={value + "OffPeak"}
          className="col-md-1  text-right"  
          thousandSeparator={'.'}
          decimalScale={0}
          decimalSeparator={','}
          value={this.state[value+"OffPeak"]}
          onValueChange = {(values,e) => { 
            this.setState({ [value + "OffPeak"] : values.floatValue }) 
            this.ricalcolaF1F2F3(value, index, this.state[value+"Peak"], values.floatValue)
            }  }
          />
        <label className="mobile_text">TOT</label>
        <div
          className="col-md-1 text-right">{(Number(this.state[value + "Peak"]) + Number(this.state[value + "OffPeak"])).formatInt()}</div>
      </span>
      )

    })

    return (
      <div>
        {/*-----------------------------------*/}
        <Modal
          ariaHideApp={false}
          isOpen={this.state.verificaModalIsOpen}
          onRequestClose={() => this.setState({ verificaModalIsOpen: false, errorValida: [] })}
          style={verificaStyles}
        >
          <div className="modal-footer">
            <button style={{ background: "RGB(220, 230, 241)", border: "none" }} onClick={() => this.setState({ verificaModalIsOpen: false, errorValida: [] })}>X</button>
          </div>
          {this.state.errorValida !== [] ? (
            <ul className="errorValida">{errorValida}</ul>) : null}
        </Modal>
        {/*-----------------------------------*/}
        <Modal
          ariaHideApp={false}
          isOpen={this.state.offerteModalIsOpen}
          onRequestClose={() => this.setState({ offerteModalIsOpen: false })}
          style={offerteStyles}
        >
          <div className="modal-footer">
            <button style={{ background: "RGB(220, 230, 241)", border: "none" }} onClick={() => this.setState({ offerteModalIsOpen: false })}>X</button>
          </div>

          <div className="row col-12">
            <div className="col-md-9 textSearch">
              <input type="text" className="form-control" placeholder="Inserire testo ricerca"
                value={this.state.offerSearch}
                onChange={(e) => this.setState({ offerSearch: e.target.value })} />
            </div>
            <button onClick={() => 
              {
              this.setState({ offerPage: 1  }) 
              this.getOfferList(1, this.state.offerSearch)}
             } className="col btn btn-outline-secondary"
              type="button">Search <i className="fas fa-search"> </i></button>
          </div>


          <div>
            <Pagination
              activePage={this.state.offerPage}
              itemsCountPerPage={10}
              totalItemsCount={this.state.offerteListCount}
              pageRangeDisplayed={10}
              onChange={(e) => this.handleOfferPageChange(e)}
            />
          </div>


          <Table>
            <TableHeader>
              {
                headersOfferte.map(
                  (header, headerIdx) => {
                    return (
                      <TableCol key={headerIdx}>
                        {header}
                      </TableCol>
                    );
                  }
                )
              }
            </TableHeader>
            <TableBody>
              {vofferList}
            </TableBody>
          </Table>


        </Modal>
        {/*-----------------------------------*/}
        <Modal
          ariaHideApp={false}
          isOpen={this.state.consumiModalIsOpen}
          onRequestClose={() => this.setState({ consumiModalIsOpen: false, consumiAdd: [] })}
          style={offerteStyles}
        >
          <div className="modal-footer">
            <button style={{ background: "RGB(220, 230, 241)", border: "none" }} onClick={() => this.setState({ consumiModalIsOpen: false })}>X</button>
          </div>

          <div className="row col-12">
            <div className="col-md-9 textSearch">
              <input type="text" className="form-control" placeholder="Inserire testo ricerca"
                value={this.state.consumiSearch}
                onChange={(e) => this.setState({ consumiSearch: e.target.value })} />
            </div>
            <button onClick={() => { 
                      this.setState({ consumiPage: 1  })                  
                      this.getConsumiList(1, this.state.consumiSearch)
                    }} className="col btn btn-outline-secondary"
              type="button">Search <i className="fas fa-search"> </i></button>
          </div>
          

            <div className="col-md-12 row">
            <div className="col-md-6 row">
            <Pagination
              activePage={this.state.consumiPage}
              itemsCountPerPage={10}
              totalItemsCount={this.state.consumiListCount}
              pageRangeDisplayed={10}
              onChange={(e) => this.handleConsumiPageChange(e)}
            />
           </div>
           <div className="col-md-3 text-left">
            <p>Consumi: <span  style={{ color: "#333399", fontWeight: "bold" }}> {tot_consumi.formatInt()}</span></p>
            </div>
            <div className="col-md-3 text-right text-top">
            <button onClick={() => this.onClickLoadConsumi()} className="btn  btn-success"
                type="button"  style={ this.state.consumiAdd.length > 0 ? { display: 'block' } : { display: "none" }}>Carica
              </button>
            </div>
           </div>
           

          <div className="col-md-12 row">
            <ul className="datagrit col-md-6">
              <Table>
              <TableHeader>
                {
                  headersConsumi.map(
                    (header, headerIdx) => {
                      return (
                        <TableCol key={headerIdx}>
                          {header}
                        </TableCol>
                      );
                    }
                  )
                }
              </TableHeader>
              <TableBody>
                {vconsumiList}
              </TableBody>
            </Table>
            </ul>
            <ul className="datagrit col-md-6">
            <Table>
            <TableHeader>
              {
                headersConsumi.map(
                  (header, headerIdx) => {
                    return (
                      <TableCol key={headerIdx}>
                        {header}
                      </TableCol>
                    );
                  }
                )
              }
            </TableHeader>
            <TableBody>
              {vconsumiAdd}
            </TableBody>
          </Table>
            </ul>
          </div>
        </Modal>
        {/*-----------------------------------*/}
        <Modal
          ariaHideApp={false}
          isOpen={this.state.parcheggiaModalIsOpen}
          onRequestClose={() => this.setState({ parcheggiaModalIsOpen: false})}
          style={parcheggiaStyles}
        >
          <div className="modal-footer">
            <button style={{ background: "RGB(220, 230, 241)", border: "none" }} onClick={() => this.setState({ parcheggiaModalIsOpen: false })}>X</button>
          </div>
          

          <div className="row col-12">
              <p style={{ color: "#333399", fontWeight: "bold" }} className="col-md-1">Offerta:</p>
                      <input value={this.state.nomeOfferta} onChange={(e) => this.setState({ nomeOfferta: e.target.value })}
                        className="col-md-8" style={{
                          background: "#dce6f1",
                          border: "none"
                        }} />
              <button onClick={() => this.onClickParcheggia()} className="btn btn-success"
                type="button"  ><i className="fas fa-save"></i> Salva
              </button>
         </div>
         <div className="row col-12">
            <p style={{ color: "#333399", fontWeight: "bold" }} className="col-md-1">Stato:</p>
              <div className="col-md-8" style={{ color: "#333399", border: "none" }} >
              { this.state.risParcheggio }
              </div>
         </div>

            
           


        </Modal>
        {/*-----------------------------------*/}
        <AnimatedView>
          {quotazioni === undefined ? (
            <div>Loading... <br />if the loading takes more than 15 seconds, restart the page</div>
          ) : (

              <div className="container-fluid">

                <ul className="list-inline">
                  <li className="col-md-3 text-left">quotazioni aggiornate al: {this.state.data.q_data_prezzi}</li>
                  <li className="col-md-offset-1 col-md-2">KAM: <span className="heade_bg"> {quotazioni.kam}</span></li>
                  <li className="col-md-offset-1 col-md-5">

                    <div className="row">
                      <p style={{ color: "#333399", fontWeight: "bold" }} className="col-md-2">Offerta:</p>
                      <input value={this.state.nomeOfferta} onChange={(e) => this.setState({ nomeOfferta: e.target.value })}
                        className="col-md-10" style={{
                          background: "#dce6f1",
                          border: "none"
                        }} />
                    </div>


                  </li>
                </ul>
                <br />
                <div className="row col-12">
                  <div className="col-md-9 text-center button_top">
                    <button onClick={() => {
                      this.Verifica();
                      this.setState({ verificaModalIsOpen: true })
                    }} className="col  btn btn-primary" type="button"><i className="fas fa-thumbs-up"></i>Verifica
                    </button>

                    <button 
                    onClick={() => {
                        this.setState({ parcheggiaModalIsOpen: true, risParcheggio: ''  })
                      }}
                      className="col  btn btn-success" type="button" ><i className="fas fa-check"></i>Parcheggia                
                    </button>



                    {/* <a
                  className="btn btn-danger"
                  data-toggle="modal"
                  href="#modalCtrlNewOffer">
                  Alert !
                </a>
 */}
                    <button className="col  btn btn-danger" type="button"><i className="fas fa-caret-right"></i>Conferma
                </button>
                  {/*   <button className="col  btn btn-danger" type="button"><i className="fas fa-caret-right"></i>Conferma
                      Calcolo Posticipato
                </button> */}
                    <button onClick={() => { 
                      this.setState({ consumiPage: 1, consumiSearch: '' })
                      this.getConsumiList(1, '')
                    }} className="col btn btn-success" type="button"><i className="fas fa-gift"></i>Consumi
                  </button>
                    <button onClick={() => {
                      this.setState({ offerPage: 1, offerSearch: '' })
                      this.getOfferList(1, '')
                    }} className="col  btn btn-success" type="button"><i className="fas fa-newspaper"></i>Offerte
                  </button>
                  </div>
                </div>
                <div className="Riepilogo row">
                  <p className="col-md-12" style={{ color: "#366092", fontWeight: "bold", marginTop: '10px' }}>Riepilogo</p>
                  <div className="col-md-3 Riepilogo_body">
                    <span className="col-md-12 row ">
                      <p className="col-md-6  col-xs-12">Consumo fornito kWh</p>
                      <div className="col-md-6  col-xs-12 text-right"
                        style={{ background: "RGB(220, 230, 241)", border: "none"}}>{(PREZZI_CONSUMI.totConsumo).formatInt()}</div>
                    </span>
                    <span className="col-md-12 row ">
                      <p className="col-md-6  col-xs-12">BLD Mkt €/MWh</p>
                      <div className="col-md-6 col-xs-12 text-right"
                        style={{ background: "RGB(242, 220, 219)", border: "none" }} >
                        {Number(PREZZI_CONSUMI.valoreBaseLoad).formatDec()}
                      </div>
                    </span>
                    <span className="col-md-12 row ">
                      <p className="col-md-6  col-xs-12">BLD Profilato €/MWh</p>
                      <div className="col-md-6  col-xs-12 text-right" 
                        style={{ background: "RGB(242, 220, 219)", border: "none" }} >
                        {Number(PREZZI_CONSUMI.valoreProfilato).formatDec()} 
                        </div>
                    </span>
                    <span className="col-md-12 row ">
                      <p className="col-md-6  col-xs-12">Prezzo Medio €/MWh</p>
                      <input className="col-md-6  col-xs-12 text-center" value="0000"
                        style={{ background: "RGB(220, 230, 241)", border: "none" }} />
                    </span>
                  </div>
                  <div className="col-md-3 Riepilogo_body">
                    <span className="col-md-12 row">
                      <p className="col-md-6  col-xs-12">Costo Profilo  €/MWh</p>
                      <input className="col-md-6  col-xs-12 text-right" value={(PREZZI_CONSUMI.costoProfilo).formatDec()}
                        style={{ background: "RGB(242, 220, 219)", border: "none" }} />
                    </span>
                    <span className="col-md-12 row">
                      <p className="col-md-6 col-xs-12">Margine €/MWh</p>
                      <div className="col-md-6  col-xs-12 text-right"
                        style={{ background: "RGB(220, 230, 241)", border: "none" }}>{Number(PREZZI_CONSUMI.margineEuroMwh).formatDec()}</div>
                    </span>
                    <span className="col-md-12 row">
                      <p className="col-md-6  col-xs-12">Margine Vendita €</p>
                      <div className="col-md-6  col-xs-12 text-center"
                        style={{ background: "RGB(220, 230, 241)", border: "none" }}>000</div>
                    </span>
                    <span className="col-md-12 row">
                      <p className="col-md-6  col-xs-12">Margine Vendita Verde €</p>
                      <div className="col-md-6  col-xs-12 text-right"
                        style={{ background: "RGB(216, 228, 188)", border: "none" }}>{this.state.greenMargine.formatDec()}</div>
                    </span>
                  </div>
                  <div className="col-md-3 Riepilogo_body">
                    <span className="col-md-12 row">
                      <p className="col-md-6  col-xs-12">Decorrenza</p>
                      <input className="col-md-6  col-xs-12 text-left" value={DECORRENZA}
                        style={{ color: "#366092", fontWeight: "bold", background: "RGB(242, 220, 219)", border: "none" }} />
                    </span>
                    <span className="col-md-12 row">
                      <p className="col-md-6 col-xs-12">L'offerta scade alle ore</p>
                      <div className="col-md-6  col-xs-12 text-left"
                        style={{ color: "#366092", fontWeight: "bold", background: "RGB(220, 230, 241)", border: "none" }}>{this.state.ore_validita}</div>
                    </span>

                  </div>

                  <div className="col-md-3 Riepilogo_body">
                    <span className="col-md-12 row">
                      <p className="col-md-6  col-xs-12">Mesi fornitura</p>
                      <input className="col-md-6  col-xs-12 text-left" value={MESI_FORNITURA}
                        style={{ color: "#366092", fontWeight: "bold", background: "RGB(242, 220, 219)", border: "none" }} />
                    </span>
                    <span className="col-md-12 row">
                      <p className="col-md-6 col-xs-12">del</p>
                      <div className="col-md-6  col-xs-12 text-left"
                        style={{ color: "#366092", fontWeight: "bold", background: "RGB(220, 230, 241)", border: "none" }}>{this.state.data_validita}</div>
                    </span>

                  </div>

                </div>
                <div className="anag_block row col-12">
                  <p className="col-md-12"
                    style={{ color: "#366092", marginTop: '10px', fontStyle: "italic", fontWeight: "bold" }}>Anagrafica
                Cliente/Gruppo</p>
                  <div className="row container-fluid">
                    <p style={{ color: "#333399", fontWeight: "bold" }} className="col-md-1 text-center">Cliente</p>
                    <input value={this.state.cliente} onChange={(e) => this.setState({ cliente: e.target.value })}
                      className="col-md-10 col-xs-12" style={{
                        background: "#dce6f1",
                        border: "none"
                      }} />
                  </div>
                  <div className="row container-fluid">
                    <p style={{ color: "#333399", fontWeight: "bold" }} className="col-md-1 text-center">Indirizzo</p>
                    <input value={this.state.indirizzo} onChange={(e) => this.setState({ indirizzo: e.target.value })}
                      className="col-md-4 col-xs-12" style={{
                        background: "#dce6f1",
                        border: "none"
                      }} />
                    <p style={{ color: "#333399", fontWeight: "bold" }} className="col-md-2 text-center">Cap e Località</p>
                    <input value={this.state.localita} onChange={(e) => this.setState({ localita: e.target.value })}
                      className="col-md-4 col-xs-12" style={{
                        background: "#dce6f1",
                        border: "none"
                      }} />
                  </div>
                  <div className="row container-fluid">
                    <p className="col-md-2" style={{
                      color: "#333399",
                      fontWeight: "bold",
                    }}>Periodo di fornitura</p>
                    <div className="col-md-1">
                      <input onClick={() => this.handleRadioForn(this.state.inizio_forn, 6)} name="radioForn" type="radio" checked={this.state.radioForn === 6} />
                      <label>6 mesi</label>
                    </div>
                    <div className="col-md-1">
                      <input onClick={() => this.handleRadioForn(this.state.inizio_forn, 12)} name="radioForn" type="radio" checked={this.state.radioForn === 12} />
                      <label>12 mesi</label>
                    </div>
                    <div className="col-md-1">
                      <input onClick={() => this.handleRadioForn(this.state.inizio_forn, 24)} name="radioForn" type="radio" checked={this.state.radioForn === 24} />
                      <label>24</label>
                    </div>
                    <div className="col-md-1">
                      <input onClick={() => this.handleRadioForn(this.state.inizio_forn, 100)} name="radioForn" type="radio" checked={this.state.radioForn === 100} />
                      <label>fine anno</label>
                    </div>

                    <p className="col-md-2" style={{
                      color: "#333399",
                      fontWeight: "bold"
                    }}>Scadenza dell’offerta</p>
                    <div className="col-md-1">
                      <input name="radioScad" type="radio" checked={this.state.radioScad === "oggi"} onClick={() => {
                        this.handleRadioScad(0, "oggi")
                      }} />
                      <label>oggi</label>
                    </div>
                    <div className="col-md-1">
                      <input name="radioScad" type="radio" checked={this.state.radioScad === "domani"} onClick={() => {
                        this.handleRadioScad(1, "domani")
                      }} />
                      <label>domani</label>
                    </div>
                    <div className="col-md-1">
                      <input name="radioScad" type="radio" checked={this.state.radioScad === "2 gg"} onClick={() => {
                        this.handleRadioScad(2, "2 gg")
                      }} />
                      <label>2 gg</label>
                    </div>
                    <div className="col-md-1">
                      <input name="radioScad" type="radio" checked={this.state.radioScad === "3 gg"} onClick={() => {
                        this.handleRadioScad(3, "3 gg")
                      }} />
                      <label>3 gg</label>
                    </div>
                  </div>
                  <div className="row container-fluid">
                    <p className="col-md-1 text-center" style={{
                      color: "#333399",
                      fontWeight: "bold",
                    }}>
                      Inizio Fornitura
                      </p>
                    <span className="col-md-1" style={{ color: "#333399" }}>
                      <select value={this.state.inizio_forn}
                        onChange={(e) => this.handleInizioForn(e.target.value, this.state.radioForn)}  >
                        {INIZIO_FORN}
                      </select>
                    </span>
                   
                    <p className="col-md-1 text-center" style={{
                      color: "#333399",
                      fontWeight: "bold",
                    }}>
                      Fine Fornitura
                </p>
                    <span className="col-md-1" style={{ color: "#333399" }}>
                      <select value={this.state.fine_forn} onChange={(e) => this.setState({ radioForn: 0, fine_forn: e.target.value })} >
                        {FINE_FORN}
                      </select>
                    </span>
                    <p className="col-md-3 text-right" style={{
                      color: "#333399",
                      fontWeight: "bold",
                    }}>
                      Posticipo Offerta
                </p>
                    <div className='col-md-1'><DatePicker
                      className="time"
                      selected={moment(this.state.data_posticipo, "DD/MM/YYYY")}
                      locale="it"
                      onChange={(e) => this.handleDataPosticipo(e.format("DD/MM/YYYY"))
                      }
                      dateFormat="DD/MM/YYYY"
                    /></div>
                <p className="col-md-1 text-center" style={{
                      color: "#333399",
                      fontWeight: "bold",
                    }}>
                      Validità Offerta
                </p>
                <p className="col-md-1 text-center" style={{
                      color: "#333399",
                      fontWeight: "bold",
                    }}>
                    {this.state.data_validita}
                    </p>

                    <p className="col-md-1 text-center" style={{
                      color: "#333399",
                      fontWeight: "bold",
                    }}>
                      Entro ore:
                </p>
                    <div className="col-md-1" style={{
                      color: "#333399",
                      fontWeight: "bold",
                    }}>
                    {this.state.ore_validita}
                      {/* <select value={this.state.ore_validita}
                        onChange={(e) => this.setState({ ore_validita: e.target.value })}>
                        <option>01:00</option>
                        <option>02:00</option>
                        <option>03:00</option>
                        <option>04:00</option>
                        <option>05:00</option>
                        <option>06:00</option>F
                        <option>07:00</option>
                        <option>08:00</option>
                        <option>09:00</option>
                        <option>10:00</option>
                        <option>11:00</option>
                        <option>12:00</option>
                        <option>13:00</option>
                        <option>14:00</option>
                        <option>15:00</option>
                        <option>16:00</option>
                        <option>17:00</option>
                        <option>18:00</option>
                        <option>19:00</option>
                        <option>20:00</option>
                        <option>21:00</option>
                        <option>22:00</option>
                        <option>23:00</option>
                        <option>24:00</option>
                      </select> */}
                    </div>
                  </div>
                </div>
                <div className="Fornitura row">
                  <p className="col-md-12"
                    style={{ color: "#366092", marginTop: '10px', fontStyle: "italic", fontWeight: "bold" }}>Dati
                Fornitura</p>
                  <span className="col-md-12 row">
                    <p className="col-md-1 col-md-offset-1" style={{ color: "#333399", fontWeight: "bold" }}>Consumi</p>
                    <div className="col-md-1">
                      <input value="Mensili" onClick={(e) => this.setState({ tipoConsumi: e.target.value })} name="Consumi"
                        type="radio"
                        checked={this.state.tipoConsumi === 'Mensili'} />
                      <label>M</label>
                    </div>
                    <div className="col-md-1">
                      <input value="Annui" onClick={(e) => this.setState({ tipoConsumi: e.target.value })} name="Consumi"
                        type="radio"
                        checked={this.state.tipoConsumi === 'Annui'} />
                      <label>A</label>
                    </div>

                   <div className="col-md-3">
                      <input onClick={(e) => this.setState({ calcAutomatico : e.target.checked })} name="CalcAutomatico"
                        type="checkbox"
                        checked={this.state.calcAutomatico} />
                      <label>Calcolo automatico 3f - 2f</label>
                    </div>
                    
                  </span>
                  <span className="col-md-12 row block_mobile">
                    <p className="col-md-1 col-md-offset-1" style={{ color: "#333399" }}>[kWh]</p>
                    <div className="col-md-1 text-center" style={{ background: "#4c7fbc", color: "#fff" }}>F1</div>
                    <div className="col-md-1 text-center" style={{ background: "#4c7fbc", color: "#fff" }}>F2</div>
                    <div className="col-md-1 text-center" style={{ background: "#4c7fbc", color: "#fff" }}>F3</div>
                    <div className="col-md-1 text-center">TOT</div>
                    <div className="col-md-1 col-md-offset-1 text-center"
                      style={{ background: "#4c7fbc", color: "#fff" }}>Peak</div>
                    <div className="col-md-1 text-center" style={{ background: "#4c7fbc", color: "#fff" }}>OffPeak</div>
                    <div className="col-md-1 text-center">TOT</div>
                  </span>
                  <div style={this.state.tipoConsumi === "Annui" ? { display: "none" } : null}>
                    { CONSUMI_MENSILI}
                  </div> 
                  <span style={this.state.tipoConsumi === "Annui" ? { display: "none" } : null} className="col-md-12 row">
                    <p className="col-md-1 col-md-offset-1" style={{ color: "#333399", fontWeight: "bold" }}>TOT</p>
                    <label className="col-md-1 text-right" style={{ background: "#dce6f1", border: "none" }}>{F1TOT.formatInt()}</label>
                    <label className="col-md-1 text-right" style={{ background: "#dce6f1", border: "none" }}>{F2TOT.formatInt()}</label>
                    <label className="col-md-1 text-right" style={{ background: "#dce6f1", border: "none" }}>{F3TOT.formatInt()}</label>
                    <label className="col-md-1 text-right">{(F3TOT + F1TOT + F2TOT).formatInt()}</label>
                    <label className="col-md-1 col-md-offset-1 text-right"
                      style={{ background: "#dce6f1", border: "none" }}>{F3PEAK.formatInt()}</label>
                    <label className="col-md-1 text-right"
                      style={{ background: "#dce6f1", border: "none" }}>{F3OFFPEAK.formatInt()}</label>
                    <label className="col-md-1 text-right">{(F3PEAK + F3OFFPEAK).formatInt()}</label>
                  </span>
                  <div style={this.state.tipoConsumi === "Mensili" ? { display: "none" } : null}>
                    <span className="col-md-12 row input_anag">
                      <p className="col-md-2" style={{ color: "#333399", fontWeight: "bold" }}>Consumo Annuo</p>
                      <input className="col-md-1 text-right" value={this.state.consumoAnnuoF1}
                        onChange={(e) => this.setState({ consumoAnnuoF1: e.target.value })} />
                      <input className="col-md-1 text-right" value={this.state.consumoAnnuoF2}
                        onChange={(e) => this.setState({ consumoAnnuoF2: e.target.value })} />
                      <input className="col-md-1 text-right" value={this.state.consumoAnnuoF3}
                        onChange={(e) => this.setState({ consumoAnnuoF3: e.target.value })} />
                      <div className="col-md-1 text-right" style={{
                        color: "#333399",
                        fontWeight: "bold"
                      }}>{Number(this.state.consumoAnnuoF1) + Number(this.state.consumoAnnuoF2) + Number(this.state.consumoAnnuoF3)}</div>
                      <input className="col-md-1 col-md-offset-1 text-right"
                        value={this.state.consumoAnnuoPL}
                        onChange={(e) => this.setState({ consumoAnnuoPL: e.target.value })} />
                      <input className="col-md-1 text-right" value={this.state.consumoAnnuoOP}
                        onChange={(e) => this.setState({ consumoAnnuoOP: e.target.value })} />
                      <div className="col-md-2 text-right" style={{
                        color: "#333399",
                        fontWeight: "bold"
                      }}>{Number(this.state.consumoAnnuoPL) + Number(this.state.consumoAnnuoOP)}</div>
                    </span>
                    <span className="col-md-12 row">
                      <p className="col-md-2" style={{ color: "#333399", fontWeight: "bold" }}>Profilo Cons.Annuo</p>
                      <div
                        className="col-md-1 text-right">{((Number(this.state.consumoAnnuoF1) / F1TOT) * 100).toFixed(1)}%</div>
                      <div
                        className="col-md-1 text-right">{((Number(this.state.consumoAnnuoF2) / F2TOT) * 100).toFixed(1)}%</div>
                      <div
                        className="col-md-1 text-right">{((Number(this.state.consumoAnnuoF3) / F3TOT) * 100).toFixed(1)}%</div>
                      <div
                        className="col-md-1 text-right">{(((Number(this.state.consumoAnnuoF1) + Number(this.state.consumoAnnuoF2) + Number(this.state.consumoAnnuoF3)) / (F1TOT + F2TOT + F3TOT)) * 100).toFixed(1)}%</div>
                      <div
                        className="col-md-1 col-md-offset-1 text-right">{((Number(this.state.consumoAnnuoPL) / F3PEAK) * 100).toFixed(1)}%</div>
                      <div
                        className="col-md-1 text-right">{((Number(this.state.consumoAnnuoOP) / F3OFFPEAK) * 100).toFixed(1)}%</div>
                      <div
                        className="col-md-1 text-right">{(((Number(this.state.consumoAnnuoOP) + Number(this.state.consumoAnnuoPL)) / (F3PEAK + F3OFFPEAK)) * 100).toFixed(1)}%</div>
                    </span>
                  </div>
                  <div>
                    <span className="col-md-12 row">
                      <p className="col-md-2" style={{ color: "#333399", fontWeight: "bold" }}>Сonsumo fornito</p>
                      <input className="col-md-1 text-right" value={(PREZZI_CONSUMI.totConsumoF1).formatInt()}
                        style={{ background: "#dce6f1", border: "none", color: "#333399", fontWeight: "bold" }} />
                      <input className="col-md-1 text-right" value={(PREZZI_CONSUMI.totConsumoF2).formatInt()}
                        style={{ background: "#dce6f1", border: "none", color: "#333399", fontWeight: "bold" }} />
                      <input className="col-md-1 text-right" value={(PREZZI_CONSUMI.totConsumoF3).formatInt()}
                        style={{ background: "#dce6f1", border: "none", color: "#333399", fontWeight: "bold" }} />
                      <div className="col-md-1 text-right" style={{ color: "#333399", fontWeight: "bold" }}>{(PREZZI_CONSUMI.totConsumoF1 + PREZZI_CONSUMI.totConsumoF2 + PREZZI_CONSUMI.totConsumoF3).formatInt()}</div>
                      <input className="col-md-1 col-md-offset-1 text-right" value={(PREZZI_CONSUMI.totConsumoPeak).formatInt()}
                        style={{ background: "#dce6f1", border: "none", color: "#333399", fontWeight: "bold" }} />
                      <input className="col-md-1 text-right" value={(PREZZI_CONSUMI.totConsumoOffPeak).formatInt()}
                        style={{ background: "#dce6f1", border: "none", color: "#333399", fontWeight: "bold" }} />
                      <div className="col-md-1 text-right" style={{ color: "#333399", fontWeight: "bold" }}>{(PREZZI_CONSUMI.totConsumoPeak + PREZZI_CONSUMI.totConsumoOffPeak).formatInt()}</div>
                    </span>
                    <span className="col-md-12 row">
                      <p className="col-md-2" style={{ color: "#333399", fontWeight: "bold" }}>Profilo fornitura</p>
                      <div className="col-md-1 text-right" style={{ color: "#333399" }}>{(100 * PREZZI_CONSUMI.totConsumoF1 / (PREZZI_CONSUMI.totConsumoF1 + PREZZI_CONSUMI.totConsumoF2 + PREZZI_CONSUMI.totConsumoF3)).formatInt()}%</div>
                      <div className="col-md-1 text-right" style={{ color: "#333399" }}>{(100 * PREZZI_CONSUMI.totConsumoF2 / (PREZZI_CONSUMI.totConsumoF1 + PREZZI_CONSUMI.totConsumoF2 + PREZZI_CONSUMI.totConsumoF3)).formatInt()}%</div>
                      <div className="col-md-1 text-right" style={{ color: "#333399" }}>{(100 * PREZZI_CONSUMI.totConsumoF3 / (PREZZI_CONSUMI.totConsumoF1 + PREZZI_CONSUMI.totConsumoF2 + PREZZI_CONSUMI.totConsumoF3)).formatInt()}%</div>
                      <div className="col-md-1 text-right"> </div>
                      <div className="col-md-1 col-md-offset-1 text-right" style={{ color: "#333399" }}>{(100 * PREZZI_CONSUMI.totConsumoPeak / (PREZZI_CONSUMI.totConsumoPeak + PREZZI_CONSUMI.totConsumoOffPeak)).formatInt()}%</div>
                      <div className="col-md-1 text-right" style={{ color: "#333399" }}>{(100 * PREZZI_CONSUMI.totConsumoOffPeak / (PREZZI_CONSUMI.totConsumoPeak + PREZZI_CONSUMI.totConsumoOffPeak)).formatInt()}%</div>
                      <div className="col-md-1 text-right"> </div>
                      <div className="col-md-2  text-right"> </div>
                    </span>
                  </div>
                </div>
                <div className="Prezzo row">
                  <p className="col-md-12" style={{ color: "#366092", fontWeight: "bold", marginTop: '10px' }}>Prezzo
                FISSO</p>
                  <span className="col-md-12 row block_mobile">
                    <p className="col-md-1 col-md-offset-1"> </p>
                    <div className="col-md-1 text-center" style={{ background: "#4c7fbc", color: "#fff" }}>F1</div>
                    <div className="col-md-1 text-center" style={{ background: "#4c7fbc", color: "#fff" }}>F2</div>
                    <div className="col-md-1 text-center" style={{ background: "#4c7fbc", color: "#fff" }}>F3</div>
                    <div className="col-md-1 text-center" style={{ background: "#4c7fbc", color: "#fff" }}>Profilato</div>
                    <div className="col-md-1 col-md-offset-1 text-center"
                      style={{ background: "#4c7fbc", color: "#fff" }}>Peak</div>
                    <div className="col-md-1 text-center" style={{ background: "#4c7fbc", color: "#fff" }}>OffPeak</div>
                    <div className="col-md-1 text-center" style={{ background: "#4c7fbc", color: "#fff" }}>Profilato</div>
                  </span>
                  <span className="col-md-12 row">
                    <p className="col-md-2" style={{ color: "#366092", fontWeight: "bold" }}>Sourcing €/MWh</p>
                    <label className="mobile_text">F1</label>
                    <div className="col-md-1 text-right" 
                      style={{ color: "#333399", background: "#dce6f1", border: "none" }}>
                      {Number(PREZZI_CONSUMI.przSourcingF1).formatDec()}
                    </div>
                    <label className="mobile_text">F2</label>
                    <div className="col-md-1 text-right"
                      style={{ color: "#333399", background: "#dce6f1", border: "none" }} >
                      {Number(PREZZI_CONSUMI.przSourcingF2).formatDec()}
                    </div>
                    <label className="mobile_text">F3</label>
                    <div className="col-md-1 text-right"
                      style={{ color: "#333399", background: "#dce6f1", border: "none" }} >
                      {Number(PREZZI_CONSUMI.przSourcingF3).formatDec()}
                    </div>
                    <label className="mobile_text">Profilato</label>
                    <div className="col-md-1 text-right" style={{ color: "#333399", }}>{Number(PREZZI_CONSUMI.przSourcing3Fprof).formatDec()}</div>
                    <label className="mobile_text">Peak</label>
                    <div className="col-md-1 col-md-offset-1 text-right" style={{ color: "#333399", background: "#dce6f1", border: "none" }}>
                    {Number(PREZZI_CONSUMI.przSourcingPeak).formatDec()}</div>
                    <label className="mobile_text">OffPeak</label>
                    <div className="col-md-1 text-right" style={{ color: "#333399", background: "#dce6f1", border: "none" }} >
                    {Number(PREZZI_CONSUMI.przSourcingOffPeak).formatDec()}</div>
                    <label className="mobile_text">Profilato</label>
                    <div className="col-md-1 text-right" style={{ color: "#333399", }}>{Number(PREZZI_CONSUMI.przSourcing2Fprof).formatDec()}</div>
                  </span>
                  <span className="col-md-12 row">
                    <p className="col-md-2" style={{ color: "#366092", fontWeight: "bold" }}>Margine €/MWh</p>
                    <NumberFormat className="col-md-1 text-right" style={{ background: "#dce6f1", border: "none" }} 
                        thousandSeparator={'.'}
                        decimalSeparator={','}
                        decimalScale={2}
                        fixedDecimalScale={true}
                        value={this.state.fixMargineF1}
                        onValueChange = {(values,e) => { this.setState({ fixMargineF1: values.floatValue }) }  }
                       />
                       <NumberFormat className="col-md-1 text-right" style={{ background: "#dce6f1", border: "none" }} 
                        thousandSeparator={'.'}
                        decimalSeparator={','}
                        decimalScale={2}
                        fixedDecimalScale={true}
                        value={this.state.fixMargineF2}
                        onValueChange = {(values,e) => { this.setState({ fixMargineF2: values.floatValue }) }  }
                       />
                       <NumberFormat className="col-md-1 text-right" style={{ background: "#dce6f1", border: "none" }} 
                        thousandSeparator={'.'}
                        decimalSeparator={','}
                        decimalScale={2}
                        fixedDecimalScale={true}
                        value={this.state.fixMargineF3}
                        onValueChange = {(values,e) => { this.setState({ fixMargineF3: values.floatValue }) }  }
                       />
                       <div className="col-md-1 text-right" style={{ color: "#333399" }}>
                        { ( Number(PREZZI_CONSUMI.PrzFinale3fprof) - Number(PREZZI_CONSUMI.przSourcing3Fprof)).formatDec() }
                       </div>
                       <NumberFormat className="col-md-1 col-md-offset-1 text-right" style={{ background: "#dce6f1", border: "none" }} 
                        thousandSeparator={'.'}
                        decimalSeparator={','}
                        decimalScale={2}
                        fixedDecimalScale={true}
                        value={this.state.fixMarginePL}
                        onValueChange = {(values,e) => { this.setState({ fixMarginePL: values.floatValue }) }  }
                       />
                       <NumberFormat className="col-md-1 text-right" style={{ background: "#dce6f1", border: "none" }} 
                        thousandSeparator={'.'}
                        decimalSeparator={','}
                        decimalScale={2}
                        fixedDecimalScale={true}
                        value={this.state.fixMargineOP}
                        onValueChange = {(values,e) => { this.setState({ fixMargineOP: values.floatValue }) }  }
                       />
                       <div className="col-md-1 text-right" style={{ color: "#333399" }}>
                       { ( Number(PREZZI_CONSUMI.PrzFinale2fprof) - Number(PREZZI_CONSUMI.przSourcing2Fprof)).formatDec() }
                       </div>
         
                  </span>
                  <span className="col-md-12 row">
                    <p className="col-md-2" style={{ color: "#366092", fontWeight: "bold" }}>Prezzo Finale €/MWh</p>
                    <label className="mobile_text">F1</label>
                    <div className="col-md-1 text-right" style={{ background: "#dce6f1", border: "none", color: "#333399", fontWeight: "bold" }} >
                        { (Number(PREZZI_CONSUMI.przSourcingF1) + Number(this.state.fixMargineF1)).formatDec() }
                    </div>
                    <label className="mobile_text">F2</label>
                    <div className="col-md-1 text-right" style={{ background: "#dce6f1", border: "none", color: "#333399", fontWeight: "bold" }} >
                    { (Number(PREZZI_CONSUMI.przSourcingF2) + Number(this.state.fixMargineF2)).formatDec() }
                    </div>
                    <label className="mobile_text">F3</label>
                    <div className="col-md-1 text-right" style={{ background: "#dce6f1", border: "none", color: "#333399", fontWeight: "bold" }} >
                    { (Number(PREZZI_CONSUMI.przSourcingF3) + Number(this.state.fixMargineF3)).formatDec() }
                    </div>
                    <label className="mobile_text">Profilato</label>
                    <div className="col-md-1 text-right" style={{ color: "#333399", fontWeight: "bold" }}>
                      {Number(PREZZI_CONSUMI.PrzFinale3fprof).formatDec()}</div>


                    <label className="mobile_text">Peak</label>
                    <div className="col-md-1 col-md-offset-1 text-right"
                      style={{ background: "#dce6f1", border: "none", color: "#333399", fontWeight: "bold" }} >
                      { (Number(PREZZI_CONSUMI.przSourcingPeak) + Number(this.state.fixMarginePL)).formatDec() }
                    </div>
                    <label className="mobile_text">OffPeak</label>
                    <div className="col-md-1 text-right" 
                      style={{ background: "#dce6f1", border: "none", color: "#333399", fontWeight: "bold" }} >
                      { (Number(PREZZI_CONSUMI.przSourcingOffPeak) + Number(this.state.fixMargineOP)).formatDec() }
                    </div>
                    <label className="mobile_text">Profilato</label>
                    <div className="col-md-1 text-right" style={{ color: "#333399", fontWeight: "bold" }}>
                      {Number(PREZZI_CONSUMI.PrzFinale2fprof).formatDec()}
                    </div>
                  </span>
                </div>
                <div className="Variabile row">
                  <p className="col-md-12"
                    style={{ color: "RGB(128, 100, 162)", fontWeight: "bold", marginTop: '10px' }}>Prezzo
                Variabile PUN</p>
                  <span className="col-md-12 row block_mobile">
                    <p className="col-md-1 col-md-offset-1"> </p>
                    <div className="col-md-1 text-center"
                      style={{ background: "RGB(128, 100, 162)", color: "#fff" }}>F1</div>
                    <div className="col-md-1 text-center"
                      style={{ background: "RGB(128, 100, 162)", color: "#fff" }}>F2</div>
                    <div className="col-md-1 text-center"
                      style={{ background: "RGB(128, 100, 162)", color: "#fff" }}>F3</div>
                    <div className="col-md-1 col-md-offset-1 text-center"
                      style={{ background: "RGB(128, 100, 162)", color: "#fff" }}>Orario</div>
                    <div className="col-md-1 text-center"> </div>
                    <div className="col-md-1 text-center"> </div>
                    <div className="col-md-2  text-center"> </div>
                  </span>
                  <span className="col-md-12 row">
                    <p className="col-md-2" style={{ color: "#366092", fontWeight: "bold" }}>Spread PUN €/MWh</p>
                    <label className="mobile_text">F1</label>
                    <div className="col-md-1 text-right"
                      style={{ background: "RGB(204, 192, 218)", border: "none" }} >
                      {this.state.cfg["cfg_def_spread_PUN"].formatDec()}
                    </div>
                    <label className="mobile_text">F2</label>
                    <div className="col-md-1 text-right" 
                      style={{ background: "RGB(204, 192, 218)", border: "none" }} >
                      {this.state.cfg["cfg_def_spread_PUN"].formatDec()}
                    </div>
                    <label className="mobile_text">F3</label>
                    <div className="col-md-1 text-right" 
                      style={{ background: "RGB(204, 192, 218)", border: "none" }} >
                      {this.state.cfg["cfg_def_spread_PUN"].formatDec()}
                    </div>
                    <label className="mobile_text">Orario</label>
                    <div className="col-md-1 col-md-offset-1 text-right" 
                      style={{ background: "RGB(204, 192, 218)", border: "none" }} >
                      {this.state.cfg["cfg_def_spread_PUN_orario"].formatDec()}
                    </div>
                    <div className="col-md-1 text-center"> </div>
                    <div className="col-md-1 text-center"> </div>
                    <div className="col-md-2 text-center"> </div>
                  </span>
                  <span className="col-md-12 row">
                    <p className="col-md-2" style={{ color: "#366092", fontWeight: "bold" }}>Margine €/MWh</p>
                   
                    <NumberFormat className="col-md-1 text-right"  style={{  background: "RGBA(128, 100, 162, 0)" , border: "none" }}
                      thousandSeparator={'.'}
                      decimalSeparator={','}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      value={this.state.punMargineF1}
                      onValueChange = {(values,e) => { this.setState({ punMargineF1: values.floatValue }) }  }
                       />
                    <NumberFormat className="col-md-1 text-right"  style={{  background: "RGBA(128, 100, 162, 0)" , border: "none" }}
                      thousandSeparator={'.'}
                      decimalSeparator={','}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      value={this.state.punMargineF2}
                      onValueChange = {(values,e) => { this.setState({ punMargineF2: values.floatValue }) }  }
                       />
                       <NumberFormat className="col-md-1 text-right"  style={{  background: "RGBA(128, 100, 162, 0)" , border: "none" }}
                      thousandSeparator={'.'}
                      decimalSeparator={','}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      value={this.state.punMargineF3}
                      onValueChange = {(values,e) => { this.setState({ punMargineF3: values.floatValue }) }  }
                       />

                       <NumberFormat className="col-md-1 col-md-offset-1 text-right"  style={{  background: "RGBA(128, 100, 162, 0)" , border: "none" }}
                      thousandSeparator={'.'}
                      decimalSeparator={','}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      value={this.state.punMargineOrario}
                      onValueChange = {(values,e) => { this.setState({ punMargineOrario: values.floatValue }) }  }
                       />
        
                    <div className="col-md-1 text-center"> </div>
                    <div className="col-md-1 text-center"> </div>
                    <div className="col-md-2  text-right"> </div>
                  </span>
                  <span className="col-md-12 row">
                    <p className="col-md-2" style={{ color: "#366092", fontWeight: "bold" }}>Spread PUN Finale €/MWh</p>
                    <label className="mobile_text">F1</label>
                    <div className="col-md-1 text-right" 
                      style={{ background: "RGB(204, 192, 218)", border: "none" }} >
                      {(this.state.cfg["cfg_def_spread_PUN"]+ Number(this.state.punMargineF1)).formatDec()}
                    </div>
                    <label className="mobile_text">F2</label>
                    <div className="col-md-1 text-right" 
                      style={{ background: "RGB(204, 192, 218)", border: "none" }}>
                      {(this.state.cfg["cfg_def_spread_PUN"]+ Number(this.state.punMargineF2)).formatDec()}
                    </div>
                    <label className="mobile_text">F3</label>
                    <div className="col-md-1 text-right" 
                      style={{ background: "RGB(204, 192, 218)", border: "none" }} >
                    {(this.state.cfg["cfg_def_spread_PUN"]+ Number(this.state.punMargineF3)).formatDec()}
                    </div>
                    <label className="mobile_text">Orario</label>
                    <div className="col-md-1 col-md-offset-1 text-right" 
                      style={{ background: "RGB(204, 192, 218)", border: "none" }} >
                      {(this.state.cfg["cfg_def_spread_PUN_orario"]+ Number(this.state.punMargineOrario)).formatDec()}
                    </div>
                    <div className="col-md-1 text-center"> </div>
                    <div className="col-md-1 text-center"> </div>
                    <div className="col-md-2 text-center"> </div>
                  </span>
                </div>
                <div className="col-md-6 Opzione"
                >
                  <p className="col-md-12"
                    style={{ color: "RGB(118, 147, 60)", fontWeight: "bold", marginTop: '10px' }}>Opzione
                Offerta Verde</p>
                  <div className="col-md-6">
                    <span className="col-md-12 row">
                      <div className="col-md-offset-6 col-md-6 text-center"
                        style={{ background: "RGB(155, 187, 89)", color: "#fff" }}>Offerta Verde</div>
                    </span>
                    <span className="col-md-12 row">
                      <p className="col-md-6" style={{ color: "#366092", fontWeight: "bold", fontSize: "12px" }}>Sourcing €/MWh</p>
                      <div className="col-md-6 text-right" 
                        style={{ color: "#366092", background: "RGB(216, 228, 188)", border: "none" }}>
                        {this.state.cfg["cfg_def_sourcing_verde"].formatDec()}
                    </div>
                    </span>
                    <span className="col-md-12 row">
                      <p className="col-md-6" style={{ color: "#366092", fontWeight: "bold", fontSize: "12px" }}>Margine €/MWh</p>
            
                   <NumberFormat className="col-md-6 text-right" style={{ background: "RGB(216, 228, 188)", border: "none" }} 
                    thousandSeparator={'.'}
                    decimalSeparator={','}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    value={this.state.greenMargine}
                    onValueChange = {(values,e) => {
                          //console.log(values)
                          //console.log(e)
                          this.setState({ greenMargine: values.floatValue })
                          }
                        }
                       />
                       

                    </span>
                    <span className="col-md-12 row">
                      <p className="col-md-6" style={{ color: "#366092", fontWeight: "bold", fontSize: "12px" }}>Prezzo Finale €/MWh</p>
                      <div className="col-md-6 text-right"
                        style={{ color: "#366092", background: "RGB(216, 228, 188)", border: "none" }} >
                       {Number(this.state.cfg.cfg_def_sourcing_verde + this.state.greenMargine ).formatDec()}
                      </div>
                    </span>
                  </div>
                  <div className="col-md-6">
                    <img src={logo} className="col-md-offset-4" width="130" />
                  </div>
                </div>
                <div className="col-md-6 Opzioni_1"
                >
                                  
                  <p className="col-md-12" style={{ color: "#366092", fontWeight: "bold", marginTop: '10px' }}>Opzioni</p>
                


                  <div className="col-md-12">
                    
                    
                    <span className="col-md-8 row" style={quotazioni.isEco !== "S" ? { display: 'none' } : { display: "block" }} >
                      <p className="col-md-6" style={{ color: "#366092", fontWeight: "bold", fontSize: "12px" }}>Fee ECO</p>
                      
                    <div className="col-md-4 text-right"
                      style={{ color: "#366092", background: "RGB(220, 230, 241)", border: "none" }} >
                      {Number(this.state.cfg.cfg_def_fee_ECO ).formatDec()}
                    </div>
              
                    </span>
                    <span className="col-md-8 row">
                      <p className="col-md-6" style={{ color: "#366092", fontWeight: "bold", fontSize: "12px" }}>Fee intermediario</p>
                      <NumberFormat className="col-md-4 text-right" style={{ background: "RGB(220, 230, 241)", border: "none" }} 
                          thousandSeparator={'.'}
                          decimalSeparator={','}
                          decimalScale={2}
                          fixedDecimalScale={true}
                          value={this.state.feeIntermediario}
                          onValueChange = {(values,e) => {                          
                            this.setState({ feeIntermediario: values.floatValue })
                          }
                        }
                       />
                    </span>


                    <span className="col-md-12 row">
                    <p className="col-md-6 text-center" style={{ color: "#366092", fontWeight: "bold" }}>Sbilanciamento</p>               
                    </span>

                    <span className="col-md-12 row">
                      <p className="col-md-2" style={{ color: "#366092", fontWeight: "bold", fontSize: "12px" }}>Compreso</p>
                      <input className="col-md-1" value="sbilanciamento compreso"
                        onClick={(e) => this.setState({ tipoSbilanciamento: e.target.value })}
                        type="radio" name="Opzioni"
                        checked={this.state.tipoSbilanciamento === "sbilanciamento compreso"}
                      />
          
                      <p className="col-md-2" style={{ color: "#366092", fontWeight: "bold", fontSize: "12px" }}>in CTE</p>
                      <input className="col-md-1" value="sbilanciamento in CTE"
                        onClick={(e) => this.setState({ tipoSbilanciamento: e.target.value })}
                        type="radio" name="Opzioni"
                        checked={this.state.tipoSbilanciamento === "sbilanciamento in CTE"}
                      />
                    </span>
                  </div>
                                   

                  {/* <div className="col-md-6">
                    <span className="col-md-12 row" style={quotazioni.isEco !== "S" ? { display: 'none' } : { display: "block" }}>
                      <p className="col-md-6"
                        style={{ color: "#366092", fontWeight: "bold", fontSize: "12px" }}>Fee ECO</p>
                      <input className="col-md-6 text-center" value={this.state.feeEco}
                        onChange={(e) => this.setState({ feeEco: e.target.value })}
                        style={{ background: "RGB(220, 230, 241)", border: "none" }} />
                    </span>
                    <span className="col-md-12 row">
                      <p className="col-md-6" style={{ color: "#366092", fontWeight: "bold", fontSize: "12px" }}>Fee intermediario</p>
                      <input className="col-md-6 text-center" value={this.state.feeIntermediario}
                        onChange={(e) => this.setState({ feeIntermediario: e.target.value })}
                        style={{ background: "RGB(220, 230, 241)", border: "none" }} />
                    </span>
                  </div>
                  
                    <div className="col-md-6" style={{ marginTop: "20px" }}>
                      <input value="sbilanciamento compreso"
                        onClick={(e) => this.setState({ tipoSbilanciamento: e.target.value })}
                        type="radio" name="Opzioni"
                        checked={this.state.tipoSbilanciamento === "sbilanciamento compreso"}
                      />
                      <label>sbilanciamento compreso</label>
                    </div>
                
                 
                    <div className="col-md-6" style={{ marginTop: "20px" }}>
                      <input value="sbilanciamento in CTE" type="radio" name="Opzioni"
                        onClick={(e) => this.setState({ tipoSbilanciamento: e.target.value })}
                        checked={this.state.tipoSbilanciamento === "sbilanciamento in CTE"} />
                      <label>sbilanciamento in CTE</label>
                    </div> */}
                
                  
                </div>


              </div>
            )}

        </AnimatedView>
      </div>
    );
  }
}

export default NewOffer;
