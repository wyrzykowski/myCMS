import React, {Component} from 'react';
import Chart from "chart.js";
import { toast } from "react-toastify";

class DrawChart extends Component {



  updateCanvas() {
    try {
      var ctx = this.refs.canvas.getContext('2d');
      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.state.statisticsDataLabel,
          datasets: [{
            label: 'Number of pages views',
            data: this.state.statisticsDataValue,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    } catch (e) {
      toast.error("Unexpected error occurred! Please reload page.")
    }
  }
  render() {
    return (
      <div>

      </div>
    );
  }
}

export default DrawChart;




