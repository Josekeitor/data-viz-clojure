import React, {Component, useEffect, useState} from 'react';
import {VictoryChart, VictoryLine, VictoryBar, VictoryAxis, VictoryTheme} from 'victory';
import {dataType} from "./App";
interface props {
    data: [dataType]
}
export function Charts({data}: props) {
    const colors = ["blue", "red"]
    console.log("scores: ", data)

    let processedData = data.map(element => (element.scores.map((elem, i) => (
        {
            x: i,
            y: elem,
        }
    ))))
    console.log("Processed data ", processedData)
    // @ts-ignore
    return (
        <div>
            {data.map<React.ReactNode>((element, i) => (
                    <div className="chart">
                        <h2>{element.id}</h2>
                        <VictoryChart>
                            <VictoryAxis crossAxis label="Action number" offsetY={50}/>
                            <VictoryAxis crossAxis dependentAxis label="Score"/>
                            <VictoryBar  style={{
                                data: { stroke: "#c43a31" },
                                parent: { border: "1px solid #ccc"}
                            }}
                                          data={processedData[i]} />
                        </VictoryChart>
                    </div>
                )
                )}
        </div>
    )

}
