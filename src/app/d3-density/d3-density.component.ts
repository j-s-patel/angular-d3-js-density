import { Component, Input, OnInit } from "@angular/core";
import * as dataDensity from "../../../../assets/data/density.2d.json";
import { contourDensity } from "d3-contour";
import { D3Service } from "../services/d3.service";

@Component({
  selector: "app-d3-density",
  templateUrl: "./d3-density.component.html",
  styleUrls: ["./d3-density.component.scss"]
})
export class D3DensityComponent implements OnInit {
  @Input("data") private data = dataDensity["data"];
  @Input("color") private color = "#6773f1";
  private margin = { top: 10, right: 30, bottom: 30, left: 40 };
  private width = 450;
  private height = 450;
  private svg: any;
  private colors: any;
  private radius = Math.min(this.width, this.height) / 2 - this.margin.left;
  constructor(private d3: D3Service) {}
  ngOnInit(): void {
    this.createSvg();
    this.createColors(this.data);
    this.drawChart();
  }

  private createSvg(): void {
    this.svg = this.d3.d3
      .select("figure#density")
      .append("svg")
      .attr(
        "viewBox",
        `0 0 ${this.width + this.margin.left + this.margin.right} ${this
          .height +
          this.margin.top +
          this.margin.bottom}`
      )
      .append("g")
      .attr(
        "transform",
        "translate(" + this.margin.left + "," + this.margin.top + ")"
      );
  }

  private createColors(data): void {
    // Prepare a color palette
    this.colors = this.d3.d3
      .scaleLinear()
      .domain([0, 1]) // Points per square pixel.
      .range(["#63adfeb3", "#6773f1"]);
  }

  private drawChart(): void {
    // Add X axis
    const x = this.d3.d3
      .scaleLinear()
      .domain([5, 20])
      .range([this.margin.left, this.width - this.margin.right]);
    this.svg
      .append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(this.d3.d3.axisBottom(x));

    // Add Y axis
    const y = this.d3.d3
      .scaleLinear()
      .domain([5, 25])
      .range([this.height - this.margin.bottom, this.margin.top]);
    this.svg.append("g").call(this.d3.d3.axisLeft(y));

    // compute the density data
    var densityData = contourDensity()
      .x(d => {
        return x(d.x);
      })
      .y(d => {
        return y(d.y);
      })
      .size([this.width, this.height])
      .bandwidth(20)(this.data);

    // show the shape!
    this.svg
      .insert("g", "g")
      .selectAll("path")
      .data(densityData)
      .enter()
      .append("path")
      .attr("d", this.d3.d3.geoPath())
      .attr("fill", d => {
        return this.colors(d.value);
      });
  }
}
