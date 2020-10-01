import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput, Slider, ScrollView, TextInputComponent,
  Dimensions
} from 'react-native';


import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

class LineGraph extends Component {

  render() {

    const screenWidth = Dimensions.get("window").width;
    const divd = this.props.fv.length > 13 ? Math.round(this.props.fv.length / 14) : 1
    const number = this.props.fv.map((val, id) => { return id+1 })

    const data = {
      labels: number.filter((i) => i % divd == 0),
      yAxisLabel: this.props.fv.filter((val, i) => i % divd == 0),
      datasets: [
        {
          data: this.props.fv.filter((val, i) => i % divd == 0),
          color: (opacity = 1) => `rgba(245, 233, 66, ${opacity})`, // optional

        },
        {
          data: this.props.totalInvseted.filter((val, i) => i % divd == 0),
          color: (opacity = 1) => `rgba(66, 105, 245, ${opacity})`, // optional

        },

      ], legend: ["Future Value", "Invested"]

    };

    const chartConfig = {
      backgroundGradientFrom: "#1E2923",
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: "#08130D",
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 1) => `rgba(66, 105, 245, ${opacity})`,
      strokeWidth: 1, // optional, default 3
      barPercentage: 0.5,
      useShadowColorFromDataset: false // optional
    };

    return (
      <View style={styles.lineGraph}>
        <Text style={{ fontSize: 30 }}>Graphs</Text>
        <LineChart
          data={data}
          width={screenWidth - 20}
          height={220}
          chartConfig={chartConfig}
          formatYLabel={(y) => { return this.getThLacCr(y) }}

        />
      </View>
    )
  }
  
  getThLacCr = (val) => {
    if ((val / 10000000000) >> 0) {
      return (val / 10000000000).toFixed(2) + "K Cr";
    } else {
      if ((val / 10000000) >> 0) {
        return (val / 10000000).toFixed(0) + "Cr";
      } else {
        if ((val / 100000) >> 0) {
          return (val / 100000).toFixed(0) + "Lac";
        } else {
          if (val / 1000 >> 0) {
            return (val / 1000).toFixed(0) + "K";
          } else {
            return val;
          }
        }
      }
    }
  }
}

const styles = StyleSheet.create({
  lineGraph: {
    marginTop: 15,
    // backgroundColor: '#172b20',
    padding: 8,
    opacity: .7,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#dddd',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 3,
    borderRadius: 3,
    borderWidth:.3,

  }
})


export default LineGraph;