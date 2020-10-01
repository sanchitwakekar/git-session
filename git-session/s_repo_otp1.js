import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text, ScrollView,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import CompHeader from './compHeader';
import InputComponent from './inputComponent';
import ResultComponent from './resultComponent';
import Loader from './loader';
import LineGraph from './lineGraph';
import PiGraph from './piGrapg';

// import {
//   AdMobBanner,
//   AdMobInterstitial,
//   PublisherBanner,
//   AdMobRewarded
// } from 'react-native-admob'

class oneTimeComponent extends Component {
  state = {
    monthlyAmount: 500,
    interestRate: 8,
    years: 5,
    fv: [],
    investedAmount: [],
    year: [],
    DataTable: [],
    resultLoading: false,
    easyRead: true,
  }

  

  getThLacCr = (val) => {
    if ((val / 10000000000) >> 0) {
      return (val / 10000000000).toFixed(2) + "K Cr";
    } else {
      if ((val / 10000000) >> 0) {
        return (val / 10000000).toFixed(2) + "Cr";
      } else {
        if ((val / 100000) >> 0) {
          return (val / 100000).toFixed(2) + "Lac";
        } else {
          if (val / 1000 >> 0) {
            return (val / 1000).toFixed(2) + "K";
          } else {
            return val;
          }
        }
      }
    }
  }

  changeEasyRead = () => {
    if (this.state.easyRead) {
      this.calculate(false)
    } else {
      this.calculate(true)
    }

  }

	handleAmount = (text) => {
    this.setState({ monthlyAmount: text })
  }

  handleRate = (text) => {
    this.setState({ interestRate: text })
  }

  handleYears = (text) => {
    this.setState({ years: text })
  }

  insertTable = (fvv, totalInvseted, easyRead) => {

    var DataTable = [];
    fvv.map((val, id) => {
      var element = this.getThLacCr(val);
      var data = [];

      if (easyRead) {
        data.push(id + 1);
        data.push(this.getThLacCr(totalInvseted[id]))
        data.push(element);
        data.push(this.getThLacCr(val - totalInvseted[id]));
        DataTable.push(data);
      } else {
        data.push(id + 1);
        data.push(totalInvseted[id]);
        data.push(val);
        data.push(val - totalInvseted[id]);
        DataTable.push(data);
      }

    });

    return DataTable;
  }

  calculate = (easyRead) => {
    this.setState({ fv: [], investedAmount: [], DataTable: [], resultLoading: true, easyRead: easyRead })
    var fvv = [];
    var totalInvseted = [];
    for (var j = 1; j <= this.state.years; j++) {
      var n = j;
      var i = (this.state.interestRate / 100);
      var r = (((1 + i) ** n) - 1)
      r = this.state.monthlyAmount * r;
      fvv.push(Math.round(r) + this.state.monthlyAmount);
      totalInvseted.push(this.state.monthlyAmount)
    }
    var DataTable = this.insertTable(fvv, totalInvseted, easyRead);
    this.setState({
      fv: fvv, investedAmount: totalInvseted, DataTable: DataTable,
      resultLoading: false, easyRead: easyRead
    })
  }

  formHasResult = () => (

    this.state.fv[0] ?
      <View >
        <ResultComponent fv={this.state.fv}
          insertTable={this.insertTable}
          DataTable={this.state.DataTable}
          easyRead={this.state.easyRead}
          changeEasyRead={this.changeEasyRead}
          totalInvseted={this.state.investedAmount} />
      </View>
      :
      null
  )

  formHasGraphs = () => (
    this.state.fv[0] ?
    <View>
      {/* <AdMobBanner
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-3940256099942544/6300978111"
          // testDeviceID="EMULATOR"
          didFailToReceiveAdWithError={this.bannerError} /> */}
      <View style={{ marginBottom: 30 }}>
        

        <View style={styles.lineGraph}>
          <LineGraph fv={this.state.fv} totalInvseted={this.state.investedAmount} />
        </View>
        <View style={styles.piGraph}>
          <PiGraph fv={this.state.fv} totalInvseted={this.state.investedAmount} />
        </View>
      </View>
      </View>
      :
      null
  )


  render() {

    return (
      <View style={styles.sipComponent}>

        <View style={styles.header}>
          <CompHeader title={'SIP'} iconName={'cash-multiple'} />
        </View>
        <ScrollView style={{ width: '100%', padding: 10, marginBottom: 30 }}>
          <View style={styles.informationCard}>

            <InputComponent monthlyAmount={this.state.monthlyAmount}
              interestRate={this.state.interestRate}
              years={this.state.years}
              amountTitle={'Monthly SIP Amount to Invest'}
              handleAmount={this.handleAmount}
              handleRate={this.handleRate}
              handleYears={this.handleYears}
              resultLoading={this.state.resultLoading}
              calculate={this.calculate}
            />
          </View>

          <Loader
            loading={this.state.resultLoading} />
          {this.formHasResult()}
          {this.formHasGraphs()}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  sipComponent: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    height: 50,
    width: '100%'
  },
  informationCard: {
    fontSize: 14,
  },

  loading: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});


export default oneTimeComponent;